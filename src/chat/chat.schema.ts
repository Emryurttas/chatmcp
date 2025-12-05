import { SchemaManager } from "../utils/schema-manager";

const chatSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userId", "title", "creationDate", "lastModificationDate", "messages"],
        properties: {
            _id: {
                bsonType: "objectId",
                description: "Unique identifier of the chat document"
            },

            userId: {
                bsonType: "objectId",
                description: "'userId' is required and must be an ObjectId"
            },

            title: {
                bsonType: "string",
                description: "'title' is required and must be a string"
            },

            creationDate: {
                bsonType: "date",
                description: "'creationDate' is required and must be a date"
            },

            lastModificationDate: {
                bsonType: "date",
                description: "'lastModificationDate' is required and must be a date"
            },

            messages: {
                bsonType: "array",
                description: "'messages' must be an array of message objects",
                items: {
                    bsonType: "object",
                    required: ["role", "content"],
                    properties: {
                        role: {
                            enum: ["user", "assistant"],
                            description: "'role' must be one of: user or assistant"
                        },
                        content: {
                            description: "'content' is required (type intentionally not specified)"
                        }
                    }
                }
            }
        }
    }
};

new SchemaManager("chats", chatSchema)
    .executeCommand(process.argv)
    .then(() => process.exit(0));
