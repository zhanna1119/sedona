const searchForm = document.querySelector(".search-form-modal");
const searchButton = document.querySelector(".dark-button");
const adultInput = document.querySelector("[name=count-adult]");
const childInput = document.querySelector("[name=count-child]");
const inputs = searchForm.querySelectorAll("input");

searchForm.classList.remove("modal-show");

let isStorageSupport = true;
let storageAdult = "";
let storageChild = "";
let storage = "";

try {
  storageAdult = localStorage.getItem("count-adult");
  storageChild = localStorage.getItem("count-child");
} catch (err) {
  isStorageSupport = false;
}

function checkValidity() {
  let isValid = true;

  Array.from(inputs).forEach((item) => {
    if (!item.value) {
      item.classList.add("input-error");
      isValid = false;
    }
  });

  return isValid;
}

searchButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  searchForm.classList.toggle("modal-show");
  if (storageAdult) {
    adultInput.value = storageAdult;
  }
  if (storageChild) {
    childInput.value = storageChild;
  }
  if (isStorageSupport) {
    localStorage.setItem("count-adult", adultInput.value);
    localStorage.setItem("count-child", childInput.value);
  }
  if (searchForm.classList.contains("modal-error")) {
    searchForm.classList.remove("modal-error");
  }
});

searchForm.addEventListener("submit", function (evt) {
  if (!checkValidity()) {
    evt.preventDefault();
    searchForm.classList.add("modal-error");
  }
});

searchForm.addEventListener("keydown", (evt) => {
  const target = evt.target;
  if (target.tagName !== "INPUT") return;
  if (target.classList.contains("input-error")) {
    target.classList.remove("input-error")
  }
});
