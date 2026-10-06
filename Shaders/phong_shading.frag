//#version 120
// phong shading 
uniform float maxz;
varying vec3 lightDir, eyeVec;
varying float Z;
varying vec3 normal;

//varying vec2 out_texcoord;
//uniform sampler2D tex_sampler;
//uniform sampler2D tex_sampler2;

void main() {
	vec4 color;

	//if(maxz==0) {
	//	color=vec4(texture2D(tex_sampler, out_texcoord).rgb, 1.0)+vec4(texture2D(tex_sampler2, out_texcoord).rgb, 1.0);
	//} else
	color=gl_Color; //*(Z/maxz);

	vec4 final_color = (gl_LightSource[0].ambient * color);
		
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);

	float lambertTerm = dot(N, L);

	if(lambertTerm > 0.0) {
		final_color += gl_LightSource[0].diffuse * color * lambertTerm;	
		
		vec3 E = normalize(eyeVec);
		vec3 R = reflect(-L, N);
		
		float specular = pow(max(dot(R, E), 0.0), gl_FrontMaterial.shininess);
		
		final_color += gl_LightSource[0].specular * gl_FrontMaterial.specular * specular;	
	}

	gl_FragColor = final_color;
	//glFragData[0] = final_color;
}
