import { Lector } from "./lector";

export interface Multa{
    id_multa: number,
    lector: Lector,
    fInicio: Date,
    fFin: Date
}

export interface MultaApi{
    id_multa?: number,
    lector?: Lector,
    fInicio?: Date,
    fFin?: Date
}