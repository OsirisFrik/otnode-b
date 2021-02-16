import { Document, Types, Schema, model, Model } from 'mongoose'
import { signUp, UserModelStatics } from './statics'

interface User extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  firstName?: string
  lastName?: string
}

interface UserModel extends Model<User>, UserModelStatics {}

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
UserSchema.statics.signUp = signUp

const UserModel = model<User, UserModel>('user', UserSchema)

export default UserModel

export {
  User,
  UserModel
}
