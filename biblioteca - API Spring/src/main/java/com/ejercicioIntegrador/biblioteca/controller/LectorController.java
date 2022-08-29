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

import com.ejercicioIntegrador.biblioteca.model.Lector;
import com.ejercicioIntegrador.biblioteca.service.LectorService;



@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/lectores")
public class LectorController {
	@Autowired
	private LectorService lectorService;
	
	@GetMapping
	public List<Lector> listar(){
		return lectorService.getAllLectores();
	}
	
	@GetMapping(path= {"/{id}"})
	public Lector listarId(@PathVariable("id") Integer id){
		return lectorService.getLectorById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Lector l,@PathVariable("id") Integer id) {
		l.setId_lector(id);
		lectorService.saveLector(l);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		lectorService.deleteLectorById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Lector l) {
		lectorService.saveLector(l);
	}
}
