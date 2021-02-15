import UserBt from './user.b'

async function initBootstrap(): Promise<void> {
  await UserBt()
}

export default initBootstrap
