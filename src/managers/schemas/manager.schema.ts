import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ManagerDocument = HydratedDocument<Manager>;
@Schema({ versionKey: false })
export class Manager {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  is_active: string;

  @Prop()
  hashed_refresh_token: string;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
