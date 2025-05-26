// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";
import tailwindcss from "@tailwindcss/vite";
dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],
  modules: ["notivue/nuxt", "@sidebase/nuxt-auth"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  auth: {
    // globalAppMiddleware: true,
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/auth/login", method: "post" },
        signOut: false,
        signUp: { path: "/auth/register", method: "post" },
        getSession: { path: "/auth/me", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/accessToken",
        type: "Bearer",
        cookieName: "auth.accessToken",
        headerName: "Authorization",
        maxAgeInSeconds: 15 * 60,
        sameSiteAttribute: "lax",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: false,
        endpoint: { path: "/auth/refresh-token", method: "post" },
        refreshOnlyToken: false,
        token: {
          signInResponseRefreshTokenPointer: "/refreshToken",
          refreshResponseTokenPointer: "",
          refreshRequestTokenPointer: "/refreshToken",
          cookieName: "auth.refreshToken",
          maxAgeInSeconds: 15 * 24 * 60,
          sameSiteAttribute: "lax",
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
        },
      },
      pages: {
        login: "/auth/login",
      },
    },
    sessionRefresh: {
      enablePeriodically: 10 * 60 * 1000,
      enableOnWindowFocus: false,
    },
  },
});
