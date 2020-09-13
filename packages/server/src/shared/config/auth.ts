export default {
  jwt: {
    secret: process.env.APP_SECRET || '3e2c89b8ac755ad1d9d20e850195f671',
    expiresIn: '1d'
  }
}
