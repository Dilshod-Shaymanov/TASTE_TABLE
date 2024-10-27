import { Injectable } from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Language, LanguageDocument } from "./schemas/language.schemas.s";
import { Model } from "mongoose";

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>
  ) {}
  create(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  findAll() {
    return this.languageModel.find();
  }

  findOne(id: string) {
    return this.languageModel.findById(id);
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.languageModel.findByIdAndUpdate(id);
  }

  remove(id: string) {
    return this.languageModel.findByIdAndDelete(id);
  }
}
