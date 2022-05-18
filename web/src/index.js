const themes = {
  light: {
    theme: "rgb(205, 205, 205)",
    themeBackground: "rgb(225, 225, 225)",
    themeFontColor: "black",
  },
  dark: {
    theme: "rgb(30, 30, 30)",
    themeBackground: "rgb(45, 45, 45)",
    themeFontColor: "white",
  },
};

let currentTheme = "dark";
let settingsActive = false;

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (themes[params.theme]) {
    currentTheme = params.theme;
    updateTheme();
  }
  
  // ==========================================================================================
  // css changes
  const root = document.querySelector(":root");
  const rs = root.style;
  
  // theme style change on button click
  const theme_button = document.getElementById("theme-button");
  theme_button.addEventListener("click", () => {
    if (currentTheme == "dark") currentTheme = "light";
    else currentTheme = "dark";

    updateTheme();
  });

  // show option panel and reverse rotation of button
  const settings_button = document.getElementById("settings-button");
  settings_button.onclick = () => {
    if (settingsActive) {
      rs.setProperty("--settings-hide-popup", "hidden");
      rs.setProperty("--settings-rotation", "rotate(60deg)");
    } else {
      rs.setProperty("--settings-hide-popup", "visible");
      rs.setProperty("--settings-rotation", "rotate(-60deg)");
    }
    settingsActive = !settingsActive;
  };
};

function updateTheme() {
  const root = document.querySelector(":root");
  const rs = root.style;

  let theme = themes[currentTheme];

  rs.setProperty("--theme", theme.theme);
  rs.setProperty("--theme-background", theme.themeBackground);
  rs.setProperty("--theme-font-color", theme.themeFontColor);

  const themePattern = /theme=(\w)+/;
  ["btn-home", "btn-games", "btn-school"].forEach(btnID => {
    const btn = document.getElementById(btnID);
    const href = btn.getAttribute("href");
    btn.setAttribute("href", href.replace(themePattern, "theme=" + currentTheme));
  })
}
