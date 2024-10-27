import { Injectable } from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Menu, MenuDocument } from "./schemas/menu.schemas";
import { Model } from "mongoose";

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}
  create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  findAll() {
    return this.menuModel.find().populate("restaurantId menucategoryId");
  }

  findOne(id: string) {
    return this.menuModel.findById(id);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.menuModel.findByIdAndUpdate(id);
  }

  remove(id: string) {
    return this.menuModel.findByIdAndDelete(id);
  }
}
