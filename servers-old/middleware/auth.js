const jwt = require('jsonwebtoken')

const authMiddleWare = (req, res, next) => {
    // header에 x-access-token으로 보내거나, url parameter로 token을 전달하면 서버에서 검증하는 단계.
    let token = req.headers['x-access-token'] || req.query.token
    // token이 공백이면 403 뱉기!
    if(!token){
        return res.status(403)
            .json({
                success: false,
                message: 'Failed to find login credential'
            })
    }

    token = token.replace(/(\s*)/g,"")

    // token을 해석하는 promise생성
    const promise = new Promise( (resolve, reject) => {
        jwt.verify(
            token,
            req.app.get('jwt-secret'),
            (error, decoded) => {
                if (error) reject(error)
                resolve(decoded)
            }
        )
    })

    // reject(error)해서 검증에 실패하면 여기 도달!
    const onError = (error) => {
        res.status(403)
            .json({
                success:false,
                message: error.message
            })
    }

    promise
        .then(decoded => {
            req.decoded = decoded
            next()
        })
        .catch(onError)

}


module.exports = authMiddleWare