import { Redis } from "iovalkey";
import { RedisStore } from "../utils/connect-iovalkey";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
console.log("REDIS_URL used:", redisUrl);

export const valkey = new Redis(redisUrl);

export const valkeyStore = new RedisStore({
    client: valkey,
});
