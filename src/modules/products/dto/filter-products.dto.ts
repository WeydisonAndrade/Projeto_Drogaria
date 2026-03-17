import { IsInt, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  activeIngredient?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @IsInt()
  @IsPositive()
  @Max(100)
  @IsOptional()
  limit: number = 20;
}

