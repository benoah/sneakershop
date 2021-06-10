import { baseUrl } from "../../settings/URL.js";
import { getToken } from "../../utils/storage.js";





export default function deleteButton(id) {
    const container = document.querySelector(".delete-container");
    container.innerHTML = `
    <br>
    <button type="button"  class="col-12 btn  btn-danger  delete">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function () {
        console.log(id);

        const doDelete = confirm("Are you sure you want to delete this?");
        console.log(doDelete);

        if (doDelete) {
            const url = baseUrl + "products/" + id;
            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/";

                console.log(json);
            } catch (error) {
                console.log(error);
            }
        }
    };
}

