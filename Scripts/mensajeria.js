
$(document).ready(function () {
    carga_inicio_pre();

}
        );
var glpagina_activa = true;
var glvista_dt = false;
var glcompleta = false;
function carga() {

    if (parent.location.pathname == "/ModGenerico/mensajeria.aspx")
        glcompleta = true;

  

    window.onscroll = function (evt) {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);

        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 60) {
            d("th_gwmensajes").style.position = "fixed";
            d("th_gwmensajes").style.top = "0px";

        }
        else {
            d("th_gwmensajes").style.position = "";
            d("th_gwmensajes").style.top = "";
        }
        //    alert(top);
        //alert("1");
    }

    // alert("cargo");
    var spath = String(parent.location.pathname);
    var arr1 = spath.split("/");
    var archivo_ubicado = arr1[arr1.length - 1];
    var ver_icono_completa = true;
    if (archivo_ubicado == "mensajeria.aspx")
        ver_icono_completa = false;

    if (ver_icono_completa == true) {
        // d("cuadroppal").style.width = "88%";
    }

    document.addEventListener('visibilitychange', function (event) {
        if (!document.hidden) {
            glpagina_activa = true;
            //    alert(glpagina_activa);

        } else {
            glpagina_activa = false;
            //alert(glpagina_activa);
        }
    });
    var arr_iconos_msj = [
        {
            serial_icono: 1,
            nombre: "Pendiente",
            funcion: "filtro_msj"
        },
        {
            serial_icono: 2,
            nombre: "Nuevo",
            funcion: "nuevo_msj"
        },
        {
            serial_icono: 3,
            nombre: "Buscar",
            funcion: "bsq_msj"
        },
        {
            serial_icono: 4,
            nombre: "Completa",
            funcion: "completa_msj"
        }
    ];

    var n = 0;
    while (n < arr_iconos_msj.length) {

        if ((arr_iconos_msj[n]["funcion"] != "completa_msj") || (ver_icono_completa == true)) {
            var icono1 = new iconojava();
            icono1.objpropiedades = {
                serial: arr_iconos_msj[n]["serial_icono"],
                nombre: arr_iconos_msj[n]["nombre"],
                ubicacion: "",
                con_imagen: "",
                color_fondo_arr: ["white"],
                color_letra_arr: ["blue", "red", "orange"],
                color_borde_arr: ["rgb(196, 230, 211)"],
                borde_ancho: "2",
                fuente: arr_iconos_msj,
                tamano_icono: 60,
                funcion_clic_dato: arr_iconos_msj[n]["funcion"],
                id: "icono_msj"
            };
            var linkico = icono1.bind(); //Devuelve un link, imagen + texto
            linkico.style.display = "inline-block";
            linkico.id = "icono_" + arr_iconos_msj[n]["serial_icono"];
            var divpapa = document.createElement("div");
            divpapa.id = "div_papa_" + arr_iconos_msj[n]["serial_icono"];
            divpapa.style.outline = "0px";
            divpapa.style.border = "0px";
            divpapa.style.padding = "0px";
            divpapa.style.margin = "0px";
            divpapa.style.position = "relative";
            divpapa.style.display = "inline-block";
            divpapa.appendChild(linkico);

            d("div_iconos").style.display = "inline-block";
            d("div_iconos").appendChild(divpapa);
        }
        n++;
    }

    //d("txt_mensaje").onkeyup = function (ev) {
    //    var key;
    //    var isShift;
    //    if (window.event) {
    //        key = window.event.keyCode;
    //        isShift = window.event.shiftKey ? true : false;
    //    } else {
    //        key = ev.which;
    //        isShift = ev.shiftKey ? true : false;
    //    }

    //    if (((key == 13) && (glletraoprimida == 16))) {

    //    }
    //    else if (key == 13) {
    //        crea_mensaje_pre();
    //        return false;
    //    }
    //    glletraoprimida = key;
    //}


    //d("txt_mensaje").onkeyup = function (ev) {
    //    glletraoprimida = "";
    //}

    d("txt_mensaje").addEventListener("keydown", ejecuta_msj_puro, false);
    d("txt_mensaje").onkeyup = function (ev) {
        if (glenter_activo_puro == true) {
            d("drpttipoquejas").focus();
            var men = d("txt_mensaje").value;
            var men2 = "";
            if (men.length > 0) {
                var ultm = men.substr(men.length - 1, 1);
                var num = ultm.charCodeAt();
                //alert(num);
                men2 = men;
                if (num == 10)
                    men2 = men2.substr(0, men2.length - 1);
            }
            else
                men2 = men;

            d("txt_mensaje").value = men2;
            crea_mensaje_pre();
        }
        //alert("saa");
        glletraoprimida = "";
    }

    d("txt_mensaje_dt").addEventListener("keydown", ejecuta_msj, false);
    d("txt_mensaje_dt").onkeyup = function (ev) {
        if (glenter_activo_dt == true)
            crear_mensaje_dt();
        glletraoprimida_dt = "";
    }


    d("txt_mensaje_detalle").addEventListener("keydown", ejecuta_msj_detalle, false);
    d("txt_mensaje_detalle").onkeyup = function (ev) {
        if (glenter_activo_dt_detalle == true)
            crear_mensaje_dt_detalle();
        glletraoprimida_dt_detalle = "";
    }
    d("txt_mensaje_reasigna").addEventListener("keydown", ejecuta_msj_reasigna, false);
    d("txt_mensaje_reasigna").onkeyup = function (ev) {
        if (glenter_activo_dt_reasigna == true)
            crear_mensaje_dt_reasigna();
        glletraoprimida_dt_reasigna = "";
    }

    d("txt_mensaje_cerrar").addEventListener("keydown", ejecuta_msj_cerrar, false);
    d("txt_mensaje_cerrar").onkeyup = function (ev) {
        if (glenter_activo_dt_cerrar == true)
            crear_mensaje_dt_cerrar();
        glletraoprimida_dt_cerrar = "";
    }

    d("txt_mensaje_escalo").addEventListener("keydown", ejecuta_msj_escalar, false);
    d("txt_mensaje_escalo").onkeyup = function (ev) {
        if (glenter_activo_dt_escalar == true)
            crear_mensaje_dt_escalo();
        glletraoprimida_dt_escalar = "";
    }

    d("txt_mensaje_reabirir").addEventListener("keydown", ejecuta_msj_reabrir, false);
    d("txt_mensaje_reabirir").onkeyup = function (ev) {
        if (glenter_activo_dt_reabirir == true)
            crear_mensaje_dt_reabrir();
        glletraoprimida_dt_reabrir = "";
    }
    //txt_mensaje_detalle
    call_sgu(carga_cantidad_primera_post, [[{}]], "consultar_cantidad", "mensajeria");

}

function carga_cantidad_primera_post(respuesta) {
    var cantidad_actual = respuesta["cantidad"][0]["cantidad"];
    pinta_cantidad_noleidos(cantidad_actual);
    var vleer_mensajes = 1;
    if (sessionStorage["mensajes"] != undefined)
    {
        vleer_mensajes =0;
    }
    call_sgu(carga_datos_msj_post, [[{
        leer_mensajes: vleer_mensajes
    }]], "datos_basicos", "mensajeria");
}
//variables callcenter

function selecciona_entidad(serial_suc,nombre,serial_pais)
{
    glserial_pais = serial_pais;
    glserial_suc_seleccionado = serial_suc;
    pinta_seleccionado_js(
        {
            div_pinta: "div_clinica",
            dato: nombre,
            color_normal: "#dce9f9",
            color_sobre: "#dedde5",
            estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
            funcion_cierra: "busca_clinica"
        }
        );
    d("div_f_clinica").style.display = "block";
    d("div_clinica").style.display = "inline-block";
    d("div_autocompletar_entidad").style.display = "none";

}

function selecciona_paciente(serial_ppac, nombre) {
    glnombre_pacsel = nombre;
    // d("div_buscar_paciente").style.display = "none";
    glserial_ppacseleccionado = serial_ppac;
    pinta_seleccionado_js(
        {
            div_pinta: "div_paciente",
            dato: nombre,
            color_normal: "#dce9f9",
            color_sobre: "#dedde5",
            estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
            funcion_cierra: "busca_paciente"
        }
    );

    if (glagente_servicio == "1") {
        if (d("sp_cierra_div_paciente") != undefined)
            d("sp_cierra_div_paciente").style.display = "none";
    }
}
var gltipo_quejas;
var glagente_servicio = "";
function carga_datos_msj_post(respuesta) {

    gltipo_quejas = respuesta["tipo_quejas"];
    glagente_servicio = respuesta["servicio"][0]["agente_servicio"];
   
   // alert(glagente_servicio);
    if (respuesta["paciente"] != undefined) {
        selecciona_paciente(respuesta["paciente"][0]["serial_ppac"], respuesta["paciente"][0]["nombre"])
    }
    if (respuesta["entidad_seleccionada"] != undefined) {

        selecciona_entidad(respuesta["entidad_seleccionada"][0]["serial_suc"],
            respuesta["entidad_seleccionada"][0]["Nombre"],
            respuesta["entidad_seleccionada"][0]["serial_pais"]
            );
    }
    else {
        d("div_clinica").style.display = "none";
        d("div_autocompletar_entidad").style.display = "inline-block";
    }
    glentidades = respuesta["entidades"];
    var id_auto = "txt_entidad_trata";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "div_autocompletar_entidad",
        fuente: respuesta["entidades"],
        nombre_en_fuente: "Nombre",
        serial_en_fuente: "serial_suc",
        columnas_busqueda: ["Nombre"],
        columnas_grilla: ["Nombre"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["Nombre"],
        funcion_clic_dato: "funcion_entidad",
        estilo_grilla: "width:308px",
        tipo_columna_grilla: ["0"],
        estilo_columna_grilla: ["'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: [""],
        top_grilla: "30px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "293px",
        alto_caja_texto: "22px",

    };

    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = "Escribe la entidad";
    carga_upload();

    if (respuesta["mensajes"] != undefined)
    {
       // glultima_cantidad_mensajes = respuesta["mensajes"].length;
        //alert(glultima_cantidad_mensajes);
        glmensajes = respuesta["mensajes"];
        sessionStorage["mensajes"] = JSON.stringify(glmensajes);

        // Obtiene la informacion almacenada desde sessionStorage
        var data = sessionStorage.getItem('key');

       // var dtv1 = new vista(respuesta["mensajes"], "['leido'] == 0", '');
      //  var dtv2 = new vista(respuesta["mensajes"], "['abierto']==1", '');


        gl_ultima_noleidos = parseInt(respuesta["noleidos"][0]["noleidos"]);
        gl_ultima_abiertos = parseInt(respuesta["abiertos"][0]["abiertos"]);

       // gl_ultima_noleidos = dtv1.length;
       // gl_ultima_abiertos = dtv2.length;

        filtro_msj();
    }
    else if ((sessionStorage["mensajes"] != undefined)&&(sessionStorage["mensajes"]!=undefined))
    {
        var mensajes_str = sessionStorage["mensajes"];
        glmensajes = JSON.parse(mensajes_str);

        var dtv1 = new vista(glmensajes, "['leido'] == 0", '');
        var dtv2 = new vista(glmensajes, "['abierto']==1", '');

        gl_ultima_noleidos = dtv1.length;
        gl_ultima_abiertos = dtv2.length;

        filtro_msj();
    }


    carga_datos_msj_post_bsq(respuesta);

    glcargo_mensajeria = 1;
    if (typeof (parent.termino_mensajeria) == "function")
    {
       parent.termino_mensajeria();
    }
    if (respuesta["entidad_seleccionada"] == undefined) {
        if (glentidades.length == 1) {
            funcion_entidad(glentidades[0]["serial_suc"]);
        }
    }
    triggerpenno_leidos = setTimeout("cargar_mensajes_noleidos()", 3000);

    //clic_msj({ serial_mensajeria: 9, serial_prm_asignado: "" }, "");
}
var glcargo_mensajeria = 0;
var triggerpenno_leidos;
function cargar_mensajes_noleidos() {
    var ahora = new Date();
    var ajax = nuevoAjax();
    var url1 = "../Manejadores/mensajeria.aspx?funcion_url=consultar_cantidad&c11=" + ahora.getMilliseconds();
    ajax.open("GET", url1, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            datos = ajax.responseText;
            var arrdatos = eval("(" + datos + ")");
            pinta_cantidad_noleidos(arrdatos["cantidad"][0]["cantidad"]);
            analiza_cantidad_abiertos_leidos(arrdatos["abiertos"][0]["abiertos"], arrdatos["noleidos"][0]["noleidos"]);
            triggerpenno_leidos = setTimeout("cargar_mensajes_noleidos()", 3000);
        }
    }
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send();

}
var trigger_mensaje2;
var gl_ultima_abiertos=0;
var gl_ultima_noleidos=0;
function analiza_cantidad_abiertos_leidos(abiertos,noleidos) {
    //cantidad_abiertos_noleidos
    var nabiertos = parseInt(abiertos);
    var nnoleidos = parseInt(noleidos);

    //alert("ncantidad_abiertos_noleidos" + ncantidad_abiertos_noleidos);
    //alert("glultima_cantidad_mensajes "+glultima_cantidad_mensajes);

    if ((nabiertos != gl_ultima_abiertos) || (nnoleidos != gl_ultima_noleidos))
    {
        glmuestra_cargando = false;
        if (glfiltro_sel == true) {
            call_sgu(consulta_mensajes_post,
                [[{}]], "consultar_mensaje", "mensajeria");
        }
    }

}

function pinta_cantidad_noleidos(cantidad) {
    var cantidad_actual = cantidad;
    if (d("sp_numero_mensaje2") == undefined) {
        parent.d("sp_numero_mensaje1").innerText = cantidad_actual;
        parent.d("sp_numero_mensaje2").innerText = cantidad_actual;

        if (cantidad_actual != 0) {
            parent.d("div_icono_mensaje2").style.display = "block";
            parent.d("div_numero_menu").style.backgroundColor = "red";
            parent.d("div_numero_menu").style.color = "white";
        }
        else {
            parent.d("div_icono_mensaje2").style.display = "none";
            parent.d("div_numero_menu").style.backgroundColor = "white";
            parent.d("div_numero_menu").style.color = "black";
        }
    }
    else {

        d("sp_numero_mensaje1").innerText = cantidad_actual;
        d("sp_numero_mensaje2").innerText = cantidad_actual;

        if (cantidad_actual != 0) {
            d("div_icono_mensaje2").style.display = "block";
            d("div_numero_menu").style.backgroundColor = "red";
            d("div_numero_menu").style.color = "white";
        }
        else {
            d("div_icono_mensaje2").style.display = "none";
            d("div_numero_menu").style.backgroundColor = "white";
            d("div_numero_menu").style.color = "black";
        }
    }
}
var glenter_activo_puro = false;
var glenter_activo_dt = false;
var glenter_activo_dt_detalle = false;
var glenter_activo_dt_reasigna = false;
var glenter_activo_dt_cerrar = false;
var glenter_activo_dt_escalar = false;
var glenter_activo_dt_reabirir = false;

var glletraoprimida_dt = "";
var glletraoprimida_dt_detalle = "";
var glletraoprimida_dt_reasigna = "";
var glletraoprimida_dt_cerrar = "";
var glletraoprimida_dt_escalar = "";
var glletraoprimida_dt_reabrir = "";


function ejecuta_msj_puro(ev) {
    glenter_activo_puro = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida == 16))) {

    }
    else if (key == 13) {
        glenter_activo_puro = true;

        return false;
    }
    glletraoprimida = key;

    return false;
}

function ejecuta_msj(ev) {
    glenter_activo_dt = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt = true;

        // return false;
    }
    glletraoprimida_dt = key;

    return false;
}
function ejecuta_msj_detalle(ev) {
    glenter_activo_dt_detalle = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt_detalle == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt_detalle = true;

        // return false;
    }
    glletraoprimida_dt_detalle = key;
    return false;
}
function ejecuta_msj_reasigna(ev) {

    glenter_activo_dt_reasigna = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt_reasigna == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt_reasigna = true;

        // return false;
    }
    glletraoprimida_dt_reasigna = key;
    return false;
}
function ejecuta_msj_cerrar(ev) {

    glenter_activo_dt_cerrar = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt_cerrar == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt_cerrar = true;

        // return false;
    }
    glletraoprimida_dt_cerrar = key;
    return false;
}
function ejecuta_msj_escalar(ev) {

    glenter_activo_dt_escalar = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt_escalar == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt_escalar = true;

        // return false;
    }
    glletraoprimida_dt_escalar = key;
    return false;
}



function ejecuta_msj_reabrir(ev) {

    glenter_activo_dt_reabirir = false;
    var key;
    var isShift;
    if (window.event) {
        key = window.event.keyCode;
        isShift = window.event.shiftKey ? true : false;
    } else {
        key = ev.which;
        isShift = ev.shiftKey ? true : false;
    }

    if (((key == 13) && (glletraoprimida_dt_reabrir == 16))) {

    }
    else if (key == 13) {
        glenter_activo_dt_reabirir = true;

        // return false;
    }
    glletraoprimida_dt_reabrir = key;
    return false;
}
var glentidades;
var glletraoprimida = "";


var glenter_activo_dt_detalle = "";

var glserial_suc_seleccionado = "-1";
var glserial_pais = "-1";
var glserial_ppacseleccionado = "-1";

var glserial_suc_seleccionado_bsq = "-1";
var glserial_ppacseleccionado_bsq = "-1";
var glserial_pais_bsq = "-1";
var glserial_suc_seleccionado_dt = "-1";
var glserial_ppacseleccionado_dt = "-1";
var glserial_pais_dt = "-1";

var glserial_suc_seleccionado_dt_real = "-1";
var glserial_ppacseleccionado_dt_real = "-1";
var glserial_pais_dt_real = "-1";


