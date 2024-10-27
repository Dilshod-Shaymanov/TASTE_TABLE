import { Module } from "@nestjs/common";
import { WaiterService } from "./waiter.service";
import { WaiterController } from "./waiter.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Waiter, WaiterSchema } from "./schemas/waiter.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Waiter.name,
        schema: WaiterSchema,
      },
    ]),
  ],
  controllers: [WaiterController],
  providers: [WaiterService],
})
export class WaiterModule {}
