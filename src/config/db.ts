import { ConnectOptions, connect } from "mongoose";
import config from ".";

export const connectToDb = async () => {
     try {
        await connect(config.DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as ConnectOptions)
        console.log("database connection established");
     } catch (error) {
        console.log("error occured while connecting to DB", error);
        process.exit(1);
     }
}