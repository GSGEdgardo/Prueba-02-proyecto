const $d = document;
const $table = $d.querySelector(".crud-table");
const $title = $d.querySelector(".crud-title");
const $form = $d.querySelector(".crud-form");
const $template = $d.getElementById("crud-template").content;
const $fragment = $d.createDocumentFragment();

const getAll = async () => {
    try {
        let response = await axios.get("http://20.231.202.18:8000/api/form");
        let json = await response.data;

        json.forEach(element => {
            $template.querySelector(".code").textContent = element.code;
            $template.querySelector(".name").textContent = element.name;
            $template.querySelector(".description").textContent = element.description;
            $template.querySelector(".edit").dataset.id = element.id;
            $template.querySelector(".edit").dataset.code = element.code;
            $template.querySelector(".edit").dataset.name = element.name;
            $template.querySelector(".edit").dataset.description = element.description;
            $template.querySelector(".delete").dataset.id = element.id;

            let $clone = $d.importNode($template, true);

            $fragment.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragment);
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $table.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
}

$d.addEventListener("DOMContentLoaded", getAll);

$d.addEventListener("submit", async e =>{
    if(e.target===$form){
        e.preventDefault();

        if(!e.target.id.value){
            try {
                let opcion = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        code: e.target.code.value,
                        name: e.target.name.value,
                        description: e.target.description.value
                    })
                };
                let response = await axios("http://20.231.202.18:8000/api/form",opcion);
                let json = await response.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }else{
            try {
                let opcion ={
                    method: "PUT",
                    headers: {
                        "Content-type":"application/json;charset =utf-8"
                    },
                    data: json.stringify({
                        code: e.target.code.value,
                        name: e.target.name.value,
                        description: e.target.description.value
                    })
                };
                let response = await axios(`http://20.231.202.18:8000/api/form/${e.target.id.value}`, opcion);
                let json = await response.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }
})

$d.addEventListener("click", async e =>{
    if(e.target.matches(".edit")){
        $title.textContent = "Editar Producto"
        $form.code.value = e.target.dataset.code;
        $form.name.value = e.target.dataset.name;
        $form.description.value = e.target.dataset.description;
        $form.id.value = e.target.dataset.id;
    }
    if(e.target.matches(".delete")){
        let confirmacion = confirm("¿Estas seguro que deseas eliminar el elemento seleccionado?")
        if (confirmacion) {
            try {
                let opcion = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                };
                let response = await axios(`http://20.231.202.18:8000/api/form/${e.target.dataset.id}`,opcion);
                let json = await response.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }
})

$d.addEventListener("submit", async e => {
    e.preventDefault();
    if (e.target.classList.contains("crud-form")){
        const buscarTermino = e.target.querySelector(".light-table-filter").value.toLowerCase();
        
        const $filas = $table.querySelectorAll("tbody tr");
        $filas.forEach(($filas) =>{
            const $name = $filas.querySelector(".name");
            const $description = $filas.querySelector(".description");

            const name = $name.textContent.toLowerCase();
            const description = $description.textContent.toLowerCase();

            if (name.includes(buscarTermino) || description.includes(buscarTermino)) {
                $filas.style.display = "table-row";
            }else{
                $row.style.display = "none";
            }
        });
    }
});