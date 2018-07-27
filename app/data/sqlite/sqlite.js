

import Version from "../../utils/version";
const React = require('react-native');
const SQLite = require('react-native-sqlite-storage');

const database = Version.dev?'feroDev.db':'fero.db';
console.log("DB name: ", database);

const sqlite = SQLite.openDatabase(database);


export default sqlite;