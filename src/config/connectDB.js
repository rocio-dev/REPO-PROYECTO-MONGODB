import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/";
const MONGO_DB_NAME = "Proyecto_MongoDB";

async function connectMongoDB() {
    try {
        await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`);
            console.log("Se conecto la base de datos de MongoDB :D");
    } 
    catch (error) {
        console.error("No se pudo conectar la base de datos:", error.message);

    process.exit(1);
    }
}

export default connectMongoDB;