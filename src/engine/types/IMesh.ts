import { mat4 } from "gl-matrix";
import { vec3 } from "../math";

export interface IMaterial{
    // m_VERTICES: Array<number>;
    // m_INDICES: Array<number>;

}
export interface IMesh{
    m_VERTICES: Float32Array;
    m_INDICES: Array<number>;
    v_position: vec3;
    m_modelMatrix: mat4;

    material: IMaterial

}