var glnivel_actual = "";
var glserial_prm_crea = "-1";
var glserial_prm_asignado= "-1";
function crea_mensaje_pre() {
    //dhtmlx.message({
    //    type: "confirm",
    //    text: "¿Esta seguro que sea crear el mensaje?",
    //    ok:"Si", cancel:"No",
    //    callback: function (result) { 
    //        if(result==true)
    //        {
    //            crea_mensaje();
    //        }
    //    }
    //});


    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                $("#dialog-confirm").dialog('close');
                crea_mensaje();
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                // callback(false);
            }
        }
    });
    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crea_mensaje();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}


function pinta_quejas(origen) {
    //alert(JSON.stringify(respuesta["tipo_quejas"]));
   //   var dtv = new vista(arr[1], "['serial_atencion']==1", 'D', 'Descripcion', 'true');
   
    var dtv_quejas = gltipo_quejas;
    if (glserial_pais != "-1") {
        dtv_quejas = dtv_quejas = new vista(dtv_quejas, "['serial_pais']==" + glserial_pais, '', '');

        if (origen == undefined) {
            dtv_quejas = new vista(dtv_quejas, "['tipoPQR']!=5", '', '');
            var dtv_quejas1 = new vista(dtv_quejas, "['tipoPQR']!=6", '', '');
            dtv_quejas = dtv_quejas1;
        }
        else if (origen=="1")
        {
            var dtv_tipoqueja = new vista(gltipo_quejas, "['tipoPQR']==" + "5", '', '');
            dtv_tipoqueja = new vista(dtv_tipoqueja, "['serial_pais']==" + glserial_pais, '', '');
        }
        else if (origen == "3")
        {
            dtv_quejas = new vista(dtv_quejas, "['tipoPQR']!=5", '', '');
            var dtv_quejas1 = new vista(dtv_quejas, "['tipoPQR']!=6", '', '');
            dtv_quejas = dtv_quejas1;
        }
        else if (origen == "4") {
         
        }
        //if (respuesta["tipo_quejas"] != undefined)
        {
            var dtv1 = new vista(dtv_quejas, "", 'A', 'Descripcion');

            d("div_f_quejas").style.display = "block";
            var combo = new combojava();
            combo.id = "drpttipoquejas";
            combo.estilo = "drp";
            combo.propiedades = "width:310px";
            //combo.propiedades = "";
            combo.div = "div_tipo_quejas";
            combo.fuente = dtv1;
            combo.datovalor = "serial_tqueja";
            combo.datotexto = "Descripcion";
            combo.evento = "onchange=cambio_tqueja()";
            combo.fuenteinicial = [{ "serial_tqueja": -1, "Descripcion": "..Seleccione.." }];
            combo.bind();

        }

        if (origen == "1")
        {
            if (dtv_tipoqueja.length > 0) {
                seleccionar_combof("drpttipoquejas", dtv_tipoqueja[0]["serial_tqueja"], "");
            }
            d("drpttipoquejas").disabled = "disabled";
        }

    }
}

function pinta_quejas_bsq() {
   // if (respuesta["tipo_quejas"] != undefined)
    
    var dtv_quejas = dtv_quejas = new vista(gltipo_quejas, "['serial_pais']==" + glserial_pais_bsq, '', '');
    {
        var dtv1 = new vista(dtv_quejas, "", 'A', 'Descripcion');

        d("div_f_quejas_bsq").style.display = "block";
        var combo = new combojava();
        combo.id = "drpttipoquejas_bsq";
        combo.estilo = "drp";
        combo.propiedades = "width:327px";
        //combo.propiedades = "";
        combo.div = "div_tipo_quejas_bsq";
        combo.fuente = dtv1;
        combo.datovalor = "serial_tqueja";
        combo.datotexto = "Descripcion";
        //combo.evento = "onchange=cambio_tqueja()";
        combo.fuenteinicial = [{ "serial_tqueja": -1, "Descripcion": "..Seleccione.." }];
        combo.bind();

    }
}

function selecciona_paciente_bsq(serial_ppac,nombre)
{
    glnombre_pacsel = nombre;
    
    // d("div_buscar_paciente").style.display = "none";
    glserial_ppacseleccionado_bsq = serial_ppac;
    //glserial_suc_seleccionado_bsq = serial_ppac;
    pinta_seleccionado_js(
        {
            div_pinta: "div_paciente_bsq",
            dato: nombre,
            color_normal: "#dce9f9",
            color_sobre: "#dedde5",
            estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
            funcion_cierra: "busca_paciente_bsq"
        }
    );
}

function selecciona_clinica_bsq(serial_suc, Nombre,serial_pais)
{
    glserial_suc_seleccionado_bsq = serial_suc;
    glserial_pais_bsq = serial_pais;
    pinta_seleccionado_js(
        {
            div_pinta: "div_clinica_bsq",
            dato: Nombre,
            color_normal: "#dce9f9",
            color_sobre: "#dedde5",
            estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
            funcion_cierra: "busca_clinica_bsq"
        }
        );
    d("div_f_clinica_bsq").style.display = "block";
    d("div_clinica_bsq").style.display = "inline-block";
    d("div_autocompletar_entidad_bsq").style.display = "none";

}


