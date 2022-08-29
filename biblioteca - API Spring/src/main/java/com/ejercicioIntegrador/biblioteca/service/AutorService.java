package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Autor;

public interface AutorService {
	List<Autor> getAllAutores();
	void saveAutor(Autor autor);
	Autor getAutorById(int id);
	void deleteAutorById(int id);
}
