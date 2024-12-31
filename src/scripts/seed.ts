import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import PocketBase from 'pocketbase';

import { ListingsTypeOptions, TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';

dotenv.config();

const seed = async () => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  await pb.collection('_superusers').authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

  const emails = faker.helpers.uniqueArray(() => faker.internet.email({ provider: 'yopmail.com' }), 30);
  const names = faker.helpers.uniqueArray(() => faker.internet.userName(), 30);

  const u = new Array(30).fill(0).map(() => {
    const pw = faker.internet.password();
    return {
      name: names.shift(),
      email: emails.shift(),
      password: pw,
      passwordConfirm: pw,
    };
  });

  const batch = pb.createBatch();

  u.forEach((user) => {
    batch.collection('users').create(user);
  });

  await batch.send();

  const users = await pb.collection('users').getFullList();

  const listings = users.flatMap((user) => {
    const titles = faker.helpers.uniqueArray(() => faker.commerce.productName(), 30);

    return new Array(30).fill(0).map(() => ({
      title: titles.shift(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      type: faker.helpers.arrayElement(Object.values(ListingsTypeOptions)),
      user: user.id,
      created: faker.date.past().toISOString(),
      updated: faker.date.recent().toISOString(),
      images: [
        faker.image.urlLoremFlickr({ category: 'ar15', width: 500, height: 500 }),
        faker.image.urlLoremFlickr({ category: 'ar15', width: 500, height: 500 }),
        faker.image.urlLoremFlickr({ category: 'ar15', width: 500, height: 500 }),
        faker.image.urlLoremFlickr({ category: 'ar15', width: 500, height: 500 }),
      ],
    }));
  });

  // Split listings into chunks of 100 for batch processing
  for (let i = 0; i < listings.length; i += 50) {
    const chunk = listings.slice(i, i + 50);
    const listingsBatch = pb.createBatch();

    chunk.forEach((listing) => {
      listingsBatch.collection('listings').create(listing);
    });

    await listingsBatch.send();
  }
};

seed();
