
import jwt  from "jsonwebtoken"
import User from "../model/User.js"

const isLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" })
  }
}

export default isLogin;
