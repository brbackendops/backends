import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appservice: AppService) {}

  @Get('')
  async homeHandler(): Promise<string> {
    try {
      return 'Hello...!!';
    } catch (error) {}
  }
}
