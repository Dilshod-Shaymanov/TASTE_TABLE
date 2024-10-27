import { Injectable } from "@nestjs/common";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Manager, ManagerDocument } from "./schemas/manager.schema";
import { Model } from "mongoose";

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>
  ) {}
  create(createManagerDto: CreateManagerDto) {
    return this.managerModel.create(createManagerDto);
  }

  findAll() {
    return this.managerModel.find();
  }

  findById(id: string) {
    return this.managerModel.findById(id);
  }

  findByEmail(email: string) {
    return this.managerModel.findOne({ email: email });
  }

  update(id: string, updateManagerDto: UpdateManagerDto) {
    return this.managerModel.findByIdAndDelete(id);
  }

  remove(id: string) {
    return this.managerModel.findByIdAndUpdate(id);
  }
}
