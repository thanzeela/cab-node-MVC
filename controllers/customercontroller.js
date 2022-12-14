const db = require('../models/customer');
const {body, validationResult} = require('express-validator');
const customer = require('../models/customer');
module.exports.index = (req, res, next) => {
    customer.findAll().then(user => {
        res.render('customer-index', {
            data: user
        });
    })
}
module.exports.create = (req, res, next) => {
    res.render('customer-create');
}

module.exports.createPost = (req, res, next) => {
    console.log(req.body)
    customer.create({
            name: req.body.name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.Password,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            dob: req.body.dob
        })
        .then(user => {
            req.session.role = 1;
            res.redirect("/login");
        })
}

module.exports.update = (req, res, next) => {
    customer.findByPk(req.params.id)
        .then(user => {
            res.render('customer-update', {
                data: user
            })
        });
}
module.exports.updatePost = async (req, res, next) => {
    var user = await customer.findByPk(req.params.id);
    await user.update(
        {
            name: req.body.name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            dob: req.body.dob 
            
        },
        {
            where: {id: req.params.id}
        }
    )
    res.redirect('/');
}
module.exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let user = await customer.findByPk(id);
    if (user) {
        await customer.destroy({
            where: {
                id: id
            }
        });
        res.redirect("/");
    }
}
module.exports.logout=(req, res, next)=>{
    req.session.UserId = null;
    return res.redirect('/login')

}
