const parentAccordion = document
  .querySelector(".accordion")
  .querySelectorAll("li");
const allClickableLinks = document.querySelectorAll(".link");
allClickableLinks.forEach((click) =>
  click.addEventListener("click", (e) => {
    const currentClicked = e.target;
    // currentClicked.closest("li").nextElementSibling.style.height = "0";
    // currentClicked.closest("li").previousElementSibling.style.height = "0";
    currentClicked
      .closest("li")
      .querySelector(".submenu")
      .classList.toggle("show");
    currentClicked.closest("li").classList.toggle("height");
    if (
      currentClicked.parentElement
        .querySelector(".fas")
        .classList.contains("fa-minus")
    ) {
      currentClicked.parentElement
        .querySelector(".fas")
        .classList.add("fa-plus");
      currentClicked.parentElement
        .querySelector(".fas")
        .classList.remove("fa-minus");
      currentClicked.closest(".link").querySelector(".fa-folder-open").remove();
    } else {
      currentClicked.parentElement
        .querySelector(".fas")
        .classList.remove("fa-plus");
      currentClicked.parentElement
        .querySelector(".fas")
        .classList.add("fa-minus");
      currentClicked
        .closest(".link")
        .querySelector("b")
        .insertAdjacentHTML(
          "afterbegin",
          `
        <i class="fa fa-folder-open"></i>
        `,
        );
    }
    if (currentClicked.closest(".link").classList.contains("open-acc"))
      currentClicked.closest(".link").classList.remove("open-acc");
    else {
      currentClicked.closest(".link").classList.add("open-acc");
    }
  }),
);
