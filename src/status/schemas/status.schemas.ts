import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Restaurant } from "../../restaurant/schemas/restaurant.schema";

export type StatusDocument = HydratedDocument<Status>;

@Schema({ versionKey: false })
export class Status {
  @Prop()
  name: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
