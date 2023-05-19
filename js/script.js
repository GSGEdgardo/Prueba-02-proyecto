const $d = document;
const $table = $d.querySelector(".crud-table");
const $title = $d.querySelector(".crud-title");
const $form = $d.querySelector(".crud-form");
const $template = $d.getElementById("crud-template").content;
const $API_URL = 'http://20.231.202.18:8000/api/form';
const $fragment = $d.createDocumentFragment();

const getAll = async () => {
    try {
        let response = await axios.get($API_URL);
        let json = await response.data;

        json.forEach(element => {
            $template.querySelector(".code").textContent = element.code;
            $template.querySelector(".name").textContent = element.name;
            $template.querySelector(".description").textContent = element.description;
            $template.querySelector(".edit").dataset.id = element.id;
            $template.querySelector(".edit").dataset.codigo = element.code;
            $template.querySelector(".edit").dataset.nombre = element.name;
            $template.querySelector(".edit").dataset.descripcion = element.description;
            $template.querySelector(".delete").dataset.id = element.id;

            let $clone = $d.importNode($template, true);

            $fragment.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragment);
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $table.insertAdjacentElement("afterend", `Error: ${error.status}: ${message}`);
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
                    headers: {"Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        codigo: e.target.codigo.value,
                        nombre: e.target.nombre.value,
                        descripcion: e.target.descripcion.value
                    })
                };
                let response = await axios($API_URL,opcion);
                let json = await response.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrió un error";
                $table.insertAdjacentElement("afterend", `Error: ${error.status}: ${message}`);
            }
        }else{
            let opcion ={
                method: "PUT",
                headers: {
                    "Content-type":"application/json;charset =utf-8"
                },
                data: json.stringify({
                    codigo: e.target.codigo.value,
                    nombre: e.target.nombre.value,
                    descripcion: e.target.descripcion.value
                })
            };
            let response = await axios($API_URL, opcion);
            let json = await response.data;
            location.reload();
        }
    }
})

$d.addEventListener("click", async e =>{
    if(e.target.matches(".edit")){
        $title.textContent = "Editar Producto"
        $form.codigo.value = e.target.dataset.code;
        $form.nombre.value = e.target.dataset.name;
        $form.description.value = e.target.dataset.description;
        $form.id.value = e.target.dataset.id;
    }
    if(e.target.matches(".delete")){

    }
})

