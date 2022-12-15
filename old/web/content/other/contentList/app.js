const newElementBtn = document.querySelector(".new-element-btn");

newElementBtn.addEventListener("click", () => {
  const title = prompt("title");

  createContentNode(title);
})


const contentContainer = document.querySelector(".content-container");

function createContentNode(title = "Title", text = "text") {
  const content = document.createElement("div");
  content.classList.add("content");

  content.innerHTML = createContentLabel(title);
  content.innerHTML += createContentText(text);
  content.innerHTML += createContentNodeEditBtn();

  contentContainer.appendChild(content);
}

function createContentLabel(title) {
  return `<div class="content-label" contenteditable="true">${title}</div>`;
}

function createContentText(text) {
  return `<div class="content-text" contenteditable="true">${text}</div>`;
}

function createContentNodeEditBtn() {
  return `<div class="content-edit-btn"></div>`;
}