module.exports.onlyUsers = (req, res, next) => {
    if (req.session.user?.role == "user") {
        next()
    } else {
        res.status(401).send({err:true, msg: "secure content. please log in as a user to access" })
    }
}