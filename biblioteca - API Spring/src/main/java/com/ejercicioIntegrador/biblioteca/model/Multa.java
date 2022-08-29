package com.ejercicioIntegrador.biblioteca.model;

import java.util.Date; 

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="multas")
public class Multa {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_multa;
	@OneToOne
	private Lector lector;
	@Column
	private Date fInicio;
	@Column
	private Date fFin;
	
	public Multa() {}
	
	
	
	public Multa(Integer id_multa, Lector lector, Date fInicio, Date fFin) {
		super();
		this.id_multa = id_multa;
		this.lector = lector;
		this.fInicio = fInicio;
		this.fFin = fFin;
	}



	public Date getfFin() {
		return fFin;
	}



	public void setfFin(Date fFin) {
		this.fFin = fFin;
	}



	public Integer getId_multa() {
		return id_multa;
	}
	public void setId_multa(Integer id_multa) {
		this.id_multa = id_multa;
	}
	public Lector getLector() {
		return lector;
	}
	public void setLector(Lector lector) {
		this.lector = lector;
	}
	public Date getfInicio() {
		return fInicio;
	}
	public void setfInicio(Date fInicio) {
		this.fInicio = fInicio;
	}
	
	
}
