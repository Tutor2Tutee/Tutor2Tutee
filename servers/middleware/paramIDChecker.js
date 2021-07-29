const checkerMiddleWare = (req, res, next) => {
    if (req.params.id.length === 24) {
        next()
    } else {
        res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }
}

module.exports = checkerMiddleWare