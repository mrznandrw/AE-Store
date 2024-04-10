// 111 const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken";

export default function (req, res,  next) {
// 111 module.exports = function (req, res,  next) {
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]  //Bearer fghcvfgasklf
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}