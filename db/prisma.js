/**
 * Access the Prisma DB. This code should not be repeated
 * in other files to prevent multiple connections to the 
 * Prisma backend. 
 * 
 * Files that use this should import it like this: 
 * 
 * import prisma from '../../db/prisma'
 * 
*/
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;