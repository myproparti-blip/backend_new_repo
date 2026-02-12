import mongoose from "mongoose";

let connectionPromise = null;
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  // Already connected → return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // Connection already in progress → reuse promise
  if (connectionPromise) {
    return connectionPromise;
  }

  // Hide password in logs (log ONLY once)
  const hiddenUri = uri.replace(/([^:]*):([^@]*)@/, "$1:****@");
  ("🔗 Connecting to MongoDB:", hiddenUri);

  // Disable buffering (fail fast)
  mongoose.set("bufferCommands", false);

  connectionPromise = (async () => {
    try {
      const conn = await mongoose.connect(uri, {
         // ===== MONGODB FREE TIER (M0) SAFE =====
         maxPoolSize: 3,           // Free tier: 3 connections max (official limit)
         minPoolSize: 0,           // No minimum connections to save resources
         maxIdleTimeMS: 30000,     // Close idle connections after 30s
      
         // ===== TIMEOUTS (OPTIMIZED FOR FREE TIER) =====
         serverSelectionTimeoutMS: 10000,
         socketTimeoutMS: 60000,   // Increased for slow networks
         connectTimeoutMS: 20000,  // Increased for slow networks
         waitQueueTimeoutMS: 30000, // Increased wait queue timeout
      
         // ===== RELIABILITY & RETRY =====
         retryWrites: true,
         retryReads: true,
         w: "majority",
         family: 4,
      
         // ===== LOW RESOURCE MODE =====
         heartbeatFrequencyMS: 60000,  // Reduce server pings
       });

      ("✅ MongoDB Connected (Free Tier Stable)");
      retryCount = 0; // Reset on success
      return conn;
    } catch (err) {
      connectionPromise = null;

      // Retry logic for transient errors
      if (
        retryCount < MAX_RETRIES &&
        (err.name === "MongoNetworkTimeoutError" ||
          err.name === "MongoServerError" ||
          err.message.includes("timed out"))
      ) {
        retryCount++;
        console.warn(
          `⚠️  Connection failed, retrying (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY}ms...`
        );
        await sleep(RETRY_DELAY);
        return connectDB(); // Recursive retry
      }

      console.error("❌ MongoDB Connection Failed:", err.message);
      throw err;
    }
  })();

  return connectionPromise;
};

export default connectDB;
