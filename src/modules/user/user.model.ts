import { Schema, model } from 'mongoose'
import { Tuser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<Tuser>(
    {
        id: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // needPasswordChange: {
        //     type: Boolean,
        //     required: true,
        // },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'student', 'faculty'],
        },
        status: {
            type: String,
            required: true,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
})

const User = model<Tuser>('User', userSchema)
export default User
