import express from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

// /status and /stats routes
router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);


// post new iuser
router.post("/users", UsersController.postNew);
export default router;