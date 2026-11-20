import dotenv from 'dotenv'
dotenv.config()

const EVIRONMENT= {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export default EVIRONMENT