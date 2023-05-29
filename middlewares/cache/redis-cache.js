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

    // redisClient.get(id, (err, resultado) => {
    //   if (err) {
    //     console.error(
    //       "Error al obtener el resultado del informe desde Redis:",
    //       err
    //     );
    //     return next();
    //   }

    //   if (resultado) {
    //     // El resultado está en la caché, envía la respuesta con el resultado
    //     res.send(resultado);
    //   } else {
    //     // El resultado no está en la caché, continúa con el siguiente middleware o controlador
    //     next();
    //   }
    // });
  };
};

// const cacheMiddleware = (req, res, next, data) => {
//     const idInforme = req.params.idInforme; // Suponiendo que el ID del informe se pasa en los parámetros de la ruta

//     // Intenta obtener el resultado del informe desde la caché de Redis
//     redisClient.get(idInforme, (err, resultado) => {
//       if (err) {
//         console.error('Error al obtener el resultado del informe desde Redis:', err);
//         return next();
//       }

//       if (resultado) {
//         // El resultado está en la caché, envía la respuesta con el resultado
//         res.send(resultado);
//       } else {
//         // El resultado no está en la caché, continúa con el siguiente middleware o controlador
//         next();
//       }
//     });
//   };

module.exports = {
  cacheMiddleware,
};
