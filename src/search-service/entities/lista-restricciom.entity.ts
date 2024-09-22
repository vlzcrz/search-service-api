import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class ListaRestriccion extends Document {

    @Prop()
    uuid_restriccion: string

    @Prop()
    razon: string

    @Prop()
    isActive: boolean

    @Prop()
    fecha_creacion: string
}