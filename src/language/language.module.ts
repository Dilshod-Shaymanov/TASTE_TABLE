import { Module } from "@nestjs/common";
import { LanguageService } from "./language.service";
import { LanguageController } from "./language.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Language, LanguageSchema } from "./schemas/language.schemas.s";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
