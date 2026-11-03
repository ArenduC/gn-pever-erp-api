import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'paver_erp', name: 'product_categories' })
export class ProductCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;
}