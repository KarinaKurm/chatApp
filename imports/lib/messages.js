import { Mongo } from 'meteor/mongo';
export const Messages = new Mongo.Collection('messages');

imports/lib/messages.js

MyCollection = new Mongo.Collection("my-collection");
