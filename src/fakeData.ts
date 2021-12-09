import { Device, FakeData } from './../@types/fakeData';

export function generateFakeData(interval: number, device: Device): void {
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
    console.log(fakeData);
  }, interval);
}
