// 111 const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken";
import {Role} from "../models/models.js";

// 111 module.exports = function(role) {
    export default function(role) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]  //Bearer fghcvfgasklf
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const userRole = await Role.findOne({where: {id: decoded.roleId}});
            // if(decoded.roleId !== role){
            if (userRole.title !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}





