package com.ejercicioIntegrador.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ejercicioIntegrador.biblioteca.model.Libro;

public interface LibroRepository extends JpaRepository<Libro,Integer>{

}
