package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Libro;

public interface LibroService {
	List<Libro> getAllLibros();
	void saveLibro(Libro libro);
	Libro getLibroById(int id);
	void deleteLibroById(int id);
}
