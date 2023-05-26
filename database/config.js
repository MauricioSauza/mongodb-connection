const mongoose = require('mongoose');

const dbConnection = async(db_cnn) => {
    try {

        await mongoose.connect(db_cnn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log("connected");

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = {
    dbConnection
}