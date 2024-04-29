const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const { default: axios } = require("axios");
const prisma = new PrismaClient();
exports.predictLocation = catchAsync(async (req,res,next)=>{
    const {points} = req.body;
    const list = points.map(point => [point.lng, point.lat]);
    const response  = await axios.post('http://localhost:8000/api/classify-crop/',{
        "coordinates" : list
    });
    
    console.log(response);
    res.status(200).json({
        prediction:response.data
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
        assumptions.forEach(async (e)=>{
            console.log(e);
            if ( prediciontDate>= currentDate ){
                const response  = await axios.post('http://localhost:8000/api/classify-crop/',{
                    "coordinates" : e.location.latlongs
                });
                console.log(response.data);
            }
        });
      

   } catch (error) {
        console.log(error);
   }
}; 