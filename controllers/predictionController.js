const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const { default: axios } = require("axios");
const prisma = new PrismaClient();
exports.predictLocation = catchAsync(async (req,res,next)=>{
    const {points} = req.body;
    const list = points.map(point => [point.lng, point.lat]);
    const response  = await axios.post('http://143.110.165.70/api-django/classify-crop/',{
        "coordinates" : list
    });
    
    console.log(response);
    res.status(200).json({
        prediction:response.data
    });
});
exports.autoPredict = async () => {
    try {
        // Fetch assumptions that have not been classified by AI yet
        const assumptions = await prisma.assumption.findMany({
            where: {
                plantId_ai: null
            },
            include: {
                farmerAssumption: {
                    select: {
                        detectMonth: true
                    }
                },
                location: {
                    include: {
                        latlongs: true
                    }
                }
            }
        });

        const currentDate = new Date();

        // Use Promise.all to wait for all predictions to be processed
        await Promise.all(assumptions.map(async (assumption) => {
            const detectionDate = new Date(assumption.startDate);
            detectionDate.setMonth(detectionDate.getMonth() + assumption.farmerAssumption.detectMonth);

            // Only process if the prediction date is in the future
            if (detectionDate >= currentDate) {
                try {
                    const response = await axios.post('http://143.110.165.70/api-django/classify-crop/', {
                        "coordinates": assumption.location.latlongs
                    });
                    
                    const plant = await prisma.plant.findFirst({
                        where:{
                            name : {
                                contains:response.data.most_frequent_class_label,
                            }
                        }
                    });
                    if (!plant) {
                        const land = await prisma.plant.findFirst({
                            where:{
                                name : {
                                    contains:"land",
                                }
                            }
                        });
                        await prisma.assumption.update({
                            where:{
                                id:assumption.id
                            },
                            data:{
                                plantId_ai:land.id
                            }
                        });
                    }else {
                        await prisma.assumption.update({
                            where:{
                                id:assumption.id
                            },
                            data:{
                                plantId_ai:plant.id,
                            }
                        });
                    }
                    console.log(response.data);
                } catch (error) {
                    console.error(`Error processing prediction for assumption ID ${assumption.id}: ${error}`);
                }
            }
        }));

        console.log("All assumptions processed.");
    } catch (error) {
        console.error(`Failed during assumptions retrieval or initial processing: ${error}`);
    }
};
exports.predictAll = catchAsync(async (req,res,next)=>{
    const assumptions = await prisma.assumption.findMany({
        where: {
            plantId_ai: null
        },
        include: {
            farmerAssumption: {
                select: {
                    detectMonth: true
                }
            },
            location: {
                include: {
                    latlongs: true
                }
            }
        }
    });

   

    // Use Promise.all to wait for all predictions to be processed
    await Promise.all(assumptions.map(async (assumption) => {
      

        // Only process if the prediction date is in the future
   
            try {
                const response = await axios.post('http://143.110.165.70/api-django/classify-crop/', {
                    "coordinates": assumption.location.latlongs
                });
                
                const plant = await prisma.plant.findFirst({
                    where:{
                        name : {
                            contains:response.data.most_frequent_class_label,
                        }
                    }
                });
                if (!plant) {
                    const land = await prisma.plant.findFirst({
                        where:{
                            name : {
                                contains:"land",
                            }
                        }
                    });
                    await prisma.assumption.update({
                        where:{
                            id:assumption.id
                        },
                        data:{
                            plantId_ai:land.id
                        }
                    });
                }else {
                    await prisma.assumption.update({
                        where:{
                            id:assumption.id
                        },
                        data:{
                            plantId_ai:plant.id,
                        }
                    });
                }
                console.log(response.data);
            } catch (error) {
                console.error(`Error processing prediction for assumption ID ${assumption.id}: ${error}`);
            }

    }));
});