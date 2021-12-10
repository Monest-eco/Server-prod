import { Device, FakeData } from './../@types/fakeData';
import * as fs from 'fs';

function getTimeInterval(status: boolean, device: Device): number {
  return status ? device.interval_on : device.interval_off;
}

/**
 * generate fake data for one device
 * @param interval number of minutes between each data point
 * @param device actual device
 */
export function generateFakeData(interval: number, device: Device): void {
  const datas: FakeData[] = [];
  let deviceId = 0;
  // it's true if device is started
  // manage device status
  let status = true;
  const deviceInterval = setInterval(() => {
    status = !status;
    clearInterval(deviceInterval);
    setInterval(() => {
      status = !status;
    }, getTimeInterval(status, device));
  }, getTimeInterval(status, device));
  // generate datas
  const generateTimer = setInterval(() => {
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
      status: status ? 'on' : 'off',
    };
    console.log(fakeData);
    datas.push(fakeData);
  }, interval);
  // write datas to file
  process.on('SIGINT', () => {
    fs.writeFileSync(
      `./data/data_${device.name}.json`,
      JSON.stringify(datas, null, 2),
    );
    clearInterval(generateTimer);
    process.exit();
  });
}
