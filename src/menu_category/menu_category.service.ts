import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMenuCategoryDto } from "./dto/create-menu_category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu_category.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  MenuCategory,
  MenuCategoryDocument,
} from "./schemas/menu_category.schemas";
import { Model } from "mongoose";
import {
  Language,
  LanguageDocument,
} from "../language/schemas/language.schemas.s";

@Injectable()
export class MenuCategoryService {
  @InjectModel(MenuCategory.name)
  private menuCategoryModel: Model<MenuCategoryDocument>;
  @InjectModel(Language.name) private languageModel: Model<LanguageDocument>;

  async create(createMenuCategoryDto: CreateMenuCategoryDto) {
    const menu_category = await this.menuCategoryModel.findById(
      createMenuCategoryDto.id
    );
    const language = await this.languageModel.findById(
      createMenuCategoryDto.languageId
    );

    if (!language) {
      throw new NotFoundException("Bunday til topilmadi");
    }

    return this.menuCategoryModel.create(createMenuCategoryDto);
  }

  findAll() {
    return this.menuCategoryModel.find();
  }

  findOne(id: string) {
    return this.menuCategoryModel.findById(id);
  }

  async update(id: string, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    const lang = await this.languageModel.findById(
      updateMenuCategoryDto.languageId
    );

    return this.menuCategoryModel.findByIdAndUpdate(
      id,
      {
        ["name_" + lang.code]: updateMenuCategoryDto.value,
      },
      { new: true, strict: false }
    );
  }

  remove(id: string) {
    return this.menuCategoryModel.findByIdAndDelete(id);
  }
}
