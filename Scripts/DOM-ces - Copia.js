
function pinta_seleccionado_js(obj)
{
    d(obj["div_pinta"]).innerHTML = "";
    d(obj["div_pinta"]).style.width = "70%";
    var div1 = document.createElement("div");
    div1.id = "pinta_sel_" + obj["div_pinta"];
    div1.setAttribute("style",obj["estilo"]);
    div1.style.backgroundColor = obj["color_normal"];
    div1.style.display = "inline-block";
    div1.onmouseover = function () {
        div1.style.backgroundColor = obj["color_sobre"];
    }
    div1.onmouseout = function () {
        div1.style.backgroundColor = obj["color_normal"];
    }
    div1.innerHTML = arregla_texto_may_min(obj["dato"]) + "<span style='width:20px; display:inline-block'> </span>" + "<span onclick='" + obj["funcion_cierra"] + "(" + '"' + obj["div_pinta"] + '"' + ")' style='font-weight:bold; cursor:pointer; text-align:right'>X</span>";
    d(obj["div_pinta"]).appendChild(div1);
}

function arregla_texto_may_min(dato)
{
    if(dato.length>1)
    {
        var prim_letra=dato.substr(0,1);
        var resto_letra=dato.substr(1);
        dato=prim_letra.toUpperCase()+resto_letra.toLowerCase();
    }
    return dato;
}

function fin_cambio_drag_drop(id_caja)
{
    if (globjcajas_arrastrar[id_caja] != undefined)
    {
        var id = globjcajas_arrastrar[id_caja];
        var arrfavoritos2 = new Array();
        var arrnomasfav = new Array();

        var existen_cambios = 0;
        var arrfavoritos=glconfiguracion_favoritos[id]["arrfavoritos"];
        var lista = d("lista_menu_fav_" + id);
        var n = 0;
        var objfavoritos_unicos = new Object();
        while (n < lista.childNodes.length)
        {
            var id_elemento = lista.childNodes[n].id;
            var arr2 = id_elemento.split('_');
            var serial = arr2[arr2.length - 1];

         
            var dtv = new vista(glconfiguracion_favoritos[id]["fuente_todos"], "['" + glconfiguracion_favoritos[id]["serial_favoritos"] + "']==" +
                serial, '', '');
            if (dtv.length > 0) {
               
                var dtv_favoritos_manuales = new vista(glconfiguracion_favoritos[id]["fuente_favoritos_manuales"], "['" + glconfiguracion_favoritos[id]["serial_favoritos"] + "']==" +
                      serial, '', '');
               
                var serial_favorito_manual = "0";
                if (dtv_favoritos_manuales.length > 0)
                    serial_favorito_manual = dtv_favoritos_manuales[0][glconfiguracion_favoritos[id]["serial_tabla_favorito"]];

                if (objfavoritos_unicos[dtv[0][glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined) {
                    var obj1 = new Object();
                    obj1[glconfiguracion_favoritos[id]["serial_favoritos"]] = dtv[0][glconfiguracion_favoritos[id]["serial_favoritos"]];
                    obj1[glconfiguracion_favoritos[id]["nombre_favoritos"]] = dtv[0][glconfiguracion_favoritos[id]["nombre_favoritos"]];
                    obj1["con_imagen"] = dtv[0]["con_imagen"];
                    obj1["ubicacion"] = dtv[0]["ubicacion"];
                    obj1["serial_tabla_favorito"] = serial_favorito_manual;

                    if (n < glconfiguracion_favoritos[id]["caja_favoritos_cantidad"]) {
                        objfavoritos_unicos[dtv[0][glconfiguracion_favoritos[id]["serial_favoritos"]]] = "1";
                        obj1["orden"] = arrfavoritos2.length + 1;
                    
                        arrfavoritos2[arrfavoritos2.length] = obj1;

                        var serial_n = arrfavoritos2[n][glconfiguracion_favoritos[id]["serial_favoritos"]];
                        var orden_n = arrfavoritos2[n]["orden"];

                        var serial_v = 0;
                        var orden_v = 0;
                        if (n < arrfavoritos.length)
                        {
                            serial_v=arrfavoritos[n][glconfiguracion_favoritos[id]["serial_favoritos"]];
                            orden_v=arrfavoritos[n]["orden"];
                        }
                        if (serial_v != serial_n)
                            existen_cambios = 1;
                        if (orden_v != orden_n)
                            existen_cambios = 1;
      
                       
                    }
                    else {
                        obj1["orden"] =0;
                        arrnomasfav[arrnomasfav.length] = obj1;
                    }
                }
            }
        

           // alert(serial);
            n++;
        }
  
        glconfiguracion_favoritos[id]["objfavoritos_unicos"] = objfavoritos_unicos;
        glconfiguracion_favoritos[id]["arrfavoritos"] = arrfavoritos2;
        glconfiguracion_favoritos[id]["arrnomasfav"] = arrnomasfav;
        pinta_favoritos(id);
        pinta_todos_favoritos(id);

        if (existen_cambios != 0)
        {
          
            var arractualizar = new Array();
            var arreliminar = new Array();
            var arrinsertar = new Array();

            var n = 0;
            while(n<arrfavoritos2.length)
            {
                var serial_tabla_favorito = arrfavoritos2[n]["serial_tabla_favorito"];
                var serial_favorito = arrfavoritos2[n][glconfiguracion_favoritos[id]["serial_favoritos"]];

                if (serial_tabla_favorito == "0")
                {
                    var obji = new Object();
                    obji["serial"] = serial_favorito;
                    obji["orden"] = arrfavoritos2[n]["orden"];
                    arrinsertar[arrinsertar.length] = obji;
                }
                else
                {
                    var dtv_aun_existe =
                       new vista(arrfavoritos,
                       "['serial_tabla_favorito']==" + serial_tabla_favorito, '', '');

                    if ((arrfavoritos2[n]["orden"] != dtv_aun_existe[0]["orden"]) || (arrfavoritos2[n]["serial_tabla_favorito"] != dtv_aun_existe[0]['serial_tabla_favorito']))
                    {
                        var obja = new Object();
                        obja["serial"] = serial_favorito;
                        obja["orden"] = arrfavoritos2[n]["orden"];
                        obja["serial_tabla_favorito"] = serial_tabla_favorito;
                        arractualizar[arractualizar.length] = obja;
                    }
  
                }
                n++;
            }
            n = 0;
            while (n < arrfavoritos.length) {
                var serial_tabla_favorito = arrfavoritos[n]["serial_tabla_favorito"];
                var serial_favorito = arrfavoritos[n][glconfiguracion_favoritos[id]["serial_favoritos"]];

                if(serial_tabla_favorito!="0")
                {
                    var dtv_aun_existe = 
                        new vista(arrfavoritos2,
                        "['serial_tabla_favorito']==" + serial_tabla_favorito, '', '');

                    if(dtv_aun_existe.length==0)
                    {
                        var objd = new Object();
                        objd["serial_tabla_favorito"] = serial_tabla_favorito;
                        arreliminar[arreliminar.length] = objd;
                    }

                }

                n++;
            }
            glmuestra_cargando = false;
            var arrgenerico = [{
                tabla_favorito: glconfiguracion_favoritos[id]["tabla_favorito"],
                serial_uno: glconfiguracion_favoritos[id]["serial_uno"],
                valor_serial_uno: glconfiguracion_favoritos[id]["valor_serial_uno"],
                serial_favoritos: glconfiguracion_favoritos[id]["serial_favoritos"],
                serial_tabla_favorito: glconfiguracion_favoritos[id]["serial_tabla_favorito"],
                vid: id
            }];
            call_sgu(carga_favoritos_post, [arrgenerico,arrinsertar, arractualizar, arreliminar], "guarda_favoritos", "form");


        }
           
        //var arr1 = glconfiguracion_favoritos[id]["id_cajas"];
        //var indice = arr1.indexOf(id_caja);
        //if(indice!=-1)
        //{

        //    if (indice == 0)
        //        pinta_favoritos(id)
        //    else if (indice == 1)
        //        pinta_todos_favoritos(id);
        //}
    }
 
}

function carga_favoritos_post(respuesta)
{
    var id = respuesta["id"][0]["id"];
    glconfiguracion_favoritos[id]["fuente_favoritos_manuales"] = respuesta["favoritos"];
    arma_arr_favoritos(id);
    
}
var favoritosjava = function () {

    var objpropiedades = new Object();
    this.objpropiedades = new Object();
}
var globjcajas_arrastrar = new Object();
var glconfiguracion_favoritos = new Object();
favoritosjava.prototype.bind = function () {

    glconfiguracion_favoritos[this.objpropiedades["id"]] = this.objpropiedades;
    var html1 =
        "<div style='position:absolute; top:" +
        this.objpropiedades["buscador_top"] + "; left: " +
        this.objpropiedades["buscador_left"] + " ' id='div_p1_" + this.objpropiedades["id"] + "'></div>" +

        "<div style='position:absolute; top:" +
        this.objpropiedades["caja_favoritos_top"] + "; left: " +
        this.objpropiedades["caja_favoritos_left"] + " ' id='div_p2_" + this.objpropiedades["id"] + "'></div>" +

            "<div style='position:absolute; top:" +
        this.objpropiedades["todos_mensaje_top"] + "; left: " +
        this.objpropiedades["todos_mensaje_left"] + " ' id='div_p3_" + this.objpropiedades["id"] + "'></div>" +

        "<div style='display:none; position:absolute; top:" +
    this.objpropiedades["todos_caja_top"] + "; left: " +
    this.objpropiedades["todos_caja_left"] + " ' id='div_p4_" + this.objpropiedades["id"] + "'></div>"

    d(this.objpropiedades["div"]).innerHTML = html1;

    var arrestilo_bus = new Array();
    var arrmenu_bus = new Array();
    var arrfun_bus = new Array();
    var arrcol_grilla_bus = new Array();

    if (this.objpropiedades["tipo_buqueda"] == "1")
    {
        arrestilo_bus = ["'width: 50px; text-align:center;padding:1px'", "'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"];
        arrmenu_bus = ["1", "0"];
        arrfun_bus = ["funcion_foto_favoritos", ""];
        arrcol_grilla_bus = [this.objpropiedades["serial_favoritos"], this.objpropiedades["nombre_favoritos"]];
    }
    else
    {
        arrestilo_bus = ["'width: 350px; text-align:center;padding:1px; font-family:Tahoma; font-size:14px;'"];
        arrmenu_bus = ["0"];
        arrfun_bus = [""];
        arrcol_grilla_bus = ["nombre"];
    }
    var n = 0;
    while (n < this.objpropiedades["fuente_todos"].length)
    {
        this.objpropiedades["fuente_todos"][n]["id_favoritos"] = this.objpropiedades["id"];
        n++;
    }
    var id_auto = "txt_auto_menu_din";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "div_p1_" + this.objpropiedades["id"],
        fuente: this.objpropiedades["fuente_todos"],
        nombre_en_fuente: this.objpropiedades["nombre_favoritos"],
        serial_en_fuente: this.objpropiedades["serial_favoritos"],
        columnas_busqueda: [this.objpropiedades["nombre_favoritos"]],
        columnas_grilla: arrcol_grilla_bus,
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: [this.objpropiedades["nombre_favoritos"]],
        funcion_clic_dato: this.objpropiedades["buscador_ejecuta_funcion"],
        estilo_grilla: this.objpropiedades["buscador_estilo_grilla"],
        tipo_columna_grilla: arrmenu_bus,
        estilo_columna_grilla: arrestilo_bus,
        funcion_columna_grilla: arrfun_bus,
        top_grilla: this.objpropiedades["buscador_top_grilla"],
        left_grilla: this.objpropiedades["buscador_left_grilla"],
        maximos_resultados: 5,
        ancho_caja_texto: this.objpropiedades["buscador_ancho_caja_texto"],
        alto_caja_texto: this.objpropiedades["buscador_alto_caja_texto"],
    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = this.objpropiedades["mensaje_autocompletar"];
    d("div_p2_" + this.objpropiedades["id"]).style.borderStyle = "solid";
    d("div_p2_" + this.objpropiedades["id"]).style.borderColor = this.objpropiedades["caja_favoritos_color_borde"];
    d("div_p2_" + this.objpropiedades["id"]).style.borderWidth = this.objpropiedades["caja_favoritos_ancho_borde"];
    d("div_p2_" + this.objpropiedades["id"]).style.width = this.objpropiedades["caja_favoritos_ancho"];
    d("div_p2_" + this.objpropiedades["id"]).style.height = this.objpropiedades["caja_favoritos_alto"];
    d("div_p2_" + this.objpropiedades["id"]).style.borderRadius = this.objpropiedades["caja_favoritos_radio_borde"];
    d("div_p2_" + this.objpropiedades["id"]).style.boxShadow = this.objpropiedades["caja_favoritos_sombra"];
    d("div_p2_" + this.objpropiedades["id"]).style.backgroundColor = this.objpropiedades["caja_favoritos_fondo"];
    d("div_p2_" + this.objpropiedades["id"]).style.overflow = "hidden";
    d("div_p2_" + this.objpropiedades["id"]).style.display = "inline-block";
    d("div_p2_" + this.objpropiedades["id"]).style.position = "relative";
    d("div_p2_" + this.objpropiedades["id"]).innerHTML =
        "<div id='multi_" + this.objpropiedades["id"] +
        "' style='display:inline-block;position:relative; padding-left: 20px;padding-right: 20px; '><div id='lista_menu_fav_" +
        this.objpropiedades["id"]
        +"' class='tile__list'></div></div>";

   
    d("div_p3_" + this.objpropiedades["id"]).innerHTML = "<a style=' text-decoration:none; ' href='#' onclick='return clic_ver_todos_f(" + '"' + this.objpropiedades["id"] + '"' + ")'><span id='ver_todos_favoritos_" + this.objpropiedades["id"] + "' style='font-Family:Tahoma; font-size:13px;'>"
        + this.objpropiedades["mensaje_ver_todos"] + "</span></a>";

    d("div_p4_" + this.objpropiedades["id"]).style.borderStyle = "solid";
    d("div_p4_" + this.objpropiedades["id"]).style.borderColor = this.objpropiedades["todos_caja_color_borde"];
    d("div_p4_" + this.objpropiedades["id"]).style.borderWidth = this.objpropiedades["todos_caja_ancho_borde"];
    d("div_p4_" + this.objpropiedades["id"]).style.width = this.objpropiedades["todos_caja_ancho"];
    d("div_p4_" + this.objpropiedades["id"]).style.height = this.objpropiedades["todo_caja_alto"];
    d("div_p4_" + this.objpropiedades["id"]).style.borderRadius = this.objpropiedades["todos_caja_radio_borde"];
    d("div_p4_" + this.objpropiedades["id"]).style.boxShadow = this.objpropiedades["todos_caja_sombra"];
    d("div_p4_" + this.objpropiedades["id"]).style.backgroundColor = this.objpropiedades["todos_caja_fondo"];
    d("div_p4_" + this.objpropiedades["id"]).style.overflowY = "scroll";
    d("div_p4_" + this.objpropiedades["id"]).style.display = "none";
    d("div_p4_" + this.objpropiedades["id"]).style.position = "relative";
    d("div_p4_" + this.objpropiedades["id"]).innerHTML =
        "<div id='multi_todos_" + this.objpropiedades["id"] +
        "' style='display:inline-block;position:relative; padding-left: 20px;padding-right: 20px; '><div id='lista_menu_todos_" + this.objpropiedades["id"] + "' class='tile__list'></div></div>";


    arma_arr_favoritos(this.objpropiedades["id"]);
    globjcajas_arrastrar["lista_menu_fav_" + this.objpropiedades["id"]] = this.objpropiedades["id"];
    globjcajas_arrastrar["lista_menu_todos_" + this.objpropiedades["id"]] = this.objpropiedades["id"];
    this.objpropiedades["id_cajas"] = ["lista_menu_fav_" + this.objpropiedades["id"], "lista_menu_todos_" + this.objpropiedades["id"]];
    pinta_favoritos(this.objpropiedades["id"]);
    pinta_todos_favoritos(this.objpropiedades["id"])
   


}

function arma_arr_favoritos(id)
{
    var objfavoritos_unicos = new Object();


    var arrfavoritos = new Array();
    var dtv_fav = new vista( glconfiguracion_favoritos[id]["fuente_favoritos_manuales"], "", 'A', 'orden', 'true');
    var n = 0;
    while (n < dtv_fav.length) {
        var obj1 = new Object();
        var dtv = new vista( glconfiguracion_favoritos[id]["fuente_todos"],
            "['" +  glconfiguracion_favoritos[id]["serial_favoritos"] + "']==" + dtv_fav[n][ glconfiguracion_favoritos[id]["serial_favoritos"]], '', '');
        if (dtv.length > 0) {
            if (objfavoritos_unicos[dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined) {
                objfavoritos_unicos[dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]]] = "1";
                obj1[ glconfiguracion_favoritos[id]["serial_favoritos"]] = dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]];
                obj1[ glconfiguracion_favoritos[id]["nombre_favoritos"]] = dtv[0][ glconfiguracion_favoritos[id]["nombre_favoritos"]];
                obj1["serial_tabla_favorito"] = dtv_fav[n][glconfiguracion_favoritos[id]["serial_tabla_favorito"]];
                obj1["con_imagen"] = dtv[0]["con_imagen"];
                obj1["ubicacion"] = dtv[0]["ubicacion"];
                obj1["orden"] = arrfavoritos.length + 1;
                arrfavoritos[arrfavoritos.length] = obj1;
            }
        }
        n++;
    }
    n = 0;
    while ((n < glconfiguracion_favoritos[id]["fuente_frecuencia"].length) && (arrfavoritos.length < glconfiguracion_favoritos[id]["caja_favoritos_cantidad"])) {
        var obj1 = new Object();
        var dtv = new vista( glconfiguracion_favoritos[id]["fuente_todos"], "['" +  glconfiguracion_favoritos[id]["serial_favoritos"] + "']==" +
             glconfiguracion_favoritos[id]["fuente_frecuencia"][n][ glconfiguracion_favoritos[id]["serial_favoritos"]], '', '');
        if (dtv.length > 0) {
            if (objfavoritos_unicos[dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined) {
                objfavoritos_unicos[dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]]] = "1";
                obj1[ glconfiguracion_favoritos[id]["serial_favoritos"]] = dtv[0][ glconfiguracion_favoritos[id]["serial_favoritos"]];
                obj1[ glconfiguracion_favoritos[id]["nombre_favoritos"]] = dtv[0][ glconfiguracion_favoritos[id]["nombre_favoritos"]];
                obj1["serial_tabla_favorito"] = "0";
                obj1["con_imagen"] = dtv[0]["con_imagen"];
                obj1["ubicacion"] = dtv[0]["ubicacion"];
                obj1["orden"] = arrfavoritos.length + 1;
                arrfavoritos[arrfavoritos.length] = obj1;
            }
        }
        n++;
    }

    n = 0;
    while ((n < glconfiguracion_favoritos[id]["fuente_todos"].length) && (arrfavoritos.length < glconfiguracion_favoritos[id]["caja_favoritos_cantidad"])) {
        var obj1 = new Object();
    

        if (objfavoritos_unicos[glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined) {
            objfavoritos_unicos[glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] = "1";
            obj1[glconfiguracion_favoritos[id]["serial_favoritos"]] = glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]];
            obj1[glconfiguracion_favoritos[id]["nombre_favoritos"]] = glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["nombre_favoritos"]];
            obj1["serial_tabla_favorito"] = "0";
            obj1["con_imagen"] = glconfiguracion_favoritos[id]["fuente_todos"][n]["con_imagen"];
            obj1["ubicacion"] = glconfiguracion_favoritos[id]["fuente_todos"][n]["ubicacion"];
            obj1["orden"] = arrfavoritos.length + 1;
            arrfavoritos[arrfavoritos.length] = obj1;
        }
        
        n++;
    }
    glconfiguracion_favoritos[id]["objfavoritos_unicos"] = objfavoritos_unicos;
    glconfiguracion_favoritos[id]["arrfavoritos"] = arrfavoritos;
    glconfiguracion_favoritos[id]["arrnomasfav"] = [];

}
function pinta_favoritos(id)
{
    var lista = d("lista_menu_fav_" + id);
    lista.innerHTML = "";
    var arrfavoritos = glconfiguracion_favoritos[id]["arrfavoritos"];
    var n = 0;
    while ((n < glconfiguracion_favoritos[id]["caja_favoritos_cantidad"]) && (n < arrfavoritos.length)) {
        var li = document.createElement("div");
        li.style.width = "70px";
        li.style.display = "inline-block";
        li.style.marginLeft = "8px";
        li.style.marginTop = "8px";
        li.style.verticalAlign = "top";
        li.style.cursor = "pointer";
        li.style.wordWrap = "break-word";

        //#dce9f9
        var icono1 = new iconojava();
        icono1.objpropiedades = {
            serial: arrfavoritos[n][glconfiguracion_favoritos[id]["serial_favoritos"]],
            nombre: arrfavoritos[n][glconfiguracion_favoritos[id]["nombre_favoritos"]],
            ubicacion: arrfavoritos[n]["ubicacion"],
            con_imagen: arrfavoritos[n]["con_imagen"],
            color_fondo_arr: glconfiguracion_favoritos[id]["icono_color_fondo_arr"],
            color_letra_arr: glconfiguracion_favoritos[id]["icono_color_letra_arr"],
            color_borde_arr: glconfiguracion_favoritos[id]["icono_color_borde_arr"],
            borde_ancho: glconfiguracion_favoritos[id]["icono_borde_ancho"],
            fuente: glconfiguracion_favoritos[id]["icono_fuente"],
            tamano_icono: glconfiguracion_favoritos[id]["icono_tamano_icono"],
            funcion_clic_dato: glconfiguracion_favoritos[id]["buscador_ejecuta_funcion"]
        };
        var icono = icono1.bind();


        var div3 = document.createElement("div");
        div3.appendChild(icono);
        li.id = "favorito_" + id + "_" + arrfavoritos[n][glconfiguracion_favoritos[id]["serial_favoritos"]];
        li.appendChild(div3);
        lista.appendChild(li);

        n++;
    }
   
  console = window.console;

    // Multi groups
    Sortable.create(document.getElementById('multi_' + id), {
        animation: 150,
        draggable: '.tile',
        handle: '.tile__name'
    });

    [].forEach.call(document.getElementById('multi_' + id).getElementsByClassName('tile__list'), function (el) {
        Sortable.create(el, {
            group: 'photo',
            animation: 150
        });
    });
}

function pinta_todos_favoritos(id)
{
    var objnomasfac = new Object();
    var objfavoritos_unicos = glconfiguracion_favoritos[id]["objfavoritos_unicos"];
    var lista = d("lista_menu_todos_" + id);
    lista.innerHTML = "";
    var n = 0;
    while (n < glconfiguracion_favoritos[id]["arrnomasfav"].length) {
        

        if (objfavoritos_unicos[glconfiguracion_favoritos[id]["arrnomasfav"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined)
        {
            objnomasfac[glconfiguracion_favoritos[id]["arrnomasfav"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] = "1";
            var li = document.createElement("div");
            li.style.width = "70px";
            li.style.display = "inline-block";
            li.style.marginLeft = "8px";
            li.style.marginTop = "8px";
            li.style.verticalAlign = "top";
            li.style.cursor = "pointer";
            li.style.wordWrap = "break-word";

            //#dce9f9
            var icono1 = new iconojava();
            icono1.objpropiedades = {
                serial: glconfiguracion_favoritos[id]["arrnomasfav"][n][glconfiguracion_favoritos[id]["serial_favoritos"]],
                nombre: glconfiguracion_favoritos[id]["arrnomasfav"][n][glconfiguracion_favoritos[id]["nombre_favoritos"]],
                ubicacion: glconfiguracion_favoritos[id]["arrnomasfav"][n]["ubicacion"],
                con_imagen: glconfiguracion_favoritos[id]["arrnomasfav"][n]["con_imagen"],
                color_fondo_arr: glconfiguracion_favoritos[id]["icono_color_fondo_arr"],
                color_letra_arr: glconfiguracion_favoritos[id]["icono_color_letra_arr"],
                color_borde_arr: glconfiguracion_favoritos[id]["icono_color_borde_arr"],
                borde_ancho: glconfiguracion_favoritos[id]["icono_borde_ancho"],
                fuente: glconfiguracion_favoritos[id]["icono_fuente"],
                tamano_icono: glconfiguracion_favoritos[id]["icono_tamano_icono"],
                funcion_clic_dato: glconfiguracion_favoritos[id]["buscador_ejecuta_funcion"]
            };
           
            var icono = icono1.bind();
            var div3 = document.createElement("div");
            div3.appendChild(icono);
            li.id = "favorito_todos_" + id + "_" + glconfiguracion_favoritos[id]["arrnomasfav"][n][glconfiguracion_favoritos[id]["serial_favoritos"]];
            li.appendChild(div3);
            lista.appendChild(li);
        }
        n++;
    }
    var n = 0;
    while (n < glconfiguracion_favoritos[id]["fuente_todos"].length) {

        if ((objfavoritos_unicos[glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined)&&
            (objnomasfac[glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]]] == undefined))
        {
            var li = document.createElement("div");
            li.style.width = "70px";
            li.style.display = "inline-block";
            li.style.marginLeft = "8px";
            li.style.marginTop = "8px";
            li.style.verticalAlign = "top";
            li.style.cursor = "pointer";
            li.style.wordWrap = "break-word";

            //#dce9f9
            var icono1 = new iconojava();
            icono1.objpropiedades = {
                serial: glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]],
                nombre: glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["nombre_favoritos"]],
                ubicacion: glconfiguracion_favoritos[id]["fuente_todos"][n]["ubicacion"],
                con_imagen: glconfiguracion_favoritos[id]["fuente_todos"][n]["con_imagen"],
                color_fondo_arr: glconfiguracion_favoritos[id]["icono_color_fondo_arr"],
                color_letra_arr: glconfiguracion_favoritos[id]["icono_color_letra_arr"],
                color_borde_arr: glconfiguracion_favoritos[id]["icono_color_borde_arr"],
                borde_ancho: glconfiguracion_favoritos[id]["icono_borde_ancho"],
                fuente: glconfiguracion_favoritos[id]["icono_fuente"],
                tamano_icono: glconfiguracion_favoritos[id]["icono_tamano_icono"],
                funcion_clic_dato: glconfiguracion_favoritos[id]["buscador_ejecuta_funcion"]
            };
         
            var icono = icono1.bind();
            var div3 = document.createElement("div");
            div3.appendChild(icono);
            li.id = "favorito_todos_" + id + "_" + glconfiguracion_favoritos[id]["fuente_todos"][n][glconfiguracion_favoritos[id]["serial_favoritos"]];
            li.appendChild(div3);
            lista.appendChild(li);
        }
        n++;
    }

    
    
    Sortable.create(document.getElementById('multi_todos_' + id), {
        animation: 150,
        draggable: '.tile',
        handle: '.tile__name'
    });

    [].forEach.call(document.getElementById('multi_todos_' + id).getElementsByClassName('tile__list'), function (el) {
        Sortable.create(el, {
            group: 'photo',
            animation: 150
        });
    });

  
}
function clic_ver_todos_f(id) {
    var div_papa = glconfiguracion_favoritos[id]["div"];

    if (glconfiguracion_favoritos[id]["viendo_todos"] == undefined)
        glconfiguracion_favoritos[id]["viendo_todos"] = false;

    if (glconfiguracion_favoritos[id]["viendo_todos"] == false) {
        glconfiguracion_favoritos[id]["viendo_todos"] = true;
        d("div_p4_" + id).style.display = "inline-block";

        d("ver_todos_favoritos_" + id).innerText = glconfiguracion_favoritos[id]["mensaje_ocultar_todos"];
        if (glconfiguracion_favoritos[id]["todos_cambia_tamano_div"] == true) {
            glconfiguracion_favoritos[id]["antiguo_alto_div"] = d(div_papa).style.height;
            if (glconfiguracion_favoritos[id]["es_mensaje_flecha"] == true)
                d(div_papa + "_papa").style.height = glconfiguracion_favoritos[id]["todos_cambia_nuevo_alto"];

            d(div_papa).style.height = glconfiguracion_favoritos[id]["todos_cambia_nuevo_alto"];
        }
    }
    else if (glconfiguracion_favoritos[id]["viendo_todos"] == true) {
        glconfiguracion_favoritos[id]["viendo_todos"] = false;
        d("div_p4_" + id).style.display = "none";

        d("ver_todos_favoritos_" + id).innerText = glconfiguracion_favoritos[id]["mensaje_ver_todos"];
        if (glconfiguracion_favoritos[id]["todos_cambia_tamano_div"] == true) {
            if (glconfiguracion_favoritos[id]["es_mensaje_flecha"] == true)
                d(div_papa + "_papa").style.height = glconfiguracion_favoritos[id]["antiguo_alto_div"];

            d(div_papa).style.height = glconfiguracion_favoritos[id]["antiguo_alto_div"];
        }
    }

    return false;
}
function funcion_foto_favoritos2(fila, dato) {
    //alert(fila["id_favoritos"]);
    var serial = glconfiguracion_favoritos[fila["id_favoritos"]]["serial_favoritos"];
    var nombre = glconfiguracion_favoritos[fila["id_favoritos"]]["nombre_favoritos"];
    var tipo_fuente_imagen = glconfiguracion_favoritos[fila["id_favoritos"]]["tipo_fuente_imagen"];
    var str2ltr = String(fila[nombre]).substring(0, 2);

    var aux="";
    if (tipo_fuente_imagen = "")
        aux = "";
    else if (tipo_fuente_imagen = "1")
        aux = "";
    else if (tipo_fuente_imagen = "2")
        aux = "";
    else if (tipo_fuente_imagen = "3")
        aux = "";

    var ruta = "../Manejadores/ver_imagen.aspx?dosl=" + str2ltr + "&val=" + fila[serial];

    if (sessionStorage[fila[nombre] + "_" + fila[serial]] == undefined)
        guarda_dato_img_ses(ruta, fila[nombre] + "_" + fila[serial]);
    else
        ruta = sessionStorage[fila[nombre] + "_" + fila[serial]];

    var htmlr = "<img width='40px' src='" + ruta + "'/>";
    return htmlr;
}
function funcion_foto_favoritos(fila, dato) {
    //alert(fila["id_favoritos"]);
    var vserial = glconfiguracion_favoritos[fila["id_favoritos"]]["serial_favoritos"];
    var vnombre = glconfiguracion_favoritos[fila["id_favoritos"]]["nombre_favoritos"];
    var tipo_fuente_imagen = glconfiguracion_favoritos[fila["id_favoritos"]]["tipo_fuente_imagen"];

    
    var icono1 = new iconojava();
    icono1.objpropiedades = {
        serial: fila[vserial],
        nombre: fila[vnombre],
        ubicacion: fila["ubicacion"],
        con_imagen: fila["con_imagen"],
        color_fondo_arr: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_color_fondo_arr"],
        color_letra_arr: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_color_letra_arr"],
        color_borde_arr: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_color_borde_arr"],
        borde_ancho: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_borde_ancho"],
        fuente: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_fuente"],
        tamano_icono: glconfiguracion_favoritos[fila["id_favoritos"]]["icono_tamano_icono"],
        funcion_clic_dato: glconfiguracion_favoritos[fila["id_favoritos"]]["buscador_ejecuta_funcion"]
    };
    icono1.bind();
    var htmlr = icono1.objpropiedades["div_html_icono"];
    return htmlr;
}

var iconojava= function()
{
    var objpropiedades= new Object();
    this.objpropiedades = new Object();
}
iconojava.prototype.bind = function () {

    //retorna un link

    var papasvg = document.createElement("div");
    papasvg.id = "img_aplicacion_" + this.objpropiedades["serial"];

    if (this.objpropiedades["con_imagen"] == "1") {
       // alert(this.objpropiedades["ubicacion"]);
        var str2ltr = String(this.objpropiedades["nombre"]).substring(0, 2);
        var ruta = "../Manejadores/ver_imagen.aspx?dosl=" + str2ltr + "&val=" + this.objpropiedades["serial"];


        if (sessionStorage[this.objpropiedades["nombre"] + "_" + this.objpropiedades["serial"]] == undefined)
            guarda_dato_img_ses("../Manejadores/ver_imagen.aspx?dosl=" + str2ltr + "&val=" + this.objpropiedades["serial"],
                this.objpropiedades["nombre"] + "_" + this.objpropiedades["serial"]);
        else
            ruta = sessionStorage[this.objpropiedades["nombre"] + "_" + this.objpropiedades["serial"]];
    }
    //  img1.setAttribute("src", ruta);
    //  img1.setAttribute("height", "40px");
    
    var tamano_icono = parseFloat(this.objpropiedades["tamano_icono"]);
    var rel_x = (parseFloat(this.objpropiedades["borde_ancho"]) / 70) * tamano_icono;
    var rel_y = (parseFloat(this.objpropiedades["borde_ancho"]) / 70) * tamano_icono;
    var rel_w = (64 / 70) * tamano_icono;
    var rel_h = (64 / 70) * tamano_icono;
    var rel_rx = (16 / 70) * tamano_icono;
    var rel_ry = (16 / 70) * tamano_icono;
    var rel_sw = (3 / 70) * tamano_icono;

    var rel_fs = (36 / 70) * tamano_icono;


    var objcoordenadas_diferentes = {
        A: [24, 48], B: [24, 48], C: [22, 48], D: [23, 48], E: [23, 48], F: [24, 48], G: [23, 48], H: [23, 48], I: [28, 48],
        J: [27, 48], K: [24, 48], L: [26, 48], M: [21, 48], N: [23, 48], O: [23, 48], P: [25, 48], Q: [22, 46], R: [24, 48],
        S: [24, 49], T: [24, 49], U: [23, 28], V: [24, 49], W: [19, 49], X: [24, 48], Y: [24, 49], Z: [24, 49]
    };

    var letra = String(this.objpropiedades["nombre"]).substr(0, 1).toUpperCase();
    var segunda_letra = "";
    if(this.objpropiedades["nombre"].length>1)
        segunda_letra=String(this.objpropiedades["nombre"]).substr(1, 1);
    var c1 = 24;
    var c2 = 48;
    if (objcoordenadas_diferentes[letra] != undefined)
    {
        c1 = objcoordenadas_diferentes[letra][0];
        c2 = objcoordenadas_diferentes[letra][1];
    }
    var rel_xt = (c1 / 70) * tamano_icono;
    var rel_yt = (c2 / 70) * tamano_icono;

  //  var a1 = "A";
  //  alert(a1.charCodeAt(0));
    //color_fondo_arr
   // color_letra_arr
   // color_borde_arr

    var numero_magico=letra.charCodeAt(0)+segunda_letra.charCodeAt(0);

    var ind_fondo = numero_magico % this.objpropiedades["color_fondo_arr"].length;
    var ind_letra = numero_magico % this.objpropiedades["color_letra_arr"].length;
    var ind_borde = numero_magico % this.objpropiedades["color_borde_arr"].length;

    var col_fondo = this.objpropiedades["color_fondo_arr"][ind_fondo];
    var col_letra = this.objpropiedades["color_letra_arr"][ind_letra];
    var col_borde = this.objpropiedades["color_borde_arr"][ind_borde];

    if ((this.objpropiedades["con_imagen"] == "0")||(ruta==undefined))
    {
        var icono = "<svg height='" + tamano_icono + "' width='" + tamano_icono + "'>";
        icono = icono + "<rect id='rect_" +  this.objpropiedades["id"]+"_"+ this.objpropiedades["serial"] + "'  x='" + rel_x + "' y='" + rel_y + "'  width='" + rel_w + "' height='" + rel_h + "'  rx='" + rel_rx + "' ry='" + rel_ry + "'  style='fill:" + col_fondo + ";stroke-width:" + rel_sw + ";stroke:" + col_borde + "' />";
        icono = icono + "<text fill='" + col_letra + "'  lengthAdjust='spacingAndGlyphs' x='" + rel_xt + "' y='" + rel_yt + "' font-family='Tahoma' font-size='" + rel_fs + "'>" + letra + "</text>";
        icono = icono + "</svg>";
    }
    else {
        var icono = "<svg height='" + tamano_icono + "' width='" + tamano_icono + "'>";
        icono = icono + "<image xlink:href='" + ruta + "' height='" + tamano_icono + "' width='" + tamano_icono + "' clip-path='url(#clip" + this.objpropiedades["serial"] + ")'></image>";
        icono = icono + "</svg>";

        icono = icono + "<svg height='0' width='0'> <defs> <clipPath id='clip" + this.objpropiedades["serial"] + "'>";
        icono = icono + "<rect id='rect_icono_" + this.objpropiedades["serial"] + "' x='" + rel_x + "' y='" + rel_y + "'  width='" + rel_w + "' height='" + rel_h + "'  rx='" + rel_rx + "' ry='" + rel_ry + "'  style='fill:" + col_fondo + ";stroke-width:" + rel_sw + ";stroke:" + col_borde + "' />";
     //   icono = icono + " <ellipse cx='" + "30" + "' cy='" + "30" + "' rx='" + "30" + "' ry='" + "30" + "'></ellipse>";
        icono = icono + " </clipPath></defs></svg>";
    }
    papasvg.style.padding = "0px";
    papasvg.style.margin = "0px";
    papasvg.style.border = "0px";
    papasvg.innerHTML = icono;
    var div1 = document.createElement("div");
    div1.appendChild(papasvg);

    var texto = this.objpropiedades["nombre"];
    var arrtextop1 = texto.split(' ');

    var parte1 = arrtextop1[0];

    var parte2 = "";
    var m = 1;
    while (m < arrtextop1.length) {
        parte2 = parte2 + arrtextop1[m] + " ";
        m++;
    }
    parte2 = trim(parte2);

    var div2 = document.createElement("div");
    var sp1 = document.createElement("span");
    sp1.style.fontFamily = "Tahoma";
    sp1.style.fontSize = "11px";
    sp1.style.lineHeight = "1.1em";
    sp1.style.letterSpacing = "1.5px";
    sp1.style.fontWeight = "normal";
    sp1.style.color = "#000";
    div2.style.textOverflow = "ellipsis";
    div2.style.textAlign = "center";
    div2.style.whiteSpace = "nowrap";
    div2.style.overflow = "hidden";
    sp1.innerText = parte1;
    div2.appendChild(sp1);

    if (parte2 != "") {
        var div2a = document.createElement("div");
        var sp1 = document.createElement("span");
        sp1.style.fontFamily = "Tahoma";
        sp1.style.fontSize = "11px";
        sp1.style.lineHeight = "1.1em";
        sp1.style.letterSpacing = "1.5px";
        sp1.style.fontWeight = "normal";
        sp1.style.color = "#000";
        div2a.style.textOverflow = "ellipsis";
        div2a.style.whiteSpace = "nowrap";
        div2a.style.textAlign = "center";
        div2a.style.overflow = "hidden";
        sp1.innerText = parte2;
        div2a.appendChild(sp1);
    }



    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.title = texto;
    link.ubicacion = this.objpropiedades["ubicacion"];
  //  alert(this.objpropiedades["funcion_clic_dato"]);
    link.funcion_clic_dato = this.objpropiedades["funcion_clic_dato"];
    link.serial = this.objpropiedades["serial"];
    link.style.textDecoration = "none";
    link.onclick = function (evt) {
       
        eval(this.funcion_clic_dato + "('" + this.serial + "')");

      //  document.location = "../" + this.ubicacion;
     
       
        return false;
    }

    link.appendChild(div1);
    link.appendChild(div2);

    var divac = div1;
    var divbc = div2;
    //var div_html = document.createElement("div");
    //div_html.appendChild(divac);
    //div_html.appendChild(divbc);
    this.objpropiedades["div_html_icono"] = div1.innerHTML;
    this.objpropiedades["div_html"] = link.innerHTML;

    if (parte2 != "") {
        link.appendChild(div2a);
    }
    return link;

}

