const onCipher = _=>{
    const text = document.getElementById('text').value;
    const key = document.getElementById('key').value;
    if(!text || !key) return;
    if(hasDuplicates(key)){
        alert('La clave tiene caracteres repetidos');
        return;
    }
    const mat = fillMatrizFromTextPlain(text,key);
    document.getElementById('ciphered').value = cipher(mat,key);
    
}
const onDecipher = _ =>{
    const text = document.getElementById('ciphered').value;
    const key = document.getElementById('key').value;

    if(!text || !key) return;
    if(hasDuplicates(key)){
        alert('La clave tiene caracteres repetidos');
        return;
    }
    const matrix = fillMatrizFromCipheredText(text,key);
    const decipheredText  = decipher(matrix);
    document.getElementById('deciphered').value = decipheredText;
}

/**
 * Verificar si en un texto hay caracteres repetidos.
 * @param {string} text 
 * @returns true si el texto tiene caracteres repetidos, falso en caso contrario.
 */

const hasDuplicates = (text = '')=>{
    for (const char of text) 
        if(text.indexOf(char) != text.lastIndexOf(char))
            return true;
    return false;
}

/**
 * Función que define el modo de ordenamiento mediante la
 * comparación del código ascci de dos caracteres.
 * @param {string} char1 
 * @param {string} char2 
 * @returns -1 si el primer caracter es menor,
 * 1 si el primer caracter es mayor y 0 si ambos caracteres son iguales
 */
const compareFunction = (char1='', char2)=>{
    if(char1.charCodeAt(0) < char2.charCodeAt(0)) return -1;
    if(char1.charCodeAt(0) > char2.charCodeAt(0)) return  1;
    return 0;
}

/**
 * Llenar la matriz a partir del texto plano introducido por el usuario.
 * @param {string} plainText 
 * @param {string} key 
 * @returns Matriz con el texto plano.
 */
const fillMatrizFromTextPlain = (plainText, key)=>{
    const mat = [];
    let filling = ' '
    const rows = Math.ceil((plainText.length / key.length));
    for (let i = 0; i < rows; i++)
        mat[i] = plainText.substr(i*key.length,key.length).split('');
    
    // Número de caracteres faltantes
    const missingChars =  key.length - mat[rows-1].length;
    // Rellenar la última fila de la matriz
    if(missingChars>0)
        mat[rows-1].push( 
            ...filling.repeat(missingChars).split('')
        );
    
    return mat;
}


/**
 * Llenar la matriz a partir del texto cifrado.
 * @param {string} ciphered Texto cifrado 
 * @param {string} key 
 * @returns Matriz con el texto cifrado.
 */
const fillMatrizFromCipheredText = (ciphered, key='')=>{
    const matrix = [];
    const rows = Math.ceil((ciphered.length / key.length));
    const keyAsc = key.split('').sort(compareFunction);

    for (let i = 0; i < rows; i++) 
        matrix[i]=[];
    
    for (let k = 0; k < ciphered.length; k++) {
        // fila
        const i = (k+rows) % rows;
        // columna del caracter de acuerdo a la clave ordenada
        const j = Math.floor((k + rows) / rows) - 1;
        // columna del caracter de acuerdo a la clave original.
        const col = key.indexOf(keyAsc[j]);
        matrix[i][col] = ciphered.charAt(k);
    }
    return matrix;
}

const cipher = (mat, key)=>{
    const keyAsc = key.split('').sort(compareFunction);
    let textCiphered = '';
    // iterar la clave ordenada
    for (const char of keyAsc) {
        // indice del caracter en la clave
        const index = key.indexOf(char);
        // obtener los caracteres de una columna
        for (let j = 0; j < mat.length; j++)
            textCiphered+=mat[j][index];
    }
    return textCiphered;
}

const decipher = (matrix) =>{
    let text = '';
    for (let i = 0; i < matrix.length; i++) {
        text += matrix[i].join('');
    }
    return text;
}

const init = ()=>{
    document.getElementById('btn_encrypt').addEventListener('click', onCipher)
    document.getElementById('btn_decrypt').addEventListener('click', onDecipher)
}

init();