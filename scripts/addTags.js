const docTag = ["Front-End", "Back-End", "Data Science","Full-Stack", "JavaScript", "HTML", "CSS", "Java", "Python", "SQL", "NoSQL",]

function similarCheck(tag){
    return tag.replace(/-/g,' ').trim().toLowerCase();
}

async function checkTags(text_tag) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const similartext = similarCheck(text_tag);
            const foundTag = docTag.find(tag => similarCheck(tag) === similartext);
            resolve(foundTag || null);
        }, 1)
    })
}

export function addTag(input, ul, error){
    const tag = document.getElementById(input);   
    const ul_tag = document.querySelector(ul);
    tag.addEventListener('keypress', async (event) => {
        if (event.key === "Enter") {
            const errorAlert = document.getElementById(error);
            errorAlert.style.display = 'none';
            event.preventDefault();
            const text_tag = tag.value.trim()
            if (text_tag!== ''){
                try {
                    const tag_inDoc = await checkTags(text_tag);
                    if(tag_inDoc){
                        const newtag = document.createElement('li');
                        newtag.innerHTML = `<p>${tag_inDoc}<p> <img src="./img/close-black.svg" alt="fechar" class="tag_item">`
                        ul_tag.appendChild(newtag);
                        tag.value = "";
                        ul_tag.style.display = 'flex';
                    } else {
                        // alert("Tag não encontrada.");
                        errorAlert.style.display = 'block'
                    }
                }catch (error) {
                    console.error("Erro ao verificar a existencia da tag");
                    alert("Erro ao verificar a tag.");
                }
            }
            tag.value = '';
        }
    })
    ul_tag.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag_item')){
            const li = event.target.closest('li');
            ul_tag.removeChild(li);
        }
    })
}