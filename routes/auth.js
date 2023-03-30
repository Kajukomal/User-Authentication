const router = require('express').Router();
const User = require('../model/user')
const bcrypt = require('bcryptjs');

const JWT = require('jsonwebtoken')

const {
    registerValidation,
    loginValidation
} = require('../validation')



router.get('/', function (req, res) {
    res.send("Users");
})
router.post('/register', async (req, res) => {

    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    //For existing data
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({
            user: savedUser._id
        });

    } catch (err) {

        res.status(400).send({
            status: "Failed",
            msg: err
        });
    }
})

//Login
router.post('/login', async (req, res) => {

    //Validating User
    const {
        error
    } = loginValidation(req.data);
    if (error) return res.status(400).send(error.details[0].message)

    //Checking user email in database
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send("Invalid Email")

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    //Creating token 
    const token = JWT.sign({
        _id: user._id
    }, process.env.Token_SECRET)
    res.header('auth-token', token).send(token);
})

module.exports = router;