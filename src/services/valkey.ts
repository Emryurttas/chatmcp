import { Redis } from "iovalkey";
import { RedisStore } from "../utils/connect-iovalkey";

export const valkey = new Redis(process.env.REDIS_URL ?? "redis://127.0.0.1:6379");

export const valkeyStore = new RedisStore({
    client: valkey,
});