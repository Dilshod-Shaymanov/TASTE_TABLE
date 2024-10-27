import { Module } from "@nestjs/common";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tables, TablesSchema } from "./schemas/table.schemas";
import {
  Restaurant,
  RestaurantSchema,
} from "../restaurant/schemas/restaurant.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tables.name,
        schema: TablesSchema,
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
