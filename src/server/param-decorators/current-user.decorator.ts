import Iron from '@hapi/iron'
import { createParamDecorator } from '@storyofams/next-api-decorators'
import CookieService from 'helpers/cookie'

export type MagicUser = {
  issuer: string
  publicAddress: string
  email: string
}

export const CurrentUser = createParamDecorator<Promise<MagicUser | null>>(
  async req => {
    const verified = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults,
    )

    return verified
  },
)
