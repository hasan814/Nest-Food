import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  page: number
  @ApiPropertyOptional({ default: 1 })
  limit: number
}