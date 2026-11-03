import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity({ schema: 'paver_erp', name: 'materials' })
@Index('idx_materials_name', ['name'])
@Check('"minimum_stock" >= 0 AND "purchase_price" >= 0')
export class Material extends BaseEntity {
  @Column({ name: 'material_code', type: 'varchar', length: 50, nullable: true, unique: true })
  materialCode!: string | null;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId!: string | null;

  @Column({ name: 'minimum_stock', type: 'numeric', precision: 14, scale: 3, default: 0 })
  minimumStock!: string;

  @Column({ name: 'purchase_price', type: 'numeric', precision: 14, scale: 2, default: 0 })
  purchasePrice!: string;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'unit_id' })
  unit!: Unit | null;
}