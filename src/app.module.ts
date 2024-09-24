import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchServiceModule } from './search-service/search-service.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), SearchServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
