package com.ejercicioIntegrador.biblioteca.model;

import java.util.List; 

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name="libros")
public class Libro {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_libro;
	@Column
	private String titulo;
	@Column
	private String editorial;
	@OneToOne
	private TipoLibro tipo;
	@Column
	private Integer anyo;
	@Column
	private String autor;
	
	@OneToMany(mappedBy="libro",targetEntity=Copia.class)
	private List<Copia> copias;

	
	public Libro() {}

	public Libro(Integer id_libro, String titulo, String editorial, TipoLibro tipo, Integer anyo, String autor) {
		super();
		this.id_libro = id_libro;
		this.titulo = titulo;
		this.editorial = editorial;
		this.tipo = tipo;
		this.anyo = anyo;
		this.autor = autor;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public Integer getId_libro() {
		return id_libro;
	}

	public void setId_libro(Integer id_libro) {
		this.id_libro = id_libro;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getEditorial() {
		return editorial;
	}

	public void setEditorial(String editorial) {
		this.editorial = editorial;
	}

	public TipoLibro getTipo() {
		return tipo;
	}

	public void setTipo(TipoLibro tipo) {
		this.tipo = tipo;
	}

	public Integer getAnyo() {
		return anyo;
	}

	public void setAnyo(Integer anyo) {
		this.anyo = anyo;
	}
	
	
	
}
