
const settingsBTN = document.querySelector(".settings");
const settingsPopup = document.querySelector(".settings-popup");

const openAttr = document.createAttribute("open");
const closedAttr = document.createAttribute("closed");

settingsBTN.addEventListener("click", () => {
  const isOpen = settingsPopup.hasAttribute(openAttr.name);

  settingsPopup.attributes.removeNamedItem(isOpen ? openAttr.name : closedAttr.name);
  settingsPopup.attributes.setNamedItem(isOpen ? closedAttr : openAttr);
}); 