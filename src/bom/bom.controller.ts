import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BomService } from './bom.service';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';

@Controller('bom')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  @Post()
  create(@Body() createBomDto: CreateBomDto) {
    return this.bomService.create(createBomDto);
  }

  @Get()
  findAll() {
    return this.bomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBomDto: UpdateBomDto) {
    return this.bomService.update(+id, updateBomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bomService.remove(+id);
  }
}
