import {Pool} from 'pg';
import { Prisma, PrismaClient } from "@prisma/client";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
export const prisma = new PrismaClient();