import { ConflictException, Injectable } from '@nestjs/common';
import { isBoolean, toBoolean } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictMessage, PublicMessage } from 'src/common/enums/message.enum';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/modules/s3/s3.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service
  ) { }

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { Location } = await this.s3Service.uploadFile(image, "food-image")
    let { title, slug, show } = createCategoryDto
    const category = await this.findOneBySlug(slug)
    if (category) throw new ConflictException(ConflictMessage.categoryTitle)
    if (isBoolean(show)) show = toBoolean(show)
    await this.categoryRepository.insert({ title, slug, show, image: Location })
    return { message: PublicMessage.CreatedCategory }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({ slug })
  }

}
