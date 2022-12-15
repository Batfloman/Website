const packageTypeContainer = document.querySelector(".container-packageType");
const addPackageTypeBtn = document.querySelector(".btn-addPackageType");

class Package {
  width;
  height;
}

addPackageTypeBtn.addEventListener("click", addPackageType);

var numberOfPackages = 0;

function addPackageType() {
  const package_div = ` 
  <div class="package-box">
    <div class="package-box-name" contenteditable="true">Package ${++numberOfPackages}</div>
    <div class="package-box-size">
      <div class="package-box-xSize">
        <div>X:</div>
        <div contenteditable="true">10</div>
      </div>
      <div class="package-box-ySize">
        <div>Y:</div>
        <div contenteditable="true">10</div>
      </div>
    </div>
  </div>`;

  packageTypeContainer.innerHTML += package_div;
}
