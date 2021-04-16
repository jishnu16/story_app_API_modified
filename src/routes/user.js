const config = require("../../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const emailValidator = require('../../validators/emailValidator');

exports.register = async (req, res) => {
    if(!emailValidator.isValid(req.body.email)){
        res.status(400).send('Invalid Email Format. Please Give valid mail id')
        return;
    }
    const user = await UserService.getUser(req.body.email);
    if(user){
        res.status(400).send("E-mail Already Registered.")
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const insertedUser = await UserService.insertUser(req.body, hashedPassword);
        const user = {
            id: insertedUser.id,
            first_name:insertedUser.first_name,
            last_name: insertedUser.last_name,
            email: insertedUser.email,
            user_type_id:insertedUser.user_type_id
        }
        res.status(200).json(user);
    }
}

exports.login = async (req, res) => {
    const user = await UserService.getUser(req.body.email);
    if(user){
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(401).send("Password is wrong.");
        let payload = { email: req.body.email, password: req.body.password, user_type_id: user.user_type_id, id: user.id};
        const token = jwt.sign(payload, config.TOKEN_SECRET);

        res.status(200).header("auth-token", token).send({ "token": token });
    }
    else {
        res.status(400).send('Invalid Email.')
    }
}
