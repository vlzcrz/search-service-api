import { Module } from '@nestjs/common';
import { SearchServiceService } from './search-service.service';
import { SearchServiceController } from './search-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchService, SearchServiceSchema } from './entities/search-service.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: SearchService.name,
      schema: SearchServiceSchema
    }
  ])],
  controllers: [SearchServiceController],
  providers: [SearchServiceService],
})
export class SearchServiceModule {}
