const vertexShaderText = `
  attribute vec4 vertexPosition;
  attribute vec4 vertexColor;
 
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;

  varying lowp vec4 color;

  void main() {
    gl_Position = projectionMatrix * viewMatrix * vertexPosition;
    color = vertexColor;
  }
`;

const fragmentShaderText = `
  varying lowp vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;

const squareRotation = 0.0;

main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    alert("Canvas not found!");
    return;
  }

  const gl = canvas.getContext("webgl");
  if (!(gl instanceof WebGLRenderingContext)) {
    alert("WebGL not supported!");
    return;
  }

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Shader

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
    return;
  }

  // var locations

  const programInfo = {
    program: program,
    attribLocation: {
      vertexPosition: gl.getAttribLocation(program, "vertexPosition"),
      vertexColor: gl.getAttribLocation(program, "vertexColor"),
    },
    uniformLocation: {
      viewMatrix: gl.getUniformLocation(program, "viewMatrix"),
      projectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    },
  };

  // buffer

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const pos1 = [1.0, 1.0];
  const pos2 = [-1.0, 1.0];
  const pos3 = [1.0, -1.0];
  const pos4 = [-1.0, -1.0];
  const positions = [].concat(pos1, pos2, pos3, pos4);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  const c1 = [1.0, 1.0, 1.0, 1.0];
  const c2 = [1.0, 0.0, 0.0, 1.0];
  const c3 = [0.0, 1.0, 0.0, 1.0];
  const c4 = [0.0, 0.0, 1.0, 1.0];
  const colors = [].concat(c1, c2, c3, c4);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const buffer = {
    positions: positionBuffer,
    colors: colorBuffer,
  };

  // draw

  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glMatrix.mat4.create();
  glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.translate(viewMatrix, viewMatrix, [-0.0, 0.0, -6.0]);
  glMatrix.mat4.rotate(viewMatrix, viewMatrix, squareRotation, [0, 0, 1]);

  const numComponents = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(
    programInfo.attribLocation.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocation.vertexPosition);

  const numComponents2 = 4;
  const type2 = gl.FLOAT;
  const normalize2 = false;
  const stride2 = 0;
  const offset2 = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.colors);
  gl.vertexAttribPointer(
    programInfo.attribLocation.vertexColor,
    numComponents2,
    type2,
    normalize2,
    stride2,
    offset2
  );
  gl.enableVertexAttribArray(programInfo.attribLocation.vertexColor);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(programInfo.uniformLocation.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocation.viewMatrix, false, viewMatrix);

  const offset3 = 0;
  const vertexCount = 4;
  gl.drawArrays(gl.TRIANGLE_STRIP, offset3, vertexCount);
}

