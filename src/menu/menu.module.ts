import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Menu, MenuSchema } from "./schemas/menu.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Menu.name,
        schema: MenuSchema,
      },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
