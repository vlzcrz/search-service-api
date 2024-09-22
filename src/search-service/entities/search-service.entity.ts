import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ListaCalificacion } from "./lista-calificacion.entity";
import { ListaRestriccion } from "./lista-restricciom.entity";

@Schema()
export class SearchService extends Document {
    
    @Prop({
        unique: true,
        index: true
    })
    uuid_estudiante: string

    @Prop({
        index: true
    })
    nombre: string

    @Prop({
        index: true
    })
    apellido: string

    @Prop({
        index: true
    })
    correo: string

    @Prop([ListaCalificacion])
    lista_calificacion: ListaCalificacion[]

    @Prop([ListaRestriccion])
    lista_restriccion: ListaRestriccion[]

}

export const SearchServiceSchema = SchemaFactory.createForClass(SearchService)