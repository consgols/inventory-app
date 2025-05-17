import 'server-only';

import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DB_URI) {
  throw new Error('Mongo URI not found!');
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log('>>>>Connected to MongoDB<<<<');
    return client.db(dbName);
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB('inventory_db');

  if (db) return db.collection(collectionName);

  return null;
}
