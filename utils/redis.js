#!/usr/bin/node

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.connect();
  }

  isAlive() {
    try{
      const result = this.client.isReady;
      if (result) {
        return true;
      }
      return false;
    } catch(err) {
      console.log("error", err);
    }
  }

  async get(key) {
    const val = await this.client.get(key);
    return val;
  }

  async set(key, val, dur) {
    
    try{
      const result = await this.client.set(key, val, 'EX', dur);
      return result;
    } catch(err) {
      console.log('Error setting key', err);
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
