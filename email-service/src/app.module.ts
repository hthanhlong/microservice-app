import { Module } from '@nestjs/common';
import { EmailModule } from './modules/public/email/email.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
