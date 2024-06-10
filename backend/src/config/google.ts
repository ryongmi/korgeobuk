import { googleConfigSchema } from './validation.schema';

export const googleConfig = () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URI,
    tokenUrl: process.env.GOOGLE_TOKEN_URL,
    userInfoUrl: process.env.GOOGLE_USERINFO_URL,
  },
  validationSchema: googleConfigSchema,
});
