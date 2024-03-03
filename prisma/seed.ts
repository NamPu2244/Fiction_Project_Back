import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
    const passwordAdmin = await bcrypt.hash('admin123', roundsOfHashing);
    const user1 = await prisma.user.upsert({
        where: { id: 1 },
        update: {
            password: passwordAdmin
        },
        create: {
            name: 'Admin',
            username: 'admin',
            password: passwordAdmin,
            email: 'admin@gmail.com',
            role: 'ADMIN',
        },
    });
    console.log({ user1 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
