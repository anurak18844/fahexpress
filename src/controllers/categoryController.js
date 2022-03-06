const Category = require('../models/categoryModel')


exports.getCategories = async (req, res)=>{
    Category.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET CATEGORIES",
            data: data
        });
    });
}

exports.getCategoryById = async (req, res)=>{
    Category.findById(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET CATEGORY BY ID",
            data: data
        });
    });
}
// ====================เพิ่ม===========================
exports.addCategory = async(req, res)=>{
    try {
        let category = new Category({
            id: req.body.id,
            name: req.body.name,
        });
    
        let createdCategory = await category.save();
        res.status(200).json({
            msg: "Created Category Finish.",
            data: createdCategory
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }  
}


// ====================แก้ไขและอัพเดต===========================
exports.editCategory = async (req, res)=>{
    let category = {
        id: req.body.id,
        name: req.body.name
    };
    Category.findByIdAndUpdate(req.params.id,category)
    .exec((err,data)=>{
        Category.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "UPDATE CATEGORY",
                data: data
            });
        });
    });
}

// ========================ลบ==========================
exports.deleteCategory = async (req, res)=>{
    Category.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: `CATEGORY ID : ${req.params.id} IS DELETED`
        });
    });
}

