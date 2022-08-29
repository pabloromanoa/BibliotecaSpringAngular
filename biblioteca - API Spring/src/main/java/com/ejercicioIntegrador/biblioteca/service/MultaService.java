package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;

import com.ejercicioIntegrador.biblioteca.model.Multa;

public interface MultaService {
	List<Multa> getAllMultas();
	void saveMulta(Multa multa);
	Multa getMultaById(int id);
	void deleteMultaById(int id);
}
