import withSession from '../../lib/session'
import { Magic } from '@magic-sdk/admin';

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default withSession(async (req, res) => {

  try {
    var userid, userMetadata
    if (req.headers.authorization == 'DEVMODE' && process.env.NODE_ENV === 'development') {
      userid = '0xdeadbeef'
    }
    else {
      const didToken = req.headers.authorization.substr(7);
      await magic.token.validate(didToken);
      userid = magic.token.getPublicAddress(didToken);
      userMetadata = await magic.users.getMetadataByToken(didToken)      
    }
    console.log('USERID', userid)
    const prisma = require('../../db/prisma')
    let userdata = await prisma.user.findUnique({
        where: {
            id: userid,
        }
    })
    if (!userdata) {
      // New user 
      userdata = await prisma.user.create({
        data: {
          id: userid, 
          email: userMetadata.email,
          name: userMetadata.email,
        }
      })
    }
    req.session.set('user', userdata)
    await req.session.save()
    res.status(200).json({ authenticated: true });
  } catch (error) {
    console.log('ERROR:', error.message)
    res.status(500).json({ error: error.message });
  }
})
