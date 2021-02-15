import { Document, Types, Schema, model, Model } from 'mongoose'

// Models
import UserCredential from './UserCredentials'

interface User extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  firstName?: string
  lastName?: string
}

interface UserModel extends Model<User> {
  signUp(data: object, password: string): Promise<User>
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  autoIndex: true
})

// Virtuals
UserSchema.virtual('fullName').get(function fullName(this: User) {
  return `${this.firstName} ${this.lastName}`.trim()
})

// Statics
async function signUp(
  this: UserModel,
  data: object,
  password: string
): Promise<User> {
  try {
    const user = new this(data)

    await UserCredential.createCredential(user._id, password)
    await user.save()

    return user
  } catch (err) {
    throw err
  }
}

UserSchema.statics.signUp = signUp

const UserModel = model<User, UserModel>('user', UserSchema)

export default UserModel
