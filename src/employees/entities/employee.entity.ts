import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'paver_erp', name: 'employees' })
export class Employee extends BaseEntity {
  @Column({ name: 'employee_code', type: 'varchar', length: 50, nullable: true, unique: true })
  employeeCode!: string | null;

  @Column({ name: 'full_name', type: 'varchar', length: 200 })
  fullName!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  designation!: string | null;

  @Column({ name: 'joining_date', type: 'date', nullable: true })
  joiningDate!: string | null;

  @Column({ type: 'numeric', precision: 14, scale: 2, nullable: true })
  salary!: string | null;

  @Column({ type: 'text', nullable: true })
  address!: string | null;
}