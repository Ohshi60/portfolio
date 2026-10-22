type Theme = "light" | "dark";

const toggle = document.querySelector<HTMLButtonElement>("#theme-toggle");

function updateButton(theme: Theme) {
  if (!toggle) return;

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  toggle.setAttribute("aria-label", label);
  toggle.title = label;

  const icon = toggle.querySelector("span");
  if (icon) icon.textContent = isDark ? "☀" : "☾";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  updateButton(theme);
}

updateButton(
  document.documentElement.dataset.theme === "dark" ? "dark" : "light",
);

toggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
});
