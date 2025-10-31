// lib/prisma.js
import { PrismaClient } from '@prisma/client';
import 'server-only'; // ⛔ prevents client imports

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
