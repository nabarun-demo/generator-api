var chai = require("chai");
var chaiHttp = require("chai-http");
var APIserver = require("../bin/www");
var util = require("util");

var should = chai.should();

chai.use(chaiHttp);

describe("Library API", function() {
  this.timeout(10000);

  it("should call the root API url", function(done) {
    chai
      .request(APIserver)
      .get("/")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have
          .property("message")
          .equal("Welcome to cytel demo API!");
        done();
      });
  });
});
