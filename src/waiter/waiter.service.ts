import { Injectable } from "@nestjs/common";
import { CreateWaiterDto } from "./dto/create-waiter.dto";
import { UpdateWaiterDto } from "./dto/update-waiter.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Waiter } from "./schemas/waiter.schemas";
import { Model } from "mongoose";

@Injectable()
export class WaiterService {
  constructor(@InjectModel(Waiter.name) private waiterModel: Model<Waiter>) {}
  create(createWaiterDto: CreateWaiterDto) {
    return this.waiterModel.create(createWaiterDto);
  }

  findAll() {
    return this.waiterModel.find();
  }

  findOne(id: string) {
    return this.waiterModel.findById(id);
  }

  update(id: string, updateWaiterDto: UpdateWaiterDto) {
    return this.waiterModel.findByIdAndUpdate(id, updateWaiterDto);
  }

  remove(id: string) {
    return this.waiterModel.findByIdAndDelete(id);
  }
}
