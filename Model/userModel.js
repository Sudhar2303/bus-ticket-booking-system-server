const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: johndoe@gmail.com
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *           example: Abc12345!@
 *         number:
 *            type: string
 *            description: The 10-digit phone number
 *             example: 9876543210
 *         role:
 *           type: string
 *           description: The role of the user
 *           enum: 
 *             - admin
 *             - user
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *           example: 2025-01-10T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 *           example: 2025-01-10T12:30:00.000Z
 *       required:
 *         - name
 *         - email
 *         - password
 */
const userSchema = new mongoose.Schema({
        name : {
            type: String, 
            required: [true, 'First name is mandatory field'],
            minlength: [1, 'First name must be at least 1 character long'],
            maxlength: [100, 'First name must not exceed 100 characters'],
            match: [
                /^[A-Za-z\s]+$/, 
                'First name can only contain letters and spaces',
            ],
        },
        email: {
            type: String, 
            required: [true, 'Email is mandatory field'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address'],
        },
        password: {
            type: String, 
            select: false,
            required: [true, 'password is mandatory field'],
            minlength :[8, 'Password must contain at least 8 character long'],
            maxlength :[20, 'Password must not exceed 20 characters'],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-])[A-Za-z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/,
                'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character. Minimum length is 8 characters.',
            ]
        },
        role :
        {
            type: String,
            enum : ['admin','user'],
            default : 'user'
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'users'
    }
)

userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()
    bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error)

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error)

            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('users',userSchema)