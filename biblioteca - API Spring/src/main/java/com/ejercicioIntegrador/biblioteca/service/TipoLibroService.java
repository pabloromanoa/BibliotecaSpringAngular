package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.TipoLibro;

public interface TipoLibroService {
	List<TipoLibro> getAllTipos();
	void saveTipoLibro(TipoLibro tipo);
	TipoLibro getTipoLibroById(int id);
	void deleteTipoLibroById(int id);
}
