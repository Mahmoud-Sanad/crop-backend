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
exports.autoPredict = async ()=>{//  TODO return the result and update the ai aussumption with the plant returned and the status 
   try {
        const assumptions = await prisma.assumption.findMany({
            where:{
                plantId_ai:null
            },
            include:{
                farmerAssumption:{
                    select:{
                        predictionDate:true
                    }
                },
                location:{
                    include:{
                        latlongs:true
                    }
                }
            }
        });
        console.log(assumptions);
        const currentDate = Date.now();
        const prediciontDate = e.startDate + e.farmerAssumption.predictionDate;
        assumptions.forEach((e)=>{
            console.log(e);
            if ( prediciontDate>= currentDate ){
                // send the points to get predicted.
            }
        });
      

   } catch (error) {
        console.log(error);
   }
}; 