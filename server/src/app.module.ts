import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstanceHeaderMiddleware } from './middleware/instance-header.middleware';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'postgres-db',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || '123',
      database: process.env.DB_NAME || 'testdb',
      autoLoadModels: true,
      synchronize: true, // ⚠️ В продакшене false!
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InstanceHeaderMiddleware).forRoutes('*');  // Применить ко всем роутам
  }
}