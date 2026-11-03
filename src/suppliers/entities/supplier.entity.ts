import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'paver_erp', name: 'suppliers' })
@Index('idx_suppliers_name', ['name'])
export class Supplier extends BaseEntity {
  @Column({ name: 'supplier_code', type: 'varchar', length: 50, nullable: true, unique: true })
  supplierCode!: string | null;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ name: 'gst_number', type: 'varchar', length: 30, nullable: true })
  gstNumber!: string | null;

  @Column({
    name: 'opening_balance',
    type: 'numeric',
    precision: 14,
    scale: 2,
    default: 0,
  })
  openingBalance!: string;
}