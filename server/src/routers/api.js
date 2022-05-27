const router = require('express').Router();
const user = require('./user')
const User = require('../model/user')
const Instrument = require('../model/instrument')
const instrument = require('./instrument')
const rent = require('./rent')
const ireturn = require('./ireturn')
const incident = require('./incident')
const isystem = require('./system')
const announcement = require('./announcement')
const message = require('./message')
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "./../config/config.json"), 'utf8'));

router.use(
    (req, res, next) => {
        let token = req.headers.authorization;
        console.log(`Token: ${token}`)
        if ( req.path === "/user/login" || req.path === "/user/signup" ) {
            next();
        } else {
            if (token) {
                if (token.startsWith("Bearer ")) {
                    token = token.slice(7, token.length);
                }
                jwt.verify(token, config.system.secret, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            status: 1,
                            message: 'token Authorization failed'
                        })
                    } else {
                        req.decoded = decoded;
                        if ( req.path === "/user") {
                            res.status(200).send({
                                code: 0,
                                message: 'token ok',
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
                return res.status(401).json({
                    status: 1,
                    message: 'Token not exist'
                })
            }
        }
    }
)
router.use('/user', user)
router.use('/instrument', instrument)
router.use('/announcement', announcement)
router.use('/rent', rent)
router.use('/system', isystem)
router.use('/return', ireturn)
router.use('/incident', incident)
router.use('/message', message)
module.exports = router
