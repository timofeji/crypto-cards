precision mediump float;

uniform sampler2D uTexture;

varying vec2 vTexCoord;
varying vec3 vNormals;

void main() {
    vec3 normal = normalize(vNormals);
    float fakeLight = dot(vec3(1,1,0), normal) * .5 + .5;
    gl_FragColor = texture2D(uTexture, vTexCoord) ;
}