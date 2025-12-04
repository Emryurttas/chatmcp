import { SchemaManager } from "../utils/schema-manager";

const userSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userName", "email", "hashedPassword"],
        properties: {
            _id: {
                bsonType: "objectId"
            },

            userName: {
                bsonType: "string",
                description: "'userName' is required and must be a string"
            },

            email: {
                bsonType: "string",
                pattern: "^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$",
                description: "'email' must be a valid email address"
            },

            hashedPassword: {
                bsonType: "string",
                minLength: 6,
                description: "'hashedPassword' is required and must be >= 6 chars"
            }
        }
    }
};

new SchemaManager("users", userSchema)
    .executeCommand(process.argv)
    .then(() => process.exit(0));
