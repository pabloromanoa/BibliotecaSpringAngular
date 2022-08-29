import { estadoCopia } from "./const/estadoCopia";
import { Libro } from "./libro";

export interface Copia{
    id_copia: number,
    estado: estadoCopia,
    libro: Libro,
}

export interface CopiaApi{
    id_copia?: number,
    estado?: estadoCopia,
    libro?: Libro,
}