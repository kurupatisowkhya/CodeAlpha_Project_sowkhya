const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/air.png?raw=true",
      },
      {
        code: "darkblue",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/air2.png?raw=true",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/jordan.png?raw=true",
      },
      {
        code: "green",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/jordan2.png?raw=true",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/blazer.png?raw=true",
      },
      {
        code: "green",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/blazer2.png?raw=true",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/crater.png?raw=true",
      },
      {
        code: "lightgray",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/crater2.png?raw=true",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/hippie.png?raw=true",
      },
      {
        code: "black",
        img: "https://github.com/safak/youtube/blob/html-css-js-ecommerce/img/hippie2.png?raw=true",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});