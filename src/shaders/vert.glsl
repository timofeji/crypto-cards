precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

uniform mat4 mWorld;
uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

varying vec2 vTexCoord;
varying vec3 vNormals;


void main()
{
  gl_Position = mProj * mView  * mModel *vec4(a_position, 1.0);
  // vNormals = mat3(mWorld) * a_normal;
  vNormals = a_normal;
  vTexCoord = a_texCoord;
}