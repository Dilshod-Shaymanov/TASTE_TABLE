import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Client } from "../../client/schemas/client.shema";
import { Restaurant } from "../../restaurant/schemas/restaurant.schema";
import { Tables } from "../../tables/schemas/table.schemas";
import { Status } from "../../status/schemas/status.schemas";

export type ReservationDocument = HydratedDocument<Reservation>;
@Schema({ versionKey: false })
export class Reservation {
  @Prop()
  reservation_time: Date;

  @Prop()
  number_of_guests: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  })
  clientId: Client;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  })
  restaurantId: Restaurant;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tables",
  })
  tableId: Tables;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  })
  statusId: Status;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
