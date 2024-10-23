const request = require('supertest')
const app = require('../app.js')
require("dotenv").config();


describe("POST /curreny/convert",() => {
    it("should return status Ok", async () => {
        const payload = {
            from: "USD",
            to:"INR",
            amount: 500
        }

        const res = await request(app).post("/curreny/convert").send(payload).set("Content-Type","application/json").set("Accept","application/json");
        
        expect(Number(res.headers["content-length"])).toBeGreaterThan(0)
        expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200) 
        expect(res.body.hasOwnProperty("status")).toBe(true)
        expect(res.body.hasOwnProperty("data")).toBe(true)
        expect(res.body.data.hasOwnProperty("result")).toBe(true)
    })
})