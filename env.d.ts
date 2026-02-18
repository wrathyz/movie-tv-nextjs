// env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    // Server-side only variable
    DATABASE_URL: string;
    // Public variable (available on client and server)
    RELATIVE_FOLDER_PATH: string;
  }
}