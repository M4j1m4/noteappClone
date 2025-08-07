import ratelimit from "../config/upstash.js";

export const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit");

        if(!success){
            return res.status(429).json({message:"Too many request, please try again later."})
        }

        next()
    } catch (error) {
        console.log("RateLimit Error", error)
        next(error)
    }
}