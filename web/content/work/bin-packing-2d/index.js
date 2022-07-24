const packages = document.querySelector("#packages");
const root = document.querySelector(":root");
const rs = getComputedStyle(root);

console.log(rs);

var scrollPackages = false;

packages.addEventListener("mousedown", () => (scrollPackages = true));
packages.addEventListener("mouseup", () => (scrollPackages = false));
packages.addEventListener("mousemove", (e) => {
  if(!scrollPackages) return;

  const scrollVal = getCSSvar("--package-scroll") | 0;
  console.log(scrollVal);
  setCSSvar("--package-scroll", scrollVal + e.movementX);
});

function getCSSvar(prop) {
  return rs.getPropertyValue(prop);
}

function setCSSvar(prop, val) {
  root.style.setProperty(prop, val);
}
