type Theme = "light" | "dark";

// Bundled module scripts run once per session, while view transitions
// replace the header (and the button) on every navigation. So: one
// document-level click listener, and the button's label is refreshed
// on every page load.

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateButton(theme: Theme) {
  const toggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
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
  // In-memory copy, read by the head script after each view transition, so
  // the choice survives navigation even when localStorage is unavailable.
  (window as Window & { __theme?: Theme }).__theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage may be unavailable (e.g. private browsing); the theme still
    // applies for this page view.
  }
  updateButton(theme);
}

document.addEventListener("click", (event) => {
  const target = event.target as Element | null;
  if (!target?.closest("#theme-toggle")) return;
  setTheme(currentTheme() === "dark" ? "light" : "dark");
});

updateButton(currentTheme());
document.addEventListener("astro:page-load", () =>
  updateButton(currentTheme()),
);
