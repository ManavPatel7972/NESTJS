import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    console.log('ENV =', this.configService.get('APP_NAME'));
    return `Hello From`;
  }
}
