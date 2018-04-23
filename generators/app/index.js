"use strict";
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt(
      {
        type: "input",
        name: "name",
        message: "Your project name",
        //Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      function(answers) {
        this.props = answers;
        this.log(answers.name);
        done();
      }.bind(this)
    );
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath("_package.json"),
        this.destinationPath("package.json"),
        {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath("_tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        {
          name: this.props.name
        }
      );
    },

    //Copy application files
    app: function() {
      // Entry point
      this.fs.copyTpl(
        this.templatePath("_bin/_www"),
        this.destinationPath("bin/www"),
        {
          name: this.props.name
        }
      );

      // Config
      this.fs.copyTpl(
        this.templatePath("_src/_config/_default.json"),
        this.destinationPath("src/config/default.json"),
        {
          name: this.props.name
        }
      );

      // Server.ts
      this.fs.copy(
        this.templatePath("_src/_server.ts"),
        this.destinationPath("src/server.ts")
      );

      // Model
      this.fs.copy(
        this.templatePath("_src/_models/_book.ts"),
        this.destinationPath("src/models/book.ts")
      );

      // Route
      this.fs.copy(
        this.templatePath("_src/_routes/_route.ts"),
        this.destinationPath("src/routes/route.ts")
      );

      // Controllers
      this.fs.copy(
        this.templatePath("_src/_controllers/_bookController.ts"),
        this.destinationPath("src/controllers/bookController.ts")
      );

      // Dist/
      this.fs.copy(this.templatePath("_dist"), this.destinationPath("dist"));

      // Test
      this.fs.copy(
        this.templatePath("_test/_test.js"),
        this.destinationPath("test/test.js")
      );
    }
  },
  install: function() {
    this.installDependencies();
  }
});
