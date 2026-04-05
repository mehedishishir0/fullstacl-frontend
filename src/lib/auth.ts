import { DefaultUser, NextAuthOptions } from "next-auth";

import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface MyUser extends DefaultUser {
  id: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      },
    );

    const data = await res.json();
    console.log("token");
    console.log(token);
    console.log(data);

    if (!res.ok) throw data;

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 14 * 60 * 1000,
    };
  } catch (error) {
    console.error("Refresh Token Error:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        const response = await res.json();

        if (!res.ok || !response?.success) {
          throw new Error(response?.message || "Login failed");
        }

        const { user, accessToken, refreshToken } = response.data;

        return {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accessToken,
          refreshToken,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const fullName = profile?.name || "";
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ") || firstName;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: profile?.email,
                firstName,
                lastName,
              }),
            },
          );

          const data = await res.json();

          if (!data?.success || !data?.data?.user) return false;
          const u = user as MyUser;
          u.id = data.data.user._id;
          u.firstName = data.data.user.firstName;
          u.lastName = data.data.user.lastName;
          u.email = data.data.user.email;
          u.accessToken = data.data.accessToken;
          u.refreshToken = data.data.refreshToken;

        } catch (err) {
          console.error("Google signIn error:", err);
          return false;
        }
      }
      return true;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      console.log("token ax");

      return await refreshAccessToken(token);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        email: token.email,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      session.error = token.error;
      return session;
    },
  },
};


export async function logout(token:string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {
      method: "POST",
       headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Logout faild");
  return resData;
}