import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientDocument = HydratedDocument<Client>;
@Schema({ versionKey: false })
export class Client {
  @Prop()
  name: string;

  @Prop()
  tg_link: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  is_active: string;

  @Prop()
  activation_link: string;

  @Prop()
  hashed_refresh_token: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
