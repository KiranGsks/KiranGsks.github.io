import type { MakeInfo } from './types'
import { yearRange } from './types'

/** Indian market bike catalog — major manufacturers */

export const HERO: MakeInfo = {
  name: 'Hero',
  models: [
    {
      name: 'Splendor Plus',
      yearsAvailable: yearRange(2010, 2024),
      variants: [
        { name: 'Kick Start', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
        { name: 'Self Start', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
        { name: 'Self Alloy', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
      ],
    },
    {
      name: 'HF Deluxe',
      yearsAvailable: yearRange(2014, 2024),
      variants: [
        { name: 'Kick Start', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
        { name: 'Self Start', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
        { name: 'i3S', fuelType: 'petrol', transmission: 'manual', engineCC: 97 },
      ],
    },
    {
      name: 'Xtreme 160R',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'Front Disc', fuelType: 'petrol', transmission: 'manual', engineCC: 163 },
        { name: 'Double Disc', fuelType: 'petrol', transmission: 'manual', engineCC: 163 },
        { name: 'Connected', fuelType: 'petrol', transmission: 'manual', engineCC: 163 },
      ],
    },
    {
      name: 'XPulse 200',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: '2V', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: '4V', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: '4V Rally Edition', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
      ],
    },
  ],
}

export const HONDA_BIKES: MakeInfo = {
  name: 'Honda',
  models: [
    {
      name: 'Activa 6G',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'automatic', engineCC: 109 },
        { name: 'DLX', fuelType: 'petrol', transmission: 'automatic', engineCC: 109 },
      ],
    },
    {
      name: 'Shine',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Drum', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
        { name: 'Disc', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
        { name: 'Disc CBS', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
      ],
    },
    {
      name: 'Unicorn',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 162 },
        { name: 'CBS', fuelType: 'petrol', transmission: 'manual', engineCC: 162 },
      ],
    },
    {
      name: 'Hornet 2.0',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 184 },
        { name: 'Repsol Edition', fuelType: 'petrol', transmission: 'manual', engineCC: 184 },
      ],
    },
    {
      name: 'CB350',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'DLX', fuelType: 'petrol', transmission: 'manual', engineCC: 348 },
        { name: 'DLX Pro', fuelType: 'petrol', transmission: 'manual', engineCC: 348 },
        { name: 'RS', fuelType: 'petrol', transmission: 'manual', engineCC: 348 },
      ],
    },
  ],
}

export const BAJAJ: MakeInfo = {
  name: 'Bajaj',
  models: [
    {
      name: 'Pulsar 150',
      yearsAvailable: yearRange(2010, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 149 },
        { name: 'Twin Disc', fuelType: 'petrol', transmission: 'manual', engineCC: 149 },
        { name: 'Neon', fuelType: 'petrol', transmission: 'manual', engineCC: 149 },
      ],
    },
    {
      name: 'Pulsar NS200',
      yearsAvailable: yearRange(2017, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
      ],
    },
    {
      name: 'Dominar 400',
      yearsAvailable: yearRange(2017, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
        { name: 'Touring', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
      ],
    },
    {
      name: 'Pulsar RS200',
      yearsAvailable: yearRange(2015, 2024),
      variants: [
        { name: 'Non-ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
      ],
    },
  ],
}

export const ROYAL_ENFIELD: MakeInfo = {
  name: 'Royal Enfield',
  models: [
    {
      name: 'Classic 350',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Halcyon', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Halcyon Dual Channel', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Signals', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Dark', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Chrome', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
      ],
    },
    {
      name: 'Bullet 350',
      yearsAvailable: yearRange(2010, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 346 },
        { name: 'ES', fuelType: 'petrol', transmission: 'manual', engineCC: 346 },
        { name: 'Military Silver', fuelType: 'petrol', transmission: 'manual', engineCC: 346 },
      ],
    },
    {
      name: 'Meteor 350',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'Fireball', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Stellar', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Supernova', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
      ],
    },
    {
      name: 'Hunter 350',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Retro', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Metro', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
        { name: 'Rebel', fuelType: 'petrol', transmission: 'manual', engineCC: 349 },
      ],
    },
    {
      name: 'Himalayan',
      yearsAvailable: yearRange(2016, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 411 },
        { name: 'Sleet', fuelType: 'petrol', transmission: 'manual', engineCC: 411 },
        { name: 'Granite', fuelType: 'petrol', transmission: 'manual', engineCC: 411 },
      ],
    },
  ],
}

