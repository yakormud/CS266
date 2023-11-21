const chai = require('chai');
const expect = chai.expect;
const app = require('../server');
const { MongoClient } = require('mongodb');
const request = require('supertest');

// const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let client;

before(async function () {
    // Connect to the MongoDB server
    const uri = 'mongodb+srv://ploy:ploy@cs266.hlnjicp.mongodb.net/';
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
});

after(async function () {
    // Close the MongoDB connection
    if (client) {
        await client.close();
    }
});

describe('Unit test for selectTag()', () => {
    it('should display selected tag', async() => {
        //เลือก
        const response = await request(app)
        .get('/history')
        .send({
            tag: "Food"
        })
        // .query({ tag: 'Food' });;
        // expect
        console.log(response);
        // expect(response.status).to.equal(200);
        // expect(response.body).to.be.an('array');

        // const foodTagExists = response.body.some(item => item.tag === 'Food');
        // expect(foodTagExists).to.be.true;
        done();
    }).timeout(5000);
    // it('should display default tag (other)', () => {
    //     //ไม่เลือก = tag other

    // });
    });