function carga_datos_msj_post_bsq(respuesta) {

    pinta_quejas_bsq();

    if (respuesta["paciente"] != undefined) {
        selecciona_paciente_bsq(respuesta["paciente"][0]["serial_ppac"], respuesta["paciente"][0]["nombre"])
    }
    if (respuesta["entidad_seleccionada"] != undefined) {
        selecciona_clinica_bsq(respuesta["entidad_seleccionada"][0]["serial_suc"],
            respuesta["entidad_seleccionada"][0]["Nombre"],
            respuesta["entidad_seleccionada"][0]["serial_pais"]
            );
    }
    else {
        d("div_clinica_bsq").style.display = "none";
        d("div_autocompletar_entidad_bsq").style.display = "inline-block";
    
    }
    glentidades = respuesta["entidades"];
    var id_auto = "txt_entidad_trata_bsq";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "div_autocompletar_entidad_bsq",
        fuente: respuesta["entidades"],
        nombre_en_fuente: "Nombre",
        serial_en_fuente: "serial_suc",
        columnas_busqueda: ["Nombre"],
        columnas_grilla: ["Nombre"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["Nombre"],
        funcion_clic_dato: "funcion_entidad_bsq",
        estilo_grilla: "width:330px",
        tipo_columna_grilla: ["0"],
        estilo_columna_grilla: ["'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: [""],
        top_grilla: "30px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "310px",
        alto_caja_texto: "20px",

    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = "Escribe la entidad";

}


function funcion_entidad(serial) {
    var dtv = new vista(glentidades, "['serial_suc']==" + serial, '', '');
    if (dtv.length > 0) {
        glserial_suc_seleccionado = serial;
        glserial_pais = dtv[0]["serial_pais"];

        pinta_seleccionado_js(
            {
                div_pinta: "div_clinica",
                dato: dtv[0]["Nombre"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_clinica"
            }
            );
        d("div_clinica").style.display = "inline-block";
        d("div_autocompletar_entidad").style.display = "none";

        pinta_quejas();

        //call_sgu(pinta_quejas, [[{
        //    serial_pais: dtv[0]["serial_pais"]

        //}]], "tipos_quejas", "mensajeria");
    }

}

function funcion_entidad_bsq(serial) {
    var dtv = new vista(glentidades, "['serial_suc']==" + serial, '', '');
    if (dtv.length > 0) {
        glserial_suc_seleccionado_bsq = serial;
        glserial_pais_bsq = dtv[0]["serial_pais"];

        pinta_seleccionado_js(
            {
                div_pinta: "div_clinica_bsq",
                dato: dtv[0]["Nombre"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_clinica_bsq"
            }
            );
        d("div_clinica_bsq").style.display = "inline-block";
        d("div_autocompletar_entidad_bsq").style.display = "none";

        pinta_quejas_bsq();


    }

}
function busca_clinica(div_pinta) {
    d(div_pinta).style.display = "none";
    glserial_suc_seleccionado = "-1";
    glserial_pais = "-1";
    d("div_autocompletar_entidad").style.display = "inline-block";
}

function busca_clinica_bsq(div_pinta) {
    d(div_pinta).style.display = "none";
    glserial_suc_seleccionado_bsq = "-1";
    glserial_pais_bsq = "-1";
    d("div_autocompletar_entidad_bsq").style.display = "inline-block";
}

var glmensajeriaqueja = new Object();
var glhoras_limite = "";
var glserial_tsuc = "";

function cambio_tqueja() {
    var serial_tqueja = d("drpttipoquejas").options[d("drpttipoquejas").selectedIndex].value;
    

    var dtv1 = new vista(gltipo_quejas, "['serial_tqueja']==" + serial_tqueja, '', '');
    if (dtv1.length > 0) {
        glhoras_limite = dtv1[0]["horalimite"];
        glserial_tsuc = dtv1[0]["serial_tsuc"];

        if (dtv1[0]["llamar_paciente"] == "1")
            d("checkbox_llamar_pac").checked = true;
        else
            d("checkbox_llamar_pac").checked = false;


        if (dtv1[0]["tipoPQR"] == "4") {
            if (glmensajeriaqueja["mensajeria_promotor"] == undefined) {
                clearTimeout(triggerpen);
                glmuestra_cargando = true;
               // parent.d("vcargando").style.display = "block";

                call_sgu(carga_mensajeria_promotor, [[{}]], "mensajeria_promotor", "mensajeria");
            }
            else {
                pinta_mensajeria_promotor(glmensajeriaqueja["mensajeria_promotor"]);
            }
        }

        else
            d("div_promotor_queja").style.display = "none";
    }
    else
        d("div_promotor_queja").style.display = "none";
}
function carga_mensajeria_promotor(respuesta) {
    glmensajeriaqueja = respuesta;
    pinta_mensajeria_promotor(glmensajeriaqueja["mensajeria_promotor"]);
}
function pinta_mensajeria_promotor(datos) {
    parent.d("vcargando").style.display = "none";
    d("div_promotor_queja").style.display = "block";
    var id_auto = "txt_mensajeria_promotor";

    if (d("txt_mensajeria_promotor") == null) {

        glconfiguracion_general_auto[id_auto] =
        {
            id_texto: id_auto,
            div: "div_promotor_queja_auto",
            fuente: datos,
            nombre_en_fuente: "nombre_completo",
            serial_en_fuente: "serial_prm",
            columnas_busqueda: ["clinica", "nombre_completo"],
            columnas_grilla: ["clinica", "nombre_completo"],
            id_cuerpo_pagina: "cuerpo",
            datos_enviados_selecciona_teclado: ["nombre_completo"],
            funcion_clic_dato: "funcion_clic_promotor_msj",
            estilo_grilla: "width:308px",
            tipo_columna_grilla: ["0", "0"],
            estilo_columna_grilla: ["'width: 120px; text-align:center;font-family:Tahoma;font-size:14px;'",
                "'width: 120px; text-align:center; font-family:Tahoma; font-size:14px;'"],
            funcion_columna_grilla: ["", ""],
            top_grilla: "30px",
            left_grilla: "0px",
            maximos_resultados: 5,
            ancho_caja_texto: "293px",
            alto_caja_texto: "22px",

        };
        auto_completar_inicio(id_auto);
    }

    d(id_auto).placeholder = "Escribe el nombre del usuario";

    //tmp1
    //triggerpen = setTimeout("consulta_mensaje()", 5000);

}
var glserial_promotor_seleccionado = "-1";
function funcion_clic_promotor_msj(serial) {

    var dtv1 = new vista(glmensajeriaqueja["mensajeria_promotor"], "['serial_prm']==" + serial, '', '');
    if (dtv1.length > 0) {
        glserial_promotor_seleccionado = serial;
        d("txt_mensajeria_promotor").value = dtv1[0]["nombre_completo"];
    }
    else {
        glserial_promotor_seleccionado = "-1";
    }

}
function cambio_tpais() {

}

function cambio_tpais_post(respuesta) {
    d("div_f_clinica").style.display = "block";
}
var glnuevo = false;
function completa_msj() {
    parent.document.location = "../ModGenerico/mensajeria.aspx";
    // alert(parent.location);
}

function nuevo_msj(serial, origen) {

    pinta_quejas(origen);

    if (origen == undefined) {
        d("txt_mensaje").value = "";
        d("drpttipoquejas").disabled = "";
        d("drpttipoquejas").selectedIndex = 0;
        glserial_dtr = "null";
    }
    else if (origen == "3")
    {
        d("txt_mensaje").value = "";
        d("drpttipoquejas").disabled = "";
        d("drpttipoquejas").selectedIndex = 0;
    }

    d("div_buscar_msj").style.display = "none";


    if (d("div_caja3_papa") != null)
        d("div_caja3_papa").style.display = "none";

    if (glnuevo == false) {

        nuevo_aux(serial);
    }
    else {
        d("div_nuevo").style.display = "none";
        glnuevo = false;
    }
}
function nuevo_aux(serial) {

    if (d("div_caja2") == null) {

        var mensaje1 = new mensajejava();
        mensaje1.objpropiedades = {
            div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
            id_caja: "div_caja" + serial,
            tamano_triangulo_borde: "20px",
            tamano_triangulo_interno: "18px",
            borde_caja: "2px",
            color_borde: "#dedde5",
            color_fondo: "white",
            tamano_sobra: "4px",
            top_caja: "90px",
            left_caja: "-100px",
            alto_caja: "370px",
            ancho_caja: "500px",
            radio_borde_caja: "6px",
            ubicacion_triangulo: "26%",
            flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
            elemento_evento: "icono_" + serial,
            eventos_muestra: ["click"],
            eventos_oculta: ["click"],
            inicia_activo: true
        };
        mensaje1.bind();
    }
    glnuevo = true;
    glbuscar = false;
    d("div_nuevo").style.display = "block";
}

function seleccion_paciente(origen) {

    glorigen_bsq = origen;
    var serial_suc = "";
    if (origen == "1")
        serial_suc = glserial_suc_seleccionado;
    else if (origen == "2")
        serial_suc = glserial_suc_seleccionado_bsq;
    else if (origen == "3")
        serial_suc = glserial_suc_seleccionado_dt;

    if (serial_suc == "-1")
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Debe seleccionar la entidad"
        });
    else
        ver_modal("div_buscar_paciente");

    // d("div_buscar_paciente").style.display = "block";
    return false;
}

function buscar_paciente() {

    var vserial_suc = "";

    if (glorigen_bsq == "1")
        vserial_suc = glserial_suc_seleccionado;
    else if (glorigen_bsq == "2")
        vserial_suc = glserial_suc_seleccionado_bsq;
    else
        vserial_suc = glserial_suc_seleccionado_dt;

    d("txt_buscar_paciente").style.borderColor = "";

    var vtiene_letras = 0;
    var cadena = String(d("txt_buscar_paciente").value);
    var n = 0;
    while (n < cadena.length) {
        var ascii = cadena.charCodeAt(0);
        if ((ascii < 48) || (ascii > 57)) {
            if (ascii != 32)
                vtiene_letras = 1;
        }

        n++;
    }


    var msj = "";
    if (d("txt_buscar_paciente").value == "") {
        msj = msj + "Debe digitar el criterio de busqueda</br>";
        d("txt_buscar_paciente").style.borderColor = "red";
    }
    //if (String(d("txt_buscar_paciente").value).length < 6) {
    //    msj = msj + "Debe digitar al menos 6 caracteres</br>";
    //    d("txt_buscar_paciente").style.borderColor = "red";
    //}
    if (msj == "") {
        objsiempremuestracargando["busqueda_paciente"] = "1";
        call_sgu(encontro_paciente, [[{
            serial_suc: vserial_suc,
            busqueda: d("txt_buscar_paciente").value,
            tiene_letras: vtiene_letras
        }]], "busqueda_paciente_app", "mensajeria");
    }
}

function encontro_paciente(respuesta) {
    if (respuesta["maximo"][0]["maximo"] == "1")
        d("sp_maximo").style.display = "block";
    else
        d("sp_maximo").style.display = "none";

    //if (respuesta["Table"].length > 0)
    //    d("div_pacientes_papa").style.display = "block";
    //else
    //    d("div_pacientes_papa").style.display = "none";

    var arrpaciente = respuesta["Table"];
    var arrpaciente_unico = new Array();
    var objpaciente = new Object();
    var n = 0;
    while (n < arrpaciente.length) {
        if (objpaciente[arrpaciente[n]["serial_ppac"]] == undefined) {
            objpaciente[arrpaciente[n]["serial_ppac"]] = "1";
            var objp = new Object();
            for (k in arrpaciente[n]) {
                objp[k] = arrpaciente[n][k];
            }
            arrpaciente_unico[arrpaciente_unico.length] = objp;
        }
        n++;
    }

    var grilla = new grillajava();
    grilla.fuente = arrpaciente_unico;
    grilla.div = "div_pacientes";
    grilla.id = "gwpacientes"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Nombre Paciente", "Identificación", "Carnet", "Fecha Vigencia", "Estado", "Entidad", "Plan"];
    grilla.datoscolumnas = ["nombre_paciente", "cedula_pac", "nocarnet", "fecha_vigencia", "serial_pac", "aseguradora", "nombre_emp"];
    grilla.tipocolumna = ["2", "0", "0", "1", "1", "0", "0"];
    grilla.funcioncolumna = [["consulta_pac", "clic_pac"], "", "", "fun_fvigencia", "fun_estado", "", "", ""];
    grilla.estilocolumna = ["'width: 30%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
        "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
        "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
         "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
        "'width: 12%; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
        "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 50px; text-align:center; '"];
    grilla.bind();



    var n = 0;
    while (n < arrpaciente_unico.length) {

        if ((arrpaciente_unico[n]["cartera"] == "1") || (arrpaciente_unico[n]["activo"] == "False")) {
            $("#gwpacientes_tr_" + n + "_td_0 #opcion_sega")[0].style.cursor = "default";
            $("#gwpacientes_tr_" + n + "_td_0 #opcion_sega")[0].style.textDecoration = "none";
            $("#gwpacientes_tr_" + n + "_td_0 #opcion_sega")[0].setAttribute("href", "#");
        }
        n++;
    }
}
function fun_estado(fila, dato) {
    var estado = "<span id='sp_estado_" + fila["serial_ppac"] + "'>Activo</span>";
    if (fila["activo"] == "False") {
        var fecha_exclusion = String(fila["fecha_exclusion"]);
        var ind1 = fecha_exclusion.indexOf(" ");
        if (ind1 != -1)
            fecha_exclusion = fecha_exclusion.substr(0, ind1);

        estado = "<span  id='sp_estado_" + fila["serial_ppac"] + "'>Excluido en " + fecha_exclusion + "</span>";
    }
    else if (fila["cartera"] == "1") {
        estado = "<span  id='sp_estado_" + fila["serial_ppac"] + "'>Inactivo</span>";
    }
    return estado;
}
function fun_fvigencia(fila, dato) {
    var fecha_vigencia = String(fila["fecha_vigencia"]);
    var ind1 = fecha_vigencia.indexOf(" ");
    if (ind1 != -1)
        fecha_vigencia = fecha_vigencia.substr(0, ind1);

    return fecha_vigencia;

}
var glorigen_bsq = "0";
function consulta_pac(fila, dato) {
    return dato;
}
var glnombre_pacsel = "";
var glnentidad = "";
function clic_pac(fila, dato) {
    glnombre_pacsel = fila["nombre_paciente"];
    if (glorigen_bsq == "1") {
        ocultar_modal("div_buscar_paciente");

        // d("div_buscar_paciente").style.display = "none";
        glserial_ppacseleccionado = fila["serial_ppac"];
        pinta_seleccionado_js(
            {
                div_pinta: "div_paciente",
                dato: fila["nombre_paciente"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_paciente"
            }
            );
    }
    else if (glorigen_bsq == "2") {
        ocultar_modal("div_buscar_paciente");
        // d("div_buscar_paciente").style.display = "none";
        glserial_ppacseleccionado_bsq = fila["serial_ppac"];
        pinta_seleccionado_js(
            {
                div_pinta: "div_paciente_bsq",
                dato: fila["nombre_paciente"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_paciente_bsq"
            }
            );
    }
    else {
        ocultar_modal("div_buscar_paciente");
        //  d("div_buscar_paciente").style.display = "none";
        glserial_ppacseleccionado_dt = fila["serial_ppac"];
        pinta_seleccionado_js(
            {
                div_pinta: "div_paciente_detalle",
                dato: fila["nombre_paciente"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_paciente_detalle"
            }
            );
    }
}
function busca_paciente() {
    glserial_ppacseleccionado = "-1";
    d("div_paciente").innerHTML = "<a style='color:#00994C; width:350px; font-family:Tahoma; font-size:13px;' href='#' onclick='seleccion_paciente(1)'>Clic para Seleccionar Paciente</a>";
}
function busca_paciente_bsq() {
    glserial_ppacseleccionado_bsq = "-1";
    d("div_paciente_bsq").innerHTML = "<a style='color:#00994C; width:350px; font-family:Tahoma; font-size:13px;' href='#' onclick='seleccion_paciente(2)'>Clic para Seleccionar Paciente</a>";
}
var gllargo_nuevo = 107;
var glcarchivos = 0;

var myForm;
var myForm_dt;
function carga_upload() {

    dhtmlXForm_titulo = "Selecionar el archivo a cargar";
    dhtmlXForm_titulo2 = "Arrastre o haga clic  </br> para selecionar el archivo";
    var formData = [
        {
            type: "fieldset", label: "Archivos", inputHeight: 50, list: [
               {
                   type: "upload", name: "myFiles", inputWidth: 335,
                   url: "../php/dhtmlxform_item_upload.ashx",
                   swfPath: "uploader.swf",
                   swfUrl: "../php/dhtmlxform_item_upload.ashx",
                   autoStart: "true"
               }
            ]
        }
    ];
    myForm = new dhtmlXForm("divupload", formData);
    myForm.attachEvent("onUploadCancel", function (realName) {
        alert("s");

    });
    myForm.attachEvent("onFileRemove", function (realName) {
        if (glcarchivos <= 1) {
            d("div_caja2_papa").style.height = "370px";
        }
        glcarchivos--;
    });
    myForm.attachEvent("onUploadComplete", function (files) {
        $("#divupload .button_browse")[0].title = "Examinar";
        $("#divupload .button_browse")[0].style.right = "79px";
        $("#divupload .button_upload")[0].title = "Subir Archivo";
        $("#divupload .button_upload")[0].style.display = "none";
        $("#divupload .button_clear")[0].title = "Limpiar Lista";

        var arr1 = $(".dhx_file_delete");
        var n = 0;
        while (n < arr1.length) {
            $(".dhx_file_delete")[n].title = "Remover de la lista";
            n++;
        }


        //alert(arr1.length);
    });
    myForm.attachEvent("onFileAdd", function (realName) {
        glcarchivos++;
        if (glcarchivos > 1) {
            var largo = (glcarchivos - 1) * 25 + 340;
            // alert(largo);
            d("div_caja2_papa").style.height = largo + "px";
        }
    });
    $(".button_info")[0].style.width = "201px";

}

var glcon_usuario = 0;
function crea_mensaje() {


    var serial_tqueja = "-1";
    if (d("drpttipoquejas") != undefined) {
        serial_tqueja = d("drpttipoquejas").options[d("drpttipoquejas").selectedIndex].value;
        d("drpttipoquejas").style.borderColor = "";

    }
    var completo_xusu = 1;
    var dtv1 = new vista(gltipo_quejas, "['serial_tqueja']==" + serial_tqueja, '', '');
    if (dtv1.length > 0) {
        if (dtv1[0]["tipoPQR"] == "4") {
            glcon_usuario = 1;
            var dtv2 = new vista(glmensajeriaqueja["mensajeria_promotor"],
                "['nombre_completo']=='" + d("txt_mensajeria_promotor").value + "'", '', '');

            if (dtv2.length == 0) {
                completo_xusu = 0;
            }
        }
    }


    var msj = "";
    if (serial_tqueja == "-1") {
        msj = msj + "Debe seleccionar el tipo de queja</br>";
        if (d("drpttipoquejas") != undefined)
            d("drpttipoquejas").style.borderColor = "red";
    }


    if (completo_xusu == 0) {
        msj = msj + "Debe seleccionar un usuario</br>";
    }
    if (glserial_suc_seleccionado == "-1") {
        msj = msj + "Debe seleccionar la entidad</br>";
    }
    d("txt_mensaje").style.borderColor = "";
    if (d("txt_mensaje").value == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje").style.borderColor = "red";
    }
    if (msj == "") {
        var values2 = myForm.getFormData(true);
        crear_mensaje_def();
    }
    else {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: msj
        });

    }

}
var glserial_dtr = "null";
function crear_mensaje_def() {
    var arrmensaje_archivos = new Array();
    var values2 = myForm.getFormData(true);
    for (k in values2) {
        var ind = k.indexOf("myFiles_r_");
        if (ind != -1) {
            var obj1 = new Object();
            obj1["nombre"] = values2[k];
            arrmensaje_archivos[arrmensaje_archivos.length] = obj1;
        }
    }
    var llamar_paciente = "0";
    if (d("checkbox_llamar_pac").checked == true)
        llamar_paciente = "1";

    var arrmensaje =
        [
            {
                serial_tqueja: d("drpttipoquejas").options[d("drpttipoquejas").selectedIndex].value,
                serial_suc: glserial_suc_seleccionado,
                mensaje: d("txt_mensaje").value,
                serial_ppac: glserial_ppacseleccionado,
                abierto: 0,
                leido: 0,
                con_usuario: glcon_usuario,
                serial_prm_msj: glserial_promotor_seleccionado,
                serial_dtr: glserial_dtr,
                llamar_paciente: llamar_paciente

            }
        ];

    call_sgu(creo_mensaje_post, [arrmensaje, arrmensaje_archivos], "crear_mensaje", "mensajeria");
    //var 
    return false;
}

function creo_mensaje_post(respuesta) {
    if (respuesta["respuesta"]["correcto"] == "1") {
    
        var tipo = typeof (parent.carga_ppto);
        if (tipo == "function") {
            parent.carga_ppto();
        }
        var msjhoras = "";
        if (glserial_tsuc == "15")
        {
            msjhoras = "</br>La respuesta debe darse antes de " + glhoras_limite + " horas";
        }

        dhtmlx.alert({ title: "", type: "alert", text: "Se creo el mensaje: " + respuesta["respuesta"]["serial_mensajeria"] + " correctamente" + msjhoras });
        var myUploader = myForm.getUploader("myFiles");
        myUploader.clear();
        d("txt_mensaje").value = "";
        d("drpttipoquejas").selectedIndex = 0;
        glserial_promotor_seleccionado = "-1";

        if (d("div_caja2_papa") != null)
            d("div_caja2_papa").style.display = "none";

        d("div_nuevo").style.display = "none";
        glnuevo = false;

        if (d("txt_mensajeria_promotor") != undefined)
            d("txt_mensajeria_promotor").value = "";
    }
    else {
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "El mensaje NO se pudo registrar" });
    }
}

var glmensajes;
function pinta_mensajes_pre(datos) {

    glmensajes = datos;
    pinta_mensajes(datos)

}
var glcontador_linea = 0;
var glarrnoleidos = new Array();
function pinta_mensajes(datos) {

    glcontador_linea = 0;
    glarrnoleidos = new Array();


    var grilla = new grillajava();
    grilla.fuente = datos;
    grilla.div = "div_datos_mensajes";
    grilla.id = "gwmensajes"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    if (glcompleta == false) {
        grilla.estilotabla = "width:505px";
    }
    else
    {
        grilla.estilotabla = "width:829px";
    }
    grilla.alt
    ernolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["#", "Fecha Generación", "Generado por", "Tipo", "Abierto", "Pendiente x Leer"];
    grilla.datoscolumnas = ["serial_mensajeria", "fecha_creacion", "promotor_abre", "queja", "abierto", "leido"];
    grilla.tipocolumna = ["2", "0", "0", "1", "1", "1", "0", "0"];
    grilla.funcioncolumna = [["consulta_msj", "clic_msj"], "", "", "ftipo", "fabierto", "fleido", "", ""];

    if (glcompleta == false) {
        grilla.estilocolumna = ["'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden '",
            "'width: 70px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'",
            "'width: 60px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'",
            "'width: 122px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;;display:inline-block; height:40px;overflow:hidden'",
            "'width: 40px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;;display:inline-block; height:40px;overflow:hidden'",
            "'width: 56px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'"]

    }
    else
    {
        grilla.estilocolumna = ["'width: 60px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden '",
            "'width: 140px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'",
            "'width: 120px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'",
            "'width: 192px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;;display:inline-block; height:40px;overflow:hidden'",
            "'width: 80px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;;display:inline-block; height:40px;overflow:hidden'",
            "'width: 110px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal;display:inline-block; height:40px;overflow:hidden'"]
    }
    grilla.bind();

    var n = 0;
    while (n < datos.length) {
        d("gwmensajes_tr_"+n).style.backgroundColor = "";
        n++;
    }

    var n = 0;
    while(n<glarrnoleidos.length)
    {
        d("gwmensajes_tr_" + glarrnoleidos[n]).style.backgroundColor = "#FFCE9C";
        n++;
    }
    
}
function fabierto(fila, dato) {
    if (dato == "1")
        return "Si";
    else
        return "No";

}
function fleido(fila, dato) {

    if (dato == "0")
        glarrnoleidos[glarrnoleidos.length] = glcontador_linea;

    glcontador_linea++;

    if (dato == "1")
        return "No";
    else
        return "Si";
}
function ftipo(fila, dato) {
    var cadena1 = dato;
    if (dato.length < 35)
        return "<span title='" + fila["queja"] + "'>" + cadena1 + "</span>";
    else
        return "<span title='" + fila["queja"] + "'>" + String(cadena1).substr(0, 30) + "..." + "</span>";

}

function consulta_msj(fila, dato) {
    return "<span title='" + fila["pais"] + "'>" + dato + "</span>";;
}
var glultima_cantidad_mensajes = 0;
function consulta_mensaje() {
    // glmuestra_cargando = false;
    //call_sgu(consulta_mensajes_post, [[{ cantidad_ultima: glultima_cantidad_mensajes }]], "consultar_mensaje", "mensajeria");
}

function consulta_mensajes_post(respuesta) {

    sessionStorage["mensajes"] =  JSON.stringify(respuesta["mensajes"]);
    glmuestra_cargando = true;
    var encontro_diferencias = false;

    //glmensajes_pintados
    var n = 0;
    while (n < respuesta["mensajes"].length) {
        for (k in respuesta["mensajes"][n]) {
            var valor1 = respuesta["mensajes"][n][k];
            var valor2 = "";
            if (glmensajes.length > n)
                valor2 = glmensajes[n][k];

            if (valor1 != valor2) {
                encontro_diferencias = true;
                break;
            }
        }
        n++;
    }

    gl_ultima_noleidos = parseInt(respuesta["noleidos"][0]["noleidos"]);
    gl_ultima_abiertos = parseInt(respuesta["abiertos"][0]["abiertos"]);

    //arrdatos["abiertos"][0]["abiertos"], arrdatos["noleidos"][0]["noleidos"]
    //var dtv1 = new vista(respuesta["mensajes"], "['leido'] == 0", '');
    //var dtv2 = new vista(respuesta["mensajes"], "['abierto']==1", '');

    //gl_ultima_noleidos = dtv1.length;
    //gl_ultima_abiertos = dtv2.length;

   // glultima_cantidad_mensajes = respuesta["mensajes"].length;
    if (encontro_diferencias == true)
        pinta_mensajes_pre(respuesta["mensajes"]);
}
var ultc;
var triggerpen;
var glfiltro_sel = false;
function filtro_msj() {
    //if (glfiltro_sel == false)
    {
        clearTimeout(ultc);
        clearTimeout(triggerpen);
        d("div_msj_filtro").style.display = "inline-block";
        ultc = setTimeout("oculta_msj_filtro()", 2000);
        d("rect_icono_msj_1").style.fill = "#e4f0fe";
        d("rect_icono_msj_3").style.fill = "white";
        glfiltro_sel = true;


        //  alert(JSON.stringify(glmensajes));
        //var dtv1 = new vista(glmensajes, "['leido']==0 || ['abierto']==1", '');
        pinta_mensajes_pre(glmensajes);

        //tmp1
        //triggerpen = setTimeout("consulta_mensaje()", 5000);
    }
    //else
    //{
    //    d("rect_icono_msj_1").style.fill = "white";
    //    glfiltro_sel = false;
    //    pinta_mensajes_pre(glmensajes);
    //}


}
function oculta_msj_filtro() {
    d("div_msj_filtro").style.display = "none";
}
var glbuscar = false;
function bsq_msj(serial) {
    pinta_quejas_bsq();
    d("div_nuevo").style.display = "none";

    if (d("div_caja2_papa") != null)
        d("div_caja2_papa").style.display = "none";

    if (d("div_caja3") == null) {

        var mensaje1 = new mensajejava();
        mensaje1.objpropiedades = {
            div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
            id_caja: "div_caja" + serial,
            tamano_triangulo_borde: "20px",
            tamano_triangulo_interno: "18px",
            borde_caja: "2px",
            color_borde: "#dedde5",
            color_fondo: "white",
            tamano_sobra: "4px",
            top_caja: "90px",
            left_caja: "-100px",
            alto_caja: "360px",
            ancho_caja: "500px",
            radio_borde_caja: "6px",
            ubicacion_triangulo: "26%",
            flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
            elemento_evento: "icono_" + serial,
            eventos_muestra: ["click"],
            eventos_oculta: ["click"],
            inicia_activo: true
        };
        mensaje1.bind();
    }

    if (glbuscar == true) {
        glbuscar = false;
        d("div_buscar_msj").style.display = "none";

    }
    else {
        glbuscar = true;
        glnuevo = false;
        d("div_buscar_msj").style.display = "block";
    }
}

function buscar_mensaje() {

    var vleidos = "-1";
    if ((d("checkbox1").checked == true) && (d("checkbox2").checked == false))
        vleidos = "0";
    if ((d("checkbox1").checked == false) && (d("checkbox2").checked == true))
        vleidos = "1";

    var vabiertos = "-1";
    if ((d("checkbox3").checked == true) && (d("checkbox4").checked == false))
        vabiertos = "1";
    if ((d("checkbox3").checked == false) && (d("checkbox4").checked == true))
        vabiertos = "0";

    var arrmensaje =
       [
           {
               serial_tqueja: d("drpttipoquejas_bsq").options[d("drpttipoquejas_bsq").selectedIndex].value,
               serial_suc: glserial_suc_seleccionado_bsq,
               mensaje: d("txt_mensaje_bsq").value,
               serial_ppac: glserial_ppacseleccionado_bsq,
               radicado: d("txt_radicado").value,
               leidos: vleidos,
               abiertos: vabiertos,
               ntiquet: d("txt_ntiquet").value
           }
       ];

    call_sgu(carga_msj_filtro_post, [arrmensaje], "buscar_mensaje", "mensajeria");
}
var glmensajes_buscados = new Array();

function carga_msj_filtro_post(respuesta) {
    d("rect_icono_msj_1").style.fill = "white";
    d("rect_icono_msj_3").style.fill = "#e4f0fe";
    glfiltro_sel = false;
    pinta_mensajes(respuesta["mensajes"]);
    glmensajes_buscados = respuesta["mensajes"];
    glbuscar = false;
    d("div_buscar_msj").style.display = "none";
    d("div_caja3_papa").style.display = "none";
}
var glserial_dtr_detalle = "-1";
var gltipoqueja = "-1";
var glorigen = 0;
var glfilamensaje ;
var gldatomensaje;
var glarrvariables;
function clic_msj(fila, dato,vorigen,vasigna) {

    glserial_mensajeria_detalle_ultimo = "";
    glfilamensaje = fila;
    gldatomensaje = dato;
   
    
    var origen = 0;
    if (vorigen != undefined)
        origen = vorigen;

    var asigna = 0;
    if (vasigna != undefined)
        asigna = vasigna;

    if (fila["abierto"] == "0") {
        d("txt_mensaje_dt").disabled = "disabled";
        d("txt_mensaje_dt").placeholder = "Este mensaje se encuentra cerrado, si no esta conforme con la respuesta debe hacer clic en Reabrir";
        d("txt_mensaje_dt").style.width = "98.5%";
        d("svg_msj_dt").style.display = "none";
        //Escriba aqui su mensaje

        d("txt_mensaje_detalle").disabled = "disabled";
        d("txt_mensaje_detalle").placeholder = "Este mensaje se encuentra cerrado";
        d("txt_mensaje_detalle").style.width = "370px";
        d("svg_msj_dtcambio").style.display = "none";
        //Se realizo un cambio en la entidad o paciente


        d("txt_mensaje_cerrar").disabled = "disabled";
        d("txt_mensaje_cerrar").placeholder = "Este mensaje se encuentra cerrado";
        d("txt_mensaje_cerrar").style.width = "370px";
        d("svg_msj_cerrar").style.display = "none";
        //Escriba aqui su mensaje

        d("txt_mensaje_reasigna").disabled = "disabled";
        d("txt_mensaje_reasigna").placeholder = "Este mensaje se encuentra cerrado";
        d("txt_mensaje_reasigna").style.width = "370px";
        d("svg_msj_reas").style.display = "none";
        //Escriba aqui su mensaje


        d("txt_mensaje_escalo").disabled = "disabled";
        d("txt_mensaje_escalo").placeholder = "Este mensaje se encuentra cerrado";
        d("txt_mensaje_cerrar").style.width = "382px";
        d("svg_msj_esca").style.display = "none";
        //" Se cerró el caso";

        //Se realizo un cambio en la entidad o paciente
    }
    else {
        d("txt_mensaje_dt").disabled = "";
        d("txt_mensaje_dt").placeholder = "Escriba aqui su mensaje";
        d("txt_mensaje_dt").style.width = "100%";
        d("svg_msj_dt").style.display = "inline-block";
        //Escriba aqui su mensaje

        d("txt_mensaje_detalle").disabled = "";
        d("txt_mensaje_detalle").placeholder = "Se realizo un cambio en la entidad o paciente";
        d("txt_mensaje_detalle").style.width = "330px";
        d("svg_msj_dtcambio").style.display = "inline-block";
        //Se realizo un cambio en la entidad o paciente


        d("txt_mensaje_cerrar").disabled = "";
        d("txt_mensaje_cerrar").placeholder = "Se cerró el caso";
        d("txt_mensaje_cerrar").style.width = "330px";
        d("svg_msj_cerrar").style.display = "inline-block";
        //Escriba aqui su mensaje

        d("txt_mensaje_reasigna").disabled = "";
        d("txt_mensaje_reasigna").placeholder = "Se reasignó el caso";
        d("txt_mensaje_reasigna").style.width = "330px";
        d("svg_msj_reas").style.display = "inline-block";
        //Escriba aqui su mensaje


        d("txt_mensaje_escalo").disabled = "disabled";
        d("txt_mensaje_escalo").placeholder = "Se escaló el caso";
        d("txt_mensaje_cerrar").style.width = "330px";
        d("svg_msj_esca").style.display = "inline-block";
        //" Se cerró el caso";

    }

    glorigen = origen;
    var arrvariables = eval("(" + d("hddvariables").value + ")");
    glarrvariables = arrvariables;
    var serial_prm = d("hddserial_prm").value;
    glpagina_activa = true;
    glvista_dt = true;
    globjserial_mensaje_detalle = new Object();
    // call_sgu(carga_msj_filtro_post, [arrmensaje], "buscar_mensaje", "mensajeria");
    clearTimeout(triggerpen);
    //alert(fila["serial_mensajeria"]);
    d("div_iconos_dt").innerHTML = "";
    d("div_detalle").style.display = "none";
    // d("cuadro_detalle").innerHTML = "";
    d("cuadroppal").style.display = "none";
    d("lg_mensajeria_detalle").innerHTML = "Mensajeria Detalle - Ticket: " + fila["serial_mensajeria"];
    d("cuadro_detalle").style.display = "block";

    d("div_mensajes_detalle").innerHTML = "";
    // alert(parent.gllargo_frame_mensajeria);
    d("div_mensajes_detalle").style.height = parent.gllargo_frame_mensajeria + "px";
    d("divupload_dt").innerHTML = "";

    glserial_dtr_detalle = fila["serial_dtr"]
    gltipoqueja = fila["tipopqr"];
    
    var arr_iconos_msj_dt = [
       {
           serial_icono: 5,
           nombre: "Pendiente",
           funcion: "filtro_msj2"
       },
       {
           serial_icono: 6,
           nombre: "Detalle",
           funcion: "detalle_msj"
       },
       {

           serial_icono: 7,
           nombre: "Adjuntos",
           funcion: "adj_msj"
       },
       {
           serial_icono: 8,
           nombre: "Reasignar",
           funcion: "reas_msj"
       },
       {
           serial_icono: 9,
           nombre: "Escalar",
           funcion: "escalar_msj"
       },
       {
           serial_icono: 10,
           nombre: "Cerrar",
           funcion: "cerrar_msj"
       },
       {
           serial_icono: 11,
           nombre: "Reabrir",
           funcion: "reabrir"
       },
       {
           serial_icono: 12,
           nombre: "Tratamientos",
           funcion: "ir_plan_trata"
       }
    ];

    var n = 0;
    while (n < arr_iconos_msj_dt.length) {
        var ocultar_icono = true;

        switch (String(arr_iconos_msj_dt[n]["serial_icono"]))
        {
            case "8":
            case "9":
                if (fila["serial_prm_asignado"] == serial_prm) {
                    if ((gltipoqueja != "5") && (gltipoqueja != "6")) {
                        ocultar_icono = false;
                        d("div_cerrar").style.left = "140px";
                        d("div_reabrir").style.left = "115px";
                    }
                    else
                    {
                        ocultar_icono = true;
                        d("div_cerrar").style.left = "40px";
                        d("div_reabrir").style.left = "20px";
                    }
                }
                else {
                    ocultar_icono = true;
                    d("div_cerrar").style.left = "40px";
                    d("div_reabrir").style.left = "20px";
                }
                break;
            case "10":
                if (glserial_dtr_detalle != "0")
                {
                    if(arrvariables["permisos_promotor"][0]["auditor"]=="0")
                        ocultar_icono = true;
                    else
                        ocultar_icono = false;

                 //   ocultar_icono = true;
                }
                else
                    ocultar_icono = false;
                break;
            case "11":

                if (fila["abierto"] == "1")
                    ocultar_icono = true;
                else
                    ocultar_icono = false;

                break;
            case "12":

                if (glserial_dtr_detalle == "0")
                {
                    if((fila["serial_suc"] == "") && (fila["serial_ppac"] == ""))
                        ocultar_icono = true;
                    else
                        ocultar_icono = false;
                }
                else
                    ocultar_icono = false;
                break;

        
            default:
                ocultar_icono = false;

        }

        //if ((arr_iconos_msj_dt[n]["serial_icono"] == 9) || (arr_iconos_msj_dt[n]["serial_icono"] == 8)) {
        //    if (fila["serial_prm_asignado"] == serial_prm) {
        //        ocultar_icono = false;
        //    }
        //    else {
        //        ocultar_icono = true;
        //    }
        //}
        //else
        //    ocultar_icono = false;

        if (ocultar_icono == false)
        {
            var icono1 = new iconojava();
            icono1.objpropiedades = {
                serial: arr_iconos_msj_dt[n]["serial_icono"],
                nombre: arr_iconos_msj_dt[n]["nombre"],
                ubicacion: "",
                con_imagen: "",
                color_fondo_arr: ["white"],
                color_letra_arr: ["blue", "red", "orange"],
                color_borde_arr: ["rgb(196, 230, 211)"],
                borde_ancho: "2",
                fuente: arr_iconos_msj_dt,
                tamano_icono: 60,
                funcion_clic_dato: arr_iconos_msj_dt[n]["funcion"],
                id: "icono_msj_dt"
            };
            var linkico = icono1.bind(); //Devuelve un link, imagen + texto
          //  linkico.style.verticalAlign = "top";
            linkico.style.display = "inline-block";
            linkico.id = "icono_" + arr_iconos_msj_dt[n]["serial_icono"];
            var divpapa = document.createElement("div");
            divpapa.id = "div_papa_" + arr_iconos_msj_dt[n]["serial_icono"];
            divpapa.style.outline = "0px";
            divpapa.style.border = "0px";
            divpapa.style.padding = "0px";
            divpapa.style.margin = "0px";
            divpapa.style.position = "relative";
            divpapa.style.display = "inline-block";
            divpapa.appendChild(linkico);

            d("div_iconos_dt").style.display = "inline-block";
            d("div_iconos_dt").appendChild(divpapa);
        }
        n++;
    }

    var vasignar_caso = 0;

    if (origen == 0) {
        //El usuario al que se le escribe el mensaje directo, lee el mensaje
        //Actualiza
        if ((fila["serial_prm_abre"] != serial_prm) && (fila["serial_prm_asignado"] != "")
            && (fila["con_usuario"] == "1") && (fila["leido"] == "0")) {
            vasignar_caso = 2;
        }
            //El usuario al que se le escribe el mensaje x tipopqr, lee el mensaje x primera vez
            //Actualiza
        else if ((fila["serial_prm_abre"] != serial_prm) && (fila["serial_prm_asignado"] == "")) {
            vasignar_caso = 1;
        }
            //El usuario que escribe el mensaje, lee el mensaje y no ha sido asignado
        else if ((fila["serial_prm_abre"] == serial_prm) && (fila["serial_prm_asignado"] == "")) {
            vasignar_caso = 3;
        }
            //No c e que casos
        else if ((fila["serial_prm_abre"] == serial_prm) && (fila["fecha_creacion"] == fila["fecha_asignado"])) {
            vasignar_caso = 3;
        }
    }
    if (asigna == 1)
    {
        vasignar_caso = 1;
    }
    else if (origen == 1)
    {
        if (fila["serial_prm_asignado"]=="") {
            vasignar_caso = 3;
        }
    }
    var vleido_seguro = 0;
    if ((fila["serial_prm_asignado"] == serial_prm) && (fila["leido"] == "0"))
        vleido_seguro = 1;

    var vrevisado_seguro = 0;
    if ((fila["serial_prm_asignado"] == serial_prm) && (fila["revisado"] == "0"))
        vrevisado_seguro = 1;

     //alert(vasignar_caso);

    glserial_mensajeria = fila["serial_mensajeria"];
    glserial_suc_seleccionado_dt = fila["serial_suc"];
    glserial_pais_dt=fila["serial_pais"];
    glserial_ppacseleccionado_dt = fila["serial_ppac"];
    glserial_dtr_seleccionado_dt = fila["serial_dtr"];
    glserial_suc_seleccionado_dt_real = fila["serial_suc"];
    glserial_ppacseleccionado_dt_real = fila["serial_ppac"];
    glserial_pais_dt_real = fila["serial_pais"];
    glnivel_actual = fila["nivel"];

    glnombre_pacsel = fila["nombre_pac"] + " " + fila["apellido_pac"];
    glnentidad = fila["entidad"];
    glserial_prm_crea = fila["serial_prm_abre"];
    glserial_prm_asignado = fila["serial_prm_asignado"];
    cargar_datos_detalle();

    if (d("div_caja6_papa")!=undefined)
        d("div_caja6_papa").style.display = "none";
    if (d("div_caja7_papa") != undefined)
        d("div_caja7_papa").style.display = "none";
    if (d("div_caja8_papa") != undefined)
        d("div_caja8_papa").style.display = "none";
    if (d("div_caja9_papa") != undefined)
        d("div_caja9_papa").style.display = "none";

    glreasigno = false;
    gldetalle = false;
    glcerrar = false;
    glescalar = false;
    glreabrir = false;

    d("div_reasignar").style.display = "none";
    d("div_detalle").style.display = "none";
    d("div_escalar").style.display = "none";
    d("div_cerrar").style.display = "none";
    d("div_reabrir").style.display = "none";

    call_sgu(ver_mensajes_detalle_post,
        [[{
            leido_seguro: vleido_seguro,
            revisado_seguro:vrevisado_seguro,
            asignar_caso: vasignar_caso,
            serial_mensajeria: fila["serial_mensajeria"],
            serial_tqueja: fila["serial_tqueja"]
        }]], "mensaje_detalle", "mensajeria");

}
var glserial_mensajeria = "";


function filtro_msj2() {
    clearTimeout(gltriger);
    glvista_dt = false;
    d("cuadroppal").style.display = "block";
    d("cuadro_detalle").style.display = "none";

    d("div_detalle").style.display = "none";
    d("div_reasignar").style.display = "none";

    filtro_msj();
}
var glmensajes_unico;
var glmensajes_detalle;
var glserial_mensajeria_detalle = 0;
var globjserial_mensaje_detalle = new Object();

var glllamar_paciente = "";
var glllamar_paciente_call = "";
var glllamar_paciente_msj = "";

function cambio_llamar_paciente()
{
    var serial_tqueja = d("drpttipoquejas").options[d("drpttipoquejas").selectedIndex].value;
    var dtv_quejas = new vista(gltipo_quejas, "['serial_tqueja']==" + serial_tqueja, '', '');
    if (dtv_quejas.length > 0)
    {
        if (dtv_quejas[0]["llamar_paciente"] == "1")
            d("checkbox_llamar_pac").checked = true;
    }

    return true;
}
function ver_mensajes_detalle_post(respuesta) {

    glllamar_paciente=respuesta["mensajes_detalle"][0]["llamar_paciente"];
    glllamar_paciente_call=respuesta["mensajes_detalle"][0]["llamar_paciente_call"];
    glllamar_paciente_msj = respuesta["mensajes_detalle"][0]["llamar_paciente_msj"];

  //  alert(glllamar_paciente);
  //  alert(glllamar_paciente_call);

    if ((glllamar_paciente == "1") && (glllamar_paciente_call == "0"))
        d("div_llamar_cerrar").style.display = "block";
    else
        d("div_llamar_cerrar").style.display = "none";

    d("div_chk_llamar_paciente_det").style.display = "none";
    if ((respuesta["mensajes_detalle"][respuesta["mensajes_detalle"].length - 1]["serial_actividad_org"] != "") || (respuesta["mensajes_detalle"][respuesta["mensajes_detalle"].length - 1]["llamar_paciente"] == "1"))
    {
        d("div_chk_llamar_paciente_det").style.display = "block";
        if (respuesta["mensajes_detalle"][respuesta["mensajes_detalle"].length - 1]["llamar_paciente"] == "1") {
            d("checkbox_llamar_pac_det").checked = true;
            d("checkbox_llamar_pac_det").setAttribute("disabled", "disabled");
        }
        else
        {
            d("checkbox_llamar_pac_det").checked = false;
            d("checkbox_llamar_pac_det").removeAttribute("disabled");
        }
    }
    
    
    glserial_mensajeria_detalle = 0;
    var serial_prm = d("hddserial_prm").value;
    glmensajes_detalle = respuesta;

    if ((glserial_prm_asignado == "")&&(serial_prm!=glserial_prm_crea))
    {
        var dtvencargados_prm = new vista(glmensajes_detalle["encargados"], "['serial_prm']==" + serial_prm, '', '');
        if(dtvencargados_prm.length>0)
        {
            glserial_prm_asignado = serial_prm;
        }
    }

    cargar_datos_reasigna();
    var divprin = d("div_mensajes_detalle");
    if (glmensajes_detalle["mensajes_detalle"].length == 0) {
        var mensaje = "";
        if (glorigen == 0)
            var dtv = new vista(glmensajes, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
        if (glorigen == 1)
            var dtv = new vista(glmensajes_unico, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
        if (dtv.length > 0) {//d8f5dc
            //f6e2cd
            var divr;

            divr = arma_mensaje_bocadillo
                (0, dtv[0]["mensaje"], dtv[0]["fecha_creacion"], "", "red", true, 0, "#d8f5dc");

            divprin.appendChild(divr);
        }
    }
    else {
        var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "", 'A', 'serial_mensajeria_detalle', "true");

        var n = 0;
        while (n < dtvmensaje_detalle.length) {
            var divr;

            if (globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] == undefined) {
                if (serial_prm == dtvmensaje_detalle[n]["serial_prm"]) {

                    globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] = "1";
                    divr = arma_mensaje_bocadillo
                         (dtvmensaje_detalle[n]["serial_mensajeria_detalle"], dtvmensaje_detalle[n]["mensaje"], dtvmensaje_detalle[n]["fecha"], "", "", true, dtvmensaje_detalle[n]["leido"], "#d8f5dc");
                }
                else {
                    globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] = "1";
                    divr = arma_mensaje_bocadillo
                       (dtvmensaje_detalle[n]["serial_mensajeria_detalle"], dtvmensaje_detalle[n]["mensaje"], dtvmensaje_detalle[n]["fecha"], dtvmensaje_detalle[n]["usuario"], "brown", false, "2", "#f6e2cd");
                }

                divprin.appendChild(divr);
            }
            glserial_mensajeria_detalle = dtvmensaje_detalle[n]["serial_mensajeria_detalle"];

            n++;
        }
    }
    coloca_eliminar_msj();
    carga_upload_dt();
    $('#div_mensajes_detalle').scrollTop(1000000);
    if (glorigen==0)
        gltriger = setTimeout("revisa_leidos()", 3000);

}
var gltriger;
function arma_mensaje_bocadillo(serial, mensaje, fecha, nombre, color_nombre, derecha, leido, color_mensaje) {

    var pos1 = "";
    if (derecha == true) {
        pos1 = "right";
    }
    else {
        pos1 = "left";
    }
    var div1 = document.createElement("div");
    div1.id = "div_msjd_" + serial;

    var div2 = document.createElement("div");
    div2.style.float = pos1;
    // div2.innerHTML = "";
    div2.style.display = "inline";
    div2.style.marginTop = "5px";
    div2.style.marginBottom = "5px";
    div2.style.padding = "3px";
    div2.style.paddingBottom = "4px";
    div2.style.fontFamily = "Tahoma";
    div2.style.fontSize = "14px";
    div2.style.backgroundColor = color_mensaje;
    div2.style.position = "relative";
    div2.style.boxShadow = "rgb(136, 136, 136) 0px 1.5px 1px";
    div2.style.width = "93%";
    if (derecha == true)
        div2.style.marginRight = "10px";
    else
        div2.style.marginLeft = "10px";

        var divelim= document.createElement("div");
        //var svg_eliminar = d("svg_eliminar_msj").cloneNode(true);
        //svg_eliminar.style.display = "inline";
        //divelim.appendChild(svg_eliminar);

        divelim.style.padding = "0px";
        divelim.style.margin = "0px";
        divelim.style.display = "none";
        divelim.style.position = "relative";
        divelim.style.top = "0px";
        divelim.style.marginRight = "2px";
        divelim.id = "div_elim_" + serial;
        div2.appendChild(divelim);

    if (leido == 1) {
        var div1sobre = document.createElement("div");
        div1sobre.innerHTML = d("svgsobre2").outerHTML;
        div1sobre.style.padding = "0px";
        div1sobre.style.margin = "0px";
        div1sobre.style.display = "inline";
        div1sobre.style.position = "relative";
        div1sobre.style.top = "2px";
        div1sobre.style.marginRight = "6px";
        div1sobre.id = "div_sobre_" + serial;
        div2.appendChild(div1sobre);
    }
    else if (leido == 0) {
        var div1sobre = document.createElement("div");
        div1sobre.innerHTML = d("svgsobre").outerHTML;
        div1sobre.style.padding = "0px";
        div1sobre.style.margin = "0px";
        div1sobre.style.display = "inline";
        div1sobre.style.position = "relative";
        div1sobre.style.top = "2px";
        div1sobre.style.marginRight = "6px";
        div1sobre.id = "div_sobre_" + serial;
        div2.appendChild(div1sobre);
    }

    if (nombre != "") {
        var div1msj_titulo = document.createElement("div");
        div1msj_titulo.innerHTML = nombre;
        div1msj_titulo.style.padding = "0px";
        div1msj_titulo.style.margin = "0px";
        div1msj_titulo.style.display = "block";
        div1msj_titulo.style.fontWeight = "bold";
        div1msj_titulo.style.color = color_nombre;
        div2.appendChild(div1msj_titulo);
    }

    var div1msj = document.createElement("div");
    div1msj.innerHTML = mensaje;
    div1msj.style.padding = "0px";
    div1msj.style.margin = "0px";
    div1msj.style.display = "inline";
    div2.appendChild(div1msj);


    var div1fecha = document.createElement("div");
    div1fecha.innerHTML = fecha;
    div1fecha.style.padding = "0px";
    div1fecha.style.margin = "0px";
    div1fecha.style.display = "inline";
    div1fecha.style.float = "right";
    div1fecha.style.color = "#808080";
    div1fecha.style.fontSize = "12px";
    div1fecha.style.marginLeft = "5px";
    div1fecha.style.position = "relative";
    div1fecha.style.top = "2px";

    div2.appendChild(div1fecha);

    //   div2.style.borderBottomLeftRadius = "5px";
    //  div2.style.borderTopLeftRadius = "5px";
    div2.style.borderRadius = "2px";
    var div12 = document.createElement("div");
    div12.style.border = "solid transparent";
    div12.style.content = " ";
    div12.style.height = "0";
    div12.style.width = "0";
    div12.style.position = "absolute";
    div12.style.borderWidth = "8px";
    if (derecha == true)
        div12.style.borderLeftColor = color_mensaje;
    else
        div12.style.borderRightColor = color_mensaje;

    div12.style.marginTop = "-" + "8px";
    if (derecha == true)
        div12.style.left = "100%";
    else
        div12.style.right = "100%";

    div12.style.top = "50%";
    div12.style.float = "right";
    div12.id = "testtri";
    //div1.display

    div1.style.display = "block";
    div2.appendChild(div12);
    div1.appendChild(div2);
    //div1.style.marginTop = "20px";
    //retorna un div;

    return div1;
}

