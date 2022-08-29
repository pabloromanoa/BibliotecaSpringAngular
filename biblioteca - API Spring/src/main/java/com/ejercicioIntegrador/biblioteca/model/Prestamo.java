package com.ejercicioIntegrador.biblioteca.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="prestamos")
public class Prestamo {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_prestamo;
	@Column
	private Date inicio;
	@Column
	private Date fin;
	@OneToOne
	@JoinColumn
	private Lector lector;
	@OneToOne
	@JoinColumn
	private Copia copia;
	
	public Prestamo() {}

	public Prestamo(Integer id_prestamo, Date inicio, Date fin, Lector lector, Copia copia) {
		this.id_prestamo = id_prestamo;
		this.inicio = inicio;
		this.fin = fin;
		this.lector = lector;
		this.copia = copia;
	}

	public Integer getId_prestamo() {
		return id_prestamo;
	}

	public void setId_prestamo(Integer id_prestamo) {
		this.id_prestamo = id_prestamo;
	}

	public Date getInicio() {
		return inicio;
	}

	public void setInicio(Date inicio) {
		this.inicio = inicio;
	}

	public Date getFin() {
		return fin;
	}

	public void setFin(Date fin) {
		this.fin = fin;
	}

	public Lector getLector() {
		return lector;
	}

	public void setLector(Lector lector) {
		this.lector = lector;
	}

	public Copia getCopia() {
		return copia;
	}

	public void setCopia(Copia copia) {
		this.copia = copia;
	}
	
	
	
}
