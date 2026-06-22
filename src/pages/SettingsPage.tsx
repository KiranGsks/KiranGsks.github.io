import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import {
  loadSettings,
  saveSettings,
  clearSettings,
  type AISettings,
} from '../utils/settingsStore'
import { invokeBedrockModel } from '../api/bedrockClient'

type TestStatus = 'idle' | 'testing' | 'success' | 'error'

export function SettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState<AISettings>(loadSettings)
  const [saved, setSaved] = useState(false)
  const [testStatus, setTestStatus] = useState<TestStatus>('idle')
  const [testMessage, setTestMessage] = useState('')
  const [testLatency, setTestLatency] = useState<number | null>(null)

  const handleChange = (field: keyof AISettings, value: string) => {
    setSaved(false)
    setTestStatus('idle')
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleClear = () => {
    clearSettings()
    setSettings({
      awsRegion: 'us-east-1',
      awsAccessKeyId: '',
      awsSecretAccessKey: '',
      awsSessionToken: '',
      modelId: 'us.anthropic.claude-sonnet-4-20250514',
    })
    setSaved(false)
    setTestStatus('idle')
    setTestMessage('')
  }

  const handleTest = async () => {
    // Save first so the client uses current values
    saveSettings(settings)

    setTestStatus('testing')
    setTestMessage('')
    setTestLatency(null)

    const startTime = Date.now()

    try {
      const response = await invokeBedrockModel(
        'Reply with exactly: {"status":"ok","model":"your_model_id"}. Nothing else.',
        'You are a connectivity test. Reply with the exact JSON requested. No other text.'
      )
      const latency = Date.now() - startTime
      setTestLatency(latency)
      setTestStatus('success')
      setTestMessage(`Connection successful! Model responded in ${latency}ms.\n\nResponse: "${response.slice(0, 120)}${response.length > 120 ? '...' : ''}"`)
    } catch (err) {
      const latency = Date.now() - startTime
      setTestLatency(latency)
      setTestStatus('error')
      const message = err instanceof Error ? err.message : 'Unknown error'
      setTestMessage(message)
    }
  }

  const canTest = !!(settings.awsAccessKeyId && settings.awsSecretAccessKey && settings.awsRegion && settings.modelId)

  return (
    <PageShell>
      <StepHeader
        title="AI Settings"
        subtitle="Configure AWS Bedrock connection for AI-powered inspections"
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        <div className="settings-form">
          <div className="settings-section">
            <h3 className="settings-section__title">AWS Credentials</h3>
            <p className="settings-section__hint">
              These are stored locally in your browser only. They are used to call
              AWS Bedrock directly from this device.
            </p>

            <div className="text-input">
              <label className="text-input__label" htmlFor="aws-region">
                AWS Region
              </label>
              <input
                id="aws-region"
                className="text-input__field"
                type="text"
                value={settings.awsRegion}
                onChange={(e) => handleChange('awsRegion', e.target.value)}
                placeholder="us-east-1"
              />
            </div>

            <div className="text-input">
              <label className="text-input__label" htmlFor="aws-key">
                Access Key ID
              </label>
              <input
                id="aws-key"
                className="text-input__field"
                type="text"
                value={settings.awsAccessKeyId}
                onChange={(e) => handleChange('awsAccessKeyId', e.target.value)}
                placeholder="AKIA..."
                autoComplete="off"
              />
            </div>

            <div className="text-input">
              <label className="text-input__label" htmlFor="aws-secret">
                Secret Access Key
              </label>
              <input
                id="aws-secret"
                className="text-input__field"
                type="password"
                value={settings.awsSecretAccessKey}
                onChange={(e) => handleChange('awsSecretAccessKey', e.target.value)}
                placeholder="••••••••"
                autoComplete="off"
              />
            </div>

            <div className="text-input">
              <label className="text-input__label" htmlFor="aws-session-token">
                Session Token (for temporary credentials)
              </label>
              <input
                id="aws-session-token"
                className="text-input__field"
                type="password"
                value={settings.awsSessionToken}
                onChange={(e) => handleChange('awsSessionToken', e.target.value)}
                placeholder="Optional — required for AWS SSO / STS credentials"
                autoComplete="off"
              />
              <span className="text-input__hint">
                Required if using temporary credentials from AWS SSO, CloudShell, or AssumeRole.
                Leave blank for long-term IAM user credentials.
              </span>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section__title">Model Configuration</h3>

            <div className="text-input">
              <label className="text-input__label" htmlFor="model-id">
                Model ID or Inference Profile ID
              </label>
              <input
                id="model-id"
                className="text-input__field"
                type="text"
                value={settings.modelId}
                onChange={(e) => handleChange('modelId', e.target.value)}
                placeholder="us.anthropic.claude-sonnet-4-20250514"
              />
              <span className="text-input__hint">
                Use inference profile IDs for cross-region models:
                <br />• <code>us.anthropic.claude-sonnet-4-20250514</code> (US regions)
                <br />• <code>ap.anthropic.claude-sonnet-4-20250514</code> (AP regions like ap-south-1)
                <br />• <code>eu.anthropic.claude-sonnet-4-20250514</code> (EU regions)
                <br />• <code>anthropic.claude-3-haiku-20240307</code> (on-demand, if enabled)
                <br />
                <br />For Opus 4: use <code>us.anthropic.claude-opus-4-6-v1</code> or <code>ap.anthropic.claude-opus-4-6-v1</code>
              </span>
            </div>
          </div>

          {/* Test Connection Section */}
          <div className="settings-section">
            <h3 className="settings-section__title">Connection Test</h3>
            <p className="settings-section__hint">
              Send a simple test request to verify your credentials and model access.
            </p>

            <button
              type="button"
              className="btn btn--primary btn--full"
              onClick={handleTest}
              disabled={!canTest || testStatus === 'testing'}
              style={{ opacity: canTest && testStatus !== 'testing' ? 1 : 0.5 }}
            >
              {testStatus === 'testing' ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="loading-spinner loading-spinner--sm" />
                  Testing connection...
                </span>
              ) : (
                '🧪 Test Connection'
              )}
            </button>

            {!canTest && (
              <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)', marginTop: '8px' }}>
                Fill in Region, Access Key, Secret Key, and Model ID to enable testing.
              </p>
            )}

            {/* Test Result */}
            {testStatus === 'success' && (
              <div className="hint-box hint-box--success" style={{ marginTop: '12px' }}>
                <strong>✅ Connection OK</strong>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: 'var(--font-size-xs)', marginTop: '4px', margin: 0 }}>
                  {testMessage}
                </pre>
              </div>
            )}

            {testStatus === 'error' && (
              <div className="hint-box hint-box--error" style={{ marginTop: '12px' }}>
                <strong>❌ Connection Failed</strong>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: 'var(--font-size-xs)', marginTop: '4px', margin: 0, color: 'var(--color-danger, #e53e3e)' }}>
                  {testMessage}
                </pre>
                {testLatency && (
                  <p style={{ fontSize: 'var(--font-size-xs)', marginTop: '8px', color: 'var(--color-text-muted)' }}>
                    Failed after {testLatency}ms
                  </p>
                )}
                <p style={{ fontSize: 'var(--font-size-xs)', marginTop: '8px' }}>
                  <strong>Common fixes:</strong>
                  <br />• Check that Access Key + Secret Key + Session Token are all current
                  <br />• Session tokens from AWS SSO expire — re-run <code>aws sso login</code>
                  <br />• Verify the model ID is enabled in your Bedrock region
                  <br />• Ensure IAM policy allows <code>bedrock:InvokeModel</code>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="page-actions page-actions--row">
          <SecondaryButton onClick={handleClear} block>
            Clear all
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} block>
            {saved ? '✓ Saved' : 'Save settings'}
          </PrimaryButton>
        </div>

        {saved && (
          <div className="hint-box hint-box--success">
            Settings saved successfully. They will be used for AI-powered inspections.
          </div>
        )}
      </div>
    </PageShell>
  )
}
