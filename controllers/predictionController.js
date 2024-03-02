const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.predictLocation = catchAsync(async (req,res,next)=>{
    const {points} = req.body;
    //TODO send to the other backend 
    console.log(points);
    res.status(501).json({
        message :"comming soon!",
    });
});
exports.autoPredict = async ()=>{
   try {
        const locations = await prisma.location.findMany({
            where:{
                assumption:{
                    every:{
                        plantId_ai:null
                    }
                }
            },
            include:{
                latlongs:true
            }
        });
        console.log(locations);
        /*  TODO
            logic => loop on each location and send the points to get predicted.
            return the result and update the ai aussumption with the plant returned and the status 
        */
   } catch (error) {
    console.log(error);
   }
}; 