import { Injectable } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Status } from "./schemas/status.schemas";
import { Model } from "mongoose";

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}
  create(createStatusDto: CreateStatusDto) {
    return this.statusModel.create(createStatusDto);
  }

  findAll() {
    return this.statusModel.find();
  }

  findOne(id: string) {
    return this.statusModel.findById(id);
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto);
  }

  remove(id: string) {
    return this.statusModel.findByIdAndDelete(id);
  }
}
