import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Calificacion {
    
    @Prop()
    uuid_calificacion: string

    @Prop({
        index: true
    })
    asignatura: string

    @Prop({
        type: Number,
        index: true,
    })
    calificacion: number

    @Prop()
    nombre_calificacion: string

    @Prop()
    comentario: string
    
}


export const CalificacionSchema = SchemaFactory.createForClass(Calificacion)