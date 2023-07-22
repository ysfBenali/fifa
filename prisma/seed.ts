const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const { players } = require('./data.ts');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.players.deleteMany();

        await prisma.$queryRaw`ALTER TABLE Players AUTO_INCREMENT = 1`;

        await prisma.players.createMany({
            data: players,
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();