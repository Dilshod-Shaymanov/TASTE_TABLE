import { PartialType } from '@nestjs/swagger';
import { CreateWaiterDto } from './create-waiter.dto';

export class UpdateWaiterDto extends PartialType(CreateWaiterDto) {}
