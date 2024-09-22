import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Restriccion {

    @Prop()
    uuid_restriccion: string

    @Prop()
    razon: string

    @Prop()
    isActive: boolean

    @Prop()
    fecha_creacion: string
}


export const RestriccionSchema = SchemaFactory.createForClass(Restriccion)