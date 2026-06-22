/**
 * Static vehicle knowledge catalog for popular Indian cars.
 * 
 * Contains generation/platform info, engine details, pros/cons,
 * and notable highlights for common vehicles in the Indian market.
 * 
 * This serves as the primary data source for the Vehicle Knowledge Page.
 * For vehicles not in this catalog, the AI model generates the content.
 */

export type EngineBlock = {
  id: string
  name: string
  displacement: number
  cylinders: number
  configuration: string
  fuelType: 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid'
  power?: string
  torque?: string
  technology: string[]
  transmissions: string[]
  highlights?: string[]
}

export type VehicleGeneration = {
  name: string
  productionYears: [number, number]
  platform?: string
  bodyStyle: string
  engines: EngineBlock[]
  highlights: string[]
  knownIssues?: string[]
  prosAndCons: {
    pros: string[]
    cons: string[]
  }
}

export type VehicleKnowledge = {
  make: string
  model: string
  generations: VehicleGeneration[]
}

/** Find the matching generation for a given year. */
export function findGeneration(knowledge: VehicleKnowledge, year: number): VehicleGeneration | null {
  return knowledge.generations.find(
    (gen) => year >= gen.productionYears[0] && year <= gen.productionYears[1]
  ) ?? null
}

/** Look up vehicle knowledge from the static catalog. Returns null if not found. */
export function getVehicleKnowledge(make: string, model: string): VehicleKnowledge | null {
  const key = `${make.toLowerCase().trim()}|${model.toLowerCase().trim()}`
  return VEHICLE_CATALOG[key] ?? null
}

// ─── CATALOG DATA ────────────────────────────────────────────────────────────

