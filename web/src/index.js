const themes = {
  light: {
    theme: "rgb(205, 205, 205)",
    themeBackground: "rgb(225, 225, 225)",
    themeFontColor: "black",
    themeOutlineColor: "rgb(45, 45, 45)",
  },
  dark: {
    theme: "rgb(30, 30, 30)",
    themeBackground: "rgb(45, 45, 45)",
    themeFontColor: "white",
    themeOutlineColor: "rgb(245, 245, 245)",
  },
};

let currentTheme = "dark";
let settingsActive = false;

window.onload = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (themes[params.theme]) {
    currentTheme = params.theme;
  }
  updateTheme();

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
  const settings_button = document.getElementById("setting-btn");
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

  const theme = themes[currentTheme];

  rs.setProperty("--theme", theme.theme);
  rs.setProperty("--theme-background", theme.themeBackground);
  rs.setProperty("--theme-font-color", theme.themeFontColor);
  rs.setProperty("--theme-outline-color", theme.themeOutlineColor);

  const themePattern = /theme=(\w)+/;

  ["home-btn", "games-btn", "stuff-btn"].forEach((btnID) => {
    const btn = document.getElementById(btnID);
    const href = btn.getAttribute("href");

    if(!href) return;

    let newHref;

    if(href.match(themePattern)) {
      newHref = href.replace(themePattern, "theme=" + currentTheme);
    } else {
      if(href.match(/\?/)) newHref = href + "theme=" + currentTheme;
      else newHref = href + "?theme=" + currentTheme;
    }

    btn.setAttribute("href", newHref);
  });
}

function changeVarInUrl(varName, value) {
  const pattern = new RegExp(`${varName}=\\w*`);

  let urlParams = window.location.search;

  if (!urlParams.match(pattern)) urlParams += "theme=" + value;
  else urlParams = urlParams.replace(pattern, "theme=" + value);

  if(window.location.search == urlParams) return;

  window.location.search = urlParams;
}
