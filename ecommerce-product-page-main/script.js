"use strict";

const bigImg = document.querySelector(".main--img--big--el");
const smallImg = document.querySelectorAll(".main--img--small");
const smallImgModal = document.querySelectorAll(".main--img--small--modal");
const btnLink = document.querySelector(".main--button--link");
const hidden = document.querySelector(".hidden");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".main--img--big--el--modal");
const addToCart = document.querySelector(".main--button--box");
const number = document.querySelector(".main--number");
const addToCartMessage = document.querySelector(".addToCart--message");
const message = document.querySelector(".message");
const submenu = document.querySelector(".dropbtn");
const inCart = document.querySelector(".inCart");
const arrowRight = document.querySelector(".arrowRight");
const arrowLeft = document.querySelector(".arrowLeft");
const arrowR = document.querySelector(".arrowR");
const arrowL = document.querySelector(".arrowL");
const slides = document.querySelectorAll(".slide");
const cartBox = document.querySelector(".cart--box");
const cartBtn = document.querySelector(".cartBtn");
const cartItem = document.querySelector(".cart--product");
const cartNumber = document.querySelector(".cart--number");
const btnDelete = document.querySelector(".cart--delete");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".nav--icon--menu");
const menuBackground = document.querySelector(".background");
const menuMobile = document.querySelector(".nav--list--mobile");
const closeBtnMobile = document.querySelector(".closeBtnMobile");
let curSlide = 0;
let numberOfItems = 0;

document.querySelector(".main--plus").addEventListener("click", function () {
  number.textContent++;
});
document.querySelector(".main--minus").addEventListener("click", function () {
  if (number.textContent > 1) {
    number.textContent--;
  }
});

// smallImg.forEach((imgs) => {
//   imgs.addEventListener("click", function (img) {
//     smallImg.forEach((active) => {
//       active.classList.remove("active");
//     });
//     imgs.classList.toggle("active");
//   });
// });

const changeImg = function (e) {
  const btn = e.target.closest(".main--img--small");
  if (!btn) return;
  modalImg.src = btn.src;
  bigImg.src = btn.src;
  console.log(btn);

  smallImg.forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
};

document
  .querySelector(".main--img--small--box--modal")
  .addEventListener("click", changeImg);
document
  .querySelector(".main--img--small--box")
  .addEventListener("click", changeImg);

const openModal = function () {
  let query = window.matchMedia("(min-width: 550px)");
  console.log(query.matches);
  if (query.matches) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
};

bigImg.addEventListener("click", openModal);

console.log(bigImg.src);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const closeMenu = function () {
  menuMobile.classList.add("hidden");
  menuBackground.classList.add("hidden");
};

closeBtnMobile.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeModal);

cartBtn.addEventListener("click", function () {
  if (numberOfItems > 0) {
    document.querySelector(".cartPriceOfItems").textContent =
      numberOfItems * 125;
    document.querySelector(".cartNumberOfItems").textContent = numberOfItems;
    document.querySelector(".itemsInCart").classList.toggle("hidden");
  }
  if (numberOfItems === 0) {
    inCart.classList.add("hidden");
    document.querySelector(".noItemsInCart").classList.toggle("hidden");
  }
});

//Deleting items from cart

btnDelete.addEventListener("click", function () {
  if (numberOfItems > 0) {
    numberOfItems--;
    inCart.textContent = numberOfItems;
    document.querySelector(".cartNumberOfItems").textContent = numberOfItems;
  }
  if (numberOfItems === 0) {
    inCart.classList.add("hidden");
    document.querySelector(".itemsInCart").classList.add("hidden");
  }
});

console.log(numberOfItems);
addToCart.addEventListener("click", function (e) {
  e.preventDefault();
  addToCartMessage.classList.remove("hidden");
  inCart.classList.remove("hidden");
  numberOfItems += Number(number.textContent);
  inCart.textContent = numberOfItems;
  console.log(numberOfItems);
  if (number.textContent === "1") {
    message.textContent = `Item was sucsessfully added to cart`;
  }
  if (number.textContent > 1) {
    message.textContent = `${number.textContent} Items were sucsessfully added to cart`;
  }
  if (numberOfItems > 0) {
    cartBox.classList.add("hidden");
  }
  setTimeout(() => {
    addToCartMessage.classList.add("hidden");
  }, 3000);
  document.querySelector(".noItemsInCart").classList.add("hidden");
  number.textContent = 1;
});

//Lightbox

function setHeroImage(imageIndex) {
  modalImg.src = `ecommerce-product-page-main/images/image-product-${imageIndex}.jpg`;
  bigImg.src = `ecommerce-product-page-main/images/image-product-${imageIndex}.jpg`;
  //images are not sync
  smallImg.forEach((img) => {
    img.classList.remove("active");
  });
  //set active thumbnail
  smallImg[imageIndex - 1].classList.add("active");
}

function handleBtnClickNext() {
  let imageIndex = getCurrentImageIndex();
  imageIndex++;
  if (imageIndex > 4) {
    imageIndex = 1;
  }
  setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
  let imageIndex = getCurrentImageIndex();
  imageIndex--;
  if (imageIndex < 1) {
    imageIndex = 4;
  }
  setHeroImage(imageIndex);
}
function getCurrentImageIndex() {
  const imageIndex = parseInt(
    modalImg.src
      .split("\\")
      .pop()
      .split("/")
      .pop()
      .replace(".jpg", "")
      .replace("image-product-", "")
      .replace("ecommerce-product-page-main", "")
  );
  bigImg.src
    .split("\\")
    .pop()
    .split("/")
    .pop()
    .replace(".jpg", "")
    .replace("image-product-", "")
    .replace("ecommerce-product-page-main", "");
  console.log(imageIndex);
  return imageIndex;
}

arrowRight.addEventListener("click", handleBtnClickNext);
arrowLeft.addEventListener("click", handleBtnClickPrevious);
arrowR.addEventListener("click", handleBtnClickNext);
arrowL.addEventListener("click", handleBtnClickPrevious);

closeBtn.addEventListener("click", closeModal);

menuBtn.addEventListener("click", function () {
  menuMobile.classList.remove("hidden");
  menuBackground.classList.remove("hidden");
  cartBox.classList.add("hidden");
});

menuBackground.addEventListener("click", function () {
  menuMobile.classList.add("hidden");
  menuBackground.classList.add("hidden");
});
