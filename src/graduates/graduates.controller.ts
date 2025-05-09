import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GraduatesService } from './graduates.service';
import { CreateGraduateDto } from './dto/create-graduate.dto';
import { UpdateGraduateDto } from './dto/update-graduate.dto';

@Controller('graduates')
export class GraduatesController {
  constructor(private readonly graduatesService: GraduatesService) { }

  @Post()
  create(@Body() createGraduateDto: CreateGraduateDto) {
    return this.graduatesService.create(createGraduateDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.graduatesService.findAll(query);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graduatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGraduateDto: UpdateGraduateDto) {
    return this.graduatesService.update(+id, updateGraduateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graduatesService.remove(+id);
  }
}
