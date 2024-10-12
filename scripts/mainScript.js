import { addTag } from "./addTags.js";
const upload_btn = document.getElementById('upload_btn');
const upload = document.getElementById('upload');
const tag_list = document.querySelector('.tag_list')
const main_img = document.querySelector('.main_img');
const img_name = document.querySelector('.img_name_container p');

upload_btn.addEventListener('click', () => {
    upload.click();
})

function readFile(file){
    return new Promise( (resolve, reject) =>{
        const reader = new FileReader();
        reader.onload = () => {
            resolve({url: reader.result, name: file.name})
        }
        reader.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`)
        }
        reader.readAsDataURL(file)
    })
}

upload.addEventListener('change', async (event) => {
    console.log('chegou')
    const file = event.target.files[0];

    if (file) {
        try {
            const contentFile = await readFile(file);
            main_img.src = contentFile.url;
            img_name.textContent = contentFile.name;
        } catch (erro) {
            console.error('Erro da leitura do arquivo')
        }
    }
})
addTag('tag', '.tag_list','error_tag');
addTag('search_input', '#search_tag ul', 'search_error');
async function publicProject(name, description, tagsList) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const allRight = Math.random() > 0.5;

            if (allRight){
                resolve("Projeto publicado.")
            }else{
                reject("Erro ao publicar.")
            }
        }, 1000)
    })   
}
const public_button = document.getElementById('public');
public_button.addEventListener('click', async (event) =>{
    event.preventDefault();
    const projectName = document.getElementById('name').value;
    const projectDescription = document.getElementById('description').value;
    const projectTags = Array.from(tag_list.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const result = await publicProject(projectName, projectDescription, projectTags);
        console.log(result);
        alert('funcionou');
    }catch(error) {
        console.log('Deu errado: ', error);
        alert('deu errado, olhar console');
    }
})
const trashButton = document.getElementById('delete');
trashButton.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    form.reset();
    main_img.src = './img/imagem1.png';
    img_name.textContent = "image_projeto.png";
    tag_list.innerHTML = '';
})
