const express = require("express");
const app = express();
const cors = require("cors");
const errorController = require("./controllers/errorController");
const authRouter = require('./routers/authRouter');
const farmerRouter = require('./routers/farmerRouter');
const plantRouter = require('./routers/plantRouter');
const farmLocationRouter = require('./routers/farmLocationRouter');
const farmLocationController = require("./controllers/farmLocationController");
const cron = require('node-cron');
cron.schedule("0 0 * * *",async()=>{
    await farmLocationController.autoPredict();
});

app.use(express.json());

app.use(cors());

app.use('/api/auth' ,authRouter );
app.use('/api/farmer' ,farmerRouter );
app.use('/api/location' ,farmLocationRouter );
app.use('/api/plant' ,plantRouter );
app.all("*",(req,res,next)=>{
    res.status(404).json({
        message: "wrong URL",
    });
});
app.use(errorController);
module.exports=app;