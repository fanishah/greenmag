import { Controller, Get, Body } from '@nestjs/common';
import { ToptenService } from './topten.service';
import { ToptenDto } from './dto/topten.dto';

@Controller('topten')
export class ToptenController {
  constructor(private readonly toptenService: ToptenService) {}
  @Get()
  TopTen() {
    return this.toptenService.toptenPost();
  }
}
