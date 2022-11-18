import { PartialType } from '@nestjs/mapped-types';
import { CreateSondaDto } from './create-sonda.dto';

export class UpdateSondaDto extends PartialType(CreateSondaDto) {
  id: number;
}
