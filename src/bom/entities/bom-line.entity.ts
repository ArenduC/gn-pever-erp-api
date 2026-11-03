import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { BomVersion } from './bom-version.entity';
import { Material } from '../../materials/entities/material.entity';

@Entity({ schema: 'paver_erp', name: 'bom_lines' })
@Check(
  'ck_bom_line_values',
  '"quantity_per_unit" > 0 AND "wastage_percentage" >= 0',
)
export class BomLine extends BaseEntity {
  @Column({ name: 'bom_version_id', type: 'uuid' })
  bomVersionId!: string;

  @Column({ name: 'material_id', type: 'uuid' })
  materialId!: string;

  @Column({ name: 'quantity_per_unit', type: 'numeric', precision: 18, scale: 6 })
  quantityPerUnit!: string;

  @Column({ name: 'wastage_percentage', type: 'numeric', precision: 8, scale: 3, default: 0 })
  wastagePercentage!: string;

  @ManyToOne(() => BomVersion)
  @JoinColumn({ name: 'bom_version_id' })
  bomVersion!: BomVersion;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material!: Material;
}