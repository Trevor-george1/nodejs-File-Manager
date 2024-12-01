import dbClient from "../utils/db.js";
import express from 'express';
import bcrypt from 'bcrypt';


function hash_password(password) {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err,salt) => {
        if (err) {
            console.log("error", err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log("error", err);
            }
    
            return hash;
        })
    
    });
    
}



class UsersController {
    static async postNew (req, res) {
        const email = req.body['email'];
        const password = req.body['password'];

        if (!email) {
            res.json("Missing email").status(400);
            res.end();
            return;
        }
        if (!password) {
            res.json("Missing password").status(400);
            res.end();
            return;
        }
        const user = await dbClient.userExists({email:email});
        if (user) {
            res.json("Already Exists").status(400);
            res.end();
            return;
        }

        const newuser = await dbClient.insertUser({
            email: email,
            password: hash_password(password),
        });
        const id = `${newuser.insertedId}`;
        res.status(201).json({id, email});
        res.end();
    }
}
export default UsersController;