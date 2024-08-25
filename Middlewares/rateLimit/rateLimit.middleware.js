import redis from "../../config/redis.js";

const RateLimit = async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const limit = 3;

    await redis.incr(ip);
    await redis.expire(ip, 5);
    const value = await redis.get(ip);

    if (+value >= limit) {
        return res.status(429).json({ message: "Too many request" });
    }

    next();
};

export default RateLimit;