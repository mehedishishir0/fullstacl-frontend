import { JWT } from "next-auth/jwt";

export const refreshAccessToken = async (token: JWT) => {
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
      }
    );

    const data = await res.json();

    if (!res.ok) throw data;

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error("Refresh token error:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};