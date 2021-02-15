import { Document, Model, model, Schema, Types } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserCredential extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId
  password: string
}

interface UserCredentialModel extends Model<UserCredential> {
  createCredential(user: Types.ObjectId, passowrd: string): Promise<void>
  validatePassword(user: Types.ObjectId, password: string): Promise<Boolean>
}

const SALT = 10

const UserCredentialSchema: Schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true,
    inmutable: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Statics
async function createCredential(
  this: UserCredentialModel,
  user: Types.ObjectId,
  password: string
): Promise<void> {
  try {
    const salt = bcrypt.genSaltSync(SALT)
    const pwd = bcrypt.hashSync(password, salt)

    const credential = new this({
      user,
      password: pwd
    })

    await credential.save()

    return
  } catch (err) {
    throw err
  }
}

async function validatePassword(
  this: UserCredentialModel,
  user: Types.ObjectId,
  passowrd: string
): Promise<Boolean> {
  try {
    const credential = await this.findOne({ user })

    if (!credential) return false

    return bcrypt.compareSync(passowrd, credential.password)
  } catch (err) {
    throw err
  }
}

UserCredentialSchema.statics.createCredential = createCredential
UserCredentialSchema.statics.validatePassword = validatePassword

const UserCredentialModel = model<UserCredential, UserCredentialModel>(
  'userCredential',
  UserCredentialSchema
)

export default UserCredentialModel

export {
  UserCredential,
  UserCredentialModel
}
