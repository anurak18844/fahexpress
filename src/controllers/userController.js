const User = require('../models/userModel')

exports.register = async (req,res) => {
    try {
        let user = new User({
            id: req.body.id,
            name: req.body.name,
            department: {
                _id: req.body.department._id,
                id: req.body.department.id,
                name: req.body.department.name
            },
            category: {
                _id: req.body.category._id,
                id: req.body.category.id,
                name: req.body.category.name
            }
        })
        user.password = await user.hashPassword(req.body.password);
        let createdUser = await user.save();
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.getUser = async (req,res)=>{
    User.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DET USEROK",
            data: data
        });
    });
};

exports.getUserById = async (req,res)=>{
    User.findById(req.params.id)  
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.editUser = async (req,res)=>{
    let user = {
        id: req.body.id,
        name: req.body.name,
        department: {
            _id: req.body.department._id,
            id: req.body.department.id,
            name: req.body.department.name
        },
        category: {
            _id: req.body.category._id,
            id: req.body.category.id,
            name: req.body.category.name
        }
    };
    User.findByIdAndUpdate(req.params.id,user)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        User.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.deleteUser = async (req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DELETE User"
        });
    });
};

// ====================Login============================
exports.login = async (req, res)=>{
    const login = {
        id: req.body.id,
        password: req.body.password
    }
    // console.log(login)
    try {
        let user = await User.findOne({id: login.id});
        // console.log(user);
        //check if user exit
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }else{
            let match = await user.compareUserPassword(login.password, user.password);
            if (match) {
                let token = await user.generateJwtToken({
                    user
                }, "secret", {
                    expiresIn: 604800
                })
    
                if (token) {
                    res.status(200).json({
                        success: true,
                        token: token,
                        userCredentials: user
                    })
                }
            } else {
                res.status(400).json({
                    type: "Not Found",
                    msg: "Wrong Login Details"
                })
            }

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
};
