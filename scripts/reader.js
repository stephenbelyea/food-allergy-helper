const initReader = () => {
  console.log(Quagga);
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: cameraViewer,
      },
      decoder: {
        readers: ["upc_e_reader"],
      },
    },
    startReader
  );
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

const detectReader = (data) => {
  console.log(data);
  if (data?.codeResult?.code) {
    barcodeInput.value = data.codeResult.code;
    stopReader();
    submitSearchForm();
  }
};

readerButton.addEventListener("click", initReader);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    stopReader();
  }
});

Quagga.onDetected(detectReader);
