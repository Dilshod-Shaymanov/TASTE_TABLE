import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schemas";

export type RestaurantDocument = HydratedDocument<Restaurant>;
@Schema({ versionKey: false })
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  photo: string;

  @Prop()
  working_time: string;

  @Prop()
  language_id: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tables",
      },
    ],
  })
  tables: Tables[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
