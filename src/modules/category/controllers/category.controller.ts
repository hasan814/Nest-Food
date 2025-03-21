import { CategoryService } from '../services/category.service';
import { Controller } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

}
