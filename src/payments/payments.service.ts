import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Payment, PaymentDocument } from "./schemas/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.find();
  }

  findOne(id: string) {
    return this.paymentModel.findById(id);
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.findByIdAndUpdate(id, updatePaymentDto);
  }

  remove(id: string) {
    return this.paymentModel.findByIdAndDelete(id);
  }
}
