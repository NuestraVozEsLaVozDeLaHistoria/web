function includeHTML() {
    var elements = document.querySelectorAll("[include-html]");
    elements.forEach(elmnt => {
        let file = elmnt.getAttribute("include-html");
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error("Page not found.");
                    return response.text();
                })
                .then(data => {
                    elmnt.innerHTML = data;
                    elmnt.removeAttribute("include-html");
                })
                .catch(error => {
                    elmnt.innerHTML = error.message;
                });
        }
    });
}

// Función para cargar nuevas páginas dentro de #content sin recargar
function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error("Page not found.");
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => {
            document.getElementById("content").innerHTML = error.message;
        });
}

// Cargar automáticamente las secciones al inicio
document.addEventListener("DOMContentLoaded", () => {
    includeHTML();

    // Asignar evento a los botones de navegación
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-load")) {
            event.preventDefault(); // Evita que cambie la URL
            let page = event.target.getAttribute("data-page");
            loadPage(page);
        }
    });
});
