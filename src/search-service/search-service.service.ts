import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search-service.dto';
import { UpdateSearchByGradeDto } from './dto/update-search-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchService, SearchServiceSchema } from './entities/search-service.entity';
import { UpdateSearchByRestrictionDto } from './dto/update-search-restriction.dto';

@Injectable()
export class SearchServiceService {
  

  constructor(
    @InjectModel(SearchService.name)
    private SearchServiceModel: Model<SearchService>,
  ) {}

  async createSearch(createSearchServiceDto: CreateSearchDto) {
    const estudianteData = {
      ...createSearchServiceDto,
      lista_calificaciones: [],
      lista_restricciones: [],
    }
    const createdSearch = await this.SearchServiceModel.create(estudianteData)

    return createdSearch
  }

  async searchAll() {
    return await this.SearchServiceModel.find().exec()
  }

  async searchByEstudiante(termino: string) {

  }

  async updateGradeSearch(updateSearchByGradeDto: UpdateSearchByGradeDto) {
    let loadedSearch = await this.SearchServiceModel.findOne(
      {
        uuid_estudiante: { $eq: updateSearchByGradeDto.uuid_estudiante }
      }
    )

    if(!loadedSearch)
      throw new NotFoundException('No hay un documento asociado al uuid del estudiante recibido')

    const nuevaCalificacion = this.SearchServiceModel.schema.path('lista_calificacion').cast({
      uuid_calificacion: updateSearchByGradeDto.uuid_calificacion,
      asignatura: updateSearchByGradeDto.asignatura,
      calificacion: updateSearchByGradeDto.calificacion,
      nombre_calificacion: updateSearchByGradeDto.nombre_calificacion,
      comentario: updateSearchByGradeDto.comentario,
    });

    // Hacer push de la nueva calificación al arreglo lista_calificacion
    loadedSearch.lista_calificacion.push(nuevaCalificacion);

    // Guardar los cambios en la base de datos
    await loadedSearch.save();

    return loadedSearch;
    
  }

  async updateRestrictionSearch(updateRestrictionSearchDto: UpdateSearchByRestrictionDto) {
    let loadedSearch = await this.SearchServiceModel.findOne(
      {
        uuid_estudiante: { $eq: updateRestrictionSearchDto.uuid_estudiante }
      }
    )

    if(!loadedSearch)
      throw new NotFoundException('No hay un documento asociado al uuid del estudiante recibido')

    const nuevaRestriccion= this.SearchServiceModel.schema.path('lista_restriccion').cast({
      uuid_restriccion: updateRestrictionSearchDto.uuid_restriccion,
      razon: updateRestrictionSearchDto.razon,
      isActive: updateRestrictionSearchDto.isActive,
      fecha_creacion: updateRestrictionSearchDto.fecha_creacion
    });

    // Hacer push de la nueva calificación al arreglo lista_calificacion
    loadedSearch.lista_restriccion.push(nuevaRestriccion);

    // Guardar los cambios en la base de datos
    await loadedSearch.save();

    return loadedSearch;
  }
}
