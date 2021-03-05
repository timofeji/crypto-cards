precision mediump float;

attribute vec3 vertPosition;
// attribute vec3 vertColor;
attribute vec2 vertTexCoord;
varying vec2 vTexCoord;
uniform mat4 mWorld;
uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;



void main()
{
  gl_Position = mProj * mView * mWorld * mModel *vec4(vertPosition, 1.0);
  vTexCoord = vertTexCoord;
}