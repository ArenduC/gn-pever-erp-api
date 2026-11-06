import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';

// Replace with your actual Supabase JWT authentication guard.
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('materials')
@UseGuards(JwtAuthGuard)
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateMaterialDto,
    @Req() req: any,
  ) {
    return this.materialsService.create(
      dto,
      req.user.id,
    );
  }

  @Get()
  async findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }
}