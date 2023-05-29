const redis = require("redis");

class RedisCache {
  constructor(host, port) {
    this.redisClient = redis.createClient({
      host: host,
    });

    this.redisClient.on("error", (err) => {
      console.error("Error en la conexión Redis:", err);
    });
    this.redisClient.connect().then((result) => {
      console.log("redisClient connected");
    }).catch((err) => {
      
      console.log("redisClient error: ", err);
    });;

  }

  async get(key) {
    try {
      const result = await this.redisClient.get(key);

      return result;
    } catch (error) {
      console.log("cache.js get ", error);
    }
  }

  async setex(key, seconds, value) {

    const serializedValue = JSON.stringify(value);
    try {
      await this.redisClient.set(key, serializedValue, { EX: 100 });
    } catch (error) {
      console.error("Error al guardar el valor en Redis:", err);
    }

    return;
   
  }
}

const redisHost = "127.0.0.1";
const redisPort = 6379;

const cache = new RedisCache(redisHost, redisPort);

module.exports = cache;
