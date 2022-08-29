package com.ejercicioIntegrador.biblioteca.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

enum estadoCopia{
	PRESTADO,RETRASO,BIBLIOTECA,REPARACION
}

@Entity
@Table(name="copias")
public class Copia {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_copia;
	@Column
	private estadoCopia estado;
	@ManyToOne
	@JoinColumn 
	private Libro libro;
	
	public Copia() {}

	public Copia(Integer id_copia, estadoCopia estado, Libro libro) {
		this.id_copia = id_copia;
		this.estado = estado;
		this.libro = libro;
	}

	public Integer getId_copia() {
		return id_copia;
	}

	public void setId_copia(Integer id_copia) {
		this.id_copia = id_copia;
	}

	public estadoCopia getEstado() {
		return estado;
	}

	public void setEstado(estadoCopia estado) {
		this.estado = estado;
	}

	public Libro getLibro() {
		return libro;
	}

	public void setLibro(Libro libro) {
		this.libro = libro;
	}
	
	
}
