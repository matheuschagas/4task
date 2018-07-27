import {Article, Card, Comment, Conversation, Message, Notification, Photo, User, Version} from './schemas';

export default [
    {
        schema: [User, Article, Comment, Photo, Version, Notification, Message, Card, Conversation],
        schemaVersion: 1,
    }
];