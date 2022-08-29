package com.ejercicioIntegrador.biblioteca.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejercicioIntegrador.biblioteca.model.Multa;
import com.ejercicioIntegrador.biblioteca.repository.MultaRepository;

@Service
public class MultaServiceImpl implements MultaService{
	
	@Autowired
	private MultaRepository multaRepository;
	
	
	@Override
	public List<Multa> getAllMultas() {
		return multaRepository.findAll();
	}

	@Override
	public void saveMulta(Multa multa) {
		multaRepository.save(multa);
		
	}

	@Override
	public Multa getMultaById(int id) {
		Optional<Multa> optionalMulta= multaRepository.findById(id);
		Multa multa = null;
		if(optionalMulta.isPresent()) {
			multa = optionalMulta.get();
		}else throw new RuntimeException("Multa no encontrada para id: "+id);
		return multa;
	}

	@Override
	public void deleteMultaById(int id) {
		this.multaRepository.deleteById(id);
		
	}

}