var mensajejava = function () {
    var objpropiedades= new Object();
    this.objpropiedades = new Object();
}
mensajejava.prototype.bind = function () {
    //objpropiedades[div_cubre]
    var divpapa = d(this.objpropiedades["div_cubre"]);
    var div1 = document.createElement("div");
  
    div1.style.position = "absolute";
    div1.style.background = this.objpropiedades["color_fondo"];
    div1.style.border = this.objpropiedades["borde_caja"] + " solid " + this.objpropiedades["color_borde"];
    div1.style.borderRadius = this.objpropiedades["radio_borde_caja"];
    div1.style.boxShadow = this.objpropiedades["tamano_sobra"] + " " + this.objpropiedades["tamano_sobra"] + " 2px #888888";
    div1.style.top = this.objpropiedades["top_caja"];
    div1.style.width = this.objpropiedades["ancho_caja"];
    div1.style.height = this.objpropiedades["alto_caja"];
    div1.style.left = this.objpropiedades["left_caja"];
  
    var divcaja = document.createElement("div");
    divcaja.style.background = this.objpropiedades["color_fondo"];
    divcaja.style.border = "0px none transparent";
    divcaja.style.borderRadius = this.objpropiedades["radio_borde_caja"];
    divcaja.style.top = this.objpropiedades["top_caja"];
    divcaja.style.width = this.objpropiedades["ancho_caja"];
    divcaja.style.height = this.objpropiedades["alto_caja"];
    divcaja.style.left = this.objpropiedades["left_caja"];
    divcaja.id = this.objpropiedades["id_caja"];
 
    div1.id = this.objpropiedades["id_caja"] + "_papa";
    div1.appendChild(divcaja);
   
    var div12 = document.createElement("div");

    div12.style.border="solid transparent";
    div12.style.content=" ";
    div12.style.height="0";
    div12.style.width="0";
    div12.style.position="absolute";
    div12.style.borderWidth = this.objpropiedades["tamano_triangulo_borde"];

    if (this.objpropiedades["flecha_posicion"] == "1") {
        div12.style.borderBottomColor = this.objpropiedades["color_borde"];
        div12.style.marginLeft = "-" + this.objpropiedades["tamano_triangulo_borde"];
        div12.style.bottom = "100%";
        div12.style.left = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "2") {
        div12.style.borderLeftColor = this.objpropiedades["color_borde"];
        div12.style.marginTop = "-" + this.objpropiedades["tamano_triangulo_borde"];
        div12.style.left = "100%";
        div12.style.top = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "3") {
        div12.style.borderTopColor = this.objpropiedades["color_borde"];
        div12.style.marginLeft = "-" + this.objpropiedades["tamano_triangulo_borde"];
        div12.style.top = "100%";
        div12.style.left = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "4") {
        div12.style.borderRightColor = this.objpropiedades["color_borde"];
        div12.style.marginTop = "-" + this.objpropiedades["tamano_triangulo_borde"];
        div12.style.right = "100%";
        div12.style.top = this.objpropiedades["ubicacion_triangulo"];
    }
    div1.appendChild(div12);
    
    var div11 = document.createElement("div");
 
    div11.style.border = "solid transparent";
    div11.style.content = " ";
    div11.style.height = "0";
    div11.style.width = "0";
    div11.style.position = "absolute";
    div11.style.borderWidth = this.objpropiedades["tamano_triangulo_interno"];

    if (this.objpropiedades["flecha_posicion"] == "1") {
        div11.style.borderBottomColor = this.objpropiedades["color_fondo"];
        div11.style.marginLeft = "-" + this.objpropiedades["tamano_triangulo_interno"];
        div11.style.bottom = "100%";
        div11.style.left = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "2") {
        div11.style.borderLeftColor = this.objpropiedades["color_fondo"];
        div11.style.marginTop = "-" + this.objpropiedades["tamano_triangulo_interno"];
        div11.style.left = "100%";
        div11.style.top = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "3") {
        div11.style.borderTopColor = this.objpropiedades["color_fondo"];
        div11.style.marginLeft = "-" + this.objpropiedades["tamano_triangulo_interno"];
        div11.style.top = "100%";
        div11.style.left = this.objpropiedades["ubicacion_triangulo"];
    }
    else if (this.objpropiedades["flecha_posicion"] == "4") {
        div11.style.borderRightColor = this.objpropiedades["color_fondo"];
        div11.style.marginTop = "-" + this.objpropiedades["tamano_triangulo_interno"];
        div11.style.right = "100%";
        div11.style.top = this.objpropiedades["ubicacion_triangulo"];
    }
    div1.appendChild(div11);
    divpapa.appendChild(div1);
   

    var n = 0;
    while (n < this.objpropiedades["eventos_muestra"].length)
    {
        div1.style.display = "none";
        d(this.objpropiedades["elemento_evento"]).addEventListener(this.objpropiedades["eventos_muestra"][n], function () {
            
            if (div1.style.display=="none")
                div1.style.display = "block";
            else
                div1.style.display = "none";
        },
        false);
        n++;
    }
    var inicia_activo = false;
    if(this.objpropiedades["inicia_activo"]!=undefined)
    {
        inicia_activo = this.objpropiedades["inicia_activo"];
        if(inicia_activo==true)
        {
            div1.style.display = "block";
        }
        else
            div1.style.display = "none";
    }

}
mensajejava.prototype.bind2 = function () {
    //objpropiedades[div_cubre]
    var divpapa = d(this.objpropiedades["div_cubre"]);
    var div1 = document.createElement("div");
    div1.style.width = "0px";
    div1.style.height = "0px";
    div1.style.borderLeft = this.objpropiedades["ancho_izquierda_flecha"] + " solid transparent";
    div1.style.borderRight = this.objpropiedades["ancho_derecho_flecha"] + " solid transparent";
    div1.style.borderBottom = this.objpropiedades["alto_flecha"] + " solid " + this.objpropiedades["color"];
    div1.style.display = "block";
    div1.id = "0div_flecha_" + this.objpropiedades["div_cubre"];
    
    div1.style.position = "absolute";
    div1.style.top = "48px";
    div1.style.left = "10px";
    div1.style.filter = " drop-shadow(0px 0px 10px rgba(0,0,0,.5));"
    divpapa.appendChild(div1);

}


var globjdatosmapas;
var map;

function carga_mapas_pre(objconfigmapas)
{
    if (objconfigmapas["editable"] == undefined)
        objconfigmapas["editable"] = true; 

    if (objconfigmapas["campo_color"] == undefined)
        objconfigmapas["campo_color"] = "color";

    glarrseriales_modmapas = new Array();
    var divm1 = document.createElement("div");
    divm1.id = "divmapa1";

    var divm2 = document.createElement("div");
    divm2.id = "divmapa2";
    divm2.style.width = objconfigmapas["ancho_mapa"];
    divm2.style.height = objconfigmapas["largo_mapa"];

    var divm3 = document.createElement("div");
    divm3.id = "divmapa3";
    divm3.style.display = "inline-block";

    var divm4 = document.createElement("div");
    divm4.id = "divm4";
   // debugger;
    if (d("divmapa1")==null)
        divm4.appendChild(divm1);

    divm4.style.display = "inline-block";

    if (d("divm4") == null)
        document.getElementById(objconfigmapas["div"]).appendChild(divm4);
    if (d("divmapa3") == null)
        document.getElementById(objconfigmapas["div"]).appendChild(divm3);
    if (d("divmapa2") == null)
        document.getElementById(objconfigmapas["div"]).appendChild(divm2);
    globjdatosmapas = objconfigmapas;

    var markers = [];
    map = new google.maps.Map(document.getElementById("divmapa2"), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var strobjconfigmapas = String(objconfigmapas["ubicacion_inicial"]).split(",");
    var strobjconfigmapas2 = String(objconfigmapas["ubicacion_inicial2"]).split(",");

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(parseFloat(strobjconfigmapas[0]), parseFloat(strobjconfigmapas[1])),
        new google.maps.LatLng(parseFloat(strobjconfigmapas2[0]), parseFloat(strobjconfigmapas2[1])));

    map.fitBounds(defaultBounds);
    var inp = document.createElement("input");
    inp.id = "txt_" + objconfigmapas["id"];
    inp.type = "text";
    inp.setAttribute("class", "mapatexto");
    inp.placeholder = objconfigmapas["texto_buscador_mapas"];

    document.getElementById(objconfigmapas["id_body"]).appendChild(inp);

    var input = (
        document.getElementById("txt_" + objconfigmapas["id"]));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
        }
        //map.setZoom(1);
        map.fitBounds(bounds);
        map.setZoom(16);
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });

}
var glarrseriales_modmapas = new Array();
function carga_mapas(objconfigmapas)
{

    carga_mapas_pre(objconfigmapas);
    var arrenvio =
        [
            {
                tabla: objconfigmapas["tabla"],
                llave_tabla: objconfigmapas["llave_tabla"],
                texto_tabla: objconfigmapas["texto_tabla"],
                campo: objconfigmapas["campo"],
                filtro: objconfigmapas["filtro"],
                campos_extra: objconfigmapas["campos_extra"],
                tablas_auxi: objconfigmapas["tablas_auxi"]
            }

        ];
    call_sgu(arma_datos_mapas_post, [arrenvio], "arma_datos_mapas", "varios");

}
var gldtvmaps;
var gldtvsin_ubicacion;
var gltotalmaps;
var gltotalmaps_back;
function arma_datos_mapas_post(respuesta)
{
   
    var dtv1 = new vista(respuesta["Table"], "['" + globjdatosmapas["campo"] + "']!='' && ['"+ globjdatosmapas["campo"]+"']!='-1'", '', '');
    var dtv2 = new vista(respuesta["Table"], "['" + globjdatosmapas["campo"] + "']==''", '', '');
    gldtvsin_ubicacion = dtv2;
    gldtvmaps = dtv1;
    gltotalmaps = respuesta["Table"];
    gltotalmaps_back = copia_arreglo_objeto(respuesta["Table"], 0);

    

    var n = 0;
    if (glpinta_inicial_mapas == 0) {
        while (n < dtv1.length) {

            var strubicacion = String(dtv1[n][globjdatosmapas["campo"]]).split(",");
            anadir_punto_mapa(dtv1[n][globjdatosmapas["llave_tabla"]], dtv1[n][globjdatosmapas["texto_tabla"]], parseFloat(strubicacion[0]), parseFloat(strubicacion[1]), 0);
            n++;
        }
    }
    d("divmapa3").innerHTML = "<a  href='#' onclick='return sin_ubicacion()'  style=' Font-family:Tahoma; Font-size:13px; display:inline-block; color:#5aa0dc;margin-left:5px; '>" + 
    globjdatosmapas["texto_sin_ubicacion"] + "</a> <a id='lnk_guardar_cambios'  href='#' onclick='return guardar_ubicacion_mapas()' style=' visibility:hidden;background-Color:#E6DFCC; border-style:dotted; border-color:black; padding:10px; Font-family:Tahoma; Font-size:13px;color:#CE2222; display:inline-block; widtg:100%;border-width:thin;'>Clic aquí para guardar cambios</a><a id='lnk_guardar_cambios2'  href='#' onclick='return guardar_ubicacion_mapas2()' style=' visibility:hidden;background-Color:#E6DFCC; border-style:dotted; border-color:black; padding:10px; Font-family:Tahoma; Font-size:13px;color:black; display:inline-block; widtg:100%;border-width:thin;'>Deshacer todos los cambios</a>";

   // d("divmapa3").innerHTML = "";
    var id_auto = "txt_mapas_buscar";


    var arr2 = new Array();
    var arr3 = new Array();
    var m = 0;
    while (m < globjdatosmapas["columnas_grilla_buscador"].length)
    {

        arr2[arr2.length] = "0";
        arr3[arr3.length] = "";
        
        m++;
    }

    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divmapa1",
        fuente: dtv1 ,
        nombre_en_fuente: globjdatosmapas["texto_tabla"],
        serial_en_fuente: globjdatosmapas["llave_tabla"],
        columnas_busqueda: [globjdatosmapas["texto_tabla"]],
        columnas_grilla: globjdatosmapas["columnas_grilla_buscador"],
        id_cuerpo_pagina: globjdatosmapas["id_body"],
        datos_enviados_selecciona_teclado: [globjdatosmapas["texto_tabla"]],
        funcion_clic_dato: "funcion_clic_mapas",
        estilo_grilla: "width:650px",
        tipo_columna_grilla: arr2,
        estilo_columna_grilla: globjdatosmapas["estilo_columnas_grilla_buscador"],
        funcion_columna_grilla: arr3,
        top_grilla: "29px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: globjdatosmapas["ancho_grilla_buscador"],
        alto_caja_texto: "30px"
        
    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = globjdatosmapas["texto_buscador_prin"];
    arma_modal_sin_ubicacion();
    //;   
}

function cambio_filtro_ubicacion(obj)
{
    sin_ubicacion();
}

function arma_modal_sin_ubicacion()
{
    var html_filtro = "<span style='Font-Family:Tahoma; Font-size:13px; position:relative; top:-3px; margin-right:5px;'>Filtrar por:</span><select id='drp_id_mapa_filtro' onchange='cambio_filtro_ubicacion(this)' style='width:180px'>";
    html_filtro = html_filtro + " <option  value ='1'>Sin Ubicación</option>";
    html_filtro = html_filtro + " <option selected value ='2'>Pendiente x Ubicación</option>";
    html_filtro = html_filtro + " <option value ='3'>Con Ubicación</option>";
    html_filtro = html_filtro + "</select>";

    var html1 = "<div class='div_modal' id='div_modacrearrep' style='display:none'>";
    var html1 = html1 + "<fieldset>" + html_filtro + "<div style='overflow-y:scroll; height:400px; '><div id='div_sinubicacion'></div></div></fieldset></div>";
    var div1 = document.createElement("div");
    div1.id = "div_master_maps";
    div1.innerHTML = html1;

    if (d("div_master_maps") == null)
        d(globjdatosmapas["id_body"]).appendChild(div1);
    else
        d("div_master_maps").innerHTML = html1;

    carga_inicio_pre();
    $("#div_modacrearrep > div > div")[0].style.width = "80%";

    return false;
}
function sin_ubicacion()
{
    ic();
    d("div_modacrearrep").style.display = "block";

    var valor = d("drp_id_mapa_filtro").options[d("drp_id_mapa_filtro").selectedIndex].value;
  
    var dtv1;

    if (valor == "1")
        dtv1 = new vista(gltotalmaps, "['" +  globjdatosmapas["campo"] + "']=='-1'", '', '');
    else if (valor == "2")
        dtv1 = new vista(gltotalmaps, "['" +  globjdatosmapas["campo"] + "']==''", '', '');
    else if (valor == "3")
        dtv1 = new vista(gltotalmaps, "['" + globjdatosmapas["campo"] + "']!='' && ['" + globjdatosmapas["campo"] + "']!='-1'", '', '');


    var arr1 = new Array();
    var arr2 = new Array();
    var arr3 = new Array();
    var n = 0;

    while (n < globjdatosmapas["campos_grilla_mapas_titulo"].length) {
        if (n == 0) {
            arr1[arr1.length] = "1";
            arr2[arr2.length] = "retorno_grilla_mapa";
        }
        else {
            arr1[arr1.length] = "0";
            arr2[arr2.length] = "";
        }
        arr3[arr3.length] = "'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '";
        n++;
    }
    arr1[arr1.length] = "1";
    arr2[arr2.length] = "retorno_combo_mapa";
    arr3[arr3.length] = "'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '";

    var arr4 = new Array();
    n = 0;
    while (n < globjdatosmapas["campos_grilla_mapas_titulo"].length) {
        arr4[arr4.length] = globjdatosmapas["campos_grilla_mapas_titulo"][n];
        n++;
    }
    arr4[arr4.length] = "";

    var arr5 = new Array();
    n = 0;
    while (n < globjdatosmapas["campos_grilla_mapas_dato"].length) {
        arr5[arr5.length] = globjdatosmapas["campos_grilla_mapas_dato"][n];
        n++;
    }
    arr5[arr5.length] = globjdatosmapas["campo"];

    //  else if (valor == "3")
    var grilla = new grillajava();
    grilla.fuente = dtv1;
    grilla.div = "div_sinubicacion";
    grilla.id = "gw_sinubicacion"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = arr4;
    grilla.datoscolumnas = arr5;
    grilla.tipocolumna = arr1;
    grilla.funcioncolumna = arr2;
    grilla.estilocolumna = arr3;
    grilla.bind();
    fc();
    return false;
}
  
function cambio_dato_ubicacion(serial,obj)
{
    var valor = "";
    if (obj.value == "1")
    {
        valor = "-1";
    }
    else if (obj.value == "2")
    {
        valor = "";
    }
    else if (obj.value == "3")
    {
        valor = "";
    }
    var n = 0;
    while(n<gltotalmaps.length)
    {
        if (gltotalmaps[n][globjdatosmapas["llave_tabla"]] == serial)
        {
            if ((obj.value == "1") || (obj.value == "2")) {
                gltotalmaps[n][globjdatosmapas["campo"]] = valor;
                d("lnk_guardar_cambios").style.visibility = "visible";
                d("lnk_guardar_cambios2").style.visibility = "visible";
                glarrseriales_modmapas[glarrseriales_modmapas.length] = serial;

            }
        }
        n++;
    }
   // alert(serial);
   // alert(obj.value);
}
function retorno_combo_mapa(fila,dato)
{
    var html = "";
    html = html + "<select onchange='cambio_dato_ubicacion(" + '"' + fila[globjdatosmapas["llave_tabla"]] + '"' + ",this)' style='width:180px'>";

    var seleccionado = "";
    if (fila[globjdatosmapas["campo"]] == "-1")
        seleccionado = "selected";

    html = html + " <option " + seleccionado + " value ='1'>Sin Ubicación</option>";

    seleccionado = "";
    if (fila[globjdatosmapas["campo"]] == "")
        seleccionado = "selected";

    html = html + " <option " + seleccionado + " value ='2'>Pendiente x Ubicación</option>";

    seleccionado = "";
    if ((fila[globjdatosmapas["campo"]] != "-1")&&(fila[globjdatosmapas["campo"]] != ""))
        seleccionado = "selected";

    html = html + " <option " + seleccionado + " value ='3'>Con Ubicación</option>";
    html = html + "</select>";
    return html;
}
function retorno_grilla_mapa(fila,dato)
{
    return "<a href='#' onclick='return selecciono_grilla_mapa(" + fila[globjdatosmapas["llave_tabla"]] + ")' style= color:#5aa0dc; '>" + fila[globjdatosmapas["texto_tabla"]] + "</a>";
}
var glultserial_mapa = "";
var glulttexto_mapa = "";
var glultcolor_mapa = "";
function selecciono_grilla_mapa(serial)
{
    
 

        var dtv1 = new vista(gltotalmaps, "['" + globjdatosmapas["llave_tabla"] + "']=='" + serial + "'", '', '');
        if (dtv1.length > 0) {



            glultserial_mapa = serial;
            glulttexto_mapa = dtv1[0][globjdatosmapas["texto_tabla"]];

            if ((dtv1[0][globjdatosmapas["campo"]] == "") || (dtv1[0][globjdatosmapas["campo"]] == "-1")) {

                var n = 0;

                var cadena_envio = "";
                while (n < globjdatosmapas["campos_envio_mapas"].length) {
                    cadena_envio = cadena_envio + dtv1[0][globjdatosmapas["campos_envio_mapas"][n]] + ", ";
                    n++;
                }
                if (cadena_envio != "") {
                    cadena_envio = cadena_envio.substr(0, cadena_envio.length - 2);
                    glcadena_envio = cadena_envio;
                    var defaultBounds22 = new google.maps.places.AutocompleteService();
                    defaultBounds22.getQueryPredictions({ input: cadena_envio }, termino_b1mapas)

                }
            }
            else {
                var strubicacion = String(dtv1[0][globjdatosmapas["campo"]]).split(",");
                d("div_modacrearrep").style.display = "none";
                map.setCenter({ lat: parseFloat(strubicacion[0]), lng: parseFloat(strubicacion[1]) });
                map.setZoom(15);
            }

        }
   
  
    //alert(serial);
}
var glcadena_envio = "";
function termino_time()
{
    var arr1 = String(glcadena_envio).split(", ");
    var n = 0;
    var cadena_envio = "";
    while (n < arr1.length - 1) {
        cadena_envio = cadena_envio + arr1[n] + ", ";
        n++;
    }
    if (cadena_envio != "") {
      
        cadena_envio = cadena_envio.substr(0, cadena_envio.length - 2);
        glcadena_envio = cadena_envio;
        var defaultBounds22 = new google.maps.places.AutocompleteService();
        defaultBounds22.getQueryPredictions({ input: cadena_envio }, termino_b1mapas)

    }
}
function termino_b1mapas(respuesta)
{
    if (respuesta != null) {

        var referencia = "";
        var n = 0;
        while (n < respuesta.length)
        {
            if (respuesta[n]["reference"] != undefined)
            {
                referencia = respuesta[n]["reference"];
                break;
            }
            n++;
        }
        if (referencia == "")
            setTimeout("termino_time()", 100);

        var defaultBounds3 = new google.maps.places.PlacesService(document.getElementById("div_id1"));
        defaultBounds3.getDetails({ reference: referencia }, termino_b2mapas);
    }
    else
    {
        setTimeout("termino_time()", 100);
    }
}

function termino_b2mapas(respuesta)
{

    var lon = respuesta["geometry"]["location"].B;
    if (respuesta["geometry"]["location"].B == undefined)
        lon = respuesta["geometry"]["location"].D;
    anadir_punto_mapa(glultserial_mapa, glulttexto_mapa, respuesta["geometry"]["location"].k, lon, 1);
}
function guardar_ubicacion_mapas() {


    var arrenviado = new Array();
    var objseriales = new Object();
    var n = 0;
    while (n < glarrseriales_modmapas.length) {

        objseriales[glarrseriales_modmapas[n]] = "";
        n++;
    }
    for (k in objseriales)
    {
        var obj1 = new Object();
        var dtv1 = new vista(gltotalmaps, "['" + globjdatosmapas["llave_tabla"] + "']=='" + k + "'", '', '');
        obj1["serial"] = k;
        obj1["dato"] = dtv1[0][globjdatosmapas["campo"]];
        arrenviado[arrenviado.length] = obj1;
    }




    var arrenvio =
    [
        {
            tabla: globjdatosmapas["tabla"],
            llave_tabla: globjdatosmapas["llave_tabla"],
            texto_tabla: globjdatosmapas["texto_tabla"],
            campo: globjdatosmapas["campo"],
            filtro: globjdatosmapas["filtro"],
            campos_extra: globjdatosmapas["campos_extra"],
            tablas_auxi: globjdatosmapas["tablas_auxi"]
        }

    ];
    carga_mapas_pre(globjdatosmapas);
    call_sgu(arma_datos_mapas_post, [arrenvio, arrenviado], "guarda_datos_mapas", "varios");
    return false;
}
var glpinta_inicial_mapas = 0;
var glfuncion_busqueda_clic_mapas = 0;

function funcion_clic_mapas(serial,nombre)
{
    //  debugger;

    if ((globjdatosmapas["funcion_selecciono_busqueda"] == undefined) || (globjdatosmapas["funcion_selecciono_busqueda"] == "")) {

        var dtv1 = new vista(gltotalmaps, "['" + globjdatosmapas["llave_tabla"] + "']=='" + serial + "'", '', '');
        if (dtv1.length > 0) {
            var strubicacion = String(dtv1[0][globjdatosmapas["campo"]]).split(",");
            // map.setCenter(parseFloat(strubicacion[0]), parseFloat(strubicacion[1])); 
            d("txt_mapas_buscar").value = dtv1[0][globjdatosmapas["texto_tabla"]];
            map.setCenter({ lat: parseFloat(strubicacion[0]), lng: parseFloat(strubicacion[1]) });
            map.setZoom(16);

        }
    }
    else
        eval(globjdatosmapas["funcion_selecciono_busqueda"] + "('" + serial + "')");
}

function anadir_punto_mapa(serial,texto,latitud,longitud,modo)
{

    //var marker = new google.maps.Marker({
    //    position: { lat: latitud, lng: longitud },
    //    map: map,
    //    draggable: true,
    //    Icon: {
    //        url: globjdatosmapas["url_foto"]
    //    },
    //    title: texto,


    //});
    var dtv1 = new vista(gltotalmaps, "['" + globjdatosmapas["llave_tabla"] + "']=='" + serial + "'", '', '');

    var color = "";
    if (dtv1[0][globjdatosmapas["campo_color"]] == undefined) {
        color = "blue";
    }
    else {
        color = dtv1[0][globjdatosmapas["campo_color"]];
    }

    var marker = new google.maps.Marker({
        position: { lat: latitud, lng: longitud },
        map: map,
        draggable: globjdatosmapas["editable"],
        icon: {
            path: "M2 9 V2 H10 V9 H2 M6 2 V1 H14 V9 H10 M2 3 H6 V9 M3 8 V5 H5 V8 H3  M4 8 V5 M3 6 H5 M3 7 H5 M7 4 V3 H9 V4 H7 M8 4 V3 M7 8 V5 H9 V8 H7 M7 7 H9 M 7 6 H9 M8 8 V5 M11 8 V5 H13 V8 H11 M12 8 V5 M11 7 H13 M11 6 H13 M11 4 V2 H13 V4 H11 M11 3 H13 M12 4 V2 M14 9 L15 10 H1 L2 9 L1 10 M3 3  V4 H5 V3 M4 4 L4 3",
            scale: 3,
            strokeWeight: 0.7,
            fillColor: "red",
            strokeColor: color
        },
        title: texto,


    });
    var dtv_fil = new vista(gltotalmaps, "['" + globjdatosmapas["llave_tabla"] + "']=='" + serial + "'", '', '');

    var html_info = globjdatosmapas["html_info_mapa"];
    var i = 0;
    while (i < globjdatosmapas["campos_datos"].length)
    {
        html_info = replaceAll(html_info, "@" + globjdatosmapas["campos_datos"][i] + "@", dtv_fil[0][globjdatosmapas["campos_datos"][i]]);
        i++;
    }
    var infowindow = new google.maps.InfoWindow({
        content: html_info
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    marker.serial = serial;

    if (modo == 1) {
        d("div_modacrearrep").style.display = "none";
        map.setCenter({ lat: parseFloat(latitud), lng: parseFloat(longitud) });
        map.setZoom(15);

        var valor = latitud + "," + longitud;
        var n = 0;
        while (n < gltotalmaps.length) {
            if (gltotalmaps[n][globjdatosmapas["llave_tabla"]] == serial) {

                gltotalmaps[n][globjdatosmapas["campo"]] = valor;
                d("lnk_guardar_cambios").style.visibility = "visible";
                d("lnk_guardar_cambios2").style.visibility = "visible";
                glarrseriales_modmapas[glarrseriales_modmapas.length] = serial;
            }
            n++;
        }

    }
  

    google.maps.event.addListener(marker, "dragend", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var valor = lat + "," + lng;

        var n = 0;
        while (n < gltotalmaps.length) {
            if (gltotalmaps[n][globjdatosmapas["llave_tabla"]] == serial) {

                gltotalmaps[n][globjdatosmapas["campo"]] = valor;
                d("lnk_guardar_cambios").style.visibility = "visible";
                d("lnk_guardar_cambios2").style.visibility = "visible";
                glarrseriales_modmapas[glarrseriales_modmapas.length] = serial;

            }
            n++;
        }
        //alert(lat);
      
    });
}

function guardar_ubicacion_mapas2()
{
    carga_mapas_pre(globjdatosmapas);
    arma_datos_mapas_post({ Table: gltotalmaps_back });
    return false;
}

function eliminar_fila(datos,nombre_serial,serial)
{
    var n = 0;
    var arrnuevo = new Array();
    while(n<datos.length)
    {
        if (datos[n][nombre_serial] != serial)
        {
            var objnuevo = new Object();
            for (k in datos[n]) {
                objnuevo[k] = datos[n][k];
            }
            arrnuevo[arrnuevo.length] = objnuevo;
        }

        n++;
    }

    return arrnuevo;
}
function forma_datos_uno_muchos()
{
    ic();
    setTimeout("forma_datos_uno_muchos_tim()", 200);
}

function forma_datos_uno_muchos_tim()
{
    var arr_envio = new Array();
    for (k in globjconfiguracion_uno_muchos) {
        var obj1 = new Object();
        obj1["id"] = k;
        obj1["tabla_muchos"] = globjconfiguracion_uno_muchos[k]["tabla_muchos"];
        obj1["campo_muchos"] = globjconfiguracion_uno_muchos[k]["campo_muchos"];
        obj1["llave_muchos"] = globjconfiguracion_uno_muchos[k]["llave_muchos"];
        obj1["filtro_muchos"] = globjconfiguracion_uno_muchos[k]["filtro_muchos"];

        arr_envio[arr_envio.length] = obj1;
    }

    call_sgu(carga_datos_muchos_post, [arr_envio], "consulta_datos_unom", "form");
}
function carga_datos_muchos_post(respuesta)
{
    for (k in respuesta) {
        var htmlrep = "<table><tr><td style='vertical-align:top'><div id='div_rep1_" + k + "' style='display:inline-block;width:50%'></div></td><td style='vertical-align:top'><div  id='div_rep2_" + k + "' style='display:inline-block;width:100%; overflow-y:scroll; height:" + globjconfiguracion_uno_muchos[k]["tamano_grilla"] + ";'></div></td></tr></table>";
        d(globjconfiguracion_uno_muchos[k]["div"]).style.textAlign = "left";
        htmlrep = htmlrep + "<div style='text-align:center' ><a class='button grey' href='#' id='a_reporte_"+k+"' style='width:60px' onclick='guardar_uno_muchos("+ '"'+ k + '"'+")'>" + globjconfiguracion_uno_muchos[k]["texto_boton"] + "</a></div>";
        d(globjconfiguracion_uno_muchos[k]["div"]).innerHTML = htmlrep;

        var id_auto = "txt_auto_"+k;
        var top = "54px";
        if (globjconfiguracion_uno_muchos[k]["top_grilla"] != undefined)
        {
            top = globjconfiguracion_uno_muchos[k]["top_grilla"];
        }

        var left = "12px";
        if (globjconfiguracion_uno_muchos[k]["left_grilla"] != undefined) {
            left = globjconfiguracion_uno_muchos[k]["left_grilla"];
        }


        glconfiguracion_general_auto[id_auto] =
        {
            id_texto: id_auto,
            div: "div_rep1_" + k,
            fuente: respuesta[k],
            nombre_en_fuente: globjconfiguracion_uno_muchos[k]["campos_mostrar"][0],
            serial_en_fuente: globjconfiguracion_uno_muchos[k]["llave_muchos"],
            columnas_busqueda: globjconfiguracion_uno_muchos[k]["campos_mostrar"],
            columnas_grilla: globjconfiguracion_uno_muchos[k]["campos_mostrar"],
            id_cuerpo_pagina: "cuerpo",
            datos_enviados_selecciona_teclado: [globjconfiguracion_uno_muchos[k]["campo_texto"]],
            funcion_clic_dato: "funcion_clic_uno_muchos",
            estilo_grilla: "width:450px",
            tipo_columna_grilla: ["0", "0"],
            estilo_columna_grilla: ["' text-align:center; font-family:Tahoma;  font-size:13px;width: 150px; text-align:center'", "'width: 250px; text-align:center; font-family:Tahoma; font-size:13px;'"],
            funcion_columna_grilla: ["", ""],
            top_grilla: top,
            left_grilla: left,
            maximos_resultados: 5,
            ancho_caja_texto: "450px",
            alto_caja_texto: "30px",
            opciones:k
        };
        globjconfiguracion_uno_muchos[k]["datos_muchos"] = respuesta[k];
        auto_completar_inicio(id_auto);
        d(id_auto).placeholder = globjconfiguracion_uno_muchos[k]["mensaje_buscar"];
        d(id_auto).style.height = "38px";
        d(id_auto).style.position = "relative";
        d(id_auto).style.top = "4px";
        d("divauto_" + id_auto).style.display = "block";

    }
    

}


function guardar_uno_muchos(llave)
{
    if (globjconfiguracion_uno_muchos[llave]["eliminados"] == null) {
        var arr1 = new Array();
        globjconfiguracion_uno_muchos[llave]["eliminados"] = arr1;
    }

    var arr1 = globjconfiguracion_uno_muchos[llave]["datos_tabla_datos"];
    var n = 0;
    var strcampos_grilla = "";
    while (n < arr1.length) {
        strcampos_grilla = strcampos_grilla + "det." + arr1[n] + ",";
        n++;
    }
    strcampos_grilla = strcampos_grilla.substr(0, strcampos_grilla.length - 1);

    var arr_envio = [{
        tabla_datos: globjconfiguracion_uno_muchos[llave]["tabla_datos"],
        tabla_llave: globjconfiguracion_uno_muchos[llave]["tabla_llave"],
        tabla_datos_llave_uno: globjconfiguracion_uno_muchos[llave]["tabla_datos_llave_uno"],
        tabla_datos_llave_muchos: globjconfiguracion_uno_muchos[llave]["tabla_datos_llave_muchos"],
        tabla_datos_campo_activo: globjconfiguracion_uno_muchos[llave]["tabla_datos_campo_activo"],
        tabla_muchos: globjconfiguracion_uno_muchos[llave]["tabla_muchos"],
        llave_muchos: globjconfiguracion_uno_muchos[llave]["llave_muchos"],
        dato_adicional_uno_muchos: globjconfiguracion_uno_muchos[llave]["dato_adicional_uno_muchos"],
        campo_muchos: strcampos_grilla,
        serial: glserial_uno_muchos
    }];

    var vtabla_llave = globjconfiguracion_uno_muchos[llave]["tabla_llave"];
    var vtabla_llave_muchos = globjconfiguracion_uno_muchos[llave]["tabla_datos_llave_muchos"];

    var vdato_adicional_uno_muchos = globjconfiguracion_uno_muchos[llave]["dato_adicional_uno_muchos"];

    var arrseriales_elim = new Array();
    var m = 0;
    while (m < globjconfiguracion_uno_muchos[llave]["eliminados"].length)
    {
        if (parseInt(globjconfiguracion_uno_muchos[llave]["eliminados"][m][vtabla_llave]) > 0)
        {
            var objserial_el = new Object();
            objserial_el["serial"] = globjconfiguracion_uno_muchos[llave]["eliminados"][m][vtabla_llave];
            arrseriales_elim[arrseriales_elim.length] = objserial_el;
        }
        m++;
    }

    var arrseriales_act = new Array();
    if (vdato_adicional_uno_muchos != "") {
        var m = 0;
        while (m < globjconfiguracion_uno_muchos[llave]["datos"].length) {
            if (parseInt(globjconfiguracion_uno_muchos[llave]["datos"][m][vtabla_llave]) > 0) {
                var objserial = new Object();
                objserial["serial"] = globjconfiguracion_uno_muchos[llave]["datos"][m][vtabla_llave];
                if (vdato_adicional_uno_muchos != "") {
                    objserial[vdato_adicional_uno_muchos] = globjconfiguracion_uno_muchos[llave]["datos"][m][vdato_adicional_uno_muchos];
                }
                arrseriales_act[arrseriales_act.length] = objserial;
            }
            m++;
        }
    }
    var arrseriales_ins = new Array();
    var m = 0;
    while (m < globjconfiguracion_uno_muchos[llave]["datos"].length) {
        if (parseInt(globjconfiguracion_uno_muchos[llave]["datos"][m][vtabla_llave]) < 0) {
            var objserial = new Object();
            objserial["serial"] = globjconfiguracion_uno_muchos[llave]["datos"][m][vtabla_llave];
            objserial["serial2"] = globjconfiguracion_uno_muchos[llave]["datos"][m][vtabla_llave_muchos];

            if (vdato_adicional_uno_muchos != "") {
                objserial[vdato_adicional_uno_muchos] = globjconfiguracion_uno_muchos[llave]["datos"][m][vdato_adicional_uno_muchos];
            }
            arrseriales_ins[arrseriales_ins.length] = objserial;
        }
        m++;
    }
    call_sgu(guarda_datos_muchos_post,
        [arr_envio,
        arrseriales_elim,
        arrseriales_act,
        arrseriales_ins
        ], "guarda_datos_muchos", "form");

}


function guarda_datos_muchos_post(respuesta)
{
    carga_editor_post(respuesta);
    globjconfiguracion_uno_muchos[glid_uno_muchos]["eliminados"] = [];
}

var glopciones_auto = "";
var glid_uno_muchos = "";
var glserial_uno_muchos = "";
function ver_editor(id,vserial)
{
    glserial_uno_muchos = vserial;
    glid_uno_muchos = id;
    var arr1=globjconfiguracion_uno_muchos[id]["datos_tabla_datos"];
    var n=0;
    var strcampos_grilla="";
    while(n<arr1.length)
    {
        strcampos_grilla = strcampos_grilla + "det." + arr1[n] + ",";
        n++;
    }
    strcampos_grilla=strcampos_grilla.substr(0,strcampos_grilla.length-1);

    var arr_envio = [{
        tabla_datos: globjconfiguracion_uno_muchos[id]["tabla_datos"],
        tabla_llave: globjconfiguracion_uno_muchos[id]["tabla_llave"],
        tabla_datos_llave_uno: globjconfiguracion_uno_muchos[id]["tabla_datos_llave_uno"],
        tabla_datos_llave_muchos: globjconfiguracion_uno_muchos[id]["tabla_datos_llave_muchos"],
        tabla_datos_campo_activo: globjconfiguracion_uno_muchos[id]["tabla_datos_campo_activo"],
        tabla_muchos: globjconfiguracion_uno_muchos[id]["tabla_muchos"],
        llave_muchos: globjconfiguracion_uno_muchos[id]["llave_muchos"],
        dato_adicional_uno_muchos: globjconfiguracion_uno_muchos[id]["dato_adicional_uno_muchos"],
        campo_muchos: strcampos_grilla,
        serial: vserial
    }];
    call_sgu(carga_editor_post, [arr_envio], "consulta_datos_muchos", "form");

}

function carga_editor_post(respuesta)
{
    globjconfiguracion_uno_muchos[glid_uno_muchos]["datos"] = respuesta["Table"];
    arregla_columnas_unom(glid_uno_muchos);
    pinta_uno_muchos(glid_uno_muchos);

}
function arregla_columnas_unom(id)
{
    var arr_datos = new Array();

    var n = 0;
    while (n < globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_tabla_datos"].length) {
        arr_datos[arr_datos.length] = globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_tabla_datos"][n];
        n++;
    }
    if(globjconfiguracion_uno_muchos[glid_uno_muchos]["dato_adicional_uno_muchos"]!="")
        arr_datos[arr_datos.length] = globjconfiguracion_uno_muchos[glid_uno_muchos]["dato_adicional_uno_muchos"];
    arr_datos[arr_datos.length] = globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_llave"];
    arr_datos[arr_datos.length] = globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_datos_llave_muchos"];

    globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"] = arr_datos;

}
function pinta_uno_muchos(id)
{
        glcontador_pinta_colm = 0;

        var arr1 = new Array();
        var n = 0;
        while (n < globjconfiguracion_uno_muchos[glid_uno_muchos]["encabezado_tabla_datos"].length)
        {
            arr1[arr1.length] = "1";
            n++;
        }

        var grilla = new grillajava();
        grilla.fuente = globjconfiguracion_uno_muchos[id]["datos"];
        grilla.div = "div_rep2_" + glid_uno_muchos;
        grilla.id = "gw_" + id;
        grilla.autorow = false;
        grilla.habencabezado = true;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:98%";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = globjconfiguracion_uno_muchos[glid_uno_muchos]["encabezado_tabla_datos"];
        grilla.datoscolumnas = globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"];
        grilla.tipocolumna = arr1;
        grilla.funcioncolumna = ["funcion_uno_muchos_g", "funcion_uno_muchos_g", "funcion_uno_muchos_g", "funcion_uno_muchos_g", "funcion_uno_muchos_g", "funcion_uno_muchos_g", "funcion_uno_muchos_g"];
        grilla.estilocolumna = globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_tabla_estilo"];
        grilla.bind();
}


var glcontador_pinta_colm = 0;
function funcion_uno_muchos_g(fila,dato)
{
    var ndat = globjconfiguracion_uno_muchos[glid_uno_muchos]["encabezado_tabla_datos"].length;
    var mod = glcontador_pinta_colm % ndat;
    glcontador_pinta_colm++;
    var campo = globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][mod];
    var llave = globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_llave"];
    var consecutivo = fila[llave];

    var retorno = "";

    if (globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_tabla_datos"].indexOf(campo) == -1) {

        if (campo == globjconfiguracion_uno_muchos[glid_uno_muchos]["dato_adicional_uno_muchos"])
        {
            var chequeado = "";
            if (dato == "1")
                chequeado = "checked";

            var chk1 = "<input onchange='cambio_uno_muchos(" + '"' + glid_uno_muchos + '","' + consecutivo + '"' + ',"' + campo + '"' + ")' type='checkbox' " + chequeado + " ";
            chk1 = chk1 + " name='checkbox_" + glid_uno_muchos + "_" + consecutivo + "' id='checkbox_" + glid_uno_muchos + "_" + consecutivo + "' class='css-checkbox'>";
            chk1 = chk1 + " <label style='font-weight:bold' for='checkbox_" + glid_uno_muchos + "_" + consecutivo + "' class='css-label'></label>";
            retorno = chk1;

        }
        else if (campo == globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_llave"]) {

            var quitar1 = "<svg height='20' width='20' style='cursor:pointer;' onclick='eliminar_llave_muchos(" + '"' + glid_uno_muchos + '"' + "," + '"' + consecutivo + '"' + ")'>";
            quitar1 = quitar1 + "<polygon points='4,3 4,1.5 8.0,1.5 8.0,0.8 12,0.8 12,1.5 16,1.5 16,3.0' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'>";
            quitar1 = quitar1 + "</polygon><polygon points='4,4 16,4 14,19 6,19' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'></polygon></svg>";
            retorno = quitar1;
        }
        else
            retorno = "";

    }
    else {
        retorno = dato;
    }

    return retorno;
}

