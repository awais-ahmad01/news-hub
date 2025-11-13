// lib/mongoose.js
const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URL) {
        throw new Error("Please define the MONGODB_URL environment variable");
    }

    cached.promise = cached.promise || 
        mongoose.connect(MONGODB_URL, {
            dbName: "NewsHub",
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            maxPoolSize: 10,
            retryWrites: true,
            w: 'majority'
        });

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};