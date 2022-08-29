package com.ejercicioIntegrador.biblioteca.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejercicioIntegrador.biblioteca.model.TipoLibro;
import com.ejercicioIntegrador.biblioteca.service.TipoLibroService;


@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/tipos")
public class TipoLibroController {
	
	@Autowired
	private TipoLibroService tipoService;
	
	@GetMapping
	public List<TipoLibro> listar(){
		return tipoService.getAllTipos();
	}
	
	@GetMapping(path= {"/{id}"})
	public TipoLibro listarId(@PathVariable("id") Integer id){
		return tipoService.getTipoLibroById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody TipoLibro p,@PathVariable("id") Integer id) {
		p.setId_tipo(id);
		tipoService.saveTipoLibro(p);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		tipoService.deleteTipoLibroById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody TipoLibro p) {
		tipoService.saveTipoLibro(p);
	}
}

