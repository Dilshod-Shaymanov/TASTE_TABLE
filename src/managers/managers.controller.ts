import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";

@Controller("managers")
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Get()
  findOne(id: string) {
    return this.managersService.findById(id);
  }
  @Get()
  findByEmail(email: string) {
    return this.managersService.findByEmail(email);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.managersService.remove(id);
  }
}
