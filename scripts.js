const upload_btn = document.getElementById('upload_btn');
const upload = document.getElementById('upload');

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
    const file = event.target.file[0];

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