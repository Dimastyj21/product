import * as request from 'supertest';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

beforeAll(async () => {
  jest.setTimeout(30000);
  
  // Загружаем .env.test
  require('dotenv').config({ path: '.env.test' });
  
  app = await NestFactory.create(AppModule);
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Products Integration Tests', () => {
  test('Создание продукта', async () => {
    const data = { 
      name: 'Test Product', 
      price: 100,  // ✅ Изменено с 99.99 на 100 (INTEGER)
      stock: 10,
      description: 'test desc',
      category: 'test',
      isActive: true,
      sellerId: 1
    };

    const response = await request(app.getHttpServer())
      .post('/api/products')
      .send(data)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(data.name);
    expect(response.body.price).toBe(data.price);
  });

  test('Получение списка продуктов', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
