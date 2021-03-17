precision mediump float;

uniform float fTime;
uniform sampler2D uTexture;

uniform float u_shininess;

varying vec2 vTexCoord;
varying vec3 vNormals;
varying vec3 vSurfaceToLight;
varying vec3 vSurfaceToView;

void main() {
    vec3 normal = normalize(vNormals);
    vec3 halfVector = normalize(normalize(vSurfaceToLight) + normalize(vSurfaceToView));

    float light = .5*dot(normal, normalize(vSurfaceToLight)) + .5;
    float specular = pow(dot(normal, halfVector), u_shininess);

    gl_FragColor = texture2D(uTexture, vTexCoord) * light;
    gl_FragColor += specular;
    
}