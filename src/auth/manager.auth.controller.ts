import { Body, Controller, Param, Post, Req, Res } from "@nestjs/common";
import { CreateManagerDto } from "../managers/dto/create-manager.dto";
import { AuthService } from "./auth.service";
import { ManagerSigInDto } from "./dto/manager_sigin.dto";
import { Request, Response } from "express";

@Controller("auth/manager")
export class ManagerAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async managerSignUp(
    @Body() createManagerDto: CreateManagerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.managerSignUp(createManagerDto, res);
  }

  @Post("signin")
  async managerSignIn(
    @Body() managerSignInDto: ManagerSigInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.managerSignIn(managerSignInDto, res);
  }

  @Post("signout/:id")
  async managerSignOut(@Param("id") managerId: string, @Res() res: Response) {
    return this.authService.managerSignOut(managerId, res);
  }

  @Post("refresh")
  async managerRefreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
