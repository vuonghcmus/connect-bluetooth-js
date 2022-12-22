const button = document.getElementById("getDetails");
const details = document.getElementById("details");
const print = document.getElementById("print");

const SERVICE = "000018f0-0000-1000-8000-00805f9b34fb";
const WRITE = "00002af1-0000-1000-8000-00805f9b34fb";

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

    const today = new Date().toLocaleString().replace(/,/g, "");

    const cmds = [
      "SIZE 57 mm,31 mm",
      "CLS",
      'TEXT 160,20,"3",0,1,1,"LEAP"',
      `TEXT 40,50,"2",0,1,1,"${today}"`,
      'QRCODE 130,75,L,5,A,0,"https://inva.app/project/1001/plan-order/1551"',
      "PRINT 1",
      "END",
    ];

    const arrayLike = new TextEncoder().encode(cmds.join("\r\n"));

    await channel.writeValue(new Uint8Array(arrayLike));
  } catch (error) {
    console.error(error);
  }
});
