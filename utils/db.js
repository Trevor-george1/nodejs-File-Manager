import pkg from 'mongodb';

const { MongoClient } = pkg;

class DBClient {
  constructor() {
    this.host = 'localhost';
    this.port = '27017';
    this.database = 'files_manager';

    this.uri = `mongodb://${this.host}:${this.port}/${this.db}`;
    this.client = new MongoClient(this.uri);
    this.client.connect();
  }

  isAlive() {
    try {
      this.client.db().admin().command({ ping: 1 });
      return true;
    } catch (err) {
      console.log('Failed to connect to Mongodb: ', err);
      return false;
    }
  }

  async nbUsers() {
    const db = await this.client.db(this.database);
    return db.collection('users').countDocuments({});
  }

  async nbFiles() {
    const db = await this.client.db(this.database);
    return db.collection('files').countDocuments({});
  }

  async userExists(email) {
    const user = await this.client.db(this.database);
    return user.collection('users').findOne(email);
  }

  async insertUser(email, password) {
    const user = await this.client.db(this.database);
    return user.collection('users').insertOne(email, password);
  }
}

const dbClient = new DBClient();

export default dbClient;
