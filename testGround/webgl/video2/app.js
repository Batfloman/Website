window.onload = main;

function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");
  if (!gl) throw new Error("Not Supported!");

  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // #region create Shader
  const vertexShaderText = `
      precision mediump float;

      attribute vec3 vertPosition;
      attribute vec3 vertColor;

      varying vec3 fragColor;

      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;

      void main() {
        fragColor = vertColor;
        gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
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

  //#endregion

  // #region compile Shader
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compile Vertex Shader", gl.getShaderInfoLog(vertexShader));
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compile Fragment Shader", gl.getShaderInfoLog(fragmentShader));
  }

  //#endregion

  // #region create Program
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

  gl.useProgram(program);

  //#endregion

  // #region buffer

  const triangleVertices = [
    //    X,    Y,    Z,       R,    G,    B,
    0.0, 0.5, 0.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.0, 0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
  ];

  const triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE, // ?
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribuet
  );
  gl.enableVertexAttribArray(positionAttribLocation);

  const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    colorAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE, // ?
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribuet
  );
  gl.enableVertexAttribArray(colorAttribLocation);

  //#endregion

  //#region matrix

  // get the uniform positions
  const matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
  const matViewUniformLocation = gl.getUniformLocation(program, "mView");
  const matProjUniformLocation = gl.getUniformLocation(program, "mProj");

  const worldMatrix = new Float32Array(16);
  const viewMatrix = new Float32Array(16);
  const projMatrix = new Float32Array(16);

  glMatrix.mat4.identity(worldMatrix);
  glMatrix.mat4.lookAt(viewMatrix, [0, 0, -2], [0, 0, 0], [0, 1, 0]);
  glMatrix.mat4.perspective(projMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 1000.0);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

  //#endregion

  // ==============================
  // #region main render loop

  let identityMatrix = glMatrix.mat4.create();
  let angle = 0;
  const loop = () => {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    gl.clearColor(255, 255, 255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    glMatrix.mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  //#endregion
}
