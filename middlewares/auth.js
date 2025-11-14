import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authentication = async(req, res, next) => {
    const token = req.headers['token'];
    console.log(token);
    if (!token) {
        return res.status(500).json({
            success: false,
            message: 'User is not authenticated.'
        });
    }
    try{
        const checkToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = checkToken.User;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error occured while authentication'
        })
    }
}

const autherization = (Role) => {
    return async (req, res, next) => {
        const role = +req.user.role;
        if (!role || role > Role) {
            console.log(req.user)
            console.log(role);
            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }
    next();
    }
   
}
export {
    authentication,
    autherization
}
