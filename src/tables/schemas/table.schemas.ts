import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Restaurant } from "../../restaurant/schemas/restaurant.schema";

export type TablesDocument = HydratedDocument<Tables>;

@Schema({ versionKey: false })
export class Tables {
  @Prop()
  number: string;

  @Prop()
  amount: number;

  @Prop()
  description: string;

  @Prop()
  qr_code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  })
  restaurant_id: Restaurant;
}

export const TablesSchema = SchemaFactory.createForClass(Tables);
