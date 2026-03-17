import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20'
  ) {
    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const limitNumber = Number(limit) > 0 && Number(limit) <= 100 ? Number(limit) : 20;

    return this.productsService.findAll(pageNumber, limitNumber);
  }

  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('active_ingredient') activeIngredientParam?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20'
  ) {
    const filter: FilterProductsDto = {
      name,
      category,
      activeIngredient: activeIngredientParam,
      page: Number(page) > 0 ? Number(page) : 1,
      limit: Number(limit) > 0 && Number(limit) <= 100 ? Number(limit) : 20
    };

    return this.productsService.search(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

