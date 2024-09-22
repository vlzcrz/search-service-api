import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search-service.dto';
import { InsertSearchByGradeDto } from './dto/update-search-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchService, SearchServiceSchema } from './entities/search-service.entity';
import { InsertSearchByRestrictionDto } from './dto/update-search-restriction.dto';

@Injectable()
export class SearchServiceService {
  

  constructor(
    @InjectModel(SearchService.name)
    private SearchServiceModel: Model<SearchService>,
  ) {}

  async searchAll() {
    return await this.SearchServiceModel.find().exec()
  }

  async searchStudent(searchTerm: string) {
    const estudiantes = {
      $or: [
        { uuid_estudiante: { $regex: `^${searchTerm}`, $options: 'i' } },
        { nombre: { $regex: `^${searchTerm}`, $options: 'i' } }
      ]
    }

    const loadedSearch = await this.SearchServiceModel.find(estudiantes, {
      _id: 0,  
      __v: 0,  
      
    })
    .populate('lista_calificacion')
    .populate('lista_restriccion')
    .exec();

    if (!loadedSearch || loadedSearch.length === 0)
      throw new NotFoundException('No se encontró ningún estudiante con el término dado.');
    
    return loadedSearch;
  }

  async searchRestriction(searchTerm: string) {
    const students = await this.SearchServiceModel.find({
      $or: [
        { "lista_restriccion.uuid_restriccion": { $regex: `^${searchTerm}`, $options: 'i' } },
        { "lista_restriccion.razon": { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .exec();
  
    if (!students || students.length === 0) {
      throw new NotFoundException('No se encontraron estudiantes con la restricción especificada.');
    }
    
    // Filtrar las restricciones que coinciden
    const result = students.flatMap(student =>
      student.lista_restriccion
        .filter(restriction =>
          restriction.uuid_restriccion.match(new RegExp(`^${searchTerm}`, 'i')) || 
          restriction.razon.match(new RegExp(searchTerm, 'i'))
        )
        .map(restriction => ({
          uuid_estudiante: student.uuid_estudiante,
          nombre: student.nombre,
          apellido: student.apellido,
          correo: student.correo,
          uuid_restriccion: restriction.uuid_restriccion,
          razon: restriction.razon,
          fecha_creacion: restriction.fecha_creacion,
        }))
    );
  
    return result;
  

  }

  

  async getStudentsByGradeRange(min?: number, max?: number) {
    // Crear el filtro dinámico basado en los valores mínimo y máximo
    const query: any = {};

    if (min && max) {
      query['lista_calificacion.calificacion'] = { $gte: min, $lte: max };
    } else if (min) {
      query['lista_calificacion.calificacion'] = { $gte: min };
    } else if (max) {
      query['lista_calificacion.calificacion'] = { $lte: max };
    }

    const students = await this.SearchServiceModel.find(query).exec();

    if(!students || students.length === 0)
      throw new NotFoundException('No se encontraron notas segun los valores entregados')

    const result = students.map(student => {
      const matchingGrades = student.lista_calificacion.filter(grade => {
        if (min && max) {
          return grade.calificacion >= min && grade.calificacion <= max;
        } else if (min) {
          return grade.calificacion >= min;
        } else if (max) {
          return grade.calificacion <= max;
        }
      });

      return {
        uuid_estudiante: student.uuid_estudiante,
        nombre_completo: `${student.nombre} ${student.apellido}`,
        correo: student.correo,
        calificaciones: matchingGrades.map(grade => ({
          uuid_calificacion: grade.uuid_calificacion,
          asignatura: grade.asignatura,
          nombre_calificacion: grade.nombre_calificacion,
          calificacion: grade.calificacion,
          comentario: grade.comentario,
        })),
      };
    });

    return result;
  }


  async createSearch(createSearchServiceDto: CreateSearchDto) {
    const estudianteData = {
      ...createSearchServiceDto,
      lista_calificaciones: [],
      lista_restricciones: [],
    }
    const createdSearch = await this.SearchServiceModel.create(estudianteData)

    return createdSearch
  }

  

  async insertGradeSearch(updateSearchByGradeDto: InsertSearchByGradeDto) {
    const loadedSearch = await this.SearchServiceModel.findOne(
      {
        uuid_estudiante: { $eq: updateSearchByGradeDto.uuid_estudiante }
      }
    )
    if(!loadedSearch)
      throw new NotFoundException('No hay un documento asociado al uuid del estudiante recibido')

    const nuevaCalificacion = {
      uuid_calificacion: updateSearchByGradeDto.uuid_calificacion,
      asignatura: updateSearchByGradeDto.asignatura,
      calificacion: updateSearchByGradeDto.calificacion,
      nombre_calificacion: updateSearchByGradeDto.nombre_calificacion,
      comentario: updateSearchByGradeDto.comentario,
    }
    // Hacer push de la nueva calificación al arreglo lista_calificacion
    loadedSearch.lista_calificacion.push(nuevaCalificacion)
    // Guardar los cambios en la base de datos
    await loadedSearch.save();
    return loadedSearch;
    
  }

  async insertRestrictionSearch(updateRestrictionSearchDto: InsertSearchByRestrictionDto) {
    const loadedSearch = await this.SearchServiceModel.findOne({
      uuid_estudiante: updateRestrictionSearchDto.uuid_estudiante,
    });

    if (!loadedSearch) {
      throw new NotFoundException('No hay un documento asociado al uuid del estudiante recibido');
    }

    const nuevaRestriccion = {
      uuid_restriccion: updateRestrictionSearchDto.uuid_restriccion,
      razon: updateRestrictionSearchDto.razon,
      isActive: updateRestrictionSearchDto.isActive,
      fecha_creacion: updateRestrictionSearchDto.fecha_creacion,
    };

    loadedSearch.lista_restriccion.push(nuevaRestriccion);

    await loadedSearch.save();

    return loadedSearch;
  }



  async updateRestrictionSearch(updateRestrictionSearchDto: InsertSearchByRestrictionDto) {
    
    const updatedSearch = await this.SearchServiceModel.findOneAndUpdate(
      {
        uuid_estudiante: updateRestrictionSearchDto.uuid_estudiante, 
        "lista_restriccion.uuid_restriccion": updateRestrictionSearchDto.uuid_restriccion, 
      },
      {
        $set: {
          "lista_restriccion.$.isActive": false, 
        },
      },
      {
        new: true, 
      },
    );
  
    if (!updatedSearch) {
      throw new NotFoundException(
        'No se encontró un documento con el uuid del estudiante y la restricción especificada',
      );
    }
  
    return updatedSearch;

  }

  async updateGradeSearch(updateGradeSearchDto: InsertSearchByGradeDto) {
    const updatedSearch = await this.SearchServiceModel.findOneAndUpdate(
      {
        uuid_estudiante: updateGradeSearchDto.uuid_estudiante,
        "lista_calificacion.uuid_calificacion": updateGradeSearchDto.uuid_calificacion
      },
      {
        $set: {
          "lista_calificacion.$.calificacion": updateGradeSearchDto.calificacion,
          "lista_calificacion.$.nombre_calificacion": updateGradeSearchDto.nombre_calificacion,
          "lista_calificacion.$.asignatura": updateGradeSearchDto.asignatura,
          "lista_calificacion.$.comentario": updateGradeSearchDto.comentario
        }
      },
      {
        new: true,
      }
    )

    if(!updatedSearch)
      throw new NotFoundException('No se encontro un documento con el uuid_estudiante y el uuid_calificacion especificada')

    return updatedSearch
  }

}
