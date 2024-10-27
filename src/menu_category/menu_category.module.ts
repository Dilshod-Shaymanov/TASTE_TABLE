import { Module } from "@nestjs/common";
import { MenuCategoryService } from "./menu_category.service";
import { MenuCategoryController } from "./menu_category.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  MenuCategory,
  MenuCategorySchema,
} from "./schemas/menu_category.schemas";
import {
  Language,
  LanguageSchema,
} from "../language/schemas/language.schemas.s";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MenuCategory.name,
        schema: MenuCategorySchema,
      },
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
