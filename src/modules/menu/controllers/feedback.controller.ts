import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/common/utils/functions';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { FeedbackService } from '../services/feedback.service';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';

@Controller('feedback')
@ApiTags("Feedbakc")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3('image'))
  create(
    @Body() createMenuDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
