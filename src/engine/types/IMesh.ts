import { vec3 } from "../math";

export interface IMaterial{
    // m_VERTICES: Array<number>;
    // m_INDICES: Array<number>;

}
export interface IMesh{
    m_VERTICES: Array<number>;
    m_INDICES: Array<number>;
    v_position: vec3;

    material: IMaterial

}