import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const database = async(req,res) => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log(`MongoDB is Connected with Host: ${con.connection.host}`);
    }
    catch(error){
        console.log(error);
    }


}

database()

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
// app.post("/login", (req, res)=> {
//     const { email, password} = req.body
//     User.findOne({ email: email}, (err, user) => {
//         if(user){
//             if(password === user.password ) {
//                 res.send({message: "Login Successfull", user: user})
//             } else {
//                 res.send({ message: "Password didn't match"})
//             }
//         } else {
//             res.send({message: "User not registered"})
//         }
//     })
// }) 


app.post("/login", async(req, res)=> {
    const { email, password} = req.body
    try{

        const user = await User.findOne({ email:email });

        if(user){
            if(password === user.password ) {
                return res.status(200).json({message: "Login Successfull", user: user})
            } else {
                return res.status(400).json({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



// app.post("/register", (req, res)=> {
//     const { name, email, password} = req.body
//     User.findOne({email: email}, (err, user) => {
//         if(user){
//             res.send({message: "User already registerd"})
//         } else {
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             user.save(err => {
//                 if(err) {
//                     res.send(err)
//                 } else {
//                     res.send( { message: "Successfully Registered, Please login now." })
//                 }
//             })
//         }
//     })
    
// }) 




app.post("/register", async(req, res)=> {
    const { name, email, password} = req.body
    
    try{
        const existuser = await User.findOne({ email: email });
        if(existuser){
            return res.status(200).json({message: "User already registerd"})
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
});



app.listen(9002,() => {
    console.log("BE started at port 9002")
})