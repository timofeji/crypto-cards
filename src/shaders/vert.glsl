precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertNormal;
attribute vec2 vertTexCoord;

uniform mat4 mWorld;
uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

varying vec2 vTexCoord;
varying vec3 vNormals;


void main()
{
  gl_Position = mProj * mView  * mModel *vec4(vertPosition, 1.0);
  vNormals = mat3(mWorld) * vertNormal;
  vTexCoord = vertTexCoord;
}