function cambio_uno_muchos(llave, consecutivo, campo)
{
    var llave_tabla = globjconfiguracion_uno_muchos[llave]["tabla_llave"];
    var n = 0;
    while (n < globjconfiguracion_uno_muchos[llave]["datos"].length) {
        var objnuevo = new Object();
        globjconfiguracion_uno_muchos[llave]["datos"][n][campo]

        if (globjconfiguracion_uno_muchos[llave]["datos"][n][llave_tabla] == consecutivo) {
            if (d("checkbox_" + llave + "_" + consecutivo).checked == true)
                globjconfiguracion_uno_muchos[llave]["datos"][n][campo] = "1";
            else
                globjconfiguracion_uno_muchos[llave]["datos"][n][campo] = "0";
        }
        n++;
    }

}
function funcion_clic_uno_muchos(serial_dato)
{
    glid_uno_muchos = glopciones_auto;
    var dtv_revisa = new vista(globjconfiguracion_uno_muchos[glid_uno_muchos]["datos"], "['" + globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_datos_llave_muchos"] + "']=='" + serial_dato + "'", '', '');

    if (dtv_revisa.length == 0) {
        var objnuevo = new Object();
        var consecutivo;
        if (globjconfiguracion_uno_muchos[glid_uno_muchos]["consecutivo"] != null) {
            consecutivo = parseInt(globjconfiguracion_uno_muchos[glid_uno_muchos]["consecutivo"]) + 1;
        }
        else {
            consecutivo = -1000;
        }
        objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_llave"]] = consecutivo;
        globjconfiguracion_uno_muchos[glid_uno_muchos]["consecutivo"] = consecutivo;

        var n = 0;
        while (n < globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"].length) {

            if (globjconfiguracion_uno_muchos[glid_uno_muchos]["campos_mostrar"].indexOf(globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]) == -1) {

                if (globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n] == globjconfiguracion_uno_muchos[glid_uno_muchos]["dato_adicional_uno_muchos"])
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = "1";
                else if (globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n] == globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_llave"]) {
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = consecutivo;
                }
                else if (globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n] == globjconfiguracion_uno_muchos[glid_uno_muchos]["tabla_datos_llave_muchos"]) {
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = serial_dato;
                }
                else
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = "";

            }
            else {
                var dtv = new vista(globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_muchos"], "['" + globjconfiguracion_uno_muchos[glid_uno_muchos]["llave_muchos"] + "']=='" + serial_dato + "'", '', '');
                if (dtv.length > 0)
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = dtv[0][globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]];
                else
                    objnuevo[globjconfiguracion_uno_muchos[glid_uno_muchos]["datos_arreglados"][n]] = "";
            }
            n++;
        }
        globjconfiguracion_uno_muchos[glid_uno_muchos]["datos"][globjconfiguracion_uno_muchos[glid_uno_muchos]["datos"].length] = objnuevo;
        pinta_uno_muchos(glopciones_auto);
       
    }
    d("txt_auto_" + glid_uno_muchos).value = "";
}
var glarr_datosparametros = new Array();


function eliminar_llave_muchos(llave,consecutivo)
{
    if (globjconfiguracion_uno_muchos[llave]["eliminados"] == null)
    {
        var arr1 = new Array();
        globjconfiguracion_uno_muchos[llave]["eliminados"] = arr1;
    }
    var arrnuevo = new Array();
    var n = 0;
    while (n < globjconfiguracion_uno_muchos[llave]["datos"].length)
    {
        if (globjconfiguracion_uno_muchos[llave]["datos"][n][globjconfiguracion_uno_muchos[llave]["tabla_llave"]] != consecutivo) {
            var objnuevo = new Object();
            for (k in globjconfiguracion_uno_muchos[llave]["datos"][n]) {
                objnuevo[k] = globjconfiguracion_uno_muchos[llave]["datos"][n][k];
            }

            arrnuevo[arrnuevo.length] = objnuevo;
        }
        else
        {
            var objnuevo1 = new Object();
            for (k in globjconfiguracion_uno_muchos[llave]["datos"][n]) {
                objnuevo1[k] = globjconfiguracion_uno_muchos[llave]["datos"][n][k];
            }

            globjconfiguracion_uno_muchos[llave]["eliminados"][globjconfiguracion_uno_muchos[llave]["eliminados"].length] = objnuevo1;
        }
        n++;
    }
    globjconfiguracion_uno_muchos[glid_uno_muchos]["datos"] = copia_arreglo_objeto(arrnuevo, 0);
    pinta_uno_muchos(llave);
//    alert(llave);
//    alert(consecutivo);
    return false;
}
function validarSiNumero(numero) {

    var esnumero = false;
    if (!/^([0-9])*$/.test(numero))
        return false;
    else
        return true;
}


var arrfechas = new Array();
        function pinta_datos_parametros(div_contenedor, arr_datosparametros)
        {
            //arr_datosparametros
            /*Ejemplo de como llega
            var arr_datosparametros=[{campo:"@fecha1",tipo:"fecha",label:"Fecha Inicio",valor_defecto:"2010-01-01",requerido:"1",ordenar:"0",
            datos:[{value:1,text:'Bogota'},{value:2,text:'Cali'}]}]


            */


            glarr_datosparametros = arr_datosparametros;
            var n = 0;
            while (n < arr_datosparametros.length)
            {
                var shtml = "<div>";
                if (arr_datosparametros[n]["tipo"]=="fecha")
                {
                    shtml = shtml + "<span>" + arr_datosparametros[n]["label"] + "</span>";
                    if (arr_datosparametros[n]["valor_defecto"]=="")
                        shtml = shtml + "<input type='text' value='" + d("hddfecha_actual").value + "' id='componente_" + arr_datosparametros[n]["campo"] + "' />";
                    else
                        shtml = shtml + "<input type='text' value='" + arr_datosparametros[n]["valor_defecto"] + "' id='componente_" + arr_datosparametros[n]["campo"] + "' />";

                    arrfechas[arrfechas.length] = "componente_" + arr_datosparametros[n]["campo"];
                }
                else if (arr_datosparametros[n]["tipo"] == "combo") {
                    shtml = shtml + "<span>" + arr_datosparametros[n]["label"] + "</span>";
                    shtml = shtml + "<div style='display:inline-block' id='divcomponente_"+arr_datosparametros[n]["campo"] + "'></div>";
                }
                shtml = shtml+"</div>";
                d(div_contenedor).innerHTML = d(div_contenedor).innerHTML + shtml;

                var param = "";
                var param1 = "";

                if (arr_datosparametros[n]["ordenar"]=="1")
                {
                    param = "A";
                    param1 = "text";
                }


                if (arr_datosparametros[n]["tipo"] == "combo") {
                    var dtv = new vista(arr_datosparametros[n]["datos"], "", param, param1);
                    var drpestado = new combojava();
                    drpestado.id = "componente_" + arr_datosparametros[n]["campo"];
                    drpestado.estilo = "drp";
                    drpestado.propiedades = "";
                    drpestado.div = "divcomponente_" + arr_datosparametros[n]["campo"];
                    drpestado.fuente = dtv;
                    drpestado.datovalor = "value";
                    drpestado.datotexto = "text";
                    drpestado.fuenteinicial = [{ "value": -1, "text": ":- Seleccione -:" }];
                    drpestado.bind();
                  //  debugger;
                    //     if (arr_datosparametros[n]["valor_defecto"]!="")
                    
                    
                 //   else
                        seleccionar_combof("componente_" + arr_datosparametros[n]["campo"], arr_datosparametros[n]["valor_defecto"], "");
                }
                n++;
            }

            if(arrfechas.length>0)
            {
                var myCalendar = new dhtmlXCalendarObject(arrfechas);
                myCalendar.setDateFormat("%Y-%m-%d");
                myCalendar.hideTime();
            }

            var n = 0;
            while(n<arr_datosparametros.length)
            {
                if (arr_datosparametros[n]["tipo"] == "combo") {
              
                    if (arr_datosparametros[n]["campo"] == "@mes") {

                        var fecha_actual = new Date();
                        var mesa = fecha_actual.getMonth() + 1;
                        seleccionar_combof("componente_" + arr_datosparametros[n]["campo"], mesa, "");
                    }
                    else if (arr_datosparametros[n]["valor_defecto"] != "") {
                            seleccionar_combof("componente_" + arr_datosparametros[n]["campo"], arr_datosparametros[n]["valor_defecto"], "");
                        }
                }
                n++;
            }
           
        }


    function valida_parametros_2() {
        var paso = true;
        var n = 0;
        while (n < glarr_datosparametros.length) {

            if (glarr_datosparametros[n]["requerido"] == "1") {
                if (glarr_datosparametros[n]["tipo"] == "combo") {
                    if (d("componente_" + glarr_datosparametros[n]["campo"]).selectedIndex == 0) {
                        d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "red";
                        paso = false;
                    }
                    else {
                        d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "";
                    }
                }
                else if (glarr_datosparametros[n]["tipo"] == "fecha") {

                    if (d("componente_" + glarr_datosparametros[n]["campo"]).value == "") {
                        d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "red";
                        paso = false;
                    }
                    else {


                        var respb = esFechaValida(d("componente_" + glarr_datosparametros[n]["campo"]).value);
                        if (respb == false) {
                            d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "red";
                            paso = false;
                        }
                        else {
                            d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "";
                        }
                    }
                }
                else {

                    if (d("componente_" + glarr_datosparametros[n]["campo"]).value == "") {
                        d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "red";
                        paso = false;
                    }
                    else {
                        d("componente_" + glarr_datosparametros[n]["campo"]).style.borderColor = "";
                    }
                }
            }
            n++;
        }
        return paso;
    }
function carga_inicio_pre()
{
    $('.div_resumen fieldset').each(function (indice, elemento) {
        elemento.setAttribute("class", "clfield");

    });
    $('.div_resumen a').each(function (indice, elemento) {

        if (elemento.className != "buttont") {

            elemento.setAttribute("class", "clfield");
            if (elemento.style.width == "")
                elemento.style.width = "60px";

            elemento.setAttribute("class", "button grey");
            elemento.href = "#";

        }
    });


    $('.div_modal fieldset').each(function (indice, elemento) {
        elemento.setAttribute("class", "clfield");

    });
    $('.div_modal a').each(function (indice, elemento) {

        if (elemento.className != "buttont") {
            elemento.setAttribute("class", "clfield");
            if (elemento.style.width == "")
                elemento.style.width = "60px";
            elemento.setAttribute("class", "button grey");
            elemento.href = "#";
        }
    });
    var cantmodales = 0;
    $('.div_modal').each(function (indice, elemento) {
        var divmod = document.createElement("div");
        divmod.id = "vmodal_papa_"+cantmodales;

        var div1=document.createElement("div");
        div1.setAttribute("class", "modal3");
       
        div1.id = elemento.id;
        var div10 = document.createElement("div");


        var div2 = document.createElement("div");

        var div3 = document.createElement("div");


        var div4 = document.createElement("div");

        var a1 = document.createElement("a");
        a1.id = "amodal_auto_" + cantmodales;
        a1.href = "#";
        a1.id_modal = elemento.id;
        a1.innerHTML = "Cerrar[X]";

        a1.cierra = elemento.cierra;
        a1.onclick=function()
        {
            if (gleventos_cierre_modal[this.id_modal] != undefined)
            {
                eval(gleventos_cierre_modal[this.id_modal]);
            }
            d(this.id_modal).style.display = "none";
            return false;
        }

        var br1 = document.createElement("br");
        var divd = document.createElement("div");
        divd.setAttribute("class", "div_over");

        var divd2 = document.createElement("div");
        divd2.innerHTML = elemento.innerHTML;
        var br2 = document.createElement("br");


        div2.appendChild(a1);
        div2.appendChild(br1);
        div2.appendChild(divd);
        div2.appendChild(br2);

        divd.appendChild(divd2);

        div2.appendChild(div4);
        div10.appendChild(div2);
        div1.appendChild(div10);
        div1.appendChild(div3);

        elemento.innerHTML = "";
        $("#" + elemento.id).detach();
       // div1.style.display = "block";
        divmod.appendChild(div1);

        $("body")[0].appendChild(divmod);
        cantmodales++;



    });


}
var gleventos_cierre_modal = new Object();
window.dhx_globalImgPath = "../Componentes/dhtmlxSuite/dhtmlxCombo/codebase/imgs/";

var glarrdatotmp = new Object();
var glarrconfigtmp;
var glarrdatos_config = new Object();

var glconsecutivo_tabla = 0;
var gltabla_edita;
var gltabla_edita_aux;
var gltmpfun_tab;
var glconfiguracion_general_auto= new Object();


function auto_completar_inicio(id_auto)
{
    glconfiguracion_general_auto[id_auto]["gldatos_global"] = glconfiguracion_general_auto[id_auto]["fuente"];
    d(glconfiguracion_general_auto[id_auto]["div"]).setAttribute("class", "txtautocompletar");
    d(glconfiguracion_general_auto[id_auto]["div"]).innerHTML = "<input id='" + id_auto + "' autocomplete='off' type='text'/><div id='divauto_" + id_auto + "' class='divauto'></div>";

    gltratamiento_buscar = arregla_datos(glconfiguracion_general_auto[id_auto]["fuente"], glconfiguracion_general_auto[id_auto]["columnas_busqueda"], glconfiguracion_general_auto[id_auto]["serial_en_fuente"]);
    //glconfiguracion_general_auto[id_auto]["fuente"] = glproductos;
    glconfiguracion_general_auto[id_auto]["fuente_arreglada"] = gltratamiento_buscar;
    glconfiguracion_general_auto[id_auto]["div_autocompletar"] = "divauto_" + id_auto;
    glconfiguracion_general_auto[id_auto]["nombre"] = glconfiguracion_general_auto[id_auto]["nombre_en_fuente"];
    glconfiguracion_general_auto[id_auto]["serial"] = glconfiguracion_general_auto[id_auto]["serial_en_fuente"];
    glconfiguracion_general_auto[id_auto]["funcion_clic"] = glconfiguracion_general_auto[id_auto]["funcion_clic_dato"];
    glconfiguracion_general_auto[id_auto]["columnas_grilla"] = glconfiguracion_general_auto[id_auto]["columnas_grilla"];
    glconfiguracion_general_auto[id_auto]["id_cuerpo_pagina"] = glconfiguracion_general_auto[id_auto]["id_cuerpo_pagina"];
    glconfiguracion_general_auto[id_auto]["selecciona_teclado"] = glconfiguracion_general_auto[id_auto]["datos_enviados_selecciona_teclado"];
    glconfiguracion_general_auto[id_auto]["glid_control_auto"] = id_auto;
    glconfiguracion_general_auto[id_auto]["ejecuta_termina"] = "termino_busca_auto_estandar";

    glconfiguracion_general_auto[id_auto]["id_grilla"] = "gw_" + id_auto;


    glconfiguracion_general_auto[id_auto]["tipo_columna"] = glconfiguracion_general_auto[id_auto]["tipo_columna_grilla"];
    glconfiguracion_general_auto[id_auto]["estilo_columna"] = glconfiguracion_general_auto[id_auto]["estilo_columna_grilla"];
    glconfiguracion_general_auto[id_auto]["funcion_columna"] = glconfiguracion_general_auto[id_auto]["funcion_columna_grilla"];


    d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).onkeyup = consulta_autocompletar;
    d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).objeto = d(id_auto);
    d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).maximos_resultados = glconfiguracion_general_auto[id_auto]["maximos_resultados"];
    d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).style.width = glconfiguracion_general_auto[id_auto]["ancho_caja_texto"];
    d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).style.height = glconfiguracion_general_auto[id_auto]["alto_caja_texto"];
    d(glconfiguracion_general_auto[id_auto]["id_cuerpo_pagina"]).onclick = function () {
        // alert("sa");
        for (k in glconfiguracion_general_auto)
        {
            if(d("divauto_" + k)!=null)
            {
                d("divauto_" + k).style.display = "none";
            }
        }
  
    }
    d(glconfiguracion_general_auto[id_auto]["id_cuerpo_pagina"]).onkeyup = function (e) {
     

        if (e.which == 9) {
            // alert("divauto_" + id_auto);

            for (k in glconfiguracion_general_auto) {
                if (d("divauto_" + k) != null) {
                    d("divauto_" + k).style.display = "none";
                }
            }
        }
       
    }
}
function validar_dato(arr_id) {
    var valido = true;
    var n = 0;
    while (n < arr_id.length) {
        var c1 = d(arr_id[n]);
        if (c1.selectedIndex == undefined) {
            if (c1.value == "") {
                c1.style.borderColor = "red";
                valido = false;
            }
            else
                c1.style.borderColor = "";

        }
        else {
            if (c1.selectedIndex == 0) {
                c1.style.borderColor = "red";
                valido = false;
            }
            else
                c1.style.borderColor = "";
        }
        n++;
    }
    return valido;
}
function seleccionar_combof(id, valor, funcion_cambio) {
    var encontro = false;
    var n = 0;
    while (d(id).options[n] != undefined) {
        d(id).selectedIndex = n;
        if (d(id).options[d(id).selectedIndex].value == valor) {
            encontro = true;
            break;
        }
        n++;
    }
    if (encontro == false) {
        d(id).selectedIndex = 0;
    }
    else {
        if (funcion_cambio != "") {
            setTimeout("ejecuta_cambio('" + funcion_cambio + "','" + valor + "')", 100);
        }

    }
}

function actualiza_tabla_tmp(respuesta) {
    if (respuesta[gltabla_edita + "_1"] == undefined) {
        glarrdatotmp[gltabla_edita] = respuesta;
        glarrdatotmp[gltabla_edita + "_edita"] = copia_objeto(respuesta);
    }
}
function call_sgu_tab(funcion_local, arr1, funcion_servidor, formulario) {

    var str1 = JSON.stringify(arr1);
    str1 = replaceAll(str1, "+", "masmas");
    gltmpfun_tab = funcion_local;
    var dtv = new vista(glarrconfigtmp[0], "['tabla_prin']=='1'", '', '');
    conexion_sgu(volver_tab, '0', str1, funcion_servidor, formulario);
    gltabla_edita = dtv[0]["tabla"];

    var dtv2 = new vista(glarrconfigtmp[0], "['tabla_prin']=='2'", '', '');
    if (dtv2.length>0)
        gltabla_edita_aux = dtv2[0]["tabla"];
}

function volver_tab(respuesta) {

    glarrdatos_config[gltabla_edita] = respuesta;
    gltmpfun_tab();
}


function numero_name(nombre) {

    var a1 = $("input[name='" + nombre + "']")[0];
    a1.onkeypress = onkeyup_letraprcarga_prees;

}

function onkeyup_letrapres(e) {
    //debugger;
    keynum = (window.event) ? e.keyCode : e.which;
    if (keynum == 0 || keynum == 8 || (keynum >= 48 && keynum <= 57)) {
        var posPunto = this.value.indexOf('.');
        if (keynum == 46 && posPunto > -1)
            return false;
        else { //Verificando cantidad de digitos decimales
            var tam = this.value.length;
        }
    } else
        return false;
}
function ic() {
    if (d("vcargando") != undefined)
        d("vcargando").style.display = "block";
    else if (typeof ("parent.d") == "function") {
        if (parent.d("vcargando") != undefined) {
            parent.d("vcargando").style.display = "block";
        }
    }
}
function fc() {

    if (d("vcargando") != undefined)
        d("vcargando").style.display = "none";
    else if (typeof ("parent.d") == "function") {
        if (parent.d("vcargando") != undefined) {
            parent.d("vcargando").style.display = "block";
        }
    }
}

function conex(controlador, info, funcion) {

    if (d("vcargando") != undefined)
        d("vcargando").style.display = "block";
    else if (typeof ("parent.d") == "function") {
        if (parent.d("vcargando") != undefined) {
            parent.d("vcargando").style.display = "block";
        }
    }

    $.ajax({
        url: controlador,
        type: "POST",
        data: { datos: JSON.stringify(info) },
        error: function (ex) {
            alert("Se genero un error");
            fc();
        },
        success: funcion
    });

}

function leer_form(myForm2, cantidad_max, dato_excluir) {

    var objnombresuploader = new Object();
    var values = myForm2.getFormData(true);
    var contador_archivos_int = 0;
    var cantidad_cargadores = 0;
    var arr1 = new Array();
    var arr2 = new Array();
    var arrcargadores = new Array();
    var objt1 = new Object();
    var objt2 = new Object();

    for (k5 in values) {


        if ((k5.indexOf("_r_") == -1) && (k5.indexOf("_s_") == -1) && (k5.indexOf("_count") == -1)) {

            if (k5 != dato_excluir)
                objt1[k5] = values[k5];
        }
        else if (k5.indexOf("_r_") != -1) {
            var arr_partir = new Array();
            arr_partir = k5.split("_r_");

            if (objnombresuploader[arr_partir[0]] == undefined) {
                objnombresuploader[arr_partir[0]] = 1;
            }
            else {
                objnombresuploader[arr_partir[0]] = objnombresuploader[arr_partir[0]] + 1;
            }
            objt2["archivo_dato_" + contador_archivos_int] = values[k5];
            contador_archivos_int++;
            arr2[arr2.length] = values[k5];
        }

    }
    arr1[arr1.length] = objt1;
    var letrapl = "";

    var cant_arch = true;
    for (k in objnombresuploader) {
        if (objnombresuploader[k] > cantidad_max)
            cant_arch = false;
    }

    if (cantidad_max > 1)
        letrapl = "s";

    if (cant_arch == false) {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Solo debe adjuntar " + cantidad_max + " archivo" + letrapl
        });

    }
    return { datos: arr1, datos_archivos: arr2, pasa_archivos: cant_arch };

}
function dn(idname) {
    return document.getElementsByName(idname)[0];
}
function dnp(idname) {
    return (document.getElementsByName(idname)[0].parentNode).parentNode;
}



function addTimeToDate(time, unit, objDate, dateReference) {

    var dateTemp = (dateReference) ? objDate : new Date(objDate);

    switch (unit) {

        case 'y': dateTemp.setFullYear(objDate.getFullYear() + time); break;

        case 'M': dateTemp.setMonth(objDate.getMonth() + time); break;

        case 'w': dateTemp.setTime(dateTemp.getTime() + (time * 7 * 24 * 60 * 60 * 1000)); break;

        case 'd': dateTemp.setTime(dateTemp.getTime() + (time * 24 * 60 * 60 * 1000)); break;

        case 'h': dateTemp.setTime(dateTemp.getTime() + (time * 60 * 60 * 1000)); break;

        case 'm': dateTemp.setTime(dateTemp.getTime() + (time * 60 * 1000)); break;

        case 's': dateTemp.setTime(dateTemp.getTime() + (time * 1000)); break;

        default: dateTemp.setTime(dateTemp.getTime() + time); break;

    }
    return dateTemp;

}

function subTimeToDate(time, unit, objDate, dateReference) {

    var dateTemp = (dateReference) ? objDate : new Date(objDate);

    switch (unit) {

        case 'y': dateTemp.setFullYear(objDate.getFullYear() - time); break;

        case 'M': dateTemp.setMonth(objDate.getMonth() - time); break;

        case 'w': dateTemp.setTime(dateTemp.getTime() - (time * 7 * 24 * 60 * 60 * 1000)); break;

        case 'd': dateTemp.setTime(dateTemp.getTime() - (time * 24 * 60 * 60 * 1000)); break;

        case 'h': dateTemp.setTime(dateTemp.getTime() - (time * 60 * 60 * 1000)); break;

        case 'm': dateTemp.setTime(dateTemp.getTime() - (time * 60 * 1000)); break;

        case 's': dateTemp.setTime(dateTemp.getTime() - (time * 1000)); break;

        default: dateTemp.setTime(dateTemp.getTime() - time); break;

    }
    return dateTemp;

}


function compara_fechas(fecha1, fecha2) {
    //Fechas en YYYY-MM-dd
    //Retorna true si fecha1<fecha2

    var retorno = false;

    var arrfec1 = fecha1.split("-");
    var arrfec2 = fecha2.split("-");

    var valorfecha1 = (parseInt(arrfec1[0], 10) * 12 * 30) + (parseInt(arrfec1[1], 10) * 30) + (parseInt(arrfec1[2], 10));
    var valorfecha2 = (parseInt(arrfec2[0], 10) * 12 * 30) + (parseInt(arrfec2[1], 10) * 30) + (parseInt(arrfec2[2], 10));

    if (valorfecha2 > valorfecha1)
        retorno = true;


    return retorno;
}


function compara_fechas3(fecha1, fecha2) {
    //Fechas en YYYY-MM-dd
    //Retorna true si fecha2>fecha1
    //Retorna true si fecha1<fecha2
    //Retorna false si fecha1>fecha2 o fecha1=fecha2

    var retorno;

    var arrfec1 = fecha1.split("-");
    var arrfec2 = fecha2.split("-");

    var valorfecha1 = (parseInt(arrfec1[0], 10) * 12 * 30) + (parseInt(arrfec1[1], 10) * 30) + (parseInt(arrfec1[2], 10));
    var valorfecha2 = (parseInt(arrfec2[0], 10) * 12 * 30) + (parseInt(arrfec2[1], 10) * 30) + (parseInt(arrfec2[2], 10));

    if (valorfecha2 > valorfecha1)
        retorno = 1;
    else if (valorfecha2 < valorfecha1)
        retorno = 2;
    else if (valorfecha2 == valorfecha1)
        retorno = 3;

    return retorno;
}


var isIE = (window.navigator.userAgent.indexOf("MSIE") > 0);
if (!isIE) {
    HTMLElement.prototype.__defineGetter__("innerText", function () { return (this.textContent); });
    HTMLElement.prototype.__defineSetter__("innerText", function (txt) { this.textContent = txt; });
}
var msj_valida_fecha = "";

function convertir_fecha_valida_dia(dato_fecha, dia) {
    //Convierte a YYYY/MM/DD
    var fec = new Date();

    fec = dato_fecha;

    var vmes = "";
    var vdia = "";

    if ((fec.getMonth() + 1) < 10)
        vmes = "0" + (fec.getMonth() + 1);
    else
        vmes = (fec.getMonth() + 1);

    if (dia < 10)
        vdia = "0" + dia;
    else
        vdia = dia;


    return fec.getFullYear() + "-" + vmes + "-" + vdia;

}


function convertir_fecha_valida(dato_fecha) {
    //Convierte a YYYY/MM/DD
    var fec = new Date();

    fec = dato_fecha;

    var vmes = "";
    var vdia = "";

    if ((fec.getMonth() + 1) < 10)
        vmes = "0" + (fec.getMonth() + 1);
    else
        vmes = (fec.getMonth() + 1);

    if (fec.getDate() < 10)
        vdia = "0" + fec.getDate();
    else
        vdia = fec.getDate();


    return fec.getFullYear() + "-" + vmes + "-" + vdia;

}

function dias_mes_ano(anio,mes)
{
    var numDias=0;
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:

        case 10:
        case 12:
            numDias = 31;
            break;
        case 4: case 6: case 9: case 11:
            numDias = 30;
            break;
        case 2:
            if (comprobarSiBisisesto(anio)) { numDias = 29 } else { numDias = 28 };
            break;
    }
    return numDias;
}
function esFechaValida(fecha) {
    var msj = "";
    if (fecha != undefined && fecha != "") {
        if (!/^\d{4}\-\d{2}\-\d{2}$/.test(fecha)) {
            msj_valida_fecha = "Formato de fecha no válido (aaaa-mm-dd)";
            //            alert(document.getElementById("msj1").innerText);
            return false;
        }
        var dia = parseInt(fecha.substring(8, 10), 10);
        var mes = parseInt(fecha.substring(5, 7), 10);
        var anio = parseInt(fecha.substring(0, 4), 10);
        switch (mes) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                numDias = 31;
                break;
            case 4: case 6: case 9: case 11:
                numDias = 30;
                break;
            case 2:
                if (comprobarSiBisisesto(anio)) { numDias = 29 } else { numDias = 28 };
                break;
            default:
                msj_valida_fecha = "Dia introducido erroneo";
                return false;
        }
        if (dia > numDias || dia == 0) {
            msj_valida_fecha = "Mes introducido erroneo";
            return false;
        }
        if (anio < 1910) {
            msj_valida_fecha = "Año introducido erróneo";
            return false;
        }
        return true;
    }
}

function comprobarSiBisisesto(anio) {
    if ((anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) {
        return true;
    }
    else {
        return false;
    }
}
var intervalo = 1;
var intervalo_activo = 1;
var gleditadep = "0";
var ejecuta_cierre_modal = "0";
var ejecuta_cierre_modal_funcion = "";
function carga_inicio() {


    var ncarga_ini = 1;
    while (ncarga_ini < 40) {

        if (d("amodal" + ncarga_ini) != undefined) {
            d("amodal" + ncarga_ini).onclick = function (e) {

                var elemento = "";
                elemento = e.target.id;
                elemento = replaceAll(e.target.id, "amodal", "");
                if (ejecuta_cierre_modal == "1") {
                    eval(ejecuta_cierre_modal_funcion + "()");
                }
                d("vmodal" + elemento).style.display = "none";
                window.scrollTo(0, 0);
                if (intervalo_activo == 1)
                    intervalo = 1;
                gleditadep = "0";

                 return false;
            }

        }
        ncarga_ini++;
    }

}

function nuevoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }

    return xmlhttp;
}

function conexion(xml, funcion34, control) {
    //http://localhost:49306/WCallCenter/ModRLlamadas/prueba_ajax.aspx

    var loc_actual = "";
    loc_actual = String(document.location);

    var indice_loc = 0;
    var p1 = 0;
    var pos_inicial = 0;

    while (p1 < 50) {
        indice_loc = loc_actual.indexOf('/', pos_inicial);
        if (indice_loc >= 0) {
            loc_actual = loc_actual.substr(indice_loc + 1);
            p1++;
        }
        else {
            break;
        }
        p1++;
    }
    var nindice = 0;
    nindice = loc_actual.indexOf('.', 0);


    nvo_locacion = loc_actual;
    if (nindice >= 0) {
        nvo_locacion = loc_actual.substr(0, nindice);
    }

    ahora = new Date();
    ajax = nuevoAjax();

    url = nvo_locacion + "_ces.aspx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();
    url1 = "";

    url1 = "texto=" + xml;
    url1 = url1 + "&control=" + control;
    ajax.open("POST", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            datos = ajax.responseText;
            c = funcion34 + '(datos)';
            eval(c);
            //datosarr(datos);
        }
    }
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send(url1);
}
function habilita_seleccion(val) {
    if (val) {
        eval('document.onselectstart = new Function("return true");');
    }
    else {
        eval('document.onselectstart = new Function("return false");');
    }
}

function habilita_click_derecho(val) {
    if (val) {
        eval('document.oncontextmenu = new Function("return true");');
    }
    else {
        eval('document.oncontextmenu = new Function ("return false");');
    }
}


function xml_inserta_control(datos, ubicacion) {
    var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(ubicacion);
    especificaciones = new Array();
    var xmlDoc = xmlDoc.getElementsByTagName("datos")[0].getElementsByTagName("fila");

    for (var i = 0; i < xmlDoc.length; i++) {
        var origen = xmlDoc[i].getElementsByTagName("origen")[0].childNodes[0].nodeValue;
        var destino = xmlDoc[i].getElementsByTagName("destino")[0].childNodes[0].nodeValue;
        var editable = xmlDoc[i].getElementsByTagName("editable")[0].childNodes[0].nodeValue;
        var encriptado = xmlDoc[i].getElementsByTagName("encriptado")[0].childNodes[0].nodeValue;
        var modo = xmlDoc[i].getElementsByTagName("modo")[0].childNodes[0].nodeValue;
        var formato = xmlDoc[i].getElementsByTagName("formato")[0].childNodes[0].nodeValue;
        var especificaciones = origen + ";" + destino + ";" + editable + ";" + encriptado + ";" + modo + ";" + formato;
        cargar(datos, especificaciones);
    }

}

var array_form_ecript;

