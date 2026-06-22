/**
 * Stores and retrieves AWS/AI configuration from localStorage.
 * Keys are stored in plain text for this prototype — in production,
 * these would come from environment variables or a secure vault.
 */

const SETTINGS_KEY = 'pdi-ai-settings'

export type AISettings = {
  awsRegion: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
  awsSessionToken: string
  modelId: string
}

const DEFAULT_SETTINGS: AISettings = {
  awsRegion: 'us-east-1',
  awsAccessKeyId: '',
  awsSecretAccessKey: '',
  awsSessionToken: '',
  modelId: 'us.anthropic.claude-sonnet-4-20250514',
}

export function loadSettings(): AISettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: AISettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function clearSettings(): void {
  localStorage.removeItem(SETTINGS_KEY)
}

export function hasValidSettings(): boolean {
  const s = loadSettings()
  return !!(s.awsRegion && s.awsAccessKeyId && s.awsSecretAccessKey && s.modelId)
}
