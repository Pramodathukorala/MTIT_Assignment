const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    // ============================================================
    // DNS WORKAROUND: Force Google & Cloudflare public DNS servers
    // Fixes "querySrv ECONNREFUSED" on Windows / restricted networks
    // ============================================================
    dns.setServers(["1.1.1.1", "8.8.8.8", "8.8.4.4"]);
    console.log("✅ DNS servers set to: Cloudflare (1.1.1.1) + Google (8.8.8.8)");

    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    console.log("🔗 Connecting to MongoDB Atlas...");

    // Mongoose 8.x — no deprecated options needed
    await mongoose.connect(uri);

    console.log("✅ MongoDB connected successfully");
    console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🖥️  Host: ${mongoose.connection.host}`);

    // Graceful disconnect on app termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed (app termination)");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // Helpful diagnostics for common errors
    if (error.message.includes("querySrv") || error.message.includes("ECONNREFUSED")) {
      console.error("💡 Tip: This is a DNS/SRV lookup issue. Possible causes:");
      console.error("   1. Your network/ISP is blocking SRV DNS queries");
      console.error("   2. You are behind a firewall or VPN");
      console.error("   3. Try switching to a standard connection string (non-SRV):");
      console.error('      MONGO_URI=mongodb://user:pass@host:port/db');
    }
    if (error.message.includes("Authentication") || error.message.includes("auth")) {
      console.error("💡 Tip: Check your username and password in the MONGO_URI");
    }
    if (error.message.includes("ETIMEOUT") || error.message.includes("timed out")) {
      console.error("💡 Tip: Your IP may not be whitelisted in MongoDB Atlas.");
      console.error("   Go to Atlas → Network Access → Add 0.0.0.0/0 for testing");
    }

    process.exit(1);
  }
};

module.exports = connectDB;
