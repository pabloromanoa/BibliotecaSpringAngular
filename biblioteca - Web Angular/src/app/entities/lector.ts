import { Multa } from "./multa";

export interface Lector{
    id_lector: number,
    nombre: string,
    telefono: string,
    direccion: string,
    multa?: Multa
}

export interface LectorApi{
    id_lector?: number,
    nombre: string,
    telefono: string,
    direccion: string,
    multa?: Multa
}