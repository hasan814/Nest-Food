import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/message.enum';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';
import { DeepPartial, Repository } from 'typeorm';
import { isBoolean, toBoolean } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { S3Service } from 'src/modules/s3/s3.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service
  ) { }

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { Location, Key } = await this.s3Service.uploadFile(image, "food-image")
    let { title, slug, parentId, show } = createCategoryDto
    const category = await this.findOneBySlug(slug)
    if (category) throw new ConflictException(ConflictMessage.ItemAlreadyInBasket)
    if (isBoolean(show)) show = toBoolean(show)
    let parent: CategoryEntity | null = null
    if (parentId && !isNaN(parentId)) parent = await this.findOneById(+parentId)
    await this.categoryRepository.insert({ title, slug, show, image: Location, parentId: parent?.id, imageKey: Key })
    return { message: PublicMessage.CategoryCreated }
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File) {
    const { parentId, show, slug, title } = updateCategoryDto
    const category = await this.findOneById(id)
    console.log(category)
    const updateObject: DeepPartial<CategoryEntity> = {}
    if (image) {
      const { Location, Key } = await this.s3Service.uploadFile(image, 'food-image')
      if (Location) {
        updateObject['image'] = Location
        updateObject['imageKey'] = Key
        if (category?.imageKey) await this.s3Service.deleteFile(category?.imageKey)
      }
    }
    if (title) updateObject['title'] = title
    if (show && isBoolean(show)) updateObject['show'] = toBoolean(show)
    if (parentId && !isNaN(parseInt(parentId.toString()))) {
      const category = await this.findOneById(+parentId)
      if (!category) throw new NotFoundException(NotFoundMessage.NotFoundCategory)
      updateObject['parentId'] = category.id
    }
    if (slug) {
      const category = await this.categoryRepository.findOneBy({ slug })
      if (category && category.id !== id) throw new ConflictException(ConflictMessage.Exist)
      updateObject['slug'] = slug
    }
    await this.categoryRepository.update({ id }, updateObject)
    return { message: PublicMessage.Updated }
  }

  async remove(id: number) {
    await this.findOneById(id)
    await this.categoryRepository.delete({ id })
    return { message: PublicMessage.Deleted }
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: { children: true }
    })
    if (!category) throw new NotFoundException(NotFoundMessage.NotFoundCategory)
    return { category }
  }

}
