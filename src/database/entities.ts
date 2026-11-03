import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Unit } from '../units/entities/unit.entity';
import { UnitConversion } from '../units/entities/unit-conversion.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { ProductCategory } from '../products/entities/product-category.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { Material } from '../materials/entities/material.entity';
import { BomVersion } from '../bom/entities/bom-version.entity';
import { BomLine } from '../bom/entities/bom-line.entity';

export const ERP_ENTITIES = [
  Role,
  User,
  Customer,
  Supplier,
  Employee,
  Attendance,
  Unit,
  UnitConversion,
  Warehouse,
  ProductCategory,
  Product,
  ProductVariant,
  Material,
  BomVersion,
  BomLine,
];