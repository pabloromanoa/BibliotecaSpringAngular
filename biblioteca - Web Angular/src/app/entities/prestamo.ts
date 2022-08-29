import { Copia } from "./copia";
import { Lector } from "./lector";

export interface Prestamo{
    id_prestamo: number,
    inicio: Date,
    fin: Date,
    lector: Lector,
    copia: Copia
}

export interface PrestamoApi{
    id_prestamo?: number,
    inicio?: Date,
    fin?: Date,
    lector?: Lector,
    copia?: Copia
}