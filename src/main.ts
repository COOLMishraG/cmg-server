import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set the port to listen from the environment variable or default to 3000
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
