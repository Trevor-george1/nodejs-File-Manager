import dbClient from "../utils/db.js";
import redisClient from "../utils/redis.js";

class AppController {
    static getStatus(req, res){
        if (redisClient.isAlive() && dbClient.isAlive()) {
            res.json({ redis: redisClient.isAlive() ,db: dbClient.isAlive()}), 200;
            res.end();
        }
    }

    static async getStats(req, res) {
        const users = await dbClient.nbUsers();
        const files = await dbClient.nbFiles();
        res.json({"users": users, "files": files}), 200;
        res.end();
    }
}

export default AppController;
