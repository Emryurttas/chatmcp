import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI ?? (() => { throw new Error("MONGO_URI is not defined"); })();
const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: false,
});

export const mongodb = client.db(process.env.MONGO_DB, { ignoreUndefined: true });