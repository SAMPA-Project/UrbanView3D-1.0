/* SolarLiDAR_vis (ver. 2.0 alpha)
 * Niko Lukac (niko.lukac [at] um.si) */

#version 330

uniform mat4 mvp; //modelviewprojection matrix
uniform mat4 normal_mat;
uniform vec3 LightSource;

uniform float min_z;
uniform float grid_res;

layout(location=0) in vec3 in_vertex; 
layout(location=1) in vec3 in_normal; 
layout(location=2) in vec3 in_pos; //instance data
layout(location=3) in vec3 in_color; //instance data

out vec3 color;
out vec3 normal;
out vec3 lightDir, eyeVec;

void main() {
	vec4 invertex=vec4(in_vertex,1);
  
	invertex.x=(invertex.x+in_pos.x)*grid_res;
	invertex.y=min_z;
	invertex.z=(invertex.z+in_pos.z)*grid_res;
  
	if(in_normal.y==1) {
		invertex.y= in_pos.y;
	}
  	
	invertex=mvp * invertex;
	
	lightDir.x = (LightSource.x - invertex.x);
	lightDir.y = (LightSource.y - invertex.y);
	lightDir.z = (LightSource.z - invertex.z);

	eyeVec = -vec3(invertex);

	normal = mat3(normal_mat) * in_normal;
	color = in_color;
	gl_Position = invertex; 
}
