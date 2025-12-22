import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from './product.model'
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get() 
    async getAll(): Promise<Product[]> {
        try {
            return await this.productsService.findAll()
        } catch (error) {
            throw new InternalServerErrorException('Database error');
        }
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        if (!Number.isInteger(id) || id <= 0) {
         throw new BadRequestException('Invalid product ID');
       }
        try {
     return await this.productsService.findOne(id);
   } catch (error) {
     if (error instanceof NotFoundException) {
       throw error;
     }
     throw new InternalServerErrorException('Database error');
   }
    }

    @Post()
    async createProduct(@Body(new ValidationPipe()) createProductDto: CreateProductDto): Promise<Product> {
        try {
            
            return await this.productsService.create(createProductDto)
        } catch (error) {
            throw new InternalServerErrorException('Database error');
        }
    }
}