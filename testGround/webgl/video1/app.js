const canvas = document.querySelector("#glcanvas");
const gl = canvas.getContext("webgl");
if (!gl) throw new Error("Not Supported!");

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// ==============================
// #region shader

const vertexShaderText = `
      precision mediump float;

      attribute vec2 vertPosition;
      attribute vec3 vertColor;

      varying vec3 fragColor;

      void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
      }
    `;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderText);

const fragmentShaderText = `
      precision mediump float;

      varying vec3 fragColor;

      void main() {
        gl_FragColor = vec4(fragColor, 1.0);
      }
    `;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderText);

// compile
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error("ERROR compile Vertex Shader", gl.getShaderInfoLog(vertexShader));
}

gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error("ERROR compile Fragment Shader", gl.getShaderInfoLog(fragmentShader));
}

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error("ERROR linking program!", gl.getProgramInfoLog(program));
}

// extra checks!
gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  console.error("ERROR validating program!", gl.getProgramInfoLog(program));
}

//#endregion

// ==============================
// #region bufffer

const triangleVertices = [
  //  X, Y,     R,   G,  B,
  0.0, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 0.5, -0.5, 0.0, 0.0, 1.0,
];

const triangleVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
gl.vertexAttribPointer(
  positionAttribLocation, // Attribute location
  2, // Number of elements per attribute
  gl.FLOAT, // Type of elements
  gl.FALSE, // ?
  5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  0 // Offset from the beginning of a single vertex to this attribuet
);
gl.enableVertexAttribArray(positionAttribLocation);

const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
gl.vertexAttribPointer(
  colorAttribLocation, // Attribute location
  3, // Number of elements per attribute
  gl.FLOAT, // Type of elements
  gl.FALSE, // ?
  5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribuet
);
gl.enableVertexAttribArray(colorAttribLocation);

//#endregion

// ==============================
// #region main render loop

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);

//#endregion
