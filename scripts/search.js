const setInputInvalid = (isInvalid = false) =>
  barcodeInput.setAttribute("aria-invalid", isInvalid);

const resetOutput = () => {
  outputDiv.innerHTML = "";
};

const setRequestInProgress = (isInProgress = false) => {
  if (!isInProgress) {
    barcodeInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    readerButton.removeAttribute("disabled");
    return;
  }

  resetOutput();
  setInputInvalid();
  barcodeInput.setAttribute("disabled", "true");
  submitButton.setAttribute("disabled", "true");
  readerButton.setAttribute("disabled", "true");
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

const submitSearchForm = async (event = undefined) => {
  if (event) event.preventDefault();

  const query = barcodeInput.value.trim() || undefined;
  if (!query) return setInputInvalid(true);

  await requestProduct(query);
};

searchForm.addEventListener("submit", submitSearchForm);
