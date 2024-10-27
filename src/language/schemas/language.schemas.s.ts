import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ versionKey: false })
export class Language {
  @Prop()
  code: string;

  @Prop()
  name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
