const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PWD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${USER}:${PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected successfully to mongo");
      return this.client.db(this.dbName);
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find(query).sort({"_id":-1}).toArray();
    } catch (err) {
      console.log(err);
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect();
      return await db.collection(collection).findOne({ _id: ObjectId(id) });
    } catch (err) {
      console.log(err);
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      const result = await db.collection(collection).insertOne(data);
      return result.insertedId;
    } catch (err) {
      console.log(err);
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect();
      const result = await db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      return result.upsertedId || id;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect();
      await db.collection(collection).deleteOne({ _id: ObjectId(id) });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MongoLib;
