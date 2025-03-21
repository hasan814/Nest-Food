import { CreateCategoryDto } from '../dto/category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

}
