import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const mockProductsService = {
      findAll: jest.fn().mockResolvedValue([]), // Возвращаем пустой массив для getAll
      create: jest.fn().mockImplementation((dto: CreateProductDto) => Promise.resolve({
        id: 1,
        ...dto,
      })), // Мокаем create, возвращаем объект с id
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

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const dto: CreateProductDto = { name: 'Test product', price: 100, stock: 10 };
      const result = await controller.createProduct(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});