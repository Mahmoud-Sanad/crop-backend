const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.createPlant = catchAsync(async(req,res,next)=>{
    const plant = await prisma.plant.create({
        data:{
            
        }
    });
    res.status(201).json({
        plant
    });
});
exports.getAll = catchAsync(async (req,res,next)=>{
    const plants = await prisma.plant.findMany({

    });
    res.status(200).json({
        plants
    });
});