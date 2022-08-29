package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Copia;

public interface CopiaService {
	List<Copia> getAllCopias();
	void saveCopia(Copia copia);
	Copia getCopiaById(int id);
	void deleteCopiaById(int id);
}
