import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity({ schema: 'paver_erp', name: 'attendance' })
@Unique('uq_attendance_employee_date', ['employeeId', 'attendanceDate'])
@Check(
  'ck_attendance_status',
  `"status" IN ('present', 'absent', 'half_day', 'leave', 'holiday')`,
)
@Index('idx_attendance_date', ['attendanceDate'])
export class Attendance extends BaseEntity {
  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId!: string;

  @Column({ name: 'attendance_date', type: 'date' })
  attendanceDate!: string;

  @Column({ name: 'check_in', type: 'timestamptz', nullable: true })
  checkIn!: Date | null;

  @Column({ name: 'check_out', type: 'timestamptz', nullable: true })
  checkOut!: Date | null;

  @Column({ type: 'varchar', length: 30 })
  status!: string;

  @Column({ type: 'text', nullable: true })
  remarks!: string | null;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;
}