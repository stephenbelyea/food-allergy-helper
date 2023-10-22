const readerButton = document.getElementById("reader");
const cameraViewer = document.getElementById("camera");

// Quagga.

// readerButton.setAttribute('disabled', 'true');
readerButton.addEventListener("click", () => {
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: cameraViewer,
      },
      decoder: {
        readers: ["code_128_reader"],
      },
    },
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      Quagga.start();
    }
  );
});
