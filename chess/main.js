class Figure {
  x;
  y;
  moveset;

  constructor(position, moveset) {
    this.x = position.x;
    this.y = position.y;
  }
}

// =====

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.onresize = resize;

// =====

let zoomFactor = 0.9;
const figureLineup = {
  white: ["Pa2", "Pb2", "Pc2", "Pd2", "Pe2", "Pf2", "Pg2", "Ph2", "Ra1", "Nb1", "Bc1", "Kd1", "Qe1", "Bf1", "Ng1", "Rh1"],
  black: ["Pa7", "Pb7", "Pc7", "Pd7", "Pe7", "Pf7", "Pg7", "Ph7", "Ra8", "Nb8", "Bc8", "Kd8", "Qe8", "Bf8", "Ng8", "Rh8"  ],
};
const boardSettings = {
  widthSegments: 8,
  heightSegments: 8,
  color1: "cornsilk",
  color2: "mediumseagreen",
};
const canvasSettings = {
  w: canvas.clientWidth,
  h: canvas.clientHeight,
  backgroundColor: "#333344",
};
const figures = [];
for (let desc of [].concat(figureLineup.white, figureLineup.black)) {
  figures.push(createFigure(desc));
}

// =====

resize();
loop();

// =====

function resize() {
  canvasSettings.w = canvas.width = canvas.clientWidth;
  canvasSettings.h = canvas.height = canvas.clientHeight;
}

function loop() {
  const min = Math.min(canvasSettings.w, canvasSettings.h) * zoomFactor;

  ctx.clearRect(0, 0, canvasSettings.w, canvasSettings.h);
  ctx.fillStyle = canvasSettings.backgroundColor;
  ctx.fillRect(0, 0, canvasSettings.w, canvasSettings.h);

  const yStart = canvasSettings.h / 2 - min / 2;
  const xStart = canvasSettings.w / 2 - min / 2;

  const w = min / boardSettings.widthSegments;
  const h = min / boardSettings.heightSegments;

  for (let i = 0; i < boardSettings.widthSegments; i++) {
    const x = xStart + i * w;
    for (let j = 0; j < boardSettings.heightSegments; j++) {
      const y = yStart + j * h;
      ctx.fillStyle = (j + i) % 2 === 0 ? boardSettings.color1 : boardSettings.color2;
      ctx.fillRect(x, y, w, h);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "black";
  for (let figure of figures) {
    ctx.beginPath();

    const x = xStart + figure.x * w - w / 2;
    const y = yStart + (boardSettings.heightSegments-figure.y+1) * h - h / 2;

    ctx.ellipse(x, y, (w / 2) * 0.66, (h/2)*0.66,0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  requestAnimationFrame(loop);
}

function createFigure(desc) {
  const [type, x, y] = desc.split("");

  const pos = {
    x: x.toLowerCase().charCodeAt() - 96,
    y: Number.parseInt(y)
  }

  return new Figure(pos);
}
