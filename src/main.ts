import { createContext, isContext } from "vm";
import { Card } from "./card";

const g = new Card("BITCH");
g.greet();

document.write(g.greet());

let canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 1000;
let ctx = canvas.getContext("2d");

