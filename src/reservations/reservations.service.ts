import { Injectable } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Reservation } from "./schemas/reservation.schemas";
import { Model } from "mongoose";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationModel.create(createReservationDto);
  }

  findAll() {
    return this.reservationModel.find();
  }

  findOne(id: string) {
    return this.reservationModel.findById(id);
  }
  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationModel.findByIdAndUpdate(id, updateReservationDto);
  }

  remove(id: string) {
    return this.reservationModel.findByIdAndDelete(id);
  }
}
