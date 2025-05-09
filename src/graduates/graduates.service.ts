import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Graduate } from './entities/graduate.entity';
import { CreateGraduateDto } from './dto/create-graduate.dto';
import { UpdateGraduateDto } from './dto/update-graduate.dto';

@Injectable()
export class GraduatesService {
  constructor(
    @InjectRepository(Graduate)
    private readonly graduateRepo: Repository<Graduate>,
  ) { }

  async create(createGraduateDto: CreateGraduateDto): Promise<Graduate> {
    const graduate = this.graduateRepo.create(createGraduateDto);
    return this.graduateRepo.save(graduate);
  }

  async findAll(query: any): Promise<{ success: boolean; data: Graduate[] }> {
    const { skill, graduationYear } = query;

    const where: any = {};
    if (graduationYear) where.graduationYear = +graduationYear;

    const allGraduates = await this.graduateRepo.find();

    // Filter by skill manually, since 'skills' is likely an array column
    const filtered = allGraduates.filter((grad) => {
      return (
        (!skill || grad.skills.includes(skill)) &&
        (!graduationYear || grad.graduationYear === +graduationYear)
      );
    });

    return {
      success: true,
      data: filtered,
    };
  }

  async findOne(id: number): Promise<Graduate> {
    const graduate = await this.graduateRepo.findOneBy({ id });
    if (!graduate) {
      throw new NotFoundException(`Graduate with ID ${id} not found`);
    }
    return graduate;
  }


  async update(id: number, updateGraduateDto: UpdateGraduateDto): Promise<Graduate> {
    await this.graduateRepo.update(id, updateGraduateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.graduateRepo.delete(id);
  }
}
