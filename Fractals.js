"use strict";
var canvas;
var gl;
var positions;
var numTimesToSubdivide = 0;
var bufferId;
init();
function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) {
        alert("WebGL isn'tavailable" ); }
//
// Configure WebGL
//
gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
// Load shaders and initialize attribute buffers
        var program = initShaders(gl, "vertex-shader", "fragment-shader"); 
        gl.useProgram(program);
        // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        //gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);
// Associate out shader variables with our data buffer
        var positionLoc = gl.getAttribLocation(program, "aPosition");
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLoc);
        document.getElementById("slider").onchange
            = function (event) {
                numTimesToSubdivide =
                    parseInt(event.target.value);
                render();
            };
        render();
    };
function divFlake(left, right, count) {
    var sqrt3d2 = Math.sqrt(3) / 2;
    var mid = mix(left, right, 0.5); // Midpoint of the side

    if (count == 0) {
        positions.push(left);
        positions.push(mid);
        positions.push(right);
    } else {
        var top = vec2(mid[0], mid[1] + sqrt3d2 * (right[1] - left[1])); // Top point using midpoint formula
        positions.push(mid);
        positions.push(top);
        positions.push(top);
        positions.push(right);
        --count;
        divFlake(left, mid, count);
        divFlake(mid, right, count);
    }
}
function render() {
    var vertices = [
        vec2(-1.0, 0.0),
        vec2(0.0, Math.sqrt(3) / 2),
        vec2(1.0, 0.0)
    ];
    positions = [];
    positions.push(vertices[0]);
    positions.push(vertices[1]);
    positions.push(vertices[2]);
    var left = vec2(-1.0, 0.0);
    var right = vec2(1.0, 0.0);
    divFlake(left, right, numTimesToSubdivide);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length);
    positions = [];
}
