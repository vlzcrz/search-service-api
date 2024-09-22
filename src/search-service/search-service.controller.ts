import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchServiceService } from './search-service.service';
import { CreateSearchDto } from './dto/create-search-service.dto';
import { UpdateSearchByGradeDto } from './dto/update-search-grade.dto';
import { UpdateSearchByRestrictionDto } from './dto/update-search-restriction.dto';

@Controller('search')
export class SearchServiceController {
  constructor(private readonly searchServiceService: SearchServiceService) {}

  @Post()
  createSearch(@Body() createSearchServiceDto: CreateSearchDto) {
    console.log(createSearchServiceDto)
    return this.searchServiceService.createSearch(createSearchServiceDto);
  }

  @Get()
  searchAll() {
    return this.searchServiceService.searchAll();
  }

  @Get('/estudiante/:termino')
  searchByEstudiante(@Param('termino') termino: string) {
    return this.searchServiceService.searchByEstudiante(termino);
  }

  @Patch('/updateCalificacion')
  updateGradeSearch(@Body() updateGradeSearchDto: UpdateSearchByGradeDto) {
    return this.searchServiceService.updateGradeSearch(updateGradeSearchDto);
  }

  @Patch('/updateRestriccion')
  updateRestrictionSearch(@Body() updateRestrictionSearchDto: UpdateSearchByRestrictionDto ){
    return this.searchServiceService.updateRestrictionSearch(updateRestrictionSearchDto)
  }

}
