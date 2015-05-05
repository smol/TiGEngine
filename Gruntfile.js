module.exports = function(grunt) {
	"use strict";
	grunt.initConfig({
		ts: {
			default : {
				src: ["typescript/TiGEngine/**/*.ts", "!node_modules/**/*.ts"],
				reference : '../CardGame/thegame/public/typescripts/tigEngine.d.ts',
				out:'../CardGame/thegame/public/javascripts/tigEngine.js',
//				reference : '../CardGame/thegame/public/typescripts/tigEngine.d.ts', 				
//				declaration : true,
				options:{
					module: "amd" | "commonjs" | "",
					sourceMap:false,
					baseDir:'javascript/',
					watch : "typescript/TiGEngine/**/*.ts",
					fast : "never"	
				},
				
			}
		}
	});
	grunt.loadNpmTasks("grunt-ts");
	grunt.registerTask("default", ["ts:default"]);
};
