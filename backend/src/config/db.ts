import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { env } from "./env"

let mongoServer: MongoMemoryServer | null = null

export async function connectDB() {
  try {
    if (env.mongoUri) {
      await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 2000 })
      console.log("Connected to MongoDB via URI")
      return
    }
  } catch (err) {
    console.log("Local MongoDB not available, initializing MongoMemoryServer...")
  }

  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
  console.log("Connected to MongoMemoryServer at:", uri)
}

