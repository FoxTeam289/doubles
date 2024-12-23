import { addSelect } from "../addSelect";
import { blocksChecking } from "../blocksChecking";
import { addToBag } from "../addToBag";

const totalPrice = document.querySelector("[data-total]");
const inputs = document.querySelectorAll("[data-input]");
const data = {};
const dataPrice = {};
const dataPhoto = [];

const checkForActivity = (input, productsWrapper) => {
  if (!input.checked) return;

  data[input.name] = input.value;
  addSelect(productsWrapper, data);
};

const totalSum = (input, priceValue) => {
  if (!input.checked) return;

  dataPrice[input.name] = Number(input.dataset.price);

  const sum = Object.values(dataPrice).reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  /* totalPrice.innerHTML = sum; */
  totalPrice.innerHTML = 3180;

  if (priceValue) {
    priceValue.innerHTML = 3180;
    priceValue.setAttribute("data-product-price-def", sum);
    priceValue.setAttribute("data-product-price-def-str", sum);
  }
};

const changePhoto = (scale) => {
  const photo = document.querySelector("[data-photo]");
  if (!photo) return;

  const img = photo.querySelector("img");

  scale ? photo.classList.add("scale") : photo.classList.remove("scale");

  photo.classList.add("hidden");

  setTimeout(() => (img.src = dataPhoto[0]), 300);
  setTimeout(() => photo.classList.remove("hidden"), 500);
};

const toggleSelect = (productsWrapper) => {
  const braceletsText = document.querySelectorAll("[data-text-bracelet]");
  const select = document.querySelector("[data-select]");

  if (!braceletsText.length && !select) return;

  const head = select.querySelector("[data-select-head]");
  const headText = head.querySelector("span");
  const body = select.querySelector("[data-select-body]");
  const els = select.querySelectorAll("[data-select-el]");

  const toggleSelect = (remove = false) => {
    if (remove) {
      select.classList.remove("show");
      body.classList.remove("show");
    } else {
      select.classList.toggle("show");
      body.classList.toggle("show");
    }
  };

  const addTextsInData = (texts) => {
    data["text-1"] = texts[0];
    data["text-2"] = texts[1];
    addSelect(productsWrapper, data);
  };

  addTextsInData(select.dataset.select.split("| "));

  head.addEventListener("click", () => toggleSelect());

  els.forEach((el) => {
    el.addEventListener("click", () => {
      toggleSelect(true);

      dataPhoto.length = 0;
      dataPhoto.push(el.dataset.photo);
      changePhoto(true);

      const texts = el.dataset.selectEl;
      headText.innerHTML = texts;

      const textsArr = texts.split("<br> ");

      textsArr.forEach((text, ind) => (braceletsText[ind].innerHTML = text));
      addTextsInData(textsArr);
    });
  });
};

export const initBraslet = () => {
  if (!totalPrice || !inputs.length) return;

  const { productsWrapper, priceValue } = blocksChecking(".t762");

  inputs.forEach((input) => {
    checkForActivity(input, productsWrapper);
    totalSum(input, priceValue, true);

    input.addEventListener("input", () => {
      data[input.name] = input.value;

      dataPhoto.length = 0;
      dataPhoto.push(input.dataset.photo);
      changePhoto();

      totalSum(input, priceValue, true);
      addSelect(productsWrapper, data);
    });
  });

  toggleSelect(productsWrapper);
  addToBag();
};
