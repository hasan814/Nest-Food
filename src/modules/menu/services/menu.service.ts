import { BadRequestException, Inject, Injectable, InternalServerErrorException, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuEntity } from "../entities/menu.entity";
import { Repository } from "typeorm";
import { FoodDto } from "../dto/food.dto";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { MenuTypeService } from "./type.service";
import { BadRequestMessage, PublicMessage } from "src/common/enums/message.enum";
import { S3Service } from "src/modules/s3/s3.service";
import { MenuTypeEntity } from "../entities/type.entity";


@Injectable({ scope: Scope.REQUEST })
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @InjectRepository(MenuTypeEntity) private menuTypeRepository: Repository<MenuTypeEntity>,
    @Inject(REQUEST) private req: Request,
    private typeService: MenuTypeService,
    private s3Service: S3Service,
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== 'number') {
      throw new Error("Unauthorized or invalid user");
    }
    return user.id;
  }

  async create(foodDto: FoodDto, image: Express.Multer.File) {
    const supplierId = this.getUserId();

    if (!image) {
      throw new BadRequestException("Image file is required.");
    }
    const type = await this.typeService.findOnById(foodDto.typeId);
    let imageUrl: string, imageKey: string;
    try {
      const uploadResult = await this.s3Service.uploadFile(image, "menu-items");
      imageUrl = uploadResult.Location;
      imageKey = uploadResult.Key;
    } catch (error) {
      throw new InternalServerErrorException("Image upload failed.");
    }
    const newItem = this.menuRepository.create({
      ...foodDto,
      supplierId,
      image: imageUrl,
      key: imageKey,
      typeId: type.id,
    });
    try {
      await this.menuRepository.save(newItem);
    } catch (error) {
      throw new InternalServerErrorException("Failed to save menu item.");
    }
    return { message: PublicMessage.Created };
  }


  async findAll(supplierId: number) {
    return await this.menuTypeRepository.find({
      where: { supplierId },
      relations: { items: true }
    })
  }

  async findOne() { }
  async delete() { }
  async update() { }
}