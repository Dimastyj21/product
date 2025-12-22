import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

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
      const dto: CreateProductDto = { name: mockProduct.name, price: mockProduct.price, stock: mockProduct.stock };
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
});