function carga_upload_dt() {

    var ancho_upload = window.screen.width * 0.8;
    dhtmlXForm_titulo = "Selecionar el archivo a cargar Arrastre o haga clic  para selecionar el archivo";
    //dhtmlXForm_titulo2 = "";
    dhtmlXForm_titulo2 = "Arrastre o haga clic  para selecionar el archivo";

    var formData = [
        {
            type: "fieldset", label: "Archivos", inputHeight: carga_upload_dt, list: [
               {
                   type: "upload", name: "myFile", inputWidth: '80%',
                   url: "../php/dhtmlxform_item_upload.ashx",
                   swfPath: "uploader.swf",
                   swfUrl: "../php/dhtmlxform_item_upload.ashx",
                   autoStart: "true"
               }
            ]
        }
    ];
    myForm_dt = new dhtmlXForm("divupload_dt", formData);
    myForm_dt.attachEvent("onUploadCancel", function (realName) {
        // alert("s");

    });
    myForm_dt.attachEvent("onFileRemove", function (realName) {
        if (glcarchivos <= 1) {
            //   d("div_caja2_papa").style.height = "340px";
        }
        // glcarchivos--;
    });
    myForm_dt.attachEvent("onUploadComplete", function (files) {
        $("#divupload_dt .button_browse")[0].title = "Examinar";
        $("#divupload_dt .button_browse")[0].style.right = "79px";
        //  $("#divupload_dt .button_browse")[0].style.left = "93%";
        $("#divupload_dt .button_upload")[0].title = "Subir Archivo";
        $("#divupload_dt .button_upload")[0].style.display = "none";
        $("#divupload_dt .button_clear")[0].title = "Limpiar Lista";
        //     $("#divupload_dt .button_clear")[0].style.left = "95%";

        var arr1 = $(".dhx_file_delete");
        var n = 0;
        while (n < arr1.length) {
            $(".dhx_file_delete")[n].title = "Remover de la lista";
            n++;
        }


        //alert(arr1.length);
    });
    myForm_dt.attachEvent("onFileAdd", function (realName) {
        // glcarchivos++;
        if (glcarchivos > 1) {
            var largo = (glcarchivos - 1) * 25 + 340;
            // alert(largo);
            //   d("div_caja2_papa").style.height = largo + "px";
        }
    });
    $("#divupload_dt")[0].style.width = "99%";
    $("#divupload_dt .dhxform_base")[0].style.width = "100%";
    $("#divupload_dt .dhxform_base")[1].style.width = "100%";
    $("#divupload_dt .button_info")[0].style.width = "60%";


}

