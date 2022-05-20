const router = require('express').Router();
const user = require('./user')
const User = require('../model/user')
const Instrument = require('../model/instrument')
const instrument = require('./instrument')
const rent = require('./rent')
const ireturn = require('./ireturn')
const incident = require('./incident')
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "./../config/config.json"), 'utf8'));

router.use(
    (req, res, next) => {
        let token = req.headers.authorization;
        console.log(`Token: ${token}`)
        if ( req.path === "/user/login" || req.path === "/user/signup" || req.path === "/instrument" ) {
            next();
        } else {
            if (token) {
                if (token.startsWith("Bearer ")) {
                    token = token.slice(7, token.length);
                }
                jwt.verify(token, config.system.secret, (err, decoded) => {
                    if (err) {
                        res.json({
                            code: -1,
                            msg: 'token Authorization failed'
                        })
                    } else {
                        req.decoded = decoded;
                        console.log(decoded.id, decoded.exp)
                        if ( req.path === "/user") {
                            res.send({
                                code: 0,
                                msg: 'token ok',
                                id: decoded.id,
                                email: decoded.email,
                                role: decoded.role,
                                sname: decoded.sname,
                                s_id: decoded.s_id
                            })
                        }
                        next();
                    }
                })
            } else {
                res.json({
                    code: -1,
                    msg: 'token no exist'
                })
            }
        }
    }
)
router.use('/user', user)
router.use('/instrument', instrument)
router.use('/rent', rent)
router.use('/return', ireturn)
router.use('/incident', incident)
module.exports = router
