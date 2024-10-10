const upload_btn = document.getElementById('upload_btn');
const upload = document.getElementById('upload');
const docTag = ["Front-End", "Back-End", "Data Science","Full-Stack", "JavaScript", "HTML", "CSS", "Java", "Python", "SQL", "NoSQL",]

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

const main_img = document.querySelector('.main_img');
const img_name = document.querySelector('.img_name_container p');

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

async function checkTags(text_tag) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(docTag.includes(text_tag));
        }, 1000)
    })
}

function addTag(input, ul){
    const tag = document.getElementById(input);   
    const ul_tag = document.querySelector(ul);
    tag.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const text_tag = tag.value.trim()
            if (text_tag!== ''){
                const newtag = document.createElement('li');
                newtag.innerHTML = `${text_tag} <img src="./img/close-black.svg" alt="fechar" class="tag_item">`
                ul_tag.appendChild(newtag);
                tag.value = "";   
            }
        }
    })
    ul_tag.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag_item')){
            const li = event.target.parentElement;
            ul_tag.removeChild(li);
        }
    })
}

addTag('tag', '.tag_list');
addTag('search_input', '#search_tag ul');