var glubica_abajo = false;
function revisa_leidos() {

    if (glvista_dt == true) {
        if (glpagina_activa == true) {

            var serial_prm = d("hddserial_prm").value;
            var vactualiza_leidos = 0;
            var dtvmen = new vista(glmensajes, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
            if (dtvmen.length > 0) {
                var serial_prm_abre = dtvmen[0]["serial_prm_abre"];
                var serial_prm_asignado = dtvmen[0]["serial_prm_asignado"];
                if (serial_prm == serial_prm_abre) {
                    vactualiza_leidos = 1;
                }
                if (serial_prm == serial_prm_asignado) {
                    vactualiza_leidos = 2;
                }
            }

            var he1 = d("div_mensajes_detalle").scrollHeight;
            var scroll = $("#div_mensajes_detalle").scrollTop();

            var porce1 = scroll / he1;
            if (porce1 > 0.6)
                glubica_abajo = true;
            else
                glubica_abajo = false;
            //   alert(porce1);

            var arr_revisar = new Array();
            var arr_actualizar = new Array();
            var n = 0;
            var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

            while (n < dtvmensaje_detalle.length) {
                if (dtvmensaje_detalle[n]["serial_prm"] != serial_prm) {
                    arr_actualizar[arr_actualizar.length] = {
                        serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"],
                        serial_mensajeria: glserial_mensajeria,
                        actualiza_leidos: vactualiza_leidos
                    };
                }
                else {
                    arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
                }
                n++;
            }

            objnuncamuestracargando["revisa_leidos"] = "1";
            glmuestra_cargando = false;

            //var ahora = new Date();
            //var ajax = nuevoAjax();
            //var url1 = "../Manejadores/mensajeria.aspx?funcion_url=revisar_leidos&c11=" + ahora.getMilliseconds();
            //ajax.open("GET", url1, true);
            //ajax.onreadystatechange = function () {
            //    if (ajax.readyState == 4) {
            //        datos = ajax.responseText;
            //        var arrdatos = eval("(" + datos + ")");
            //        pinta_cantidad_noleidos(arrdatos["cantidad"][0]["cantidad"]);
            //        analiza_cantidad_abiertos_leidos(arrdatos["abiertos"][0]["abiertos"], arrdatos["noleidos"][0]["noleidos"]);
            //        triggerpenno_leidos = setTimeout("cargar_mensajes_noleidos()", 3000);
            //    }
            //}
            //ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //ajax.send();

            call_sgu(revisa_leidos_post, [[{
                serial_mensajeria: glserial_mensajeria,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                actualiza_leidos: vactualiza_leidos
            }], arr_actualizar, arr_revisar
            ], "revisa_leidos", "mensajeria");

        }
        else {
            gltriger = setTimeout("revisa_leidos()", 5000);
        }
    }
}
function revisa_leidos_post(respuesta) {
    glmuestra_cargando = true;
    var serial_prm = d("hddserial_prm").value;
    var divprin = d("div_mensajes_detalle");

    if ((glmensajes_detalle["mensajes_detalle"].length == 0) && (respuesta["mensajes_detalle"].length > 0))
        divprin.innerHTML = "";

    //Son los mensajes que quiero revisar, les actualizo el estado
    var m = 0;
    while (m < respuesta["actualizar_mensajes"].length) {
        if (respuesta["actualizar_mensajes"][m]["leido"] == "1") {
            var serial_mensajeria_detalle = respuesta["actualizar_mensajes"][m]["serial_mensajeria_detalle"];
            if (d("div_sobre_" + serial_mensajeria_detalle) != null)
                d("div_sobre_" + serial_mensajeria_detalle).innerHTML = d("svgsobre2").outerHTML;
        }
        m++;
    }
    var m = 0;
    while (m < respuesta["actualizar_mensajes_actualizados"].length) {
        if (respuesta["actualizar_mensajes_actualizados"][m]["leido"] == "1") {
            var serial_mensajeria_detalle = respuesta["actualizar_mensajes_actualizados"][m]["serial_mensajeria_detalle"];

            var i1 = 0;
            while (i1 < glmensajes_detalle["mensajes_detalle"].length) {
                if (glmensajes_detalle["mensajes_detalle"][i1]["serial_mensajeria_detalle"] == serial_mensajeria_detalle) {
                    glmensajes_detalle["mensajes_detalle"][i1]["leido"] = "1";
                }
                i1++;
            }
        }
        m++;
    }


    //Son los mensajes nuevos
    var dtvmensaje_detalle = new vista(respuesta["mensajes_detalle"], "", 'A', 'serial_mensajeria_detalle');
    var n = 0;
    var cantidad_nuevos = 0;
    while (n < dtvmensaje_detalle.length) {
        var divr;
        var ultimo = 0;
        if (n == dtvmensaje_detalle.length - 1)
            ultimo = 1;
        if (globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] == undefined) {
            if (serial_prm == dtvmensaje_detalle[n]["serial_prm"]) {
                globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] = "1";
                divr = arma_mensaje_bocadillo
                     (dtvmensaje_detalle[n]["serial_mensajeria_detalle"], dtvmensaje_detalle[n]["mensaje"], dtvmensaje_detalle[n]["fecha"], "", "", true, dtvmensaje_detalle[n]["leido"], "#d8f5dc", 1, ultimo);
            }
            else {
                globjserial_mensaje_detalle[dtvmensaje_detalle[n]["serial_mensajeria_detalle"]] = "1";
                divr = arma_mensaje_bocadillo
                   (dtvmensaje_detalle[n]["serial_mensajeria_detalle"], dtvmensaje_detalle[n]["mensaje"], dtvmensaje_detalle[n]["fecha"], dtvmensaje_detalle[n]["usuario"], "brown", false, "2", "#f6e2cd", 0, ultimo);
            }
            cantidad_nuevos++;
            divprin.appendChild(divr);
        }
        //Actualiza los mensajes nuevos
        glserial_mensajeria_detalle = dtvmensaje_detalle[n]["serial_mensajeria_detalle"];
        glmensajes_detalle["mensajes_detalle"][glmensajes_detalle["mensajes_detalle"].length] = dtvmensaje_detalle[n];
        n++;
    }
    if ((glubica_abajo == true) && (cantidad_nuevos > 0))
        $('#div_mensajes_detalle').scrollTop(1000000);


    var m = 0;
    while (m < respuesta["mensajes_adjuntos"].length) {
        glmensajes_detalle["mensajes_adjuntos"][glmensajes_detalle["mensajes_adjuntos"].length] = respuesta["mensajes_adjuntos"][m];
        m++;
    }
    coloca_eliminar_msj();
    
    // glmensajes_detalle = respuesta;

    gltriger = setTimeout("revisa_leidos()", 3000);

    
}
var glserial_mensajeria_detalle_ultimo = "";
function coloca_eliminar_msj()
{
    var serial_prm = d("hddserial_prm").value;

    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "", 'D', 'serial_mensajeria_detalle','true');
    if (dtvmensaje_detalle.length > 0)
    {
        var serial_mensajeria_detalle = dtvmensaje_detalle[0]["serial_mensajeria_detalle"];

    
       if (serial_mensajeria_detalle != glserial_mensajeria_detalle_ultimo) {
           $("#svg_eliminar_ultimo").detach();

           if ((dtvmensaje_detalle[0]["serial_prm"] == serial_prm)
               && (glarrvariables["permisos_promotor"][0]["auditor"] == "1")
               && (dtvmensaje_detalle[0]["leido"] == "0")
                 && (glmensajes_detalle["mensajes_detalle"].length>1)
               )
             {
              
               var divelim = document.createElement("div");
               var svg_eliminar = d("svg_eliminar_msj").cloneNode(true);
               svg_eliminar.id = "svg_eliminar_ultimo";
               svg_eliminar.style.display = "inline";
               svg_eliminar.style.cursor = "pointer";
               divelim.appendChild(svg_eliminar);

               if (d("div_elim_" + serial_mensajeria_detalle) != null) {
                   glserial_mensajeria_detalle_ultimo = serial_mensajeria_detalle;
                   d("div_elim_" + serial_mensajeria_detalle).innerHTML = divelim.innerHTML;
                   d("div_elim_" + serial_mensajeria_detalle).style.display = "inline";

                   d("div_elim_" + serial_mensajeria_detalle).autorizado_pertinencia = dtvmensaje_detalle[0]["autorizado_pertinencia"];
                   d("div_elim_" + serial_mensajeria_detalle).autorizado_postevolucion = dtvmensaje_detalle[0]["autorizado_postevolucion"];

                   d("div_elim_" + serial_mensajeria_detalle).cierre = dtvmensaje_detalle[0]["cierre"];
                   d("div_elim_" + serial_mensajeria_detalle).serial_mensajeria_detalle = serial_mensajeria_detalle;
                   d("div_elim_" + serial_mensajeria_detalle).onclick = function () {
                       call_sgu(elimina_mensaje_post, [[{
                           evalua_proc: 1,
                           cierre: this.cierre,
                           serial_mensajeria_detalle: this.serial_mensajeria_detalle,
                           autorizado_pertinencia: this.autorizado_pertinencia,
                           autorizado_postevolucion: this.autorizado_postevolucion,
                       }]
                       ], "elimina_mensaje", "mensajeria");
                       return false;
                   }
               }
           }
        }
    }
}
function elimina_mensaje_post(respuesta)
{
    var pago = respuesta["respuesta"]["pago"];
    var permite_por_estado = respuesta["respuesta"]["permite_por_estado"];
    var cierre = respuesta["respuesta"]["cierre"];
    var tiene_procedimiento = respuesta["respuesta"]["cierre"];
    var autorizado_pertinencia = respuesta["respuesta"]["autorizado_pertinencia"];
    var autorizado_postevolucion = respuesta["respuesta"]["autorizado_postevolucion"];
    var serial_mensajeria_detalle = respuesta["respuesta"]["serial_mensajeria_detalle"];
    var evalua_proc = respuesta["respuesta"]["evalua_proc"];
    var divelimina_detalle = d("div_elimina_detalle");
    divelimina_detalle.innerHTML = "";

    if ((tiene_procedimiento == true)&&(evalua_proc=="1"))
    {

        var sp1 = document.createElement("span");
        sp1.innerText = "Si elimina este mensaje, el caso quedará abierto nuevamente.";
        sp1.style.width = "400px";
        sp1.style.marginBottom = "15px";
        divelimina_detalle.appendChild(sp1);


        var autorizado = "0";
        if (gltipoqueja == "5") {
            autorizado = String(autorizado_pertinencia);
        }
        else if (gltipoqueja == "6") {
            autorizado = String(autorizado_postevolucion);
        }

        var sp3 = document.createElement("span");
        if (autorizado == "1") {

            var sp2 = document.createElement("span");
            sp2.innerText = "Eliminando este mensaje el procedimiento relacionado pierde el estado de ";
            sp2.style.width = "350px";
            sp2.style.display = "inline";
            divelimina_detalle.appendChild(sp2);

            var sp3 = document.createElement("span");
            sp3.innerText = "Autorizado";
            sp3.style.width = "350px";
            sp3.style.display = "inline";
            sp3.style.color = "blue";
            divelimina_detalle.appendChild(sp3);

            var sp3p = document.createElement("span");
            sp3p.innerText = ";";
            sp3p.style.display = "inline";
            divelimina_detalle.appendChild(sp3p);

            var sp3 = document.createElement("span");
            sp3.innerText = " por lo tanto el procedimiento debe volver a auditarse";
            sp3.style.width = "350px";
            sp3.style.fontWeight = "bold";
            sp3.style.display = "inline";
            divelimina_detalle.appendChild(sp3);
        }
        else if (autorizado == "2")
        {

            var sp2 = document.createElement("span");
            sp2.innerText = "Eliminando este mensaje el procedimiento relacionado pierde el estado de ";
            sp2.style.width = "350px";
            sp2.style.display = "inline";
            divelimina_detalle.appendChild(sp2);

            var sp3 = document.createElement("span");
            sp3.innerText = "Rechazado";
            sp3.style.width = "350px";
            sp3.style.display = "inline";
            sp3.style.color = "blue";
            divelimina_detalle.appendChild(sp3);

            var sp3p = document.createElement("span");
            sp3p.innerText = ";";
            sp3p.style.display = "inline";
            divelimina_detalle.appendChild(sp3p);

            var sp3 = document.createElement("span");
            sp3.innerText = " por lo tanto el procedimiento debe volver a auditarse";
            sp3.style.width = "350px";
            sp3.style.fontWeight = "bold";
            sp3.style.display = "inline";
            divelimina_detalle.appendChild(sp3);
        }
        if((pago==false)&&(permite_por_estado==true))
        {
            var divb = document.createElement("div");
            divb.style.display = "block";
            divb.style.width = "100%";
            divb.style.marginTop="15px";
            var a1 = document.createElement("a");
            a1.innerHTML = "Eliminar Mensaje";
            a1.style.width = "100px";
            a1.href = "#";
            a1.setAttribute("class","button grey");
            a1.onclick=function()
            {
                call_sgu(elimina_mensaje_post, [[{
                    evalua_proc: 0,
                    cierre: cierre,
                    serial_mensajeria_detalle:serial_mensajeria_detalle,
                    autorizado_pertinencia: autorizado_pertinencia,
                    autorizado_postevolucion: autorizado_postevolucion,
                }]
                ], "elimina_mensaje", "mensajeria");
                return false;
            }
            divb.appendChild(a1);
            divelimina_detalle.appendChild(divb);


        }
        else {
            if (pago == true) {
                var sp4 = document.createElement("span");
                sp4.innerText = "El Mensaje esta relacionado con un procedimiento que esta pagado y no se puede eliminar";
                 sp4.style.color = "red";
                sp4.style.display = "block";
                sp4.style.width = "100%";
                sp4.style.marginTop = "15px";
                divelimina_detalle.appendChild(sp4);
            }
            if (permite_por_estado == false) {
                var sp4 = document.createElement("span");
                sp4.innerText = "El mensaje de autorización de pertinencia no puede ser eliminado porque el procedimiento esta en proceso de pago";
                sp4.style.display = "block";
                sp4.style.width = "100%";
                sp4.style.color = "red";
                sp4.style.marginTop = "15px";
                divelimina_detalle.appendChild(sp4);
            }
        }

        //<div style="text-align:left">
        //          <a style=' width:100px' class='button grey' href='#' onclick='return buscar_mensaje()'>Buscar Mensaje</a>
        //   </div>
        ver_modal("div_elimina_msj");
    }
    else
    {
        ocultar_modal("div_elimina_msj");

        //Ya fue eliminado
        if (serial_mensajeria_detalle != "0")
        {
            $("#div_msjd_" + serial_mensajeria_detalle).detach();
            if (cierre=="1")
                glfilamensaje["abierto"] = "1";

            clearTimeout(gltriger);
            globjserial_mensaje_detalle = new Object();
            clic_msj(glfilamensaje, gldatomensaje);
        }
    }

   // alert(respuesta["respuesta"]["pago"]);
}
function crea_mensaje_pre_dt() {
    // d("txt_mensaje_dt").addEventListener("keydown", ejecuta_msj, false);
    // alert("msj");
    //dhtmlx.message({
    //    type: "confirm",
    //    text: "¿Esta seguro que sea crear el mensaje?",
    //    ok: "Si", cancel: "No",
    //    callback: function (result) {
    //        if (result == true) {
    //            crear_mensaje_def_dt();
    //        }
    //    }
    //});
    var ev = window.event;

    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                crear_mensaje_def_dt();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crear_mensaje_def_dt();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }


    return false;
}
var glposicion_max_chat = 0;
function crear_mensaje_dt() {
    var msndt = d("txt_mensaje_dt").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";
    d("txt_mensaje_dt").style.borderColor = "";
    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_dt").style.borderColor = "red";
    }
    if (msj == "") {
        crea_mensaje_pre_dt();
    }
    return false;
}

