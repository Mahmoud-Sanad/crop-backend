const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.getAssumptionById = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const assumption = await prisma.assumption.findUnique({
        where:{
            id,
        },
        include:{
            farmer:true,
            location:{
                include:{
                    latlongs:true,
                }
            },
            ai_Assumption:true,
            farmerAssumption:true,
            
        }
    });
    if (!assumption){
        return next(new AppError("No assumption found with this id!",404));
    }
    res.status(200).json({
        assumption
    });
});
exports.getAssumptions = catchAsync(async (req,res,next)=>{
    const assumptions = await prisma.assumption.findMany({
        include:{
            farmer:true,
            ai_Assumption:true,
            farmerAssumption:true
        }
    });
    res.status(200).json({
        assumptions,
    });
});
exports.plantingLocation = catchAsync(async(req,res,next)=>{
    const {plantId ,startDate,farmerId} = req.body;
    const startDateFromString = new Date(startDate);
    const planting = await prisma.assumption.create({
        data:{
            startDate:startDateFromString,
            userId:+farmerId,
            locationId:req.locationId,
            plantId_farmer:+plantId,
        }
    });
    res.status(201).json({
        planting,
    });
});