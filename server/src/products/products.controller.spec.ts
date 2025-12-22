import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const mockProductsService = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockImplementation((id: number) => {
        if (id === 1) {
          return Promise.resolve({ id: 1, name: 'Test product', price: 100, stock: 10 });
        } else {
          return Promise.reject(new NotFoundException(`Product with ID ${id} not found`));
        }
      }),
      create: jest.fn().mockImplementation((dto: CreateProductDto) =>
        Promise.resolve({ id: 1, ...dto })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.getAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a product if found', async () => {
      const result = await controller.getById(1);
      expect(result).toEqual({ id: 1, name: 'Test product', price: 100, stock: 10 });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product not found', async () => {
      await expect(controller.getById(999)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const dto: CreateProductDto = { name: 'Test product', price: 100, stock: 10 };
      const result = await controller.createProduct(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});