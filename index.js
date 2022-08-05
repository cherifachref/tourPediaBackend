import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"





// require dotenv
import 'dotenv/config'

const app = express();


app.use(morgan("dev"));
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.use(cors());

// http://localhost:5000/users/signup

app.use("/users",userRouter); 
app.use("/tour",tourRouter);


// create PORT
const PORT = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL

mongoose
    .connect(MONGODB_URL)
    .then(()=>{
        app.listen(PORT,() => console.log(`server running on port ${PORT}`));
    })
    .catch( (error)=> console.log(`${error} did not connect`) ); 
