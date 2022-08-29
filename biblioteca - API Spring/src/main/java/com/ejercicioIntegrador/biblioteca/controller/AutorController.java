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

import com.ejercicioIntegrador.biblioteca.model.Autor;
import com.ejercicioIntegrador.biblioteca.service.AutorService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/autores")
public class AutorController {
	@Autowired
	private AutorService autorService;
	
	@GetMapping
	public List<Autor> listar(){
		return autorService.getAllAutores();
	}
	
	@GetMapping(path= {"/{id}"})
	public Autor listarId(@PathVariable("id") Integer id){
		return autorService.getAutorById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Autor a,@PathVariable("id") Integer id) {
		a.setId_autor(id);
		autorService.saveAutor(a);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		autorService.deleteAutorById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Autor a) {
		autorService.saveAutor(a);
	}
}