function crear_mensaje_def_dt() {

    clearTimeout(gltriger);
    var serial_prm = d("hddserial_prm").value;

    var arrmensaje_archivos = new Array();
    var values2 = myForm_dt.getFormData(true);
    for (k in values2) {
        var ind = k.indexOf("myFile_r_");
        if (ind != -1) {
            var obj1 = new Object();
            obj1["nombre"] = values2[k];
            arrmensaje_archivos[arrmensaje_archivos.length] = obj1;
        }
    }
    var actualiza_msj = "0";
    if (((glmensajes_detalle["mensajes_detalle"].length == 1)||(glmensajes_detalle["mensajes_detalle"].length == 0))&&(glserial_prm_crea==1))
    {
        actualiza_msj = "1";
    }

    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

    var vleido = 0;
    var vleido_otros = 0;

    var vrevisado = 0;
    var vrevisado_otros = 0;
    if (glserial_prm_crea == serial_prm) {
        vleido = 0;
        vleido_otros = 1;

        vrevisado = 0;
        vrevisado_otros = 1;
    }
    else if (glserial_prm_asignado == serial_prm)
    {
        vleido = 1;
        vleido_otros = 0;

        vrevisado = 1;
        vrevisado_otros = 0;
    }
    else
    {
        vleido = 0;
        vleido_otros = 0;

        vrevisado = 0;
        vrevisado_otros = 0;
    }

    var llamar_paciente = "0";
    if (d("checkbox_llamar_pac_det").checked == true)
        llamar_paciente = "1";


    var arrmensaje =
        [
            {
                serial_mensajeria: glserial_mensajeria,
                serial_suc: glserial_suc_seleccionado_dt_real,
                mensaje: d("txt_mensaje_dt").value,
                serial_ppac: glserial_ppacseleccionado_dt_real,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                leido: vleido,
                leido_otros: vleido_otros,
                actualiza_prm: actualiza_msj,
                serial_dtr: glserial_dtr_detalle,
                revisado: vrevisado,
                llamar_paciente: llamar_paciente
            }
        ];


    var arr_revisar = new Array();
    var n = 0;

    while (n < dtvmensaje_detalle.length) {
        if (dtvmensaje_detalle[n]["serial_prm"] == serial_prm) {
            arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
        }
        n++;
    }
    d("txt_mensaje_dt").value = "";
    var myUploader = myForm_dt.getUploader("myFile");
    myUploader.clear();

    call_sgu(crear_mensajes_dt_post, [arrmensaje, arr_revisar, arrmensaje_archivos], "crear_mensaje_dt", "mensajeria");
    //var 
    return false;
}


function crear_mensajes_dt_post(respuesta)
{
    var tipo = typeof (parent.carga_ppto);
    if (tipo == "function") {
        parent.carga_ppto();
    }
    revisa_leidos_post(respuesta);
}
function crear_mensaje_def_reasigna() {

    clearTimeout(gltriger);
    var serial_prm = d("hddserial_prm").value;

    var vrevisado = 0;
    var vrevisado_otros = 0;
    if (glserial_prm_crea == serial_prm) {
        vleido = 0;
        vleido_otros = 1;
    }
    else if (glserial_prm_asignado == serial_prm) {
        vleido = 1;
        vleido_otros = 0;

        vrevisado = 1;
        vrevisado_otros = 0;
    }
    else {
        vleido = 0;
        vleido_otros = 0;

        vrevisado = 0;
        vrevisado_otros = 0;
    }
    var actualiza_msj = "0";
    if (((glmensajes_detalle["mensajes_detalle"].length == 1) || (glmensajes_detalle["mensajes_detalle"].length == 0)) && (glserial_prm_crea == 1)) {
        actualiza_msj = "1";
    }

    var arrmensaje =
        [
            {
                serial_mensajeria: glserial_mensajeria,
                serial_suc: glserial_suc_seleccionado_dt_real,
                mensaje: d("txt_mensaje_reasigna").value,
                serial_ppac: glserial_ppacseleccionado_dt_real,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                leido: vleido,
                leido_otros: vleido_otros,
                serial_prm_reasigna: d("drpreasigna").options[d("drpreasigna").selectedIndex].value,
                actualiza_prm: actualiza_msj,
                revisado: vrevisado,
                serial_dtr: glserial_dtr_detalle,
            }
        ];


    var arr_revisar = new Array();
    var n = 0;
    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

    while (n < dtvmensaje_detalle.length) {
        if (dtvmensaje_detalle[n]["serial_prm"] == serial_prm) {
            arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
        }
        n++;
    }
    d("txt_mensaje_reasigna").value = "";
    d("div_caja8_papa").style.display = "none";
    d("div_reasignar").style.display = "none";
    glreasigno = false;

    call_sgu(revisa_leidos_post, [arrmensaje, arr_revisar, []], "reasignar_caso", "mensajeria");
    //var 
    return false;
}


function crear_mensaje_def_cerrar() {

    clearTimeout(gltriger);
    var serial_prm = d("hddserial_prm").value;

    var vtipo_auditoria = "0";
    if (gltipoqueja == "5")
    {
        vtipo_auditoria = "1";
    }
    else if (gltipoqueja == "6") {
        vtipo_auditoria = "2";
    }

    var vrevisado = 0;
    var vrevisado_otros = 0;
    if (glserial_prm_crea == serial_prm) {
        vleido = 0;
        vleido_otros = 1;
    }
    else if (glserial_prm_asignado == serial_prm) {
        vleido = 1;
        vleido_otros = 0;

        vrevisado = 1;
        vrevisado_otros = 0;
    }
    else {
        vleido = 0;
        vleido_otros = 0;

        vrevisado = 0;
        vrevisado_otros = 0;
    }
    var actualiza_msj = "0";
    if (((glmensajes_detalle["mensajes_detalle"].length == 1) || (glmensajes_detalle["mensajes_detalle"].length == 0)) && (glserial_prm_crea == 1)) {
        actualiza_msj = "1";
    }
    //glserial_prm_crea
    var arrmensaje =
        [
            {
                serial_mensajeria: glserial_mensajeria,
                serial_suc: glserial_suc_seleccionado_dt_real,
                mensaje: d("txt_mensaje_cerrar").value,
                serial_ppac: glserial_ppacseleccionado_dt_real,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                leido: vleido,
                leido_otros: vleido_otros,
                serial_prm_cierra: serial_prm,
                serial_dtr: glserial_dtr_detalle,
                autorizado: d("drp_autorizacion").options[d("drp_autorizacion").selectedIndex].value,
                tipo_auditoria: vtipo_auditoria,
                actualiza_prm: actualiza_msj,
                revisado: vrevisado,
                evalua_proc: 1,
                llamar_paciente_msj: glllamar_paciente_msj,
                llamar_paciente:glllamar_paciente,
                llamar_paciente_call:glllamar_paciente_call
            }
        ];


    var arr_revisar = new Array();
    var n = 0;
    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

    while (n < dtvmensaje_detalle.length) {
        if (dtvmensaje_detalle[n]["serial_prm"] == serial_prm) {
            arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
        }
        n++;
    }
    d("txt_mensaje_cerrar").value = "";
    d("div_caja10_papa").style.display = "none";
    d("div_cerrar").style.display = "none";
    glcerrar = false;

    var tipo = typeof (parent.carga_ppto);
    if (tipo == "function") {
        parent.carga_ppto();
    }
    glcerrar_ult_arr=[arrmensaje, arr_revisar, []];
    call_sgu(cerrar_caso_post, glcerrar_ult_arr, "cerrar_caso", "mensajeria");
    //var 
    return false;
}
var glcerrar_ult_arr;
function cerrar_caso_post(respuesta)
{
    
    if (respuesta["mensajes_detalle"] != undefined) {
        // crear_mensajes_dt_post(respuesta);
        ocultar_modal("div_elimina_msj");
        glfilamensaje["abierto"] = "0";
        var tipo = typeof (parent.carga_ppto);
        if (tipo == "function") {
            parent.carga_ppto();
        }
        clearTimeout(gltriger);
        clic_msj(glfilamensaje, gldatomensaje);
    }
    else {
        var divelimina_detalle = d("div_elimina_detalle");
        divelimina_detalle.innerHTML = "";

      
        var permite_cerrar = respuesta["respuesta"]["permite_cerrar"];
        var pago = respuesta["respuesta"]["pago"];
        var permite_por_estado = respuesta["respuesta"]["permite_por_estado"];
        var autorizado_audit_actual = respuesta["respuesta"]["autorizado_audit_actual"];
        var autorizado_audit_posterior_actual = respuesta["respuesta"]["autorizado_audit_posterior_actual"];
        var tipo_auditoria = respuesta["respuesta"]["tipo_auditoria"];


      
        var autorizado_actual="";
        if(tipo_auditoria=="1")
        {
            autorizado_actual=autorizado_audit_actual;
        }
        else if (tipo_auditoria == "2") {
            autorizado_actual=autorizado_audit_posterior_actual;
        }
        var cambio_estado = respuesta["respuesta"]["cambio_estado"];

        var permite_boton=true;
            

            var sp3 = document.createElement("span");
            if (cambio_estado == true) {

                var sp2 = document.createElement("span");
                sp2.innerText = "El procedimiento relacionado a este mensaje actualmente tiene el estado ";
                sp2.style.width = "350px";
                sp2.style.display = "inline";
                divelimina_detalle.appendChild(sp2);

                var sp3 = document.createElement("span");
                if (autorizado_actual == "1") {
                    sp3.innerText = "Autorizado";
                }
                else if (autorizado_actual == "2") {
                    sp3.innerText = "Rechazado";
                }

                sp3.style.width = "350px";
                sp3.style.display = "inline";
                sp3.style.color = "blue";
                divelimina_detalle.appendChild(sp3);

                var sp3p = document.createElement("span");
                sp3p.innerText = "; Al cerrar este mensaje el estado cambiara a ";
                sp3p.style.display = "inline";
                divelimina_detalle.appendChild(sp3p);

                var sp3 = document.createElement("span");
                if (autorizado_actual == "1") {
                    sp3.innerText = "Rechazado";
                }
                else if (autorizado_actual == "2") {
                    sp3.innerText = "Autorizado";
                }
                sp3.style.width = "350px";
                sp3.style.color = "blue";
                sp3.style.display = "inline";
                divelimina_detalle.appendChild(sp3);

                if (pago == true) {
                    var sp4 = document.createElement("span");
                    sp4.innerText = "El Mensaje esta relacionado con un procedimiento que esta pagado y no se puede cambiar el estado";
                    sp4.style.color = "red";
                    sp4.style.display = "block";
                    sp4.style.width = "100%";
                    sp4.style.marginTop = "15px";
                    divelimina_detalle.appendChild(sp4);
                    permite_boton = false;
                }
                if (permite_por_estado == false) {
                    var sp4 = document.createElement("span");
                    sp4.innerText = "El mensaje es de pertinencia y no puede cambiarse de estado porque el procedimiento esta en proceso de pago";
                    sp4.style.display = "block";
                    sp4.style.width = "100%";
                    sp4.style.color = "red";
                    sp4.style.marginTop = "15px";
                    divelimina_detalle.appendChild(sp4);
                    permite_boton = false;
                }

            }
            else {
                if (permite_por_estado == false) {
                    var sp4 = document.createElement("span");
                    sp4.innerText = "El mensaje es de pertinencia y el procedimiento esta en proceso de pago, solo puede seleccionar cerrar el mensaje";
                    sp4.style.display = "block";
                    sp4.style.width = "100%";
                    sp4.style.color = "red";
                    sp4.style.marginTop = "15px";
                    divelimina_detalle.appendChild(sp4);
                    permite_boton = false;
                }

                if (pago == true) {
                    var sp4 = document.createElement("span");
                    sp4.innerText = "El Mensaje esta relacionado con un procedimiento que esta pagado y no se puede cambiar el estado";
                    sp4.style.color = "red";
                    sp4.style.display = "block";
                    sp4.style.width = "100%";
                    sp4.style.marginTop = "15px";
                    divelimina_detalle.appendChild(sp4);
                    permite_boton = false;
                }
            }
            
            var divb = document.createElement("div");
            divb.style.display = "block";
            divb.style.width = "100%";
            divb.style.marginTop = "15px";
            var a1 = document.createElement("a");
            a1.innerHTML = "Cerrar Mensaje";
            a1.style.width = "100px";
            a1.href = "#";
            a1.setAttribute("class", "button grey");
            a1.onclick = function () {
                glcerrar_ult_arr[0][0]["evalua_proc"] = "0";
                call_sgu(cerrar_caso_post, glcerrar_ult_arr, "cerrar_caso", "mensajeria");

                return false;
            }
            if (permite_boton==true)
                divb.appendChild(a1);
            divelimina_detalle.appendChild(divb);
            
            ver_modal("div_elimina_msj");

           }
           

            //<div style="text-align:left">
            //          <a style=' width:100px' class='button grey' href='#' onclick='return buscar_mensaje()'>Buscar Mensaje</a>
            //   </div>
          
        
        
    
   // alert(respuesta["respuesta"]["pago"]);
}


