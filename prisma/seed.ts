import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, SubScription, Type } from '@prisma/client';
const prisma = new PrismaClient();

const randomType = () => {
  const types = Object.values(Type);

  return types[Math.floor(Math.random() * types.length)];
};

const randomSubscription = () => {
  const subs = ['FREE', 'FREE', 'FREE', 'HOBBY', 'GEARDO', 'PREMIUM'] as const;

  return subs[Math.floor(Math.random() * subs.length)] satisfies SubScription;
};

(async () => {
  await prisma.listing.deleteMany().then(() => prisma.user.deleteMany());

  const users = new Array(50).fill(null).map(
    () =>
      ({
        clerkId: faker.string.uuid(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        username: `[Fake] ${faker.internet.userName()}`,
        sub: randomSubscription(),
      } satisfies Prisma.UserCreateManyInput),
  );

  const createdUsers = await Promise.all(users.map((user) => prisma.user.create({ data: user })));

  const listings = new Array(150).fill(null).map(
    () =>
      ({
        title: `[Fake] ${faker.commerce.productName()}`,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        images: [
          faker.image.urlLoremFlickr({
            width: faker.number.int({ min: 400, max: 1200 }),
            height: faker.number.int({ min: 400, max: 1200 }),
            category: ['guns', 'weapon', 'rifle', 'pistol'][Math.floor(Math.random() * 4)],
          }),
          faker.image.urlLoremFlickr({
            width: faker.number.int({ min: 400, max: 1200 }),
            height: faker.number.int({ min: 400, max: 1200 }),
            category: 'guns',
          }),
          faker.image.urlLoremFlickr({
            width: faker.number.int({ min: 400, max: 1200 }),
            height: faker.number.int({ min: 400, max: 1200 }),
            category: 'guns',
          }),
        ],
        seenCount: Math.floor(Math.random() * 100),
        sold: faker.datatype.boolean(0.15),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
        type: randomType(),
      } satisfies Prisma.ListingCreateManyInput),
  );

  await prisma.listing.createMany({
    data: listings,
  });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
