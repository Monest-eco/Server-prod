import { FakeData } from './../@types/fakeData';

export function generateFakeData(interval: number): void {
  let deviceId = 0;
  setInterval(() => {
    const fakeData: FakeData = {
      id: ++deviceId,
      intensity: Math.floor(Math.random() * 100),
      time: new Date().getTime(),
    };
    console.log(fakeData);
  }, interval);
}
