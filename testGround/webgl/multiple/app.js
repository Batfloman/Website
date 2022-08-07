class AttribBufferOptions {
  buffer;
  numSets;

  numComponents;
  type;
  normalize;
  stride;
  offset;

  constructor(buffer, numSets, numComponents, type, normalize = false, stride = 0, offset = 0) {
    this.buffer = buffer;
    this.numSets = numSets;
    this.numComponents = numComponents;
    this.type = type;
    this.normalize = normalize;
    this.stride = stride;
    this.offset = offset;
  }
}

const canvas = document.querySelector("#glcanvas");

/** @type {WebGLRenderingContext}*/
const gl = canvas.getContext("webgl");

gl.clearColor(255, 255, 255, 1.0);
gl.clearDepth(1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

const util = {
  degToRad(deg) {
    return (deg * Math.PI) / 180;
  },
};

const objectsToDraw = [];

const vertexShaderText = `
  attribute vec2 vertexPosition;

  void main() {
    gl_Position = vec4(vertexPosition.x, vertexPosition.y, 1.0, 1.0);
  }
`;

const fragmentShaderText = `
  
  void main() {
    gl_FragColor = vec4(0, 0, 0, 1);
  }
`;

const program = createProgram(vertexShaderText, fragmentShaderText);

var drawInfo = {
  program: program,
  attributes: {
    vertexPosition: createAttribInfo(program, "vertexPosition", [0.5, 0.5], [0.75, 0.75], [0.75, 0.3]),
  },
};

var drawInfo2 = {
  program: program,
  attributes: {
    vertexPosition: createAttribInfo(program, "vertexPosition", [-0.5, 0.5], [-0.75, 0.75], [-0.75, 0.3]),
  },
};

console.log(drawInfo);

objectsToDraw.push(drawInfo);
objectsToDraw.push(drawInfo2);

window.requestAnimationFrame(draw);

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  objectsToDraw.forEach((obj) => {
    for (let [attribName, info] of Object.entries(obj.attributes)) {
      // console.log(attribName, info);
      enableAttrib(info);
    }

    gl.useProgram(obj.program);
    console.log(obj);

    const vertexCount = obj.attributes["vertexPosition"].bufferInfo.numPairs;
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
  });

  window.requestAnimationFrame(draw);
}

function enableAttrib(info) {
  const bInfo = info.bufferInfo;
  gl.bindBuffer(gl.ARRAY_BUFFER, info.buffer);
  gl.vertexAttribPointer(
    info.buffer,
    bInfo.numValuesInPair,
    bInfo.type,
    bInfo.normalize,
    bInfo.stride,
    bInfo.offset
  );
  gl.enableVertexAttribArray(info.buffer);
}

// function createDrawInfo(program, attributes) {
//   return {
//     program: program,

//   }
// }

function createAttribInfo(program, varName, ...valuePairs) {
  const location = gl.getAttribLocation(program, varName);
  const buffer = createBuffer(valuePairs);
  const bufferInfo = createBufferInfo(valuePairs);

  return {
    location: location,
    buffer: buffer,
    bufferInfo: bufferInfo,
  };
}

function createBufferInfo(valuePairs) {
  const numPairs = valuePairs.length;
  const numValuesInPair = valuePairs[0].length;

  return {
    numPairs: numPairs,
    numValuesInPair: numValuesInPair,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
  };
}

function createBuffer(valuePairs) {
  const values = valuePairs.reduce((prev, current) => (current = prev.concat(current)));

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);

  return buffer;
}

function createProgram(vertexShaderSource, fragmentShaderSource) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(`vertex Shader cannot be compiled! ${gl.getShaderInfoLog(vertexShader)}`);
  }
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(`fragment Shader cannot be compiled! ${gl.getShaderInfoLog(fragmentShader)}`);
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error("Program Link Error: " + gl.getProgramInfoLog());
  }

  return program;
}

