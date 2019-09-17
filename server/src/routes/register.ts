import { IUser } from '../../../types';
import User from '../models/user.model'
import * as bcrypt from 'bcrypt';
import * as express from 'express';

const router = express.Router()

router.post('/', (req,res) => {

    const newUser = new User({
        name: req.body.name,
        token: '',
        password: bcrypt.hashSync(req.body.password, 10)
    });
  
    newUser.save(err => {
        if(err) {
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
})
})

module.exports = router;

