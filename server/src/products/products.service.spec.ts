import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: typeof Product;

  const mockProduct: Product = {
    id: 1,
    name: 'Test product',
    price: 100,
    stock: 10,
  } as Product;

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findByPk: jest.fn().mockImplementation((id: number) => {
      if (id === 1) {
        return Promise.resolve(mockProduct);
      } else {
        return Promise.resolve(null);
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<typeof Product>(getModelToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const dto: CreateProductDto = {
        name: mockProduct.name,
        price: mockProduct.price,
        stock: mockProduct.stock,
      };
      const result = await service.create(dto);
      expect(result).toEqual(mockProduct);
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProduct]);
      expect(model.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(model.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(model.findByPk).toHaveBeenCalledWith(999);
    });
  });
});