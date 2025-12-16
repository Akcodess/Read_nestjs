import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as http from 'http';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import PropertyService from './property/services/property.service';

/**
 * Application entry point
 */
/**
 * Main bootstrap function.
 */
async function bootstrap() {
  // Create Express instance and bridge it to Nest via ExpressAdapter
  const server = express();
  const adapter = new ExpressAdapter(server);
  /**
   * Create Nest application instance
   */
  // Create Nest application with AppModule
  const app = await NestFactory.create(AppModule, adapter);
  const httpServer = http.createServer(server);

  /**
   * Register global validation pipe
   */
  // Register global validation pipe (DTO validation + transformation)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
  /**
   * Register global exception filters
   */
  // Register global exception filters (extend to add custom filters as needed)
  app.useGlobalFilters();

  /**
   * Enable CORS for all routes
   */
  // Enable CORS across all routes
  app.enableCors();

  /**
   * Set global route prefix
   */
  // Set global route prefix for all controllers
  app.setGlobalPrefix(process.env.APPLICATION_NAME!);
  /**
   * Enable URI versioning
   */
  // Enable URI-based API versioning
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: process.env.APPLICATION__VERSION! });

  // Initialize Nest application
  await app.init();

  // CommonService initializes via OnModuleInit
  /**
   * Start HTTP server
   */
  // Start HTTP server on configured port
  httpServer.listen(PropertyService.getPort());
}
void bootstrap();
