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

import com.ejercicioIntegrador.biblioteca.model.Copia;
import com.ejercicioIntegrador.biblioteca.service.CopiaService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/copias")
public class CopiaController {
	@Autowired
	private CopiaService copiaService;
	
	@GetMapping
	public List<Copia> listar(){
		return copiaService.getAllCopias();
	}
	
	@GetMapping(path= {"/{id}"})
	public Copia listarId(@PathVariable("id") Integer id){
		return copiaService.getCopiaById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Copia c,@PathVariable("id") Integer id) {
		c.setId_copia(id);
		copiaService.saveCopia(c);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		copiaService.deleteCopiaById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Copia c) {
		copiaService.saveCopia(c);
	}
}