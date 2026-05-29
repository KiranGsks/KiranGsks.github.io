import type { Vehicle } from '../../types/vehicle'

type VehicleSummaryCardProps = {
  vehicle: Vehicle
  title?: string
}

export function VehicleSummaryCard({
  vehicle,
  title = 'Vehicle summary',
}: VehicleSummaryCardProps) {
  return (
    <article className="vehicle-summary">
      <p className="vehicle-summary__title">{title}</p>
      <p className="vehicle-summary__name">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </p>
      <p className="vehicle-summary__meta">Trim: {vehicle.trim}</p>
      {vehicle.registration && (
        <p className="vehicle-summary__reg">
          Registration: {vehicle.registration}
        </p>
      )}
    </article>
  )
}