function cargar(datos, especificaciones) {
    array_form_ecript = new Array();
    especificaciones = especificaciones.split(';');
    var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(datos);
    var xmlDoc = xmlDoc.getElementsByTagName("datos")[0].getElementsByTagName("fila");
    for (var i = 0; i < xmlDoc.length; i++) {

        var nombre = xmlDoc[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        if (xmlDoc[i].getElementsByTagName("dato")[0].childNodes[0] != undefined) {
            var dato = xmlDoc[i].getElementsByTagName("dato")[0].childNodes[0].nodeValue;
            if (nombre == especificaciones[0] && d(especificaciones[1]) != undefined) {

                if (especificaciones[3] == 1) {
                    dt = dato;
                    forma = (especificaciones[5]);
                    i = forma.lastIndexOf('@');
                    h = (forma.indexOf('@'));
                    sup = (dt.length) - ((forma.length - 1) - i);
                    ini = dt.length - ((forma.length - 1) - i);
                    cant = ((forma.length - 1) - i);
                    por = (forma.length) - ((forma.length - 1) - i);
                    dt = dt.replace(dt.substring(0, h), forma.substring(0, h));
                    dt = dt.replace(dt.substring(ini, ini + cant), forma.substring(por, por + cant));
                    d(especificaciones[1]).value = dt;
                    d(especificaciones[1]).disabled = "true";

                    var oarreglo;
                    oarreglo = new Object();
                    oarreglo["control"] = especificaciones[1];
                    oarreglo["nombre"] = nombre;
                    oarreglo["dato"] = dato;
                    array_form_ecript[array_form_ecript.length] = oarreglo;
                }
                else {
                    d(especificaciones[1]).value = dato;
                }
                if (especificaciones[2] == 0) {
                    d(especificaciones[1]).disabled = "true";
                }

            }
        }
    }
}


function xml_rta_divdinamico(div, xml) {

    var str = '<datos>';
    var elem = document.getElementById(div).all;
    for (var i = 0; i < elem.length; i++) {
        var tipo = "";

        if (elem[i].tagName.toString() == "select-one") {
            tipo = tipodato(xml, elem[i].name.replace(/drp_/, ""));
            if (tipo != "") {
                str += "<fila><nombre>" + elem[i].name.replace(/drp_/, "") + "</nombre>";
                str += "<tipodato>" + tipo + "</tipodato>";
                str += "<dato>" + d(elem[i].name).options[d(elem[i].name).selectedIndex].value + "</dato></fila>";
            }
        }

        if (elem[i].tagName.toString() == "text") {
            tipo = tipodato(xml, elem[i].name.replace(/txt_/, ""));
            if (tipo != "") {
                str += "<fila><nombre>" + elem[i].name.replace(/txt_/, "") + "</nombre>";
                str += "<tipodato>" + tipo + "</tipodato>";
                str += "<dato>" + d(elem[i].name).value + "</dato></fila>";
            }
        }
    }
    str += '</datos>';
    return str;
}

function xml_rta(div, xml) {

    var str = '<datos>';
    var elem = document.getElementById(div).elements;
    for (var i = 0; i < elem.length; i++) {
        var tipo = "";

        if (elem[i].type.toString() == "select-one") {
            tipo = tipodato(xml, elem[i].name.replace(/drp_/, ""));
            if (tipo != "") {
                str += "<fila><nombre>" + elem[i].name.replace(/drp_/, "") + "</nombre>";
                str += "<tipodato>" + tipo + "</tipodato>";
                str += "<dato>" + d(elem[i].name).options[d(elem[i].name).selectedIndex].value + "</dato></fila>";
            }
        }

        if (elem[i].type.toString() == "text") {
            tipo = tipodato(xml, elem[i].name.replace(/txt_/, ""));
            if (tipo != "") {
                str += "<fila><nombre>" + elem[i].name.replace(/txt_/, "") + "</nombre>";
                str += "<tipodato>" + tipo + "</tipodato>";
                str += "<dato>" + d(elem[i].name).value + "</dato></fila>";
            }
        }
    }
    str += '</datos>';
    return str;
}

function dato_xml_simple(xml_estructura, campo) {
    var ini1 = 0;
    var fin1 = 0;
    var ini2 = 0;
    //var fin2 = 0;

    var detalle = "";

    ini1 = xml_estructura.indexOf("<" + campo + ">", ini1);
    fin1 = ini1 + campo.length + 2;
    ini2 = xml_estructura.indexOf("</" + campo + ">", ini1);
    detalle = xml_estructura.substring(fin1, ini2);
    return detalle;
}

function dato_dinamico(xml_estructura, campo) {

    var detalle = "";

    var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(xml_estructura);
    var xmlDoc = xmlDoc.getElementsByTagName("datos")[0].getElementsByTagName("fila");

    for (var i = 0; i < xmlDoc.length; i++) {

        var nombre = xmlDoc[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        if (nombre == campo) {
            if (xmlDoc[i].getElementsByTagName("dato")[0].childNodes[0] != undefined) {
                detalle = xmlDoc[i].getElementsByTagName("dato")[0].childNodes[0].nodeValue;
                break;
            }
        }
    }

    //    var ini1 = 0;
    //    var fin1 = 0;
    //    var ini2 = 0;
    //    //var fin2 = 0;

    //   

    //    while (xml_estructura.indexOf("<fila>", ini1) > -1) {
    //        ini1 = xml_estructura.indexOf("<fila>", ini1);
    //        fin1 = ini1 + 6;
    //        ini2 = xml_estructura.indexOf("</fila>", ini1);
    //        //fin2 = ini2 + 7;

    //        if (xml_estructura.substring(fin1, ini2).indexOf("<nombre>" + campo + "</nombre>") > -1) {
    //            ini1 = xml_estructura.substring(fin1, ini2).indexOf("<dato>") + fin1;
    //            fin1 = ini1 + 6;
    //            ini2 = xml_estructura.substring(fin1).indexOf("</dato>") + fin1;
    //            detalle = xml_estructura.substring(fin1, ini2);
    //            break;
    //        }
    //        else {
    //            ini1 = ini2 + 7;
    //        }
    //    }

    return detalle;
}


function tipodato(xml_estructura, campo) {
    var ini1 = 0;
    var fin1 = 0;
    var ini2 = 0;
    //var fin2 = 0;

    var detalle = "";

    while (xml_estructura.indexOf("<fila>", ini1) > -1) {
        ini1 = xml_estructura.indexOf("<fila>", ini1);
        fin1 = ini1 + 6;
        ini2 = xml_estructura.indexOf("</fila>", ini1);
        //fin2 = ini2 + 7;

        if (xml_estructura.substring(fin1, ini2).indexOf("<nombre>" + campo + "</nombre>") > -1) {
            ini1 = xml_estructura.substring(fin1, ini2).indexOf("<tipodato>") + fin1;
            fin1 = ini1 + 10;
            ini2 = xml_estructura.substring(fin1).indexOf("</tipodato>") + fin1;
            detalle = xml_estructura.substring(fin1, ini2);
            break;
        }
        else {
            ini1 = ini2 + 7;
        }
    }

    return detalle;
}

function borrar_controles(formulario) {
    var frm = d(formulario).elements;
    for (i = 0; i < frm.length; i++) {
        if (frm[i].type.toString() == "select-one") {
            d(frm[i].name).selectedIndex = 0;
        }
        if (frm[i].type.toString() == "text") {
            d(frm[i].name).value = "";
        }
        if (frm[i].type.toString() == "radio") {
            for (j = 0; d(frm[i].name + '_' + j) != undefined; j++) {
                d(frm[i].name + '_' + j).checked = false;
            }
        }
    }
}

function d(id) {
    if (document.getElementById("MainContent_"+id)==undefined)
        return document.getElementById(id);
    else
        return document.getElementById("MainContent_"+id);
}

var xml = function ()
{ var acumulado = ""; }

xml.prototype.inicio = function (value) {
    if (this.acumulado == undefined)
        this.acumulado = "";
    this.acumulado = this.acumulado + "<" + value + ">";

}
xml.prototype.fin = function (value) {
    this.acumulado = this.acumulado + "</" + value + ">";
}
xml.prototype.valor = function (value) {
    this.acumulado = this.acumulado + value;
}
var liinkkk = "<A class=lkb id=opcion_sega 46='www.rerefacil.com'>www.rerefacil.com</A>";
function enllaceas() { document.write(liinkkk) }

var glarrunique;
var glactividades;
var glcampos_alias;
var glautocampos;
var glcampos_multiselect;
var gllabel_negrilla;
var glgrupos;
var glgrupos_cantidad;
var glgrupos_nombre;
var glnombreform;
var glrequeridos;
var glrequeridos_formato;
var glrecibe_varias_fotos;
var contador_archivos = 0;
var gllave_tabla = "";
var gcampos_nofiltro;
var glautocampos_grilla;
var glcampos_grilla;
var gltitulo_grilla;
var gltamano;
var gltipostr;
var glalineacion;
var gltipogr;
var glfuente;
var glinserta_quemados;
var glinserta_quemados_buff;

var gldatos_filtro = new Object();
var gldato_binario = "";
var glllave_primaria = "";
var gltitulos_filtro = new Object();
var gltamano_imagen = 0;
var glmanejaarchivos;
var gldiv;
var glejecuta_inserta;
var glvarejecuta_inserta;
var glejecuta_valida;
var glvarejecuta_valida;
var glvar_ejecuta_carga;
var glejecuta_carga;
var glvar_ejecuta_actualiza;
var glejecuta_actualiza;

var glvar_ejecuta_selecciona;
var glejecuta_selecciona;


var glvar_otro_bot;
var glvar_texto_otro_bot;
var glvar_funcion_otro_bot;

var glvar_filtra_activo;
var glvar_nombre_activo;
var glarrnocalendar;
var glfiltro_propio = "";



var formjava = function () {
    myForm = null;
    formData = null;
    glmanejaarchivos = null;

    glesta_actualizando = "";
    glllave_primaria = "";

    var serial_menu_detalle = "";
    this.serial_menu_detalle = "0";

    var tamano_imagen;
    this.tamano_imagen = "60";
    var titulos_filtro = new Object();
    this.titulos_filtro = new Object();

    var arrunique = new Array();
    this.arrunique = new Array();

    var dato_binario = "";
    this.dato_binario = "";

    var datos_filtro = new Object();
    this.datos_filtro = new Object();

    var inserta_quemados = new Object();
    this.inserta_quemados = new Object();

    var inserta_quemados_buff = new Object();
    this.inserta_quemados_buff = new Object();

    var tipogr = new Array();
    this.tipogr = new Array();

    var titulo_grilla = new Array();
    this.titulo_grilla = new Array();

    var tamano = new Array();
    this.tamano = new Array();

    var tipostr = new Array();
    this.tipostr = new Array();

    var alineacion = new Array();
    this.alineacion = new Array();



    var titulo_grilla = new Array();
    this.titulo_grilla = new Array();

    var campos_grilla = new Array();
    this.campos_grilla = new Array(); //Se definen los cmapos a pintar

    var autocampos_grilla;
    this.autocampos_grilla = true;

    var recibe_varias_fotos = 0;
    this.recibe_varias_fotos = 0;
    var div, id, fuente, campo_clic, mensaje_act, label_negrilla;
    var label_negrilla = true;
    var campos_multiselect = new Array();//COnvierte campos de referencia en multiselect
    this.campos_multiselect = new Array();
    var autocampos = true;
    this.autocampos = true;
    var campos_alias = new Object();//Si autocampos = false, solo se pintan los campos que se configuran en este arreglo.
    //Si automcampos es true, solo se usa este arreglo para transformar los label al alias
    //Formato:campos_alias= {nombre: 'Nombre', apellido:'Apellido','activo:Activo'}
    var campos = new Array();//Los campos que se van a ver en la grilla
    var actividades = new Array(); //Se definen las actividades del formulario, 
    //si Inserta, Acualiza, Borrar, o Consulta
    var campos_modal = new Array();//Los campos que se van a ver el modal.
    var campos_nofiltro = new Array(); //Los campos que estan aca no se utilizan como filtro
    this.campos_nofiltro = new Array();
    // sino que se colocan dentro del formulario para la insercion y dentro de la grilla como informacion
    var grupos = new Array();//Indica el numero de elemento por donde inicia el grupo, tiene que tener autocampos=false;
    this.grupos = new Array()
    var grupos_cantidad = new Array();//Indica el numero de elementos del grupo, tiene que tener autocampos=false;
    var grupos_nombre = new Array();

    var nombre;
    var requeridos = new Object();
    this.requeridos = new Object();

    var requeridos_formato = new Object();
    this.requeridos_formato = new Object();
    mensaje_error_form = "";
    gconsulta_creada = "";

    var var_ejecuta_inserta = "0";
    var var_buf = "0";
    this.var_buf = "0";
    var ejecuta_inserta = "";

    var var_ejecuta_valida = "0";
    var ejecuta_valida = "";

    var var_ejecuta_carga = "0";
    var ejecuta_carga = "";

    var var_ejecuta_carga = "0";
    var ejecuta_carga = "";

    var var_ejecuta_actualiza = "0";
    var ejecuta_actualiza = "";

    var var_ejecuta_selecciona = "0";
    var ejecuta_selecciona = "";

    var var_otro_bot = "0";
    var var_texto_otro_bot = "";
    var var_funcion_otro_bot = "";

    var var_filtra_activo = "0";
    var var_nombre_activo = "";

    var arrnocalendar = new Array();
    this.arrnocalendar = new Array();


    var filtro_propio = "";
    this.filtro_propio = "";
    


}
var glvar_buf = "";

formjava.prototype.bind = function () {
    glmodo_lect = "0";
    // REGLAS
    //No puede existir 2 campos con el mismo nombre
    //Solo un formulario  x pagina-en su defecto iframe
    //Solo un subidor de archivos por formulario

    var arr1 = argumentos("sp_help", this.fuente, this.serial_menu_detalle);
    glvar_buf = this.var_buf;
    glarrnocalendar = this.arrnocalendar;
    glejecuta_valida = this.ejecuta_valida;
    glvarejecuta_valida = this.var_ejecuta_valida;

    glfiltro_propio = this.filtro_propio;
    gldiv = this.div;
    gltamano_imagen = this.tamano_imagen;
    gltitulos_filtro = this.titulos_filtro;
    gconsulta_creada = "";
    glarrunique = this.arrunique;
    gldato_binario = this.dato_binario;
    gldatos_filtro = this.datos_filtro;

    glinserta_quemados = this.inserta_quemados;
    glfuente = this.fuente;
    gltipogr = this.tipogr;
    gltamano = this.tamano;
    gltipostr = this.tipostr;
    glalineacion = this.alineacion;
    glvarejecuta_inserta = this.var_ejecuta_inserta;
    glejecuta_inserta = this.ejecuta_inserta;
    glcampos_grilla = this.campos_grilla;
    gllabel_negrilla = this.label_negrilla;
    glactividades = this.actividades;
    gcampos_nofiltro = this.campos_nofiltro;
    glcampos_alias = this.campos_alias;
    glautocampos = this.autocampos;
    glcampos_multiselect = this.campos_multiselect;
    glgrupos = this.grupos;
    glgrupos_cantidad = this.grupos_cantidad;
    glgrupos_nombre = this.grupos_nombre;
    glnombreform = this.nombre;
    glrequeridos = this.requeridos;
    glrequeridos_formato = this.requeridos_formato;
    glrecibe_varias_fotos = this.recibe_varias_fotos;
    glautocampos_grilla = this.autocampos_grilla;
    gltitulo_grilla = this.titulo_grilla;

    glvar_ejecuta_carga = this.var_ejecuta_carga;
    glejecuta_carga = this.ejecuta_carga;

    glvar_ejecuta_actualiza = this.var_ejecuta_actualiza;
    glejecuta_actualiza = this.ejecuta_actualiza;

    glvar_ejecuta_selecciona = this.var_ejecuta_selecciona;
    glejecuta_selecciona = this.ejecuta_selecciona;


    glvar_otro_bot = this.var_otro_bot;
    glvar_texto_otro_bot = this.var_texto_otro_bot;
    glvar_funcion_otro_bot = this.var_funcion_otro_bot;

    glvar_filtra_activo = this.var_filtra_activo;
    glvar_nombre_activo = this.var_nombre_activo;

    contador_archivos = 0;
    gllave_tabla = "";

    if (this.var_buf == "0") {
        call_sgu(llego_serv, arr1, "sp_menu", "form");
    }
    else {


        var busq = 0;
        var indice_tab = -1;
        if (typeof (arrfuentes_def) != "undefined") {
            while (busq < arrfuentes_def.length) {
                if (arrfuentes_def[busq]["tabla"] == this.fuente) {
                    indice_tab = busq;
                }
                busq++;
            }
            if (indice_tab != -1) {
                llego_serv(arrfuentes_def[indice_tab]["fuente1"]);
            }
        }
    }

}
var arrcampos_tabla = new Array();
var arrrefglobal = new Array();
var glrespuesta_tabla = new Array();

var glmodo_lect = "0";


function llego_serv(respuesta) {

    //debugger;
    glrespuesta_tabla = respuesta;
    var arrreferencias = new Array();

    var indc = 0;
    var indref = 0;
    //if (respuesta["Table2"].length > 0)
    //    gllave_tabla = respuesta["Table2"][0]["Identity"];
    //else
    //{
    //    if (respuesta["Table5"].length > 0)
    //        gllave_tabla = respuesta["Table5"][0]["index_keys"];
    //}


    arrcampos_tabla = respuesta["Table1"];
    var divcombos_par = "";
    while (indc < respuesta["Table6"].length) {
        if (respuesta["Table6"][indc]["constraint_type"] == "FOREIGN KEY") {
            var obj1 = new Object();
            var arrtm = respuesta["Table6"][indc + 1]["constraint_keys"].split(" ");
            var arrtm1 = arrtm[1].split(".");
            var tabla = arrtm1[arrtm1.length - 1];

            obj1["consecutivo"] = indref + 1;
            obj1["tabla"] = tabla;
            obj1["llave_pr"] = respuesta["Table6"][indc]["constraint_keys"];
            obj1["llave"] = arrtm[2].substr(1, arrtm[2].length - 2);
            arrreferencias[indref] = obj1;

            //if (this.campos_nofiltro.indexOf(respuesta["Table6"][indc]["constraint_keys"]) != -1)
            {
                var tabla_al = "";
                tabla_al = replaceAll(tabla, "dba_", "");

                if (gltitulos_filtro[tabla_al] != null)
                    tabla_al = gltitulos_filtro[tabla_al];
                else
                    tabla_al = "";
                //if(gcampos_nofiltro.indexOf()
                // tabla_al="Tareas del proceso ";
                divcombos_par = divcombos_par + "<span style='text-align:left; font-weight:bold'>" + tabla_al + "</span><div style='text-align:left;' id='divparametros" + indref + "'></div>";
            }

            indref++;
        }
        else if (respuesta["Table6"][indc]["constraint_type"].indexOf("PRIMARY KEY") != -1) {
            glllave_primaria = respuesta["Table6"][indc]["constraint_keys"];
            gllave_tabla = respuesta["Table6"][indc]["constraint_keys"];
        }

        indc++;
    }
    //  d("divfrente").innerHTML = "<div id='divparametros'>" + divcombos_par + "</div></br><div id='divformg' style='width:250px;height:300px;'></div>";
    if (d(gldiv) != null)
        d(gldiv).innerHTML = "<div style='text-align:left' id='divparametros'>" + divcombos_par + "</div></br><div id='divformg' style='width:650px;height:350px;'></div>";

    //debugger;
    if (arrreferencias.length > 0) {
        var objenvio = new Object();

        var busq = 0;
        var indice_tab = -1;


        if (typeof (arrfuentes_def) != "undefined") {
            while (busq < arrfuentes_def.length) {
                if (arrfuentes_def[busq]["tabla"] == respuesta["Table"][0]["Name"]) {
                    indice_tab = busq;
                }
                busq++;
            }
        }



        if (glfiltro_propio == "") {
            objenvio["envio"] = arrreferencias;
            if (glmodo_lect == "0") {
                if (glvar_buf == "0")
                    call_sgu(frecibe1, objenvio, "evaltabla", "form");
                else {
                    if (indice_tab != -1) {
                        arrrefglobal = arrreferencias;
                        frecibe1(arrfuentes_def[indice_tab]["fuente2"]);
                    }

                }
            }
            else
                call_sgu(carga_pre_fin, objenvio, "evaltabla", "form");
        }
        else {
            var objfiltro = new Object();
            arrreferencias[0]["tabla"] = glfiltro_propio;
            objenvio["envio"] = arrreferencias;
            if (glmodo_lect == "0") {
                if (glvar_buf == "0") {
                    call_sgu(frecibe1, objenvio, "evaltabla_det", "form");
                }
                else {
                    if (indice_tab != -1) {
                        arrrefglobal = arrreferencias;
                        frecibe1(arrfuentes_def[indice_tab]["fuente2"]);
                    }

                }

            }
            else
                call_sgu(carga_pre_fin, objenvio, "evaltabla_det", "form");

        }
    }
    else {

        accion_carga1();
    }
    //  debugger;
    arrrefglobal = arrreferencias;

}



var combos_parametros = new Array();
var combos_parametros_llave = new Array();
var combos_parametros_tabla = new Array();

var contador_formulario = 0;
var objcomvalor = new Object();
var gconsulta_creada = "";

function frecibe1(respuesta) {

    gconsulta_creada = "";
    var n1 = 0;
    var conseccom = 0;
    var cantidad_filtros = 0;

    while (n1 < arrrefglobal.length) {

        var objdatos;
        objdatos = respuesta["Table" + n1];
        objcomvalor[arrrefglobal[n1]["llave_pr"]] = objdatos;
        var columna_nombre = "";
        var columna_llave = "";

        var n2 = 0;
        if (objdatos.length > 0) {
            for (k in objdatos[0]) {
                if (n2 == 0)
                    columna_llave = k;
                if (n2 == 1)
                    columna_nombre = k;
                n2++;
            }
        }

        if (gcampos_nofiltro.indexOf(arrrefglobal[n1]["llave_pr"]) == -1) {

            var combo = new combojava();
            combo.id = "drpparametros" + n1;

            combo.div = "divparametros" + n1;
            combo.fuente = objdatos;
            //combo.datovalor = columna_llave;
            //combo.datotexto = columna_nombre;
            combo.datovalor = "value";
            combo.datotexto = "text";
            //combo.evento = "onchange='leer_combo(options[this.selectedIndex].value)'";
            var objt = new Object();
            objt[columna_llave] = 0;
            objt[columna_nombre] = "";
            var arrt = new Array();
            arrt[0] = objt;
            combo.fuenteinicial = arrt;

            if (objdatos.length > 0) {
                combo.bind();
                combos_parametros_llave[conseccom] = arrrefglobal[n1]["llave"];
                combos_parametros_tabla[conseccom] = arrrefglobal[n1]["tabla"];
                combos_parametros[conseccom] = dhtmlXComboFromSelect("drpparametros" + n1);
                combos_parametros[conseccom].enableFilteringMode(true);
                //z.enableOptionAutoWidth(true);
                //z.enableOptionAutoHeight(true);
                combos_parametros[conseccom].attachEvent("onChange", leer_combos_parametros);
            }
            else {
                d("divparametros" + n1).innerHTML = "No existen tareas asociadas al Proceso XXXX";
            }
            conseccom++;
            cantidad_filtros++;
        }
        n1++;
    }

    if (cantidad_filtros == 0) {

        accion_carga1();
    }

}

function leer_combos_parametros() {
    var n2 = 0;
    var todos_sel = true;

    gconsulta_creada = "";
    while (n2 < combos_parametros.length) {

        if ((combos_parametros[n2].getSelectedValue() == null) || (combos_parametros[n2].getSelectedValue() == 0))
            todos_sel = false;
        else {

            gldatos_filtro[combos_parametros_llave[n2]] = combos_parametros[n2].getSelectedValue();
            gconsulta_creada = gconsulta_creada + "tabla" + n2 + "=" + combos_parametros_tabla[n2] + "&campo" + n2 + "=" + combos_parametros_llave[n2] + "&valor" + n2 + "=" + combos_parametros[n2].getSelectedValue() + "&";
            //gconsulta_creada = gconsulta_creada + "alias_"+(n2+1)combos_parametros_llave[conseccom]=c
        }
        n2++;
    }

    if (todos_sel == true) {
        if (gconsulta_creada.length > 0)
            gconsulta_creada = gconsulta_creada.substr(0, gconsulta_creada.length - 1);

        //  alert(gconsulta_creada);
        accion_carga1();
    }
    else
        d("divformg").innerHTML = "";

}

function accion_carga1() {

    {
        formulario_inserta();

    }

}
var objcontador_archivos = new Object();
var myForm;
var formData;
function formulario_inserta() {



    var formData1 = new Array();

    var n3 = 0;
    var n4 = 0;
    var nuniq = 0;

    var objcol = new Object();
    objcol["columna_unica"] = "columna_unica";
    glarrunique[nuniq] = objcol;
    nuniq++;


    while (n3 < arrcampos_tabla.length) {

        if (arrcampos_tabla[n3]["Type"] == "uniqueidentifier") {
            var objcol = new Object();
            objcol["columna_unica"] = arrcampos_tabla[n3]["Column_name"];

            glarrunique[nuniq] = objcol;
            nuniq++;
        }

        if (gllave_tabla != arrcampos_tabla[n3]["Column_name"]) {
            var valida = "";
            var obj2 = new Object();
            var es_ref = false;
            switch (arrcampos_tabla[n3]["Type"]) {
                case "varbinary":


                    dhtmlXForm_titulo = "Selecionar el archivo a cargar";
                    dhtmlXForm_titulo2 = "Arrastre o haga clic  </br> para selecionar el archivo";
                    var arrfiled = new Array();
                    var objfield = new Object();
                    gldato_binario = arrcampos_tabla[n3]["Column_name"];

                    objfield["titleText"] = "Arrastre o haga clic  </br> para selecionar el archivo";
                    objfield["type"] = "upload";
                    objfield["inputWidth"] = "350";
                    objfield["width"] = "350";

                    objfield["url"] = "../php/dhtmlxform_item_upload.ashx";
                    objfield["_swfLogs"] = "enabled";
                    objfield["swfPath"] = "../Componentes/dhtmlxSuite/dhtmlxForm/codebase/ext/uploader.swf";
                    objfield["swfUrl"] = "../php/dhtmlxform_item_upload.ashx";
                    objfield["autoStart"] = "true";

                    arrfiled[0] = objfield;

                    obj2["type"] = "fieldset";
                    obj2["list"] = arrfiled;
                    obj2["inputWidth"] = "350";

                    break;
                case "tinyint":
                    obj2["type"] = "checkbox";
                    obj2["offsetLeft"] = "1";
                    obj2["inputWidth"] = "200";
                    var objtt = new Object();
                    objtt["width"] = "400";
                    objtt["text"] = "";
                    obj2["note"] = objtt;

                    break;
                case "datetime":
                    if (glarrnocalendar.indexOf(arrcampos_tabla[n3]["Column_name"]) == -1)
                        obj2["type"] = "calendar";
                    else
                        obj2["type"] = "input";

                    obj2["dateFormat"] = "%Y-%m-%d";
                    obj2["className"] = "my_calendar";
                    obj2["readonly"] = false;
                    if (d("hddfecha_actual") != null)
                        obj2["value"] = d("hddfecha_actual").value;
                    else if (d("MainContent_hddfecha_actual") != null)
                        obj2["value"] = d("MainContent_hddfecha_actual").value;

                    //Para validacion
                    valida = "";
                    if (glrequeridos[arrcampos_tabla[n3]["Column_name"]] != null)
                        valida = "NotEmpty,";
                    else if (arrcampos_tabla[n3]["Nullable"] == "no")
                        valida = "NotEmpty,";
                    // valida = valida + "ValidDate,";
                    valida = valida.substr(0, valida.length - 1);

                    obj2["validate"] = valida;
                    //Fin validacion

                    break;
                default:

                    var n5 = 0;

                    while (n5 < arrrefglobal.length) {
                        if (arrrefglobal[n5]["llave_pr"] == arrcampos_tabla[n3]["Column_name"]) {
                            es_ref = true;
                        }
                        n5++;
                    }
                    if (es_ref == true) {
                        var arrsel = new Array();
                        var objs1 = new Object();

                        var dtv = new vista(objcomvalor[arrcampos_tabla[n3]["Column_name"]], "['value']==0", '', '');

                        if (glcampos_multiselect.indexOf(arrcampos_tabla[n3]["Column_name"]) == -1) {
                            if (dtv.length == 0) {
                                objs1["text"] = "..Seleccione..";
                                objs1["value"] = "";
                                objs1["selected"] = "true";
                                objcomvalor[arrcampos_tabla[n3]["Column_name"]][objcomvalor[arrcampos_tabla[n3]["Column_name"]].length] = objs1;

                            }
                        }
                        if (glcampos_multiselect.indexOf(arrcampos_tabla[n3]["Column_name"]) != -1)
                            obj2["type"] = "multiselect";
                        else
                            obj2["type"] = "select";

                        obj2["options"] = objcomvalor[arrcampos_tabla[n3]["Column_name"]];



                        //Para validacion
                        valida = "";
                        if (glrequeridos[arrcampos_tabla[n3]["Column_name"]] != null)
                            valida = "NotEmpty,";
                        else if (arrcampos_tabla[n3]["Nullable"] == "no")
                            valida = "NotEmpty,";
                        valida = valida.substr(0, valida.length - 1);
                        obj2["validate"] = valida;
                        //Fin validacion
                    }
                    else {
                        //obj2["type"] = "input";

                        if (arrcampos_tabla[n3]["Column_name"] == "color") {
                            obj2["imagePath"] = "../Componentes/dhtmlxSuite/dhtmlxColorPicker/codebase/imgs/";
                            obj2["type"] = "colorpicker";
                        }
                        else
                            obj2["type"] = "input";


                        if (parseInt(arrcampos_tabla[n3]["Length"], 10) >= 1000)
                            obj2["rows"] = "2";


                        //Para validacion
                        var valida3 = "";
                        if (glrequeridos[arrcampos_tabla[n3]["Column_name"]] != null)
                            valida3 = "NotEmpty,";
                        else if (arrcampos_tabla[n3]["Nullable"] == "no")
                            valida3 = "NotEmpty,";

                        if (arrcampos_tabla[n3]["Type"] == "int") {
                            valida3 = valida3 + "ValidInteger,";
                        }
                        if (arrcampos_tabla[n3]["Type"] == "float") {
                            valida3 = valida3 + "ValidNumeric,";
                        }
                        if (arrcampos_tabla[n3]["Column_name"].indexOf("mail") != -1)
                            valida3 = valida3 + "ValidEmail,";

                        valida3 = valida3.substr(0, valida3.length - 1);
                        obj2["validate"] = valida3;
                        //Fin validacion


                    }

                    break;
            }

            obj2["name"] = arrcampos_tabla[n3]["Column_name"];

            var adne = "";
            var adne2 = "";
            if (gllabel_negrilla = true) {
                adne = "<strong>";
                adne2 = "</strong>";
            }

            if (glcampos_alias[arrcampos_tabla[n3]["Column_name"]] == null)
                obj2["label"] = adne + arrcampos_tabla[n3]["Column_name"] + adne2;
            else
                obj2["label"] = adne + glcampos_alias[arrcampos_tabla[n3]["Column_name"]] + adne2;


            obj2["labelWidth"] = "140";



            var pasa_autocampo = true;

            if (glautocampos == false) {
                if (glcampos_alias[arrcampos_tabla[n3]["Column_name"]] == null)
                    pasa_autocampo = false;
            }


       
            if (((gcampos_nofiltro.indexOf(arrcampos_tabla[n3]["Column_name"]) != -1) || (es_ref == false)) && (pasa_autocampo == true)) {

                if (obj2["type"] == "fieldset") {

                    if (obj2["list"][0]["type"] == "upload") {
                        var objimagen = new Object();
                        objimagen["type"] = "label";
                        objimagen["offsetLeft"] = "1";
                        objimagen["hidden"] = "true";
                        objimagen["inputWidth"] = "850";
                        objimagen["name"] = "imagen_dato";
                        //objimagen["label"] = "<strong style='color:black; '>Imagen:</strong><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx' alt='' />";
                        // objimagen["label"] = "<strong style='color:black; '>Imagen:</strong><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx' alt='' />";
                        objimagen["label"] = "<table style='border:0; margin:0; padding:0; border-spacing:0px;position:relative;left:-2px'><tr><td><strong style='color:black;font-family: Tahoma;font-size: 13px;font-weight: bold; '>Imagen:</strong><td><td><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx?tab=" + glfuente + "&llav=" + glllave_primaria + "&camp=" + gldato_binario + "&val=" + glid_actualiza + "' alt='' /><td></tr></table>"
                        formData1[n4] = objimagen;
                        n4++;
                    }
                }

                formData1[n4] = obj2;
                n4++;
            }


        }//if (gllave_tabla != arrcampos_tabla[n3]["Column_name"]) 
        n3++;

    }


    var formimagenes = new Array();
    var formcheck = new Array();
    var formpinta = new Array();
    var formpinta2 = new Array();

    var n7 = 0;
    if (glautocampos == true) {
        var objlista_reordenar = { "fieldset": [], "upload": [], "checkbox": [] };
        var objlista_contador = { "fieldset": 0, "upload": 0, "checkbox": 0 };

        //Reordena formulario
        var n6 = 0;

        while (n6 < formData1.length) {
            if (objlista_reordenar[formData1[n6]["type"]] != null) {
                objlista_reordenar[formData1[n6]["type"]][objlista_contador[formData1[n6]["type"]]] = formData1[n6];

                objlista_contador[formData1[n6]["type"]] = objlista_contador[formData1[n6]["type"]] + 1;
            }
            else {
                formpinta[n7] = formData1[n6];
                n7++;
            }
            n6++;
        }
        //Fin formulario    

        for (k1 in objlista_reordenar) {

            var n8 = 0;
            while (n8 < objlista_reordenar[k1].length) {

                formpinta[n7] = objlista_reordenar[k1][n8];
                n7++;
                n8++;
            }
        }
    }
    else//if (glautocampos == false) 
    {
        var na = 0;
        var ngrupo = 0;
        var arrgrupo = new Array();
        var nelemento = 0;
        var nreal = 0;
        var engrupo = false;
        var recien_tgrupo = false;
        for (k2 in glcampos_alias) {
            recien_tgrupo = false;
            var n9 = 0;
            var bencontro = false;
            while (n9 < formData1.length) {
                if (formData1[n9]["name"] == k2) {
                    bencontro = true;
                    break;
                }
                n9++;
            }

            if (bencontro == true) {
                if (ngrupo < glgrupos.length) {
                    if (glgrupos[ngrupo] == na) {
                        engrupo = true;
                        var arrtemp = new Array();
                        arrtemp[0] = formData1[n9];
                        arrgrupo[ngrupo] = arrtemp;
                        nelemento++;

                    }
                    else if (glgrupos[ngrupo] < na) {
                        arrgrupo[ngrupo].push(formData1[n9]);
                        nelemento++;

                    }
                    if (parseInt(glgrupos[ngrupo], 10) + parseInt(glgrupos_cantidad[ngrupo], 10) == (na + 1)) {
                        //   arrgrupo[ngrupo][nelemento] = formData1[n9];

                        var objgrupo = new Object();
                        objgrupo["type"] = "fieldset";
                        objgrupo["inputWidth"] = "650";
                        objgrupo["name"] = "gr" + ngrupo;
                        objgrupo["label"] = glgrupos_nombre[ngrupo];
                        objgrupo["list"] = arrgrupo[ngrupo];
                        formpinta[n7] = objgrupo;
                        n7++;
                        engrupo = false;
                        recien_tgrupo = true;
                        ngrupo++;
                    }

                }
            }// if (bencontro == true)
            if ((bencontro == true) && (engrupo == false) && (recien_tgrupo == false)) {
                formpinta[n7] = formData1[n9];
                n7++;
            }

            na++;
        }// for (k2 in glcampos_alias)



    }


    var arrbot = new Array();

    if (glactividades.indexOf("I") != -1) {
        var objbot = new Object();
        objbot["type"] = "button";
        objbot["value"] = "Insertar";
        objbot["name"] = "save";
        arrbot[arrbot.length] = objbot;
        var objbot = new Object();
        objbot["type"] = "newcolumn";
        arrbot[arrbot.length] = objbot;
    }

    if (glactividades.indexOf("A") != -1) {
        var objbot = new Object();
        objbot["type"] = "button";
        objbot["value"] = "Actualizar";
        objbot["name"] = "act";
        arrbot[arrbot.length] = objbot;

        var objbot = new Object();
        objbot["type"] = "newcolumn";
        arrbot[arrbot.length] = objbot;
    }

    if (glactividades.indexOf("B") != -1) {

        var objbot = new Object();
        objbot["type"] = "button";
        objbot["value"] = "Borrar";
        objbot["name"] = "del";
        arrbot[arrbot.length] = objbot;
    }

    if (glvar_otro_bot == "1") {

        var objbot = new Object();
        objbot["type"] = "newcolumn";
        arrbot[arrbot.length] = objbot;


        var objbot = new Object();
        objbot["type"] = "button";
        objbot["value"] = glvar_texto_otro_bot;
        objbot["name"] = "otrobot";
        arrbot[arrbot.length] = objbot;

    }


    var obj4 = new Object();
    obj4["type"] = "block";
    obj4["inputWidth"] = "400";
    obj4["list"] = arrbot;

    formpinta[n7] = obj4;
    n7++;



    if (glactividades.indexOf("I") == -1) {

        var ni = 0;
        while (ni < n7 - 1) {
            formpinta[ni]["hidden"] = "true";
            ni++;
        }

    }


    //Coloca grilla
    var obj4 = new Object();
    obj4["type"] = "container";
    obj4["name"] = "myGrid";
    obj4["label"] = "";
    obj4["offsetTop"] = "20";
    obj4["inputWidth"] = "600";
    obj4["inputHeight"] = "200";

    formpinta[n7] = obj4;
    n7++;
    //Fin Coloca grilla



    formData = new Array();
    var obj1 = new Object();
    obj1["type"] = "fieldset";
    obj1["name"] = "data";
    obj1["label"] = glnombreform;
    obj1["inputWidth"] = "700";
    // obj1["inputWidth"] = "300";
    obj1["list"] = formpinta;
    formData[0] = obj1;

    //    formData = [{ type: "fieldset", name: "data", label: "Bienvenido", inputWidth: "auto", list:
    //     [
    //				{ type: "input", name: 'name', label: 'Login' },
    //				{ type: "password", name: "pass", label: "Password" },
    //				{ type: "button", name: "save", value: "Proceed"}]
    //    }
    //                ];

    d("divformg").innerHTML = "";

    myForm = new dhtmlXForm("divformg", formData);


    //Añade Grilla Consulta


    var data = {
        rows: [{
            id: 1001,
            data: ["100", "A Time to Kill", "Cesar Acosta", "12.99", "1", "05/01/1998"]
        }, {
            id: 1002,
            data: ["1000", "Blood and Smoke", "Stephen King", "0", "1", "01/01/2000"]
        }, {
            id: 1003,
            data: ["-200", "The Rainmaker", "John Grisham", "7.99", "0", "12/01/2001"]
        }]
    };

    //glautocampos_grilla



    pinta_grilla();


    // alert(glrespuesta_tabla["datos_grilla"][0]["campos_tabla"]);


    //grid_consulta.parse(data, "json");

    //Fin Grilla Consulta

    contador_formulario++;
    myForm.id = "id" + contador_formulario;
    objcontador_archivos[myForm.id] = 0;

    myForm.attachEvent("onUploadComplete", function (count) {
        //alert("<b>onUploadComplete</b> " + count + " file" + (count > 1 ? "s were" : " was") + " uploaded");
        //contador_archivos++;
        //  alert(contador_archivos);
    });
    myForm.attachEvent("onUploadFile", function (realName, serverName) {
        // alert("<b>onUploadFile</b>, file: " + realName);
        contador_archivos++;
    });
    myForm.attachEvent("onUploadCancel", function (realName) {
        //    alert("<b>onUploadCancel</b>, file: " + realName);
        contador_archivos--;
    });
    myForm.attachEvent("onUploadFail", function (realName) {
        //alert("<b>onUploadFail</b>, file: " + realName);
        contador_archivos--;
    });
    myForm.attachEvent("onFileAdd", function (realName) {
        // contador_archivos++;
        //   alert("<b>onFileAdd</b>, real name: " + realName);
    });
    myForm.attachEvent("onFileRemove", function (realName, serverName) {
        contador_archivos--;
        // alert("<b>onFileRemove</b>, real name: " + realName + ", server name: " + (serverName == null ? "wasn't uploaded" : serverName));
    });
    myForm.attachEvent("onClear", function () {
        contador_archivos = 0;
        //alert("<b>onClear</b>");
    });
    myForm.attachEvent("onValidateError", function (input, value, result) {

        var mensajet = "";

        if (value == "") {
            if (glrequeridos[input] != null)
                mensajet = glrequeridos[input] + "</br>";
            else
                mensajet = "Debe digitar " + input + "</br>";
        }
        else {

            if (glrequeridos_formato[input] != null)
                mensajet = glrequeridos_formato[input] + "</br>";
            else if (glrequeridos[input] != null)
                mensajet = glrequeridos[input] + "</br>";
            else
                mensajet = input + " debe tener el formato correcto</br>";
        }
        mensaje_error_form = mensaje_error_form + mensajet;




    });

    //myForm.enableLiveValidation(true);
    myForm.attachEvent("onButtonClick", function (id) {

        if (id == "otrobot") {
            eval(glvar_funcion_otro_bot + "('" + glid_actualiza + "')");
        }
        else {

            if (((id == "act") || (id == "del")) && (glesta_actualizando == "")) {
                dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No ha seleccionado un registro" });
            }
            else {
                var values2 = myForm.getFormData(true);


                myForm.validate();
                if (glvarejecuta_valida == "1")
                    eval(glejecuta_valida + "('" + id + "')");
                if (mensaje_error_form == "") {
                    //Guardar
                    var values = myForm.getFormData(true);
                    var contador_archivos_int = 0;

                    var llave_file = "";
                    var objt1 = new Object();

                    var arr1 = new Array();
                    var arr2 = new Array();
                    //alert(values["fecha_registro"]);
                    //alert(test_fecha(values["fecha_registro"]));
                    //alert(test_fecha(values["nombre"]));

                    objt1["tabla_insertar"] = glfuente;
                    objt1["dato_binario"] = gldato_binario;
                    objt1["llave"] = glid_actualiza;
                    objt1["columna_llave"] = glllave_primaria;

                    for (k5 in values) {
                        if ((k5.indexOf("_r_") == -1) && (k5.indexOf("_s_") == -1) && (k5.indexOf("_count") == -1)) {
                            objt1[k5] = values[k5];

                        }
                        else if (k5.indexOf("_r_") != -1) {
                            objt1["archivo_dato_" + contador_archivos_int] = values[k5];
                            contador_archivos_int++;
                        }
                    }

                    if (contador_archivos_int > 1) {
                        dhtmlx.alert({
                            title: "Revisar por favor",
                            type: "alert-error",
                            text: "Solo debe adjuntar un archivo"
                        });

                    }
                    else {


                        for (km in gldatos_filtro) {
                            if (objt1[km] == null) {
                                objt1[km] = gldatos_filtro[km];
                            }
                        }


                        if ((id != "act") && (id != "del")) {
                            for (km2 in glinserta_quemados) {
                                if (objt1[km2] == null) {
                                    objt1[km2] = glinserta_quemados[km2];
                                }
                            }
                        }

                        arr1[0] = objt1;
                        arr2[0] = arr1;
                        arr2[1] = glarrunique;


                        // alert(JSON.stringify(arr2));
                        switch (id) {
                            case "act":
                                if (glesta_actualizando != "")
                                    call_sgu(llego_actualiza, arr2, "actualiza", "form");
                                else
                                    dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No ha seleccionado un registro" });
                                break;
                            case "save":
                                call_sgu(llego_inserta, arr2, "inserta", "form");
                                break;
                            case "del":

                                if (glesta_actualizando != "")
                                    call_sgu(llego_borrar, arr2, "borra", "form");
                                else
                                    dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No ha seleccionado un registro" });
                                break;
                        }
                    }
                }
                else {
                    dhtmlx.alert({
                        title: "Revisar por favor",
                        type: "alert-error",
                        text: mensaje_error_form
                    });

                }
                mensaje_error_form = "";
            }
        }
    });


    if (glvar_ejecuta_carga == "1") {
        eval(glejecuta_carga + "()");
    }

}



function pinta_grilla() {

    if (glactividades.indexOf("C") != -1) {
        var c = new Date();
        if (glautocampos_grilla == true) {
            //Coloca todos los campos de la tabla  a excepcion de la llave_primaria y de los varbinary
            var grid_consulta = new dhtmlXGridObject(myForm.getContainer("myGrid"));
            grid_consulta.setImagePath("../Componentes/dhtmlxSuite/dhtmlxGrid/codebase/imgs/");
            grid_consulta.setHeader(glrespuesta_tabla["datos_grilla"][0]["campos_tabla"]);
            //grid_consulta.setHeader("Sales, Book Title, Author, Book Title2, Author4");
            grid_consulta.setInitWidths(glrespuesta_tabla["datos_grilla"][0]["campos_tamano"]);
            grid_consulta.setColAlign(glrespuesta_tabla["datos_grilla"][0]["align"]);
            grid_consulta.setColTypes(glrespuesta_tabla["datos_grilla"][0]["campos_tipoel"]);
            grid_consulta.setColVAlign(glrespuesta_tabla["datos_grilla"][0]["align"]);
            grid_consulta.setColSorting(glrespuesta_tabla["datos_grilla"][0]["campos_tipo"]);
            grid_consulta.attachEvent("onRowSelect", seleccion_grilla);
            grid_consulta.init();
            grid_consulta.setSkin("dhx_skyblue");



            if (glvar_filtra_activo == "1")
                grid_consulta.load("../Manejadores/form.aspx?activo_grilla=" + glvar_nombre_activo + "&llave_primaria=" + glllave_primaria + "&" + gconsulta_creada + "&c=" + ahora.getMilliseconds(), "json");
            else
                grid_consulta.load("../Manejadores/form.aspx?llave_primaria=" + glllave_primaria + "&" + gconsulta_creada + "&c=" + ahora.getMilliseconds(), "json");
        }
        else {

            var arrtitulo = new Array();


            var arrt1 = glrespuesta_tabla["datos_grilla"][0]["campos_tabla"].split(",");
            var arrtam = glrespuesta_tabla["datos_grilla"][0]["campos_tamano"].split(",");
            var arrt2 = glrespuesta_tabla["datos_grilla"][0]["align"].split(",");;
            var arrt3 = glrespuesta_tabla["datos_grilla"][0]["campos_tipoel"].split(",");;
            var arrt4 = glrespuesta_tabla["datos_grilla"][0]["align"].split(",");;
            var arrt5 = glrespuesta_tabla["datos_grilla"][0]["campos_tipo"].split(",");

            var nt1 = 0;
            var tit = 0;
            while (nt1 < arrt1.length) {

                //alert(arrt1[nt1].toLowerCase());
                if (glcampos_grilla.indexOf(arrt1[nt1].toLowerCase()) != -1) {
                    arrtitulo[nt1] = gltitulo_grilla[tit];
                    arrtam[nt1] = arrtam[nt1];
                    tit++;
                }
                else {
                    arrtitulo[nt1] = "";
                    arrtam[nt1] = "0";
                }

                nt1++;
            }

            var stipos = "ro," + gltipogr.join();
            var arrtipos = stipos.split(",");
            var poschk = -1;
            poschk = arrtipos.indexOf("ch");


            var grid_consulta = new dhtmlXGridObject(myForm.getContainer("myGrid"));
            grid_consulta.setImagePath("../Componentes/dhtmlxSuite/dhtmlxGrid/codebase/imgs/");
            grid_consulta.setHeader("0," + gltitulo_grilla.join());
            //grid_consulta.setHeader("Sales, Book Title, Author, Book Title2, Author4");
            grid_consulta.setInitWidths("0," + gltamano.join());
            grid_consulta.setColAlign("center," + glalineacion.join());
            grid_consulta.setColTypes("ro," + gltipogr.join());
            grid_consulta.setColSorting("str," + gltipostr.join());
            grid_consulta.attachEvent("onRowSelect", seleccion_grilla);
            grid_consulta.init();
            grid_consulta.setSkin("dhx_skyblue");

            if (glvar_filtra_activo == "1")
                grid_consulta.load("../Manejadores/form.aspx?activo_grilla=" + glvar_nombre_activo + "&llave_primaria=" + glllave_primaria + "&" + gconsulta_creada + "&campos_grilla=" + glcampos_grilla + "&c=" + ahora.getMilliseconds(), "json");
            else
                grid_consulta.load("../Manejadores/form.aspx?llave_primaria=" + glllave_primaria + "&" + gconsulta_creada + "&campos_grilla=" + glcampos_grilla + "&c=" + ahora.getMilliseconds(), "json");

            if (poschk != 1) {
                grid_consulta.attachEvent("onRowCreated", function (id) {
                    var cell = grid_consulta.cells(id, poschk); //checkbox cell
                    cell.setDisabled(true);


                })
            }

        }
    }

}
var mensaje_error_form = "";
var glid_actualiza = "";
var glesta_actualizando = "";
function seleccion_grilla(id) {
    if (glactividades.indexOf("A") != -1) {

        glesta_actualizando = "1";
        var arrf1 = new Array();
        var nf = 0;
        while (nf < formData[0]["list"].length - 2) {

            var objf1 = new Object();

            if (formData[0]["list"][nf]["type"] == "fieldset") {
                var arrtemp = new Array();
                arrtemp = formData[0]["list"][nf]["list"];
                var m1 = 0;
                while (m1 < arrtemp.length) {
                    if (arrtemp[m1]["name"] != "") {
                        var objf2 = new Object();
                        objf2["columnas"] = arrtemp[m1]["name"];
                        arrf1[arrf1.length] = objf2;
                    }
                    m1++;
                }
            }
            else
                objf1["columnas"] = formData[0]["list"][nf]["name"];

            arrf1[arrf1.length] = objf1;
            nf++;
        }

        glid_actualiza = id;

        var arrt3 = new Array();
        var obt2 = new Object();
        obt2["columna_llave"] = glllave_primaria;
        obt2["llave"] = glid_actualiza;
        obt2["dato_binario"] = gldato_binario;
        obt2["tabla"] = glfuente;

        arrt3[0] = obt2;

        var arrt2 = new Array();
        arrt2[0] = arrf1;
        arrt2[1] = arrt3;


        call_sgu(llego_consulta_llave, arrt2, "consulta_llave", "form");

    }


}


function llego_consulta_llave(respuesta) {
    myForm.clear();
    // myForm.setItemLabel("imagen_dato", "<strong style='color:black; position:relative; top:-20px;'>Imagen:</strong><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx?tab=" + glfuente + "&llav=" + glllave_primaria + "&camp=" + gldato_binario + "&val=" + glid_actualiza + "' alt='' />");


    //  dhtmlXForm_titulo = "Selecionar el archivo a cargar";
    //    dhtmlXForm_titulo2 = "Para actualizar arrastre o haga clic  </br> para selecionar el archivo";
    var n9 = 0;
    while (n9 < formData[0]["list"].length - 1) {
        if (formData[0]["list"][n9]["name"] != gldato_binario)
            myForm.showItem(formData[0]["list"][n9]["name"]);
        else {
            //myForm.showItem(formData[0]["list"][n9+1]["name"]);
            myForm.showItem(formData[0]["list"][n9]["name"]);
            document.querySelector(".dhx_file_uploader_button").style.width = "216px";

        }
        n9++;
    }

    //myForm.setItemLabel("save", "Actualizar");
    //  myForm.setItemLabel("imagen_dato", "<strong style='color:black; '>Imagen:</strong><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx?tab=" + glfuente + "&llav=" + glllave_primaria + "&camp=" + gldato_binario + "&val=" + glid_actualiza + "' alt='' />");

    myForm.setItemLabel("imagen_dato", "<table style='border:0; margin:0; padding:0;border-spacing:0px;position:relative;left:-2px'><tr><td><strong style='color:black;color:black;font-family: Tahoma;font-size: 13px;font-weight: bold; '>Imagen:</strong><td><td><img style='position:relative; left:80px;' width='" + gltamano_imagen + "px' src='../Manejadores/ver_imagen.aspx?tab=" + glfuente + "&llav=" + glllave_primaria + "&camp=" + gldato_binario + "&val=" + glid_actualiza + "' alt='' /><td></tr></table>");

    if (respuesta["Table"] != undefined) {
        if (respuesta["Table"].length > 0) {
            for (kdato in respuesta["Table"][0]) {
                myForm.setItemValue(kdato, respuesta["Table"][0][kdato]);

            }

        }
    }
    else {
        dhtmlx.alert({
            title: "Error",
            type: "alert-error",
            text: respuesta["error"][0]["error"]
        });
    }



    //  var combo1 = document.getElementsByName("ApplicationId");
    //  alert(combo1[0]["options"][0]);
    //  alert(combo1[0]["options"][1]);
    //  myForm.setItemValue("ApplicationId", "4F0779A4-F012-42AD-9FA8-EC2F696750F1");


    if (glvar_ejecuta_selecciona == "1")
        eval(glejecuta_selecciona + "(glid_actualiza)");

}
var glrespuesta_inserta;
var glrespuesta_actualiza;
function llego_inserta(respuesta) {
    glrespuesta_inserta = respuesta;
    if (respuesta["Table"] != null) {

        myForm.clear();
        glesta_actualizando = "";
        if (glmanejaarchivos != null)
            glmanejaarchivos.clear();
        // alert("FIN--1");
        pinta_grilla();
        dhtmlx.alert({
            title: "Inserción",
            type: "alert",
            text: "Inserción realizada exitosamente",
            callback: prueba_fn_inserta
        });




    }


}

function prueba_fn_inserta() {
    // alert("FIN");
    if (glvarejecuta_inserta == "1")
        eval(glejecuta_inserta + "(glrespuesta_inserta)");
}
Date.prototype.isValid = function () {

    return this.getTime() === this.getTime();
};
function test_fecha(fecha) {
    var d1 = new Date(fecha);
    return d1.isValid();
}


function llego_actualiza(respuesta) {
    glrespuesta_actualiza = respuesta;
    if (respuesta["Table"] != null) {
        pinta_grilla();
        dhtmlx.alert({
            title: "Actualización",
            type: "alert",
            text: "Actualización realizada exitosamente",
            callback: prueba_fn_actualiza
        });
    }
    myForm.clear();
    glesta_actualizando = "";
    if (glmanejaarchivos != null)
        glmanejaarchivos.clear();

    //document.querySelector(".dhx_upload_files").innerHTML = "";
    // var myUploader = myForm.getUploader(gldato_binario);

    //myUploader.clear();
    //// the same will do setItemValue w/o params
    //myForm.setItemValue(name);

}

function prueba_fn_actualiza() {

    if (glvar_ejecuta_actualiza == "1")
        eval(glejecuta_actualiza + "(glrespuesta_actualiza)");
}

function llego_borrar(respuesta) {

    if (respuesta["Table"] != null) {

        myForm.clear();
        glesta_actualizando = "";
        if (glmanejaarchivos != null)
            glmanejaarchivos.clear();


        pinta_grilla();

        dhtmlx.alert({
            title: "Borrado",
            type: "alert",
            text: "Borrado realizado exitosamente"
        });
    }
    else {

        dhtmlx.alert({
            title: "Borrado no exitoso",
            type: "alert-error",
            text: "Este registro no se puede borrar"
        });
    }


}

var glfunactg = "";
var grillajava = function () {
    var div, nombre, idlabel, id, fuente, datovalor, datotexto, estilo, estiloalterno, habencabezado, autorow;
    var encabezado = new Array(), datoscolumnas = new Array(), tipocolumna = new Array(), funcioncolumna = new Array();
    var estilocolumna = new Array(), estiloencabezado, copia, i1, arrgrid = new Array();
    var tipodatos = new Array();
    var listaproductos = new Array();
    var fuente_tabla_aux = "";
    var estilotabla, propiedadestabla, autocolumn, ordenarencabezado, fuente_tabla, tipo;
    var funcionencabezado;
    var iconos_editar;
    var iconos_personalizado;
    var funcion_pinta;
    var imagentoogle = new Array();
    var inserta_quemados;
    var funcion_carga_act;
    var funcion_cambio;
    var encabezado_adicional;
    var encabezado_cantidad;
    var htmlicono;
    var htmladicional;
    var estiloencabezado = new Array();
    var estilo_componentes = new Array();
    var ancho_autocompletar = new Array();
    var funcioncambiodin = "";
    var funcionlineanueva = "";
    var autocompletar = new Array();

    this.imagentoogle = ["", ""];
    this.estilo = "";
    this.funcion_cambio = "";
    this.ordenarentero = new Array();
    this.estilotabla = 'WIDTH: 98%; BORDER-COLLAPSE: collapse';
    this.propiedadestabla = 'cellSpacing=0 rules=all border=1';
    this.ordenarencabezado = false;
    this.estilocelda = new Array;
    this.clasetabla = "";
    this.fuente_tabla = "";
    this.fuente_tabla_aux = "";
    this.iconos_editar = false;
    this.htmlicono = "";
    this.iconos_personalizado = false;
    this.funcion_pinta = "";
    this.funcion_carga_act = "";
    this.inserta_quemados = new Object();
    this.tipo = "0";
    this.encabezado_adicional = new Array;
    this.encabezado_cantidad = new Array;
    this.tipodatos = new Array();
    this.listaproductos = new Array();
    this.estiloencabezado = new Array();
    this.estilo_componentes = new Array();
    this.ancho_autocompletar = new Array();
    this.htmladicional = "";
    this.fuente = new Array();
    this.funcioncambiodin = "";
    this.funcionlineanueva = "";
    this.autocompletar = new Array();
    var campos_tabla_auxiliar = new Array();
    this.campos_tabla_auxiliar = new Array();

    var campos_dato_tabla_auxiliar = new Array();
    this.campos_dato_tabla_auxiliar = new Array();

}
grillajava.prototype.filas = function () {
    var ifilas = 0;
    while (d(this.id + "_tr_" + ifilas + "_td_0") != undefined) {
        ifilas++;
    }
    return ifilas;
}
grillajava.prototype.buscar = function (component, identi) {
    return component + '_' + identi;
}
function enlacelink2(i4, funcion, mismovalor) {
    enlacelnk = new Object();
    var array1lnk = new Array();
    var array2lnk = new Array();

    array1lnk = i4.split("++");
    for (nlnk = 0; nlnk < array1lnk.length; nlnk++) {
        array2lnk = array1lnk[nlnk].split("**");
        enlacelnk[array2lnk[0]] = array2lnk[1];
    }
    //hace parte del framework
    eval(funcion + '(enlacelnk,mismovalor)');
}
grillajava.prototype.igrilla = function (idgril) {
    this.div = "0";
    this.id = "rdbg_" + idgril;
}
grillajava.prototype.leer = function () {
    var fila5;
    var columna5;
    var sagrilla;
    fila5 = 0;
    columna5 = 0;
    sagrilla = "";
    while (d(this.id + "_tr_" + fila5 + "_td_" + columna5) != undefined) {
        fila5++;
    }
    fila6 = fila5;

    eval('var arrgrid2=new Array(' + fila5 + ');');
    fila5 = 0;

    var arrgridfila = new Array();

    for (fila5 = 0; fila5 < fila6; fila5++) {
        columna5 = 0;
        sagrilla = "";
        while (d(this.id + "_tr_" + fila5 + "_td_" + columna5) != undefined) {
            sagrilla = sagrilla + d(this.id + "_tr_" + fila5 + "_td_" + columna5).innerHTML + "/*/";
            columna5++;
        }
        sagrilla = sagrilla.substring(0, sagrilla.length - 3);
        arrgridfila = sagrilla.split("/*/");
        arrgrid2[fila5] = arrgridfila;

    }
    this.arrgrid = arrgrid2;
}
function pr123(valor, imagen, dato, funcion, img1, img2, titulo, total, campos2, n7, oent, idtemp) {

    total2 = parseInt(total, 10);
    sub = valor.substring(0, valor.length - 1);
    var arrcampo = new Array();
    arrcampo = campos2.split("+++");
    n8 = parseInt(n7, 10);
    for (m = 0; m < total2; m++) {
        if (m != n8)
            d(sub + m).innerHTML = arrcampo[m];
    }
    if (d(imagen) == undefined) {
        eval(funcion + '("A",dato,oent,idtemp)');
        acumi = "<IMG id=" + imagen + " name='0' SRC='" + img1 + "' border=0>" + titulo;
        d(valor).innerHTML = acumi;
    }
    else {
        imagen2 = String(trim(d(imagen).name));
        if (imagen2 == "0") {
            eval(funcion + '("D",dato,oent,idtemp)');
            acumi = "<IMG id=" + imagen + " name='1' SRC='" + img2 + "' border=0>" + titulo;
            d(valor).innerHTML = acumi;
        }
        else {
            eval(funcion + '("A",dato,oent,idtemp)');
            acumi = "<IMG  id=" + imagen + " name='0' SRC='" + img1 + "' border=0>" + titulo;
            d(valor).innerHTML = acumi;
        }

    }
}
function pr1235(valor) {
}


grillajava.prototype.nfila = function () {


    // creamos una nueva celda style
    //var newCell = newRow.insertCell(newRow.cells.length);
    //nev=ntabla.rows.length - 1;

    //alert(this.id);
    ntabla = "TABLA" + this.id;
    cantidadcol = this.datoscolumnas.length;

    for (i1 = 0; i1 < this.fuente.length; i1++) {
        idfila = eval(ntabla).rows.length;
        var newRow = eval(ntabla).insertRow(-1);

        if (idfila % 2 == 0)
            newRow.className = this.estilo;
        else
            newRow.className = this.alternolista;

        newRow.id = this.id + "_tr_" + idfila;

        n = 0;
        while (n < cantidadcol) {
            td = newRow.insertCell(newRow.cells.length);
            td.id = this.id + "_tr_" + idfila + "_td_" + n;

            for (k in this.estilocelda[n]) {
                td.style[k] = this.estilocelda[n][k];
                //alert(k);
            }

            td.innerHTML = this.fuente[i1][this.datoscolumnas[n]];
            n = n + 1;
            //WIDTH: 250px;
        }
    }
}


function nueva_linea(id) {

    var arrtmp = new Array();
    var indtm = 0;
    var objjtmp = new Object();
    var arrdatos_ad = new Array();
    while (indtm < glgrillaglobal[id].datoscolumnas.length) {
        var tipo_dato = glgrillaglobal[id].tipodatos[indtm];
        if ((tipo_dato == "int") || (tipo_dato == "float"))
            objjtmp[glgrillaglobal[id].datoscolumnas[indtm]] = "0";
        else if (tipo_dato == "fecha") {
            if (typeof (glfecha_actual) != "undefined")
                objjtmp[glgrillaglobal[id].datoscolumnas[indtm]] = glfecha_actual;
            else
                objjtmp[glgrillaglobal[id].datoscolumnas[indtm]] = "";
        }
        else if (tipo_dato == "lista") {
            objjtmp[glgrillaglobal[id].datoscolumnas[indtm]] = glgrillaglobal[id].listaproductos[indtm][0]["id"];
        }
        else
            objjtmp[glgrillaglobal[id].datoscolumnas[indtm]] = "";

        indtm++;
    }

    var consecutivo = "";
    consecutivo = String(parseInt(glconsecutivo[id], 10) + 1);
    glconsecutivo[id] = consecutivo;
    objjtmp["consecutivo"] = consecutivo;
    gldatosglob[id][gldatosglob[id].length] = objjtmp;
}

var glconsecutivo = new Object();
var glgrillaglobal = new Object();
var gldatosglob = new Object();
var glautocompletar;

function anade_linea(id) {
    nueva_linea(id);
    glgrillaglobal[id].bind();
}
grillajava.prototype.bind = function () {

    this.fuente_tabla_aux = gltabla_edita_aux;
    glinserta_quemados = this.inserta_quemados;
    glinserta_quemados_buff = this.inserta_quemados_buff;
    glautocompletar = this.autocompletar;
    glgrillaglobal[this.id] = this;
    glfuncion_cambio = this.funcion_cambio;

    var llave_tabla = "";
    if (glarrconfigtmp != undefined) {
        if (glarrconfigtmp.length != undefined) {
            //debugger;
            var busqllave = 0;
            while (busqllave < glarrconfigtmp[0].length) {
                if (this.fuente_tabla == glarrconfigtmp[0][busqllave]["tabla"]) {
                    llave_tabla = glarrconfigtmp[0][busqllave]["serial"];

                }
                busqllave++;
            }

        }
    }


    if (this.tipo == "1") {

        if (gldatosglob[this.id] == undefined) {
            gldatosglob[this.id] = this.fuente;
            glconsecutivo[this.id] = 0;
        }
        else {
            if (gldatosglob[this.id].length == 0)
                glconsecutivo[this.id] = 0;

        }
        if (gldatosglob[this.id].length == 0)
            nueva_linea(this.id);


        //globjvaloresdefecto[this.id] = arrdatos_ad;

        this.fuente = gldatosglob[this.id];

        var indtm = 0;
        indtm = 0;
        while (indtm < this.tipodatos.length) {

            var tipo_dato = this.tipodatos[indtm];
            if ((tipo_dato == "int") || (tipo_dato == "float") || (tipo_dato == "string"))
                this.tipocolumna[indtm] = "12";
            else if (tipo_dato == "label")
                this.tipocolumna[indtm] = "1";
            else if (tipo_dato == "lista")
                this.tipocolumna[indtm] = "13";
            else if (tipo_dato == "fecha")
                this.tipocolumna[indtm] = "14";
            else if (tipo_dato == "eliminar")
                this.tipocolumna[indtm] = "15";
            indtm++;
        }

    }


    if (this.autocolumn == true) {
        cont9 = 0;
        var temp1 = new Array();
        var temp2 = new Array();
        var temp3 = new Array();
        var temp4 = new Array();

        for (k in this.fuente[0]) {
            temp1[cont9] = k;
            temp2[cont9] = this.tipocolumna[0];
            temp3[cont9] = this.funcioncolumna[0];
            temp4[cont9] = this.estilocolumna[0];
            cont9++;
        }

        this.datoscolumnas = temp1;
        this.tipocolumna = temp2;
        this.funcioncolumna = temp3;
        this.estilocolumna = temp4;
    }

    var grilla;
    grilla = "";
    grilla = grilla + "<TABLE class=" + this.clasetabla + " id=TABLA" + this.id + " style='" + this.estilotabla + "' " + this.propiedadestabla + ">";


    var encabgrupo = 0;
    var encabgrupo_acum = 0;

    // this.encabezado_adicional = new Array;
    // this.encabezado_cantidad = new Array;
    var arrfechatipo10 = new Array();
    if (this.encabezado_adicional.length > 0) {
        grilla = grilla + "<TR class=" + this.estiloencabezado + ">";

        var encanindex = 0;
        while (encanindex < this.encabezado_adicional.length) {
            grilla = grilla + "<TH colspan='" + this.encabezado_cantidad[encanindex] + "' id=" + this.id + "_tr_tit_td_" + n4 + "  style='text-align:center;' scope=col> " + this.encabezado_adicional[encanindex] + "</TH>";
            encanindex++;
        }
        grilla = grilla + "</TR>";
    }

    //grilla = grilla + "<TBODY>";

    if (this.habencabezado == true) {
        grilla = grilla + "<TR class=" + this.estiloencabezado + ">";

        if (this.autorow == true) {
            var conta;
            conta = 0;
            for (k in this.fuente[0]) {
                grilla = grilla + "<TH id=" + this.id + "_tr_tit_td_" + conta + " scope=col>" + k + "</TH>";
                conta++;
            }
        }
        else {


            for (n4 = 0; n4 < this.encabezado.length; n4++) {
                campos = "";
                for (n5 = 0; n5 < this.encabezado.length; n5++) {
                    campos = campos + this.encabezado[n5] + "+++";
                }

                filaord = '"txt' + this.id + '_tr_tit_td_' + n4 + '"';
                imageord = '"img' + this.id + '_tr_tit_td_' + n4 + '"';
                //alert(this.imagentoogle[0]);
                if (this.imagentoogle.length > 0) {
                    w = '"' + this.imagentoogle[0] + '"';
                    w1 = '"' + this.imagentoogle[1] + '"';
                }
                d1 = '"' + this.datoscolumnas[n4] + '"';
                f1 = '"' + this.funcionencabezado + '"';
                t1 = '"' + this.encabezado[n4] + '"';
                total = '"' + this.encabezado.length + '"';
                campos = '"' + campos + '"';
                n6 = '"' + n4 + '"';
                idtemp = '"' + this.id + '"';
                oent = '"' + this.ordenarentero[n4] + '"';

                var tiene_estilo_encabezado = false;
                if (this.estiloencabezado.length > 0)
                    tiene_estilo_encabezado = true;

                if (this.ordenarencabezado == true)
                    grilla = grilla + "<TH  id=" + this.id + "_tr_tit_td_" + n4 + " style=" + this.estilocolumna[n4] + " scope=col> <A  style='width:100%; text-decoration: underline a:active{text-decoration: underline}' href='#' onClick='pr123(" + filaord + "," + imageord + "," + d1 + "," + f1 + "," + w + "," + w1 + "," + t1 + "," + total + "," + campos + "," + n6 + "," + oent + "," + idtemp + ")'; onMouseOut='pr1235(" + filaord + "," + imageord + ")'; id=txt" + this.id + "_tr_tit_td_" + n4 + ">" + this.encabezado[n4] + "</A></TH>";
                else {
                    if (tiene_estilo_encabezado == false)
                        grilla = grilla + "<TH id=" + this.id + "_tr_tit_td_" + n4 + "  style=" + this.estilocolumna[n4] + " scope=col> " + this.encabezado[n4] + "</TH>";
                    else
                        grilla = grilla + "<TH id=" + this.id + "_tr_tit_td_" + n4 + "  style=" + this.estiloencabezado[n4] + " scope=col> " + this.encabezado[n4] + "</TH>";
                }
                //                        grilla = grilla + "<TH id=" + this.id + "_tr_tit_td_" + n4 + "  style=" + this.estilocolumna[n4] + " scope=col> " + this.encabezado[n4] + "</TH>";

            }
        }
        grilla = grilla + "</TR>";
    }
    for (i1 = 0; i1 < this.fuente.length; i1++) {
        if (i1 % 2 == 0) {
            grilla = grilla + "<TR id=" + this.id + "_tr_" + i1 + " class=" + this.estilo + ">";
        }
        else {
            grilla = grilla + "<TR id=" + this.id + "_tr_" + i1 + " class=" + this.alternolista + ">";
        }
        if (this.autorow == true) {
            n4 = 0;
            for (k in this.fuente[i1]) {
                grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + ">" + this.fuente[i1][k] + "</TD>";
                n4++;
            }
        }
        else {
            //aca llega cuando es autorow=false
            var n4;
            for (n4 = 0; n4 < this.datoscolumnas.length; n4++) {

                switch (this.tipocolumna[n4]) {
                    case "0":
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + this.fuente[i1][this.datoscolumnas[n4]] + "</TD>";
                        break;
                        //alert(grilla);

                    case "1":
                        var funcion;
                        funcion = this.funcioncolumna[n4];
                        dato = eval(funcion + '(this.fuente[i1],this.fuente[i1][this.datoscolumnas[n4]])');
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + ">" + dato + "</TD>";
                        break;
                    case "2":
                        var funcion;
                        funcion = this.funcioncolumna[n4][0];
                        dato2 = eval(funcion + '(this.fuente[i1],this.fuente[i1][this.datoscolumnas[n4]])');
                        dato = this.funcioncolumna[n4][1];
                        acumulador = "";
                        for (k in this.fuente[i1]) {
                            acumulador = acumulador + k + '**' + this.fuente[i1][k] + "++";
                        }
                        if (acumulador.length > 0) {
                            acumulador = acumulador.substring(0, acumulador.length - 2);
                            acumulador = "'" + acumulador + "'";
                        }
                        dato = "'" + dato + "'";
                        arg = "'" + this.fuente[i1][this.datoscolumnas[n4]] + "'";

                        grilla = grilla + '<TD id=' + this.id + '_tr_' + i1 + '_td_' + n4 + ' style=' + this.estilocolumna[n4] + ' ><A class=lkb id=opcion_sega href="javascript:enlacelink2(' + acumulador + ',' + dato + ',' + arg + ')">' + dato2 + '</A> </TD>';
                        break;
                    case "3":
                        var funcion;

                        funcion = this.funcioncolumna[n4];
                        dato = eval(funcion + '(this.fuente[i1],i1)');
                        var datogr = new Array();
                        datogr = dato.split("***---");
                        i1 = datogr[1];
                        i1 = parseInt(i1, 10);
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + ">" + datogr[0] + "</TD>";
                        break;
                    case "4":
                        infor = "<input id='" + this.funcioncolumna[n4] + "_" + i1 + "' value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' class='txt' type='text' style='width:25px' />";
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;
                    case "5":

                        //Nuevo SGU check box

                        if ((this.fuente[i1][this.datoscolumnas[n4]] == "True") || (this.fuente[i1][this.datoscolumnas[n4]] == "1"))
                            infor = "<input id='" + this.funcioncolumna[n4] + "_" + i1 + "' type='checkbox' CHECKED/>";
                        else
                            infor = "<input id='" + this.funcioncolumna[n4] + "_" + i1 + "' type='checkbox' />";;

                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";
                        break;
                    case "6":
                        infor = "<input  style='width:30px' class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;
                    case "7":
                        infor = "<input style='width:90px'  class='gwautotext_fecha' id='componente_" + "_" + this.datoscolumnas[n4] + "_" + i1 + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;
                    case "10":
                        //   Nuevo SGU automatico
                        //   fuente_tabla
                        //    debugger;

                        infor = this.datoscolumnas[n4];
                        var iauto = 0;
                        var tipo_auto = "";
                        var tipo_longitud = "";
                        if (glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_1"] != null) {
                            while (iauto < glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_1"].length) {
                                if (glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_1"][iauto]["Column_name"] == this.datoscolumnas[n4]) {
                                    tipo_auto = glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_1"][iauto]["Type"];
                                    tipo_longitud = glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_1"][iauto]["Length"];
                                }
                                iauto++;
                            }
                        }

                        var tipo_referencia = "";
                        iauto = 0;
                        if (glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"] != null) {
                            while (iauto < glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"].length) {
                                if ((glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"][iauto]["constraint_type"] == "FOREIGN KEY") &&
                                    (glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"][iauto]["constraint_keys"] == this.datoscolumnas[n4]))
                                    tipo_referencia = glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"][iauto + 1]["constraint_keys"];
                                iauto++;
                            }
                        }


                        infor = tipo_referencia;
                        //alert(tipo_longitud);

                        var estilo_de_componente = "";
                             if (this.estilo_componentes[n4] != "")
                            estilo_de_componente = this.estilo_componentes[n4];

                             var ancho_autocompletar = "";
                             if (this.ancho_autocompletar[n4] != "")
                                 ancho_autocompletar = this.ancho_autocompletar[n4];

                        var dato_llave = "";
                        if (llave_tabla != "")
                            dato_llave = this.fuente[i1][llave_tabla];

                        if (tipo_referencia == "") {
                            if (tipo_auto != "") {

                                var itipo_longitud = parseInt(tipo_longitud, 10);
                                if (itipo_longitud > 500) {
                                    infor = "<textarea  style='" + estilo_de_componente + "'  onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotextarea' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  rows='2' cols='30'>" + this.fuente[i1][this.datoscolumnas[n4]] + "</textarea>";
                                }
                                else {

                                    var evento_adicional = "";
                                    if (tipo_auto == "int") {

                                        infor = "<input style='" + estilo_de_componente + "'  onkeyup=" + "'" + "return posDecimal(this, 4," + '"' + dato_llave + '"' + ")" + "'" + " " + "onkeypress=" + "'" + "return letraPresionada(event, this)" + "'" + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                                    }
                                    else if (tipo_auto == "float") {
                                        var valor_col = "";
                                        valor_col = replaceAll(this.fuente[i1][this.datoscolumnas[n4]], ",", ".");

                                        infor = "<input style='" + estilo_de_componente + "'  onkeyup=" + "'" + "return posDecimal(this, 4," + '"' + dato_llave + '"' + ")" + "'" + " " + "onkeypress=" + "'" + "return letraPresionada_punto(event, this)" + "'" + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + valor_col + "' type='text' />";
                                    }
                                    else if (tipo_auto == "datetime") {
                                        arrfechatipo10[arrfechatipo10.length] = "componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave;
                                        infor = "<input style='text-align:left; width:120px;' " + "'" + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                                    }
                                    else if (tipo_auto == "tinyint") {
                                        var schecked = "";
                                        if (this.fuente[i1][this.datoscolumnas[n4]] == "1")
                                            schecked = " checked ";

                                        infor = "<input style='" + estilo_de_componente + "' " + schecked + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='checkbox' />";
                                    }
                                    else
                                        infor = "<input style='" + estilo_de_componente + "'  onkeyup=" + "'" + "return maxcantidad(this, " + itipo_longitud + ")" + "'" + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                                    // infor = "<input onkeyup=" + "'" + "return maxcantidad(this, " + itipo_longitud + ")" + "'" + " onblur=dejo_componente(this,'" + dato_llave + "','" + this.fuente_tabla + "','" + this.datoscolumnas[n4] + "','" + llave_tabla + "') class='gwautotext' id='componente_" + this.fuente_tabla + "_" + this.datoscolumnas[n4] + "_" + dato_llave + "'  value='123' type='text' />";


                                }
                            }
                        }
                        else {

                            if (this.autocompletar.indexOf(this.datoscolumnas[n4]) == -1)
                                infor = html_combo(glarrdatos_config[this.fuente_tabla], i1, this.fuente_tabla, this.datoscolumnas[n4], tipo_referencia, this.fuente[i1][this.datoscolumnas[n4]], dato_llave, llave_tabla, estilo_de_componente);
                            else
                                infor = html_autocompletar(glarrdatos_config[this.fuente_tabla], i1, this.fuente_tabla, this.datoscolumnas[n4], tipo_referencia, this.fuente[i1][this.datoscolumnas[n4]], dato_llave, llave_tabla, estilo_de_componente, ancho_autocompletar);
                        }

                        //          alert(infor);
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;

                    case "11":
                        //     debugger;
                        var dato_llave = "";
                        if (llave_tabla != "")
                            dato_llave = this.fuente[i1][llave_tabla];
                        //Coloca el eliminar, intenta hacer delete sino, update en activo=1, si no tiene campo activo deja asi debe retornar la misma consulta 
                        infor = "<a id='a_eliminar_reg' href='#' title='Eliminar registro de " + this.fuente_tabla + "' onclick='return elimina_registro(" + '"' + this.fuente_tabla + '"' + "," + '"' + llave_tabla + '"' + "," + '"' + dato_llave + '"' + "," + '"' + this.funcion_pinta + '"' + ")'>" + "<img width='10px' src='../Images/delete.png' alt='' title='Elimina Registro de  " + this.fuente_tabla + "' />" + "</a>";

                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;
                    case "12":
                        //Caja de texto;
                        //estilo_componentes
                        var estilo_de_componente = "";
                        var clase = "gwautotext_i";
                        if (this.estilo_componentes[n4] != "")
                            estilo_de_componente = this.estilo_componentes[n4];
                        else {
                            if (this.tipodatos[n4] == "int") {
                                estilo_de_componente = "'width:40px; padding:0; margin:0; text-align:right'";
                            }
                            else if (this.tipodatos[n4] == "float") {
                                estilo_de_componente = "'width:80px; padding:0; margin:0; text-align:right'";
                            }
                            else if (this.tipodatos[n4] == "string") {
                                estilo_de_componente = "'width:180px; padding:0; margin:0; text-align:left'";
                            }

                            else
                                estilo_de_componente = "'width:80px; padding:0; margin:0;'";
                        }

                        var eventos_componente = "";
                        if (this.tipodatos[n4] == "int") {
                            eventos_componente = " posDecimalo(this, 0) onkeypress='return letraPresionada(event, this)'";
                        }
                        else if (this.tipodatos[n4] == "float") {

                            eventos_componente = " posDecimalo(this, 0) onkeypress='return letraPresionada_punto(event, this)'";
                        }

                        //Coloca el eliminar, intenta hacer delete sino, update en activo=1, si no tiene campo activo deja asi debe retornar la misma consulta 

                        infor = "<input onkeyup=dejo_componente_din(this,'" + this.fuente[i1]["consecutivo"] + "','" + this.id + "'" + ",'" + this.datoscolumnas[n4] + "'" + ",'" + this.funcioncambiodin + "') onblur=dejo_componente_din(this,'" + this.fuente[i1]["consecutivo"] + "','" + this.id + "'" + ",'" + this.datoscolumnas[n4] + "'" + ",'" + this.funcioncambiodin + "') style=" + estilo_de_componente + " " + eventos_componente + " class='" + clase + "' id='" + this.datoscolumnas[n4] + "_" + i1 + "'   value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";

                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;
                    case "13":
                        //Lista;
                        //estilo_componentes
                        var estilo_de_componente = "";
                        if (this.estilo_componentes[n4] != "")
                            estilo_de_componente = this.estilo_componentes[n4];
                        else
                            estilo_de_componente = "'width:100px; padding:1; margin:0; text-align:right'";
                        //Coloca el eliminar, intenta hacer delete sino, update en activo=1, si no tiene campo activo deja asi debe retornar la misma consulta

                        infor = html_combo_din(this.listaproductos[n4], estilo_de_componente, this.datoscolumnas[n4], i1, this.fuente[i1]["consecutivo"], this.id, this.fuente[i1][this.datoscolumnas[n4]], this.funcioncambiodin);
                        //infor = "<input style=" + estilo_de_componente + "  posDecimalo(this, 0) onkeypress='return letraPresionada_punto(event, this)' class='gwautotext_i' id='" + this.datoscolumnas[n4] + "_" + i1 + "'   value='0' type='text' />";

                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;

                    case "14":
                        //Caja de fecha;
                        //estilo_componentes
                        var estilo_de_componente = "";
                        var clase = "gwautotext_i";
                        if (this.estilo_componentes[n4] != "")
                            estilo_de_componente = this.estilo_componentes[n4];
                        else {
                            estilo_de_componente = "'width:80px; padding:0; margin:0;'";
                        }

                        var eventos_componente = "";
                        eventos_componente = "";
                        infor = "<input onblur=dejo_componente_din(this,'" + this.fuente[i1]["consecutivo"] + "','" + this.id + "'" + ",'" + this.datoscolumnas[n4] + "'" + ",'" + this.funcioncambiodin + "')  style=" + estilo_de_componente + " " + eventos_componente + " class='" + clase + "' id='" + this.datoscolumnas[n4] + "_" + i1 + "'   value='" + this.fuente[i1][this.datoscolumnas[n4]] + "' type='text' />";
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";

                        break;

                    case "15":
                        infor = "<a id='a_eliminar_reg' href='#' title='Eliminar línea' onclick='elimina_linea(" + '"' + this.id + '"' + "," + '"' + this.fuente[i1]["consecutivo"] + '"' + ")'>" + "<img width='30px' src='../Images/eliminar.png' alt='' title='Eliminar Línea' />" + "</a>";
                        grilla = grilla + "<TD id=" + this.id + "_tr_" + i1 + "_td_" + n4 + " style=" + this.estilocolumna[n4] + " >" + infor + "</TD>";
                        break;
                }

            }
        }
        //grilla = grilla + "<TD style='width: 400px'><A class=lkb id=opcion_sega href=javascript:opcion1("+this.fuente[i1].Respuesta+")>" + this.fuente[i1].Respuesta + "</A> </TD>";
        grilla = grilla + "</TR>";


    }
    // grilla = grilla + "</TBODY>";
    i1 = i1 - 1;

    grilla = grilla + "</TABLE>";
    id2 = 'tam' + this.id;
    //grilla= grilla + "<div  id="+id2+" style='display:none'>"+ i1 +"</div>";
    var cadinserta_quemados = "";
    var cadinserta_quemados2 = "";

    for (k in this.inserta_quemados) {
        cadinserta_quemados = cadinserta_quemados + k + ",";
        cadinserta_quemados2 = "" + cadinserta_quemados2 + this.inserta_quemados[k] + ","
    }
    if (cadinserta_quemados.length > 0) {
        cadinserta_quemados = cadinserta_quemados.substr(0, cadinserta_quemados.length - 1);
        cadinserta_quemados2 = cadinserta_quemados2.substr(0, cadinserta_quemados2.length - 1);
    }


    var cad_tab_auxiliar="";
    var cada=0;
    while(cada<this.campos_tabla_auxiliar.length)
    {
        cad_tab_auxiliar=cad_tab_auxiliar+this.campos_tabla_auxiliar[cada]+",";
        cada++;
    }
    if(cad_tab_auxiliar!="")
    {
        cad_tab_auxiliar=cad_tab_auxiliar.substr(0, cad_tab_auxiliar.length - 1);
    }

    var cad_tab_auxiliar_dato = "";
    cada = 0;
    while (cada < this.campos_dato_tabla_auxiliar.length) {
        cad_tab_auxiliar_dato = cad_tab_auxiliar_dato + this.campos_dato_tabla_auxiliar[cada] + ",";
        cada++;
    }
    if (cad_tab_auxiliar_dato != "") {
        cad_tab_auxiliar_dato=cad_tab_auxiliar_dato.substr(0, cad_tab_auxiliar_dato.length - 1);
    }


    var html_iconos = "";
    //debugger;
    if (this.iconos_editar == true)
        html_iconos = "</br><a style='float:left; width:35px;' id='a_guardar_reg' href='#' onclick='guardar_cambios_registro(" + '"' + llave_tabla + '"' + ',"' + this.funcion_pinta + '"' + ',"' + this.fuente_tabla + '"' + ',"' + this.datoscolumnas.join() + '"' + ',"' + this.tipocolumna.join() + '"' + ',"' + cadinserta_quemados + '"' + ',"' + cadinserta_quemados2 + '"' + ',"' + this.funcion_carga_act + '"' + ',"' + cad_tab_auxiliar + '"' + ',"' + cad_tab_auxiliar_dato + '"' + ',"'+  this.fuente_tabla_aux  + '"'+ ")'><img height='30px' title='Guardar Cambios' src='../Images/save.ico' alt='' /></a><a style='float:left' id='a_nuevo_reg' href='#' onclick='nuevo_registro(" + '"' + llave_tabla + '"' + ',"' + this.funcion_pinta + '"' + ',"' + this.fuente_tabla + '"' + ',"' + this.funcion_pinta + '"' + ',"' + cadinserta_quemados + '"' + ',"' + cadinserta_quemados2 + '"' + ")'><img  title='Agregar Registro' height='30px' src='../Images/add_file.ico' alt='' /></a>";

    if (this.iconos_personalizado == true)
        html_iconos = this.htmlicono;



    if (this.htmladicional != "") {
        grilla = grilla + this.htmladicional;
    }

    if (this.div != "0")
        d(this.div).innerHTML = html_iconos + grilla;
    else
        this.copia = html_iconos + grilla;
    //componente_dba_obligaciones_ubicacion_4ea5a8bf-1e5f-427a-8f7b-05c9f3036f92

    var indiindex = 0;
    while (indiindex < this.tipocolumna.length) {

        if (this.tipocolumna[indiindex] == "7") {
            //componente_"+ "_" + this.datoscolumnas[n4] + "_" + i1 + "

            var longtabla = 0;
            while (longtabla < this.fuente.length) {
                var myCalendar = new dhtmlXCalendarObject(["componente_" + "_" + this.datoscolumnas[indiindex] + "_" + longtabla]);
                myCalendar.setDateFormat("%Y-%m-%d");
                myCalendar.hideTime();
                longtabla++;
                // this.fuente[i1][this.datoscolumnas[n4]]
                //   d("componente_"+ "_" + this.datoscolumnas[n4] + "_" + i1).value=
                //   alert(this.datoscolumnas[indiindex]);
            }
        }
        else if (this.tipocolumna[indiindex] == "14") {
            //componente_"+ "_" + this.datoscolumnas[n4] + "_" + i1 + "

            var longtabla = 0;
            while (longtabla < this.fuente.length) {
                var myCalendar = new dhtmlXCalendarObject([this.datoscolumnas[indiindex] + "_" + longtabla]);
                myCalendar.setDateFormat("%Y-%m-%d");
                myCalendar.hideTime();
                longtabla++;
                // this.fuente[i1][this.datoscolumnas[n4]]
                //   d("componente_"+ "_" + this.datoscolumnas[n4] + "_" + i1).value=
                //   alert(this.datoscolumnas[indiindex]);
            }
        }
        indiindex++;
    }

    indiindex = 0;
    while (indiindex < arrfechatipo10.length) {
        var myCalendar = new dhtmlXCalendarObject(arrfechatipo10[indiindex]);
        myCalendar.setDateFormat("%Y-%m-%d %H:%i");
        // myCalendar.hideTime();
        longtabla++;
        indiindex++;
    }


    if (this.funcionlineanueva != "")
        eval(this.funcionlineanueva + "('" + this.id + "')");

}
function isFloat(num) {
    return num % 1 != 0;
}
function elimina_linea(id, consecutivo) {

    var indtm = 0;
    var arrtmp = new Array();
    // debugger;
    while (indtm < gldatosglob[id].length) {

        if (gldatosglob[id][indtm]["consecutivo"] != consecutivo) {
            var objtmp = new Object();
            for (k in gldatosglob[id][indtm]) {
                objtmp[k] = gldatosglob[id][indtm][k];
            }
            arrtmp[arrtmp.length] = objtmp;
        }

        indtm++;
    }
    gldatosglob[id] = arrtmp;
    glgrillaglobal[id].bind();
}

var glultima_cantidad_auto = 0;
function dejo_componente_din(objeto, consecutivo, id, datocolumna, funcioncambia) {
    var n = 0;
    while (n < gldatosglob[id].length) {
        if (gldatosglob[id][n]["consecutivo"] == String(consecutivo)) {
            gldatosglob[id][n][datocolumna] = objeto.value;
            break;
        }
        n++;
    }

    eval(funcioncambia + "('" + id + "','" + datocolumna + "','" + consecutivo + "')");
}
function dejo_componente_din_cmb(objeto, consecutivo, id, datocolumna, funcioncambia) {
    var n = 0;
    while (n < gldatosglob[id].length) {
        if (gldatosglob[id][n]["consecutivo"] == String(consecutivo)) {
            gldatosglob[id][n][datocolumna] = objeto.options[objeto.selectedIndex].value;
            break;
        }
        n++;
    }
    eval(funcioncambia + "('" + id + "','" + datocolumna + "','" + consecutivo + "')");
}



function elimina_registro(tabla, columna_llave, dato_llave_eliminar, fun_pinta) {


    //alert(tabla);
    //alert(columna_llave);
    //alert(dato_llave_eliminar);
    //alert(fun_pinta);

    var arrdatostmp = new Array();
    var n = 0;
    while (n < glarrdatotmp[tabla + "_edita"]["Table"].length) {
        if (glarrdatotmp[tabla + "_edita"]["Table"][n][columna_llave] != dato_llave_eliminar) {
            var objdatostmp = new Object();
            for (k in glarrdatotmp[tabla + "_edita"]["Table"][n]) {
                objdatostmp[k] = glarrdatotmp[tabla + "_edita"]["Table"][n][k];
            }
            arrdatostmp[arrdatostmp.length] = objdatostmp;
        }
        n++;
    }
    var arrdatostmpborra = new Array();
    glarrdatotmp[tabla + "_edita"]["Table"] = arrdatostmpborra;

    var arrdatostmpdatosn = new Array();
    n = 0;
    while (n < arrdatostmp.length) {

        var objdatostmp = new Object();
        for (k in arrdatostmp[n]) {
            objdatostmp[k] = arrdatostmp[n][k];
        }
        arrdatostmpdatosn[arrdatostmpdatosn.length] = objdatostmp;

        n++;
    }
    glarrdatotmp[tabla + "_edita"]["Table"] = arrdatostmpdatosn;

    var ejecuta_nuevo = fun_pinta + "(glarrdatos_config['" + tabla + "'])";
    eval(ejecuta_nuevo);

    return false;
}
function nuevo_registro(llave_tabla, fun_pinta, tabla) {

    // debugger;
    var n = 0;
    var objnuevafila = new Object();

    if (glarrdatotmp[tabla + "_edita"]["Table"] > 0) {
        for (k in glarrdatotmp[tabla + "_edita"]["Table"][glarrdatotmp[tabla + "_edita"]["Table"].length - 1]) {
            if (llave_tabla == k) {
                glconsecutivo_tabla = glconsecutivo_tabla + 1;
                objnuevafila[k] = "00_" + glconsecutivo_tabla;
            }
            else
                objnuevafila[k] = "";
        }

    }
    else {
        n = 0;
        while (n < glarrdatos_config[tabla][tabla + "_1"].length) {
            if (llave_tabla == glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"]) {
                glconsecutivo_tabla = glconsecutivo_tabla + 1;
                objnuevafila[glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"]] = "00_" + glconsecutivo_tabla;
            }
            else
                objnuevafila[glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"]] = "";

            n++;
        }

    }
    //glinserta_quemados
    for (k in glinserta_quemados_buff) {
        objnuevafila[k] = glinserta_quemados_buff[k];
    }
    //debugger;
    glarrdatotmp[tabla + "_edita"]["Table"][glarrdatotmp[tabla + "_edita"]["Table"].length] = objnuevafila;

    var ejecuta_nuevo = fun_pinta + "(glarrdatos_config['" + tabla + "'])";
    eval(ejecuta_nuevo);
    // pinta_tabla_obl_post(glarrdatos_config[tabla]);
    //   alert("NUevo " + fun_pinta);
}
function letraPresionada(e, obj, decimal) {
    //alert("123");
    keynum = (window.event) ? e.keyCode : e.which;
    if (keynum == 0 || keynum == 8 || (keynum >= 48 && keynum <= 57)) {
        var posPunto = obj.value.indexOf('.');
        if (keynum == 46 && posPunto > -1)
            return false;
        else { //Verificando cantidad de digitos decimales
            var tam = obj.value.length;
        }
    } else
        return false;
}
function letraPresionada_punto(e, obj, decimal) {
    //alert("123");
    keynum = (window.event) ? e.keyCode : e.which;
    if (keynum == 0 || keynum == 8 || keynum == 46 || (keynum >= 48 && keynum <= 57)) {
        var posPunto = obj.value.indexOf('.');
        if (keynum == 46 && posPunto > -1)
            return false;
        else { //Verificando cantidad de digitos decimales
            var tam = obj.value.length;
        }
    } else
        return false;
}

var glfuncion_cambio = "";
function letraPresionada(e, obj, decimal) {
    //alert("123");
    keynum = (window.event) ? e.keyCode : e.which;
    if (keynum == 0 || keynum == 8 || (keynum >= 48 && keynum <= 57)) {
        var posPunto = obj.value.indexOf('.');
        if (keynum == 46 && posPunto > -1)
            return false;
        else { //Verificando cantidad de digitos decimales
            var tam = obj.value.length;
        }
    } else
        return false;
}
function posDecimalo(obj, maximo) {
    maximo += 1;
    var posPunto = obj.value.indexOf('.');
    var tam = obj.value.length;
    if (tam - posPunto <= maximo) {
    } else if (posPunto > -1) {
        obj.value = obj.value.substr(0, posPunto + maximo);
    }
}
function posDecimal(obj, maximo, dato_llave) {


    // alert("1234");
    maximo += 1;
    var posPunto = obj.value.indexOf('.');
    var tam = obj.value.length;
    if (tam - posPunto <= maximo) {
    } else if (posPunto > -1) {
        obj.value = obj.value.substr(0, posPunto + maximo);
    }

    if (glfuncion_cambio != "") {
        eval(glfuncion_cambio + "('" + dato_llave + "')");
    }

}
function maxcantidad(obj, maximo) {
    // alert("1234");

    if (obj.value.length > maximo)
        obj.value = obj.value.substr(0, maximo);

}
function copia_arreglo_objeto(arreglocopiar,indice_inicial) {

    var objpad = new Object();
    var nc = indice_inicial;
    var arrhijo = new Array();
    while (nc < arreglocopiar.length) {

        var objhijo = new Object();
        for (k2 in arreglocopiar[nc]) {
            objhijo[k2] = arreglocopiar[nc][k2];
        }
        arrhijo[arrhijo.length] = objhijo;
        nc++;
    }
    
    return arrhijo;

}
function copia_objeto_basico(objetoacopiar) {
    var objpad = new Object();

    for (k1 in objetoacopiar) {
        objpad[k1] = objetoacopiar[k1];
    }
    return objpad;
}
function copia_objeto(objetoacopiar) {


    var objpad = new Object();

    for (k1 in objetoacopiar) {

        var nc = 0;
        var arrhijo = new Array();
        while (nc < objetoacopiar[k1].length) {

            var objhijo = new Object();
            for (k2 in objetoacopiar[k1][nc]) {
                objhijo[k2] = objetoacopiar[k1][nc][k2];
            }
            arrhijo[nc] = objhijo;
            nc++;
        }

        objpad[k1] = arrhijo;

    }
    return objpad;

}
function guardar_cambios_registro(llave_tabla, fun_pinta, tabla, datos_columna, tipo_columna, inserta_quemados, inserta_quemados2, fun_carga_act,
    cadena_auxiliar, cadena_auxiliar_dato,tabla_aux) {

    //debugger;
    var arrcampos_auxiliares= new Array();
    if(cadena_auxiliar!="")
        arrcampos_auxiliares=cadena_auxiliar.split(",");

    var arrcampos_auxiliares_dato= new Array();
    if(cadena_auxiliar_dato!="")
        arrcampos_auxiliares_dato=cadena_auxiliar_dato.split(",");

    glfunactg = fun_carga_act;
    pinta_validar_borra(tabla, llave_tabla);
    // debugger;
    var arrelmentos_validos = new Array();
    var arrinserta_quemados2 = inserta_quemados2.split(",");
    var iq = 0;
    while (iq < arrinserta_quemados2.length) {
        arrinserta_quemados2[iq] = "'" + arrinserta_quemados2[iq] + "'";
        iq++;
    }
    var inserta_quemados2_p = arrinserta_quemados2.join(",");

    var arrpreennv = new Array();

    var objtablad = new Object();
    objtablad["tabla"] = tabla;
    objtablad["llave"] = llave_tabla;
    objtablad["tabla_aux"] = tabla_aux;
    

    var arrenvio_borra = new Array();
    var arrenvio_inserta = new Array();
    var arrenvio = new Array();


    if (glarrdatotmp[tabla + "_edita"]["Table"].length > 0) {
        var arrdatos_columna = datos_columna.split(",");
        var arrtipo_columna = tipo_columna.split(",");

        var arrdatos_auto = new Array();
        var n = 0;
        for (k in glarrdatotmp[tabla + "_edita"]["Table"][0]) {

            if (arrtipo_columna[n] == "10") {
                if (arrdatos_columna[n] != undefined)
                    arrdatos_auto[arrdatos_auto.length] = arrdatos_columna[n];
            }

            n++;
        }




        //Revisa las actuales
        var conact = 0;
        while (conact < glarrdatotmp[tabla + "_edita"]["Table"].length) {

            arregla_float(tabla);

            var arrinser = new Array();
            var arrinser2 = new Array();

            var arrinser_aux = new Array();
            var arrinser2_aux = new Array();

            var tipo = 0;

            var dato_llave = "";
            dato_llave = glarrdatotmp[tabla + "_edita"]["Table"][conact][llave_tabla];

            var dtv = new vista(glarrdatotmp[tabla]["Table"], "['" + llave_tabla + "']=='" + dato_llave + "'", '', '');
            if (dtv.length == 0)
                tipo = 1;//Inserta
            else {
                var rev = 0;
                var bactual = false;
                for (k in glarrdatotmp[tabla + "_edita"]["Table"][conact]) {
                    if (glarrdatotmp[tabla + "_edita"]["Table"][conact][k] != dtv[0][k])
                        bactual = true;
                }
                if (bactual == true)
                    tipo = 2;//Actualiza
                else
                    tipo = 0;//Nada
            }
          
            if (tipo != 0) {
                var objenvio = new Object();
                n = 0;

            

                while (n < arrdatos_auto.length)
                {
                    objenvio[arrdatos_auto[n]] = glarrdatotmp[tabla + "_edita"]["Table"][conact][arrdatos_auto[n]];

                    if (tipo == 2) {
                        if (glarrdatotmp[tabla + "_edita"]["Table"][conact][arrdatos_auto[n]] == "") {
                            var es_req;
                            es_req = dato_es_requerido(tabla, arrdatos_auto[n]);

                            if (es_req == true) {
                                var objrequerido = new Object();
                                objrequerido["tabla"] = tabla;
                                objrequerido["nombre_columna"] = arrdatos_auto[n];
                                objrequerido["dato_llave"] = glarrdatotmp[tabla + "_edita"]["Table"][conact][llave_tabla];
                                arrelmentos_validos[arrelmentos_validos.length] = objrequerido;
                            }

                        }
                        arrinser[arrinser.length] = "" + arrdatos_auto[n] + "='" + glarrdatotmp[tabla + "_edita"]["Table"][conact][arrdatos_auto[n]] + "'";
                    }
                    else if (tipo == 1) {

                        if (glarrdatotmp[tabla + "_edita"]["Table"][conact][arrdatos_auto[n]] == "") {
                            var es_req;
                            es_req = dato_es_requerido(tabla, arrdatos_auto[n]);

                            if (es_req == true) {
                                var objrequerido = new Object();
                                objrequerido["tabla"] = tabla;
                                objrequerido["nombre_columna"] = arrdatos_auto[n];
                                objrequerido["dato_llave"] = glarrdatotmp[tabla + "_edita"]["Table"][conact][llave_tabla];
                                arrelmentos_validos[arrelmentos_validos.length] = objrequerido;
                            }

                        }

                //        debugger;
                        if (arrdatos_auto[n] != "") {
                            arrinser[arrinser.length] = "" + arrdatos_auto[n] + "";
                            arrinser2[arrinser2.length] = "'" + glarrdatotmp[tabla + "_edita"]["Table"][conact][arrdatos_auto[n]] + "'";

                        }
                    }
                    n++;
                }


                objenvio[llave_tabla] = glarrdatotmp[tabla + "_edita"]["Table"][conact][llave_tabla];
                if (tipo == 2) {
                    objenvio["cadena_envio"] = arrinser.join();
                    objenvio["cadena_envio2"] = "";
                    arrenvio[arrenvio.length] = objenvio;
                }
                else if (tipo == 1) {

                    if (inserta_quemados != "") {
                        objenvio["cadena_envio"] = arrinser.join() + "," + inserta_quemados;
                        objenvio["cadena_envio2"] = arrinser2.join() + "," + inserta_quemados2_p;
                    }
                    else
                    {
                        objenvio["cadena_envio"] = arrinser.join();
                        objenvio["cadena_envio2"] = arrinser2.join();
                    }

                    var arrinsq1 = new Array();
                    arrinsq1 = inserta_quemados.split(",");

                    var arrinsq2 = new Array();
                    arrinsq2 = inserta_quemados2_p.split(",");

                    var cadena_envio3 = "";
                    var cadena_envio4 = "";
                    var adto = 0;
                    while (adto < arrcampos_auxiliares.length)
                    {
                        cadena_envio3=cadena_envio3 + arrcampos_auxiliares[adto] + ",";
                        var dato_aux = "";
                        var ind_bsq = arrdatos_auto.indexOf(arrcampos_auxiliares[adto]);
                        if (ind_bsq != -1) {
                            dato_aux = glarrdatotmp[tabla + "_edita"]["Table"][conact][arrcampos_auxiliares[adto]];
                        }
                        else {
                            ind_bsq = arrinsq1.indexOf(arrcampos_auxiliares[adto]);
                            if (ind_bsq != -1) {
                                dato_aux = arrinsq2[ind_bsq];
                            }
                            else
                            {
                                dato_aux = arrcampos_auxiliares_dato[adto];
                                if (dato_aux == "llave_tabla_principal")
                                    dato_aux = "scope_identity()";
                            }
                        }
                           
                        if (dato_aux != "") {
                             cadena_envio4 = cadena_envio4 + dato_aux + ",";
                        }
                        adto++;
                    }

                    if (cadena_envio3 != "")
                        cadena_envio3 = cadena_envio3.substr(0, cadena_envio3.length - 1);

                    if (cadena_envio4 != "")
                        cadena_envio4 = cadena_envio4.substr(0, cadena_envio4.length - 1);

     

                    arrenvio_inserta[arrenvio_inserta.length] = objenvio;
                    objenvio["cadena_envio3"] = cadena_envio3;
                    objenvio["cadena_envio4"] = cadena_envio4;


                }



            }
            conact++;
        }


        //Revisa las que no estan 
        conact = 0;
        while (conact < glarrdatotmp[tabla]["Table"].length) {

            var dato_llave = "";
            dato_llave = glarrdatotmp[tabla]["Table"][conact][llave_tabla];
            var dtv2 = new vista(glarrdatotmp[tabla + "_edita"]["Table"], "['" + llave_tabla + "']=='" + dato_llave + "'", '', '');
            if (dtv2.length == 0) {
                // Se borro
                var objenvio = new Object();
                objenvio[llave_tabla] = dato_llave;

                arrenvio_borra[arrenvio_borra.length] = objenvio;
            }
            conact++;
        }


    }
    
    //Revisa las que no estan 
    var conact = 0;
    while (conact < glarrdatotmp[tabla]["Table"].length) {

        var dato_llave = "";
        dato_llave = glarrdatotmp[tabla]["Table"][conact][llave_tabla];
        var dtv2 = new vista(glarrdatotmp[tabla + "_edita"]["Table"], "['" + llave_tabla + "']=='" + dato_llave + "'", '', '');
        if (dtv2.length == 0) {
            // Se borro
            var objenvio = new Object();
            objenvio[llave_tabla] = dato_llave;
            arrenvio_borra[arrenvio_borra.length] = objenvio;
        }



        conact++;
    }
    var arrdatos_columna = datos_columna.split(",");
    var arrtipo_columna = tipo_columna.split(",");

    var arrdatos_auto = new Array();
    var n = 0;
    for (k in glarrdatotmp[tabla]["Table"][0]) {

        if (arrtipo_columna[n] == "10") {
            if (arrdatos_columna[n] != undefined)
                arrdatos_auto[arrdatos_auto.length] = arrdatos_columna[n];
        }

        n++;
    }
    var arrinsq1 = new Array();
    arrinsq1 = inserta_quemados.split(",");

    var arrinsq2 = new Array();
    arrinsq2 = inserta_quemados2_p.split(",");

    var arrborrados_nuevo = new Array();
    if (arrcampos_auxiliares.length > 0) {
        var revisa_borrados = 0;
        while (revisa_borrados < arrenvio_borra.length) {
            var cadena_envio5 = "";
            var rev = 0;
            var adto = 0;
            while (adto < arrcampos_auxiliares.length) {
                var dtv2 = new vista(glarrdatotmp[tabla]["Table"], "['" + llave_tabla + "']=='" + arrenvio_borra[revisa_borrados][llave_tabla] + "'", '', '');

                var dato_aux = "";

                if (arrcampos_auxiliares[adto] == llave_tabla) {
                    dato_aux = dtv2[0][llave_tabla];
                }
                else {
                    var ind_bsq = arrdatos_auto.indexOf(arrcampos_auxiliares[adto]);
                    if (ind_bsq != -1) {
                        dato_aux = dtv2[0][arrcampos_auxiliares[adto]];
                    }
                    else {
                        ind_bsq = arrinsq1.indexOf(arrcampos_auxiliares[adto]);
                        if (ind_bsq != -1) {
                            dato_aux = arrinsq2[ind_bsq];
                        }
                        else {
                            dato_aux = arrcampos_auxiliares_dato[adto];
                        }
                    }
                }
                if (dato_aux != "")
                    cadena_envio5 = cadena_envio5 + arrcampos_auxiliares[adto] + "='" + dato_aux + "' AND ";

                adto++;
            }
            if (cadena_envio5 != "")
                cadena_envio5 = cadena_envio5.substr(0, cadena_envio5.length - 5);

            var objenvio = new Object();
            objenvio[llave_tabla] = arrenvio_borra[revisa_borrados][llave_tabla];
            objenvio["cadena_envio5"] = cadena_envio5;
            arrborrados_nuevo[arrborrados_nuevo.length] = objenvio;

            revisa_borrados++;
        }
    }
    else
        arrborrados_nuevo = arrenvio_borra;

    var arrtotal = new Object();

    arrpreennv[0] = objtablad;

    arrtotal[0] = arrpreennv;
    arrtotal[1] = arrenvio;
    arrtotal[2] = arrenvio_inserta;
    arrtotal[3] = arrborrados_nuevo;

    if (arrelmentos_validos.length == 0)
        call_sgu(guardo_tabla_act, arrtotal, "act_guarda_tabla", "form");
    else {
        pinta_validar_auto(tabla, arrelmentos_validos);
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No puede guardar, debe llenar todos los campos requeridos" });

    }
}

function arregla_float(tabla) {
    var con = 0;
    while (con < glarrdatotmp[tabla + "_edita"]["Table"].length) {
        for (k in glarrdatotmp[tabla + "_edita"]["Table"][con]) {
            var ncol = false;
            ncol = dato_es_float(tabla, k);

            var valor_fl = "";
            if (ncol == true) {
                valor_fl = replaceAll(glarrdatotmp[tabla + "_edita"]["Table"][con][k], ",", ".");
                glarrdatotmp[tabla + "_edita"]["Table"][con][k] = valor_fl;
            }

        }


        con++;
    }


}


function pinta_validar_auto(tabla, arrelmentos_validos) {

    var n = 0;
    while (n < arrelmentos_validos.length) {



        //            d("componente_dba_obligaciones_serial_tipo_obligacion_00_1").setAttribute("class", "gwautoselect_valida");
        var nombre_columna = arrelmentos_validos[n]["nombre_columna"];
        var es_comb = dato_es_combo(tabla, nombre_columna);

        //  alert(nombre_columna);
        // &&(glautocompletar.indexOf(arrelmentos_validos[n]["nombre_columna"])==-1)
        if ((es_comb == true))
            d("componente_" + arrelmentos_validos[n]["tabla"] + "_" + arrelmentos_validos[n]["nombre_columna"] + "_" + arrelmentos_validos[n]["dato_llave"]).setAttribute("class", "gwautoselect_valida");
        else
            d("componente_" + arrelmentos_validos[n]["tabla"] + "_" + arrelmentos_validos[n]["nombre_columna"] + "_" + arrelmentos_validos[n]["dato_llave"]).setAttribute("class", "gwautotext_valida");


        if (glautocompletar.indexOf(arrelmentos_validos[n]["nombre_columna"]) != -1) {
            d("componente_" + arrelmentos_validos[n]["tabla"] + "_" + arrelmentos_validos[n]["nombre_columna"] + "_" + arrelmentos_validos[n]["dato_llave"]).style.borderColor = "red"
        }
        //else
        //    d("componente_" + arrelmentos_validos[n]["tabla"] + "_" + arrelmentos_validos[n]["nombre_columna"] + "_" + arrelmentos_validos[n]["dato_llave"]).style.borderColor = "none"
        n++;
    }
    //  d("componente_dba_obligaciones_serial_tipo_obligacion_00_1").setAttribute("class", "gwautotext_valida");
    //   d("componente_dba_obligaciones_serial_tipo_documento_ae35eecb-bc20-4a80-811c-fdfb2151f6c9").style.borderColor="none"

}
function pinta_validar_borra(tabla, llave_tabla) {
    //d("componente_dba_obligaciones_serial_tipo_obligacion_00_1").style.borderColor = "rgb(204, 204, 204)";

    var n = 0;
    while (n < glarrdatotmp[tabla + "_edita"]["Table"].length) {

        var dato_llave = glarrdatotmp[tabla + "_edita"]["Table"][n][llave_tabla];

        for (k in glarrdatotmp[tabla + "_edita"]["Table"][n]) {
            var nombre_columna = k;
            var es_comb = dato_es_combo(tabla, nombre_columna);

            if (d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave) != undefined) {

                if (es_comb == true) {
                    if (glautocompletar.indexOf(nombre_columna) != -1)
                        d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).style.borderColor = "rgb(204, 204, 204)";
                    d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).setAttribute("class", "gwautoselect");
                }
                else {
                    var es_ta = dato_es_textarea(tabla, nombre_columna);
                    if (es_ta == true)
                        d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).setAttribute("class", "gwautotextarea");
                    else {
                        var es_ch = dato_es_check(tabla, nombre_columna);
                        if (es_ch == true)
                            d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).setAttribute("class", "");
                        else
                            d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).setAttribute("class", "gwautotext");
                    }
                }
            }
        }
        n++;
    }

}
function dato_es_combo(tabla, nombre_columna) {
    var es_combo = false;
    //constraint_type
    //constraint_keys 
    var n = 0;
    while (n < glarrdatos_config[tabla][tabla + "_6"].length) {
        if ((glarrdatos_config[tabla][tabla + "_6"][n]["constraint_type"] == "FOREIGN KEY") && (glarrdatos_config[tabla][tabla + "_6"][n]["constraint_keys"] == nombre_columna))
            es_combo = true;
        n++;
    }

    return es_combo;
}

function dato_es_textarea(tabla, nombre_columna) {
    var es_textarea = false;
    //constraint_type 

    //constraint_keys
    var n = 0;
    while (n < glarrdatos_config[tabla][tabla + "_1"].length) {

        if (glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"] == nombre_columna) {
            var lngcampo = 0;
            lngcampo = parseInt(glarrdatos_config[tabla][tabla + "_1"][n]["Length"], 10);
            if (lngcampo > 500)
                es_textarea = true;
        }
        n++;
    }
    return es_textarea;
}


function dato_es_check(tabla, nombre_columna) {


    var es_ch = false;

    var n = 0;
    while (n < glarrdatos_config[tabla][tabla + "_1"].length) {

        if (glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"] == nombre_columna) {
            var tipo = "";

            tipo = glarrdatos_config[tabla][tabla + "_1"][n]["Type"];

            if (tipo == "tinyint")
                es_ch = true;
        }
        n++;
    }


    return es_ch;
}
function dato_es_float(tabla, nombre_columna) {


    var es_fl = false;

    var n = 0;
    while (n < glarrdatos_config[tabla][tabla + "_1"].length) {

        if (glarrdatos_config[tabla][tabla + "_1"][n]["Column_name"] == nombre_columna) {
            var tipo = "";

            tipo = glarrdatos_config[tabla][tabla + "_1"][n]["Type"];

            if (tipo == "float")
                es_fl = true;
        }
        n++;
    }


    return es_fl;
}

function dato_es_requerido(tabla, nombre_columna) {


    var requerido = false;
    //constraint_type

    //constraint_keys
    requerido = dato_es_combo(tabla, nombre_columna);

    return requerido;
}
 
function guardo_tabla_act(respuesta) {

    if (respuesta["respuesta"][0]["error"] == "0")
    {
        dhtmlx.alert({
            title: "",
            type: "alert",
            text: "Se Guardaron correctamente los cambios",
            callback: termino_act_guardar
        });
    }
    else {
        dhtmlx.alert({
            title: "",
            type: "alert-error",
            text: "Se Genero un Error"
        });
    }
}

function termino_act_guardar() {
    glcargando_actualizada = "1";
    if (glfunactg != "") {
        eval(glfunactg + "()");
    }
}
var glcargando_actualizada = "";
var gldatosarreglados = new Object
var gldatoscombo = new Object();
function html_combo(datos, i1, tabla, dato_col, referencia, valor_combo, dato_llave, llave_tabla, estilo_de_componente) {

    //REFERENCES SGUPMI.dbo.dba_tipo_documento (serial_tipo_documento)
    // glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"][iauto]["constraint_type"]


    referencia = String(referencia);
    var pos1 = referencia.indexOf("(");

    var pos2 = 0;
    var parref = referencia.substr(0, pos1);
    var tabla_bus = parref.substr(pos1 - 1, 1);
    var m1 = 2;
    while ((m1 < parref.length) && (tabla_bus.indexOf(".") == -1)) {
        tabla_bus = parref.substr(pos1 - m1, m1);

        m1++;
    }
    tabla_bus = tabla_bus.substr(1);
    tabla_bus = trim(tabla_bus);
    tabla_bus = String(tabla_bus).toLocaleLowerCase();
    var datos_combo = datos[tabla_bus];


    var combo1 = "<SELECT style='" + estilo_de_componente + "' onblur=dejo_componente(this,'" + dato_llave + "','" + tabla + "','" + dato_col + "','" + llave_tabla + "')";
    combo1 = combo1 + " class='gwautoselect'";
    combo1 = combo1 + " id='componente_" + tabla + "_" + dato_col + "_" + dato_llave + "'>";

    if (valor_combo == "") {
        combo1 = combo1 + "<OPTION  selected value=''  >..Seleccione..</OPTION>";
    }

    var ind_com = 0;
    while (ind_com < datos_combo.length) {
        var cseleccionado = "";
        if (valor_combo == datos_combo[ind_com]["value"])
            cseleccionado = "selected";

        combo1 = combo1 + "<OPTION value='" + datos_combo[ind_com]["value"] + "' " + cseleccionado + " >" + datos_combo[ind_com]["text"] + "</OPTION>";

        ind_com++;
    }

    combo1 = combo1 + '</SELECT>'

    return combo1;
}

function html_autocompletar(datos, i1, tabla, dato_col, referencia, valor_combo, dato_llave, llave_tabla, estilo_de_componente, estilo_autocompletar, ancho_autocompletar) {

    //REFERENCES SGUPMI.dbo.dba_tipo_documento (serial_tipo_documento)
    // glarrdatos_config[this.fuente_tabla][this.fuente_tabla + "_6"][iauto]["constraint_type"]

    referencia = String(referencia);

    var pos1 = referencia.indexOf("(");

    var pos2 = 0;
    var parref = referencia.substr(0, pos1);
    var tabla_bus = parref.substr(pos1 - 1, 1);
    var m1 = 2;
    while ((m1 < parref.length) && (tabla_bus.indexOf(".") == -1)) {
        tabla_bus = parref.substr(pos1 - m1, m1);

        m1++;
    }
    tabla_bus = tabla_bus.substr(1);
    tabla_bus = trim(tabla_bus);
    tabla_bus = String(tabla_bus).toLocaleLowerCase();
    var datos_combo = datos[tabla_bus];
    // alert(dato_col);
    var valor_comb = "";
    var dtv = new vista(datos_combo, "['value']=='" + valor_combo + "'", '', '');
    if (dtv.length > 0)
        valor_comb = dtv[0]["text"];


    if (estilo_de_componente == "")
        estilo_de_componente = "width: 168px";

    if (ancho_autocompletar == "")
        ancho_autocompletar = "180px";

    var id_texto = "componente_" + tabla + "_" + dato_col + "_" + dato_llave;

    glconfiguracion_general_auto[id_texto] = {};
    glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"] = 0;
    glconfiguracion_general_auto[id_texto]["gloriginal_escribio"] = "";
    glconfiguracion_general_auto[id_texto]["glid_control_auto"] = id_texto;
    glconfiguracion_general_auto[id_texto]["glarrecontrados"] = [];
    glconfiguracion_general_auto[id_texto]["tabla"] = tabla;
    glconfiguracion_general_auto[id_texto]["dato_col"] = dato_col;
    glconfiguracion_general_auto[id_texto]["dato_llave"] = dato_llave;
    glconfiguracion_general_auto[id_texto]["llave_tabla"] = llave_tabla;



    glconfiguracion_general_auto[id_texto]["div_auto"] = "divauto_" + tabla + "_" + dato_col + "_" + dato_llave;
    
    d("cuerpo").onkeypress = function (evt) {
        if (evt == undefined) {
            var evt = window.event;
            //var objtmp3 = new Object();
            //objtmp3["objeto"] = d(glid_control_auto);
            //objtmp3["maximos_resultados"] = d(glid_control_auto).maximos_resultados;
            //evt["target"] = objtmp3;

        }
        if (evt.keyCode == 13) {
            if (glconfiguracion_general_auto[vglid_texto]["glposicion"] >= 0) {

             

                selecciono_auto2(glconfiguracion_general_auto[vglid_texto]["glarrecontrados"]
                    [glconfiguracion_general_auto[vglid_texto]["glposicion"]]["value"],
                    "divauto_" + glconfiguracion_general_auto[vglid_texto]["tabla"] +
                    "_" + glconfiguracion_general_auto[vglid_texto]["dato_col"] + "_" +
                    glconfiguracion_general_auto[vglid_texto]["dato_llave"],
                    "funcion_clic_auto_grilla",
                    glconfiguracion_general_auto[vglid_texto]["dato_col"]
                    , glconfiguracion_general_auto[vglid_texto]["tabla"],
                   glconfiguracion_general_auto[vglid_texto]["dato_llave"],
                    glconfiguracion_general_auto[vglid_texto]["llave_tabla"]);
              

               // d(glconfiguracion_general_auto[id_texto]["div"]).style.display = "none";
            }
            return false;
        }

    }

    var combo1 = "<div  class='txtautocompletar2'><input style='" + estilo_de_componente + "' value='" + valor_comb + "' onkeyup=consulta_autocom(this,'" + dato_llave + "','" + tabla + "','" + dato_col + "','" + llave_tabla + "','" + ancho_autocompletar + "')";
    combo1 = combo1 + " id='componente_" + tabla + "_" + dato_col + "_" + dato_llave + "' autocomplete='off' type='text'/>";
    combo1 = combo1 + " <div  id='divauto_" + tabla + "_" + dato_col + "_" + dato_llave + "' class='divauto2'></div></div>";

    gldatoscombo[dato_col] = datos_combo;
    if (gldatosarreglados[dato_col] == undefined)
        gldatosarreglados[dato_col] = arregla_datos(datos_combo, ["text"], "value");

    //   var combo1 = "<SELECT onblur=dejo_componente(this,'" + dato_llave + "','" + tabla + "','" + dato_col + "','" + llave_tabla + "')";
    //   combo1 = combo1 + " class='gwautoselect'";
    //   combo1 = combo1 + " id='componente_" + tabla + "_" + dato_col + "_" + dato_llave + "'>";

    //if (valor_combo == "") {
    //    combo1 = combo1 + "<OPTION  selected value=''  >..Seleccione..</OPTION>";
    //}

    //var ind_com = 0;
    //while (ind_com < datos_combo.length) {
    //    var cseleccionado = "";
    //    if (valor_combo == datos_combo[ind_com]["value"])
    //        cseleccionado = "selected";

    //    combo1 = combo1 + "<OPTION value='" + datos_combo[ind_com]["value"] + "' " + cseleccionado + " >" + datos_combo[ind_com]["text"] + "</OPTION>";

    //    ind_com++;
    //}

    //combo1 = combo1 + '</SELECT>'

    return combo1;
}
var glid_texto = "";

function html_combo_din(lista, estilo, dato, fila, consecutivo, id, valor, funcioncambia) {

    var combo1 = "<SELECT onchange=dejo_componente_din_cmb(this,'" + consecutivo + "','" + id + "'" + ",'" + dato + "'" + ",'" + funcioncambia + "') ";
    combo1 = combo1 + " class='gwautoselect_din' style=" + estilo + "";
    combo1 = combo1 + " id='componente_" + dato + "_" + fila + "'>";

    //combo1 = combo1 + "<OPTION  selected value=''  >..Seleccione..</OPTION>";


    var ind_com = 0;
    while (ind_com < lista.length) {
        var cseleccionado = "";
        if (lista[ind_com]["id"] == valor)
            cseleccionado = "selected";

        combo1 = combo1 + "<OPTION " + cseleccionado + " value='" + lista[ind_com]["id"] + "'  >" + lista[ind_com]["texto"] + "</OPTION>";

        ind_com++;
    }

    combo1 = combo1 + '</SELECT>'

    return combo1;
}
function dejo_componente(elemento, dato_llave, tabla, nombre_columna, nombre_columna_llave) {

    var n = 0;
    while (n < glarrdatotmp[tabla + "_edita"]["Table"].length) {
        if (glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna_llave] == dato_llave) {
            var chq = false;
            chq = dato_es_check(tabla, nombre_columna)




            if (chq == true) {
                if (elemento.checked == true) {
                    glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = "1";
                }
                else
                    glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = "0";
            }
            else {

                var isfl = false;
                isfl = dato_es_float(tabla, nombre_columna)
                if (isfl == true) {
                    var dato_ins = "";
                    dato_ins = replaceAll(elemento.value, ",", ".");
                    glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = dato_ins;
                }
                else
                    glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = elemento.value;

            }
        }
        n++;
    }


}
function consulta_autocom(elemento, dato_llave, tabla, nombre_columna, nombre_columna_llave, ancho_autocompletar) {

    
    vglid_texto = "componente_" + tabla + "_" + nombre_columna + "_" + dato_llave;

    var evt = window.event;
   // alert(evt.keyCode);
    var id_texto=evt.srcElement.id;

    glconfiguracion_general_auto[evt.srcElement.id]["selecciona_teclado"] = ["text"];
    if ((evt.keyCode != 38) && (evt.keyCode != 40) && (evt.keyCode != 13)) {
        var arrdatos_encontrados;
        if (elemento.value != "") {
            arrdatos_encontrados = fauto_completar2(gldatoscombo[nombre_columna], gldatosarreglados[nombre_columna], elemento.value, 5,
                "divauto_" + tabla + "_" + nombre_columna + "_" + dato_llave, nombre_columna, "value", true, tabla, "text", "",
                "funcion_clic_auto_grilla", nombre_columna, dato_llave, nombre_columna_llave, ancho_autocompletar, id_texto);
            glconfiguracion_general_auto[id_texto]["gloriginal_escribio"] = elemento.value;
            glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"] = arrdatos_encontrados.length;
            glconfiguracion_general_auto[id_texto]["glarrecontrados"] = arrdatos_encontrados;
            glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
        }
        else {
            var n = 0;
            while (n < glarrdatotmp[tabla + "_edita"]["Table"].length) {
                if (glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna_llave] == dato_llave) {
                    glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = "";
                }
                n++;
            }
        }
    }
    else
    {
        busca_auto_grilla(evt.keyCode, id_texto)
    }
    borra_auto_pre(id_texto);

}

