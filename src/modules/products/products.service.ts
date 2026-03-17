import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { price, cost, margin, ...rest } = createProductDto;

    const finalMargin =
      margin ??
      (price != null && cost != null && !price.isZero()
        ? price.minus(cost).dividedBy(price).multipliedBy(100)
        : undefined);

    const data: Prisma.ProductCreateInput = {
      ...rest,
      price,
      cost,
      margin: finalMargin
    };

    return this.prisma.product.create({ data });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.product.count()
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  async search(filter: FilterProductsDto) {
    const { page, limit, name, category, activeIngredient } = filter;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      AND: [
        name
          ? {
              name: {
                contains: name,
                mode: 'insensitive'
              }
            }
          : {},
        category
          ? {
              category: {
                contains: category,
                mode: 'insensitive'
              }
            }
          : {},
        activeIngredient
          ? {
              activeIngredient: {
                contains: activeIngredient,
                mode: 'insensitive'
              }
            }
          : {}
      ]
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.ensureExists(id);

    const { price, cost, margin, ...rest } = updateProductDto;

    let finalMargin = margin;

    if (price != null && cost != null && !price.isZero()) {
      finalMargin = price.minus(cost).dividedBy(price).multipliedBy(100);
    }

    const data: Prisma.ProductUpdateInput = {
      ...rest,
      ...(price != null && { price }),
      ...(cost != null && { cost }),
      ...(finalMargin != null && { margin: finalMargin })
    };

    return this.prisma.product.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    await this.prisma.product.delete({
      where: { id }
    });

    return { success: true };
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true }
    });

    if (!exists) {
      throw new NotFoundException('Produto não encontrado');
    }
  }
}

