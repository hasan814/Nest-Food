import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SupplierSignDto } from '../dto/supplier.dto';
import { SupplierService } from '../services/supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  signup(@Body() supplierSignDto: SupplierSignDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