function busca_auto_grilla(codigo,id_texto)
{

    if (codigo == 40) {
        //Abajo
        if (glconfiguracion_general_auto[id_texto]["glposicion"] < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
            glconfiguracion_general_auto[id_texto]["glposicion"]++;
            if (glconfiguracion_general_auto[id_texto]["glposicion"] >= glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
                d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
                glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
            }
        }
        else {
            d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
            glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
        }
    }
    if (codigo == 38) {
        //Arriba
        if (glconfiguracion_general_auto[id_texto]["glposicion"] > -1) {
            glconfiguracion_general_auto[id_texto]["glposicion"]--;
            if (glconfiguracion_general_auto[id_texto]["glposicion"] == -1) {
                d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
            }
        }
        else {
            glconfiguracion_general_auto[id_texto]["glposicion"] = glconfiguracion_general_auto[id_texto]["glarrecontrados"].length - 1;
        }
    }


    if ((glconfiguracion_general_auto[id_texto]["glposicion"] >= 0) && (glconfiguracion_general_auto[id_texto]["glposicion"] < glconfiguracion_general_auto[id_texto]["glarrecontrados"].length)) {
        var cadena_escribe = "";
        var cde = 0;
        while (cde < glconfiguracion_general_auto[id_texto]["selecciona_teclado"].length) {
            cadena_escribe = cadena_escribe + glconfiguracion_general_auto[id_texto]["glarrecontrados"][glconfiguracion_general_auto[id_texto]["glposicion"]][glconfiguracion_general_auto[id_texto]["selecciona_teclado"][cde]] + " ";
            cde++;
        }
        if (glconfiguracion_general_auto[id_texto]["selecciona_teclado"].length > 0)
            cadena_escribe = cadena_escribe.substr(0, cadena_escribe.length - 1);

        d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = cadena_escribe;

        var llave_dato = glconfiguracion_general_auto[id_texto]["glarrecontrados"][glconfiguracion_general_auto[id_texto]["glposicion"]]["value"];
        var id_div = "div_" + id_texto + "_fila_" + llave_dato;
        d(id_div).style.backgroundColor = "#EFEFEF";

    }
}


