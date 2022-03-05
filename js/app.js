const ingresos = [
    new Ingreso ('Salario', 1200),
    new Ingreso ('Venta de coche', 2500.00),
    new Ingreso ('Bono', 850.00)
]

const egresos = [
    new Egreso('Renta departamento', 500.0),
    new Egreso('Ropa', 650)
]

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}


let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = presupuesto;
    document.getElementById('porcentaje').innerHTML = porcentajeEgreso;
    document.getElementById('ingresos').innerHTML = totalIngresos();
    document.getElementById('egresos').innerHTML = totalEgresos();
}

const formatoMoneda = (valor) => {
    return valor.toLocalesString('es-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocalString('en-US',{style:'percent',minimumFractionDigits:2})
}


const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${ingreso.valor}</div>
                        <div class="elemento_eliminar">
                            <button class='elemento_eliminar--btn'>
                                <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div> `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id); // El método findIndex es lo mismo que hacer un for (let ingreso of ingresos). En este caso la función findIndex nos ayuda encontrar el ìndice el arreglo que estamos necesitando.
                                        //la variable ingreso nos permite asignar cada valor del arreglo en cada iteración, luego accedemos al atributo de ingreso.id y lo comparamos con el id que queremos eliminar. Luego ese indice se asigna a la variable indiceEliminar.
    ingresos.splice(indiceEliminar,1) //Con la función splice podemos eliminar un elemento y con el segundo parámetro indicamos la cantidad de elementos que deseamos eleminar.
    cargarCabecero();
    cargarIngresos();
}

let cargarEgresos = () =>{
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${egreso.valor}</div>
        <div class="elemento_porcentaje">${egreso.valor/totalEgresos()}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline" 
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id); 
    egresos.splice(indiceEliminar,1) 
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = ()=>{
    let forma = document.forms['forma']; //De esta manera accedo al elemento 'forma' del formulario.
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso (descripcion.value, +valor.value)); // +valor.value es lo mismo que Number(valor.value) Acá lo que hacemos es convertir la cadena en un valor numerico.
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
