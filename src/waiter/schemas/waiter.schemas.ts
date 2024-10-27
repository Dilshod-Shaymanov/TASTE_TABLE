import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tables } from "../../tables/schemas/table.schemas";

export type WaiterDocument = HydratedDocument<Waiter>;

@Schema({ versionKey: false })
export class Waiter {
  @Prop()
  full_name: string;

  @Prop()
  phone: string;

  @Prop()
  is_active: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tables",
  })
  table_id: Tables;
}

export const WaiterSchema = SchemaFactory.createForClass(Waiter);
