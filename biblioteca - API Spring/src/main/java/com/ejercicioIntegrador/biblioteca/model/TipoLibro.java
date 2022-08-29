package com.ejercicioIntegrador.biblioteca.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tiposLibro")
public class TipoLibro {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_tipo;
	@Column
	private String descripcion;
	
	public TipoLibro() {
		
	}

	public TipoLibro(Integer id_tipo, String descripcion) {
		super();
		this.id_tipo = id_tipo;
		this.descripcion = descripcion;
	}

	public Integer getId_tipo() {
		return id_tipo;
	}

	public void setId_tipo(Integer id_tipo) {
		this.id_tipo = id_tipo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	
}
