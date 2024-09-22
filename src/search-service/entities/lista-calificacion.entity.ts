import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class ListaCalificacion extends Document {
    
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
