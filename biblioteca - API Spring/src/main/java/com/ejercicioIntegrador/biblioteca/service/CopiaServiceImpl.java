package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Copia;
import com.ejercicioIntegrador.biblioteca.repository.CopiaRepository;

@Service
public class CopiaServiceImpl implements CopiaService{
	
	@Autowired
	private CopiaRepository copiaRepository;
	
	@Override
	public List<Copia> getAllCopias() {
		return copiaRepository.findAll();
	}

	@Override
	public void saveCopia(Copia copia) {
		copiaRepository.save(copia);
		
	}

	@Override
	public Copia getCopiaById(int id) {
		Optional<Copia> optionalCopia = copiaRepository.findById(id);
		Copia copia = null;
		if(optionalCopia.isPresent()) {
			copia = optionalCopia.get();
		}else throw new RuntimeException("Copia no encontrada para id: "+id);
		return copia;
	}

	@Override
	public void deleteCopiaById(int id) {
		this.copiaRepository.deleteById(id);
		
	}

}
