import { Module } from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { ManagersController } from "./managers.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Manager, ManagerSchema } from "./schemas/manager.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema,
      },
    ]),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