function crear_mensaje_def_escalo() {

    clearTimeout(gltriger);
    var serial_prm = d("hddserial_prm").value;
    var vrevisado = 0;
    var vrevisado_otros = 0;

    if (glserial_prm_crea == serial_prm) {
        vleido = 0;
        vleido_otros = 1;
    }
    else if (glserial_prm_asignado == serial_prm) {
        vleido = 1;
        vleido_otros = 0;

        vrevisado = 1;
        vrevisado_otros = 0;
    }
    else {
        vleido = 0;
        vleido_otros = 0;

        vrevisado = 0;
        vrevisado_otros = 0;
    }

    var actualiza_msj = "0";
    if (((glmensajes_detalle["mensajes_detalle"].length == 1) || (glmensajes_detalle["mensajes_detalle"].length == 0)) && (glserial_prm_crea == 1)) {
        actualiza_msj = "1";
    }

    var arrmensaje =
        [
            {
                serial_mensajeria: glserial_mensajeria,
                serial_suc: glserial_suc_seleccionado_dt_real,
                mensaje: d("txt_mensaje_reasigna").value,
                serial_ppac: glserial_ppacseleccionado_dt_real,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                leido: vleido,
                leido_otros: vleido_otros,
                actualiza_prm: actualiza_msj,
                revisado: vrevisado,
                serial_dtr: glserial_dtr_detalle
            }
        ];


    var arr_revisar = new Array();
    var n = 0;
    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

    while (n < dtvmensaje_detalle.length) {
        if (dtvmensaje_detalle[n]["serial_prm"] == serial_prm) {
            arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
        }
        n++;
    }
    d("txt_mensaje_escalo").value = "";
    d("div_caja9_papa").style.display = "none";
    d("div_escalar").style.display = "none";
    glescalar = false;

    call_sgu(revisa_leidos_post, [arrmensaje, arr_revisar, []], "escalar_caso", "mensajeria");
    //var 
    return false;
}

function crear_mensaje_def_reabrir() {

    clearTimeout(gltriger);
    var serial_prm = d("hddserial_prm").value;
    var vrevisado = 0;
    var vrevisado_otros = 0;

    if (glserial_prm_crea == serial_prm) {
        vleido = 0;
        vleido_otros = 1;
    }
    else if (glserial_prm_asignado == serial_prm) {
        vleido = 1;
        vleido_otros = 0;

        vrevisado = 1;
        vrevisado_otros = 0;
    }
    else {
        vleido = 0;
        vleido_otros = 0;

        vrevisado = 0;
        vrevisado_otros = 0;
    }

    var actualiza_msj = "0";
    if (((glmensajes_detalle["mensajes_detalle"].length == 1) || (glmensajes_detalle["mensajes_detalle"].length == 0)) && (glserial_prm_crea == 1)) {
        actualiza_msj = "1";
    }

    var arrmensaje =
        [
            {
                serial_mensajeria: glserial_mensajeria,
                serial_suc: glserial_suc_seleccionado_dt_real,
                mensaje: d("txt_mensaje_reabirir").value,
                serial_ppac: glserial_ppacseleccionado_dt_real,
                serial_mensajeria_detalle: glserial_mensajeria_detalle,
                leido: vleido,
                leido_otros: vleido_otros,
                actualiza_prm: actualiza_msj,
                revisado: vrevisado,
                cerrado: 0,
                serial_dtr: glserial_dtr_detalle
            }
        ];


    var arr_revisar = new Array();
    var n = 0;
    var dtvmensaje_detalle = new vista(glmensajes_detalle["mensajes_detalle"], "['leido']==0", '', '');

    while (n < dtvmensaje_detalle.length) {
        if (dtvmensaje_detalle[n]["serial_prm"] == serial_prm) {
            arr_revisar[arr_revisar.length] = { serial_mensajeria_detalle: dtvmensaje_detalle[n]["serial_mensajeria_detalle"] };
        }
        n++;
    }
    d("txt_mensaje_reabirir").value = "";
    d("div_caja11_papa").style.display = "none";
    d("div_reabrir").style.display = "none";

    glreabrir = false;
    
    call_sgu(reabrir_post, [arrmensaje, arr_revisar, []], "reabrir_caso", "mensajeria");
  
    return false;
}
function reabrir_post(respuesta)
{
    glfilamensaje["abierto"] = "1";
    clearTimeout(gltriger);
    clic_msj(glfilamensaje, gldatomensaje);
}
var gldetalle = false;
function detalle_msj(serial) {
    d("txt_mensaje_detalle").value = "Se realizo un cambio en la entidad o paciente";
    //alert(serial);

    // d("div_buscar_msj").style.display = "none";

    if (d("div_caja8_papa") != null)
        d("div_caja8_papa").style.display = "none";

    if (d("div_caja9_papa") != null)
        d("div_caja9_papa").style.display = "none";

    if (d("div_caja10_papa") != null)
        d("div_caja10_papa").style.display = "none";

    if (d("div_caja11_papa") != null)
        d("div_caja11_papa").style.display = "none";

    if (gldetalle == false) {

        if (d("div_caja" + serial) == null) {

            var mensaje1 = new mensajejava();
            mensaje1.objpropiedades = {
                div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
                id_caja: "div_caja" + serial,
                tamano_triangulo_borde: "20px",
                tamano_triangulo_interno: "18px",
                borde_caja: "2px",
                color_borde: "#dedde5",
                color_fondo: "white",
                tamano_sobra: "4px",
                top_caja: "90px",
                left_caja: "-100px",
                alto_caja: "240px",
                ancho_caja: "500px",
                radio_borde_caja: "6px",
                ubicacion_triangulo: "26%",
                flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
                elemento_evento: "icono_" + serial,
                eventos_muestra: ["click"],
                eventos_oculta: ["click"],
                inicia_activo: true
            };
            mensaje1.bind();
        }
        d("div_papa_" + serial).style.zIndex = 1;
        gldetalle = true;
        glreasigno = false;
        glcerrar = false;
        glescalar = false;
        glreabrir = false;
        //glbuscar = false;
        d("div_detalle").style.display = "block";
        d("div_reasignar").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reabrir").style.display = "none";
    }
    else {
        d("div_detalle").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reabrir").style.display = "none";

        gldetalle = false;
        glreasigno = false;
        glcerrar = false;
        glescalar = false;
        glreabrir = false;
    }
}

function pinta_quejas_detalle(quejas) {

    var dtv1 = new vista(quejas, "", 'A', 'Descripcion');
    d("div_f_quejas_detalle").style.display = "block";
    var combo = new combojava();
    combo.id = "drpttipoquejas_detalle";
    combo.estilo = "drp";
    combo.propiedades = "width:310px";
    //combo.propiedades = "";
    combo.div = "div_tipo_quejas_detalle";
    combo.fuente = dtv1;
    combo.datovalor = "serial_tqueja";
    combo.datotexto = "Descripcion";
    //combo.evento = "onchange=cambio_tqueja()";
    combo.fuenteinicial = [{ "serial_tqueja": -1, "Descripcion": "..Seleccione.." }];
    combo.bind();
    d("drpttipoquejas_detalle").disabled = "disabled";
}
function cargar_datos_detalle() {

    if(glorigen==0)
        var dtvmen = new vista(glmensajes, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
    else
        var dtvmen = new vista(glmensajes_unico, "['serial_mensajeria']==" + glserial_mensajeria, '', '');

    if (dtvmen.length == 0)
    {
        dtvmen = new vista(glmensajes_buscados, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
        if(dtvmen.length==0)
            var dtvmen = new vista(glmensajes_unico, "['serial_mensajeria']==" + glserial_mensajeria, '', '');
    }
    d("div_tipo_quejas_detalle").style.textOverflow = "ellipsis"
    d("div_tipo_quejas_detalle").style.width = "300px";
    d("div_tipo_quejas_detalle").style.whiteSpace = "nowrap";
    d("div_tipo_quejas_detalle").style.overflow = "hidden";
    d("div_tipo_quejas_detalle").title = dtvmen[0]["queja"];
    d("div_tipo_quejas_detalle").innerHTML = "<span style='Font-Family:Tahoma; font-size:14px; width:100px;' >" + dtvmen[0]["queja"] + "</span>";
    // pinta_quejas_detalle(gltipo_quejas);
    // seleccionar_combof("drpttipoquejas_detalle", dtvmen[0]["serial_tqueja"], "");   
    if ((glserial_ppacseleccionado_dt != -1) && (glserial_ppacseleccionado_dt != "")) {
        pinta_seleccionado_js(
        {
            div_pinta: "div_paciente_detalle",
            dato: dtvmen[0]["nombre_pac"] + " " + dtvmen[0]["apellido_pac"],
            color_normal: "#dce9f9",
            color_sobre: "#dedde5",
            estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
            funcion_cierra: "busca_paciente_detalle"
        }
        );
    }
    if ((glserial_suc_seleccionado_dt != -1) && (glserial_suc_seleccionado_dt != "")) {
        pinta_seleccionado_js(
            {
                div_pinta: "div_clinica_detalle",
                dato: dtvmen[0]["entidad"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_clinica_detalle"
            }
            );
        d("div_f_clinica_detalle").style.display = "block";
        d("div_clinica_detalle").style.display = "inline-block";
        d("div_autocompletar_entidad_detalle").style.display = "none";

    }
    else {
        d("div_f_clinica_detalle").style.display = "none";
        d("div_autocompletar_entidad_detalle").style.display = "inline-block";
    }

    var id_auto = "txt_entidad_trata_detalle";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "div_autocompletar_entidad_detalle",
        fuente: glentidades,
        nombre_en_fuente: "Nombre",
        serial_en_fuente: "serial_suc",
        columnas_busqueda: ["Nombre"],
        columnas_grilla: ["Nombre"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["Nombre"],
        funcion_clic_dato: "funcion_entidad_detalle",
        estilo_grilla: "width:310px",
        tipo_columna_grilla: ["0"],
        estilo_columna_grilla: ["'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: [""],
        top_grilla: "30px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "310px",
        alto_caja_texto: "30px",

    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = "Escribe la entidad";


}

var glreasigno = false;
function reas_msj(serial) {
    d("txt_mensaje_reasigna").value = "Se reasignó el caso";

    if (d("div_caja6_papa") != null)
        d("div_caja6_papa").style.display = "none";

    if (d("div_caja9_papa") != null)
        d("div_caja9_papa").style.display = "none";

    if (d("div_caja10_papa") != null)
        d("div_caja10_papa").style.display = "none";

    if (d("div_caja11_papa") != null)
        d("div_caja11_papa").style.display = "none";

    if (glreasigno == false) {

        if (d("div_caja" + serial) == null) {

            var mensaje1 = new mensajejava();
            mensaje1.objpropiedades = {
                div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
                id_caja: "div_caja" + serial,
                tamano_triangulo_borde: "20px",
                tamano_triangulo_interno: "18px",
                borde_caja: "2px",
                color_borde: "#dedde5",
                color_fondo: "white",
                tamano_sobra: "4px",
                top_caja: "90px",
                left_caja: "-130px",
                alto_caja: "200px",
                ancho_caja: "500px",
                radio_borde_caja: "6px",
                ubicacion_triangulo: "32%",
                flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
                elemento_evento: "icono_" + serial,
                eventos_muestra: ["click"],
                eventos_oculta: ["click"],
                inicia_activo: true
            };
            mensaje1.bind();
        }
        d("div_papa_" + serial).style.zIndex = 1;

        glreasigno = true;
        gldetalle = false;
        glcerrar = false;
        glescalar = false;
        glreabrir = false;
        d("div_reasignar").style.display = "block";
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reabrir").style.display = "none";

    }
    else {
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";
        glreasigno = false;
        gldetalle = false;
        glcerrar = false;
        glescalar = false;
        glreabrir = false;
    }
}

var glcerrar = false;
function cerrar_msj(serial) {
    d("txt_mensaje_cerrar").value = "Se cerró el caso";

    if (d("div_caja6_papa") != null)
        d("div_caja6_papa").style.display = "none";

    if (d("div_caja8_papa") != null)
        d("div_caja8_papa").style.display = "none";

    if (d("div_caja9_papa") != null)
        d("div_caja9_papa").style.display = "none";

    if (d("div_caja11_papa") != null)
        d("div_caja11_papa").style.display = "none";

    if (glcerrar == false) {

        if (d("div_caja" + serial) == null) {

            var mensaje1 = new mensajejava();
            mensaje1.objpropiedades = {
                div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
                id_caja: "div_caja" + serial,
                tamano_triangulo_borde: "20px",
                tamano_triangulo_interno: "18px",
                borde_caja: "2px",
                color_borde: "#dedde5",
                color_fondo: "white",
                tamano_sobra: "4px",
                top_caja: "90px",
                left_caja: "-250px",
                alto_caja: "200px",
                ancho_caja: "500px",
                radio_borde_caja: "6px",
                ubicacion_triangulo: "55%",
                flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
                elemento_evento: "icono_" + serial,
                eventos_muestra: ["click"],
                eventos_oculta: ["click"],
                inicia_activo: true
            };
            mensaje1.bind();
        }
        d("div_papa_" + serial).style.zIndex = 1;

        glreasigno = false;
        gldetalle = false;
        glcerrar = true;
        glescalar = false;
        glreabrir = false;
        //glbuscar = false;

        if(((glserial_dtr_detalle != "0")&&(gltipoqueja=="5"))||((glserial_dtr_detalle != "0")&&(gltipoqueja=="6")))
        {
            d("drp_autorizacion").selectedIndex = 0;
            d("drp_autorizacion").style.display = "inline-block";
            d("div_cerrar").style.top = "130px";
        }
        else
        {
            d("drp_autorizacion").style.display = "none";
            d("div_cerrar").style.top = "150px";
        }

        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "block";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";


    }
    else {
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";
        glreasigno = false;
        gldetalle = false;
        glcerrar = false;
        glescalar = false;
        glreabrir = false;
    }

    return false;
}

var glescalar = false;
function escalar_msj(serial) {
    d("txt_mensaje_cerrar").value = "Se escaló el caso";

    if (d("div_caja6_papa") != null)
        d("div_caja6_papa").style.display = "none";

    if (d("div_caja8_papa") != null)
        d("div_caja8_papa").style.display = "none";


    if (d("div_caja10_papa") != null)
        d("div_caja10_papa").style.display = "none";

    if (d("div_caja11_papa") != null)
        d("div_caja11_papa").style.display = "none";

    if (glescalar == false) {

        if (d("div_caja" + serial) == null) {

            var mensaje1 = new mensajejava();
            mensaje1.objpropiedades = {
                div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
                id_caja: "div_caja" + serial,
                tamano_triangulo_borde: "20px",
                tamano_triangulo_interno: "18px",
                borde_caja: "2px",
                color_borde: "#dedde5",
                color_fondo: "white",
                tamano_sobra: "4px",
                top_caja: "90px",
                left_caja: "-200px",
                alto_caja: "200px",
                ancho_caja: "500px",
                radio_borde_caja: "6px",
                ubicacion_triangulo: "45%",
                flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
                elemento_evento: "icono_" + serial,
                eventos_muestra: ["click"],
                eventos_oculta: ["click"],
                inicia_activo: true
            };
            mensaje1.bind();
        }
        d("div_papa_" + serial).style.zIndex = 1;

        glescalar = true;
        gldetalle = false;
        glreasigno = false;
        glcerrar = false;
        glreabrir = false;
        //glbuscar = false;
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "block";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";

    }
    else {
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";
        glreasigno = false;
        gldetalle = false;
        glescalar = false;
        glcerrar = false;
        glreabrir = false;
    }
}



var glreabrir = false;
function reabrir(serial) {
    d("txt_mensaje_reabirir").value = "";

    if (d("div_caja6_papa") != null)
        d("div_caja6_papa").style.display = "none";

    if (d("div_caja8_papa") != null)
        d("div_caja8_papa").style.display = "none";

    if (d("div_caja9_papa") != null)
        d("div_caja9_papa").style.display = "none";

    if (d("div_caja10_papa") != null)
        d("div_caja10_papa").style.display = "none";



    if (glreabrir == false) {

        if (d("div_caja" + serial) == null) {

            var mensaje1 = new mensajejava();
            mensaje1.objpropiedades = {
                div_cubre: "div_papa_" + serial,//Div que cubre el Elemento sobre el cual va a ir el triangulo del msj
                id_caja: "div_caja" + serial,
                tamano_triangulo_borde: "20px",
                tamano_triangulo_interno: "18px",
                borde_caja: "2px",
                color_borde: "#dedde5",
                color_fondo: "white",
                tamano_sobra: "4px",
                top_caja: "90px",
                left_caja: "-350px",
                alto_caja: "200px",
                ancho_caja: "500px",
                radio_borde_caja: "6px",
                ubicacion_triangulo: "75%",
                flecha_posicion: 1, // 1 Arriba, 2 Derecha, 3 Abajo, 4 Izquierda,
                elemento_evento: "icono_" + serial,
                eventos_muestra: ["click"],
                eventos_oculta: ["click"],
                inicia_activo: true
            };
            mensaje1.bind();
        }
        d("div_papa_" + serial).style.zIndex = 1;
        glreabrir = true;
        glescalar = false;
        gldetalle = false;
        glreasigno = false;
        glcerrar = false;
        //glbuscar = false;
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "block";


    }
    else {
        d("div_detalle").style.display = "none";
        d("div_escalar").style.display = "none";
        d("div_cerrar").style.display = "none";
        d("div_reasignar").style.display = "none";
        d("div_reabrir").style.display = "none";
        glreasigno = false;
        gldetalle = false;
        glescalar = false;
        glcerrar = false;
        glreabrir = false;
    }
}
function cargar_datos_reasigna() {
    var dtvencargados = new vista(glmensajes_detalle["encargados"], "['nivel']==" + glnivel_actual, 'A', 'NombreCompleto');

    var combo = new combojava();
    combo.id = "drpreasigna";
    combo.estilo = "drp";
    combo.propiedades = "width:310px";
    //combo.propiedades = "";
    combo.div = "div_promotor_reasigna";
    combo.fuente = dtvencargados;
    combo.datovalor = "serial_prm";
    combo.datotexto = "NombreCompleto";
    // combo.evento = "onchange=cambio_tqueja()";
    combo.fuenteinicial = [{ "serial_prm": -1, "NombreCompleto": "..Seleccione.." }];
    combo.bind();

}
function busca_paciente_detalle() {
    glserial_ppacseleccionado_bsq = "-1";
    d("div_paciente_detalle").innerHTML = "<a style='color:#00994C; width:350px; font-family:Tahoma; font-size:13px;' href='#' onclick='seleccion_paciente(3)'>Clic para Seleccionar Paciente</a>";
}
function busca_clinica_detalle(div_pinta) {
    d(div_pinta).style.display = "none";
    glserial_suc_seleccionado_dt = "-1";
    glserial_pais_dt = "-1";
    d("div_autocompletar_entidad_detalle").style.display = "inline-block";
}

function funcion_entidad_detalle(serial) {
    var dtv = new vista(glentidades, "['serial_suc']==" + serial, '', '');
    if (dtv.length > 0) {
        glserial_suc_seleccionado_dt = serial;
        glserial_pais_dt = dtv[0]["serial_pais"];
        glnentidad = dtv[0]["Nombre"];
        pinta_seleccionado_js(
            {
                div_pinta: "div_clinica_detalle",
                dato: dtv[0]["Nombre"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_clinica_detalle"
            }
            );
        d("div_f_clinica_detalle").style.display = "block";
        d("div_clinica_detalle").style.display = "inline-block";
        d("div_autocompletar_entidad_detalle").style.display = "none";



    }

}
function crear_mensaje_dt_detalle() {
    var msndt = d("txt_mensaje_detalle").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";
    d("txt_mensaje_detalle").style.borderColor = "";
    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_detalle").style.borderColor = "red";
    }
    if (msj == "") {
        crea_mensaje_pre_dt_detalle();
    }
    return false;
}
function crear_mensaje_dt_reasigna() {
    var msndt = d("txt_mensaje_reasigna").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";
    d("txt_mensaje_reasigna").style.borderColor = "";
    d("drpreasigna").style.borderColor = "";
    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_reasigna").style.borderColor = "red";
    }
    if (d("drpreasigna").selectedIndex == 0) {
        msj = msj + "Debe seleccionar el usuario para reasignar</br>";
        d("drpreasigna").style.borderColor = "red";
    }
    if (msj == "") {
        crear_mensaje_pre_dt_reasigna();
    }
    return false;
}
function crear_mensaje_dt_cerrar() {
    var msndt = d("txt_mensaje_cerrar").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";

    d("txt_mensaje_cerrar").style.borderColor = "";
    d("drp_autorizacion").style.borderColor = "";
    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_cerrar").style.borderColor = "red";
    }

    if(((glserial_dtr_detalle != "0")&&(gltipoqueja=="5"))||((glserial_dtr_detalle != "0")&&(gltipoqueja=="6")))
    {
        if(d("drp_autorizacion").selectedIndex==0)
        {
            msj = msj + "Debe digitar el tipo de autorización</br>";
            d("drp_autorizacion").style.borderColor = "red";
        }
    }


    if (msj == "") {
        crear_mensaje_pre_dt_cerrar();
    }
    return false;
}

function crear_mensaje_dt_escalo() {
    var msndt = d("txt_mensaje_escalo").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";
    d("txt_mensaje_escalo").style.borderColor = "";

    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_escalo").style.borderColor = "red";
    }

    if (msj == "") {
        crear_mensaje_pre_dt_escalo();
    }
    return false;
}
function crear_mensaje_dt_reabrir() {
    var msndt = d("txt_mensaje_reabirir").value;
    var msndt = msndt.replace(/(?:\r\n|\r|\n)/g, '');
    var msj = "";
    d("txt_mensaje_reabirir").style.borderColor = "";

    if (msndt == "") {
        msj = msj + "Debe digitar el mensaje</br>";
        d("txt_mensaje_reabirir").style.borderColor = "red";
    }

    if (msj == "")
    {
        if ((glllamar_paciente == "0") && (glllamar_paciente_msj == "0"))
            crear_mensaje_pre_dt_reabrir();
        else
        {
            dhtmlx.alert({
                title: "Revisar por favor",
                type: "alert-error",
                text: "El mensaje genera llamada por lo tanto no puede reabrirse"
            });
        }

    }
    return false;
}

function envio_act_detalle() {
    call_sgu(actualiza_datos_post, [[{
        serial_mensajeria: glserial_mensajeria,
        serial_suc: glserial_suc_seleccionado_dt,
        serial_ppac: glserial_ppacseleccionado_dt
    }]], "actualiza_datos", "mensajeria");
}

function crea_mensaje_pre_dt_detalle() {

    var ev = window.event;

    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                envio_act_detalle();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            envio_act_detalle();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}

function crear_mensaje_pre_dt_reasigna() {

    var ev = window.event;

    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                crear_mensaje_def_reasigna();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crear_mensaje_def_reasigna();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}


function crear_mensaje_pre_dt_cerrar() {

    var ev = window.event;

    var msj = "";
    if ((glllamar_paciente == "1") && (glllamar_paciente_call == "0"))
        msj = "¿Desea cerrar el mensaje confirmando que ya llamo al paciente?";

    if (msj == "")
        $("#dialog-confirm").html("¿Esta seguro que desea cerrar el mensaje?");
    else
        $("#dialog-confirm").html(msj);

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                crear_mensaje_def_cerrar();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crear_mensaje_def_cerrar();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}
function crear_mensaje_pre_dt_escalo() {

    var ev = window.event;

    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                crear_mensaje_def_escalo();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crear_mensaje_def_escalo();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}

function crear_mensaje_pre_dt_reabrir() {

    var ev = window.event;

    $("#dialog-confirm").html("¿Esta seguro que desea crear el mensaje?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Crear Mensaje",
        height: 150,
        width: 400,
        buttons: {
            "Si": function () {
                //  alert("sa");
                $("#dialog-confirm").dialog('close');
                crear_mensaje_def_reabrir();

                //  ev.stopPropagation();
                // ev.preventDefault();
                return false;
            },
            "No": function () {
                $("#dialog-confirm").dialog('close');
                //    ev.stopPropagation();
                //   ev.preventDefault();
                return false;
                // callback(false);
            }
        }
    });

    $(".ui-button-text-only")[0].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
            crear_mensaje_def_reabrir();
        }

    }
    $(".ui-button-text-only")[1].onkeyup = function () {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = window.event.shiftKey ? true : false;
        } else {
            key = ev.which;
            isShift = ev.shiftKey ? true : false;
        }
        if (key == 13) {
            $("#dialog-confirm").dialog('close');
        }

    }
    return false;
}
function actualiza_datos_post(respuesta) {

    if (respuesta["respuesta"]["correcto"] == "1") {
        d("div_caja6_papa").style.display = "none";
        d("div_detalle").style.display = "none";
        gldetalle = false;
        glserial_suc_seleccionado_dt_real = glserial_suc_seleccionado_dt;
        glserial_ppacseleccionado_dt_real = glserial_ppacseleccionado_dt;

        var arr_nombre_pac = glnombre_pacsel.split(' ');
        var nombre_pac = arr_nombre_pac[0];
        var apellido_pac = "";
        var m = 1;
        while (m < arr_nombre_pac.length) {
            apellido_pac = apellido_pac + arr_nombre_pac[m] + ' ';
            m++;
        }

        var n = 0;
        while (n < glmensajes.length) {
            if (glmensajes[n]["serial_mensajeria"] == glserial_mensajeria) {
                glmensajes[n]["serial_suc"] = glserial_suc_seleccionado_dt_real;
                glmensajes[n]["serial_ppac"] = glserial_ppacseleccionado_dt_real;
                glmensajes[n]["nombre_pac"] = nombre_pac;
                glmensajes[n]["apellido_pac"] = apellido_pac;
                glmensajes[n]["entidad"] = glnentidad;
                //dtvmen[0]["nombre_pac"] + " " + dtvmen[0]["apellido_pac"]
                //entidad
            }
            n++;
        }
        var mensaje_detalle = d("txt_mensaje_detalle").value;
        d("txt_mensaje_dt").value = mensaje_detalle;
        d("txt_mensaje_detalle").value = "";
        crear_mensaje_def_dt();

    }
    return false;
}


