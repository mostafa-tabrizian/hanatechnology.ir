import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import User, { IUser } from '@/models/user'
import dbConnect from './dbConnect'

interface Credential {
   mobileNumber: string
   password: string
}

const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,

   providers: [
      CredentialsProvider({
         name: 'Credentials',

         credentials: {
            mobileNumber: {
               label: 'شماره تماس',
               type: 'text',
               placeholder: '09123456789',
            },
            password: {
               label: 'رمز عبور',
               type: 'password',
               placeholder: 'Abc1234',
            },
         },

         async authorize(credentials: Credential | undefined) {
            if (!credentials) return null

            const { mobileNumber, password } = credentials

            await dbConnect()
            const user = await User.findOne({
               mobileNumber: mobileNumber
            })

            if (!user) return null

            user.save()

            const passwordsMatch = bcrypt.compareSync(password, user.password)

            if (!passwordsMatch) return null

            const { password: _, ...filteredUser } = user as IUser & {
               password: string
            }

            return filteredUser
         },
      }),
   ],
   callbacks: {
      // @ts-ignore
      async jwt({ token, user }) {
         return { ...token, ...user }
      },
      // @ts-ignore
      async session({ session, token }) {
         session.user = token

         delete token.password
         delete token.iat
         delete token.exp
         delete token.jti

         return token
      },
   },
   pages: {
      signIn: '/auth',
   },
}

export default authOptions
