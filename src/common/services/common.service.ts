import { Injectable, OnModuleInit } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { messages } from '../constants/messages.constant';
import PropertyService from '../../property/services/property.service';
import { DarkService } from '../../dark/dark.service';
import { RealmService } from '../../realm/realm.service';
import { NucleusService } from '../../nucleus/nucleus.service';
import { GravityService } from '../../gravity/gravity.service';
import { LightService } from '../../light/light.service';

@Injectable()
export class CommonService implements OnModuleInit {
  constructor(private readonly logger: LoggerService) { }

  /**
   * Initializes CommonService and its dependencies.
   * Sets up logging, loads properties, and starts subordinate services.
   */
  async init() {
    try {
      this.logger.for('CommonService').info(messages.commonService.Init);
      await this.initServices();
    } catch (ex) {
      this.logger.for('CommonService').error(messages.commonService.InitError, { error: ex });
    }
  }

  /**
   * Initialize all dependent services.
   * Extend this method to initialize caches, queues, and clients.
   */
  private async initServices(): Promise<void> {
    // Initialize the PropertyService to load application properties
    PropertyService.init(this.logger.for('PropertyService'));

    // Initialize the LoggerService with the application properties
    this.logger.init(PropertyService.getApplicationProperties().logAppender);
    
    // Initialize the Dark service with the logger
    DarkService.init(this.logger.for('DarkService'));

    // Initialize the Realm service with the logger
    RealmService.init(this.logger.for('RealmService'));

    // Initialize the Nucleus service with the logger
    NucleusService.init(this.logger.for('NucleusService'));

    // Initialize the Gravity service with the logger
    GravityService.init(this.logger.for('GravityService'));

    // Initialize the Light service with the logger
    LightService.init(this.logger.for('LightService'));
  }

  /**
   * Nest lifecycle hook. Invokes `init()` when the module initializes.
   */
  async onModuleInit(): Promise<void> {
    await this.init();
  }
}
