import { TipoLibro } from "./tipoLibro";


export interface Libro{
    id_libro: number;
    titulo: string;
    tipo: TipoLibro;
    editorial: string;
    anyo: number;
    autor: string;
}

export interface LibroApi{
    id_libro?: number;
    titulo?: string;
    tipo?: TipoLibro;
    editorial?: string;
    anyo?: number;
    autor?: string;
}