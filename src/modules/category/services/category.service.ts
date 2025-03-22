import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/message.enum';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { isBoolean, toBoolean } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/modules/s3/s3.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service
  ) { }

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { Location } = await this.s3Service.uploadFile(image, "food-image")
    let { title, slug, parentId, show } = createCategoryDto
    const category = await this.findOneBySlug(slug)
    if (category) throw new ConflictException(ConflictMessage.categoryTitle)
    if (isBoolean(show)) show = toBoolean(show)
    let parent: CategoryEntity | null = null
    if (parentId && !isNaN(parentId)) parent = await this.findOneById(+parentId)
    await this.categoryRepository.insert({ title, slug, show, image: Location, parentId: parent?.id })
    return { message: PublicMessage.CreatedCategory }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto.page, paginationDto.limit)
    const [categories, count] = await this.categoryRepository.findAndCount({
      where: {},
      relations: { parent: true },
      select: { parent: { title: true } },
      skip,
      take: limit,
      order: { id: "DESC" }
    })
    return {
      categories,
      ...paginationGenerator(count, page, limit),
    };
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw new NotFoundException(NotFoundMessage.NotFoundCategory)
    return category
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({ slug })
  }

}
