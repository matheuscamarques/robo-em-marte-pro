import { Injectable } from '@nestjs/common';
import { CreateSondaDto } from './dto/create-sonda.dto';
import { UpdateSondaDto } from './dto/update-sonda.dto';

@Injectable()
export class SondaService {
  create(createSondaDto: CreateSondaDto) {
    return 'This action adds a new sonda';
  }

  findAll() {
    return `This action returns all sonda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sonda`;
  }

  update(id: number, updateSondaDto: UpdateSondaDto) {
    return `This action updates a #${id} sonda`;
  }

  remove(id: number) {
    return `This action removes a #${id} sonda`;
  }
}
