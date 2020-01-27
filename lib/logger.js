'use strict';

module.exports = (req, res, next) => {
    console.log('time info', req.requestTime)
    console.log('method info', req.method)
    console.log('path info', req.path)
    next();
}