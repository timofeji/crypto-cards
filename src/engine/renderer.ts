import { ISimulation } from "./types/ISimulation";
import { IMesh } from "./types/IMesh";
import { mat4, glMatrix } from "gl-matrix";
import { Box3D } from "./geometry";
import { vec3 } from "./math";

var matWorldUniformLocation: WebGLUniformLocation;
var matViewUniformLocation: WebGLUniformLocation;

let identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
let angle = 0;
let xRotationMatrix = new Float32Array(16);
let yRotationMatrix = new Float32Array(16);
var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

export class Camera {
    v_position: vec3;
    v_lookAt: vec3;
}

let box = new Box3D();

export class World {
    camera: Camera;
    objects: Array<IMesh>;

    constructor() {
        let box2 = new Box3D();
        this.camera = new Camera();
        this.camera.v_position = new vec3(0, 0, 5);
        this.camera.v_lookAt = new vec3(0, 0, 0);


        // this.objects.(box2);
        // this.objects[1] = box;
    }
}

export async function initRenderer(game: ISimulation) {
    let gl = game.gl;

    let fragShader = await (await fetch("../shaders/frag.glsl")).text();
    let vertShader = await (await fetch("../shaders/vert.glsl")).text();

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    // Compile shaders
    let vertexShader = buildShader(gl, vertShader, gl.VERTEX_SHADER);
    let fragmentShader = buildShader(gl, fragShader, gl.FRAGMENT_SHADER);

    // Create program
    let glProgram: WebGLProgram = gl.createProgram();

    // Attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        console.error(
            "ERROR linking program!",
            gl.getProgramInfoLog(glProgram)
        );
        return;
    }
    gl.validateProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.VALIDATE_STATUS)) {
        console.error(
            "ERROR validating program!",
            gl.getProgramInfoLog(glProgram)
        );
        return;
    }

    var boxVertexBufferObject = gl.createBuffer();;
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(box.m_VERTICES),
        gl.STATIC_DRAW
    );

    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(box.m_INDICES),
        gl.STATIC_DRAW
    );

    var positionAttribLocation = gl.getAttribLocation(
        glProgram,
        "vertPosition"
    );
    var colorAttribLocation = gl.getAttribLocation(glProgram, "vertColor");
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        colorAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(glProgram);

    matWorldUniformLocation = gl.getUniformLocation(glProgram, "mWorld");
    matViewUniformLocation = gl.getUniformLocation(glProgram, "mView");
    var matProjUniformLocation = gl.getUniformLocation(glProgram, "mProj");

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(
        projMatrix,
        glMatrix.toRadian(90),
        window.innerWidth / window.innerHeight,
        0.1,
        1000.0
    );

    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
}

export function draw(game: ISimulation, deltaTime: number) {
    let gl = game.gl;
    let world = game.world

    angle = (performance.now() / 1000) * 2 * Math.PI;
    let offset = Math.sin(performance.now() / 1000);
    // console.log(offset);
    // mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    // mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [0, 0, 0]);
    // mat4.translate(worldMatrix, identityMatrix, [0, 0, 0]);
    // mat4.mul(worldMatrix, worldMatrix, yRotationMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);

    

    mat4.lookAt(viewMatrix, 
        [world.camera.v_position.X, world.camera.v_position.Y,world.camera.v_position.Z], 
        [world.camera.v_lookAt.X, world.camera.v_lookAt.Y,world.camera.v_lookAt.Z], 
        [0, 1, 0]); // Y UP

    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // world.objects.forEach(renderObject => { // not to be confused w/ OOP bullshit
        
    // });

    gl.drawElements(gl.TRIANGLES, box.m_INDICES.length, gl.UNSIGNED_SHORT, 0);
}

function buildShader(gl: WebGLRenderingContext, src: string, type: number) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
        return;
    }
    return shader;
}
