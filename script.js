const charContainer = document.getElementById('char-container');
let isUplodaingFile = true;
let id = 0;
let currentCharacterDrag;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.addEventListener(eventName, e => e.preventDefault());
});


charContainer.addEventListener('dragstart', (e) => {
    isUplodaingFile = false;
    currentCharacterDrag = e.target;
});

charContainer.addEventListener('dragover', function (e) {
    if (!isUplodaingFile) {
       const character = movePreview(e, this);
       character.classList.add('preview');
    }
});

charContainer.addEventListener('drop', function (e) {
    if (!isUplodaingFile) {
        const character = moveCharacter(e, this);
        character.classList.remove('preview');
        isUplodaingFile = true;
    } else {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

});

function moveCharacter(e, parent) {
    if (e.target.tagName === 'IMG') {
        if (e.offsetX < 50) {
            return parent.insertBefore(currentCharacterDrag, e.target);
        }
        return parent.insertBefore(currentCharacterDrag, e.target.nextSibling);
    }
    
    return parent.appendChild(currentCharacterDrag);
}

function movePreview(e, parent) {
    if(e.target.dataset.id === `${currentCharacterDrag.dataset.id}`) {
        return e.target;
    }

    if (e.target.tagName === 'IMG') {
        if (e.offsetX < 50) {
            return parent.insertBefore(currentCharacterDrag, e.target);
        }
        return parent.insertBefore(currentCharacterDrag, e.target.nextSibling);
    }

    return parent.appendChild(currentCharacterDrag);
}


function handleFiles(files) {
    for (const file of files) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.className = 'character';
        img.draggable = true;
        img.dataset.id = id;
        id++;
        charContainer.appendChild(img);
    }
}

document.querySelectorAll('.tier-list-grid-container').forEach((carousel)=>{
    carousel.addEventListener('dragstart', (e) => {
        isUplodaingFile = false;
        currentCharacterDrag = e.target;
    });
    
    carousel.addEventListener('dragover', function (e) {
        if (!isUplodaingFile) {
           const character = movePreview(e, this);
           character.classList.add('preview');
        }
    });
    
    carousel.addEventListener('drop', function (e) {
        if (!isUplodaingFile) {
            const character = moveCharacter(e, this);
            character.classList.remove('preview');
            isUplodaingFile = true;
        } else {
            const files = e.dataTransfer.files;
            handleFiles(files);
        }
    
    });
}); 


document.querySelectorAll('.tier-info-container').forEach((element)=>{
    element.addEventListener('click', function (e) {
        
        e.preventDefault();
        const selection = window.getSelection();
        selection.removeAllRanges();

        const range = document.createRange();
        range.selectNodeContents(this.firstElementChild);  

        selection.addRange(range);
        this.firstElementChild.focus(); 
    });

    element.addEventListener('keydown', function (e) {
        // Prevenir la acción por defecto (escribir el carácter)
        e.preventDefault();

        // Convertir la tecla presionada a mayúsculas si es una letra
        let key = e.key;

        if (key.length === 1 && /[a-z]/i.test(key)) {
            key = key.toUpperCase();  // Convertir a mayúsculas
        }

        // Insertar la tecla en el contenido del textarea manualmente
        const start = this.firstElementChild.selectionStart;
        const end = this.firstElementChild.selectionEnd;
        const textContent  = this.firstElementChild.textContent ;
        console.log(textContent )

        // Actualizar el valor del textarea con la nueva tecla
        this.firstElementChild.textContent  = textContent .slice(0, start) + key + textContent .slice(end);

        // Restaurar la posición del cursor
        this.firstElementChild.setSelectionRange(start + 1, start + 1);
    });
})

