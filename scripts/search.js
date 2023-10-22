// https://world.openfoodfacts.org/api/v2/product/[UPC_CODE].json
const API_BASE = "https://world.openfoodfacts.org/api/v2/product";

const allergensList = [
  { name: "en:peanuts", label: "Peanuts" },
  { name: "en:soybeans", label: "Soy" },
  { name: "en:milk", label: "Dairy" },
];

const matchAllergensFromList = (allergens) => {
  const containsAllergens = [];
  allergensList.map((item) => {
    if (allergens.indexOf(item) > -1) {
      containsAllergens.push(item);
    }
  });
  return containsAllergens;
};

const searchForm = document.getElementById("search");
const barcodeInput = document.getElementById("barcode");
const submitButton = document.getElementById("submit");
const outputDiv = document.getElementById("output");

const setInputInvalid = (isInvalid = false) =>
  barcodeInput.setAttribute("aria-invalid", isInvalid);

const resetOutput = () => {
  outputDiv.textContent = "";
};

const setRequestInProgress = (isInProgress = false) => {
  if (!isInProgress) {
    barcodeInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    return;
  }

  resetOutput();
  setInputInvalid();
  barcodeInput.setAttribute("disabled", "true");
  submitButton.setAttribute("disabled", "true");
};

const composeProductDescription = (product) => {
  const { brands, product_name, ingredients_text, allergens } = product;
  const description = [`<h2>Found: ${brands} - ${product_name}</h2>`];

  if (allergens) {
    description.push(`<h3>Contains allergens:</h3><ul>`);
    allergensList.map((item) => {
      if (allergens.indexOf(item.name) > -1) {
        description.push(`<li>${item.label}</li>`);
      }
    });
    description.push(`</ul>`);
  }

  if (ingredients_text) {
    description.push(
      `<h3>Full ingredients list:</h3><p>${ingredients_text}</p>`
    );
  }
  console.log(description);
  return description.join("");
};

const displayProductFound = ({ status, product }) => {
  if (status !== 1 || !product) {
    return outputDiv.insertAdjacentHTML(
      "afterbegin",
      `<h2>Could not find product.</h2>`
    );
  }

  outputDiv.insertAdjacentHTML(
    "afterbegin",
    composeProductDescription(product)
  );
};

const requestProduct = async (query = "") => {
  setRequestInProgress(true);

  try {
    const response = await fetch(`${API_BASE}/${query}.json`);
    const responseJson = await response.json();

    setRequestInProgress();
    displayProductFound(responseJson);
  } catch (error) {
    setRequestInProgress();
    setInputInvalid(true);
  }
};

const submitSearchForm = async (event) => {
  event.preventDefault();

  const query = barcodeInput.value.trim() || undefined;
  if (!query) return setInputInvalid(true);

  await requestProduct(query);
};

searchForm.addEventListener("submit", submitSearchForm);
