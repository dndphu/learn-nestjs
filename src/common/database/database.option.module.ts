import { Module } from '@nestjs/common';
import { MongodbConfigService } from './database.service/mongodb.config.service';
@Module({
  providers: [MongodbConfigService],
  exports: [MongodbConfigService],
  imports: [],
  controllers: [],
})
export class DatabaseOptionModule {}
