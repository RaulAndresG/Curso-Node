
# README BY RAUL ANDRES GOMEZ REATIGA CURSO NODE.JS

Fs
--

Modulo de Node el cual nos permite manipular archivos del sistema operativo

ReadFileSync
------------
Es un metodo de fs  que nos  Permite leer archivos txt de forma sincronica

```javascript
const textIn = fs.readFileSync('./txt/start.txt', 'utf-8')
console.log(textIn); */
```

Date - Date.now
---------------
Muestra la fecha actual / Muestra en milisengundos el tiempo que ha pasado desde 1970  

```javascript
const textOut = `Jonas en su momento mas humilde escribiento ${textIn}.\nCreated on ${Date()}
```

WriteFileSync
-------------
Este metodo nos sirve para poder escribir dentro de un archivo txt con otro archivo txt

```javascript
fs.writeFileSync('./txt/start.txt',textOut)
console.log('File written!');
```

Call-Back
---------
Carga información desde archivos , la combina y luego guarda el resultado en otro archivo  de este mismo 

```javascript
fs.readFile('./txt/start.txt', 'utf8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf8', (err,data2)=>{
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf8', (err,data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt' , `${data2}\n${data3}`,  'utf8' , err =>{
                console.log('Your file has been write :DD');
            } )
        })
    })
});
```

SERVER
------
 función llamada replaceTemplate que toma dos argumentos: temp y product. Parece que esta función se encarga de reemplazar ciertas etiquetas dentro de un "template" con los valores correspondientes del objeto product.
 luego este código carga plantillas HTML y datos JSON desde archivos, y luego crea un servidor HTTP básico utilizando Node.js. Las plantillas HTML (almacenadas en `temProduct`, `temCard` y `temOverview`) se llenan con el contenido de los archivos de plantillas en formato de texto. Los datos se extraen del archivo `data.json`, se convierten en un objeto JSON y se almacenan en `dataObj`. Posteriormente, se establece la base del servidor HTTP utilizando `http.createServer()`, aunque la lógica específica para manejar las solicitudes y generar respuestas aún no se ha implementado en este punto.

```javascript
const replaceTemplate = (temp,product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTES%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)

    if(!product.organic)output = output.replace(/{%IMAGE%}/g,product.image)
}
  conts temProduct = fs.readFileSync(`${__dirname}/templates/template-overview.html`,`utf-8`)
  conts temCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,`utf-8`)
  conts temOverview = fs.readFileSync(`${__dirname}/templates/template-product.html`,`utf-8`)

  const data = fs .readFileSync(`${__dirname}/dev-data/data.json`,`utf-8`);
  const dataObj = JSON.parse(data);
  const server = http.createServer((req, res)=>{
    const {query,pathName} = url.parse(req.url,true);
  })
```

Dirname  
-
Variable especial que obtiene la ruta absoluta del archivo

TempOverview,TempCard,TempProduct 
-
Variables que almacenan el contenido de tres archivos HTML

Data 
-
Variable que almacena el contendio de un archivo JSON

DataObj 
-
parseamos o volvemos cadena la variable que contenia el JSON guardado

```javascript

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8',)
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8',)
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8',)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8',)
const dataObj = JSON.parse(data);
   
```
Overview page 
-
Este código es parte de un servidor web. Si la ruta de la solicitud es la raíz ('/') o '/overview', el servidor responde con contenido HTML dinámico. Utiliza datos de un objeto llamado dataObj para generar tarjetas de productos en HTML. Luego, inserta estas tarjetas en una plantilla de resumen y envía la página resultante como respuesta al cliente que realizó la solicitud

```javascript

if(pathName === '/' || pathName === '/overview'){
    res.writeHead(200,{'Content-type':'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
    const ontput = tempOverview.replace('{%PRODUCT_CARDS}',cardsHtml);
    res.end(ontput);
}


```
Product page
-

En este bloque de código, cuando la ruta de solicitud es '/product', el servidor responde generando una página HTML que muestra los detalles de un producto específico. Comienza configurando la cabecera del tipo de contenido como 'text/html', luego extrae los detalles del producto desde dataObj usando un parámetro de consulta id. A continuación, crea contenido HTML utilizando la plantilla temProduct y los datos del producto. Finalmente, envía esta página HTML como respuesta al cliente.


```javascript
}else if (pathName === '/product'){
  res.writeHead(200,{'Content-type':'text/html'});
  const product = dataObj[query.id];
  const output = replaceTemplate{temProduct, product};
  res.end(output)
}
```
API
-
En esta porción adicional del código, si la ruta de la solicitud es `'/api'`, el servidor responde configurando una cabecera HTTP con un tipo de contenido de `application/json`. Luego, envía una respuesta que contiene los datos (`data`) en formato JSON al cliente que realizó la solicitud.

En resumen, esta parte del código maneja solicitudes a la ruta `'/api'`, respondiendo con los datos en formato JSON.

```javascript
}else if (pathName === '/api'){
    res.writeHead(200,{'Content-type':'application/json'});
    res.end(data);
}
```
