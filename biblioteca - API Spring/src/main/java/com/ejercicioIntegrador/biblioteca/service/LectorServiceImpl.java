package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Lector;
import com.ejercicioIntegrador.biblioteca.repository.LectorRepository;

@Service
public class LectorServiceImpl implements LectorService {

	@Autowired
	private LectorRepository lectorRepository;
	
	@Override
	public List<Lector> getAllLectores() {
		return lectorRepository.findAll();
	}

	@Override
	public void saveLector(Lector lector) {
		lectorRepository.save(lector);
		
	}

	@Override
	public Lector getLectorById(int id) {
		Optional<Lector> optionalLector = lectorRepository.findById(id);
		Lector lector = null;
		if(optionalLector.isPresent()) {
			lector = optionalLector.get();
		}else throw new RuntimeException("Lector no encontrado para id: "+id);
		return lector;
	}

	@Override
	public void deleteLectorById(int id) {
		this.lectorRepository.deleteById(id);
		
	}

}
