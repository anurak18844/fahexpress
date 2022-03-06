const Assets = require('../models/assetsModel');

exports.getAssets = async (req, res)=>{
    Assets.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET ASSETS ",
            data: data
        });
    });
}
exports.getAssetsById = async (req, res)=>{
    Assets.findById(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET ASSETS BY ID",
            data: data
        });
    });
}

// ====================เพิ่ม===========================
exports.addAssets = async(req, res)=>{
    try {
        let assets = new Assets ({
            id: req.body.id,
            name: req.body.name,
            acquired: req.body.acquired,
            unit: req.body.unit,
            price: req.body.price,
            age: req.body.age
        });
    
        let createdAssets = await assets.save();
        res.status(200).json({
            msg: "Created Assets Finish.",
            data: createdAssets
        });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
        });
    }  
}
// ====================แก้ไขและอัพเดต===========================
exports.editAssets = async (req, res)=>{
    let assets = {
        id: req.body.id,
        name: req.body.name,
        acquired: req.body.acquired,
        unit: req.body.unit,
        price: req.body.price,
        age: req.body.age,
        comment: req.body.comment,
        acknowledsedyear: req.body.acknowledsedyear,
        approvalyear: req.body.approvalyear,
        dischargedyear: req.body.dischargedyear,
        removeyear: req.body.removeyear,
        reasonforselling: req.body.reasonforselling,
        status: req.body.status
    };
    Assets.findByIdAndUpdate(req.params.id,assets)
    .exec((err,data)=>{
        Assets.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "UPDATE ASSETSS",
                data: data
            });
        });
    });
}
// ========================ลบ==========================
exports.deleteAssets = async (req, res)=>{
    Assets.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: `ASSETE ID : ${req.params.id} IS DELETED`
        });
    });
}
