const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.createFarmLocation = catchAsync(async(req,res,next)=>{
    const location = await prisma.location.create({
        data:{
            ...req.body
        }
    });
    res.status(201).json({
        location
    });
});
exports.getLocations = catchAsync(async (req,res,next)=>{
    const locations = await prisma.location.findMany({
        include:{
            farmer:true,
            assumption:true
        }
    });
    res.status(200).json({
        locations
    });
});
exports.plantingLocation = catchAsync(async(req,res,next)=>{
    const {plantId , locationId,startDate,farmerId} = req.body;
    const planting = await prisma.assumption.create({
        data:{
            startDate,
            userId:farmerId,
            locationId,
            plantId_farmer:plantId,
        }
    });
    res.status(201).json({
        planting,
    });
});
exports.getLocation = catchAsync(async (req,res,next)=>{
    const locationId = req.params.id;
    const location = await prisma.location.findFirst({
        where:{
            id:locationId
        },
        include:{
            assumption:true,
        }
    });
    res.status(200).json({
        location,
    });
});
exports.getUserLocations = catchAsync(async (req,res,next)=>{
    const farmerId = req.params.id;
    const locations = await prisma.location.findMany({
        where:{
            farmerId,
        },
        include:{
            assumption:true
        }
    });
    res.status(200).json({
        locations,
    });
});
exports.predictLocation = catchAsync(async (req,res,next)=>{
    const {points} = req.body;
    //TODO send to the other backend 
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