import type { MakeInfo } from './types'
import { yearRange } from './types'

/** Volkswagen, Skoda, Ford (discontinued but in used market), Honda, Toyota */

export const VOLKSWAGEN: MakeInfo = {
  name: 'Volkswagen',
  models: [
    {
      name: 'Polo',
      yearsAvailable: yearRange(2010, 2022),
      variants: [
        { name: 'Trendline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Comfortline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Highline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Highline+', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'GT TSI', fuelType: 'petrol', transmission: 'automatic', engineCC: 999 },
        { name: 'Trendline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Comfortline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Highline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'GT TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'Vento',
      yearsAvailable: yearRange(2010, 2022),
      variants: [
        { name: 'Trendline', fuelType: 'petrol', transmission: 'manual', engineCC: 1198 },
        { name: 'Comfortline', fuelType: 'petrol', transmission: 'manual', engineCC: 1198 },
        { name: 'Highline', fuelType: 'petrol', transmission: 'manual', engineCC: 1198 },
        { name: 'Highline+', fuelType: 'petrol', transmission: 'manual', engineCC: 1198 },
        { name: 'Highline TSI AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1197 },
        { name: 'Trendline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Comfortline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Highline TDI', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Highline+ TDI DSG', fuelType: 'diesel', transmission: 'dct', engineCC: 1498 },
      ],
    },
    {
      name: 'Taigun',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'Comfortline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Highline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Topline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Topline AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 999 },
        { name: 'GT', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'GT DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
        { name: 'GT+ DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
      ],
    },
    {
      name: 'Virtus',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Comfortline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Highline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Topline', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Topline AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 999 },
        { name: 'GT', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'GT DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
        { name: 'GT+ DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
      ],
    },
  ],
}

export const FORD: MakeInfo = {
  name: 'Ford',
  models: [
    {
      name: 'Figo',
      yearsAvailable: yearRange(2010, 2021),
      variants: [
        { name: 'Ambiente', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Trend', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium+', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1497 },
        { name: 'Ambiente TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Trend TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium+ TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'EcoSport',
      yearsAvailable: yearRange(2013, 2022),
      variants: [
        { name: 'Ambiente', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Trend', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Titanium', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Titanium+', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Titanium+ AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1497 },
        { name: 'S EcoBoost', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Ambiente TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Trend TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium+ TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'Aspire',
      yearsAvailable: yearRange(2015, 2021),
      variants: [
        { name: 'Ambiente', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Trend', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium+', fuelType: 'petrol', transmission: 'manual', engineCC: 1194 },
        { name: 'Titanium+ AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1497 },
        { name: 'Trend TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'Titanium+ TDCi', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'Endeavour',
      yearsAvailable: yearRange(2016, 2022),
      variants: [
        { name: 'Trend 4x2', fuelType: 'diesel', transmission: 'manual', engineCC: 1996 },
        { name: 'Titanium 4x2 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1996 },
        { name: 'Titanium+ 4x2 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1996 },
        { name: 'Titanium+ 4x4 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1996 },
        { name: 'Sport 4x4 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1996 },
      ],
    },
  ],
}

export const HONDA: MakeInfo = {
  name: 'Honda',
  models: [
    {
      name: 'City',
      yearsAvailable: yearRange(2009, 2024),
      variants: [
        { name: 'SV', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'V', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'VX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'ZX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'V CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'VX CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'ZX CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'SV Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'V Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'VX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'ZX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'Amaze',
      yearsAvailable: yearRange(2013, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'VX', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'VX CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1199 },
        { name: 'S Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'VX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'WR-V',
      yearsAvailable: yearRange(2017, 2023),
      variants: [
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'VX', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'S Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
        { name: 'VX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1498 },
      ],
    },
    {
      name: 'Elevate',
      yearsAvailable: yearRange(2023, 2024),
      variants: [
        { name: 'SV', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'V', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'VX', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'ZX', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'V CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1498 },
        { name: 'VX CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1498 },
        { name: 'ZX CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1498 },
      ],
    },
  ],
}

export const TOYOTA: MakeInfo = {
  name: 'Toyota',
  models: [
    {
      name: 'Innova Crysta',
      yearsAvailable: yearRange(2016, 2024),
      variants: [
        { name: 'GX', fuelType: 'petrol', transmission: 'manual', engineCC: 2694 },
        { name: 'VX', fuelType: 'petrol', transmission: 'manual', engineCC: 2694 },
        { name: 'ZX', fuelType: 'petrol', transmission: 'manual', engineCC: 2694 },
        { name: 'ZX AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 2694 },
        { name: 'GX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2393 },
        { name: 'VX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2393 },
        { name: 'ZX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2393 },
        { name: 'ZX Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2393 },
      ],
    },
    {
      name: 'Fortuner',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: '4x2 MT', fuelType: 'petrol', transmission: 'manual', engineCC: 2694 },
        { name: '4x2 AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 2694 },
        { name: '4x2 Diesel MT', fuelType: 'diesel', transmission: 'manual', engineCC: 2755 },
        { name: '4x2 Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2755 },
        { name: '4x4 Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2755 },
        { name: 'Legender 4x2 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2755 },
        { name: 'Legender 4x4 AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2755 },
      ],
    },
    {
      name: 'Glanza',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'G', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'V', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'S AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1197 },
        { name: 'G AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1197 },
        { name: 'V AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1197 },
      ],
    },
    {
      name: 'Urban Cruiser Hyryder',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1462 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1462 },
        { name: 'G', fuelType: 'petrol', transmission: 'manual', engineCC: 1462 },
        { name: 'V', fuelType: 'petrol', transmission: 'manual', engineCC: 1462 },
        { name: 'S Hybrid', fuelType: 'hybrid', transmission: 'automatic', engineCC: 1462 },
        { name: 'V Hybrid', fuelType: 'hybrid', transmission: 'automatic', engineCC: 1462 },
      ],
    },
  ],
}

export const RENAULT: MakeInfo = {
  name: 'Renault',
  models: [
    {
      name: 'Kwid',
      yearsAvailable: yearRange(2015, 2024),
      variants: [
        { name: 'RXE', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXL', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Climber', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 999 },
        { name: 'Climber AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 999 },
      ],
    },
    {
      name: 'Kiger',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'RXE', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXL', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXZ', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT Turbo', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXZ Turbo CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 999 },
      ],
    },
    {
      name: 'Triber',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'RXE', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXL', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXZ', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'RXT AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 999 },
        { name: 'RXZ AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 999 },
      ],
    },
  ],
}

export const SKODA: MakeInfo = {
  name: 'Skoda',
  models: [
    {
      name: 'Slavia',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Active', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Ambition', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Style', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Style AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 999 },
        { name: 'Style 1.5 TSI', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'Style 1.5 DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
      ],
    },
    {
      name: 'Kushaq',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'Active', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Ambition', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Style', fuelType: 'petrol', transmission: 'manual', engineCC: 999 },
        { name: 'Style AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 999 },
        { name: 'Style 1.5 TSI', fuelType: 'petrol', transmission: 'manual', engineCC: 1498 },
        { name: 'Style 1.5 DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
        { name: 'Monte Carlo 1.5 DSG', fuelType: 'petrol', transmission: 'dct', engineCC: 1498 },
      ],
    },
  ],
}

export const MG: MakeInfo = {
  name: 'MG',
  models: [
    {
      name: 'Hector',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'Style', fuelType: 'petrol', transmission: 'manual', engineCC: 1451 },
        { name: 'Super', fuelType: 'petrol', transmission: 'manual', engineCC: 1451 },
        { name: 'Smart', fuelType: 'petrol', transmission: 'manual', engineCC: 1451 },
        { name: 'Sharp', fuelType: 'petrol', transmission: 'manual', engineCC: 1451 },
        { name: 'Sharp CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1451 },
        { name: 'Style Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'Smart Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'Sharp Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
      ],
    },
    {
      name: 'Astor',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'Style', fuelType: 'petrol', transmission: 'manual', engineCC: 1349 },
        { name: 'Super', fuelType: 'petrol', transmission: 'manual', engineCC: 1349 },
        { name: 'Smart', fuelType: 'petrol', transmission: 'manual', engineCC: 1349 },
        { name: 'Sharp', fuelType: 'petrol', transmission: 'manual', engineCC: 1349 },
        { name: 'Sharp AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1349 },
        { name: 'Savvy CVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1451 },
      ],
    },
  ],
}
