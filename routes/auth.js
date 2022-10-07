const express =require('express')
const mongoose= require('mongoose')
const router= express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res)=>{
    res.render('home');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signup', (req, res, next)=>{
   console.log(req.body);
   bcrypt.hash(req.body.password, 10, (err, hash)=>{
    
    if(err){ console.log(err)}

    else{ 
        const userData= new User({
            username: req.body.username,
            password: hash,
           });
        
           console.log(userData)
           userData.save()
    }
   })

    res.redirect('/login');
})

//handle login route
router.post('/login', (req, res, next)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                msg:"user doest not exist."
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (error, result)=>{
            if(!result){
                return res.status(401).json({
                    msg: "password doesnt match."
                })
            }

            if(result){
                res.redirect('/index')
                const myToken= jwt.sign({
                    username: user[0].username ,
                    
                   
                }, 
                'this is dummy text',
                {
                    expiresIn: "24h"
                }
                );

                // res.status(200).json({
                //     username: user[0].username,
                //     token: myToken
                // })
             console.log(myToken)   
               

            }
        })
    })
    .catch(err=>{
        res.status(500).json({ 
            error: err
        })
    })

});


module.exports = router;
