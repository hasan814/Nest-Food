import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { NotFoundMessage, PublicMessage } from "src/common/enums/message.enum";
import { MenuTypeDto, UploadMenuTypeDto } from "../dto/menu-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuTypeEntity } from "../entities/type.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";


@Injectable({ scope: Scope.REQUEST })
export class MenuTypeService {
  constructor(
    @InjectRepository(MenuTypeEntity) private typeRepository: Repository<MenuTypeEntity>,
    @Inject(REQUEST) private req: Request
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== 'number') {
      throw new Error("Unauthorized or invalid user");
    }
    return user.id;
  }

  async create(createDto: MenuTypeDto) {
    const id = this.getUserId()
    const type = this.typeRepository.create({
      title: createDto.title,
      supplierId: id
    })
    await this.typeRepository.save(type)
    return { message: PublicMessage.Created }
  }

  async findAll() {
    const id = this.getUserId()
    return await this.typeRepository.findAndCount({
      where: { supplierId: id },
      order: { id: "DESC" }
    })
  }

  async findOnById(id: number) {
    const supplierId = this.getUserId()
    const type = await this.typeRepository.findOneBy({ id, supplierId })
    if (!type) throw new NotFoundException(NotFoundMessage.TypeNotFound)
    return type
  }

  async remove(id: number) {
    await this.findOnById(id)
    await this.typeRepository.delete({ id })
    return { message: PublicMessage.Deleted }
  }

  async update(id: number, typeDto: UploadMenuTypeDto) {
    let type = await this.findOnById(id)
    const { title } = typeDto
    if (title) type.title = title
    await this.typeRepository.save(type)
    return { message: PublicMessage.Deleted }
  }
}