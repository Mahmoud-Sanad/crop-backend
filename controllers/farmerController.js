const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.createFarmer = catchAsync(async(req,res,next)=>{
    const farmer = await prisma.user.create({
        data:{
            ...req.body
        }
    });
    res.status(201).json({
        farmer
    });
});
exports.getFarmers = catchAsync(async (req,res,next)=>{
    const farmers = await prisma.user.findMany({

    });
    res.status(200).json({
        farmers
    });
});
exports.getFarmer = catchAsync(async(req,res,next)=>{
    const farmerId = req.params.id;
    const farmer = await prisma.user.findUnique({
        where:{
            id:farmerId,
        }
    });
    res.status(200).json({
        farmer
    })
});
