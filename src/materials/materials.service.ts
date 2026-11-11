import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Material } from './entities/material.entity';
import { Unit } from '../units/entities/unit.entity';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,

    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async create(
    dto: CreateMaterialDto,
    userId: string,
  ): Promise<Material> {

    // 1. Check whether unit exists and is active.
    const unit = await this.unitRepository.findOne({
      where: {
        id: dto.unitId,
        isActive: true,
      },
    });

    if (!unit) {
      throw new NotFoundException(
        'Selected measurement unit does not exist or is inactive',
      );
    }

    // 2. Check duplicate material code if supplied.
    if (dto.materialCode) {
      const existingMaterial =
        await this.materialRepository.findOne({
          where: {
            materialCode: dto.materialCode,
          },
        });

      if (existingMaterial) {
        throw new ConflictException(
          'Material code already exists',
        );
      }
    }

    // 3. Prepare material entity.
    const material = this.materialRepository.create({
      materialCode: dto.materialCode ?? null,
      name: dto.name,
      unitId: dto.unitId,

      minimumStock: String(dto.minimumStock ?? 0),
      purchasePrice: String(dto.purchasePrice ?? 0),

      isActive: true,

      createdBy: userId,
      updatedBy: null,
      submittedBy: null,
    });

    // 4. Save material.
    try {
      return await this.materialRepository.save(material);
    } catch (error) {
      // PostgreSQL unique constraint violation.
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException(
          'Material code already exists',
        );
      }

      throw error;
    }
  }

  // 5. Get all active materials.
  async findAll(): Promise<Material[]> {
    return this.materialRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  // 6. Get material by ID.
  async findOne(id: string): Promise<Material> {
    console.log('Finding material with ID:', id);
    const material = await this.materialRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }
}