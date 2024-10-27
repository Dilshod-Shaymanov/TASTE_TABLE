import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuCategoryService } from './menu_category.service';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';

@Controller('menu-category')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Get()
  findAll() {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCategoryService.remove(id);
  }
}
