import { vec3, VMath } from "./math";
import { World } from "./renderer";
import { ISimulation } from "./types/ISimulation";

interface Map<T> {
    [K: string]: T;
}

let keys: Map<boolean> = {};

// let world = game.world;
let onKeyUp = (event: any) => {
    keys[event.key] = false;
};

document.addEventListener("keyup", onKeyUp, false);


// let world = game.world;
let onKeyDown = (event: any) => {
    keys[event.key] = true;
};

document.addEventListener("keydown", onKeyDown, false);

export function simulate(game: ISimulation, deltaTime: number) {
    let cam = game.world.camera;
    let v_dir = VMath.sub(cam.v_lookAt, cam.v_position).normalize();

    let camRight = VMath.cross(new vec3(0, 1, 0), v_dir).normalize();
    let camUp = VMath.cross(v_dir, camRight);

    if (keys["a"]) {
        game.world.camera.v_position.add(camRight);
    } else if (keys["d"]) {
        game.world.camera.v_position.sub(camRight);
    } else if (keys["w"]) {
        game.world.camera.v_position.add(camUp);
    } else if (keys["s"]) {
        game.world.camera.v_position.sub(camUp);
    }
}