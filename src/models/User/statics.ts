import { User, UserModel } from '.'
import UserCredential from '@models/UserCredentials'
import { ErrorHandler } from '@utils/errorTools/errorHandlers'

export interface UserModelStatics {
  signUp(data: object, password: string): Promise<User>
  login(identifier: string, passowrd: string): Promise<User>
  getUser(userId: string): Promise<User | null>
}

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

async function login(
  this: UserModel,
  identifier: string,
  password: string
): Promise<User> {
  try {
    const user = await this.findOne({
      $or: [
        {
          username: identifier
        },
        {
          email: identifier
        }
        // Add mode fields to find
      ]
    })

    if (!user) throw new ErrorHandler(403, 'user', 'invalidCredentials')

    const credentials = await UserCredential.validatePassword(user._id, password)

    if (!credentials) throw new ErrorHandler(403, 'user', 'invalidCredentials')

    return user
  } catch (err) {
    throw err
  }
}

async function getUser(
  this: UserModel,
  userId: string
): Promise<User | null> {
  return this.findOne({ _id: userId })
}

export {
  signUp,
  login,
  getUser
}
