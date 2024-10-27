import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type MenuDocument = HydratedDocument<Menu>;
@Schema({ versionKey: false })
export class Menu {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  image_url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuCategory",
  })
  menucategoryId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  })
  restaurantId: mongoose.Schema.Types.ObjectId;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
