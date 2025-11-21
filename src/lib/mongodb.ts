import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = (process.env.MONGODB_DB as string) || "seya";

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment");
}

let cached: { client: MongoClient | null } = (global as any)._mongoCached || { client: null };

export async function getMongoClient() {
  if (cached.client) return cached.client;
  const client = new MongoClient(uri);
  await client.connect();
  cached.client = client;
  (global as any)._mongoCached = cached;
  return client;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}