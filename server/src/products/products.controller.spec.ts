import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  const validationPipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true });

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
        Promise.resolve({ id: 1, ...dto }),
      ),
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

    it('should throw InternalServerErrorException on service error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Database error'));
      await expect(controller.getAll()).rejects.toThrow(InternalServerErrorException);
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

    it('should throw BadRequestException on invalid ID', async () => {
      await expect(controller.getById(-1)).rejects.toThrow(BadRequestException);
      await expect(controller.getById(NaN)).rejects.toThrow(BadRequestException);
    });
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const dto: CreateProductDto = { name: 'Test product', price: 100, stock: 10 };
      // Прогоняем через ValidationPipe
      const validDto = await validationPipe.transform(dto, { type: 'body', metatype: CreateProductDto });
      const result = await controller.createProduct(validDto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(validDto);
    });

    it('should throw BadRequestException on invalid product data', async () => {
      const invalidDtos: CreateProductDto[] = [
        { name: '', price: 100, stock: 10 },
        { name: 'Invalid', price: -10, stock: 10 },
        { name: 'Invalid', price: 100, stock: -5 },
        { name: 'Invalid', price: Number.MAX_SAFE_INTEGER + 1, stock: 10 },
      ];

      for (const dto of invalidDtos) {
        // Прогоняем через ValidationPipe и вызываем контроллер только после успешной валидации
        await expect(
          validationPipe.transform(dto, { type: 'body', metatype: CreateProductDto }).then(validDto => controller.createProduct(validDto))
        ).rejects.toThrow(BadRequestException);
      }
    });

    it('should throw InternalServerErrorException if service throws error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Database error'));
      const dto: CreateProductDto = { name: 'Test product', price: 100, stock: 10 };
      const validDto = await validationPipe.transform(dto, { type: 'body', metatype: CreateProductDto });
      await expect(controller.createProduct(validDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});