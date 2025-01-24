
        // Listamos los librs
        const libros = [
            { id: 1, titulo: "Blancanieves", autor: "José Mauro de Vasconcelos", genero: "Novela", disponible: true },
            { id: 2, titulo: "La casa de papel", autor: "Álex Pina", genero: "Serie", disponible: true },
            { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", genero: "Fantasía", disponible: true }
        ];

        // Creamos un arreglo de libros prestados
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

        // Funcion para la reserva del libro
        function reservarLibro(id) {
            const libro = libros.find(libro => libro.id === id); //Implementamos la funcion id para encontrar el libro segun el ID
            if (libro && libro.disponible) {
                libro.disponible = false;
                librosPrestados.push(libro); //Aqui agregamos el libro
                mostrarLibrosDisponibles();
                mostrarLibrosPrestados();
                enviarNotificacionReserva(libro);
                setTimeout(() => devolverLibro(id), 5000); // Aqwi implementamos el metodo setTimeOut
            }
        }

        // Aqui devolvemos el libro
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
        // Función para mostrar las listas de libros prestados
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

        function enviarNotificacionReserva(libro) {
            const notifications = document.getElementById('notifications');
            notifications.innerHTML = `Reserva exitosa  del libro: "${libro.titulo}"`;
        }

        // En estaaa función para enviar notificación de devolución
        function enviarNotificacionDevolucion(libro) {
            const notifications = document.getElementById('notifications');
            notifications.innerHTML = `El libro "${libro.titulo}" ha sido devuelto.`;
        }

        // Función de filtrado de libros
        function filtrarLibros() {
            const buscar = document.getElementById('buscar').value;
            const librosFiltrados = libros.filter(libro => 
                libro.titulo === buscar || 
                libro.autor === buscar ||
                libro.genero === buscar
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

        // Inicializamos la lista de libros disponibles en el html
        mostrarLibrosDisponibles();

