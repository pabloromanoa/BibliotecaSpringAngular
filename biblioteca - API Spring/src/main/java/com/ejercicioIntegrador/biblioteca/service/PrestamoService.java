package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Prestamo;

public interface PrestamoService {
	List<Prestamo> getAllPrestamos();
	void savePrestamo(Prestamo prestamo);
	Prestamo getPrestamoById(int id);
	void deletePrestamoById(int id);
}
