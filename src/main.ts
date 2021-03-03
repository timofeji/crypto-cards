import { createContext, isContext } from "vm";
import { Card } from "./game/card";
import { initRenderer, draw, World } from "./engine/renderer";
import { ISimulation } from "./engine/types/ISimulation";
import {vec3, VMath} from "./engine/math";


class Game implements ISimulation {
    gl: WebGLRenderingContext;
    world: World;

    update(world: World) {
        this.world = world;
        return this.world;
    }
}


window.onload = () => {

    let currentTime = 0;
    let lastTime = 0;
    let deltaTime = 0;
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    //Instantiate game instance
    let game = new Game();
    game.gl = canvas.getContext("webgl");
    game.world = new World();

    initRenderer(game);



    let onKeyUp = (event: any) => {
        let cam = game.world.camera;
        let dir = cam.v_position;
            dir.sub(cam.v_lookAt)
            dir.normalize();

        let camRight = VMath.cross(new vec3(0,1,0), dir).normalize()
        let camUp = VMath.cross(dir, camRight);
            


        if (event.key == "a") {
            let left = VMath.cross( dir, game.world.camera.v_position);
            game.world.camera.v_position.sub(dir);
            console.log(dir.X);
            console.log(dir.Y);
            console.log(dir.Z);
      
            // console(game.world.camera.v_position.);
            // gl.uniform3fv(u_Color, [0.0, 1.0, 0.0])
        } 
        // else if (event.key == "d") {
        //     game.world.camera.v_position.add(1, 0, 0);
        //     // alert("BITCJ");
        //     // gl.uniform3fv(u_Color, [0.0, 0.0, 1.0])
        // } else if (event.key == "w") {
        //     game.world.camera.v_position.add(0, 0, -1);
        // } else if (event.key == "s") {
        //     game.world.camera.v_position.add(0, 0, 1);
        // }

        // gl.clear(gl.COLOR_BUFFER_BIT);

        // gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    document.addEventListener("keypress", onKeyUp, false);

    //main loop ~ executes each anim frame to simulate and render game
    let main = () => {
        //Get current delta
        currentTime = Date.now();
        deltaTime = (currentTime - lastTime) / 1000.0;

        // // resize canvas
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;

        if (!game.gl) {
            console.log("Failed to get the rendering context for WebGL");
            return;
        }

        //Simulate
        // simulate(game, deltaTime);

        //Render
        draw(game, deltaTime);

        lastTime = currentTime;
        requestAnimationFrame(main);
    };

    console.log("starting game yo");
    requestAnimationFrame(main);
};



