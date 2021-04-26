import express from 'express';
import User from '../models/userModel';


const router = express.Router();

router.get("/createadmin", async (req, res) => {
    
    try{
        const user = new User({
            name: 'Elena',
            email: 'elenamhinoveanu@gmail.com',
            password: '1234',
            isAdmin: true
        });

        const newUser = await user.save();

        res.send(newUser);
    }
    catch(error){
        res.send({msg: error.message});
    }
});

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email, 
        password: req.body.password
    });

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(user)
        });
    }
    else{
        res.status(401).send({msg: 'Imvalid user or password.'})
    }
});

export default router;