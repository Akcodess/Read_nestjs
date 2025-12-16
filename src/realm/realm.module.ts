import { Module } from '@nestjs/common';
import { RealmController } from './realm.controller';
import { RealmService } from './realm.service';

@Module({
  controllers: [RealmController],
  providers: [RealmService],
  exports: [RealmService],
})
export class RealmModule {}
