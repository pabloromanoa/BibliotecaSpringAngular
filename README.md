# BibliotecaSpringAngular

Mi proyecto de una pagina web de un sistema de Gestion de prestamos con Multas para una Biblioteca.
Se compone de una API REST desarrollada con Spring-Java, un entorno web desarrollado con Angular con TypeScript,
y una base de datos local MySQL.

----------------------------------------------------------------------------------------------------------------------------

Se desarrolló siguiendo la siguiente lógica:
Biblioteca
	Una biblioteca tiene copias de libros. Estos últimos se caracterizan por su nombre, tipo (novela, teatro, poesía, ensayo), editorial, año y autor.
	Los autores se caracterizan por su nombre, nacionalidad y fecha de nacimiento.
	Cada copia tiene un identificador, y puede estar en la biblioteca, prestada, con retraso o en reparación.
	Los lectores pueden tener un máximo de 3 libros en préstamo.
	Cada libro se presta un máximo de 30 días, por cada día de retraso, se impone una “multa” de dos días sin posibilidad de coger un nuevo libro.
