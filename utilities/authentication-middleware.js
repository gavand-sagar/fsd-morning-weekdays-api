import jwt from 'jsonwebtoken'
import fs from 'fs'

const handler = async (req, res, next) => {
    let token = req.headers.token;
    if (token) {
        try {
            fs.writeFileSync('./temp.txt', token)
            var decoded = jwt.verify(token, process.env.JWT_KEY);
            next();
        } catch {
            return res.json({
                status: false
            })
        }
    } else {
        return res.json({
            status: false
        })
    }
}


export default handler;