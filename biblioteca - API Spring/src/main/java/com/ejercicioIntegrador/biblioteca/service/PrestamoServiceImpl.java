package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Prestamo;
import com.ejercicioIntegrador.biblioteca.repository.PrestamoRepository;

@Service
public class PrestamoServiceImpl implements PrestamoService {

	@Autowired
	private PrestamoRepository prestamoRepository;
	
	@Override
	public List<Prestamo> getAllPrestamos() {
		return prestamoRepository.findAll();
	}

	@Override
	public void savePrestamo(Prestamo prestamo) {
		prestamoRepository.save(prestamo);
		
	}

	@Override
	public Prestamo getPrestamoById(int id) {
		Optional<Prestamo> optionalPrestamo = prestamoRepository.findById(id);
		Prestamo prestamo = null;
		if(optionalPrestamo.isPresent()) {
			prestamo = optionalPrestamo.get();
		}else throw new RuntimeException("Prestamo no encontrado para id: "+id);
		return prestamo;
	}

	@Override
	public void deletePrestamoById(int id) {
		this.prestamoRepository.deleteById(id);
		
	}

}
