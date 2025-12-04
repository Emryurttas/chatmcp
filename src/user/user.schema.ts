import { SchemaManager } from "../utils/schema-manager";

const userSchema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['login'],
        properties: {
            _id: {
                bsonType: 'objectId'
            },
            login: {
                bsonType: 'string',
                description: "'login' is required and is a string"
            },
        }
    }
};

new SchemaManager('users', userSchema).executeCommand(process.argv).then(() => process.exit(0));
