type CatalogEntry = {
  makes: Record<string, { models: Record<string, string[]> }>
}

const CATALOG_BY_YEAR: Record<number, CatalogEntry> = {
  2024: {
    makes: {
      Toyota: {
        models: {
          Camry: ['LE', 'XLE', 'SE'],
          RAV4: ['LE', 'XLE', 'Adventure'],
        },
      },
      Ford: {
        models: {
          F150: ['XL', 'XLT', 'Lariat'],
          Explorer: ['Base', 'ST-Line', 'Platinum'],
        },
      },
      Honda: {
        models: {
          Civic: ['LX', 'Sport', 'Touring'],
          'CR-V': ['EX', 'EX-L', 'Touring'],
        },
      },
    },
  },
  2023: {
    makes: {
      Toyota: {
        models: {
          Camry: ['LE', 'SE', 'XSE'],
          Corolla: ['L', 'LE', 'XSE'],
        },
      },
      Ford: {
        models: {
          Mustang: ['EcoBoost', 'GT', 'Dark Horse'],
          Escape: ['S', 'SE', 'Titanium'],
        },
      },
      Honda: {
        models: {
          Accord: ['LX', 'Sport', 'Touring'],
          Pilot: ['EX-L', 'Touring', 'Elite'],
        },
      },
    },
  },
  2022: {
    makes: {
      Toyota: {
        models: {
          Highlander: ['LE', 'XLE', 'Limited'],
        },
      },
      Ford: {
        models: {
          Bronco: ['Base', 'Big Bend', 'Wildtrak'],
        },
      },
      Honda: {
        models: {
          'HR-V': ['LX', 'EX', 'EX-L'],
        },
      },
    },
  },
}

export const YEARS = Object.keys(CATALOG_BY_YEAR)
  .map(Number)
  .sort((a, b) => b - a)

export function getMakes(year: number): string[] {
  const entry = CATALOG_BY_YEAR[year]
  if (!entry) return []
  return Object.keys(entry.makes).sort()
}

export function getModels(year: number, make: string): string[] {
  const models = CATALOG_BY_YEAR[year]?.makes[make]?.models
  if (!models) return []
  return Object.keys(models).sort()
}

export function getTrims(year: number, make: string, model: string): string[] {
  const trims = CATALOG_BY_YEAR[year]?.makes[make]?.models[model]
  return trims ? [...trims] : []
}

export function buildVehicleId(
  year: number,
  make: string,
  model: string,
  trim: string,
): string {
  return `${year}-${make}-${model}-${trim}`
    .toLowerCase()
    .replace(/\s+/g, '-')
}

/** Flat list for existing-vehicle model search */
export type CatalogVehicleOption = {
  id: string
  year: number
  make: string
  model: string
  trim: string
  label: string
}

export function getAllCatalogVehicles(): CatalogVehicleOption[] {
  const options: CatalogVehicleOption[] = []

  for (const year of YEARS) {
    for (const make of getMakes(year)) {
      for (const model of getModels(year, make)) {
        for (const trim of getTrims(year, make, model)) {
          const id = buildVehicleId(year, make, model, trim)
          options.push({
            id,
            year,
            make,
            model,
            trim,
            label: `${year} ${make} ${model} — ${trim}`,
          })
        }
      }
    }
  }

  return options
}
