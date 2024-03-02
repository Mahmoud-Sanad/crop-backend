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

exports.getLocationById = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const location = await prisma.location.findUnique({
        where:{
            id,
        },
        include:{
            farmer:true,
            assumption:true
        }
    });
    if (!location){
        return next(new AppError("No location found with this id!",404));
    }
    res.status(200).json({
        location
    });
});
