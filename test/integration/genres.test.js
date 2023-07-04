// Load the servers object 
let server;
// Loading the http test framework supertest
const request = require('supertest');
const {Genre} = require('../../models/genres');
const {User} = require('../../models/users');



describe('api/genres',()=>{

    // callback function is called once before every test
    beforeEach( () => {  server = require("../../server"); })
    
    // callback function is called once after every test
    afterEach( async () => {
        // await server.close(); 
        await Genre.remove({})
    });

    describe('GET /', () => {
        it('should return all genres', async () => { 
            await Genre.collection.insertMany([
                {name : 'genre1'},
                {name : 'genre2'}
            ])
              const res = await  request(server).get('/api/genres');
            //   Assert that the status is 200
              expect(res.status).toBe(200);
              expect(res.body.length).toBe(2);
              expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();

        });
    });

    describe('post /', () => {

        // describe a happy path an specific varables for each of the path 
        let token;
        let name;

        const exec = async() => {
            return await  request(server).post('/api/genres/add').set( 'x-auth-token', token ).send({name : '1234'});
        }

        beforeEach(()=>{
            token = new User().generateAuthToken();
            name = 'genre1'
        })

        it('should return 401 if client is not logged in ', async () => {
            token = "";

            const res = await exec();

            expect(res.status).toBe(401);
        });

    
        it('should return 400 if genre is  less than less than 5 characters ', async () => {
           
                name = "1234"

                const res = await exec();

                expect(res.status).toBe(400);


            });

    })

    describe('DELETE /:id', () => {
        it( "should delete genre sucessfully" , async () => {

            await Genre.collection.insertMany([
                {name : 'genre1'}
            ])

            const testToken = new User().generateAuthToken();

            // let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzcxZjZmZDJmOGJiNTdiYzdmNjM2ZDciLCJpYXQiOjE2Njg0MTMyMjZ9.ewcKK9YuBPm0wFIL9NbVGikOIhbL1VEjwuu5KVqQwz4";
            let res = await request(server).delete('/api/genres/6363bf293720654a1464aec2').set('x-auth-token',testToken);

            expect(res.status).toBe(404);

             res = await request(server).get('/api/genres').set('x-auth-token',testToken);

            let  id = res.body[0]._id;

            res = await request(server).delete(`/api/genres/${id}`).set('x-auth-token',testToken);

            expect(res.status).toBe(200);
            
            expect(res.body.msg).toMatch('genre was sucessfully deleted');
        })
    })
});