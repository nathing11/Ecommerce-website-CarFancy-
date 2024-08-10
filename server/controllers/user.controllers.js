const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    register: async (req, res) => {
        try {

            const {role, ...userData } = req.body;
            const userRole = role || 'user';

            const userFromDb = await User.findOne({ email: userData.email });

            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } });
            }

            const user = await User.create({ ...userData, role: userRole });

            const userToken = jwt.sign({ id: user._id, role: userRole }, process.env.jwt);

            res.status(201).cookie('userToken', userToken).json({ 'token': userToken });
        } catch (error) {
            res.status(400).json(error.errors);
        }
    },
    login: async (req, res) => {
        const userFromDb = await User.findOne({ email: req.body.email });
    
        if (!userFromDb) {
            return res.status(400).json({ email: { message: "Email doesn't exist." } });
        } else {
            try {
                const compareResult = await bcrypt.compare(req.body.password, userFromDb.password);
    
                if (!compareResult) {
                    return res.status(400).json({ email: { message: "Wrong password." } });
                } else {
                    const userToken = jwt.sign({ id: userFromDb._id, role: userFromDb.role }, process.env.jwt);
                    
                    // Retournez l'objet utilisateur dans la réponse JSON
                    return res.status(200).cookie('userToken', userToken).json({ 'user': userFromDb, 'token': userToken });
                }
            } catch (error) {
                res.status(400).json(error);
            }
        }
    },
    
    logout : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            res.clearCookie('userToken');
            res.status(204).json({message:"User Logged out successfully."})
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUser : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('==========> TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt')
            return res.status(200).cookie('userToken', userToken)
            .json({ token: userToken, loggedUser });

        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUserWithNotes : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt').populate('notes')
            return res.status(200).json(loggedUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    deleteOneUser:(req,res) =>{
        console.log("Inside Delete", req.params.id);
        User.findByIdAndDelete({_id:req.params.id})
        .then(deletedUser=> {

            res.status(200).json({data:deletedUser, message:'User deleted With Success', ok: true})
        }  )
        .catch(error =>{
            console.log(error);
            res.status(500).json({error})
        })},
    
    allUsers : async(req, res) => {
        // User.find().then(allUsers => res.json(allUsers)).catch(err => res.status(404).json(err));
        try {
            const allUsers = await User.find({});
            res.status(200).json({success: true, message: "Users found", data:allUsers});
        } catch (err) {
            res.status(404).json(err);
        }
    }
}


module.exports.updateCart = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};