export const TVS: MakeInfo = {
  name: 'TVS',
  models: [
    {
      name: 'Apache RTR 160',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: '2V', fuelType: 'petrol', transmission: 'manual', engineCC: 159 },
        { name: '4V', fuelType: 'petrol', transmission: 'manual', engineCC: 159 },
        { name: '4V Special Edition', fuelType: 'petrol', transmission: 'manual', engineCC: 159 },
      ],
    },
    {
      name: 'Apache RTR 200',
      yearsAvailable: yearRange(2016, 2024),
      variants: [
        { name: '4V', fuelType: 'petrol', transmission: 'manual', engineCC: 197 },
        { name: '4V ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 197 },
      ],
    },
    {
      name: 'Jupiter',
      yearsAvailable: yearRange(2013, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'automatic', engineCC: 109 },
        { name: 'ZX', fuelType: 'petrol', transmission: 'automatic', engineCC: 109 },
        { name: 'Classic', fuelType: 'petrol', transmission: 'automatic', engineCC: 109 },
      ],
    },
    {
      name: 'Ntorq 125',
      yearsAvailable: yearRange(2018, 2024),
      variants: [
        { name: 'Drum', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'Disc', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'Race Edition', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'Super Squad Edition', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
      ],
    },
    {
      name: 'Raider 125',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Drum', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
        { name: 'Disc', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
      ],
    },
  ],
}

export const YAMAHA: MakeInfo = {
  name: 'Yamaha',
  models: [
    {
      name: 'FZ-S V3',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 149 },
        { name: 'DLX', fuelType: 'petrol', transmission: 'manual', engineCC: 149 },
      ],
    },
    {
      name: 'R15 V4',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
        { name: 'M', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
        { name: 'Monster Energy', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
      ],
    },
    {
      name: 'MT-15 V2',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
        { name: 'Version 2.0', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
      ],
    },
    {
      name: 'Ray ZR 125',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'Drum', fuelType: 'petrol', transmission: 'automatic', engineCC: 125 },
        { name: 'Disc', fuelType: 'petrol', transmission: 'automatic', engineCC: 125 },
        { name: 'Street Rally', fuelType: 'petrol', transmission: 'automatic', engineCC: 125 },
      ],
    },
  ],
}

export const KTM: MakeInfo = {
  name: 'KTM',
  models: [
    {
      name: 'Duke 125',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 124 },
      ],
    },
    {
      name: 'Duke 200',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
      ],
    },
    {
      name: 'Duke 390',
      yearsAvailable: yearRange(2013, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
      ],
    },
    {
      name: 'RC 200',
      yearsAvailable: yearRange(2014, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 199 },
      ],
    },
    {
      name: 'RC 390',
      yearsAvailable: yearRange(2014, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
        { name: 'GP Edition', fuelType: 'petrol', transmission: 'manual', engineCC: 373 },
      ],
    },
  ],
}

export const SUZUKI_BIKES: MakeInfo = {
  name: 'Suzuki',
  models: [
    {
      name: 'Access 125',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'Disc', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'Special Edition', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
      ],
    },
    {
      name: 'Gixxer 150',
      yearsAvailable: yearRange(2014, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 155 },
      ],
    },
    {
      name: 'Gixxer 250',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'manual', engineCC: 249 },
        { name: 'ABS', fuelType: 'petrol', transmission: 'manual', engineCC: 249 },
      ],
    },
    {
      name: 'Burgman Street',
      yearsAvailable: yearRange(2018, 2024),
      variants: [
        { name: 'Standard', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
        { name: 'EX', fuelType: 'petrol', transmission: 'automatic', engineCC: 124 },
      ],
    },
  ],
}
