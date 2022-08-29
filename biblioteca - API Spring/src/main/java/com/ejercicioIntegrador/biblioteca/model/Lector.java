package com.ejercicioIntegrador.biblioteca.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="lectores")
public class Lector {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_lector;
	@Column
	private String nombre;
	@Column
	private String telefono;
	@Column
	private String direccion;
	
	public Lector() {
		
	}

	public Lector(Integer id_lector, String nombre, String telefono, String direccion, Multa multa) {
		this.id_lector = id_lector;
		this.nombre = nombre;
		this.telefono = telefono;
		this.direccion = direccion;
	}

	public Integer getId_lector() {
		return id_lector;
	}

	public void setId_lector(Integer id_lector) {
		this.id_lector = id_lector;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	
	
	
}
