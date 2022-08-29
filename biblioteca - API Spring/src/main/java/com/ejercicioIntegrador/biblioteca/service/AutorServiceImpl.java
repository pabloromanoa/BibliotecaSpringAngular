package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Autor;
import com.ejercicioIntegrador.biblioteca.repository.AutorRepository;

@Service
public class AutorServiceImpl implements AutorService {

	@Autowired
	private AutorRepository autorRepository;
	
	@Override
	public List<Autor> getAllAutores() {
		return autorRepository.findAll();
	}

	@Override
	public void saveAutor(Autor autor) {
		autorRepository.save(autor);
		
	}

	@Override
	public Autor getAutorById(int id) {
		Optional<Autor> optionalAutor = autorRepository.findById(id);
		Autor autor = null;
		if(optionalAutor.isPresent()) {
			autor = optionalAutor.get();
		}else throw new RuntimeException("Autor no encontrado para id: "+id);
		return autor;
	}

	@Override
	public void deleteAutorById(int id) {
		this.autorRepository.deleteById(id);
		
	}
	
}
