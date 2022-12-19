const button = document.getElementById("getDetails");
const details = document.getElementById("details");
const print = document.getElementById("print");

const SERVICE = "000018f0-0000-1000-8000-00805f9b34fb";
const WRITE = "00002af1-0000-1000-8000-00805f9b34fb";

const data =
  "Vuong Vam Vo \n\n\n Vuong Vam Vo \n\n\n Vuong Vam Vo \n\n\n Vuong Vam Vo \n\n\n";
let device = null;
let service = null;
let deviceHandle = null;

button.addEventListener("click", async () => {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE] }],
    });
    deviceHandle = device;
    server = await device.gatt.connect();
    service = await server.getPrimaryService(SERVICE);
  } catch (error) {
    console.error(error);
  }
});

print.addEventListener("click", async () => {
  try {
    const channel = await service.getCharacteristic(WRITE);
    console.log(channel);
    await channel.writeValue(new TextEncoder("utf-8").encode(data));
  } catch (error) {
    console.error(error);
  }
});
