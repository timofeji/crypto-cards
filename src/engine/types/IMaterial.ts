export interface IMaterial{
    texture: WebGLTexture;
}


export class DefaultMaterial implements IMaterial {
    texture: WebGLTexture;
}
