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

import com.ejercicioIntegrador.biblioteca.model.Multa;
import com.ejercicioIntegrador.biblioteca.service.MultaService;



@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/multas")
public class MultaController {
	@Autowired
	private MultaService multaService;
	
	@GetMapping
	public List<Multa> listar(){
		return multaService.getAllMultas();
	}
	
	@GetMapping(path= {"/{id}"})
	public Multa listarId(@PathVariable("id") Integer id){
		return multaService.getMultaById(id);
	}
	
	@PutMapping(path= {"/{id}"})
	public void editar(@RequestBody Multa m,@PathVariable("id") Integer id) {
		m.setId_multa(id);
		multaService.saveMulta(m);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public void delete(@PathVariable("id") Integer id) {
		multaService.deleteMultaById(id);
	}
	
	@PostMapping
	public void agregar(@RequestBody Multa m) {
		multaService.saveMulta(m);
	}
}
