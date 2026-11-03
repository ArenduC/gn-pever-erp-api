import {
  Entity,
  Column,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity({
  name: 'customers',
  schema: 'paver_erp',
})
@Index(['customerCode'], { unique: true })
export class Customer extends BaseEntity {
  @Column({
    name: 'customer_code',
    type: 'varchar',
    length: 50,
  })
  customerCode!: string;

  @Column({
    name: 'customer_name',
    type: 'varchar',
    length: 150,
  })
  customerName!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone!: string | null;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  email!: string | null;

  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
  })
  address!: string | null;
}