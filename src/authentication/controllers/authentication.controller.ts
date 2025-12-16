import { Controller } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}
}
