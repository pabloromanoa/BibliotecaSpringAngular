package com.ejercicioIntegrador.biblioteca.service;

import java.util.List; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.TipoLibro;

import com.ejercicioIntegrador.biblioteca.repository.TipoLibroRepository;

@Service
public class TipoLibroServiceImpl implements TipoLibroService  {
	
	@Autowired
	private TipoLibroRepository tipoRepository;
	
	@Override
	public List<TipoLibro> getAllTipos() {
		return tipoRepository.findAll();
	}

	@Override
	public void saveTipoLibro(TipoLibro tipo) {
		tipoRepository.save(tipo);
		
	}

	@Override
	public TipoLibro getTipoLibroById(int id) {
		Optional<TipoLibro> optionalTipoLibro = tipoRepository.findById(id);
		TipoLibro tipo = null;
		if(optionalTipoLibro.isPresent()) {
			tipo = optionalTipoLibro.get();
		}else throw new RuntimeException("Tipo Libro no encontrado para id: "+id);
		return tipo;
	}

	@Override
	public void deleteTipoLibroById(int id) {
		this.tipoRepository.deleteById(id);
		
	}
	
}
