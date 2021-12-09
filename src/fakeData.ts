import { Device, FakeData } from './../@types/fakeData';
import * as fs from 'fs';

export function generateFakeData(interval: number, device: Device): void {
  const datas: FakeData[] = [];
  let deviceId = 0;
  // it's true if device is started
  let status = true;
  setInterval(
    () => {
      status = !status;
    },
    status ? device.interval_on : device.interval_off,
  );
  setInterval(() => {
    const fakeData: FakeData = {
      id: ++deviceId,
      intensity: status
        ? Math.floor(
            Math.random() * (device.start_max - device.start_min) +
              device.start_min,
          )
        : Math.floor(
            Math.random() * (device.off_max - device.off_min) + device.off_min,
          ),
      name: device.name,
      time: new Date().getTime(),
    };
    datas.push(fakeData);
  }, interval);
  process.on('SIGINT', () => {
    fs.writeFileSync(
      `./data/data_${device.name}.json`,
      JSON.stringify(datas, null, 2),
    );
  });
}
