/* SolarLiDAR_vis (ver. 2.0 alpha)
 * Niko Lukac (niko.lukac [at] um.si) */

#version 330

uniform vec4 ambient;
uniform vec4 diffuse;
uniform vec4 specular;
uniform float shininess;
uniform int color_all;

in vec3 color;
in vec3 normal;
in vec3 lightDir, eyeVec;

layout(location=0) out vec4 out_color; 

void main() {
	vec4 mat_color;
	
	if(normal.y>0.999 || color_all==1) {
		mat_color = vec4(color, 1);
	} else {
		mat_color = vec4(0.85f, 0.85f, 0.85f, 1);
	}
	
	vec4 final_color=ambient * mat_color;
	
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);

	float lambertTerm = dot(N, L);

	if(lambertTerm > 0.0) {
		final_color += diffuse * mat_color * lambertTerm;	
		
		vec3 E = normalize(eyeVec);
		vec3 R = reflect(-L, N);
		
		float specular = pow(max(dot(R, E), 0.0), shininess);
		
		//final_color += specular * specular * specular;	
	}

	out_color = final_color;
}
