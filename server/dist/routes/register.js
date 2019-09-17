"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
router.post('/', (req, res) => {
    const newUser = new user_model_1.default({
        name: req.body.name,
        token: '',
        password: bcrypt.hashSync(req.body.password, 10)
    });
    newUser.save(err => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                title: 'error',
                code: 400,
                error: err.message
            });
        }
        return res.status(200).json({
            title: 'Success'
        });
    });
});
module.exports = router;
//# sourceMappingURL=register.js.map