import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'paver_erp', name: 'units' })
@Unique('uq_units_name_symbol', ['name', 'symbol'])
export class Unit extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 20 })
  symbol!: string;

  @Column({ name: 'unit_type', type: 'varchar', length: 30 })
  unitType!: string;
}