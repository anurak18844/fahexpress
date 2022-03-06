const Department = require('../models/departmentModel');

exports.getDepartments = async (req, res)=>{
    Department.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET Departmet",
            data: data
        });
    });
}

exports.getDepartmetById = async (req, res)=>{
    Department.findById(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "GET DEPARTMENT BY ID",
            data: data
        });
    });
}

exports.addDepartment = async(req, res)=>{
    try {
        let department = new Department({
            id: req.body.id,
            name: req.body.name  
        });
    
        let createdDepartment = await department.save();
        res.status(200).json({
            msg: "Created Department Finish.",
            data: createdDepartment
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }  
}
// ====================แก้ไขและอัพเดต===========================
exports.editDepartment = async (req, res)=>{
    let department = {
        id: req.body.id,
        name: req.body.name
    };
    Department.findByIdAndUpdate(req.params.id,department)
    .exec((err,data)=>{
        Department.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "UPDATE DEPARTME",
                data: data
            });
        });
    });
}
// ========================ลบ==========================
exports.deleteDepartment = async (req, res)=>{
    Department.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: `DEPARTMENT ID : ${req.params.id} IS DELETED`
        });
    });
}





