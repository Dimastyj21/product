import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "sequelize";
import { Product } from './product.model'
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productsModel: typeof Product,
    ) {}

    findAll(): Promise<Product[]> {
        return this.productsModel.findAll()   
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productsModel.create(createProductDto)
    }

    async findOne(id: number): Promise<Product> {
        const productOne = await this.productsModel.findByPk(id)
        if(!productOne) {
            throw new NotFoundException(`Product with id ${id} not found`)
        }
        return productOne
    }
}