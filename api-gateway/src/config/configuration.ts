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
  authService: {
    url: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000',
  },
  axios: {
    instance: process.env.AXIOS_INSTANCE ?? 'http://localhost:3000',
  },
});
