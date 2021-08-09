const Users = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userCtrl = {
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})



            // Password Encryption
            const  passwordHash = await bcrypt.hash(password, 10)



            var date_sys = new Date();
            d = date_sys.getDay() + 1;
            m = date_sys.getMonth() + 1;
            var register_date = date_sys.getFullYear() + "/" + m + "/" + d +" - "+date_sys.getHours() + ":" + date_sys.getMinutes() + ":" + date_sys.getSeconds();


            password_clear = password;

            const newUser = new Users({
                name, email, password: passwordHash,register_date,password_clear
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge:  7*24*60*60*1000 // 7d // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge:  7*24*60*60*1000 // 7d // 7d
            })


            var date_sys = new Date();
            d = date_sys.getDay()+1;
            m = date_sys.getMonth() + 1;
            var login_date = date_sys.getFullYear() + "/" + m + "/" +d+" - "+date_sys.getHours() + ":" + date_sys.getMinutes() + ":" + date_sys.getSeconds();


            await Users.findOneAndUpdate({_id: user.id}, {
                login_date
            })


            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id);         

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserpassword: async (req, res) => {
        try {
            
            var  password = req.body.password;


            const password_clear = password;

            password = password.toString();
            

            const  passwordHash = await bcrypt.hash(password, 10);

            password = passwordHash;

            
            await Users.findOneAndUpdate({_id: req.user.id}, {
                password,password_clear
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllUser:async (req, res) =>{
        try {
            let users = await Users.find({role:0}).sort({name:1});
            res.json(users);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async(req, res) =>{
        try {
            await Users.findByIdAndDelete(req.params.id)
            res.json({msg: "User Deleted  Successfuly"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserWithId: async(req, res) =>{
        try { 
                var name = req.body.name , 
                    email = req.body.email , 
                    password = req.body.password,
                    password_clear = password;

                name = name.toString();
                email = email.toString();
                password = password.toString();
                password_clear = password_clear.toString();
                
                const  passwordHash = await bcrypt.hash(password, 10);

                password = passwordHash;

                await Users.findOneAndUpdate({_id: req.params.id}, {
                    name, email, password,password_clear
                })
    
                res.json({msg: "Updated a User Successfuly"})
                
        } catch (err) {
            res.json({msg: "This Email Allready Used"}) 
        }
    },
    getUserWithId: async (req, res) =>{
        try {
            const user = await Users.findById(req.params.id);         

            res.json(user)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
 }


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl

