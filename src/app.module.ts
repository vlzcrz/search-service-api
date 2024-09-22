import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchServiceModule } from './search-service/search-service.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/search-service'), SearchServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
