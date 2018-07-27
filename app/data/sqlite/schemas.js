
export class User { }
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: {type: 'int'},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    phone: {type: 'string'},
    country: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'}
  }
};

export class Article { }
Article.schema = {
  name: 'Article',
  primaryKey: 'id',
  properties: {
    id: 'int',
    header: {type: 'string', optional: true},
    text: {type: 'string', optional: true},
    photo: {type: 'int', optional: true},
    time: 'int',
    type: 'string',
    user: {type: 'User', optional: true},
    comments: {type: 'list', objectType: 'Comment'}
  }
};

export class Comment { }
Comment.schema = {
  name: 'Comment',
  primaryKey: 'id',
  properties: {
    id: 'int',
    text: 'string',
    time: 'int',
    user: 'User',
  }
};

export class Notification { }
Notification.schema = {
  name: 'Notification',
  primaryKey: 'id',
  properties: {
    id: 'int',
    description: 'string',
    time: 'int',
    attach: {type: 'int', optional: true},
    user: 'User',
    type: 'string'
  }
};

export class Conversation { }
Conversation.schema = {
  name: 'Conversation',
  properties: {
    withUser: 'User',
    messages: {type: 'list', objectType: 'Message'}
  }
};

export class Message { }
Message.schema = {
  name: 'Message',
  properties: {
    id: 'int',
    text: 'string',
    time: 'int',
    type: 'string'
  }
};

export class Photo { }
Photo.schema = {
  name: 'Photo',
  properties: {
    id: 'int'
  }
};

export class Card { }
Card.schema = {
  name: 'Card',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    bank: 'string',
    amount: 'int',
    date: 'string',
    cardNo: 'string',
    type: 'string',
    currency: 'string'
  }
};

export class Version { }
Version.schema = {
  name: 'Version',
  properties: {
    id: 'int'
  }
};
