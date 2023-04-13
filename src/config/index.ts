import { config } from "dotenv"

config();

export default {
    DB_URL: process.env.DB_URL as string,
    SECRET_KEY: process.env.SECRET_KEY as string,
    PORT: process.env.PORT as string
}