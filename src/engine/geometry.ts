import { mat4 } from "gl-matrix";
import { parse } from "querystring";
import { vec3 } from "./math";
import { IMaterial } from "./types/IMaterial";
import { IMesh } from "./types/IMesh";

export class Box3D implements IMesh{
    m_VERTICES: any;
    m_INDICES: any;
    m_NORMALS: any;
    m_TEXCOORDS: Array<number>;
    m_modelMatrix: mat4;
    v_position: vec3;


    IBO: WebGLBuffer;
    VBO: WebGLBuffer;
    NBO: WebGLBuffer;
    TBO: WebGLBuffer;


    texAttribLocation: number;
    posAttribLocation: number;

    material: IMaterial;

    constructor(){
        this.m_VERTICES= 
            [ // X, Y, Z           U, V, 
                // Top
                -1.0, 1.0, -1.0,   //0, 0,
                -1.0, 1.0, 1.0,    //0, 1,
                1.0, 1.0, 1.0,     //1, 1,
                1.0, 1.0, -1.0,    //1, 0,
        
                // Left
                -1.0, 1.0, 1.0,    //0, 0,
                -1.0, -1.0, 1.0,   //1, 0,
                -1.0, -1.0, -1.0,  //1, 1,
                -1.0, 1.0, -1.0,   //0, 1,
        
                // Right
                1.0, 1.0, 1.0,    ///1, 1,
                1.0, -1.0, 1.0,   ///0, 1,
                1.0, -1.0, -1.0,  ///0, 0,
                1.0, 1.0, -1.0,   ///1, 0,
        
                // Front
                1.0, 1.0, 1.0,    //1, 1,
                1.0, -1.0, 1.0,   // 1, 0,
                -1.0, -1.0, 1.0,  //  0, 0,
                -1.0, 1.0, 1.0,   // 0, 1,
        
                // Back
                1.0, 1.0, -1.0,    //0, 0,
                1.0, -1.0, -1.0,   // 0, 1,
                -1.0, -1.0, -1.0,  //  1, 1,
                -1.0, 1.0, -1.0,   // 1, 0,
        
                // Bottom
                -1.0, -1.0, -1.0,   //1, 1,
                -1.0, -1.0, 1.0,    //1, 0,
                1.0, -1.0, 1.0,     //0, 0,
                1.0, -1.0, -1.0,    //0, 1,
            ];

            this.m_INDICES =
            [
                // Top
                0, 1, 2,
                0, 2, 3,

                // Left
                5, 4, 6,
                6, 4, 7,

                // Right
                8, 9, 10,
                8, 10, 11,

                // Front
                13, 12, 14,
                15, 14, 12,

                // Back
                16, 17, 18,
                16, 18, 19,

                // Bottom
                21, 20, 22,
                22, 20, 23
            ];

            this.m_TEXCOORDS = [
                // Front
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Back
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Top
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Bottom
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Right
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Left
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0
              ];

            this.m_NORMALS = [
          
                //top
                0.0, 1.0, 0.0,   //0, 0,
                0.0, 1.0, 0.0,    //0, 1,
                0.0, 1.0, 0.0,     //1, 1,
                0.0, 1.0, 0.0,    //1, 0,
        
                // Left
                -1.0, 0.0, 0.0,    //0, 0,
                -1.0, 0.0, 0.0,   //1, 0,
                -1.0, 0.0, 0.0,  //1, 1,
                -1.0, 0.0, 0.0,   //0, 1,
        
                // Right
                1.0, 0.0, 0.0,    ///1, 1,
                1.0, 0.0, 0.0,   ///0, 1,
                1.0, 0.0, 0.0,  ///0, 0,
                1.0, 0.0, 0.0,   ///1, 0,
        
                // Front
                0.0, 0.0, 1.0,    //1, 1,
                0.0, 0.0, 1.0,   // 1, 0,
                0.0, 0.0, 1.0,  //  0, 0,
                0.0, 0.0, 1.0,   // 0, 1,
        
                // Back
                0.0, 0.0, -1.0,    //0, 0,
                0.0, 0.0, -1.0,   // 0, 1,
                0.0, 0.0, -1.0,  //  1, 1,
                0.0, 0.0, -1.0,   // 1, 0,
        
                // Bottom
                0.0, -1.0, 0.0,   //1, 1,
                0.0, -1.0, 0.0,    //1, 0,
                0.0, -1.0, 0.0,     //0, 0,
                0.0, -1.0, 0.0,    //0, 1,
            ]

            this.m_modelMatrix = mat4.create();
            this.v_position = new vec3(0,0,0);
        }
}


