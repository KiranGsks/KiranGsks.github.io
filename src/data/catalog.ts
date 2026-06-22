/**
 * This file is deprecated. The catalog has moved to ./catalog/index.ts
 * This re-export exists only for backward compatibility during migration.
 */
export {
  getMakes,
  getModels,
  getVariants,
  getYearsForMake,
  buildVehicleId,
  DEFAULT_LOCALE,
} from './catalog/index'

export type {
  MakeInfo,
  ModelInfo,
  VariantInfo,
  MarketCatalog,
} from './catalog/index'
