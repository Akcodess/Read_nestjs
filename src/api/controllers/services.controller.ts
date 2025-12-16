import { Controller, Post } from '@nestjs/common';
import { ApiService } from '../services/api.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ApiService) {}

  @Post('signin')
  async serviceSignIn() {
    return { message: 'Not Implemented' };
  }

  @Post('signout')
  async serviceSignOut() {
    return { message: 'Not Implemented' };
  }
}

