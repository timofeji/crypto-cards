import { mat4 } from "gl-matrix";
import { vec3, VMath } from "./math";
import { World, viewMatrix } from "./renderer";
import { ISimulation } from "./types/ISimulation";


let CAM_SPEED = 200

interface Map<T> {
    [K: string]: T;
}

let keys: Map<boolean> = {};
let bMouseDown: boolean;

let onKeyUp = (event: any) => {
    keys[event.key] = false;
};

let onKeyDown = (event: any) => {
    keys[event.key] = true;
};

let onMouseUp = (event: any) => {
    bMouseDown = false;
};

let onMouseDown = (event: any) => {
    bMouseDown = true;
};



document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("mousedown", onMouseUp, false);
document.addEventListener("mouseup", onMouseDown, false);

// Update view in simulation since mat transforms are expensive 
let updateView = (world: World) => {


    world.camera.v_position.X = Math.cos(world.camera.pitch) * world.camera.dist;
    world.camera.v_position.Y = Math.cos(world.camera.yaw) * world.camera.dist;
    world.camera.v_position.Z = Math.sin(world.camera.pitch) * world.camera.dist;



    mat4.lookAt(
        viewMatrix,
        [
            world.camera.v_position.X,
            world.camera.v_position.Y,
            world.camera.v_position.Z,
        ],
        [
            world.camera.v_lookAt.X,
            world.camera.v_lookAt.Y,
            world.camera.v_lookAt.Z,
        ],
        [0, 1, 0]
    ); // Y UP
    // mat4.rotateZ(viewMatrix, viewMatrix, world.camera.yaw);
    // mat4.rotateY(viewMatrix, viewMatrix, world.camera.pitch);
};

export function simulate(game: ISimulation, deltaTime: number) {


    // game.world.camera.v_position.Y = Math.sin(performance.now()*0.001)*5 +5;
    let cam = game.world.camera;
    let v_dir = VMath.sub(cam.v_lookAt, cam.v_position).normalize();

    let camRight = VMath.cross(v_dir, new vec3(0,1,0)).normalize();
    let camUp = VMath.cross(v_dir, camRight);

    if (keys["a"]) {
        // game.world.camera.v_position.sub(camRight);
        game.world.camera.pitch += 3 * deltaTime;
        updateView(game.world);
    } 
    if (keys["d"]) {
        // game.world.camera.v_position.add(camRight);
        game.world.camera.pitch -= 3 * deltaTime;
        updateView(game.world);
    } 
    if (keys["w"]) {
        // game.world.camera.yaw -= 2 * deltaTime;
        game.world.camera.yaw = Math.min(Math.max(game.world.camera.yaw - 2 * deltaTime, -90 * Math.PI/180),0);
        // game.world.camera.v_position.sub(camUp);
        updateView(game.world);
    } 
    if (keys["s"]) {
        // game.world.camera.yaw += 2 * deltaTime;
        game.world.camera.yaw = Math.min(Math.max(game.world.camera.yaw + 2 * deltaTime, -90 * Math.PI/180),0);
        // game.world.camera.yaw = Math.min(Math.max(game.world.camera.yaw - 2 * deltaTime, 180),-90);
        // game.world.camera.v_position.add(camUp);
        updateView(game.world);
    }

    if(game.world.objects.length > 1){
        game.world.objects[0].v_position = new vec3( -1 - Math.sin(performance.now() / 1000),0, 0);
    }
    if(bMouseDown){

    }

    // let renderObject = game.world.objects[0];

    // for (let index = 0; index < game.world.objects.length; index++) {
    //     const element = game.world.objects[index];
    // }
}


