import type { Vehicle } from '../types/vehicle'
import type { InspectionResponse } from '../types/inspection'
import { loadSettings } from '../utils/settingsStore'
import { buildInspectionPrompt, SYSTEM_PROMPT } from './promptTemplates'

/**
 * AWS Signature V4 signing for Bedrock API calls.
 * This is a minimal implementation for browser-based calls.
 */

async function hmacSha256(key: ArrayBuffer, message: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message))
}

async function sha256(message: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function getSignatureKey(
  key: string,
  dateStamp: string,
  region: string,
  service: string
): Promise<ArrayBuffer> {
  const kDate = await hmacSha256(new TextEncoder().encode('AWS4' + key).buffer, dateStamp)
  const kRegion = await hmacSha256(kDate, region)
  const kService = await hmacSha256(kRegion, service)
  return hmacSha256(kService, 'aws4_request')
}

function getAmzDate(): { amzDate: string; dateStamp: string } {
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)
  return { amzDate, dateStamp }
}

async function signRequest(
  method: string,
  url: string,
  headers: Record<string, string>,
  body: string,
  region: string,
  accessKey: string,
  secretKey: string
): Promise<Record<string, string>> {
  const service = 'bedrock'
  const { amzDate, dateStamp } = getAmzDate()
  const parsedUrl = new URL(url)

  headers['x-amz-date'] = amzDate
  headers['host'] = parsedUrl.host

  // Build canonical headers
  const sortedHeaders = Object.keys(headers).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  const canonicalHeaderStr = sortedHeaders
    .map((k) => `${k.toLowerCase()}:${headers[k].trim()}`)
    .join('\n') + '\n'
  const signedHeaderStr = sortedHeaders.map((k) => k.toLowerCase()).join(';')

  const payloadHash = await sha256(body)
  const canonicalRequest = [
    method,
    parsedUrl.pathname,
    '', // query string (empty for POST)
    canonicalHeaderStr,
    signedHeaderStr,
    payloadHash,
  ].join('\n')

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    await sha256(canonicalRequest),
  ].join('\n')

  const signingKey = await getSignatureKey(secretKey, dateStamp, region, service)
  const signatureBuffer = await hmacSha256(signingKey, stringToSign)
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaderStr}, Signature=${signature}`

  return {
    ...headers,
    Authorization: authorization,
  }
}

/**
 * Calls AWS Bedrock InvokeModel with the Anthropic Messages API format.
 */
export async function invokeBedrockModel(
  userMessage: string,
  systemMessage: string = SYSTEM_PROMPT
): Promise<string> {
  const settings = loadSettings()

  if (!settings.awsAccessKeyId || !settings.awsSecretAccessKey) {
    throw new Error('AWS credentials not configured. Please set them in Settings (gear icon).')
  }

  const region = settings.awsRegion
  const modelId = settings.modelId
  const endpoint = `https://bedrock-runtime.${region}.amazonaws.com/model/${encodeURIComponent(modelId)}/invoke`

  const requestBody = JSON.stringify({
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 4096,
    system: systemMessage,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // Include session token for temporary credentials (AWS SSO, STS)
  if (settings.awsSessionToken) {
    headers['x-amz-security-token'] = settings.awsSessionToken
  }

  const signedHeaders = await signRequest(
    'POST',
    endpoint,
    headers,
    requestBody,
    region,
    settings.awsAccessKeyId,
    settings.awsSecretAccessKey
  )

  // Remove 'host' header — browser will set it automatically
  delete signedHeaders['host']
  delete signedHeaders['Host']

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: signedHeaders,
    body: requestBody,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Bedrock API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()

  // Anthropic Messages API response format
  if (data.content && Array.isArray(data.content)) {
    return data.content
      .filter((block: { type: string }) => block.type === 'text')
      .map((block: { text: string }) => block.text)
      .join('')
  }

  throw new Error('Unexpected response format from Bedrock')
}

/**
 * High-level function: given a vehicle, get the AI-generated inspection checklist.
 */
export async function getInspectionItems(vehicle: Vehicle): Promise<InspectionResponse> {
  const prompt = buildInspectionPrompt(vehicle)
  const rawResponse = await invokeBedrockModel(prompt)

  // Parse the JSON response
  try {
    // Try to extract JSON if the model accidentally wrapped it
    let jsonStr = rawResponse.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }
    const parsed = JSON.parse(jsonStr) as InspectionResponse
    return parsed
  } catch {
    throw new Error(
      `Failed to parse AI response as JSON. Raw response: ${rawResponse.slice(0, 200)}...`
    )
  }
}
