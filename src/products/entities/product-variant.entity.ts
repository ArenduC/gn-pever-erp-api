import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './product.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity({ schema: 'paver_erp', name: 'product_variants' })
@Index('idx_variants_product', ['productId'])
@Check(
  'ck_variant_dimensions',
  `("length_mm" IS NULL OR "length_mm" > 0)
   AND ("width_mm" IS NULL OR "width_mm" > 0)
   AND ("height_mm" IS NULL OR "height_mm" > 0)`,
)
@Check(
  'ck_pieces_per_area',
  '"pieces_per_area" IS NULL OR "pieces_per_area" > 0',
)
@Check(
  'ck_variant_prices',
  '"selling_price" >= 0 AND "purchase_price" >= 0',
)
export class ProductVariant extends BaseEntity {
  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  sku!: string | null;

  @Column({ name: 'variant_name', type: 'varchar', length: 150, nullable: true })
  variantName!: string | null;

  @Column({ name: 'length_mm', type: 'numeric', precision: 12, scale: 2, nullable: true })
  lengthMm!: string | null;

  @Column({ name: 'width_mm', type: 'numeric', precision: 12, scale: 2, nullable: true })
  widthMm!: string | null;

  @Column({ name: 'height_mm', type: 'numeric', precision: 12, scale: 2, nullable: true })
  heightMm!: string | null;

  @Column({ name: 'pieces_per_area', type: 'numeric', precision: 14, scale: 4, nullable: true })
  piecesPerArea!: string | null;

  @Column({ name: 'base_unit_id', type: 'uuid', nullable: true })
  baseUnitId!: string | null;

  @Column({ name: 'selling_price', type: 'numeric', precision: 14, scale: 2, default: 0 })
  sellingPrice!: string;

  @Column({ name: 'purchase_price', type: 'numeric', precision: 14, scale: 2, default: 0 })
  purchasePrice!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'base_unit_id' })
  baseUnit!: Unit | null;
}