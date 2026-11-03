import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';

@Entity({ schema: 'paver_erp', name: 'bom_versions' })
@Unique('uq_bom_version', ['productVariantId', 'versionNumber'])
@Check(
  'ck_bom_dates',
  '"effective_to" IS NULL OR "effective_from" IS NULL OR "effective_to" >= "effective_from"',
)
export class BomVersion extends BaseEntity {
  @Column({ name: 'product_variant_id', type: 'uuid' })
  productVariantId!: string;

  @Column({ name: 'version_number', type: 'integer' })
  versionNumber!: number;

  @Column({ name: 'effective_from', type: 'date', nullable: true })
  effectiveFrom!: string | null;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'product_variant_id' })
  productVariant!: ProductVariant;
}