#version 120
// phong shading
uniform mat4 mvp;
varying vec3 lightDir, eyeVec;
varying float Z;
varying vec3 normal;
//varying vec2 out_texcoord;

//uniform int texw;
//uniform int texh;

void main() {	
	normal = gl_NormalMatrix * gl_Normal;

	vec3 vVertex = vec3(mvp * gl_Vertex);
	lightDir.x = (gl_LightSource[0].position.x - vVertex.x);
	lightDir.y = (gl_LightSource[0].position.y - vVertex.y);
	lightDir.z = (gl_LightSource[0].position.z - vVertex.z);

	eyeVec = -vVertex;

	gl_Position = mvp * vec4(gl_Vertex.xyz, 1.0);	
	gl_FrontColor = gl_Color;

	//Z=gl_Vertex.y;

	//out_texcoord.x=gl_Vertex.x / texw*(1.0/0.75); // todo: divide by grid res
	//out_texcoord.y=1-gl_Vertex.z / texh*(1.0/0.75);
}
