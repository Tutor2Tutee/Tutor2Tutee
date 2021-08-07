const jwt = require('jsonwebtoken');
require('dotenv').config()

// jwt tokenizer for testing purpose

module.exports.getToken = async (user) => {

    if (user._id === undefined) {
        throw new Error("no _id")
    }

    if (user.email === undefined) {
        throw new Error("no email")
    }

    return await jwt
        .sign(
            {
                _id: user._id,
                email: user.email
            },
            process.env.SECRET,
            {
                expiresIn: '1d',
                issuer: "Tutor2Tutee",
                subject: "Test Purpose"
            }
        )
}