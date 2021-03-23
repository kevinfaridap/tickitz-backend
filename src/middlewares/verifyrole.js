const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')

function verify(){
    return function(req, res, next){
        const role = req.body.role;

        let tokenWithBearer = req.headers.authorization
        if(tokenWithBearer){
            let token = tokenWithBearer.split(' ')
            token = token[1];
    
            jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
                if(err){
                    return helpers.response(res, null, 401, {
                        message: 'Token not registered!'
                    })
                }else{
                    if(decoded.role == 1){
                        req.auth = decoded;

                        next();
                    } else {
                        return helpers.response(res, null, 401, {
                            message: 'You dont have permission!'
                        })
                    }
                }
            });
        } else{
            return helpers.response(res, null, 401, {
                message: 'Token tidak tersedia!'
            })
        }
    }
}

module.exports ={
    verify
}