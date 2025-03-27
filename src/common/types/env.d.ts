namespace NodeJS {
  interface ProcessEnv {
    // Application
    PORT: number

    // Database
    DB_HOST: string
    DB_NAME: string;
    DB_PORT: number;
    DB_PASSWORD: string;
    DB_USERNAME: string;

    // S3
    S3_ENDPOINT: string
    S3_SECRET_KEY: string
    S3_ACCESS_KEY: string
    S3_BUCKET_NAME: string

    // JWT
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string

    // Zarinpall
    ZARINPAL_VERIFY_URL: string
    ZARINPAL_REQUEST_URL: string
    ZARINPALL_MERCHANT_ID: string
    ZARINPAL_GATEWAY_URL: string
  }
}