function adj_msj() {
    var arr_msj_adjuntos = new Array();
    var dtv_originales = new vista(glmensajes_detalle["mensajes_adjuntos"], "['serial_mensajeria_detalle']==''", '', '');
    
    var m = 0;
    if (dtv_originales.length > 0) {
        var obj1 = new Object();
        obj1["serial_mensajeria_detalle"] = "";
        if (glorigen == 0) {
            obj1["usuario"] = glmensajes[0]["promotor_abre"];
            obj1["fecha"] = glmensajes[0]["fecha_creacion"];
        }
        else
        {
            
            obj1["usuario"] = glmensajes_unico[0]["promotor_abre"];
            obj1["fecha"] = glmensajes_unico[0]["fecha_creacion"];
        }
        arr_msj_adjuntos[arr_msj_adjuntos.length] = obj1;
        m++;
    }

    var dtv_adjuntos = new vista(glmensajes_detalle["mensajes_adjuntos"], "['serial_mensajeria_detalle']!=''", '', '');
    dtv_adjuntos = new vista(glmensajes_detalle["mensajes_adjuntos"], "['serial_mensajeria_detalle']!='0'", '', '');
    var m = 0;
    while (m < dtv_adjuntos.length) {
        var dtv_detalle = new vista(glmensajes_detalle["mensajes_detalle"],
            "['serial_mensajeria_detalle']=='" + dtv_adjuntos[m]["serial_mensajeria_detalle"] + "'", '', '');

        if (dtv_detalle.length > 0) {
            var obj1 = new Object();
            obj1["serial_mensajeria_detalle"] = dtv_adjuntos[m]["serial_mensajeria_detalle"];
            obj1["usuario"] = dtv_detalle[0]["usuario"];
            obj1["fecha"] = dtv_detalle[0]["fecha"];
            arr_msj_adjuntos[arr_msj_adjuntos.length] = obj1;
        }
        m++;
    }

    var dtv_adjuntos_dtr = new vista(glmensajes_detalle["mensajes_adjuntos"], "['serial_mensajeria_detalle']=='0' || ['serial_mensajeria_detalle']=='' ", '', '');
    var m = 0;
    if (dtv_adjuntos_dtr.length>0)
    //while (m < dtv_adjuntos_dtr.length)
    {
        //

        var obj1 = new Object();
        obj1["serial_mensajeria_detalle"] = "0";
        if (glorigen == 0) {
            var dtv_mensajeria = new vista(glmensajes, "['serial_mensajeria']=='" + glserial_mensajeria + "'", '', '');
            if (dtv_mensajeria.length==0)
                 dtv_mensajeria = new vista(glmensajes_buscados, "['serial_mensajeria']=='" + glserial_mensajeria + "'", '', '');
            obj1["usuario"] = dtv_mensajeria[0]["promotor_abre"];
            obj1["fecha"] = dtv_mensajeria[0]["fecha_creacion"];
        }
        else
        {
            obj1["usuario"] = glmensajes_unico[0]["promotor_abre"];
            obj1["fecha"] = glmensajes_unico[0]["fecha_creacion"];

        }
        arr_msj_adjuntos[arr_msj_adjuntos.length] = obj1;
        m++;
    }
    ver_modal("div_ver_adjuntos");
    //d("div_ver_adjuntos").style.display = "block";
    var grilla = new grillajava();
    grilla.fuente = arr_msj_adjuntos;
    grilla.div = "div_adjuntos";
    grilla.id = "gwadjuntos"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Generado Por", "Fecha", "Adjuntos"];
    grilla.datoscolumnas = ["usuario", "fecha", "serial_mensajeria_detalle"];
    grilla.tipocolumna = ["0", "0", "1"];
    grilla.funcioncolumna = ["", "", "fun_adjuntos"];
    grilla.estilocolumna = ["'width: 120px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
        "'width: 100px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; margin:0; padding:0'", ];
    grilla.bind();
    fun_ajusta_adjuntos(arr_msj_adjuntos);

    if (glmensajes_detalle["mensajes_adjuntos"].length > 0)
        d("div_adjuntos_papa").style.display = "block";
    else
        d("div_adjuntos_papa").style.display = "none";


    return false;
}
function fun_adjuntos(fila, dato) {
    return "<div style='margin:0; padding:0; border:0' id='div_adjuntos_" + fila["serial_mensajeria_detalle"] + "'></div>";
}
function fun_ajusta_adjuntos(arr_msj_adjuntos) {

    var m = 0;

    while (m < arr_msj_adjuntos.length) {
        var dtv_adjuntos = new vista(glmensajes_detalle["mensajes_adjuntos"],
            "['serial_mensajeria_detalle']=='" + arr_msj_adjuntos[m]["serial_mensajeria_detalle"] + "'", '', '');

        var ndiv = "div_adjuntos_" + arr_msj_adjuntos[m]["serial_mensajeria_detalle"];
        var divpap = d(ndiv);
        var n = 0;
        while (n < dtv_adjuntos.length) {
            var div2 = document.createElement("div");

            var span1 = document.createElement("span");
            span1.style.cursor = "pointer";
            span1.style.textDecoration = "underline";
            span1.style.color = "#5c85c6";
            if (trim(String(dtv_adjuntos[n]["nombre"]))!="")
                span1.innerText = dtv_adjuntos[n]["nombre"];
            else
                span1.innerText = "Imagen";
          
            span1.serial_mensajeria_adjunto = dtv_adjuntos[n]["serial_mensajeria_adjunto"];
            span1.serial_mensajeria_detalle = dtv_adjuntos[n]["serial_mensajeria_detalle"];
            span1.serial_archivos = dtv_adjuntos[n]["serial_archivos"];
            span1.tipo = dtv_adjuntos[n]["tipo"];
            span1.onclick = function () {
                mensajeria_adjunto_imagenes(this.serial_mensajeria_adjunto, this.serial_mensajeria_detalle, this.tipo, this.serial_archivos);
                return false;
                var e = window.event;
                e.preventDefault();
                e.stopPropagation();

            }
            div2.style.height = "15px";
            div2.style.padding = "0";
            div2.style.overflow = "hidden";
            div2.appendChild(span1);
            divpap.appendChild(div2);
            n++;
        }

        m++;
    }


}
var gl_ver_todos_mensajeria = 1;
function mensajeria_adjunto_imagenes(serial_mensajeria_adjunto, serial_mensajeria_detalle, tipo_adjunto, serial_archivos) {

  //  alert(serial_archivos);
    if (tipo_adjunto.indexOf("image/") != -1) {

        var dtvfuente;
        if (gl_ver_todos_mensajeria == 0) {
            //Solo veo los de la mensajeria detalle
            dtvfuente = new vista(glmensajes_detalle["mensajes_adjuntos"],
              "['serial_mensajeria_detalle']=='" + serial_mensajeria_detalle + "'", 'A', 'serial_mensajeria_adjunto', 'true');
        }
        else {
            //Veo los del mensaje
            var dtvfiltro1 = new vista(glmensajes_detalle["mensajes_adjuntos"],
              "['serial_mensajeria_adjunto']=='" + serial_mensajeria_adjunto + "'", '', '');


            if (dtvfiltro1.length > 0) {
                dtvfuente = new vista(glmensajes_detalle["mensajes_adjuntos"],
                    "['serial_mensajeria']=='" + dtvfiltro1[0]["serial_mensajeria"] + "'", 'A', 'serial_mensajeria_adjunto', 'true');

            }


        }


        var arrcarrusel = new Array();
        var n = 0;
        if (dtvfiltro1 != undefined) {
            while (n < glmensajes_detalle["mensajes_adjuntos"].length) {
                var tipo = glmensajes_detalle["mensajes_adjuntos"][n]["tipo"];
                if (tipo.indexOf("image/") != -1) {
                    var obj1 = new Object();
                  
                    obj1["serial"] = String(glmensajes_detalle["mensajes_adjuntos"][n]["serial_archivos"]).toUpperCase();
                    obj1["ancho"] = glmensajes_detalle["mensajes_adjuntos"][n]["ancho"];
                    obj1["texto"] = "<strong>Fecha Cargue:</strong>  "+glmensajes_detalle["mensajes_adjuntos"][n]["fecha"];
                    obj1["alto"] = glmensajes_detalle["mensajes_adjuntos"][n]["alto"];
                    obj1["url"] = "https://unoaodonto.blob.core.windows.net/mycontainer/" + String(glmensajes_detalle["mensajes_adjuntos"][n]["serial_archivos"]).toUpperCase();
                    obj1["url_thumb"] = "https://unoaodonto.blob.core.windows.net/mycontainer/" + String(glmensajes_detalle["mensajes_adjuntos"][n]["serial_archivos"]).toUpperCase() + "_TH";
                    //obj1["url"] = "http://curiosidades.batanga.com/sites/curiosidades.batanga.com/files/Los-10-mejores-inventos-de-la-historia-1.jpg";
                    // obj1["url_thumb"] = "http://curiosidades.batanga.com/sites/curiosidades.batanga.com/files/Los-10-mejores-inventos-de-la-historia-1.jpg";

                    arrcarrusel[arrcarrusel.length] = obj1;
                }
                n++;
            }
        }
        glvercamption_imagen = true;
        // alert(JSON.stringify(arrcarrusel));
        pinta_carrusel({
            div: "div_carrusel",
            div_plantilla: "div_plantilla_carrusel",
            fuente: arrcarrusel
        });
        d("serial_img_" + String(serial_archivos).toUpperCase()).click();

    }
    else {
        var dtvfuente = new vista(glmensajes_detalle["mensajes_adjuntos"],
           "['serial_mensajeria_adjunto']=='" + serial_mensajeria_adjunto + "'", '', '', '');

        var url = "https://unoaodonto.blob.core.windows.net/mycontainer/" + String(dtvfuente[0]["serial_archivos"]).toUpperCase();
        var save = document.createElement('a');
        save.href = url;
        save.target = '_blank';
        save.download = url;
        //var clicEvent = new MouseEvent('click', {
        //    'view': window,
        //    'bubbles': true,
        //    'cancelable': true
        //});
        save.click();
       // document.location = "https://unoaodonto.blob.core.windows.net/mycontainer/" + String(dtvfuente[0]["serial_archivos"]).toUpperCase();
    }

}
var glserial_dtr_seleccionado_dt="-1";
function ir_plan_trata()
{
    call_sgu(ir_plan_trata_post, [[{
        serial_suc: glserial_suc_seleccionado_dt,
        serial_ppac: glserial_ppacseleccionado_dt,
        serial_dtr: glserial_dtr_seleccionado_dt
    }]], "selecciona_paciente_sesion_sp", "plan_tratamiento");
    return false;
}

function ir_plan_trata_post(respuesta)
{
    parent.document.location = "plantratamiento.aspx?si=1";
}