import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Client, ClientDocument } from "./schemas/client.shema";
import { Model } from "mongoose";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>
  ) {}
  create(createClientDto: CreateClientDto) {
    return this.clientModel.create(createClientDto);
  }

  findAll() {
    return this.clientModel.find();
  }

  findById(id: string) {
    return this.clientModel.findById(id);
  }

  finByEmail(email: string) {
    return this.clientModel.findOne({ email: email });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id);
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
