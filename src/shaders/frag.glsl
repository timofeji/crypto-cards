precision mediump float;

uniform float fTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
varying vec3 vNormals;
varying vec3 vSurfaceToLight;

void main() {
    vec3 normal = normalize(vNormals);
    float light = .5*dot(normal, normalize(vSurfaceToLight)) + .5;
    gl_FragColor = texture2D(uTexture, vTexCoord) *light;
    
}