'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'iPhone 15 Pro',
        description: 'Флагманский смартфон Apple с iOS 18 и камерой 48MP',
        price: 120000,
        stock: 15,
        imageUrl: 'https://example.com/iphone15.jpg',
        category: 'electronics',
        isActive: true,
        sellerId: 123,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MacBook Air M2',
        description: 'Ультралегкий ноутбук Apple с чипом M2 и 16GB RAM',
        price: 95000,
        stock: 8,
        imageUrl: 'https://example.com/macbook-air.jpg',
        category: 'electronics',
        isActive: true,
        sellerId: 123,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike Air Max 90',
        description: 'Классические кроссовки Nike с воздушной подушкой',
        price: 8500,
        stock: 25,
        imageUrl: 'https://example.com/nike-airmax.jpg',
        category: 'clothing',
        isActive: true,
        sellerId: 456,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Watch 6',
        description: 'Умные часы Samsung с Wear OS и GPS',
        price: 25000,
        stock: 12,
        imageUrl: 'https://example.com/galaxy-watch.jpg',
        category: 'electronics',
        isActive: true,
        sellerId: 789,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adidas Ultraboost',
        description: 'Кроссовки Adidas с технологией Boost для бега',
        price: 12000,
        stock: 5,
        imageUrl: 'https://example.com/adidas-ultraboost.jpg',
        category: 'clothing',
        isActive: false,  // снят с продажи
        sellerId: 456,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
