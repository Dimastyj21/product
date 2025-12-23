import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

export async function bootstrap() {
    const app = await NestFactory.create(AppModule)
     app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.listen(3000)
    console.log('🚀 NestJS запущен на http://localhost:3000')
    return app
}

bootstrap();