const VEHICLE_CATALOG: Record<string, VehicleKnowledge> = {
  'maruti suzuki|swift': {
    make: 'Maruti Suzuki',
    model: 'Swift',
    generations: [
      {
        name: '2nd Generation',
        productionYears: [2011, 2017],
        platform: 'Suzuki platform (revised)',
        bodyStyle: '5-door Hatchback',
        engines: [
          {
            id: 'swift-2gen-1.2-petrol',
            name: '1.2L K12B Petrol',
            displacement: 1197,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '83 PS @ 6000 rpm',
            torque: '113 Nm @ 4200 rpm',
            technology: ['DOHC', '16-valve', 'Chain-driven camshaft', 'Multi-point fuel injection', 'VVT (from 2015)'],
            transmissions: ['5-speed Manual'],
            highlights: ['K-Series engine — known for reliability', 'Chain-driven — no belt replacement needed'],
          },
          {
            id: 'swift-2gen-1.3-diesel',
            name: '1.3L DDiS Diesel (Fiat Multijet)',
            displacement: 1248,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'diesel',
            power: '75 PS @ 4000 rpm',
            torque: '190 Nm @ 2000 rpm',
            technology: ['DOHC', 'Common-rail direct injection', 'Turbo', 'Belt-driven camshaft', 'Variable geometry turbo'],
            transmissions: ['5-speed Manual'],
            highlights: ['Fiat Multijet — proven reliability', 'Timing belt replacement every 60,000-90,000 km'],
          },
        ],
        highlights: [
          'Refreshed design with better interior quality',
          'Added driver airbag from 2014 onwards',
          'Improved NVH over 1st generation',
          'Keyless entry in top variants',
        ],
        knownIssues: [
          'Diesel timing belt — must verify replacement history',
          'Steering column noise in some units',
          'AC blower motor failures reported',
          'Clutch wear if driven heavily in traffic',
        ],
        prosAndCons: {
          pros: [
            'Proven K-Series petrol engine — very reliable',
            'Best-in-class fuel efficiency',
            'Excellent resale value',
            'Affordable maintenance costs',
            'Peppy driving experience',
          ],
          cons: [
            'Limited rear seat space',
            'No automatic transmission option',
            'Basic safety (ABS only in top variants)',
            'Diesel engine is noisy at idle',
          ],
        },
      },
      {
        name: '3rd Generation (Current)',
        productionYears: [2018, 2026],
        platform: 'HEARTECT lightweight platform',
        bodyStyle: '5-door Hatchback',
        engines: [
          {
            id: 'swift-3gen-1.2-petrol',
            name: '1.2L K12C DualJet Petrol',
            displacement: 1197,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '90 PS @ 6000 rpm',
            torque: '113 Nm @ 4400 rpm',
            technology: ['DOHC', '16-valve', 'Chain-driven camshaft', 'Dual injection (DualJet)', 'VVT', 'Idle Start-Stop'],
            transmissions: ['5-speed Manual', '5-speed AMT (AGS)'],
            highlights: ['DualJet technology for better efficiency', 'Available with AMT for city convenience'],
          },
          {
            id: 'swift-3gen-1.2-cng',
            name: '1.2L K12N Petrol + S-CNG',
            displacement: 1197,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'cng',
            power: '77 PS (CNG mode)',
            torque: '98.5 Nm (CNG mode)',
            technology: ['DOHC', 'Chain-driven camshaft', 'Factory-fitted CNG', 'Dual ECU'],
            transmissions: ['5-speed Manual'],
            highlights: ['Factory-fitted CNG — no aftermarket concerns', 'Lowest running cost in segment'],
          },
        ],
        highlights: [
          'HEARTECT platform — 40kg lighter than predecessor',
          'Dual airbags standard across all variants',
          'ABS with EBD standard',
          '7-inch SmartPlay touchscreen in top variants',
          'Significantly improved crash safety over 2nd gen',
        ],
        knownIssues: [
          'AMT can feel jerky in stop-and-go traffic',
          'Infotainment system lag reported in early 2018 models',
          'Rear suspension can feel stiff on bad roads',
          'Paint quality concerns — chips easily on highway driving',
        ],
        prosAndCons: {
          pros: [
            'Lightest in segment — excellent performance feel',
            'Class-leading fuel efficiency (23+ km/l claimed)',
            'Strong safety package (dual airbags, ABS standard)',
            'Proven K-Series reliability',
            'AMT option for automatic convenience',
            'Excellent resale value — best in segment',
          ],
          cons: [
            'Rear seat still not spacious for tall passengers',
            'No diesel option (discontinued from 2020)',
            'AMT is not as smooth as a torque converter',
            'Boot space still modest (268L)',
            'No sunroof option',
          ],
        },
      },
    ],
  },

  'hyundai|creta': {
    make: 'Hyundai',
    model: 'Creta',
    generations: [
      {
        name: '1st Generation',
        productionYears: [2015, 2019],
        platform: 'Hyundai-Kia GS platform',
        bodyStyle: '5-door Compact SUV',
        engines: [
          {
            id: 'creta-1gen-1.6-petrol',
            name: '1.6L Gamma Petrol',
            displacement: 1591,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '123 PS @ 6400 rpm',
            torque: '151 Nm @ 4850 rpm',
            technology: ['DOHC', 'CVVT (Dual)', 'Chain-driven camshaft', 'Multi-point injection'],
            transmissions: ['6-speed Manual', '6-speed Automatic'],
            highlights: ['Smooth and refined Gamma engine', 'Chain-driven — no belt replacement'],
          },
          {
            id: 'creta-1gen-1.6-diesel',
            name: '1.6L U2 CRDi Diesel',
            displacement: 1582,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'diesel',
            power: '128 PS @ 4000 rpm',
            torque: '260 Nm @ 1500-3000 rpm',
            technology: ['Chain-driven camshaft', 'Common-rail direct injection', 'VGT turbo', 'Intercooler'],
            transmissions: ['6-speed Manual', '6-speed Automatic'],
            highlights: ['Most powerful engine option', 'Available with automatic — rare in segment at launch'],
          },
        ],
        highlights: [
          'Created the compact SUV segment in India',
          'Premium interior quality for its price point',
          'First compact SUV with automatic + diesel combo',
          'Ventilated front seats in top variant',
        ],
        knownIssues: [
          'Clutch judder in 1.6 diesel manual (early batches)',
          'Steering rack noise at low speeds',
          'Rear suspension can bottom out when fully loaded',
          'AC cooling can be slow in peak summer',
        ],
        prosAndCons: {
          pros: [
            'Premium feel — best interior in segment at launch',
            'Multiple engine and transmission options',
            'Strong diesel performance',
            'Good ground clearance (190mm)',
            'Feature-loaded top variants',
          ],
          cons: [
            'Petrol engine feels underpowered for the weight',
            'Rear seat could be more spacious',
            'No all-wheel drive option',
            'Service costs higher than Maruti competitors',
          ],
        },
      },
      {
        name: '2nd Generation (Current)',
        productionYears: [2020, 2026],
        platform: 'Hyundai-Kia K2 platform',
        bodyStyle: '5-door Compact SUV',
        engines: [
          {
            id: 'creta-2gen-1.5-petrol',
            name: '1.5L MPi Petrol',
            displacement: 1497,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '115 PS @ 6300 rpm',
            torque: '144 Nm @ 4500 rpm',
            technology: ['DOHC', 'CVVT', 'Chain-driven camshaft', 'Multi-point injection'],
            transmissions: ['6-speed Manual', 'IVT (CVT)'],
            highlights: ['Smooth and efficient', 'IVT is smooth but not sporty'],
          },
          {
            id: 'creta-2gen-1.5-diesel',
            name: '1.5L U2 CRDi Diesel',
            displacement: 1493,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'diesel',
            power: '115 PS @ 4000 rpm',
            torque: '250 Nm @ 1500-2750 rpm',
            technology: ['Chain-driven camshaft', 'Common-rail direct injection', 'VGT turbo'],
            transmissions: ['6-speed Manual', '6-speed Automatic'],
            highlights: ['Strong mid-range torque', 'Automatic option available'],
          },
          {
            id: 'creta-2gen-1.4-turbo',
            name: '1.4L Kappa Turbo GDi Petrol',
            displacement: 1353,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '140 PS @ 6000 rpm',
            torque: '242 Nm @ 1500-3200 rpm',
            technology: ['DOHC', 'Turbo GDi (direct injection)', 'Chain-driven camshaft', 'Intercooler'],
            transmissions: ['7-speed DCT'],
            highlights: ['Most powerful option — sporty character', 'DCT is quick-shifting'],
          },
        ],
        highlights: [
          'Completely redesigned — larger and more premium',
          'Panoramic sunroof in top variants',
          'ADAS features (from 2024 facelift)',
          'Connected car features with BlueLink',
          '10.25-inch touchscreen infotainment',
          'Bose premium sound system option',
        ],
        knownIssues: [
          'DCT can feel hesitant at low speeds in traffic',
          'IVT rubber-band effect during hard acceleration',
          'Panoramic sunroof rattles reported',
          'Turbo petrol requires 95-octane fuel for best performance',
        ],
        prosAndCons: {
          pros: [
            'Segment-leading features and technology',
            'Three powertrain options — something for everyone',
            'Turbo petrol + DCT is genuinely fun to drive',
            'Premium cabin quality',
            'Strong safety package (6 airbags, ESC, HSA)',
          ],
          cons: [
            'Base petrol feels underpowered',
            'IVT not engaging for enthusiasts',
            'Higher price than competitors',
            'Service costs are premium',
            'Turbo petrol only with DCT — no manual option',
          ],
        },
      },
    ],
  },

  'tata|nexon': {
    make: 'Tata',
    model: 'Nexon',
    generations: [
      {
        name: '1st Generation (Current)',
        productionYears: [2017, 2026],
        platform: 'Tata ALFA Architecture (from 2020 facelift)',
        bodyStyle: '5-door Sub-compact SUV',
        engines: [
          {
            id: 'nexon-1.2-turbo-petrol',
            name: '1.2L Revotron Turbo Petrol',
            displacement: 1199,
            cylinders: 3,
            configuration: 'Inline-3',
            fuelType: 'petrol',
            power: '120 PS @ 5500 rpm',
            torque: '170 Nm @ 1750-4000 rpm',
            technology: ['Turbocharged', 'Multi-point injection', 'Belt-driven camshaft', 'Intercooler'],
            transmissions: ['6-speed Manual', '6-speed AMT'],
            highlights: ['3-cylinder turbo — punchy low-end', 'Belt-driven cam — replacement at ~90,000 km'],
          },
          {
            id: 'nexon-1.5-diesel',
            name: '1.5L Revotorq Diesel',
            displacement: 1497,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'diesel',
            power: '110 PS @ 4000 rpm',
            torque: '260 Nm @ 1500-2750 rpm',
            technology: ['Common-rail direct injection', 'Turbo', 'Belt-driven camshaft', 'Intercooler'],
            transmissions: ['6-speed Manual', '6-speed AMT'],
            highlights: ['Strong torque for highway overtakes', 'Good fuel efficiency (17-20 km/l real-world)'],
          },
        ],
        highlights: [
          'First Indian car to score 5-star Global NCAP safety rating',
          'ALFA Architecture (from 2020) improved ride and handling',
          'Connected car features with iRA',
          'Sunroof from XZ+ variant',
          'Electric variant (Nexon EV) also available',
        ],
        knownIssues: [
          'AMT can be jerky in stop-and-go traffic',
          'Turbo lag noticeable in petrol below 1500 rpm',
          'Infotainment system can be slow/laggy',
          'Paint quality — prone to stone chips',
          'Timing belt is a maintenance item — verify service history',
        ],
        prosAndCons: {
          pros: [
            '5-star safety rating — safest in segment',
            'Punchy turbo engines (both petrol and diesel)',
            'High ground clearance (209mm)',
            'Feature-rich for the price',
            'Strong build quality — solid feel',
          ],
          cons: [
            'AMT not as smooth as torque converter automatic',
            '3-cylinder petrol has some vibration at idle',
            'Infotainment can be laggy',
            'Belt-driven cam requires scheduled replacement',
            'Resale value lower than Maruti/Hyundai',
          ],
        },
      },
    ],
  },

  'royal enfield|classic 350': {
    make: 'Royal Enfield',
    model: 'Classic 350',
    generations: [
      {
        name: 'UCE Generation',
        productionYears: [2009, 2021],
        platform: 'Single downtube spine frame',
        bodyStyle: 'Retro Cruiser Motorcycle',
        engines: [
          {
            id: 'classic350-uce',
            name: '346cc UCE',
            displacement: 346,
            cylinders: 1,
            configuration: 'Single-cylinder',
            fuelType: 'petrol',
            power: '19.8 PS @ 5250 rpm',
            torque: '28 Nm @ 4000 rpm',
            technology: ['Air-cooled', 'Pushrod OHV', 'Fuel injection (from 2017)', 'Chain-driven cam'],
            transmissions: ['5-speed Manual'],
            highlights: ['Classic thumper character', 'Pushrod design — simple and robust'],
          },
        ],
        highlights: [
          'Iconic retro design — timeless appeal',
          'Strong community and aftermarket support',
          'Fuel injection from 2017 improved reliability',
          'Dual-channel ABS from 2019',
        ],
        knownIssues: [
          'Vibrations at highway speeds (above 80 km/h)',
          'Oil leaks from engine cases — common in older units',
          'Electrical issues (pre-2017 carbureted models)',
          'Neutral finding can be difficult',
          'Chain and sprocket wear — needs regular maintenance',
        ],
        prosAndCons: {
          pros: [
            'Iconic styling — head-turner',
            'Strong low-end torque for relaxed cruising',
            'Simple engine — easy to maintain',
            'Huge aftermarket accessories ecosystem',
            'Good resale value',
          ],
          cons: [
            'Heavy for its power output (195 kg)',
            'Vibrations limit comfortable cruising speed',
            'Braking performance is average',
            'Fuel efficiency is moderate (35-40 km/l)',
            'Quality control inconsistencies in older models',
          ],
        },
      },
      {
        name: 'J-Series Generation (Current)',
        productionYears: [2021, 2026],
        platform: 'Harris Performance-developed twin downtube spine frame',
        bodyStyle: 'Retro Cruiser Motorcycle',
        engines: [
          {
            id: 'classic350-j-series',
            name: '349cc J-Series',
            displacement: 349,
            cylinders: 1,
            configuration: 'Single-cylinder',
            fuelType: 'petrol',
            power: '20.2 PS @ 6100 rpm',
            torque: '27 Nm @ 4000 rpm',
            technology: ['Air-oil cooled', 'SOHC', '4-valve', 'Chain-driven camshaft', 'Fuel injection', 'Counter-balancer'],
            transmissions: ['5-speed Manual'],
            highlights: ['Counter-balancer eliminates vibrations', 'SOHC 4-valve — more refined than UCE', 'Chain-driven cam — no belt worries'],
          },
        ],
        highlights: [
          'All-new J-Series engine — dramatically smoother',
          'New twin downtube frame — better handling',
          'Tripper navigation pod (turn-by-turn)',
          'Significantly reduced vibrations vs UCE',
          'Better brakes and suspension',
          'Same classic styling, modern engineering underneath',
        ],
        knownIssues: [
          'Tripper pod can disconnect from phone occasionally',
          'Seat comfort on long rides — aftermarket seat recommended',
          'Rear suspension preload adjustment limited',
          'Some reports of chain slack needing frequent adjustment',
        ],
        prosAndCons: {
          pros: [
            'Dramatically smoother than UCE — highway cruising is comfortable',
            'Same iconic Classic styling',
            'Better handling and braking',
            'Refined engine with counter-balancer',
            'Tripper navigation is useful',
            'Improved build quality over predecessor',
          ],
          cons: [
            'Lost some of the "thumper" character purists loved',
            'Still heavy (195 kg)',
            'Power output is modest for highway use',
            'Premium pricing over competitors',
            'Limited color options in base variant',
          ],
        },
      },
    ],
  },

  'honda|city': {
    make: 'Honda',
    model: 'City',
    generations: [
      {
        name: '4th Generation',
        productionYears: [2014, 2019],
        platform: 'Honda Global Small Car platform',
        bodyStyle: '4-door Sedan',
        engines: [
          {
            id: 'city-4gen-1.5-petrol',
            name: '1.5L i-VTEC Petrol',
            displacement: 1497,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '119 PS @ 6600 rpm',
            torque: '145 Nm @ 4600 rpm',
            technology: ['SOHC', 'i-VTEC', 'Chain-driven camshaft', 'PGM-Fi injection'],
            transmissions: ['5-speed Manual', 'CVT'],
            highlights: ['Honda i-VTEC — revs freely to redline', 'Chain-driven — zero belt maintenance'],
          },
          {
            id: 'city-4gen-1.5-diesel',
            name: '1.5L i-DTEC Diesel',
            displacement: 1498,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'diesel',
            power: '100 PS @ 3600 rpm',
            torque: '200 Nm @ 1750 rpm',
            technology: ['DOHC', 'Common-rail direct injection', 'Turbo', 'Chain-driven camshaft'],
            transmissions: ['6-speed Manual'],
            highlights: ['Honda-developed diesel — refined', 'Chain-driven — no belt worries'],
          },
        ],
        highlights: [
          'Best-in-class cabin space',
          'Honda reliability and engineering quality',
          'LED headlamps and DRLs (from 2017 facelift)',
          'Sunroof in top variant (from 2017)',
        ],
        knownIssues: [
          'CVT judder reported in some units after 50,000 km',
          'Diesel engine can be noisy at cold start',
          'Suspension is on the stiffer side',
          'AC compressor issues in some early 2014 models',
        ],
        prosAndCons: {
          pros: [
            'Exceptional cabin space for a sedan',
            'Honda reliability — engines last 200,000+ km',
            'Chain-driven cams — minimal maintenance',
            'Smooth CVT for city driving',
            'Good resale value',
          ],
          cons: [
            'Diesel only with manual — no automatic',
            'CVT saps some driving fun',
            'Firm ride quality',
            'Higher service costs than Maruti',
            'Spare parts can be expensive',
          ],
        },
      },
      {
        name: '5th Generation (Current)',
        productionYears: [2020, 2026],
        platform: 'Honda Global Small Car platform (revised)',
        bodyStyle: '4-door Sedan',
        engines: [
          {
            id: 'city-5gen-1.5-petrol',
            name: '1.5L i-VTEC Petrol',
            displacement: 1498,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'petrol',
            power: '121 PS @ 6600 rpm',
            torque: '145 Nm @ 4300 rpm',
            technology: ['DOHC', 'i-VTEC', 'Chain-driven camshaft', 'PGM-Fi injection'],
            transmissions: ['6-speed Manual', 'CVT'],
            highlights: ['Upgraded to DOHC', 'CVT with paddle shifters in top variant'],
          },
          {
            id: 'city-5gen-hybrid',
            name: '1.5L e:HEV Hybrid',
            displacement: 1498,
            cylinders: 4,
            configuration: 'Inline-4',
            fuelType: 'hybrid',
            power: '126 PS (combined)',
            torque: '253 Nm (electric motor)',
            technology: ['Atkinson cycle', 'Dual electric motors', 'Lithium-ion battery', 'Chain-driven camshaft', 'Regenerative braking'],
            transmissions: ['e-CVT (fixed gear ratio)'],
            highlights: ['Drives primarily on electric motor', 'Best-in-class fuel efficiency (26+ km/l)'],
          },
        ],
        highlights: [
          'Larger and more premium than predecessor',
          'Honda SENSING ADAS (from 2023)',
          'Lane Keep Assist and Adaptive Cruise Control',
          'e:HEV hybrid option — segment first',
          '8-inch touchscreen with wireless Android Auto/Apple CarPlay',
        ],
        knownIssues: [
          'CVT still not preferred by enthusiast drivers',
          'Hybrid battery long-term reliability unknown in Indian conditions',
          'Road noise at highway speeds',
          'Honda dealer network smaller than Maruti/Hyundai',
        ],
        prosAndCons: {
          pros: [
            'Hybrid option is a game-changer for efficiency',
            'ADAS features at this price point',
            'Honda build quality and reliability',
            'Spacious cabin with flat rear floor',
            'Chain-driven engines — low maintenance',
          ],
          cons: [
            'Hybrid is expensive (₹20L+)',
            'Diesel discontinued from 2023',
            'CVT reduces driving engagement',
            'Smaller dealer network',
            'Parts and service costs higher',
          ],
        },
      },
    ],
  },
}
