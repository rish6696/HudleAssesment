import dotenv from 'dotenv'
dotenv.config();


export const dbUrl =process.env.DB_URL as string;
export const env   =process.env.ENVIRONMENT as string
export const postgresUsername =process.env.POSTGRES_USERNAME as string
export const postgresPassword=process.env.POSTGRES_PASSWORD as string
export const postgresDb =process.env.POSTGRES_DB as string
export const PORT=process.env.PORT as string
export const postgresHost=process.env.POSTGRES_HOST as string
export const saltRound = process.env.SALT_ROUND as string
export const jwtSecretKey=process.env.JWT_SECRET_KEY as string