function funcion_clic_auto_grilla(serial, nombre_columna, tabla, dato_llave, nombre_columna_llave) {

    //alert(dato_llave);
    var dtv = new vista(gldatoscombo[nombre_columna], "['value']=='" + serial + "'", '', '');
    d("componente_" + tabla + "_" + nombre_columna + "_" + dato_llave).value = dtv[0]["text"];

    var n = 0;
    while (n < glarrdatotmp[tabla + "_edita"]["Table"].length) {
        if (glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna_llave] == dato_llave) {
            glarrdatotmp[tabla + "_edita"]["Table"][n][nombre_columna] = serial;
        }
        n++;
    }

}

var agrupar = function (fuente, elementoorden) {
    //previamente ordenado
    var arrgrupo = new Array();
    var pgrupo = new Object();

    if (fuente.length > 0) {
        pgrupo[elementoorden] = fuente[0][elementoorden];
        arrgrupo[0] = pgrupo;
        a9 = 0;
        for (iag = 1; iag < fuente.length; iag++) {
            var pgrupo2 = new Object();
            if (fuente[iag][elementoorden] != arrgrupo[a9][elementoorden]) {
                a9++;
                pgrupo2[elementoorden] = fuente[iag][elementoorden];
                arrgrupo[a9] = pgrupo2;
            }
        }
    }
    return arrgrupo;
}
var radiojava = function () {
    var div, nombre;
    var id;
    var fuente;
    var datovalor;
    var datotexto;
    var estilo;
    var copia;
    var arrrdbvalor = new Array();
    var arrrdbtext = new Array();
    var valorseleccionado;
    var textoseleccionado;
    var indiceseleccionado;
    var evento;
    this.evento = "";
}


