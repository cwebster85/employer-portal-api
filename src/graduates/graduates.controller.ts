import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { GraduatesService } from './graduates.service';
import { CreateGraduateDto } from './dto/create-graduate.dto';
import { UpdateGraduateDto } from './dto/update-graduate.dto';

@ApiTags('graduates')
@Controller('graduates')
export class GraduatesController {
  constructor(private readonly graduatesService: GraduatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new graduate' })
  @ApiResponse({ status: 201, description: 'Graduate successfully created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createGraduateDto: CreateGraduateDto) {
    return this.graduatesService.create(createGraduateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all graduates' })
  @ApiResponse({ status: 200, description: 'List of graduates' })
  findAll(@Query() query: any) {
    return this.graduatesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single graduate by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Graduate found' })
  @ApiResponse({ status: 404, description: 'Graduate not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.graduatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a graduate by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Graduate updated' })
  @ApiResponse({ status: 404, description: 'Graduate not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGraduateDto: UpdateGraduateDto,
  ) {
    return this.graduatesService.update(id, updateGraduateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a graduate by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Graduate deleted successfully' })
  @ApiResponse({ status: 404, description: 'Graduate not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.graduatesService.remove(id);
  }
}
