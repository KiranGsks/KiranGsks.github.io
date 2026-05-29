import { Outlet } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'

export function NewVehiclePage() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  )
}
