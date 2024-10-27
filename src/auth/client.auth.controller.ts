import { Controller, Post, Body, Res, Param, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateClientDto } from "../client/dto/create-client.dto";
import { Request, Response } from "express";
import { ClientSignInDto } from "./dto/client_sign_ip.dot";

@Controller("auth/client")
export class ClientAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async clientSignUp(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.clientSignUp(createClientDto, res);
  }

  @Post("signin")
  async clientSignIn(
    @Body() clientSignInDto: ClientSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.clientSignIn(clientSignInDto, res);
  }

  @Post("signout/:id")
  async clientSignOut(@Param("id") clientId: string, @Res() res: Response) {
    return this.authService.clientSignOut(clientId, res);
  }

  @Post("refresh")
  async clientRefreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

}
