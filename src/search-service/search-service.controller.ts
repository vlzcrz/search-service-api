import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchServiceService } from './search-service.service';
import { CreateSearchDto } from './dto/create-search-service.dto';
import { InsertSearchByGradeDto } from './dto/update-search-grade.dto';
import { InsertSearchByRestrictionDto } from './dto/update-search-restriction.dto';

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

  @Get('/searchEstudiante/:termino')
  searchStudent(@Param('termino') searchTerm: string) {
    return this.searchServiceService.searchStudent(searchTerm);
  }

  @Get('/searchRestriccion/:termino')
  searchRestriction(@Param('termino') searchTerm: string) {
    return this.searchServiceService.searchRestriction(searchTerm)
  }

  @Get('/searchCalificacion')
  async findStudentsByGradeRange(
  @Query('min') min?: number,
  @Query('max') max?: number
  ) {
    return this.searchServiceService.getStudentsByGradeRange(min, max);
  }

  @Patch('/insertCalificacion')
  insertGradeSearch(@Body() insertGradeSearchDto: InsertSearchByGradeDto) {
    return this.searchServiceService.insertGradeSearch(insertGradeSearchDto);
  }

  @Patch('/insertRestriccion')
  insertRestrictionSearch(@Body() insertRestrictionSearchDto: InsertSearchByRestrictionDto ){
    return this.searchServiceService.insertRestrictionSearch(insertRestrictionSearchDto)
  }

  @Patch('/updateRestriccion')
  updateRestrictionSearch(@Body() updateRestrictionSearchDto: InsertSearchByRestrictionDto) {
    return this.searchServiceService.updateRestrictionSearch(updateRestrictionSearchDto)
  }

  @Patch('/updateCalificacion')
  updateGradeSearch(@Body() updateGradeSearchDto: InsertSearchByGradeDto) {
    return this.searchServiceService.updateGradeSearch(updateGradeSearchDto)
  }
  

}
