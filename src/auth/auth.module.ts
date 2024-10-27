import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientModule } from "../client/client.module";
import { ManagersModule } from "../managers/managers.module";
import { ClientAuthController } from "./client.auth.controller";
import { ManagerAuthController } from "./manager.auth.controller";

@Module({
  imports: [ClientModule, ManagersModule],
  controllers: [ClientAuthController, ManagerAuthController],
  providers: [AuthService],
})
export class AuthModule {}
