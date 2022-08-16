const bcrypt = require('bcrypt');
require('dotenv/config');

class Bcrypt {
    saltRounds;

    constructor() {
        this.saltRounds = process.env.BCRYPT_SALT;
    }

    bcryptPassword = async function (password) {
        hashedpassword = await bcrypt.hash(password, +saltRounds);
        return hashedpassword;
    };
}

module.exports = Bcrypt;