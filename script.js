// Function to dynamically include HTML content from external files.
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

// Function to load a new page into the "content" element.
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

// Event listener to execute functions when the document is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    includeHTML();
    
    // Adds click event listener to buttons with class "btn-load" to dynamically load pages
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-load")) {
            event.preventDefault();
            let page = event.target.getAttribute("data-page");
            loadPage(page);
        }
    });
});
