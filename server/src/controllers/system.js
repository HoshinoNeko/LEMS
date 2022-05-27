const isystem = require('../model/system')

const getSystemStatus = (req, res) => {
    let data = {}
    isystem.getUsers(req, (err, callback) => {
        if (err) {
            return res.send({
                status: 1,
                message: err
            })
        } else {
            data.users = callback[0].users
            isystem.getDevices(req, (err, callback) => {
                if (err) {
                    return res.send({
                        status: 1,
                        message: err
                    })
                } else {
                    data.devices = callback[0].devices
                    isystem.getTodayRents(req, (err, callback) => {
                        if(err) {
                            return res.send({
                                status: 1,
                                message: err
                            })
                        } else {
                            data.rentstoday = callback[0].rents
                            isystem.getTodayReturns(req, (err, callback) => {
                                if (err) {
                                    return res.send({
                                        status: 1,
                                        message: err
                                    })
                                } else {
                                    data.returnstoday = callback[0].returns
                                    isystem.getWaitReturns(req, (err, callback) => {
                                        if (err) {
                                            return res.send({
                                                status: 1,
                                                message: err
                                            })
                                        } else {
                                            data.awaitingreturns = callback[0].waitreturn
                                            isystem.getWaitIncidents(req, (err, callback) => {
                                                if (err) {
                                                    return res.send({
                                                        status: 1,
                                                        message: err
                                                    })
                                                } else {
                                                    data.awaitingincidents = callback[0].waitincident
                                                    return res.send({
                                                        status: 0,
                                                        data: data
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
module.exports = {
    getSystemStatus
}
