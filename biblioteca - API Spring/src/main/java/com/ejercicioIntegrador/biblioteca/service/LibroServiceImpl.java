package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Libro;
import com.ejercicioIntegrador.biblioteca.repository.LibroRepository;

@Service
public class LibroServiceImpl implements LibroService {
	
	@Autowired
	private LibroRepository libroRepository;
	
	@Override
	public List<Libro> getAllLibros() {
		return libroRepository.findAll();
	}

	@Override
	public void saveLibro(Libro libro) {
		libroRepository.save(libro);
		
	}

	@Override
	public Libro getLibroById(int id) {
		Optional<Libro> optionalLibro = libroRepository.findById(id);
		Libro libro = null;
		if(optionalLibro.isPresent()) {
			libro = optionalLibro.get();
		}else throw new RuntimeException("Libro no encontrada para id: "+id);
		return libro;
	}

	@Override
	public void deleteLibroById(int id) {
		this.libroRepository.deleteById(id);
		
	}

}
