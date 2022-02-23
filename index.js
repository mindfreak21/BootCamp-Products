let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs);

if (paragraphs.length > 0) 
{
    let paragraph = paragraphs[0];

    paragraph.innerText = "Bienvenidos al bootcamp";
}

if (paragraphs.length > 1) 
{
    const paragraph = paragraphs[0];
    const fecha = new Date();
    paragraph.innerText = "Parrafos en el documento: " + paragraphs.length + " ("  + fecha + ")";
}
