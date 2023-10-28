const expect = require("chai").expect;
const request = require("request");
const services = require('../app');

console.log("==services==", services);


describe("TESTS CODE OF SERVER ONLINE LEARNING", function () {
    // test Login       -------------------------------------------------------------------
    describe("Server-side Login", function () {

        var url = "http://localhost:8000/api/v1/users/login";

        it("Empty query should return status 500 and give an empty object", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Email and Password is required" });
                done();
            });
        });

        it("Only email is provided", function (done) {
            request(url + "?email=slang@gmail.com", function (error, response, body) {
                // console.log("===response==",response.body)
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Password is required" });
                done();
            });
        });

        it("Only password is provided", function (done) {
            request(url + "?password=jessica", function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Email is required" });
                done();
            });
        });

        it("Everything except password provided", function (done) {
            request(url + "?email=slang@gmail.com&surpassword=Kovalenko&age=24", function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Password is required" });
                done();
            });
        });

        it("Everything except email provided", function (done) {
            request(url + "?email=jessica&suremail=Kovalenko&age=24", function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Email is required" });
                done();
            });
        });

        it("Only password and email provided", function (done) {
            request(url + "?password=jessica&email=slang@gmail.com", function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ password: "jessica", email: "slang@gmail.com", filled: 50 });
                done();
            });
        });

        it("All the data provided correctly", function (done) {
            request(url + "email=slang@gmail.com&password=jessica", function (error, response, body) {
                // console.log("===response==",response)
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ "email": "slang@gmail.com", "password": "jessica" });
                done();
            });
        });
    });
});