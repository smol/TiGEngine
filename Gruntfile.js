module.exports = function(grunt) {
	"use strict";
	grunt.initConfig({
		ts: {
			default : {
				outDir:'javascript',
				src: ["typescript/**/*.ts", "!node_modules/**/*.ts"],
				options:{
					module: "amd" | "commonjs" | "",
					sourceMap:false,
					baseDir:'javascript/'
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-ts");
	grunt.registerTask("default", ["ts:default"]);
};
