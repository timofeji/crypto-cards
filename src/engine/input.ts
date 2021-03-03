let onKeyUp = (event: any) => {
    if (event.key == "g") {
        alert("BITCJ");
        // gl.uniform3fv(u_Color, [0.0, 1.0, 0.0])
    } else if (event.key == "b") {
        alert("BITCJ");
        // gl.uniform3fv(u_Color, [0.0, 0.0, 1.0])
    }

    // gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.TRIANGLES, 0, 3);
};

document.addEventListener('keyup', onKeyUp, false);
