const expect = require("chai").expect;
const request = require("request");
const services = require('../app');

describe("TESTS CODE OF SERVER ONLINE LEARNING", function () {
    // test Category  -------------------------------------------------------------------
    describe("Server-side Category", function () {
        var url = "http://localhost:8000/api/v1/users/categories";
        it("Empty query should return status 500 and give an empty object", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                // expect(JSON.parse(body)).to.deep.equal({ error: "Email and Password is required" });
                done();
            });
        });

        
        // it("All the data provided correctly", function (done) {
        //     request(url + "email=slang@gmail.com&password=jessica", function (error, response, body) {
        //         // console.log("===response==",response)
        //         expect(response.statusCode).to.equal(500);
        //         // expect(JSON.parse(body)).to.deep.equal({ "email": "slang@gmail.com", "password": "jessica" });
        //         done();
        //     });
        // });
    });
});