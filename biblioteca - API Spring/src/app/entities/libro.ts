import { Autor } from "./autor";
import { tipoLibro } from "./const/tipoLibro";

export interface Libro{
    id: number,
    titulo: string,
    tipo: tipoLibro,
    editorial: string,
    anyo: number,
    autor: Autor,
    
}