// app/models/user.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import passport from "passport/lib/index";

// define the schema for our user model
const userSchema = mongoose.Schema({
    local: {
        username: {type: String, unique: true, required: true},
        email: {type: String, unique: true, required: true},
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },

})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.local.password, callback);
};


/**
 * The pre-save hook method.
 * @todo implement
 */
userSchema.pre('save', function saveHook(next) {
    console.log('pre save');
    const user = this

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('local.password')) return next()


    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError)
        }

        return bcrypt.hash(user.local.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError)
            }

            // replace a password string with hash value
            user.local.password = hash

            return next()
        })
    })
})


const User = mongoose.model('User', userSchema)
export default User

export const serializeUser = function (user, done) {
    // done(null, user.local.email);
    done(null, user.id);
}

export const deserializeUser = function (id, done) {
    User.findOne({_id: id}, (err, user) => {
        if (err) {
            return done(err);
        }
        //
        if (!user) {
            // return done (true, false)
            return done('no match serializing');
        }

        return done(null, {username: user.local.username, id: user._id});
    });
};
