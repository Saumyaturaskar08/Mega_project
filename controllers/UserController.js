import User from "../model/User.js"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
export const Register = async (req, res) => {
    const {
        full_name,
        email,
        password
    } = req.body
 const salt = await bcrypt.genSalt(10)
 const hashedpassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        full_name,
        email,
        password: hashedpassword

    })
return res.status(201).json({
        msg:"Data inserted successfully",
        data:user,
    
    })
}

    export const Login = asyncHandler(
     async (req, res) => {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
              throw new Error(" Invalid email or password ")
            }
             const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Invalid email or password' })
            }
            console.log(process.env.JWT_SECRET)
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
                expiresIn: "30d"
            })
            return res.status(200).json({
                msg: "Login successful",
                data: user,
                token:token
            })
        }
)
