// app/models/user.js

import mongoose  from 'mongoose';
import bcrypt  from 'bcrypt';


// define the schema for our user model
const userSchema = mongoose.Schema({

    local            : {
        username     : { type : String , unique : true, required : false },
        email        : { type : String , unique : true, required : true },
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

const User = mongoose.model('User', userSchema);
export default User
