import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MenuCategoryDocument = HydratedDocument<MenuCategory>;

@Schema({ versionKey: false })
export class MenuCategory {
  
  @Prop({ type: Map, of: String })
  name: Map<string, string>;

  @Prop()
  description: string;
}

export const MenuCategorySchema = SchemaFactory.createForClass(MenuCategory);
