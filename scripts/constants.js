// https://world.openfoodfacts.org/api/v2/product/[UPC_CODE].json
const API_BASE = "https://world.openfoodfacts.org/api/v2/product";

const allergensList = [
  { name: "en:peanuts", label: "Peanuts" },
  { name: "en:soybeans", label: "Soy" },
  { name: "en:milk", label: "Dairy" },
];

const searchForm = document.getElementById("search");
const barcodeInput = document.getElementById("barcode");
const submitButton = document.getElementById("submit");
const outputDiv = document.getElementById("output");

const readerButton = document.getElementById("reader");
const cameraViewer = document.getElementById("camera");