export class Plane3D implements IMesh {
    m_VERTICES: any;
    m_NORMALS: any;
    m_INDICES: any;
    m_TEXCOORDS: Array<number>;
    m_modelMatrix:mat4;
    v_position: vec3;

    IBO: WebGLBuffer;
    VBO: WebGLBuffer;
    NBO: WebGLBuffer;
    TBO: WebGLBuffer;

    texAttribLocation: number;
    posAttribLocation: number;

    material: IMaterial;

    constructor()
    {
        this.m_VERTICES= 
        [ // X, Y, Z           R, G, B
            // Front
            -5.0, 0.0, -5.0,  
            -5.0, 0.0, 5.0,   
            5.0, 0.0, 5.0,     
            5.0, 0.0, -5.0   
        ];

        this.m_NORMALS=
        [
            0.0, 1.0, 0.0,  
            0.0, 1.0, 0.0,   
            0.0, 1.0, 0.0,     
            0.0, 1.0, 0.0   
        ]

        this.m_INDICES =
        [
            0, 1, 2,
            0, 2, 3
        ];

        this.m_TEXCOORDS = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0
        ];

        this.m_modelMatrix = mat4.create();
        this.v_position = new vec3(0,0,0);
    }
}

export class Object3D implements IMesh {
    m_VERTICES: any;
    m_INDICES: any;
    m_NORMALS: any;
    m_TEXCOORDS: any;
    m_modelMatrix:mat4;
    v_position: vec3;

    IBO: WebGLBuffer;
    VBO: WebGLBuffer;
    NBO: WebGLBuffer;
    TBO: WebGLBuffer;

    texAttribLocation: number;
    posAttribLocation: number;

    material: IMaterial;


    constructor()
    {
        this.m_VERTICES = []; 
        this.m_NORMALS = []; 
        this.m_TEXCOORDS = []; 

        this.m_modelMatrix = mat4.create();
        this.v_position = new vec3(0,0,0);
    }
}

export function parseVec(string:string, prefix:string) {
    return string.replace(prefix, '').split(' ').map(Number);
}

export function parseFace(string:string) {
    return string.replace('f ', '').split(' ').map(chunk => {
        return chunk.split('/').map(Number);
    })
}

export function loadOBJMesh(text: string): Object3D {
    const _vertices: any = [];
    const _normals: any = [];
    const _texCoords: any = [];

    const vertexIndices: any = [];
    const normalIndices: any = [];
    const texCoordIndices: any = [];

    text.split('\n').forEach(line => {
        if (line.startsWith('v ')) {
            _vertices.push(parseVec(line, 'v '));
        }

        if (line.startsWith('vn ')) {
            _normals.push(parseVec(line, 'vn '));
        }

        if (line.startsWith('vt ')) {
            _texCoords.push(parseVec(line, 'vt '));
        }

        if (line.startsWith('f ')) {
            const parsedFace = parseFace(line);

            vertexIndices.push(...parsedFace.map(face => face[0]));
            texCoordIndices.push(...parsedFace.map(face => face[1] - 1));
            normalIndices.push(...parsedFace.map(face => face[2] - 1));

            // parsedFace.map(face => {
            //     vertexIndices.push(face[0]);
            // })

            console.log(parsedFace);
        }
    });

    // console.log(vertexIndices.join());

    const vertices = [];
    const normals = [];
    const texCoords = [];

    for (let i = 0; i < vertexIndices.length; i++) {
        const vertexIndex = vertexIndices[i];
        const normalIndex = normalIndices[i];
        const texCoordIndex = texCoordIndices[i];

        const vertex = _vertices[vertexIndex];
        const normal = _normals[normalIndex];
        const texCoord = _texCoords[texCoordIndex];

        if (vertex) {
            vertices.push(...vertex);
        }
        if (normal) {
            normals.push(...normal);
        }

        if (texCoord) {
            texCoords.push(...texCoord);
        }
    }

    let mesh = new Object3D();
    mesh.m_VERTICES = new Float32Array(vertices);
    mesh.m_NORMALS = new Float32Array(normals);
    mesh.m_TEXCOORDS = new Float32Array(texCoords);
    mesh.m_INDICES = new Float32Array(vertexIndices);


    return mesh;
}

