import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return this.customerRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async create(data: Partial<Customer>, userId: string) {
    const customer = this.customerRepository.create({
      ...data,
      createdBy: userId,
    });

    return this.customerRepository.save(customer);
  }

  async update(
    id: string,
    data: Partial<Customer>,
    userId: string,
  ) {
    const customer = await this.findOne(id);

    Object.assign(customer, data, {
      updatedBy: userId,
    });

    return this.customerRepository.save(customer);
  }

  async deactivate(id: string, userId: string) {
    const customer = await this.findOne(id);

    customer.isActive = false;
    customer.updatedBy = userId;

    return this.customerRepository.save(customer);
  }
}
