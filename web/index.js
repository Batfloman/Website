window.onload = () => {
  const root = document.querySelector(":root");
  const rs = root.style;

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
  let currentTheme = themes.dark;

  const theme_button = document.getElementById("theme-button");
  theme_button.addEventListener("click", () => {
    if (currentTheme == themes.dark) currentTheme = themes.light;
    else currentTheme = themes.dark;

    rs.setProperty("--theme", currentTheme.theme);
    rs.setProperty("--theme-background", currentTheme.themeBackground);
    rs.setProperty("--theme-font-color", currentTheme.themeFontColor);
  });

  const settings_popup = document.getElementById("settings-popup");

  let settingsActive = false;

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
