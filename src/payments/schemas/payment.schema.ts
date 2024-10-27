import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Restaurant } from "../../restaurant/schemas/restaurant.schema";
import { Reservation } from "../../reservations/schemas/reservation.schemas";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ versionKey: false })
export class Payment {
  @Prop()
  payment_method: string;

  @Prop()
  amount: number;

  @Prop()
  payment_status: string;

  @Prop()
  currency: string;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
  })
  reservation_id: Reservation;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
