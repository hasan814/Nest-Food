import { FoodDto, UploadFoodDto } from "../dto/food.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuTypeService } from "./type.service";
import { MenuTypeEntity } from "../entities/type.entity";
import { MenuEntity } from "../entities/menu.entity";
import { Repository } from "typeorm";
import { S3Service } from "src/modules/s3/s3.service";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";

import {
  Scope,
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";

import {
  AuthMessage,
  PublicMessage,
  NotFoundMessage,
  InternalServerMessage,
} from "src/common/enums/message.enum";

@Injectable({ scope: Scope.REQUEST })
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,

    @InjectRepository(MenuTypeEntity)
    private menuTypeRepository: Repository<MenuTypeEntity>,

    @Inject(REQUEST) private req: Request,
    private typeService: MenuTypeService,
    private s3Service: S3Service
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") {
      throw new Error(AuthMessage.LoginAgain);
    }
    return user.id;
  }

  async create(foodDto: FoodDto, image: Express.Multer.File) {
    const supplierId = this.getUserId();
    const { name, description, discount, price, typeId } = foodDto;

    const type = await this.typeService.findOnById(typeId);
    let imageUrl: string,
      imageKey: string;

    try {
      const uploadResult = await this.s3Service.uploadFile(
        image,
        "menu-items"
      );
      imageUrl = uploadResult.Location;
      imageKey = uploadResult.Key;
    } catch (error) {
      throw new InternalServerErrorException(InternalServerMessage.DatabaseError);
    }

    const newItem = this.menuRepository.create({
      name,
      price,
      discount,
      description,
      supplierId,
      typeId: type.id,
      image: imageUrl,
      key: imageKey,
    });

    try {
      await this.menuRepository.save(newItem);
    } catch (error) {
      throw new InternalServerErrorException(InternalServerMessage.DatabaseError);
    }

    return { message: PublicMessage.Created };
  }

  async findAll(supplierId: number) {
    return await this.menuTypeRepository.find({
      where: { supplierId },
      relations: { items: true },
    });
  }

  async checkExist(id: number) {
    const supplierId = this.getUserId();
    const item = await this.menuRepository.findOneBy({ id, supplierId });
    if (!item)
      throw new NotFoundException(NotFoundMessage.NotFoundCategory);
    return item;
  }

  async findOne(id: number) {
    const supplierId = this.getUserId();
    const item = await this.menuRepository.findOne({
      where: { id, supplierId },
      relations: { type: true, feedbacks: { user: true } },
      select: {
        type: { title: true },
        feedbacks: {
          comment: true,
          created_at: true,
          socre: true,
          user: { first_name: true, last_name: true },
        },
      },
    });
    if (!item)
      throw new NotFoundException(NotFoundMessage.NotFoundCategory);
    return item;
  }

  async delete(id: number) {
    await this.checkExist(id);
    await this.menuRepository.delete({ id });
    return { message: PublicMessage.Deleted };
  }

  async update(
    id: number,
    foodDto: UploadFoodDto,
    image?: Express.Multer.File
  ) {
    const item = await this.checkExist(id);
    const { name, description, discount, price, typeId } = foodDto;

    if (typeId && !isNaN(typeId)) {
      const type = await this.typeService.findOnById(typeId);
      item.typeId = type.id;
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (typeof price === "number" && price >= 0) item.price = price;
    if (typeof discount === "number" && discount >= 0 && discount <= 100)
      item.discount = discount;

    if (image) {
      try {
        const uploadResult = await this.s3Service.uploadFile(
          image,
          "menu-items"
        );
        item.image = uploadResult.Location;
        item.key = uploadResult.Key;
      } catch (error) {
        throw new InternalServerErrorException(InternalServerMessage.UpdateFailed);
      }
    }

    try {
      await this.menuRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException(InternalServerMessage.DatabaseError);
    }

    return { message: PublicMessage.Updated };
  }
}