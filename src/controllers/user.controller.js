const User = require('../models/user.model')

const PORT = process.env.PORT || 8090;
const HOST_NAME = process.env.HOST_NAME || 8090;


const createProfile = async (req, res) => {

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const { username, email, password } = req.body
    const urls = [];
    const files = req.files;
    for (const file of files) {
        const { filename } = file;
        urls.push(`http://${HOST_NAME}:${HTTP_HOST}/static/profile/${filename}`)

    }
    res.send({ message: 'File uploaded successfully.', url: urls });
}


module.exports= {createProfile}
