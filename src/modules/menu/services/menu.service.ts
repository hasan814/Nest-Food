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


@Injectable({ scope: Scope.REQUEST })
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @Inject(REQUEST) private req: Request,
    private typeServoce: MenuTypeService,
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
    const supplierId = this.getUserId()
    const { name, description, discount, price, typeId } = foodDto
    if (!name || !description || typeof price !== 'number' || price < 0)
      throw new BadRequestException(BadRequestMessage.SomeThingWrong)
    if (discount < 0 || discount > 100)
      throw new BadRequestException(BadRequestMessage.DiscountErrro)
    if (!typeId || isNaN(typeId))
      throw new BadRequestException(BadRequestMessage.MenuError)
    const type = await this.typeServoce.findOnById(typeId)
    let imageUrl: string, imageKey: string
    try {
      const uploadResult = await this.s3Service.uploadFile(image, "menu-items")
      imageUrl = uploadResult.Location
      imageKey = uploadResult.Key
    } catch (error) {
      throw new InternalServerErrorException(BadRequestMessage.SomeThingWrong)
    }

    const newItem = this.menuRepository.create({
      name,
      price,
      discount,
      description,
      supplierId,
      typeId: type.id,
      image: imageUrl,
      key: imageKey
    })
    try {
      await this.menuRepository.save(newItem)
    } catch (error) {
      throw new InternalServerErrorException(BadRequestMessage.SomeThingWrong)
    }
    return { message: PublicMessage.Created }
  }
  async findAll() { }
  async findOne() { }
  async delete() { }
  async update() { }
}