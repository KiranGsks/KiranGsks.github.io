import { Navigate, Route, Routes } from 'react-router-dom'
import { AirSetupPlaceholderPage } from '../pages/AirSetupPlaceholderPage'
import { HomePage } from '../pages/HomePage'
import { ExistingConfirmStep } from '../pages/existing-vehicle/ExistingConfirmStep'
import { ExistingVehiclePage } from '../pages/existing-vehicle/ExistingVehiclePage'
import { ModelSearchStep } from '../pages/existing-vehicle/ModelSearchStep'
import { RegistrationSearchStep } from '../pages/existing-vehicle/RegistrationSearchStep'
import { MakeStep } from '../pages/new-vehicle/MakeStep'
import { ModelStep } from '../pages/new-vehicle/ModelStep'
import { NewVehicleConfirmStep } from '../pages/new-vehicle/NewVehicleConfirmStep'
import { NewVehiclePage } from '../pages/new-vehicle/NewVehiclePage'
import { TrimStep } from '../pages/new-vehicle/TrimStep'
import { YearStep } from '../pages/new-vehicle/YearStep'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new" element={<NewVehiclePage />}>
        <Route index element={<Navigate to="year" replace />} />
        <Route path="year" element={<YearStep />} />
        <Route path="make" element={<MakeStep />} />
        <Route path="model" element={<ModelStep />} />
        <Route path="trim" element={<TrimStep />} />
        <Route path="confirm" element={<NewVehicleConfirmStep />} />
      </Route>
      <Route path="/existing" element={<ExistingVehiclePage />} />
      <Route path="/existing/model" element={<ModelSearchStep />} />
      <Route path="/existing/registration" element={<RegistrationSearchStep />} />
      <Route path="/existing/confirm" element={<ExistingConfirmStep />} />
      <Route path="/air-setup" element={<AirSetupPlaceholderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
