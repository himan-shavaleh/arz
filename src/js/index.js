// variable defining
const selectField = document.querySelector("#selectField");
const tableBody = document.querySelector(".prices__table-body");
let options = [];
// const nav = document.querySelector("#header");
// const header = document.querySelector("#slides");
// const navHeight = nav.getBoundingClientRect().height;
// let choosedCurency = 25;

let choosedCurency = 25000;

const selectContainer = document.querySelector(".select-options");
const irInput = document.querySelector("#irMoney");
const currenInput = document.querySelector("#currencyAmount");
// showing menu when resize browser
window.addEventListener("resize", () => {
  if (window.innerWidth > 769) {
    document.querySelector(".toggler").style.display = "none";
    document.querySelector(".humburger").style.display = "none";
    document.querySelector(".navbar").style.transform =
      "transform: translateX(0) scale(1)";
    document.querySelector(".navbar").style.visibility = "visible";
  } else {
    document.querySelector(".toggler").style.display = "block";
    document.querySelector(".humburger").style.display = "flex";
    document.querySelector(".navbar").style.transform =
      "transform: translateX(0) scale(1.3)";
    document.querySelector(".navbar").style.visibility = "visible";
  }
});

// take to navbar a background when scrool on section 1

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(header);
// seeting currency values when page load
// fake data
const MINUTE = 1000 * 60;
const URL = "https://panel.almaex.net/-/publish/v1/currency";
// const templateBody = document.querySelector(".table-tamplate-body");

const dolorPrice = 25000;
const data = {
  currencies: [
    {
      id: 1,
      name: "\u067e\u0631\u0641\u06a9\u062a \u0645\u0627\u0646\u06cc",
      buy: 24000,
      sell: 24000,
      icon: "<img src='https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/pm.png?ver=1653468067' alt='pm' width='32' />",
      icon_link:
        "https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/pm.png",
      abbreviation: "pm",
    },
    {
      id: 2,
      name: "\u0648\u0648\u0686\u0631 \u067e\u0631\u0641\u06a9\u062a \u0645\u0627\u0646\u06cc",
      buy: 24000,
      sell: 24000,
      icon: "<img src='https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/pmv.png?ver=1653468067' alt='pmv' width='32' />",
      icon_link:
        "https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/pmv.png",
      abbreviation: "pmv",
    },
    {
      id: 3,
      name: "\u0648\u0628 \u0645\u0627\u0646\u06cc",
      buy: 24000,
      sell: 24000,
      icon: "<img src='https://pngimg.com/uploads/webmoney/webmoney_PNG17.png' alt='wm' width='32' />",
      icon_link: "https://pngimg.com/uploads/webmoney/webmoney_PNG17.png",
      abbreviation: "wm",
    },
    {
      id: 5,
      name: "\u062a\u062a\u0631",
      buy: 30800,
      sell: 30400,
      icon: "<img src='https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/usdt.png?ver=1653468067' alt='usdt' width='32' />",
      icon_link:
        "https://panel.almaex.net/-/vendor/cryptocurrency-icons/32/color/usdt.png",
      abbreviation: "usdt",
    },
  ],
};
  

//  variables
const loadCurrencies = async () => {
  const res = await fetch(URL);
  const data = await res.data.json();
  console.log(data);
  return data.currencies;
};
const setMarkupPrices = (data) => {
  const markup = `
    <tr>
    <td class="buy-price">
    <i>${data.icon}</i>
    <p>
    <span>${data.name}</span>  
    ${data.buy.toLocaleString("en-US")} $</td>
    </p>
  <td class="buy-coin">${(data.buy * dolorPrice).toLocaleString("en-US")}</td>
  <td class="cel-coin">${(data.sell * dolorPrice).toLocaleString("en-US")}</td>
   <td class="chart-icon">
   <i class="fa fa-line-chart"></i></td>
   
  </tr>
    `;

  tableBody.insertAdjacentHTML("beforeend", markup);
};
document.addEventListener("DOMContentLoaded", () => {
  // const data = loadCurrencies();
  data.currencies.forEach((data) => setMarkupPrices(data));

  data.currencies.forEach((data) => {
    console.log(data);
    const html = `
    <li>
    <p class='name'>${data.name}</p>
    <img src="${data["icon_link"]}" alt="...">
  </li>
    `;

    selectContainer.insertAdjacentHTML("beforeend", html);
  });
  options = document.querySelector(".select-options").querySelectorAll("li");
  // selecting dropdown option event

  options.forEach((opt) =>
    opt.addEventListener("click", (e) => {
      const el = data.currencies.find(
        (cur) =>
          cur.name ===
          e.target.closest("li").querySelector(".name").textContent,
      );
      selectField.innerHTML = `
<i class="fas fa-arrow-down"></i>
              <p>
                <span>(${el.abbreviation})</span>
                <span class="name">${el.name}</span>
              </p>
              <img src="${el["icon_link"]}" width="25" alt=""> 
`;
      document.querySelector(".select-options").style.visibility = "hidden";
      choosedCurency = el;
      irInput.value = "";
      currenInput.value = "";
    }),
  );
});
setInterval(function () {
  const data = loadCurrencies(URL);
  data.currencies.forEach((data) => setMarkupPrices(data));
}, MINUTE);

document.querySelectorAll(".content-item").forEach((iT) =>
  iT.addEventListener("mouseleave", (e) => {
    console.log(2);
    e.target
      .closest(".content-item")
      .querySelector(".fa")
      .classList.remove("fa-line-chart");
    e.target
      .closest(".content-item")
      .querySelector(".fa")
      .classList.add("fa-briefcase");
  }),
);

document.querySelectorAll(".content-item").forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    e.target
      .closest(".content-item")
      .querySelector(".fa")
      .classList.add("fa-line-chart");

    e.target
      .closest(".content-item")
      .querySelector(".fa")
      .classList.remove("fa-briefcase");
  });
});
irInput.addEventListener("keyup", (e) => {
  let selectedCurrency = false;
  const money = +e.target.value;
  console.log(1);
  if (choosedCurency === 25000) {
    currenInput.value = 123;
    currenInput.value = money / (choosedCurency * dolorPrice);
  } else {
    currenInput.value = money / (choosedCurency.sell * dolorPrice);
  }
});
selectField.addEventListener("click", (e) => {
  if (document.querySelector(".select-options").style.visibility === "hidden") {
    document.querySelector(".select-options").style.visibility = "visible";
  } else {
    document.querySelector(".select-options").style.visibility = "hidden";
  }
});
