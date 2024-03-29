import { PrismaClient, Prisma } from '@prisma/client';
import { getRandom } from './helper';

const prisma = new PrismaClient();

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100),
).map((_, index) => ({
  name: `Dark Jean ${index + 1}`,
  contents: `This is a Dark Jean ${index + 1}`,
  category_id: 1,
  image_url: 'https://picsum.photos/600/600',
  price: getRandom(100000, 20000),
}));

async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    await prisma.products.create({
      data: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
