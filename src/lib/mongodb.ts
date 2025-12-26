import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = (process.env.MONGODB_DB as string) || "seya";

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment");
}

interface MongoCached {
  client: MongoClient | null;
}

const cached: MongoCached = (global as unknown as { _mongoCached: MongoCached })._mongoCached || { client: null };

export async function getMongoClient() {
  if (cached.client) return cached.client;
  console.log("MongoDB: Connecting to", uri.replace(/:([^:@]{8})[^:@]*@/, ":***@")); // Mask password
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }); // 5s timeout
  try {
    await client.connect();
    console.log("MongoDB: Connected successfully");
    cached.client = client;
    (global as unknown as { _mongoCached: MongoCached })._mongoCached = cached;
    return client;
  } catch (error) {
    console.error("MongoDB: Connection failed", error);
    throw error;
  }
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}