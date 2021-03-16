precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

uniform mat4 u_mWorld;
uniform mat4 u_mModel;
uniform mat4 u_mView;
uniform mat4 u_mProj;

uniform vec3 u_vLightPos;

varying vec2 vTexCoord;
varying vec3 vNormals;
varying vec3 vSurfaceToLight;


void main()
{
  vec3 surfaceWorldPosition = (mat3(u_mModel) * a_position).xyz;

  gl_Position = u_mProj * u_mView  * u_mModel *vec4(a_position, 1.0);
  vSurfaceToLight = u_vLightPos - surfaceWorldPosition;
  vNormals = mat3(u_mModel) * a_normal;
  // vNormals = a_normal;
  vTexCoord = a_texCoord;
}