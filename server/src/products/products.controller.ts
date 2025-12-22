import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from './product.model'
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get() 
    getAll(): Promise<Product[]> {
        return this.productsService.findAll()
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.findOne(id)
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto)
    }
}