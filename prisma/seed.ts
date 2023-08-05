import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, SubScription, Type } from '@prisma/client';
const prisma = new PrismaClient();

const randomType = () => {
  const types = Object.values(Type);

  return types[Math.floor(Math.random() * types.length)];
};

const randomSubscription = () => {
  const subs = [
    ...new Array(4).fill('FREE'),
    ...new Array(1).fill('HOBBY'),
    ...new Array(2).fill('GEARDO'),
    ...new Array(3).fill('PREMIUM'),
  ] as const;

  return subs[Math.floor(Math.random() * subs.length)] satisfies SubScription;
};

(async () => {
  await prisma.history
    .deleteMany()
    .then(() => prisma.listing.deleteMany())
    .then(() => prisma.user.deleteMany());

  const users = new Array(15).fill(null).map(
    () =>
      ({
        clerkId: faker.string.uuid(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        username: `[Fake] ${faker.internet.userName()}`,
        sub: randomSubscription(),
      } satisfies Prisma.UserCreateInput),
  );

  const me = {
    stripeId: 'cus_OGRTItDjHaQPG5',
    clerkId: 'user_2OWhm8hEbTW3qzVcDBTrABfMk5K',
    email: 'basile64.v@gmail.com',
    firstName: 'Basile',
    lastName: 'VERNOUILLET',
    avatar: 'https://images.clerk.dev/oauth_google/img_2OWhm9YqNxQngySI1PG5OjByJ9L.jpeg',
    username: 'bazeso',
  } satisfies Prisma.UserCreateInput;

  const createdUsers = await Promise.all([...users, me].map((user) => prisma.user.create({ data: user })));

  const listings = new Array(180).fill(null).map(
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
        seenCount: Math.floor(Math.random() * 10000),
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

  const createdListings = await prisma.listing.findMany();

  // for each listing, create randomly between 10 and 60 history entries
  const histories = createdListings.map((listing) => {
    const count = Math.floor(Math.random() * 50) + 10;

    // randomly generate a number between 0 and 10000
    let seenCount = listing.seenCount;
    let today = new Date();

    return new Array(count).fill(null).map(
      () =>
        ({
          listingId: listing.id,
          // randomly decrement until we reach 0, based on the counnt
          seenCount: (seenCount -= Math.floor(Math.random() * Math.floor(seenCount / count))),
          createdAt: (today = new Date(today.setDate(today.getDate() - 1))), // decrement today by 1 day each time
        } satisfies Prisma.HistoryCreateManyInput),
    );
  });

  await prisma.history.createMany({
    data: histories.flat(),
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
