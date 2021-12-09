import { FakeData } from './../@types/fakeData';

const devicesName: {
  name: string;
  off_min: number;
  off_max: number;
  start_max: number;
  start_min: number;
}[] = [
  {
    name: 'fridge',
    off_min: 115,
    off_max: 125,
    start_max: 170,
    start_min: 160,
  },
  {
    name: 'owen',
    off_min: 450,
    off_max: 470,
    start_max: 2200,
    start_min: 1800,
  },
];

export function generateFakeData(interval: number): void {
  let deviceId = 0;
  setInterval(() => {
    const rd = Math.floor(Math.random() * (devicesName.length - 1 - 0 + 1) + 0);
    const fakeData: FakeData = {
      id: ++deviceId,
      intensity: Math.floor(
        Math.random() * (devicesName[rd].off_max - devicesName[rd].off_min) +
          devicesName[rd].off_min,
      ),
      name: devicesName[rd].name,
      time: new Date().getTime(),
    };
    console.log(fakeData);
  }, interval);
}
