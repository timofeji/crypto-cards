import { createContext, isContext } from "vm";
import { Card } from "./game/card";
import { initRenderer, draw } from "./engine/renderer";
import {IGame} from "./types/IGame";


class Game implements IGame {
    gl: WebGLRenderingContext;
}


window.onload = () => {

    let currentTime = 0;
    let lastTime = 0;
    let deltaTime = 0;
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    //Instantiate game instance
    let game = new Game();
    game.gl = canvas.getContext("webgl");

    initRenderer(game);

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
