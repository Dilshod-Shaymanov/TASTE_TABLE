import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Request, Response } from "express";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @Post("signin")
  async signIn(
    @Body() signInDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.adminSignIn(
      signInDto.email,
      signInDto.password,
      res
    );
  }

  @Post("signout/:id")
  async signOut(@Param("id") adminId: string, @Res() res: Response) {
    return this.adminService.adminSignOut(adminId, res);
  }

  @Post("refresh-token")
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.adminService.refreshToken(req, res);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
