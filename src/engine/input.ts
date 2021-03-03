import { ISimulation } from "./types/ISimulation";

// let onKeyUp = (event: any) => {
//     let cam = game.world.camera;
//     let v_dir = VMath.sub(cam.v_lookAt, cam.v_position).normalize();

//     let camRight = VMath.cross(new vec3(0, 1, 0), v_dir).normalize();
//     let camUp = VMath.cross(v_dir, camRight);

//     if (event.key == "a") {
//         game.world.camera.v_position.add(camRight);
//     } else if (event.key == "d") {
//         game.world.camera.v_position.sub(camRight);
//     } else if (event.key == "w") {
//         game.world.camera.v_position.add(camUp);
//     } else if (event.key == "s") {
//         game.world.camera.v_position.sub(camUp);
//     }
// };

// document.addEventListener("keypress", onKeyUp, false);


export function initInput(game: ISimulation){

}