import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../../helpers/constants";
export const options = {
  providers: [
    CredentialsProvider({
      name: "next auth",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },

      async authorize(credentials, req) {
        console.log(credentials, "credentials");
        const user = await users.find(
          (item) => item.username == credentials?.username
        );
        console.log("user", user);
        if (user) {
          console.log("user", user);
          if (!credentials || !credentials.username || !credentials.password) {
            console.log("Credentials not found");
            return null;
          } else {
            if (
              credentials?.username === user.username &&
              credentials?.password === user?.password
            ) {
              console.log("Credentials correct1",user);
              return user;
            } else {
              console.log("Check your credentials");
              return null;
            }
          }
        } else {
          console.log("user not found");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token,trigger, user }) {
      console.log(trigger,'trigger')
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.email = user.email; // Add custom field example
        // Add more custom fields as needed
      }
      return token;
    },
    async session({ session, token }) {

      if (session?.user) {
        session.user.role = token.role;
        session.user.name = token.username;
        session.user.email = token.email;
      }
      console.log("sessionsession",  session);

      return session;
    },
  },
};




// import { handleSignout } from 'next-auth/react';

// export default handleSignout();