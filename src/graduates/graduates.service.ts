import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateGraduateDto): Promise<Graduate> {
    try {
      const grad = this.graduateRepo.create({
        ...dto,
        portfolioUrl: dto.portfolioUrl ?? null,
      });

      return await this.graduateRepo.save(grad);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }



  async findAll(query: any): Promise<{ success: boolean; data: Graduate[] }> {
    const { skill, graduationYear } = query;

    const where: any = {};
    if (graduationYear) where.graduationYear = +graduationYear;

    const allGraduates = await this.graduateRepo.find();

    const filtered = allGraduates.filter((grad) => {
      return (
        (!skill || grad.skills.includes(skill)) &&
        (!graduationYear || grad.graduationYear === +graduationYear)
      );
    });

    const sorted = filtered.sort((a, b) => a.id - b.id);

    return {
      success: true,
      data: sorted,
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
    const result = await this.graduateRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Graduate with ID ${id} not found`);
    }
  }

}
