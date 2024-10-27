import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Tables, TablesDocument } from "./schemas/table.schemas";
import { Model } from "mongoose";
import {
  Restaurant,
  RestaurantDocument,
} from "../restaurant/schemas/restaurant.schema";
import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class TablesService {
  @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>;
  @InjectModel(Restaurant.name)
  private restaurantModel: Model<RestaurantDocument>;

  async generateQrCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        "../public/qr-codes",
        `${fileName}.png`
      );
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      console.log(path.dirname(filePath));

      fs.writeFileSync(filePath, qrCodeBuffer);

      return filePath;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate or save Qr code");
    }
  }

  async create(createTableDto: CreateTableDto) {
    const { restaurant_id } = createTableDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException("This restaurant is not found");
    }
    const newTable = await this.tablesModel.create(createTableDto);
    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/api/menu`;
    const link = `${baseUrl}/${restaurant._id}/${newTable._id}`;

    await this.generateQrCodeFile(link, String(newTable._id));
    newTable.qr_code = link;
    await newTable.save();

    restaurant.tables.push(newTable);
    await restaurant.save();
    return newTable;
  }

  findAll() {
    return this.tablesModel.find().populate("restaurant_id");
  }

  findOne(id: string) {
    return this.tablesModel.findById(id);
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.tablesModel.findByIdAndUpdate(id);
  }

  remove(id: string) {
    return this.tablesModel.findByIdAndDelete(id);
  }
}
