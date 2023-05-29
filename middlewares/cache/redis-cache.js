const redisClient = require("../../cache/index");


const cacheMiddleware =  (id) => {
  return async (req, res, next)  =>  {
    try {
        const result = await redisClient.get(id);
        if(result){
            return res.send(result);
        }
        return next();
    } catch (error) {
        next();
    }  

  };
};


module.exports = {
  cacheMiddleware,
};
