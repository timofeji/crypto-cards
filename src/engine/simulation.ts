import { mat4 } from "gl-matrix";
import { vec3, VMath } from "./math";
import { World } from "./renderer";
import { ISimulation } from "./types/ISimulation";


let CAM_SPEED = 200

interface Map<T> {
    [K: string]: T;
}

let keys: Map<boolean> = {};

let onKeyUp = (event: any) => {
    keys[event.key] = false;
};

let onKeyDown = (event: any) => {
    keys[event.key] = true;
};

document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("keydown", onKeyDown, false);

export function simulate(game: ISimulation, deltaTime: number) {
    let cam = game.world.camera;
    let v_dir = VMath.sub(cam.v_lookAt, cam.v_position).normalize();

    let camRight = VMath.cross(v_dir, new vec3(0,1,0)).normalize();
    let camUp = VMath.cross(v_dir, camRight);

    if (keys["a"]) {
        game.world.camera.v_position.sub(camRight);
    } else if (keys["d"]) {
        game.world.camera.v_position.add(camRight);
    } else if (keys["w"]) {
        game.world.camera.v_position.sub(camUp);
    } else if (keys["s"]) {
        game.world.camera.v_position.add(camUp);
    }

    // let renderObject = game.world.objects[0];

    // for (let index = 0; index < game.world.objects.length; index++) {
    //     const element = game.world.objects[index];
    // }
}