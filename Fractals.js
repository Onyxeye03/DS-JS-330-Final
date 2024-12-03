//webgl function
function init() {

    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

  document.getElementById( "ButtonTexture" ).onclick = function ();
    document.getElementById( "ButtonZoom" ).onclick = function ();
}

// Add fractal here 
