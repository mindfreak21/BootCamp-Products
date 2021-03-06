const form = document.getElementsByTagName("form")[0];
/** * @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** * @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** * @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** * @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** * @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");


const preloadState = {
    producto:{},
    productos:[]
};

let indice = 0;
const reducer = (state,action) => {
    if (action.type == "producto-agregado") {
        indice++;
        const producto = action.payload;
        const codigo = indice;
        const total = producto.cantidad * producto.precio;
       return {
           ...state,
           productos: [
               ...state.productos,
               {...producto,
                codigo,
                total
               }
            ]
       };
    }

    if (action.type == "producto-modificado") 
    {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total};
        
        return{
            ...state,
            productos
        }
    }

    if (action.type == "producto-eliminado")
    {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }

    return state;
};

const store = Redux.createStore(reducer,preloadState);

let latestState;

store.subscribe(() =>{
   let currentState = store.getState();

   if (currentState != latestState)
   {
        latestState = currentState;
        renderTable(currentState.productos);
        console.log(store.getState());
   }

});

function renderTable(productos)
{
  const filas =  productos.map((item) => {
   const tr = document.createElement("tr");
   tr.innerHTML = `
      <td>${item.codigo}</td>
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>${item.precio}</td>
      <td>${item.total}</td>
      </td>
      <td>
        <div class="btn-group">
          <a title="editar" href="#" class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil-square"></i></a> 
          <a title="eliminar" href="#"  class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a> 
        </div>
      </td>
    `;
    const [editar,eliminar] = tr.getElementsByTagName("a");
    eliminar.addEventListener("click",(event) =>{
        event.preventDefault();
        store.dispatch({
            type:"producto-eliminado",
            payload: {
                codigo: item.codigo
            }
        })
    });
    return tr;
    });

    tbody.innerHTML = "";
    filas.forEach((tr) =>{
    tbody.appendChild(tr);
    })
   
    const cantidadTotal = sum(productos,x => x.cantidad);

    const precioTotal = sum(productos,x => x.precio);
                        
    const granTotal =   sum(productos,x => x.total);

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotalElement.innerText = granTotal;

    function sum(elementos, selector) 
    {
        return elementos
        .map(selector)
        .reduce((a,b) => a + b, 0); 

    }

}

store.dispatch({
  type: "producto-agregado",
  payload: {
      nombre: "prueba",
      cantidad: 3,
      precio: 25,
      categoria: 2
  }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba 2",
        cantidad: 4,
        precio: 4,
        categoria: 1
    }
  });

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba 3",
        cantidad: 5,
        precio: 45,
        categoria: 4
    }
  });
  
  store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba v2",
        cantidad: 78,
        precio: 1.5,
        categoria: 2
    }
  });

  store.dispatch({
      type: "producto-eliminado",
      payload: {
          codigo: 2
      }
  })