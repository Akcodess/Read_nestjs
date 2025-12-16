import { Controller } from '@nestjs/common';
import PropertyService from '../services/property.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly service: PropertyService) {}
}
