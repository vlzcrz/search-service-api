import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Calificacion } from "./lista-calificacion.entity";
import { Restriccion } from "./lista-restricciom.entity";

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

    @Prop({ type: [Calificacion], default: [] })
    lista_calificacion: Calificacion[]

    @Prop({ type: [Restriccion], default: [] })
    lista_restriccion: Restriccion[]
    
}

export const SearchServiceSchema = SchemaFactory.createForClass(SearchService)