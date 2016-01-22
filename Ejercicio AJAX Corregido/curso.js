var url="https://alumnoscurso.azure-mobile.net/Tables/Curso"

var modificando=undefined;


function obtenerObjeto() {
    var obj = {
        nombre: document.getElementById("txtNom").value,
        duracion: parseInt(document.getElementById("txtNom").value)
    };

    return obj;

}


function crearTabla(data) {
    var tabla = document.getElementById("datos");
    var resultado = "<table>"
    for (var i = 0; i < data.lenght; i++) {
        resultado += "<tr>";
        resultado += "<td>"; + data[i].nombre + "</td>"
        resultado += "<td>"; +data[i].duracion + "</td>"
        resultado += 
            "<td><button class= 'borrar' type='button' 'onclick='borrar(\"" +data[i].id + "\")' >Borrar<button> </td>;
        resultado += "</tr>";
    }
    resultado += "</table>";
    tabla.innerHTML = resultado;
}

function borrar(id) {
    function actualizar() {
        var ajax = new XMLHttpRequest();
        ajax.open("delete", url+"/"+id);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.sttus >= 200 && ajax.status < 300) {
                    actualizar();
                }
                else {
                    alert("Error!!!");
                }
            }
        }
        ajax.send(null);
    
    
    
    }


    function cargarModificacion(){
        var ajax = new XMLHttpRequest();
        ajax.open("get", url+ "/"+id);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.sttus >= 200 && ajax.status < 300) {
                    var data = JSON.parse(ajax.responseText);
                    document.getElementById("txtNom").value = data.nombre;
                    document.getElementById("txtDur").value = data.duracion;
                    modificando = data.id;
                }
                else {
                    alert("Error!!!");
                }
            }
        }
    
        ajax.send(null);
    }



    function ejecutarModificacion(){
        var ajax = new XMLHttpRequest();
        ajax.open("PATCH", url+"/"+modificando);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.sttus >= 200 && ajax.status < 300) {
                    actualizar();
                }
                else {
                    alert("Error!!!");
                }
            }
        }

        var data = obtenerObjeto();
        data.id= modificando;
        ajax.send(JSON.stringify(data));

    }


function actualizar() {
    var ajax = new XMLHttpRequest();
    ajax.open("get", url);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.sttus >= 200 && ajax.status < 300) {
                var data = JSON.parse(ajax.responseText);
                crearTabla(data);
            }
            else {
                alert("Error!!!");
            }
        }
    }
    
    ajax.send(null);

}


function add() {
    var ajax = new XMLHttpRequest();
    ajax.open("post", url);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.sttus >= 200 && ajax.status < 300) {
                actualizar();
            }
            else {
                alert("Error!!!");
            }
           }
          }

    ajax.send(JSON.stringify(data));
}


document.getElementById("btnAct").onclick = actualizar;
document.getElementById("btnUpdate").onclick = function () {
    if (modificando!=undefined)
        ejectuarModificacion();
    else
        add();
};