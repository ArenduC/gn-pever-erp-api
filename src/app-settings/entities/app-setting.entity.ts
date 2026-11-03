import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'paver_erp', name: 'app_settings' })
export class AppSetting extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  key!: string;

  @Column({ type: 'text', nullable: true })
  value!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;
}
