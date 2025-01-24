
        // Lista de libros
        const libros = [
            { id: 1, titulo: "Blancanieves", autor: "José Mauro de Vasconcelos", genero: "Novela", disponible: true },
            { id: 2, titulo: "La casa de papel", autor: "Álex Pina", genero: "Serie", disponible: true },
            { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", genero: "Fantasía", disponible: true }
        ];

        // Lista de libros prestados
        let librosPrestados = [];

        // Función para mostrar los libros disponibles
        function mostrarLibrosDisponibles() {
            const list = document.getElementById('availableBooksList');
            list.innerHTML = ''; // Limpiar la lista

            libros.filter(libro => libro.disponible).forEach(libro => {
                list.innerHTML += `
                    <li>
                        <strong>${libro.titulo}</strong><br>
                        Autor: ${libro.autor}<br>
                        Género: ${libro.genero}
                        <button onclick="reservarLibro(${libro.id})">Reservar</button>
                    </li>
                `;
            });
        }

        // Función para reservar un libro
        function reservarLibro(id) {
            const libro = libros.find(libro => libro.id === id);
            if (libro && libro.disponible) {
                libro.disponible = false;
                librosPrestados.push(libro);
                mostrarLibrosDisponibles();
                mostrarLibrosPrestados();
                enviarNotificacionReserva(libro);
                setTimeout(() => devolverLibro(id), 5000); // Simulación de tiempo de devolución (5 segundos)
            }
        }

        // Función para devolver un libro
        function devolverLibro(id) {
            const libro = librosPrestados.find(libro => libro.id === id);
            if (libro) {
                libro.disponible = true;
                librosPrestados = librosPrestados.filter(libro => libro.id !== id);
                mostrarLibrosDisponibles();
                mostrarLibrosPrestados();
                enviarNotificacionDevolucion(libro);
            }
        }

        // Función para mostrar los libros prestados
        function mostrarLibrosPrestados() {
            const list = document.getElementById('borrowedBooksList');
            list.innerHTML = ''; // Limpiar la lista

            librosPrestados.forEach(libro => {
                list.innerHTML += `
                    <li>
                        <strong>${libro.titulo}</strong><br>
                        Autor: ${libro.autor}<br>
                        Fecha de devolución: ${new Date().toLocaleString()}
                    </li>
                `;
            });
        }

        // Función para enviar notificación de reserva
        function enviarNotificacionReserva(libro) {
            const notifications = document.getElementById('notifications');
            notifications.innerHTML = `¡Reserva exitosa! El libro "${libro.titulo}" ha sido reservado.`;
        }

        // Función para enviar notificación de devolución
        function enviarNotificacionDevolucion(libro) {
            const notifications = document.getElementById('notifications');
            notifications.innerHTML = `¡Devolución exitosa! El libro "${libro.titulo}" ha sido devuelto.`;
        }

        // Función de filtrado de libros
        function filtrarLibros() {
            const searchInput = document.getElementById('searchInput').value;
            const librosFiltrados = libros.filter(libro => 
                libro.titulo === searchInput || 
                libro.autor === searchInput ||
                libro.genero === searchInput
            );

            const list = document.getElementById('availableBooksList');
            list.innerHTML = ''; // Limpiar la lista

            librosFiltrados.forEach(libro => {
                list.innerHTML += `
                    <li>
                        <strong>${libro.titulo}</strong><br>
                        Autor: ${libro.autor}<br>
                        Género: ${libro.genero}
                        <button onclick="reservarLibro(${libro.id})">Reservar</button>
                    </li>
                `;
            });
        }

        // Inicializar la lista de libros disponibles
        mostrarLibrosDisponibles();
