export class vec3 {
    X: number;
    Y: number;
    Z: number;
    constructor(x: any, y: any, z: any) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    identity() {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
    }

    add(x: vec3) {
        this.X += x.X;
        this.Y += x.Y;
        this.Z += x.Z;
    }
    sub(x: vec3){
        this.X -= x.X;
        this.Y -= x.Y;
        this.Z -= x.Z
    }

    divideScalar(s: number) {
        if (s) {
            this.X /= s;
            this.Y /= s;
            this.Z /= s;
        } else {
            this.X = 0;
            this.Y = 0;
            this.Z = 0;
        }

        return this;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }
    lengthSq() {
        return this.X * this.X + this.Y * this.Y + this.Z * this.Z;
    }
    normalize() {
        return this.divideScalar(this.length());
    }
}

export namespace VMath {
    export function dot(a: vec3, b: vec3) {}

    export function add(a:vec3, b:vec3){
        let ret = new vec3(0, 0, 0);
        ret.X = a.X + b.X;
        ret.Y = a.Y + b.Y;
        ret.Z = a.Z + b.Z;
        return ret;
    }


    export function sub(a:vec3, b:vec3){
        let ret = new vec3(0, 0, 0);
        ret.X = a.X - b.X;
        ret.Y = a.Y - b.Y;
        ret.Z = a.Z - b.Z;
        return ret;
    }


    export function cross(a: vec3, b: vec3) {
        let ret = new vec3(0, 0, 0);
        ret.X = a.Y * b.Z - a.Z * b.Y;
        ret.Y = a.Z * b.X - a.X * b.Z;
        ret.Z = a.X * b.Y - a.Y * b.X;

        return ret;
    }

}
