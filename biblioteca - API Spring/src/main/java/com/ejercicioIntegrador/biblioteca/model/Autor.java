package com.ejercicioIntegrador.biblioteca.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="autores")
public class Autor {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_autor;
	@Column
	private String nombre;
	@Column
	private String nacionalidad;
	@Column
	private Date fechaNacimiento;
	
	public Autor() {

	}

	public Autor(Integer id_autor, String nombre, String nacionalidad, Date fechaNacimiento) {
		this.id_autor = id_autor;
		this.nombre = nombre;
		this.nacionalidad = nacionalidad;
		this.fechaNacimiento = fechaNacimiento;
	}

	public Integer getId_autor() {
		return id_autor;
	}

	public void setId_autor(Integer id_autor) {
		this.id_autor = id_autor;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getNacionalidad() {
		return nacionalidad;
	}

	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	
	
	
	
}
