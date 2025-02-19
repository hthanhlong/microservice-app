export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  },
  kafka: {
    broker: process.env.KAFKA_BROKER ?? 'localhost:9092',
    groupId: process.env.KAFKA_GROUP_ID ?? 'my-consumer-group',
  },
  frontend: {
    nextApp: process.env.NEXT_APP ?? 'http://localhost:3000',
  },
  services: {
    auth: {
      url: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000',
      v1: {
        signUp: '/v1/auth/sign-up',
        signIn: '/v1/auth/sign-in',
        refreshTokens: '/v1/auth/refresh-tokens',
        signUpVendor: '/v1/auth/vendor/sign-up',
        verifyCode: '/v1/auth/verify-code',
      },
    },
  },
});
