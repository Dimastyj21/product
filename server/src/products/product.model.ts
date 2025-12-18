import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'   

@Table({ tableName: 'Products', timestamps: true })
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock: number;

  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sellerId: number;
}