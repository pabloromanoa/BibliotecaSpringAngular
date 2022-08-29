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

import com.ejercicioIntegrador.biblioteca.model.Prestamo;
import com.ejercicioIntegrador.biblioteca.service.PrestamoService;



@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/prestamos")
public class PrestamoController {
	@Autowired
	private PrestamoService prestamoService;
	
	@GetMapping
	public List<Prestamo> listar(){
		return prestamoService.getAllPrestamos();
	}
	
	@GetMapping(path= {"/{id}"})
	public Prestamo listarId(@PathVariable("id") Integer id){
		return prestamoService.getPrestamoById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Prestamo p,@PathVariable("id") Integer id) {
		p.setId_prestamo(id);
		prestamoService.savePrestamo(p);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		prestamoService.deletePrestamoById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Prestamo p) {
		prestamoService.savePrestamo(p);
	}
}
