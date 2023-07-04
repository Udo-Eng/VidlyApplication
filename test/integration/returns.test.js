const request = require('supertest');
let server;
let customerId, movieId,token;
const mongoose = require('mongoose');
const {Rental} = require('../../models/rentals')
const {User} = require('../../models/users')
let rental;

jest.setTimeout(20000);

describe('/api/returns',() => {

// A function to refactor the request code
    const exec = async () => {
        return await request(server).post('/api/returns').set('x-auth-token',token).send({customerId,movieId});
    }


    // callback function is called once before every test
    beforeEach( async () => { 
         token = new User().generateAuthToken();
         server = require("../../server");
         customerId = mongoose.Types.ObjectId();
         movieId = mongoose.Types.ObjectId();

        rental = new Rental({
            customer : {
                name : 'Abazie Udochukwu',
                phone: '+2348069494461',
                _id : customerId
            },
            movie : {
                _id : movieId,
                title : 'Cinderella  & beauty and the beast',
                dailyRentalRate : 2

            }
        });

        await rental.save()
        
    })
    
    // callback function is called once after every test
    afterEach( async () => {
        // await server.close(); 
        await Rental.remove({});
    });

    it('should work!',async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });

    it('should return 401 if client is not logged in',async ( ) => {
       token = '';
       const res =  await request(server).post('/api/returns').send({customerId,movieId});
       expect(res.status).toBe(401);
    }); 

    it('should return 400 if customerId is not provided',async ( ) => {
        customerId = '';
        
        const res =  await exec();

        expect(res.status).toBe(400);
     }); 

     it('should return 400 if movieId is not provided',async ( ) => {
        movieId = '';

        const res =  await exec();

        expect(res.status).toBe(400);
     }); 

     // Return 404 if no rental found for this customer and movie.
     it('should return 404 if no rental is found for a given customerId and MovieId',async ( ) => {
        
         await Rental.remove({})
         
         const res =  await exec();

         expect(res.status).toBe(404);
     }); 
    //  Return 400 if rental already processed
    it('should return 400 if  rental is already processed ',async ( ) => {
        
        await exec();

        const res =  await exec();

        expect(res.status).toBe(400);

    }); 
}); 