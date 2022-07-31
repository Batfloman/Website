const canvas = document.querySelector("#canvas");
const gl = canvas.getContext("webgl");

const vertShaderText = ``;
const fragShaderText = ``;

start();

function start() {
  if (!(gl instanceof WebGLRenderingContext)) return;

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const program = gl.createProgram();
  gl.useProgram(program);

  // create Vertex Shader
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertShaderText);
  // compile
  gl.compileShader(vertShader);
  if (gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compile Vertex Shader", gl.getShaderInfoLog(vertShader));
  }

  // create Fragment Shader
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragShaderText);
  // compile
  gl.compileShader(fragShader);
  if (gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compile Vertex Shader", gl.getShaderInfoLog(fragShader));
  }

  // attach Shader to Program

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);

  // checks
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(program));
  }

  // extra checks!
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
  }
}
