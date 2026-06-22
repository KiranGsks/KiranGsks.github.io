import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { VehicleSelectPage } from '../pages/inspect/VehicleSelectPage'
import { VehicleInfoPage } from '../pages/inspect/VehicleInfoPage'
import { TrackSelectPage } from '../pages/inspect/TrackSelectPage'
import { ChecklistPage } from '../pages/inspect/ChecklistPage'
import { SettingsPage } from '../pages/SettingsPage'
import { AuthPage } from '../pages/AuthPage'
import { PricingPage } from '../pages/PricingPage'
import { AccountPage } from '../pages/AccountPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />

      {/* Auth & Account */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Inspection flow */}
      <Route path="/inspect/:type" element={<VehicleSelectPage />} />
      <Route path="/inspect/vehicle-info" element={<VehicleInfoPage />} />
      <Route path="/inspect/track" element={<TrackSelectPage />} />
      <Route path="/inspect/checklist" element={<ChecklistPage />} />

      {/* Settings */}
      <Route path="/settings" element={<SettingsPage />} />

      {/* Q&A placeholder */}
      <Route path="/ask" element={<AskPlaceholder />} />

      {/* Catch-all */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

/** Placeholder for the Q&A feature */
function AskPlaceholder() {
  return (
    <div className="page">
      <div className="page__header">
        <h2 className="page__title">💬 Ask about a vehicle</h2>
        <p className="page__subtitle">
          This feature is coming soon. You'll be able to ask any question about cars or bikes
          and get AI-powered answers.
        </p>
      </div>
      <div className="card">
        <div className="card__title">Coming Soon</div>
        <div className="card__description">
          General vehicle Q&A will be available once the inspection flow is complete.
          For now, use the inspection flow to get vehicle-specific checklists.
        </div>
      </div>
      <a href="/" className="btn btn--secondary">← Back to home</a>
    </div>
  )
}
