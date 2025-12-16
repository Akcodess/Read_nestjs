import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { CallModule } from './call/call.module';
import { DarkModule } from './dark/dark.module';
import { ExternalModule } from './external/external.module';
import { ExternalApiTestModule } from './external-api-test/external-api-test.module';
import { LeadsModule } from './leads/leads.module';
import { LightModule } from './light/light.module';
import { NucleusModule } from './nucleus/nucleus.module';
import { PropertyModule } from './property/property.module';
import { RealmModule } from './realm/realm.module';
import { GravityModule } from './gravity/gravity.module';
import { RtModule } from './rt/rt.module';
import { ScreenRecordingModule } from './screen-recording/screen-recording.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthenticationModule,
    CallModule,
    DarkModule,
    ExternalModule,
    ExternalApiTestModule,
    LeadsModule,
    LightModule,
    NucleusModule,
    PropertyModule,
    RealmModule,
    GravityModule,
    RtModule,
    ScreenRecordingModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
