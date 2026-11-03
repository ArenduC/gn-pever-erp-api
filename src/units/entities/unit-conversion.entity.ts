import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Unit } from './unit.entity';

@Entity({ schema: 'paver_erp', name: 'unit_conversions' })
@Unique('uq_unit_conversion', ['fromUnitId', 'toUnitId'])
@Check('"conversion_factor" > 0')
export class UnitConversion extends BaseEntity {
  @Column({ name: 'from_unit_id', type: 'uuid' })
  fromUnitId!: string;

  @Column({ name: 'to_unit_id', type: 'uuid' })
  toUnitId!: string;

  @Column({
    name: 'conversion_factor',
    type: 'numeric',
    precision: 18,
    scale: 6,
  })
  conversionFactor!: string;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'from_unit_id' })
  fromUnit!: Unit;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'to_unit_id' })
  toUnit!: Unit;
}