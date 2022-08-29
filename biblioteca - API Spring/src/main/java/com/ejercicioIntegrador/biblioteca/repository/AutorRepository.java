package com.ejercicioIntegrador.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ejercicioIntegrador.biblioteca.model.Autor;

public interface AutorRepository extends JpaRepository<Autor,Integer>{

}
