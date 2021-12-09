export interface FakeData {
  id: number;
  intensity: number;
  time: Date | number;
  name: string;
}

export interface Device {
  name: string;
  off_min: number;
  off_max: number;
  start_max: number;
  start_min: number;
  interval_off: number;
  interval_on: number;
}

export const devicesName: Device[] = [
  {
    name: 'fridge',
    off_min: 115,
    off_max: 125,
    start_max: 170,
    start_min: 160,
    interval_off: 1000 * 60 * 1,
    interval_on: 1000 * 30,
  },
  {
    name: 'owen',
    off_min: 450,
    off_max: 470,
    start_max: 2200,
    start_min: 1800,
    interval_off: 1000,
    interval_on: 1000 * 60 * 1.5,
  },
];
