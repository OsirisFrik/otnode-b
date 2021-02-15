import Debug from 'debug'

// Models
import Users from '@models/User'

const debug = Debug('otn:bootstrap:user')

async function initUserBootstrap(): Promise<void> {
  try {
    debug('Init user bootstrap')

    const defaultUser = {
      username: 'rootAdmin',
      email: 'test@test.test',
      passowrd: 'adminRoot'
    }

    if (
      await Users.countDocuments() < 1 &&
      !await Users.findOne({ username: defaultUser.username })
    ) {
      debug('No users found, creating rootAdmin user')

      await Users.signUp(defaultUser, defaultUser.passowrd)

      debug('rootAdmin user created')
    }

    debug('End user bootstrap')
  } catch (err) {
    throw err
  }
}

export default initUserBootstrap