grillajava.prototype.cgrilla = function (cop, idr) {
    var elem = cop + "***---" + idr;
    return elem;
}
radiojava.prototype.cgrilla = function (cop, idr) {
    var elem = cop + "***---" + idr;
    return elem;
}
radiojava.prototype.escribir = function (elidrpe, prprpe, valorpr) {
    if (d(this.id + '_' + elidrpe) != undefined)
        d(this.id + '_' + elidrpe)[prprpe] = valorpr;
}

radiojava.prototype.igrilla = function (idrab) {
    this.nombre = this.id;
    this.div = "0";
    this.nombre = this.nombre + "_" + idrab;
    this.id = this.nombre;
}
radiojava.prototype.bind = function () {
    this.nombre = this.id;
    var radio1 = "<table>";
    radio1 = radio1 + "<tr>";
    for (irad = 0; irad < this.fuente.length; irad++) {
        radio1 = radio1 + "<td>";
        radio1 = radio1 + '<INPUT ' + this.evento + ' id=' + this.nombre + '_' + irad + ' type=radio value=' + this.fuente[irad][this.datovalor];
        radio1 = radio1 + ' name=' + this.nombre + '><LABEL class="' + this.estilo + '" id=' + this.nombre + 'lbl_' + irad + '>' + this.fuente[irad][this.datotexto] + '</LABEL>';
        radio1 = radio1 + "</td>";
    }
    radio1 = radio1 + "</tr>";
    radio1 = radio1 + "</table>";

    if (this.div != "0")
        d(this.div).innerHTML = radio1;
    else
        this.copia = radio1;
}

radiojava.prototype.leer = function () {

    this.nombre = this.id;
    var rdbid = 0;
    sarrrdbvalor = "";
    sarrrdbtext = "";

    while (d(this.nombre + "_" + rdbid) != undefined) {
        sarrrdbvalor = sarrrdbvalor + d(this.nombre + "_" + rdbid).value + "//";
        sarrrdbtext = sarrrdbtext + d(this.nombre + "lbl_" + rdbid).innerText + "//";

        if (d(this.nombre + "_" + rdbid).checked == true) {
            this.valorseleccionado = d(this.nombre + "_" + +rdbid).value;
            this.textoseleccionado = d(this.nombre + "lbl_" + +rdbid).innerText;
            this.indiceseleccionado = rdbid;
        }
        rdbid++;
    }
    sarrrdbvalor = sarrrdbvalor.substring(0, sarrrdbvalor.length - 2);
    sarrrdbtext = sarrrdbtext.substring(0, sarrrdbtext.length - 2);

    this.arrrdbvalor = sarrrdbvalor.split("//");
    this.arrrdbtext = sarrrdbtext.split("//");
}
var vista = function (fuente, condicion, orden, elementoorden, entero) {

    if (condicion != '') {
        var a = condicion.indexOf('||');
        if (a != -1) {
            var cond1 = new Array();
            cond1 = condicion.split("||");
            cond2 = 'fuente[i2]' + cond1[0] + '||' + 'fuente[i2]' + cond1[1];
            //['serial_atencion']==2
        }
        else {
            a = condicion.indexOf('&&');
            if (a != -1) {
                var cond1 = new Array();
                cond1 = condicion.split("&&");
                cond2 = 'fuente[i2]' + cond1[0] + '&&' + 'fuente[i2]' + cond1[1];
                //['serial_atencion']==2
            }
            else {
                cond2 = 'fuente[i2]' + condicion;
            }
        }

        this.fuente = fuente;
        this.condicion = condicion;
        this.orden = orden;
        var arrvista = new Array();
        var n1 = 0;
        var k;
        for (i2 = 0; i2 < fuente.length; i2++) {
            //if(eval("fuente[i2]" + condicion))
            if (eval(cond2)) {
                arrvista[n1] = new Object();
                for (k in fuente[n1]) {
                    arrvista[n1][k] = fuente[i2][k];
                }
                n1++;
            }
        }
    }
    else
        arrvista = fuente;

    if (orden != '') {
        if (arrvista.length > 0)
            var arrvista = ordenarQS2(arrvista, orden, 0, arrvista.length - 1, elementoorden, entero);
    }
    return arrvista;
}
function ordenarQS2(objArray, aod, ini, fin, elemento, entero) {
    var i3 = ini;
    var j3 = fin;
    var tmp;
    var tmp2 = new Array();

    if (entero == "true") {
        var c = parseInt(objArray[Math.floor((i3 + j3) / 2)][elemento], 10);
    }
    else
        var c = objArray[Math.floor((i3 + j3) / 2)][elemento];

    do {
        if (aod == "A") {
            if (entero != "true") {
                while ((i3 < fin) && (convertiresp(c).toUpperCase() > convertiresp(objArray[i3][elemento]).toUpperCase()))
                    i3++;
                while ((j3 > ini) && (convertiresp(c).toUpperCase() < convertiresp(objArray[j3][elemento]).toUpperCase()))
                    j3--;
            } else {
                //debugger;
                while ((parseFloat(i3) < parseFloat(fin)) && ((c) > parseFloat(objArray[i3][elemento])))
                    i3++;
                while ((parseFloat(j3) > parseFloat(ini)) && ((c) < parseFloat(objArray[j3][elemento])))
                    j3--;
            }
        }
        else {
            if (entero != "true") {
                while ((i3 < fin) && (convertiresp(c).toUpperCase() < convertiresp(objArray[i3][elemento]).toUpperCase()))
                    i3++;
                while ((j3 > ini) && (convertiresp(c).toUpperCase() > convertiresp(objArray[j3][elemento]).toUpperCase()))
                    j3--;
            } else {
                while ((i3 < fin) && ((c) < (objArray[i3][elemento])))
                    i3++;
                while ((j3 > ini) && ((c) > (objArray[j3][elemento])))
                    j3--;
            }
        }
        if (i3 < j3) {
            var n3 = 0;
            for (k in objArray[i3]) {
                tmp2[n3] = objArray[i3][k];
                n3++;
            }
            for (k in objArray[i3]) {
                objArray[i3][k] = objArray[j3][k];
            }
            n3 = 0;
            for (k in objArray[j3]) {
                objArray[j3][k] = tmp2[n3];
                n3++;
            }
        }
        if (i3 <= j3)
        { i3++; j3--; }
    } while (i3 <= j3);
    if (ini < j3) ordenarQS2(objArray, aod, ini, j3, elemento, entero);
    if (i3 < fin) ordenarQS2(objArray, aod, i3, fin, elemento, entero);
    return objArray;
}


var combojava = function () {
    var id;
    var estilo;
    var propiedades;
    var div;
    var fuente;
    var datotexto;
    var datovalor;
    var fuenteinicial, fuentefinal;
    this.fuenteinicial = {};
    this.fuentefinal = {};
}
combojava.prototype.bind = function () {
    var combo1 = '<SELECT ' + this.evento + ' ';
    combo1 = combo1 + 'style="' + this.propiedades + '"';
    combo1 = combo1 + 'class=' + this.estilo + ' id=' + this.id + ' name=' + this.id + '>';
    icom = 0;

    for (icom = 0; icom < this.fuenteinicial.length; icom++) {
        combo1 = combo1 + '<OPTION value=' + this.fuenteinicial[icom][this.datovalor] + '>' + this.fuenteinicial[icom][this.datotexto] + '</OPTION>'
    }
    for (icom = 0; icom < this.fuente.length; icom++) {
        combo1 = combo1 + '<OPTION value=' + this.fuente[icom][this.datovalor] + '>' + this.fuente[icom][this.datotexto] + '</OPTION>'
    }
    for (icom = 0; icom < this.fuentefinal.length; icom++) {
        combo1 = combo1 + '<OPTION value=' + this.fuentefinal[icom][this.datovalor] + '>' + this.fuentefinal[icom][this.datotexto] + '</OPTION>'
    }
    combo1 = combo1 + '</SELECT>'
    d(this.div).innerHTML = combo1;
}
function convertiresp(cadena) {
    var unicode = new Array();
    unicode = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'x', 'O', 'U', 'U', 'U', 'U', 'Y', 'B', 'B', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'y']

    cadena2 = escape(cadena);
    porce = cadena2.indexOf('%');
    if (porce == -1)
        return cadena2;
    hexac = cadena2.substring(porce + 1, porce + 3);
    indi = parseInt(hexac, 16);
    indi = parseInt(indi, 10) - 192;
    compara = "%" + hexac;
    linea = cadena2.replace(compara, unicode[indi]);
    return linea;
}
function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}
function ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/, "");
}
function rtrim(stringToTrim) {
    return stringToTrim.replace(/\s+$/, "");
}

var accordion = function () {
    //cuando carge la pagina configuro cuales div estan visibles y cuales no.
    var idactiva;  //debe ser un div
    var eventoactiva;
    var div;
    var tipo;
    var imagentoogle = new Array();
    this.imagentoogle = ["", ""];
    //["+","-"]
    var estilo;
    var estadoincial;
    var id;
    this.estadoincial = 0;
    var titulo;
    var espacio;
    var estiloimagen;
    this.espacio = '10px';
    var divacordion;
    var tamdiv;
    var tiempomuestra, tiempooculta;
    this.tiempomuestra = 30;
    this.tiempooculta = 30
    this.eventoactiva = "onclick";
}
accordion.prototype.bind = function () {
    var acord = '<div style="' + this.estilo + '" id=' + this.id + '>';
    //var acord='<div id='+this.id+' style="cursor:pointer" onclick="botontoogle('+ "'" + this.imagentoogle[0]+ "'" + ',' + "'" + this.imagentoogle[1]+ "'" + ',' + "'" + this.id + "'" + ',' + "'" + this.divacordion + "'" + ',' + "'" + this.tamdiv + "'" + ',' + "'" + this.tiempomuestra + "'" + ',' + "'" + this.tiempooculta + "'" + ');">';
    acord = acord + '<table><tr><td>';
    acord = acord + '<img style="' + this.estiloimagen + '" alt="" border="0" src=' + this.imagentoogle[this.estadoincial] + ' id="imagenacord' + this.id + '"/>';
    acord = acord + '</td><td style="width:' + this.espacio + ';"></td><td>';
    acord = acord + this.titulo;
    acord = acord + '</td><td id="estado_actual' + this.id + '" style="display:none">' + this.estadoincial + '</td></tr></table></div>';
    d(this.div).innerHTML = acord;
    var func1 = "'" + this.imagentoogle[0] + "'" + ',' + "'" + this.imagentoogle[1] + "'" + ',' + "'" + this.id + "'" + ',' + "'" + this.divacordion + "'" + ',' + "'" + this.tamdiv + "'" + ',' + "'" + this.tiempomuestra + "'" + ',' + "'" + this.tiempooculta + "'";
    d(this.idactiva)[this.eventoactiva] = new Function("botontoogle(" + func1 + ")");
    //d(this.id).onclick="pruebss();" 
}

function botontoogle(imagentoogle1, imagentoogle2, id, div, tamdiv, tiempomuestra, tiempooculta) {

    if (parseInt(d('estado_actual' + id).innerHTML, 10) == 0) {
        d('imagenacord' + id).src = imagentoogle2;
        d('estado_actual' + id).innerHTML = 1;
        opacidadacordion = 0;
        tamtempacordion = 0;
        d(div).style.filter = 'alpha(opacity=0)';
        d(div).style.height = '0px';
        d(div).style.display = 'block';
        if (tiempomuestra != 0)
            timeracordion = setInterval("mostrardivacordion(d('" + div + "'),'" + tamdiv + "')", tiempomuestra);
        else {
            d(div).style.filter = 'alpha(opacity=100)';
            d(div).style.height = tamdiv + 'px';
        }
    }
    else {
        d('imagenacord' + id).src = imagentoogle1;
        d('estado_actual' + id).innerHTML = 0;
        opacidadacordion = 100;
        tamtempacordion = tamdiv;
        d(div).style.filter = 'alpha(opacity=100)';
        if (tiempooculta != 0)
            timeracordion = setInterval("ocultardivacordion(d('" + div + "'),'" + tamdiv + "')", tiempooculta);
        else {
            d(div).style.filter = 'alpha(opacity=0)';
            d(div).style.height = '0px';
        }
    }
}
var timeracordion;
var opacidadacordion;
var tamtempacordion;

function mostrardivacordion(div, tamdiv) {
    div.style.filter = 'alpha(opacity=' + opacidadacordion + ')';
    if (tamtempacordion >= tamdiv)
        clearTimeout(timeracordion);
    opacidadacordion = opacidadacordion + 10;
    pasosacordion = (tamdiv / 5);
    tamtempacordion = tamtempacordion + Math.ceil(parseInt(tamdiv, 10) / pasosacordion);
    if (tamtempacordion > parseInt(tamdiv, 10))
        tamtempacordion = parseInt(tamdiv, 10);
    div.style.height = tamtempacordion + 'px';
}
function ocultardivacordion(div, tamdiv) {
    div.style.filter = 'alpha(opacity=' + opacidadacordion + ')';
    if (tamtempacordion <= 0)
        clearTimeout(timeracordion);
    opacidadacordion = opacidadacordion - 10;

    pasosacordion = (tamdiv / 5);
    tamtempacordion = tamtempacordion - Math.round(parseInt(tamdiv, 10) / pasosacordion);
    if (tamtempacordion < 0)
        tamtempacordion = 0;
    div.style.height = tamtempacordion + 'px';

}



function call_ber(funcion, arr1, funcionej) {
    var str1 = JSON.stringify(arr1)
    conexion_ber(funcion, '0', str1, funcionej);

}
function conexion_ber(funcion34, control, str1, funcionej) {
    //http://localhost:49306/WCallCenter/ModRLlamadas/prueba_ajax.aspx

    var loc_actual = "";
    loc_actual = String(document.location);

    var indice_loc = 0;
    var p1 = 0;
    var pos_inicial = 0;

    while (p1 < 50) {
        indice_loc = loc_actual.indexOf('/', pos_inicial);
        if (indice_loc >= 0) {
            loc_actual = loc_actual.substr(indice_loc + 1);
            p1++;
        }
        else {
            break;
        }
        p1++;
    }
    var nindice = 0;
    nindice = loc_actual.indexOf('.', 0);


    nvo_locacion = loc_actual;
    if (nindice >= 0) {
        nvo_locacion = loc_actual.substr(0, nindice);
    }

    ahora = new Date();
    ajax = nuevoAjax();

    url = nvo_locacion + ".ashx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();
    // url = nvo_locacion + "_1.aspx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();
    url1 = "";

    url1 = "texto=" + str1;
    url1 = url1 + "&control=" + control + "&funcion=" + funcionej;
    ajax.open("POST", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {

            datos = ajax.responseText;
            //  datos=replaceAll(datos, ": null,", ":,");
            var arrdt;

            try {
                arrdt = JSON.parse(datos);
            }
            catch (err) {
                alert(err);
            }

            funcion34(arrdt);
        }
    }
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send(url1);
}
function argumentos() {

    var arr0 = new Array();
    var arr1 = new Array();
    var obj1 = new Object();
    var n1 = 0;
    while (n1 < arguments.length) {
        obj1["param" + n1] = arguments[n1];
        n1++;
    }

    arr1[0] = obj1;
    arr0[0] = arr1;
    return arr0;
}
function replaceAll(text, busca, reemplaza) {

    while (text.toString().indexOf(busca) != -1)

        text = text.toString().replace(busca, reemplaza);

    return text;

}
var glenviado_ajax = 0;
var glarrenvios_espera = new Array();
function call_sgu(funcion_local, arr1, funcion_servidor, formulario) {

    var str1 = JSON.stringify(arr1);
    if (glenviado_ajax == 0) {
        glenviado_ajax = 1;
        conexion_sgu(funcion_local, '0', str1, funcion_servidor, formulario);
    }
    else
    {
        glarrenvios_espera[glarrenvios_espera.length] = { funcion: funcion_local, parametros: arr1, funcion2: funcion_servidor, form: formulario };
    }

}

function enviar_pendientes()
{
    var glarrenvios_tmp= new Array();
    if(glarrenvios_espera.length>0)
    {
        var str1 = JSON.stringify(glarrenvios_espera[0]["parametros"]);
        glenviado_ajax = 1;
        conexion_sgu(glarrenvios_espera[0]["funcion"], '0', str1, glarrenvios_espera[0]["funcion2"], glarrenvios_espera[0]["form"]);
        glarrenvios_tmp = copia_arreglo_objeto(glarrenvios_espera, 1);
        glarrenvios_espera = copia_arreglo_objeto(glarrenvios_tmp, 0);
    }
}
var glmuestra_cargando = true;
var objsiempremuestracargando = new Object();

var glsesionenvio = "";
var globjconfiguracion_uno_muchos = new Object();

function conexion_sgu(funcion34, control, str1, funcionej, en_script) {

    if (glmuestra_cargando == true) {
        if (d("vcargando") != undefined)
            d("vcargando").style.display = "block";
        else {
            if (typeof ("parent.d") == "function") {
                if (parent.d("vcargando") != undefined) {
                    parent.d("vcargando").style.display = "block";
                }
            }
        }
    }

    if (objsiempremuestracargando[funcionej] == "1")
    {
        if (d("vcargando") != undefined)
            d("vcargando").style.display = "block";
        else {
            if (typeof ("parent.d") == "function") {
                if (parent.d("vcargando") != undefined) {
                    parent.d("vcargando").style.display = "block";
                }
            }
        }
    }
    glmuestra_cargando = true;
    if (en_script == "") {
        var loc_actual = "";
        loc_actual = String(document.location);

        var indice_loc = 0;
        var p1 = 0;
        var pos_inicial = 0;

        while (p1 < 50) {
            indice_loc = loc_actual.indexOf('/', pos_inicial);
            if (indice_loc >= 0) {
                loc_actual = loc_actual.substr(indice_loc + 1);
                p1++;
            }
            else {
                break;
            }
            p1++;
        }
        var nindice = 0;
        nindice = loc_actual.indexOf('.', 0);
        nvo_locacion = loc_actual;
        if (nindice >= 0) {
            nvo_locacion = loc_actual.substr(0, nindice);
        }
        ahora = new Date();
        url = nvo_locacion + ".ashx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();
    }
    else {
        ahora = new Date();

        var ubn = replaceAll(document.location, document.location.protocol + "//" + document.location.host, "");
        var indfb = ubn.indexOf("/", 1);

        var arrurl = ubn.split("/");

        var sitio = "";

        if (arrurl.length >= 4)
            sitio = "/" + ubn.substr(1, indfb - 1);



        url = document.location.protocol + "//" + document.location.host + sitio + "/Manejadores/" + en_script + ".aspx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();

    }

    ajax = nuevoAjax();

    var sesion

    // url = nvo_locacion + "_1.aspx?" + "flag=" + control + "&c=" + ahora.getMilliseconds();
    url1 = "";

    if (glsesionenvio == "")
        glsesionenvio=Math.random();

    if (str1.indexOf("<") != -1)
    {
        var str3 = "";
        str3 = replaceAll(str3, '"', "'");
        str3 = replaceAll(str1,"<", "9-*9");
        str3 = replaceAll(str3,">", "1*-1");
        str3 = replaceAll(str3,"/>", "2**2");
        str3 = replaceAll(str3,"</", "3--3");
        url1 = "texto=" + str3+ "&text_html=1";
    }
    else
        url1 = "texto=" + str1;


    if (url1.indexOf("+") != -1) {
        var str3 = "";
        url1 = replaceAll(url1, "+", "mas*mas");
    }

    url1 = url1 + "&control=" + control + "&funcion=" + funcionej+"&sessionenvio="+glsesionenvio;
    ajax.open("POST", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            glenviado_ajax = 0;
           
            datos = ajax.responseText;

            datos = replaceAll(datos, "mas*mas", "+");
            //  datos=replaceAll(datos, ": null,", ":,");
            var arrdt;

            try {
//                arrdt = JSON.parse(datos);
                arrdt = eval("("+datos+")");
            }
            catch (err) {
                //alert(err);
                if (d("vcargando") != undefined)
                    d("vcargando").style.display = "none";
                else if (typeof ("parent.d") == "function") {
                    if (parent.d("vcargando") != undefined) {
                        parent.d("vcargando").style.display = "block";
                    }
                }

            }
            if (d("vcargando") != undefined)
                d("vcargando").style.display = "none";
            else if (typeof ("parent.d") == "function") {
                if (parent.d("vcargando") != undefined) {
                    parent.d("vcargando").style.display = "block";
                }
            }

            funcion34(arrdt);
            enviar_pendientes();
        }
    }
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send(url1);
}
var glcantidad_encontrados = 0;
var glarrecontrados;
var gloriginal_escribio;
var glid_control_auto;
var globjconfig_autocompletar;

var glposicion = -1;

function consulta_autocompletar(evt, param) {
   

    if (evt == undefined) {
        var evt = window.event;

        var objtmp3 = new Object();
        objtmp3["objeto"] = d(glconfiguracion_general_auto[evt.srcElement.id]["glid_control_auto"]);
        objtmp3["maximos_resultados"] = d(glconfiguracion_general_auto[evt.srcElement.id]["glid_control_auto"]).maximos_resultados;
        evt["target"] = objtmp3;

    }

  
    if (evt.srcElement == undefined)
    {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf("firefox")!=-1)
           evt.srcElement = this;
    }
    if (evt.srcElement != undefined) {
        if (param == undefined) {

            // glvertodos = false;
            if (glconfiguracion_general_auto[evt.srcElement.id] == undefined) {
                glconfiguracion_general_auto[evt.srcElement.id] = {};
            }
            glconfiguracion_general_auto[evt.srcElement.id]["vertodos"] = false;
        }

        var id_texto = evt.srcElement.id;
        if (glconfiguracion_general_auto[evt.srcElement.id]["div_autocompletar"] == undefined) {
            glconfiguracion_general_auto[evt.srcElement.id]["fuente"] = globjconfig_autocompletar["fuente"];
            glconfiguracion_general_auto[evt.srcElement.id]["fuente_arreglada"] = globjconfig_autocompletar["fuente_arreglada"];
            glconfiguracion_general_auto[evt.srcElement.id]["div_autocompletar"] = globjconfig_autocompletar["div_autocompletar"];
            glconfiguracion_general_auto[evt.srcElement.id]["nombre"] = globjconfig_autocompletar["nombre"];
            glconfiguracion_general_auto[evt.srcElement.id]["serial"] = globjconfig_autocompletar["serial"];
            glconfiguracion_general_auto[evt.srcElement.id]["funcion_clic"] = globjconfig_autocompletar["funcion_clic"];
            glconfiguracion_general_auto[evt.srcElement.id]["columnas_grilla"] = globjconfig_autocompletar["columnas_grilla"];
            glconfiguracion_general_auto[evt.srcElement.id]["id_cuerpo_pagina"] = globjconfig_autocompletar["id_cuerpo_pagina"];
            glconfiguracion_general_auto[evt.srcElement.id]["selecciona_teclado"] = globjconfig_autocompletar["selecciona_teclado"];


            glconfiguracion_general_auto[evt.srcElement.id]["id_grilla"] = globjconfig_autocompletar["selecciona_teclado"];
            glconfiguracion_general_auto[evt.srcElement.id]["estilo_grilla"] = globjconfig_autocompletar["estilo_grilla"];
            glconfiguracion_general_auto[evt.srcElement.id]["ejecuta_termina"] = globjconfig_autocompletar["ejecuta_termina"];
            glconfiguracion_general_auto[evt.srcElement.id]["estilo_grilla"] = globjconfig_autocompletar["estilo_grilla"];
            glconfiguracion_general_auto[evt.srcElement.id]["tipo_columna"] = globjconfig_autocompletar["tipo_columna"];
            glconfiguracion_general_auto[evt.srcElement.id]["estilo_columna"] = globjconfig_autocompletar["estilo_columna"];
            glconfiguracion_general_auto[evt.srcElement.id]["funcion_columna"] = globjconfig_autocompletar["funcion_columna"];

            glconfiguracion_general_auto[evt.srcElement.id]["gldatos_global"] = glconfiguracion_general_auto[evt.srcElement.id]["fuente"];
            glconfiguracion_general_auto[id_texto]["glid_control_auto"] = glid_control_auto;

            glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
            glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"] = 0;
        }
        if (evt.keyCode != 13) {
            if ((evt.keyCode == 40) || (evt.keyCode == 38)) {

                //globjconfig_autocompletar["div_autocompletar"]


                if (evt.keyCode == 40) {
                    if (glconfiguracion_general_auto[id_texto]["glposicion"] < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
                        glconfiguracion_general_auto[id_texto]["glposicion"]++;
                        if (glconfiguracion_general_auto[id_texto]["glposicion"] >= glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
                            d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
                            glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
                        }
                    }
                    else {
                        d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
                        glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
                    }
                }
                if (evt.keyCode == 38) {
                    //Arriba
                    if (glconfiguracion_general_auto[id_texto]["glposicion"] > -1) {
                        glconfiguracion_general_auto[id_texto]["glposicion"]--;
                        if (glconfiguracion_general_auto[id_texto]["glposicion"] == -1) {
                            d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = glconfiguracion_general_auto[id_texto]["gloriginal_escribio"];
                        }
                    }
                    else {
                        glconfiguracion_general_auto[id_texto]["glposicion"] = glconfiguracion_general_auto[id_texto]["glarrecontrados"].length - 1;
                    }
                }
                if ((glconfiguracion_general_auto[id_texto]["glposicion"] >= 0) && (glconfiguracion_general_auto[id_texto]["glposicion"] < glconfiguracion_general_auto[id_texto]["glarrecontrados"].length)) {
                    var cadena_escribe = "";
                    var cde = 0;
                    while (cde < glconfiguracion_general_auto[evt.srcElement.id]["selecciona_teclado"].length) {
                        cadena_escribe = cadena_escribe + glconfiguracion_general_auto[id_texto]["glarrecontrados"][glconfiguracion_general_auto[id_texto]["glposicion"]][glconfiguracion_general_auto[evt.srcElement.id]["selecciona_teclado"][cde]] + " ";
                        cde++;
                    }
                    if (glconfiguracion_general_auto[evt.srcElement.id]["selecciona_teclado"].length > 0)
                        cadena_escribe = cadena_escribe.substr(0, cadena_escribe.length - 1);

                    d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value = cadena_escribe;
                }
                borra_auto(id_texto);
            }
            else {
                /*globjconfig_autocompletar = {
                    fuente: gltratamiento, fuente_arreglada: gltratamiento_buscar,
                    div_autocompletar: "divautocontactos", nombre: "detalle_tra",
                    serial: "serial_tra", funcion_clic: "funcion_clic_auto",
                    columnas_grilla: ["codigo_tra", "detalle_tra", "Descripcion_esp"],
                    id_cuerpo_pagina: "cuerpo"
                };*/

                /* pinta_grilla_autocompletar(evt,gltratamiento, gltratamiento_buscar, 
         "divautocontactos", "detalle_tra", "serial_tra", "funcion_clic_auto",
         ["codigo_tra", "detalle_tra", "Descripcion_esp"], "cuerpo");*/

                pinta_grilla_autocompletar(evt, glconfiguracion_general_auto[evt.srcElement.id]["fuente"],
                glconfiguracion_general_auto[evt.srcElement.id]["fuente_arreglada"],
                glconfiguracion_general_auto[evt.srcElement.id]["div_autocompletar"], glconfiguracion_general_auto[evt.srcElement.id]["nombre"],
                glconfiguracion_general_auto[evt.srcElement.id]["serial"], glconfiguracion_general_auto[evt.srcElement.id]["funcion_clic"],
                glconfiguracion_general_auto[evt.srcElement.id]["columnas_grilla"], glconfiguracion_general_auto[evt.srcElement.id]["id_cuerpo_pagina"],
                evt.srcElement.id
                );

                
                if (glconfiguracion_general_auto[evt.srcElement.id]["ejecuta_termina"] != undefined) {
                    eval(glconfiguracion_general_auto[evt.srcElement.id]["ejecuta_termina"] + "('" + id_texto + "')");
                }

            }
        }
    }
}
var glarrecontrados_total = new Array();

