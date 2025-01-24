
        class Libro {
            constructor(id, titulo, autor, genero) {
                this.id = id;
                this.titulo = titulo;
                this.autor = autor;
                this.genero = genero;
                this.fechaPrestamo = null;
            }
        }

        class Biblioteca {
            constructor() {
                this.librosDisponibles = [];
                this.librosPrestados = [];
            }

            agregarLibro(libro) {
                this.librosDisponibles.push(libro);
            }

            mostrarLibros() {
                const listaLibros = document.getElementById('lista-libros');
                listaLibros.innerHTML = ''; 

                this.librosDisponibles.forEach(libro => {
                    listaLibros.innerHTML += `<li>${libro.titulo} - ${libro.autor}</li>`;
                });
            }

            mostrarLibrosPrestados() {
                const listaLibrosPrestados = document.getElementById('lista-libros-prestados');
                listaLibrosPrestados.innerHTML = ''; // Limpiar lista

                // Modificar innerHTML para insertar libros prestados
                this.librosPrestados.forEach(libro => {
                    listaLibrosPrestados.innerHTML += `<li>${libro.titulo} - ${libro.autor} (Fecha de préstamo: ${libro.fechaPrestamo})</li>`;
                });
            }

            reservarLibro(nombre) {
                const libroEncontrado = this.librosDisponibles.filter(libro => libro.titulo === nombre)[0];
                if (libroEncontrado) {
                    this.librosDisponibles = this.librosDisponibles.filter(libro => libro.titulo !== nombre);
                    libroEncontrado.fechaPrestamo = new Date();
                    this.librosPrestados.push(libroEncontrado);
                    this.mostrarLibros();
                    this.mostrarLibrosPrestados();
                    this.enviarRecordatorio(libroEncontrado);
                } else {
                    console.log("El libro no está disponible.");
                }
            }

            devolverLibro(nombre) {
                const libroEncontrado = this.librosPrestados.filter(libro => libro.titulo === nombre)[0];
                if (libroEncontrado) {
                    this.librosPrestados = this.librosPrestados.filter(libro => libro.titulo !== nombre);
                    libroEncontrado.fechaPrestamo = null;
                    this.librosDisponibles.push(libroEncontrado);
                    this.mostrarLibros();
                    this.mostrarLibrosPrestados();
                } else {
                    console.log("El libro no está prestado.");
                }
            }

            enviarRecordatorio(libro) {
                setTimeout(() => {
                    alert(`Recordatorio: El libro "${libro.titulo}" debe ser devuelto. Fecha de préstamo: ${libro.fechaPrestamo}`);
                }, 5000); // 5 segundos de simulación
            }
        }

        const biblioteca = new Biblioteca();
        biblioteca.agregarLibro(new Libro(1, 'El Quijote', 'Miguel de Cervantes', 'Ficción'));
        biblioteca.agregarLibro(new Libro(2, '1984', 'George Orwell', 'Distopía'));
        biblioteca.agregarLibro(new Libro(3, 'Cien Años de Soledad', 'Gabriel García Márquez', 'Realismo Mágico'));

        biblioteca.mostrarLibros();

        // Evento de reserva de libro
        document.getElementById('boton-reservar').addEventListener('click', () => {
            const nombreLibro = document.getElementById('input-libro').value;
            biblioteca.reservarLibro(nombreLibro);
        });
