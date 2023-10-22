const config = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: cameraViewer,
    constraints: {
      width: 1920,
      height: 1080,
      facingMode: "environment",
    },
  },
  frequency: 10,
  numOfWorkers: 8,
  decoder: {
    readers: ["upc_reader", "upc_e_reader"],
    multiple: true,
  },
};

const initReader = () => {
  Quagga.init(config, startReader);
};

const startReader = (error) => {
  if (error) {
    console.log(error);
    return;
  }
  Quagga.start();
};

const stopReader = () => {
  Quagga.stop();
  cameraViewer.innerHTML = "";
};

const detectReader = (detectData) => {
  console.log("Result:", detectData);
  for (let i = 0; i < detectData.length; i++) {
    console.log(detectData[i]?.codeResult?.code);
  }
};

const processReader = (processData) => {
  console.log("Scanning...");
  if (processData && processData.length > 0) console.log("Processing...");
};

readerButton.addEventListener("click", initReader);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    stopReader();
  }
});

Quagga.onProcessed(processReader);
Quagga.onDetected(detectReader);
