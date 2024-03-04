import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached){
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async() => {
    //if we already have connection then exit out immediately  - optimise application
    if (cached.conn) return cached.conn;

    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL')

    //if we don't already have a connection then make a new connection
    cached.promise = cached.promise || 
    mongoose.connect(MONGODB_URL, {
        dbName: 'transformix', bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn;
}