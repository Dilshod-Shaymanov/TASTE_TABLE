import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import { UpdateWaiterDto } from './dto/update-waiter.dto';

@Controller('waiter')
export class WaiterController {
  constructor(private readonly waiterService: WaiterService) {}

  @Post()
  create(@Body() createWaiterDto: CreateWaiterDto) {
    return this.waiterService.create(createWaiterDto);
  }

  @Get()
  findAll() {
    return this.waiterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waiterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaiterDto: UpdateWaiterDto) {
    return this.waiterService.update(id, updateWaiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waiterService.remove(id);
  }
}
