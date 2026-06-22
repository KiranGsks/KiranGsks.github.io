import type { MakeInfo } from './types'
import { yearRange } from './types'

/** Hyundai, Kia, Tata, Mahindra */

export const HYUNDAI: MakeInfo = {
  name: 'Hyundai',
  models: [
    {
      name: 'i20',
      yearsAvailable: yearRange(2012, 2024),
      variants: [
        { name: 'Era', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Magna', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Sportz', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Asta', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Asta(O)', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Sportz IVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1197 },
        { name: 'Asta IVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1197 },
        { name: 'Sportz Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 998 },
        { name: 'Magna CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'Sportz CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'Asta CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
      ],
    },
    {
      name: 'Creta',
      yearsAvailable: yearRange(2015, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'EX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'S IVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'SX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'SX(O)', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'SX Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'SX(O) Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'E CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'S CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'SX CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'SX(O) CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
      ],
    },
    {
      name: 'Venue',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'SX', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'SX(O)', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'S Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 998 },
        { name: 'SX Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 998 },
        { name: 'S CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'SX CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
      ],
    },
    {
      name: 'Verna',
      yearsAvailable: yearRange(2011, 2024),
      variants: [
        { name: 'E', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'S', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'SX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'SX(O)', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'SX IVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'SX Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'S CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'SX CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'SX(O) CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
      ],
    },
    {
      name: 'i10 Grand',
      yearsAvailable: yearRange(2013, 2023),
      variants: [
        { name: 'Era', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Magna', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Sportz', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Asta', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'Sportz AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1197 },
        { name: 'Magna CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1186 },
        { name: 'Sportz CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1186 },
        { name: 'Magna CNG', fuelType: 'cng', transmission: 'manual', engineCC: 1197 },
      ],
    },
  ],
}

export const TATA: MakeInfo = {
  name: 'Tata',
  models: [
    {
      name: 'Nexon',
      yearsAvailable: yearRange(2017, 2024),
      variants: [
        { name: 'XE', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XM', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ+', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZA+', fuelType: 'petrol', transmission: 'amt', engineCC: 1199 },
        { name: 'XM Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'XZ Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'XZ+ Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'XZA+ Diesel', fuelType: 'diesel', transmission: 'amt', engineCC: 1497 },
      ],
    },
    {
      name: 'Punch',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'Pure', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'Adventure', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'Accomplished', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'Creative', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'Adventure AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1199 },
        { name: 'Accomplished AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1199 },
        { name: 'Creative AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1199 },
      ],
    },
    {
      name: 'Altroz',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'XE', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XM', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ+', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ+ Turbo', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XM Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'XZ Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'XZ+ Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
      ],
    },
    {
      name: 'Harrier',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'XE', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'XM', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'XZ', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'XZ+', fuelType: 'diesel', transmission: 'manual', engineCC: 1956 },
        { name: 'XZA', fuelType: 'diesel', transmission: 'automatic', engineCC: 1956 },
        { name: 'XZA+', fuelType: 'diesel', transmission: 'automatic', engineCC: 1956 },
      ],
    },
    {
      name: 'Tiago',
      yearsAvailable: yearRange(2016, 2024),
      variants: [
        { name: 'XE', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XM', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XT', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ+', fuelType: 'petrol', transmission: 'manual', engineCC: 1199 },
        { name: 'XZ+ AMT', fuelType: 'petrol', transmission: 'amt', engineCC: 1199 },
        { name: 'XM CNG', fuelType: 'cng', transmission: 'manual', engineCC: 1199 },
      ],
    },
  ],
}

export const MAHINDRA: MakeInfo = {
  name: 'Mahindra',
  models: [
    {
      name: 'XUV700',
      yearsAvailable: yearRange(2021, 2024),
      variants: [
        { name: 'MX', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'AX3', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'AX5', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'AX7', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'AX7 AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1997 },
        { name: 'MX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'AX5 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'AX7 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'AX7 Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2184 },
      ],
    },
    {
      name: 'Thar',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'AX Std', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'AX Opt', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'LX', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'LX AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1997 },
        { name: 'AX Opt Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'LX Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'LX Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2184 },
      ],
    },
    {
      name: 'Scorpio-N',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Z4', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'Z6', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'Z8', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'Z8L', fuelType: 'petrol', transmission: 'manual', engineCC: 1997 },
        { name: 'Z8L AT', fuelType: 'petrol', transmission: 'automatic', engineCC: 1997 },
        { name: 'Z4 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'Z8 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'Z8L Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 2184 },
        { name: 'Z8L Diesel AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 2184 },
      ],
    },
    {
      name: 'XUV300',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'W4', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'W6', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'W8', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'W8(O)', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'W6 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'W8 Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
        { name: 'W8(O) Diesel', fuelType: 'diesel', transmission: 'manual', engineCC: 1497 },
      ],
    },
  ],
}

export const KIA: MakeInfo = {
  name: 'Kia',
  models: [
    {
      name: 'Seltos',
      yearsAvailable: yearRange(2019, 2024),
      variants: [
        { name: 'HTE', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'HTK', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'HTK+', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'HTX', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'HTX+ IVT', fuelType: 'petrol', transmission: 'cvt', engineCC: 1497 },
        { name: 'GTX+ Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'HTK+ CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'HTX CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'GTX+ CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
      ],
    },
    {
      name: 'Sonet',
      yearsAvailable: yearRange(2020, 2024),
      variants: [
        { name: 'HTE', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'HTK', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'HTK+', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'HTX', fuelType: 'petrol', transmission: 'manual', engineCC: 1197 },
        { name: 'HTX+ Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 998 },
        { name: 'GTX+ Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 998 },
        { name: 'HTK+ CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'HTX CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
        { name: 'GTX+ CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
      ],
    },
    {
      name: 'Carens',
      yearsAvailable: yearRange(2022, 2024),
      variants: [
        { name: 'Premium', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Prestige', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Prestige Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'Luxury', fuelType: 'petrol', transmission: 'manual', engineCC: 1497 },
        { name: 'Luxury+ Turbo DCT', fuelType: 'petrol', transmission: 'dct', engineCC: 1482 },
        { name: 'Prestige CRDi', fuelType: 'diesel', transmission: 'manual', engineCC: 1493 },
        { name: 'Luxury CRDi AT', fuelType: 'diesel', transmission: 'automatic', engineCC: 1493 },
      ],
    },
  ],
}
