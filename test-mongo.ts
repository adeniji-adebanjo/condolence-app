import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

(async () => {
  const uri = process.env.MONGODB_URI!;
  console.log("🔍 Testing connection to:", uri);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("condolence_app_gallery");
  const collections = await db.listCollections().toArray();
  console.log(
    "✅ Connected. Collections:",
    collections.map((c) => c.name)
  );
  await client.close();
})().catch((err) => {
  console.error("❌ Connection error:", err);
});
