import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { ProductCategory } from './product-category.entity';

@Entity({ schema: 'paver_erp', name: 'products' })
@Check(
  'ck_product_type',
  `"product_type" IN ('manufactured', 'traded', 'both')`,
)
@Index('idx_products_category', ['categoryId'])
export class Product extends BaseEntity {
  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId!: string | null;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ name: 'product_type', type: 'varchar', length: 30 })
  productType!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'is_manufactured', type: 'boolean', default: true })
  isManufactured!: boolean;

  @Column({ name: 'is_traded', type: 'boolean', default: false })
  isTraded!: boolean;

  @ManyToOne(() => ProductCategory, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category!: ProductCategory | null;
}