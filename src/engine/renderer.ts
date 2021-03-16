import { ISimulation } from "./types/ISimulation";
import { IMesh } from "./types/IMesh";
import { IEntity } from "./types/IEntity";
import { mat4, glMatrix } from "gl-matrix";
import { Box3D, Plane3D, loadOBJ } from "./geometry";
import { vec3 } from "./math";
import { DefaultMaterial, IMaterial } from "./types/IMaterial";

var matWorldUniformLocation: WebGLUniformLocation;
var matModelUniformLocation: WebGLUniformLocation;
var matViewUniformLocation: WebGLUniformLocation;
var matProjUniformLocation: WebGLUniformLocation;

let identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);

let posAttribLocation: number;
let texAttribLocation: number;
let nmlAttribLocation: number;

export var viewMatrix = new Float32Array(16);
var worldMatrix = new Float32Array(16);
var modelMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

let glProgram: WebGLProgram;

var devTexture: WebGLTexture;
var texture2: WebGLTexture;

export class Camera {
    pitch: number;
    yaw: number;
    v_position: vec3;
    v_lookAt: vec3;
}

let box = new Box3D();
let plane = new Plane3D();

export class World {
    camera: Camera;
    objects: Array<IMesh>;

    constructor() {
        this.camera = new Camera();
        this.camera.v_position = new vec3(6, 0, 0);
        this.camera.v_lookAt = new vec3(0, 0, 0);
        this.camera.pitch = 0;
        this.camera.yaw = 0;
        this.objects = [];

        let box2 = new Box3D();
        let box = new Box3D();
        box2.v_position = new vec3(0, 2, 0);
        plane.v_position = new vec3(0, -1, 0);
        box.v_position = new vec3(2, 0, 0);
    }

    addMesh(gl: WebGLRenderingContext, mesh: IMesh) {
        //VERTEX BUFFER OBJECT
        mesh.VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.m_VERTICES), gl.STATIC_DRAW);

        //TEXTURE BUFFER OBJECT
        mesh.TBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.TBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.m_TEXCOORDS), gl.STATIC_DRAW);

        //NORMAL BUFFER OBJECT
        mesh.NBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.NBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.m_NORMALS), gl.STATIC_DRAW);


        //INDEX BUFFER OBJECT
        mesh.IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.m_INDICES), gl.STATIC_DRAW);


        this.objects.push(mesh);
    }
   
}

export function resize(gl: WebGLRenderingContext, w: number, h: number) {
    mat4.perspective(projMatrix, glMatrix.toRadian(90), w /h, 0.1, 1000.0);
    gl.viewport(0, 0, w,h);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);
}

export async function initRenderer(game: ISimulation) {

    let gl = game.gl;

    let fragShader = await (await fetch("../shaders/frag.glsl")).text();
    let vertShader = await (await fetch("../shaders/vert.glsl")).text();

    const obj = await (await fetch("../assets/test.obj")).text();
    const teapot = await (await fetch("../assets/teapot.obj")).text();
    let model = loadOBJ(obj);
    

    gl.clearColor(0.1, 0.07, 0.07, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    // Compile shaders
    let vertexShader = buildShader(gl, vertShader, gl.VERTEX_SHADER);
    let fragmentShader = buildShader(gl, fragShader, gl.FRAGMENT_SHADER);

    // Create program
    glProgram = gl.createProgram();

    // Attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        console.error("ERROR linking program!", gl.getProgramInfoLog(glProgram));
        return;
    }

    gl.validateProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.VALIDATE_STATUS)) {
        console.error("ERROR validating program!", gl.getProgramInfoLog(glProgram));
        return;
    }


    posAttribLocation = gl.getAttribLocation(glProgram, "a_position");
    texAttribLocation = gl.getAttribLocation(glProgram, "a_texCoord");
    nmlAttribLocation = gl.getAttribLocation(glProgram, "a_normal");

    let boxer = new Box3D();
    boxer.v_position = new vec3(2,0,0);
    let plane = new Plane3D();
    plane.v_position = new vec3(0,-1,0);
    game.world.addMesh(game.gl, box);
    game.world.addMesh(game.gl, plane);
    game.world.addMesh(game.gl, boxer);



    devTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, devTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));


    texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    boxer.material = new DefaultMaterial();
    boxer.material.texture = texture2;


    // Asynchronously load an image
    var image = new Image();
    image.src = "../assets/dev-texture.png";
    image.addEventListener("load", () => {
        // Now that the image has loaded make copy it to the texture.

        gl.bindTexture(gl.TEXTURE_2D, devTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    });

    var image2 = new Image();
    image2.src = "../assets/f-texture.png";
    image2.addEventListener("load", () => {
        // Now that the image has loaded make copy it to the texture.

        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    });


    gl.useProgram(glProgram);

    matWorldUniformLocation = gl.getUniformLocation(glProgram, "mWorld");
    matViewUniformLocation = gl.getUniformLocation(glProgram, "mView");
    matModelUniformLocation = gl.getUniformLocation(glProgram, "mModel");
    matProjUniformLocation = gl.getUniformLocation(glProgram, "mProj");

    mat4.identity(worldMatrix);
    mat4.identity(modelMatrix);
    mat4.lookAt(viewMatrix, [6, 0, 0], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(90), gl.canvas.width/gl.canvas.height, 0.1, 1000.0);

    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);
    gl.uniformMatrix4fv(matModelUniformLocation, false, modelMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);
}

export function render(game: ISimulation, deltaTime: number) {
    let gl = game.gl;
    let world = game.world;


    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);
    gl.clearColor(0.1, 0.07, 0.07, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    world.objects.forEach((renderObject) => {
        mat4.translate(renderObject.m_modelMatrix, identityMatrix, [renderObject.v_position.X, renderObject.v_position.Y, renderObject.v_position.Z]);

        gl.uniformMatrix4fv(matModelUniformLocation, false, renderObject.m_modelMatrix);

        if (renderObject.material) {
            gl.bindTexture(gl.TEXTURE_2D, renderObject.material.texture);
            gl.activeTexture(gl.TEXTURE0);
        } else {
            gl.bindTexture(gl.TEXTURE_2D, devTexture);
            gl.activeTexture(gl.TEXTURE0);
        }

        // VERTEX BUFFER OBJECT
        gl.bindBuffer(gl.ARRAY_BUFFER, renderObject.VBO);
        gl.vertexAttribPointer(
            posAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(posAttribLocation);


        //NORMAL BUFFER OBJECT
        gl.bindBuffer(gl.ARRAY_BUFFER, renderObject.NBO);
        gl.vertexAttribPointer(
            nmlAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            0 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.enableVertexAttribArray(nmlAttribLocation);


        //TEXTURE BUFFER OBJECT
        gl.bindBuffer(gl.ARRAY_BUFFER, renderObject.TBO);
        gl.vertexAttribPointer(
            texAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            2 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.enableVertexAttribArray(texAttribLocation);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderObject.IBO);
        gl.drawElements(gl.TRIANGLES, renderObject.m_INDICES.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    });
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
