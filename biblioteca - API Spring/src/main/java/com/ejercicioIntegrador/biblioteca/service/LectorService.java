package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Lector;

public interface LectorService {
	List<Lector> getAllLectores();
	void saveLector(Lector lector);
	Lector getLectorById(int id);
	void deleteLectorById(int id);
}