function termino_busca_auto_estandar(id_texto) {

    if (glconfiguracion_general_auto[id_texto]["datos"].length > 0) {
        d("divauto_" + id_texto).style.display = "block";
        if (glconfiguracion_general_auto[id_texto]["porcentaje_grilla"] == undefined)
            d("divauto_" + id_texto).style.width = glconfiguracion_general_auto[id_texto]["porcentaje_grilla"];
        else
            d("divauto_" + id_texto).style.width = "98%";
       //d("divauto_" + id_texto).style.position = "relative"; 
            d("divauto_" + id_texto).style.top = glconfiguracion_general_auto[id_texto]["top_grilla"];
        if (glconfiguracion_general_auto[id_texto]["left_grilla"]!="0px")
            d("divauto_" + id_texto).style.left = glconfiguracion_general_auto[id_texto]["left_grilla"];
    }
    else {
        d("divauto_" + id_texto).style.display = "none";
    }
    // alert("ds");
}

function fauto_completar3(arrdatos, arrdatos_arreglado, dato_buscar,
       maximos_resultados, divpinta, nombre, llave, pordefecto, tabla, datos_nombre,
       nombre_foto, funcion_clic, nombre_columna, dato_llave, nombre_columna_llave,
       grilla, arreglo_columnas, funcion, serial, id_texto

       ) {

    if (glconfiguracion_general_auto[id_texto]["opciones"]!=undefined)
        glopciones_auto = glconfiguracion_general_auto[id_texto]["opciones"];

    if (glconfiguracion_general_auto[id_texto]["vertodos"] == false) {
        d(glconfiguracion_general_auto[id_texto]["div_autocompletar"]).style.overflowY = "";
        d(glconfiguracion_general_auto[id_texto]["div_autocompletar"]).style.height = "";
        d(glconfiguracion_general_auto[id_texto]["div_autocompletar"]).style.width = "auto";
    }

    var arrdatos_encontrados = new Array();
    var arrdatos_sp = String(dato_buscar).split(" ");
    var dato_a_buscar = arrdatos_sp[0];
    var encontro_valor = false;
    if (dato_a_buscar.length > 1) {
        var m = 0;
        while (m < arreglo_columnas.length) {
            var dtv = new vista(glconfiguracion_general_auto[id_texto]["gldatos_global"], "['" + arreglo_columnas[m] + "']=='" + dato_a_buscar + "'", '', '');
            if (dtv.length > 0) {
                encontro_valor = true;
                arrdatos_encontrados = dtv;
            }
            m++;
        }
    }


    glultima_cantidad_auto = 0;
    d(divpinta).style.display = "block"
   // var arrdatos_encontrados2 = new Array();
    glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"] = [];

    if (encontro_valor == false) {
        var objresultado = busca_autocompletar(arrdatos_arreglado, dato_buscar, maximos_resultados, 1, {});
        objresultado = busca_adicional(arrdatos_arreglado, dato_buscar, maximos_resultados, objresultado);
        glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"] = pinta_autocompletar2(arrdatos, objresultado, divpinta, nombre, llave, dato_llave);
    }

    glconfiguracion_general_auto[id_texto]["glarrecontrados_total"] = glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"];
    if (grilla != "") {
        var coloca_link = false;
        var nlim = 0;
        nlim = glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"].length;
        if (glconfiguracion_general_auto[id_texto]["vertodos"] == false) {
            if (glconfiguracion_general_auto[id_texto]["cantidad_pinta"] != undefined) {
                if (glconfiguracion_general_auto[id_texto]["cantidad_pinta"] != 0) {
                    var canti = parseInt(glconfiguracion_general_auto[id_texto]["cantidad_pinta"]);
                    if (nlim > canti) {
                        nlim = canti;
                        coloca_link = true;
                    }
                }

            }
        }
        //codigo_tra: "", detalle_tra: "<a href='#' onclick='return ver_todos_result2()'>Ver todos los resultados(1522)</a>",
        //Descripcion_esp: ""

        var nlim2 = 0;
        while (nlim2 < nlim) {
            var objl = new Object();
            for (kl in glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"][nlim2]) {
                objl[kl] = glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"][nlim2][kl];
            }
            arrdatos_encontrados[arrdatos_encontrados.length] = objl;
            nlim2++;
        }
        glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"] = arrdatos_encontrados.length;
        glconfiguracion_general_auto[id_texto]["glarrecontrados"] = arrdatos_encontrados;
        grilla.fuente = arrdatos_encontrados;

        if (coloca_link == true) {

            var objmasresul = new Object();
            var nmr = 0;
            while (nmr < glconfiguracion_general_auto[id_texto]["columnas_grilla"].length) {
                var st1t = glconfiguracion_general_auto[id_texto]["mensaje_todas"][nmr];
                if (st1t != "")
                    st1t = "<a href='#' onclick='return ver_todos_result2()'>" +
                       st1t + "(" + glconfiguracion_general_auto[id_texto]["arrdatos_encontrados2"].length + ")</a>";

                objmasresul[glconfiguracion_general_auto[id_texto]["columnas_grilla"][nmr]] = st1t;
                nmr++;
            }
            grilla.fuente[grilla.fuente.length] = objmasresul;
        }
        grilla.div = divpinta;
        grilla.bind();

        var nin = 0;
        while (nin < arrdatos_encontrados.length) {
            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + nin).prueba = nin;
            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + nin).onclick = function () {
                if (glconfiguracion_general_auto[id_texto]["glposicion"] >= 0) {
                    var cadena_paso = "";
                    var cad = 0;
                    while (cad < arreglo_columnas.length) {
                        cadena_paso = cadena_paso + "'" + glconfiguracion_general_auto[id_texto]["glarrecontrados"][this.prueba][arreglo_columnas[cad]] + "'" + ",";
                        cad++;
                    }
                    if (arreglo_columnas.length > 0)
                        cadena_paso = "," + String(cadena_paso).substr(0, String(cadena_paso).length - 1);
                    glultimo_div_sl = divpinta;
                    eval(funcion + "(" + "'" + glconfiguracion_general_auto[id_texto]["glarrecontrados"][this.prueba][serial] + "'" + cadena_paso + ")");
                    var objtmp = new Object();
                    objtmp["keyCode"] = 39;
                    var objtmp3 = new Object();
                    objtmp3["objeto"] = d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]);
                    objtmp3["maximos_resultados"] = d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).maximos_resultados;
                    objtmp["target"] = objtmp3;

                    consulta_autocompletar(objtmp);

                    //  d(glid_control_auto).value =glarrecontrados[this.prueba]["codigo_tra"]+ " "+glarrecontrados[this.prueba]["detalle_tra"];
                    glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
                    borra_auto(id_texto);
                    d(divpinta).style.display = "none";
                }
                return false;
            }

            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + nin).onmouseover = function () {


                var m1 = 0;
                while (m1 < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
                    if (m1 == this.prueba) {
                        d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "clasesobre";
                        d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "clasesobre");
                        //alert("gwhistoricop_tr_" + m1);

                        glconfiguracion_general_auto[id_texto]["glposicion"] = this.prueba;
                    }
                    else {
                        //    alert("gwhistoricop_tr_" + m1);
                        if (m1 % 2 == 0) {
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "itemlista");
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "itemlista";
                        }
                        else {
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "alternolista");
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "alternolista";
                        }
                    }
                    m1++;
                }
            };
            nin++;
        }

        //eval("funcion_nueva("+arrdatos_encontrados+ tabla+  nombre_columna+ llave+ nombre+ divpinta+ datos_nombre+  funcion_clic+
        //     imagen+dato_llave + nombre_columna_llave + pordefecto + ")");
    }
    else {
        if (pordefecto == true) {
            var n = 0;
            while (n < arrdatos_encontrados.length) {
                //guarda_dato_img_ses

                if (nombre_foto != "") {
                    var ruta = ruta = "../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave];
                    if (sessionStorage[arrdatos_encontrados[n][llave]] == undefined) {
                        guarda_dato_img_ses("../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave], arrdatos_encontrados[n][llave]);
                    }
                    else
                        ruta = sessionStorage[arrdatos_encontrados[n][llave]];

                    var imagen = "<div style='height:37px; border-radius: 8px; overflow:hidden; display:inline-block'><img  width='40px' src='" + ruta + "'/></div>";
                    d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                        "<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
                }
                else {
                    //d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                    // "<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
                    d("div_" + nombre + "_" + arrdatos_encontrados[n][llave] + "_" + dato_llave).innerHTML =
                    "<div onclick='selecciono_auto2(" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ',"' + nombre_columna + '"' + ',"' + tabla + '"' + ',"' + dato_llave + '"' + ',"' + nombre_columna_llave + '"' + ")' class='div_autocompletar'><div style='display:inline-block; width:" + ancho_autocompletar + "; position:relative; top:0px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";

                }
                n++;

            }
        }
    }

    return arrdatos_encontrados;
}
var glvertodos = false;
function ver_todos_result2(evt) {
    glvertodos = true;
    //alert("1");
    d(globjconfig_autocompletar["div_autocompletar"]).style.height = "300px";
    d(globjconfig_autocompletar["div_autocompletar"]).style.width = "483px";
    d(globjconfig_autocompletar["div_autocompletar"]).style.overflowY = "scroll";
    //alert(globjconfig_autocompletar["div_autocompletar"]);
    d(globjconfig_autocompletar["div_autocompletar"]).style.display = "block";

    var objtmp = new Object();
    objtmp["keyCode"] = 39;
    var objtmp3 = new Object();
    objtmp3["objeto"] = d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]);
    objtmp3["maximos_resultados"] = d(glconfiguracion_general_auto[id_auto]["glid_control_auto"]).maximos_resultados;
    objtmp["target"] = objtmp3;

    consulta_autocompletar(objtmp, 1);

    //evt.stopPropagation();
    //evt.preventDefault();
    return false;
}
var gldatos_global;
var glgrilla_auto;
function pinta_grilla_autocompletar(evt, gltratamiento, gltratamiento_buscar,
        div1, columna, serial, funcion, arreglo_columnas, id_cuerpo,id_texto) {

    if (glconfiguracion_general_auto[id_texto]["id_grilla"] == undefined) {
        glconfiguracion_general_auto[id_texto]["glgrilla_auto"] = glconfiguracion_general_auto[id_texto]["id_grilla"];
    }
    else
        glconfiguracion_general_auto[id_texto]["glgrilla_auto"] = "gwhistoricop_" + id_texto;

    var estilo_grilla = "";
    if (glconfiguracion_general_auto[id_texto]["estilo_grilla"] != undefined) {
        estilo_grilla = glconfiguracion_general_auto[id_texto]["estilo_grilla"];
    }
    else
        estilo_grilla = "width:464px";
    

    glconfiguracion_general_auto[id_texto]["gloriginal_escribio"] = d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).value;
    glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
    var objeto = evt.target.objeto;
    var maximos_resultados = evt.target.maximos_resultados;

    var grilla = new grillajava();
    //grilla.fuente = arr;
    //grilla.div = "div_grilla";
    grilla.id = glconfiguracion_general_auto[id_texto]["glgrilla_auto"]
    grilla.autorow = false;
    grilla.habencabezado = false;
    grilla.clasetabla = "bordered3";
    grilla.estilotabla = estilo_grilla;
    grilla.propiedadestabla = "";
    grilla.estilo = "itemlista";
    grilla.alternolista = "alternolista";
    grilla.estiloencabezado = "titulolista";
    grilla.encabezado = arreglo_columnas;
    grilla.datoscolumnas = arreglo_columnas;

    var arreglotipo = new Array();
    var arreglotipo2 = new Array();
    var arreglofuncionc = new Array();
    
    if (glconfiguracion_general_auto[id_texto]["tipo_columna"] == undefined) {
        arreglotipo2[0] = "0";
        arreglotipo2[1] = "0";

        var nar = 2;
        while (nar < arreglo_columnas.length) {
            arreglotipo2[nar] = "0";
            nar++;
        }

        grilla.tipocolumna = arreglotipo2;
    }
    else
    {
        grilla.tipocolumna = glconfiguracion_general_auto[id_texto]["tipo_columna"];
    }

    if (glconfiguracion_general_auto[id_texto]["estilo_columna"] == undefined) {
        arreglotipo[0] = "'width: 200px; text-align:center'";
        arreglotipo[1] = "'width: 400px; text-align:center'";

        var nar = 2;
        while (nar < arreglo_columnas.length) {
            arreglotipo[nar] = "'width: 200px; text-align:center'";
            nar++;
        }
        grilla.estilocolumna = arreglotipo2;
    }
    else {
        grilla.estilocolumna = glconfiguracion_general_auto[id_texto]["estilo_columna"];

    }

 
    if (glconfiguracion_general_auto[id_texto]["funcion_columna"] == undefined) {
        arreglofuncionc[0] = "";
        arreglofuncionc[1] = "";

        grilla.funcioncolumna = arreglofuncionc;
    }
    else {
        grilla.funcioncolumna = glconfiguracion_general_auto[id_texto]["funcion_columna"];

    }
 arreglo_columnas
    //grilla.bind();

    d(id_cuerpo).onkeypress = function (evt) {
        if (evt == undefined) {
            var evt = window.event;
            //var objtmp3 = new Object();
            //objtmp3["objeto"] = d(glid_control_auto);
            //objtmp3["maximos_resultados"] = d(glid_control_auto).maximos_resultados;
            //evt["target"] = objtmp3;

        }
        if (evt.keyCode == 13) {
            if (glconfiguracion_general_auto[id_texto]["glposicion"] >= 0) {

                var cadena_paso = "";
                var cad = 0;
                while (cad < arreglo_columnas.length) {
                    cadena_paso = cadena_paso + "'" + glconfiguracion_general_auto[id_texto]["glarrecontrados"][glconfiguracion_general_auto[id_texto]["glposicion"]][arreglo_columnas[cad]] + "'" + ",";
                    cad++;
                }
                if (arreglo_columnas.length > 0)
                    cadena_paso = "," + String(cadena_paso).substr(0, String(cadena_paso).length - 1);
                glultimo_div_sl = glconfiguracion_general_auto[id_texto]["div"];
                eval(funcion + "(" + "'" + glconfiguracion_general_auto[id_texto]["glarrecontrados"][glconfiguracion_general_auto[id_texto]["glposicion"]][serial] + "'" + cadena_paso + ")");

                var objtmp = new Object();
                objtmp["keyCode"] = 39;
                var objtmp3 = new Object();
                objtmp3["objeto"] = d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]);
                objtmp3["maximos_resultados"] = d(glconfiguracion_general_auto[id_texto]["glid_control_auto"]).maximos_resultados;
                objtmp["target"] = objtmp3;

                consulta_autocompletar(objtmp);

                glconfiguracion_general_auto[id_texto]["glposicion"] = -1;
                var m1 = 0;
                while (m1 < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
                    if (m1 == glconfiguracion_general_auto[id_texto]["glposicion"]) {
                        d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "clasesobre";
                        d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "clasesobre");
                    }
                    else {
                        //    alert("gwhistoricop_tr_" + m1);
                        if (m1 % 2 == 0) {
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "itemlista");
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "itemlista";
                        }
                        else {
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "alternolista");
                            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "alternolista";
                        }
                    }

                    m1++;
                }

                d(div1).style.display = "none";
            }
            return false;
        }

    }

    var arrdatos_encontrados = fauto_completar3(gltratamiento, gltratamiento_buscar, objeto.value, maximos_resultados,
        div1, columna, serial, true, "", columna, "",
        funcion, "", "", "", grilla, arreglo_columnas, funcion, serial, id_texto);

    glconfiguracion_general_auto[id_texto]["datos"] = arrdatos_encontrados;
    // var arrdatos_encontrados = fauto_completar3(gltratamiento, gltratamiento_buscar, objeto.value, maximos_resultados,
    //   "divautocontactos", "detalle_tra", "serial_tra", true, "", "detalle_tra", "",
    //   "funcion_clic_auto", "", "", "", grilla);
}
function borra_auto(id_texto) {
    var m1 = 0;
    while (m1 < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
        if (m1 == glconfiguracion_general_auto[id_texto]["glposicion"]) {
            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "clasesobre");
            d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "clasesobre";
        }
        else {
            //    alert("gwhistoricop_tr_" + m1);
            if (m1 % 2 == 0) {
                d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "itemlista");
                d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "itemlista";
            }
            else {
                d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).setAttribute("class", "alternolista");
                d(glconfiguracion_general_auto[id_texto]["glgrilla_auto"] + "_tr_" + m1).className = "alternolista";
            }
        }
        m1++;
    }
}

function borra_auto_pre(id_texto) {
    var m1 = 0;
    while (m1 < glconfiguracion_general_auto[id_texto]["glcantidad_encontrados"]) {
        if (m1 == glconfiguracion_general_auto[id_texto]["glposicion"]) {
            var llave_dato = glconfiguracion_general_auto[id_texto]["glarrecontrados"][m1]["value"];
            var id_div = "div_" + id_texto + "_fila_" + llave_dato;
            d(id_div).style.backgroundColor = "#EFEFEF";
        }
        else {

            var llave_dato = glconfiguracion_general_auto[id_texto]["glarrecontrados"][m1]["value"];
            var id_div = "div_" + id_texto + "_fila_" + llave_dato;
            d(id_div).style.backgroundColor = "";
        }
        m1++;
    }
}
function fauto_completar2(arrdatos, arrdatos_arreglado, dato_buscar,
   maximos_resultados, divpinta, nombre, llave, pordefecto, tabla, datos_nombre,
   nombre_foto, funcion_clic, nombre_columna, dato_llave, nombre_columna_llave,
   ancho_autocompletar, id_texto

   ) {
    
   
    glultima_cantidad_auto = 0;
    d(divpinta).style.display = "block";

    var arrdatos_encontrados = new Array();
    var encontro_valor = false;
      
    var dtv = new vista(gldatoscombo[nombre_columna], "['" + datos_nombre + "']=='" + dato_buscar + "'", '', '');

    if (dtv.length > 0) {
        encontro_valor = true;
        var objresultado2= new Object();
        objresultado2[dtv[0][llave]] = dtv[0][llave];
        arrdatos_encontrados = pinta_autocompletar2(arrdatos, objresultado2, divpinta, nombre, llave, dato_llave);
       
    }

    if (encontro_valor == false) {
        var objresultado = busca_autocompletar(arrdatos_arreglado, dato_buscar, maximos_resultados, 1, {});
        objresultado = busca_adicional(arrdatos_arreglado, dato_buscar, maximos_resultados, objresultado);
        arrdatos_encontrados = pinta_autocompletar2(arrdatos, objresultado, divpinta, nombre, llave, dato_llave);
    }

    if (pordefecto == true) {
        var n = 0;
        while (n < arrdatos_encontrados.length) {
            //guarda_dato_img_ses

            if (nombre_foto != "") {
                var ruta = ruta = "../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave];
                if (sessionStorage[arrdatos_encontrados[n][llave]] == undefined) {
                    guarda_dato_img_ses("../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave], arrdatos_encontrados[n][llave]);
                }
                else
                    ruta = sessionStorage[arrdatos_encontrados[n][llave]];

                var imagen = "<div style='height:37px; border-radius: 8px; overflow:hidden; display:inline-block'><img  width='40px' src='" + ruta + "'/></div>";
                d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                    "<div onclick='selecciono_auto  (" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
            }
            else {
                //d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                // "<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
                d("div_" + nombre + "_" + arrdatos_encontrados[n][llave] + "_" + dato_llave).innerHTML =
                "<div  id='" + "div_" + id_texto + "_fila_" + arrdatos_encontrados[n][llave] + "' onmouseover='movio_en_auto2(" +'"'+ id_texto +'"'+ ","+n+")'  onclick='selecciono_auto2(" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ',"' + nombre_columna + '"' + ',"' + tabla + '"' + ',"' + dato_llave + '"' + ',"' + nombre_columna_llave + '"' + ")' class='div_autocompletar'><div style='display:inline-block; width:" + ancho_autocompletar + "; position:relative; top:0px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";


            }
            n++;
        }
    }

    return arrdatos_encontrados;
}

function movio_en_auto2(id_texto,n)
{
    glconfiguracion_general_auto[id_texto]["glposicion"] = n;
    borra_auto_pre(id_texto);
    return false;
}

function fauto_completar(arrdatos, arrdatos_arreglado, dato_buscar,
maximos_resultados, divpinta, nombre, llave, pordefecto, tabla, datos_nombre, nombre_foto, funcion_clic

) {

    glultima_cantidad_auto = 0;
    d(divpinta).style.display = "block";
    var objresultado = busca_autocompletar(arrdatos_arreglado, dato_buscar, maximos_resultados, 1, {});
    objresultado = busca_adicional(arrdatos_arreglado, dato_buscar, maximos_resultados, objresultado);
    var arrdatos_encontrados = pinta_autocompletar(arrdatos, objresultado, divpinta, nombre, llave);


    if (pordefecto == true) {
        var n = 0;
        while (n < arrdatos_encontrados.length) {
            //guarda_dato_img_ses

            if (nombre_foto != "") {
                var ruta = ruta = "../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave];
                if (sessionStorage[arrdatos_encontrados[n][llave]] == undefined) {
                    guarda_dato_img_ses("../Manejadores/ver_imagen.aspx?tab=" + tabla + "&llav=" + llave + "&camp=foto&val=" + arrdatos_encontrados[n][llave], arrdatos_encontrados[n][llave]);
                }
                else
                    ruta = sessionStorage[arrdatos_encontrados[n][llave]];

                var imagen = "<div style='height:37px; border-radius: 8px; overflow:hidden; display:inline-block'><img  width='40px' src='" + ruta + "'/></div>";
                d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                    "<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
            }
            else {

                //d("div_contactos_" + arrdatos_encontrados[n][llave]).innerHTML =
                // "<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ")' class='div_autocompletar'>" + imagen + "<div style='display:inline-block; width:120px; position:relative; top:-15px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";
                d("div_" + nombre + "_" + arrdatos_encontrados[n][llave]).innerHTML =
"<div onclick='selecciono_auto(" + '"' + arrdatos_encontrados[n][llave] + '"' + ',"' + divpinta + '"' + ',"' + funcion_clic + '"' + ")' class='div_autocompletar'><div style='display:inline-block; width:200px; position:relative; top:0px; margin-left:5px;'>" + arrdatos_encontrados[n][datos_nombre] + "</div></div>";


            }
            n++;
        }
    }

    return arrdatos_encontrados;
}


function selecciono_auto(serial, divpinta, funcion_clic) {
    d(divpinta).style.display = "none";
    eval(funcion_clic + "('" + serial + "')");
    // alert(serial);
}
function selecciono_auto2(serial, divpinta, funcion_clic, nombre_columna, tabla, dato_llave, nombre_columna_llave) {
    for (k in glconfiguracion_general_auto) {
        if (d(glconfiguracion_general_auto[k]["div_auto"])!=undefined)
        d(glconfiguracion_general_auto[k]["div_auto"]).style.display = "none";
    }
    d(divpinta).style.display = "none";
    eval(funcion_clic + "('" + serial + "'" + "," + "'" + nombre_columna + "'" + "," + "'" + tabla + "'" + "," + "'" + dato_llave + "'" + "," + "'" + nombre_columna_llave + "'" + ")")
    // alert(serial);
}
function busca_adicional(arrdatos, dato_buscar, maximos_resultados, objresultado) {

    if (glultima_cantidad_auto < maximos_resultados) {

        var arrpartido = partir_palabra_rapida(String(dato_buscar));
        var m = 0;
        while (m < arrpartido.length) {

            var evcan = cantidad_obj_encontrados(objresultado);
            if (evcan < maximos_resultados) {
                if (arrpartido[m].length > Math.floor(String(dato_buscar).length / 2))
                    objresultado = busca_autocompletar(arrdatos, arrpartido[m], maximos_resultados, 2, objresultado);
            }
            else {
                m = arrpartido.length;
            }
            m++;
        }

    }
    return objresultado;
}
function cantidad_obj_encontrados(objeto_par) {
    var cantidad_enc = 0;
    for (k in objeto_par) {
        cantidad_enc++;
    }
    return cantidad_enc;
}
function pinta_autocompletar(datos_completos, objresultado, divpinta, nombre, serial) {
    alert(serial);
    var arrdatos_encontrados = new Array();
    for (k in objresultado) {
        var dtv = new vista(datos_completos, "['" + serial + "']=='" + k + "'", '', '');
        if (dtv.length > 0) {
            var objfila = new Object();
            for (k2 in dtv[0]) {
                objfila[k2] = dtv[0][k2];
            }
            arrdatos_encontrados[arrdatos_encontrados.length] = objfila;
        }
    }
    var n = 0;
    var htmldiv = "";
    while (n < arrdatos_encontrados.length) {
        htmldiv = htmldiv + "<div id='div_" + nombre + "_" + arrdatos_encontrados[n][serial] + "_" + serial + "'></div>"
        n++;
    }
    d(divpinta).innerHTML = htmldiv;
    return arrdatos_encontrados;

}

function pinta_autocompletar2(datos_completos, objresultado, divpinta, nombre, serial, dato_llave) {


    var arrdatos_encontrados = new Array();
    for (k in objresultado) {
        var dtv = new vista(datos_completos, "['" + serial + "']=='" + k + "'", '', '');
        if (dtv.length > 0) {
            var objfila = new Object();
            for (k2 in dtv[0]) {
                objfila[k2] = dtv[0][k2];
            }
            arrdatos_encontrados[arrdatos_encontrados.length] = objfila;
        }
    }
    var n = 0;
    var htmldiv = "";
    while (n < arrdatos_encontrados.length) {
        htmldiv = htmldiv + "<div id='div_" + nombre + "_" + arrdatos_encontrados[n][serial] + "_" + dato_llave + "'></div>"
        n++;
    }
    d(divpinta).innerHTML = htmldiv;
    return arrdatos_encontrados;

}
function arregla_datos2(arrdatos, arrcamposbusca, datollave) {
    //ejemplo arrcamposbusca ["nick","nombre","email"]
    var arrdato = new Array();
    var arrserial = new Array();
    var arrdato_columna = new Array();


    var objdatos_formato = new Object();

    var n = 0;
    while (n < arrdatos.length) {
        var m = 0
        while (m < arrcamposbusca.length) {
            var arrpartido = partir_palabra_rapida(String(arrdatos[n][arrcamposbusca[m]]));

            var ipart = 0;
            while (ipart < arrpartido.length) {
                arrdato[arrdato.length] = String(arrpartido[ipart]).toLocaleLowerCase();
                arrserial[arrserial.length] = arrdatos[n][datollave];
                arrdato_columna[arrdato_columna.length] = arrcamposbusca[m];
                ipart++;
            }

            m++;
        }
        n++;
    }
    objdatos_formato["dato"] = arrdato;
    objdatos_formato["serial"] = arrserial;
    objdatos_formato["dato_columna"] = arrdato_columna;

    return objdatos_formato;
}

function arregla_datos(arrdatos, arrcamposbusca, datollave) {
    //ejemplo arrcamposbusca ["nick","nombre","email"]
    var arrdato = new Array();
    var arrserial = new Array();
    var arrdato_columna = new Array();


    var objdatos_formato = new Object();

    var n = 0;
    while (n < arrdatos.length) {
        var m = 0
        while (m < arrcamposbusca.length) {
            var arrpartido = partir_palabra(String(arrdatos[n][arrcamposbusca[m]]));

            var ipart = 0;
            while (ipart < arrpartido.length) {
                arrdato[arrdato.length] = String(arrpartido[ipart]).toLocaleLowerCase();
                arrserial[arrserial.length] = arrdatos[n][datollave];
                arrdato_columna[arrdato_columna.length] = arrcamposbusca[m];
                ipart++;
            }

            m++;
        }
        n++;
    }
    objdatos_formato["dato"] = arrdato;
    objdatos_formato["serial"] = arrserial;
    objdatos_formato["dato_columna"] = arrdato_columna;

    return objdatos_formato;
}
function partir_palabra(palabra, arreglo_datos) {

    var arrtmp = new Array();
    var iprmax = 0;
    while (iprmax < palabra.length) {
        var ipr = 0;
        while (ipr < palabra.length - iprmax) {
            arrtmp[arrtmp.length] = palabra.substr(iprmax, palabra.length - ipr - iprmax);
            ipr++;
        }
        iprmax++;
    }
    return arrtmp;
}

function partir_palabra_rapida(palabra, arreglo_datos) {
    var arrtmp = new Array();
    var iprmax = 0;
    var ipr = 0;
    while (ipr < palabra.length - iprmax) {
        arrtmp[arrtmp.length] = palabra.substr(iprmax, palabra.length - ipr - iprmax);
        ipr++;
    }
    iprmax++;

    return arrtmp;
}
function busca_autocompletar(datos_buscar, dato_buscar, maximos_resultados, tipo, objeto_resultado_acum) {

    //Explicacion objdatos_formato
    //dato	serial	dato_columna
    //c	1	nick
    //ce	1	nick
    //cea	1	nick
    //ceac	1	nick
    //ceacbo	1	nick
    //c	1	nombre
    //ce	1	nombre
    //cesa	1	nombre
    //cesar	1	nombre
    //cesar 	1	nombre
    //cesar a	1	nombre
    //cesar ac	1	nombre
    //cesar aco	1	nombre
    //cesar acos	1	nombre
    //cesar acost	1	nombre
    //cesar acosta	1	nombre
    //c	1	email
    //ca	1	email
    //cac	1	email
    //caco	1	email
    //cacos	1	email
    //cacosta@	1	email
    //cacosta@g	1	email

    dato_buscar = String(dato_buscar).toLocaleLowerCase();

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) { return i; }
            }
            return -1;
        }
    }

    var objresultado = new Object();
    var n = 0;
    var cantidad_encontrados = 0;
    var indicebsq = 0;
    while ((cantidad_encontrados < maximos_resultados) && (indicebsq != -1) && (n < datos_buscar["dato"].length)) {
        indicebsq = datos_buscar["dato"].indexOf(dato_buscar, n);

        if (indicebsq != -1) {

            if (tipo == 1) {
                if (objresultado[datos_buscar["serial"][indicebsq]] == null) {
                    objresultado[datos_buscar["serial"][indicebsq]] = datos_buscar["serial"][indicebsq];
                    cantidad_encontrados++;
                }
            }
            else {
                if (objeto_resultado_acum[datos_buscar["serial"][indicebsq]] == null) {
                    objeto_resultado_acum[datos_buscar["serial"][indicebsq]] = datos_buscar["serial"][indicebsq];
                    cantidad_encontrados++;
                }
            }

            n = indicebsq;
        }
        n++;
    }



    glultima_cantidad_auto = cantidad_encontrados;
    if (tipo == 1)
        return objresultado;
    else
        return objeto_resultado_acum;

}
//  guarda_dato_img(filaurl, ref);
function guarda_dato_img_ses(ruta, ref) {

    getImgBase64(ruta, function (base64) {

        sessionStorage[ref] = base64;
    })
};
function guarda_dato_img(imag, ref) {

    getImgBase64(imag, function (base64) {
        localStorage[ref] = base64;
    })
};
function getImgBase64(imagen, callback) {


    var img = document.createElement('img'),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    img.src = imagen;

    img.addEventListener('load', function () {

        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        callback(canvas.toDataURL('image'));
    }, false);
}

function ejecuta_carrusel() {

    var initPhotoSwipeFromDOM = function (gallerySelector) {

        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                el,
                childElements,
                thumbnailEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {
                el = thumbElements[i];

                // include only element nodes
                if (el.nodeType !== 1) {
                    continue;
                }

                childElements = el.children;

                size = el.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    author: el.getAttribute('data-author')
                };

                item.el = el; // save link to element for getThumbBoundsFn

                if (childElements.length > 0) {
                    item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                    if (childElements.length > 1) {
                        item.title = childElements[1].innerHTML; // caption (contents of figure)
                    }
                }


                var mediumSrc = el.getAttribute('data-med');
                if (mediumSrc) {
                    size = el.getAttribute('data-med-size').split('x');
                    // "medium-sized" image
                    item.m = {
                        src: mediumSrc,
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                }
                // original image
                item.o = {
                    src: item.src,
                    w: item.w,
                    h: item.h
                };

                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };

        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function (el) {
                return el.tagName === 'A';
            });

            if (!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode;

            var childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
            params = {};

            if (hash.length < 5) { // pid=1
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            if (!params.hasOwnProperty('pid')) {
                return params;
            }
            params.pid = parseInt(params.pid, 10);
            return params;
        };

        var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {
                index: index,

                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.children[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                },

                addCaptionHTMLFn: function (item, captionEl, isFake) {
                    if (!item.title) {
                        captionEl.children[0].innerText = '';
                        return false;
                    }
                    captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
                    return true;
                }

            };


            options.mainClass = 'pswp--minimal--dark';
            options.barsSize = { top: 0, bottom: 0 };
            options.captionEl = false;
            options.fullscreenEl = false;
            options.shareEl = false;
            options.bgOpacity = 0.85;
            options.tapToClose = false;
            options.tapToToggleControls = false;


            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);


            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            gallery.listen('beforeResize', function () {

                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;


                if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                    if (!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }

                } else {
                    if (useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }

                if (imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }

                if (firstResize) {
                    firstResize = false;
                }

                imageSrcWillChange = false;

            });

            gallery.listen('gettingData', function (index, item) {
                if (useLargeImages) {
                    item.src = item.o.src;
                    item.w = item.o.w;
                    item.h = item.o.h;
                } else {
                    item.src = item.m.src;
                    item.w = item.m.w;
                    item.h = item.m.h;
                }
            });

            gallery.init();
        };

        // select all gallery elements
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid > 0 && hashData.gid > 0) {
            openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
        }
    };

    initPhotoSwipeFromDOM('.demo-gallery');

};

function pinta_carrusel(objdatos) {
    var divpapa = objdatos["div"];
    var div_plantilla = objdatos["div_plantilla"];
    var fuente_img = objdatos["fuente"];

    var div_prin = document.createElement("div");
    div_prin.setAttribute("class", "demo-gallery");
    div_prin.setAttribute("id", "demo-test-gallery");
    div_prin.setAttribute("data-pswp-uid", "1");

    d(divpapa).innerHTML = "";
    var n = 0;
    while (n < fuente_img.length) {
        var a1 = document.createElement("a");
        a1.setAttribute("id", "serial_img_" + fuente_img[n]["serial"]);
        a1.setAttribute("href", fuente_img[n]["url"]);
        a1.setAttribute("data-size", fuente_img[n]["ancho"] + "x" + fuente_img[n]["alto"]);

        var ruta = fuente_img[n]["url_thumb"];
        try {
            if (sessionStorage[divpapa + "_" + fuente_img[n]["serial"]] == undefined)
                guarda_dato_img_ses(ruta, divpapa + "_" + fuente_img[n]["serial"]);
            else
                ruta = sessionStorage[divpapa + "_" + fuente_img[n]["serial"]];
        }
        catch (err) {
        }
        //   var htmlr = "<img width='40px' src='" + ruta + "'/>";

        a1.setAttribute("data-med", fuente_img[n]["url"]);
        a1.setAttribute("data-med-size", fuente_img[n]["ancho"] + "x" + fuente_img[n]["alto"]);
        a1.setAttribute("data-author", "");
        //   a1.setAttribute("class", "demo-gallery__img--main");
        var img1 = document.createElement("img");
        img1.setAttribute("src", ruta);
        img1.setAttribute("alt", "");
        var figure1 = document.createElement("figure");
        figure1.innerHTML = "";

        a1.appendChild(img1);
        a1.appendChild(figure1);
        div_prin.appendChild(a1);


        n++;
    }
    d(divpapa).appendChild(div_prin);


    var texto_plantilla = "<div id='gallery' class='pswp' tabindex='-1' role='dialog' aria-hidden='true'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__bg'></div>";
    texto_plantilla = texto_plantilla + "<div class='pswp__scroll-wrap'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__container' style='transform: translate3d(-3190px, 0px, 0px);'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__item' style='display: block; transform: translate3d(4785px, 0px, 0px);'><div class='pswp__zoom-wrap' style='transform: translate3d(116px, 0px, 0px) scale(0.745079662605436);'><img class='pswp__img' src='' style='-webkit-backface-visibility: hidden; opacity: 1; width: 1600px; height: 1067px;'></div></div>";
    texto_plantilla = texto_plantilla + "<div class='pswp__item' style='transform: translate3d(1595px, 0px, 0px);'><div class='pswp__zoom-wrap' style='transform: translate3d(116px, 0px, 0px) scale(0.74438202247191);'><img class='pswp__img' src='' style='-webkit-backface-visibility: hidden; opacity: 1; width: 1600px; height: 1068px;'></div></div>";
    texto_plantilla = texto_plantilla + "<div class='pswp__item' style='display: block; transform: translate3d(3190px, 0px, 0px);'><div class='pswp__zoom-wrap' style='transform: translate3d(777px, 199px, 0px) scale(0.106875);'><img class='pswp__img' src='' style='-webkit-backface-visibility: hidden; opacity: 1; width: 1600px; height: 1067px;'></div></div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "<div class='pswp__ui pswp__ui--fit pswp__ui--hidden'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__top-bar'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__counter'>3 / 5</div>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--close' title='Close (Esc)'></button>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--share pswp__element--disabled' title='Share'></button>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--fs pswp__element--disabled' title='Toggle fullscreen'></button>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--zoom' title='Zoom in/out'></button>";
    texto_plantilla = texto_plantilla + " <div class='pswp__preloader'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__preloader__icn'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__preloader__cut'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__preloader__donut'></div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";

    texto_plantilla = texto_plantilla + "<!-- <div class='pswp__loading-indicator'><div class='pswp__loading-indicator__line'></div></div> -->";
    texto_plantilla = texto_plantilla + "<div class='pswp__share-modal pswp__single-tap pswp__share-modal--hidden pswp__element--disabled'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__share-tooltip'><a href='' target='_blank' class='pswp__share--facebook'>Share on Facebook</a><a href='' target='_blank' class='pswp__share--twitter'>Tweet</a><a href='http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fphotoswipe.com%2F%23%26gid%3D1%26pid%3D3&media=https%3A%2F%2Ffarm4.staticflickr.com%2F3902%2F14985871946_24f47d4b53_h.jpg&description=This%20is%20dummy%20caption.%20It%20is%20not%20meant%20to%20be%20read.' target='_blank' class='pswp__share--pinterest'>Pin it</a><a href='' target='_blank' class='pswp__share--download' download=''>Download image</a></div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--arrow--left' title='Previous (arrow left)'></button>";
    texto_plantilla = texto_plantilla + "<button class='pswp__button pswp__button--arrow--right' title='Next (arrow right)'></button>";
    texto_plantilla = texto_plantilla + "<div class='pswp__caption pswp__element--disabled'>";
    texto_plantilla = texto_plantilla + "<div class='pswp__caption__center'>This is dummy caption. It is not meant to be read.<br><small>Photo: Ales Krivec</small></div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";
    texto_plantilla = texto_plantilla + "</div>";
    d(div_plantilla).innerHTML = texto_plantilla;
    ejecuta_carrusel();
}