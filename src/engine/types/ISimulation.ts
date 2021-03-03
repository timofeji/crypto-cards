import { World } from "../renderer";

export interface ISimulation {
    gl: WebGLRenderingContext;
    world: World;
    update: (world: World) => World
}