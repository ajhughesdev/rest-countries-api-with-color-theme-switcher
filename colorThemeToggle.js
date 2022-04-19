const root = document.documentElement;
const buttonText = document.querySelector(".button-text");
const button = document.querySelector(".color-theme-toggle");

function ColorThemeToggle() {
  if (root.getAttribute("color-theme") === "light") {
    root.setAttribute("color-theme", "dark");
    buttonText.textContent = "Light Mode";
  } else {
    root.setAttribute("color-theme", "light");
    buttonText.textContent = "Dark Mode";
  }
}

button.addEventListener("click", ColorThemeToggle);
