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

import com.ejercicioIntegrador.biblioteca.model.Libro;
import com.ejercicioIntegrador.biblioteca.service.LibroService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/libros")
public class LibroController {
	@Autowired
	private LibroService libroService;
	
	@GetMapping
	public List<Libro> listar(){
		return libroService.getAllLibros();
	}
	
	@GetMapping(path= {"/{id}"})
	public Libro listarId(@PathVariable("id") Integer id){
		return libroService.getLibroById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Libro l,@PathVariable("id") Integer id) {
		l.setId_libro(id);
		libroService.saveLibro(l);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		libroService.deleteLibroById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Libro l) {
		libroService.saveLibro(l);
	}
}
