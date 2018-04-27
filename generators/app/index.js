"use strict";
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var colors = require('colors');

module.exports = class extends yeoman {
  prompting() {
    var questions = [
      {
        type: "list",
        name: "project_type",
        message: "Please select your project type",
        choices: ["Simple API", "API with DB", "API with DB & UI"]
      },
      {
        type: "list",
        name: "db_type",
        message: "Please select your database",
        choices: ["MongoDB", "DynamoDB", "PostgreSQL"],
        when: function (answers) {
          return answers.project_type !== "Simple API";
        }
      },
      {
        type: "input",
        name: "db_con",
        message: "Please enter your database connection string",
        when: function (answers) {
          return answers.project_type !== "Simple API";
        },
        default: "mongodb://localhost:27017/user"
      },
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      }
    ];
    return this.prompt(questions).then(answers => {
      this.log(`Your inputs: \n${JSON.stringify(answers, null, "  ").yellow}`);
      if (answers.project_type === "API with DB & UI" || answers.db_type === "DynamoDB" || answers.db_type === "PostgreSQL") {
        this.env.error(colors.red.bold(`Selected options are yet to be implemented. Please try again with other options`));
      }
      this.props = answers;
    }).catch(err => {
      this.log(colors.red.bold(err));
    });
  }

  writing() {
    config: {
      try {
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), {
          appname: this.props.name
        });

        if (this.props.project_type !== "Simple API" && this.props.db_type === "MongoDB") {
          const pkgJson = {
            devDependencies: { "@types/mongoose": "^5.0.7" },
            dependencies: { mongoose: "^5.0.12" }
          };

          // Extend or create package.json file in destination path
          this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
        }

        this.fs.copyTpl(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"), {
          name: this.props.name
        });
      } catch (error) {
        this.log(colors.red.bold(error));
      }
    }

    // Copy application files
    app: {
      // Entry point
      this.fs.copyTpl(this.templatePath("_bin/_www"), this.destinationPath("bin/www"), {
        name: this.props.name
      });

      // Config
      this.fs.copyTpl(this.templatePath("_config/_default.json"), this.destinationPath("config/default.json"), {
        name: this.props.name
      });

      // Server.ts
      this.fs.copy(this.templatePath("_src/_server.ts"), this.destinationPath("src/server.ts"));

      // Model
      let tempPath = "_src/_models/_user.ts";
      if (this.props.project_type !== "Simple API" && this.props.db_type === "MongoDB") {
        tempPath = "_src/_models/_user_db.ts";
      }
      this.fs.copy(this.templatePath(tempPath), this.destinationPath("src/models/user.ts"));

      // Route
      this.fs.copy(this.templatePath("_src/_routes/_route.ts"), this.destinationPath("src/routes/route.ts"));

      // Controllers
      tempPath = "_src/_controllers/_userController.ts";
      if (this.props.project_type !== "Simple API" && this.props.db_type === "MongoDB") {
        tempPath = "_src/_controllers/_userController_db.ts";
      }
      this.fs.copy(this.templatePath(tempPath), this.destinationPath("src/controllers/userController.ts"));

      // DataAccess
      if (this.props.project_type !== "Simple API" && this.props.db_type === "MongoDB") {
        this.fs.copyTpl(this.templatePath("_src/_dataaccess/_index.ts"), this.destinationPath("src/dataaccess/index.ts"), {
          dbcon: this.props.db_con
        });
        this.fs.copy(this.templatePath("_src/_dataaccess/_schemas/_IUser.ts"), this.destinationPath("src/dataaccess/schemas/IUser.ts"));
        this.fs.copy(this.templatePath("_src/_dataaccess/_schemas/_user.ts"), this.destinationPath("src/dataaccess/schemas/user.ts"));
      }

      // Dist
      // this.fs.copy(this.templatePath("_dist"), this.destinationPath("dist"));

      // Test
      this.fs.copy(this.templatePath("_test/_test.js"), this.destinationPath("test/test.js"));
    }
  }

  install() {
    this.log('Installing project dependencies through npm'.bold.cyan);
    this.npmInstall().then(() => {
      this.log(colors.green.bold(`It's ready to use now \nUse npm start to start the project....`))
    });
  }
};
