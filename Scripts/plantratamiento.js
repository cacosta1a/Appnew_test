var glserial_suc_seleccionado = "-1";
var glserial_pais = "-1";
var glentidades;
var glpermisos_promotor;
var glserial_emp = "";
var gledad = 0;
var gl_debe_actualizar_version = 0;
var glversion_actual = "";
var glauditores = new Array();

function auditor_presente()
{
    var serial_prm = d("hddserial_prm").value;
    var straudi = "";
    var n = 0;
    while (n < glauditores.length)
    {
        straudi =straudi + glauditores[n]["serial_prm"] + ",";
        n++;
    }
    if (straudi.length!="")
        straudi = straudi.substr(0, straudi.length - 1);

    if ((glserial_ppacseleccionado != "") && (glserial_ppacseleccionado != "-1")) {
        var ahora = new Date();
        var ajax = nuevoAjax();
        var url1 = "../Manejadores/plan_tratamiento.aspx?serial_ppac=" + glserial_ppacseleccionado + "&straudi=" + straudi + "&serial_prm=" + serial_prm + "&funcion_url=auditor_presente&c11=" + ahora.getMilliseconds();
        ajax.open("GET", url1, false);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                datos = ajax.responseText;
                var arrdatos = eval("(" + datos + ")");
                pinta_auditores(arrdatos["respuesta"]);
                
              //  alert(arrdatos["respuesta"]);
               // 
            }
        }
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send();
    }
    else
        setTimeout("auditor_presente()", 10000);

}

function pinta_auditores(cadena)
{
    var arraudi = cadena.split(",");

    d("div_auditores").innerHTML = "";

    if (cadena != "") {
        var n = 0;
        while (n < arraudi.length) {

            var dtv_audi = new vista(glauditores, "['serial_prm']==" + arraudi[n], '', '');
            if (dtv_audi.length > 0) {
                var div1 = document.createElement("div");
                div1.style.overflow = "hidden";
                div1.style.borderRadius = "15px";
                div1.style.display = "block";
                div1.style.width = "50px";
                div1.style.height = "50px";
                div1.style.backgroundColor = "#f8f0cb";
                div1.style.marginBottom = "5px";
                div1.setAttribute("title", dtv_audi[0]["nombre"]);
                div1.style.textAlign = "center";
                var img1 = document.createElement("img");
                img1.src = "../Manejadores/ver_imagen.aspx?deprm=1&serial_prm=" + arraudi[n];
                img1.style.height = "50px";
                img1.style.padding = "0px";
                img1.style.margin = "0 auto";

                div1.appendChild(img1);
                d("div_auditores").appendChild(div1);
            }
            n++;
        }
    }
    setTimeout("auditor_presente()", 2000);
    //<div style=" overflow:hidden; border-radius:15px; display:block; width:50px; height:50px; background-color:#f8f0cb; margin-bottom:5px; ">
    //        <img  src="../Manejadores/ver_imagen.aspx?deprm=1&amp;serial_prm=32887" style="height:50px; padding:0px; margin:0px">

}
function carga() {
   
 //   window.onbeforeunload = va_salir;
    window.onscroll = function (evt)
    {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if(top>158)
        {
            d("div_encabezado_plan").style.position = "fixed";
            d("div_encabezado_plan").style.top = "0px";
            d("div_encabezado_plan").style.backgroundColor = "white";
            d("div_encabezado_plan").style.zIndex = 1;
            d("div_encabezado_plan").style.borderBottom = "1px solid rgb(0, 153, 76)";
           
    
        }
        else
        {
            d("div_encabezado_plan").style.position = "";
            d("div_encabezado_plan").style.top = "0px";
            d("div_encabezado_plan").style.backgroundColor = "";
            d("div_encabezado_plan").style.borderBottom = "";
            d("div_encabezado_plan").style.marginBottom = "";

        }
    //    alert(top);
        //alert("1");
    }

    d("txt_fecha_evolucion").value = d("hddfecha_actual").value;
    var myCalendar = new dhtmlXCalendarObject(["txt_fecha_evolucion"]);
    myCalendar.setDateFormat("%Y-%m-%d");
    myCalendar.hideTime();
   // alert(d("hddatos_basicos").value);
    var respuesta = eval("(" + d("hddatos_basicos").value + ")");

    if ((respuesta["paciente"] != undefined) && (respuesta["entidad_seleccionada"] != undefined)) {

        if ((respuesta["paciente"][0]["activo"] == "False") && ((respuesta["permisos_promotor"][0]["auditor"] == "False") || (respuesta["permisos_promotor"][0]["auditor"] == "0")))
        {
            dhtmlx.alert({
                title: "Revisar por favor",
                type: "alert-error",
                text: "El paciente se encuentra excluido"
            });
            respuesta["paciente"] = undefined;
        }
        else if ((respuesta["paciente"][0]["cartera"] == "1") && ((respuesta["permisos_promotor"][0]["auditor"] == "False") || (respuesta["permisos_promotor"][0]["auditor"] == "0")))
        {
               dhtmlx.alert({
                title: "Revisar por favor",
                type: "alert-error",
                text: "El paciente se encuentra inactivo"
               });
               respuesta["paciente"] = undefined;
        }
    }
    
   
    if ((respuesta["paciente"] != undefined)&&(respuesta["entidad_seleccionada"] != undefined)) {
        glnombre_pacsel = respuesta["paciente"][0]["nombre"];
        
        // d("div_buscar_paciente").style.display = "none";
        pinta_seleccionado_js(
            {
                div_pinta: "div_paciente",
                ancho: "250px",
                dato: respuesta["paciente"][0]["nombre"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_paciente"
            }
        );

        d("sp_identificacion").innerText = respuesta["paciente"][0]["cedula"];
        //d("sp_fecha_vigencia").innerText = respuesta["paciente"][0]["fecha_vigencia"];

        var fecha_vigencia = String(respuesta["paciente"][0]["fecha_vigencia"]);
        var ind1 = fecha_vigencia.indexOf(" ");
        if (ind1 != -1)
            fecha_vigencia = fecha_vigencia.substr(0, ind1);
        d("sp_fecha_vigencia").innerText = fecha_vigencia;
        d("sp_convenio").innerText = respuesta["paciente"][0]["nombre_emp"];
        d("sp_edad").innerText = respuesta["paciente"][0]["edad"];
        gledad = parseInt(respuesta["paciente"][0]["edad"]);
        glserial_emp = respuesta["paciente"][0]["serial_emp"];
        glserial_pac = respuesta["paciente"][0]["serial_pac"];
        glserial_ppacseleccionado = respuesta["paciente"][0]["serial_ppac"];
        glversion_actual = respuesta["paciente"][0]["version"];
        var version_anterior = String(localStorage["version_" + glserial_emp]);
        var version_nueva = String(respuesta["paciente"][0]["version"]);
        gl_debe_actualizar_version = "0";
        if (version_anterior != version_nueva)
        {
            gl_debe_actualizar_version = "1";
        }
        //serial_pac = respuesta["paciente"][0]["serial_ppac"];
        d("div_identificacion").style.display = "inline-block";
        d("div_fecha_vigencia").style.display = "inline-block";
        d("div_convenio").style.display = "inline";
        d("div_edad").style.display = "inline-block";
        d("div_tabla_plantto_padre").style.display = "block";
      //  glmuestra_cargando = true;
        //d("vcargando").style.display = "block";

        
        call_sgu(selecciona_pac_post, [[{
            serial_ppac: respuesta["paciente"][0]["serial_ppac"],
            serial_pac: respuesta["paciente"][0]["serial_pac"],
            serial_suc: respuesta["entidad_seleccionada"][0]["serial_suc"],
            serial_emp: respuesta["paciente"][0]["serial_emp"],
            tipo_cita: "2"
        }]], "selecciona_paciente", "plan_tratamiento");
        
        
    }
    else
    {
        d("div_identificacion").style.display = "none";
        d("div_fecha_vigencia").style.display = "none";
        d("div_convenio").style.display = "none";
        d("div_edad").style.display = "none";
    }
   
    if (respuesta["entidad_seleccionada"] != undefined) {
        glserial_suc_seleccionado = respuesta["entidad_seleccionada"][0]["serial_suc"];
        glserial_pais = respuesta["entidad_seleccionada"][0]["serial_pais"];

        pinta_seleccionado_js(
            {
                div_pinta: "div_clinica",
                dato: respuesta["entidad_seleccionada"][0]["Nombre"],
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_clinica"
            }
        );

        glodontologos_clinicas = respuesta["odontologos_clinicas"];
        d("div_clinica").style.display = "inline-block";
        d("div_autocompletar_entidad").style.display = "none";

        if (window.length > 1) {
            if (window[1] != undefined) {
                var tipo = typeof (window[1].selecciona_entidad);
                if (tipo == "function") {
                    window[1].selecciona_entidad(respuesta["entidad_seleccionada"][0]["serial_suc"],
                    respuesta["entidad_seleccionada"][0]["Nombre"],
                    respuesta["entidad_seleccionada"][0]["serial_pais"]
                    );
                }
            }
        }
    }
    else {
        d("div_clinica").style.display = "none";
        d("div_autocompletar_entidad").style.display = "inline-block";
    }

    glentidades = respuesta["entidades"];
    glpermisos_promotor = respuesta["permisos_promotor"];
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
        top_grilla: "29px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "307px",
        alto_caja_texto: "30px",

    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = "Escribe la clínica";

    if (respuesta["entidad_seleccionada"] == undefined) {
        if (glentidades.length == 1) {
            funcion_entidad(glentidades[0]["serial_suc"]);
        }
    }
    if((glpermisos_promotor[0]["auditor"] == "True")||(glpermisos_promotor[0]["auditor"] == "1"))
    {
        var arrtmpaudi = eval("(" + d("hddauditores").value + ")")
        glauditores = arrtmpaudi["auditores"];
        setTimeout("auditor_presente()", 1000);
    }
    
}

function funcion_entidad(serial,origen) {
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

        if (window.length > 1) {
            if (window[1] != undefined) {

                var tipo = typeof (window[1].selecciona_entidad);
                if (tipo == "function") {
                    window[1].selecciona_entidad(serial, dtv[0]["Nombre"]);
                    window[1].selecciona_clinica_bsq(serial, dtv[0]["Nombre"], dtv[0]["serial_pais"]);
                }
            }
        }

        
       // glmuestra_cargando = false;
        call_sgu(selecciona_clinica_post, [[{
            serial_suc: serial
        }]], "selecciona_clinica", "plan_tratamiento");

       }

}
var glodontologos_clinicas = new Array();

function selecciona_clinica_post(respuesta)
{
   
    glodontologos_clinicas = respuesta["odontologos_clinicas"];
  //  glmuestra_cargando = true;
}
function busca_clinica(div_pinta) {
    d(div_pinta).style.display = "none";
    glserial_suc_seleccionado = "-1";
    glserial_pais = "-1";
    d("div_autocompletar_entidad").style.display = "inline-block";
    d("div_pacientes").innerHTML = "";

    busca_paciente();
}


var glorigen_bsq = "";
function seleccion_paciente(origen) {

    glorigen_bsq = origen;
    var serial_suc = "";
    if (origen == "1")
        serial_suc = glserial_suc_seleccionado;

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
 
    d("txt_buscar_paciente").style.borderColor = "";

    var vtiene_letras = 0;
    var cadena = String(d("txt_buscar_paciente").value);
    var n = 0;
    while (n < cadena.length)
    {
        var ascii = cadena.charCodeAt(0);
        if ((ascii < 48) || (ascii > 57))
        {
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
    //if (String(d("txt_buscar_paciente").value).length < 1) {
    //    msj = msj + "Debe digitar al menos 5 caracteres</br>";
    //    d("txt_buscar_paciente").style.borderColor = "red";
    //}
    if (msj == "") {
        objsiempremuestracargando["busqueda_paciente"] = "1";
        call_sgu(encontro_paciente, [[{
            serial_suc: vserial_suc,
            busqueda: trim(String(d("txt_buscar_paciente").value)),
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
    while (n < arrpaciente.length)
    {
        if (objpaciente[arrpaciente[n]["serial_ppac"]] == undefined) {
            objpaciente[arrpaciente[n]["serial_ppac"]] = "1";
            var objp = new Object();
            for (k in arrpaciente[n])
            {
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
    grilla.encabezado = ["Nombre Paciente", "Identificación", "Carnet","Fecha Vigencia", "Estado", "Entidad", "Plan"];
    grilla.datoscolumnas = ["nombre_paciente", "cedula_pac", "nocarnet","fecha_vigencia","serial_pac", "aseguradora", "nombre_emp"];
    grilla.tipocolumna = ["2", "0", "0","1","1", "0", "0"];
    grilla.funcioncolumna = [["consulta_pac", "clic_pac"], "","", "fun_fvigencia", "fun_estado", "", "", ""];
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
    while (n < arrpaciente_unico.length)
    {
     
        if (((arrpaciente_unico[n]["cartera"] == "1") || (arrpaciente_unico[n]["activo"] == "False"))&&((glpermisos_promotor[0]["auditor"] == "0") || (glpermisos_promotor[0]["auditor"] == "False"))) 
        {
            $("#gwpacientes_tr_"+n+"_td_0 #opcion_sega")[0].style.cursor = "default";
            $("#gwpacientes_tr_"+n+"_td_0 #opcion_sega")[0].style.textDecoration = "none";
            $("#gwpacientes_tr_"+n+"_td_0 #opcion_sega")[0].setAttribute("href", "#");
        }
        n++;
    }
}
function fun_estado(fila,dato)
{
    var estado="<span id='sp_estado_"+fila["serial_ppac"]+"'>Activo</span>";
    if(fila["activo"]=="False")
    {
        var fecha_exclusion = String(fila["fecha_exclusion"]);
        var ind1 = fecha_exclusion.indexOf(" ");
        if (ind1 != -1)
            fecha_exclusion = fecha_exclusion.substr(0, ind1);

        estado = "<span  id='sp_estado_" + fila["serial_ppac"] + "'>Excluido en " + fecha_exclusion+"</span>";
    }
    else if (fila["cartera"] == "1")
    {
        estado =  "<span  id='sp_estado_" + fila["serial_ppac"] + "'>Inactivo</span>";
    }
    return estado;
}
function fun_fvigencia(fila,dato)
{
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
var glserial_ppacseleccionado = "";
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
                ancho:"250px",
                color_normal: "#dce9f9",
                color_sobre: "#dedde5",
                estilo: "Font-Family:Tahoma; font-size:14px; border-radius:5px; padding-left:1px;",
                funcion_cierra: "busca_paciente"
            }
        );
        d("div_identificacion").style.display = "inline-block";
        d("div_fecha_vigencia").style.display = "inline-block";
        d("div_convenio").style.display = "inline";
        d("div_edad").style.display = "inline-block";
        d("div_tabla_plantto_padre").style.display = "block";
        
        d("sp_identificacion").innerText = fila["cedula_pac"];
        
        var fecha_vigencia=String(fila["fecha_vigencia"]);
        var ind1=fecha_vigencia.indexOf(" ");
        if(ind1!=-1)
            fecha_vigencia = fecha_vigencia.substr(0, ind1);

        d("sp_fecha_vigencia").innerText = fecha_vigencia;
        d("sp_convenio").innerText = fila["nombre_emp"];
        d("sp_edad").innerText = fila["edad"];
        gledad = parseInt(fila["edad"]);
        glserial_emp = fila["serial_emp"];
        glserial_pac = fila["serial_pac"];
        glserial_ppacseleccionado = fila["serial_ppac"];
        glversion_actual = fila["version"];
        var version_anterior = String(localStorage["version_" + glserial_emp]);
        var version_nueva = String(fila["version"]);
        gl_debe_actualizar_version = "0";
        if (version_anterior != version_nueva) {
            gl_debe_actualizar_version = "1";
        }

    //    glmuestra_cargando = true;
        call_sgu(selecciona_pac_post, [[{
            serial_ppac: fila["serial_ppac"],
            serial_pac: fila["serial_pac"],
            serial_suc: glserial_suc_seleccionado,
            serial_emp: fila["serial_emp"],
            tipo_cita:"2"
        }]], "selecciona_paciente", "plan_tratamiento");
    }
}


function busca_paciente() {

    d("div_paciente").innerHTML = "<a style='width:350px;color:#00994C; font-family:Tahoma; font-size:13px;' href='#' onclick='seleccion_paciente(1)'>Clic para Seleccionar Paciente</a>";
    glserial_ppacseleccionado = "-1";
    glnombre_pacsel = "";
    glserial_emp = "";
    d("div_identificacion").style.display = "none";
    d("div_fecha_vigencia").style.display = "none";
    d("div_convenio").style.display = "none";
    d("div_edad").style.display = "none";
    d("div_tabla_plantto_padre").style.display = "none";
    //d("div_f_ver_plan").style.display = "none";
}


function crear_ppto_ventana(respuesta) {

    glcombohallazgos = respuesta;
    
    if (gl_debe_actualizar_version == "1")
    {
        try 
        {
            if (glcombohallazgos["error"] == undefined) {
                localStorage["combo_hall_" + glserial_emp] = JSON.stringify(glcombohallazgos);
                localStorage["version_" + glserial_emp] = glversion_actual;
                gl_debe_actualizar_version = "0";
            }
            else
                gl_debe_actualizar_version = "1";
           
        }
        catch(e)
        {
            gl_debe_actualizar_version = "1";
        }
        
    }

    clic_svg_menos();
   
    if (glcombohallazgos["valida"][0]["valida"] == "0") {
        d("div_diag").style.display = "none";
        d("div_trata").style.display = "none";
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "El paciente debe tener una cita de diganostico"
        });
        d("div_formulario").style.display = "none";
        d("div_anadir_procedimientos").style.display = "none";
        d("div_procedimientos_nuevos").style.display = "none";
    }
    else {
        d("div_diag").style.display = "block";
        d("div_trata").style.display = "block";
        d("div_anadir_procedimientos").style.display = "block";
        d("div_formulario").style.display = "inline-block";
        d("div_procedimientos_nuevos").style.display = "inline-block";

        arrprocedimientos_nuevos = new Array();
        arrhallazgos = new Array();
        d("txtdiente").value = "";
        d("txtdiente1").value = "";
        d("txtdiente2").value = "";
        //d("txttto").value = "";
        if (d("txt_auto_trata2") != undefined)
            d("txt_auto_trata2").value = "";
        d("txt_observacion").value = "";
        d("div_hallazgos").style.display = "none";
        d("div_emergencial").style.display = "none";
        dsuperficies();
        borra();
        tabladetalle();
        pinta_diagnosticador();
        tablatrata();
    }
}

function pinta_diagnosticador()
{
  //  var dtv = new vista(glcombohallazgos["diagnosticadores"], "", 'A', 'NOMBRE_DOC');
    var dtv = new vista(glodontologos_clinicas, "", 'A', 'NOMBRE_DOC');
    var combo = new combojava();
    combo.id = "drp_diagnosticador";
    combo.estilo = "drp";
    combo.propiedades = "width:450px";
    //combo.propiedades = "";
    combo.div = "div_diagnosticador";
    combo.fuente = dtv;
    combo.datovalor = "SERIAL_DOC";
    combo.datotexto = "NOMBRE_DOC";
    //combo.evento = "onchange=cambio_prod()";
    //combo.fuenteinicial = [{ "se": -1, "no": "..Seleccione.." }, { "se": -2, "no": "..Primer.." }];
    combo.bind();

}

function tablatrata()
{
    var id_auto = "txt_auto_trata2";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divtratam",
        fuente: glcombohallazgos["tratamientos"],
        nombre_en_fuente: "detalle_tra",
        serial_en_fuente: "serial_tra",
        columnas_busqueda: ["codigo_tra", "detalle_tra", "Descripcion_esp"],
        columnas_grilla: ["codigo_tra", "detalle_tra","Descripcion_esp"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["codigo_tra", "detalle_tra"],
        funcion_clic_dato: "funcion_sel_trata",
        estilo_grilla: "width:450px",
        tipo_columna_grilla: ["0", "0","0"],
        estilo_columna_grilla: ["'width: 50px; text-align:center; font-family:Tahoma; font-size:13px;'",
            "'width: 350px; text-align:center; font-family:Tahoma; font-size:13px;'",
             "'width: 100px; text-align:center; font-family:Tahoma; font-size:13px;'"

        ],
        top_grilla:"30px",
        left_grilla:"0px",
        maximos_resultados: 1000,
        cantidad_pinta: 5,
        mensaje_todas:["","Ver todos los resultados",""],
        ancho_caja_texto: "450px",
        alto_caja_texto: "30px",
        solo_buscar_letra_inicial:"1"
          	
    };
    auto_completar_inicio(id_auto);
    d(id_auto).placeholder = "Escribe el código de tratamiento";

}

var serial_tra_seleccionado = "";
var hddedadesvalida = "";
var hddconvencion;
var hddcantproceso;
var hdddientesvalida;
var hddcantsuper;
var glcodigo_tra = "";
var hddcontrol = "";
var hdddetalle = "";
var hddcolor = "";
var hddPagaDgn = "";
var hddPvp_vtr = "";
var glcubierto_emergencial = 0;
var glserial_especialidad = "";
var glcantidad_ttos_ortodoncia = 1;
function funcion_sel_trata(serial)
{
    var dtv = new vista(glcombohallazgos["tratamientos"], "['serial_tra']==" + serial, '', '');
    if (dtv.length > 0) {
        d("txt_auto_trata2").value = dtv[0]["codigo_tra"] + " " + dtv[0]["detalle_tra"];
        hddaplsuper3 = dtv[0]["Superficie"];
        hddedadesvalida = dtv[0]["EdadesValida"];
        hddconvencion = dtv[0]["convencion"];
        hddcantproceso = dtv[0]["Cantidadper"];
        hdddientesvalida = dtv[0]["Dientes"];
        hddcantsuper = dtv[0]["Superficies"];
        glcodigo_tra = dtv[0]["codigo_tra"];
        hddcontrol = dtv[0]["pvp_vtre"];
        hdddetalle = dtv[0]["detalle_tra"];
        hddcolor = dtv[0]["color"];
        hddPagaDgn = dtv[0]["PagaDgn"];
        hddPvp_vtr = dtv[0]["Pvp_vtr"];
        glcubierto_emergencial = dtv[0]["Cubierto_emergencial"];
        glserial_especialidad = dtv[0]["serial_esp"];

        if (dtv[0]["cantidad_ttos_Ortodoncia"] != undefined) {
            if ((dtv[0]["cantidad_ttos_Ortodoncia"] != "") && (dtv[0]["cantidad_ttos_Ortodoncia"] != "0"))
                glcantidad_ttos_ortodoncia = parseInt(dtv[0]["cantidad_ttos_Ortodoncia"]);
            else
                glcantidad_ttos_ortodoncia = 1;
        }
        else
            glcantidad_ttos_ortodoncia = 1;

        if (glcombohallazgos["variables"].length > 0) {
            if( glcombohallazgos["variables"][0]["manejo_emergencial"]=="True")
                glmanejo_emergencial = "1";
            else
                glmanejo_emergencial = "0";

          //  alert(glmanejo_emergencial);
        }

        serial_tra_seleccionado = serial;
        pinta_hallazgos(serial);
    }
}
var glb
function pinta_hallazgos(serial_tra)
{
    var dtvhallatra = new vista(glcombohallazgos["hallazgos"], "['serial_tra']==" + serial_tra, '', '');
    var dtvhallatra_ordenado = new vista(dtvhallatra, "", 'A', 'Descripcion');
    d("div_emergencial").style.display = "none";
    d("div_arcada").style.display = "none";
    d("div_puente").style.display = "none";
    d("div_cuadrante").style.display = "none";
    d("div_sextante").style.display = "none";
    d("div_diente").style.display = "none";
    d("div_superficie").style.display = "none";
    d("div_ingresar").style.display = "none";
    d("div_observacion").style.display = "none";

    var combo = new combojava();
    combo.id = "drp_hallazgo";
    combo.estilo = "drp";
    combo.propiedades = "width:450px";
    //combo.propiedades = "";
    combo.div = "divhallazgo";
    combo.fuente = dtvhallatra_ordenado;
    combo.datovalor = "Serial_Ha";
    combo.datotexto = "Descripcion";
    combo.evento = "onchange=cambio_hallazgos()";
    combo.fuenteinicial = [{ "Serial_Ha": -1, "Descripcion": "..Seleccione.." }];
    combo.bind()
    d("div_hallazgos").style.display = "block";
}

var hddtejidodes;
var hddtejidoser ;
var hddhallades ;
var hddaplsuper ;
var hddaplsuper2;
var hddaplica ;
var hddcolorh;
var hddconvencionh;
var hddaplica3;
var hddaplsuper3;
var hddserial_hall;
function cambio_hallazgos()
{
    var serial_ha = d("drp_hallazgo").options[d("drp_hallazgo").selectedIndex].value;
    var dtvhallatra = new vista(glcombohallazgos["hallazgos"], "['Serial_Ha']==" + serial_ha, '', '');
    var aplicasuperficie = "";
    if (dtvhallatra.length > 0)
    {
        hddaplica3 = dtvhallatra[0]["AreaAplica"];
      //  var txthalla2 = dtvhallatra[0]["Descripcion"];
        hddserial_hall = serial_ha;
        aplicasuperficie = dtvhallatra[0]["superficie"];

    }

    var dtvhallazgos = new vista(glcombohallazgos["hallazgos2"], "['Serial_Ha']==" + serial_ha, '', '');
    if (dtvhallazgos.length > 0)
    {
        hddtejidodes = dtvhallazgos[0]["tejido_descripcion"];
        hddtejidoser=  dtvhallazgos[0]["Serial_TipoTej"];
        hddhallades = dtvhallazgos[0]["Descripcion"];
        hddaplsuper = dtvhallazgos[0]["superficie"];
        hddaplsuper2 =  aplicasuperficie;
        hddaplica = dtvhallazgos[0]["AreaAplica"];
        hddcolorh = dtvhallazgos[0]["color"];
        hddconvencionh = dtvhallazgos[0]["convencion"];

        farea(hddaplica3);
    }
}

function farea(area) {

    //Si no esta chequedo COP tome el areaplica por tratamiento.

    if ((glmanejo_emergencial == "1") && (glcubierto_emergencial == "1")) {
        var combo = new combojava();
        combo.id = "drp_tipoemergencia";
        combo.estilo = "drp";
        combo.propiedades = "width:450px";
        //combo.propiedades = "";
        combo.div = "divcomboemergencia";
        combo.fuente = [{ serial_tipo:"1",nombre: "Procedimiento Emergencial" }, { serial_tipo:"0",nombre:  "Procedimiento No Emergencial" }];
        combo.datovalor = "serial_tipo";
        combo.datotexto = "nombre";
      //  combo.evento = "onchange=cambio_hallazgos()";
        combo.fuenteinicial = [{ "serial_tipo": "-1", "nombre": "..Seleccione.." }];
        combo.bind();

        d("div_emergencial").style.display = "block";
    }
    else
        d("div_emergencial").style.display = "none";


    hddaplica = area;

    d("div_arcada").style.display = "none";
    d("div_puente").style.display = "none";
    d("div_cuadrante").style.display = "none";
    d("div_sextante").style.display = "none";
    d("div_diente").style.display = "none";
    d("div_superficie").style.display = "none";
    d("div_ingresar").style.display = "none";
    d("div_observacion").style.display = "none";
    if (area == "D") {
        d("div_diente").style.display = "block";
    }
    else if (area == "P") {
        d("div_puente").style.display = "block";
    }
    else if (area == "C") {
        d("div_cuadrante").style.display = "block";
    }
    else if (area == "A") {
        d("div_arcada").style.display = "block";
    }
    else if (area == "S") {
        d("div_sextante").style.display = "block";
    }

  
    if ((hddaplsuper3 == "1") || (hddaplsuper3== "True")) {
        d("div_superficie").style.display = "block";
    }
    else {
        d("div_superficie").style.display = "none";
    }
    d("div_ingresar").style.display = "block";
    d("div_observacion").style.display = "block";
    

    //debugger;
}

function valida_diente(obj)
{
    if (!validaDiente(obj.value))
    {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "El numero Digitado no pertenece a ningun Diente"
        });
        obj.value = '';
        return false;
    }
  
}
function validaDiente(strValue) {

    if ((hddaplica == "D") || (hddaplica == "P")) {
        if (strValue >= 11 && strValue <= 18)
            return true
        if (strValue >= 51 && strValue <= 55)
            return true
        if (strValue >= 21 && strValue <= 28)
            return true
        if (strValue >= 61 && strValue <= 65)
            return true
        if (strValue >= 81 && strValue <= 85)
            return true
        if (strValue >= 41 && strValue <= 48)
            return true
        if (strValue >= 71 && strValue <= 75)
            return true
        if (strValue >= 31 && strValue <= 38)
            return true
    }
}
var arrprocedimientos_nuevos = new Array();
var arrhallazgos = new Array();

var consecutivo_tratamiento = 0;
var consecutivo_hallazgo = 0;

var glmanejo_emergencial = 0;
function pinta_grilla_procedimiento() {

    var cant_ort = 0;
    while (cant_ort < glcantidad_ttos_ortodoncia) {

        consecutivo_tratamiento++;
        consecutivo_hallazgo++;

        var cantidadpuente;
        cantidadpuente = 1;
        var edadpaciente = 0;
        var maxcant = 0;
        if (glcombohallazgos["variables"].length > 0) {
            maxcant = parseInt(glcombohallazgos["variables"][0]["qty_permitida_proce"]);

        }

        var ldet = arrprocedimientos_nuevos.length;

        if ((maxcant >= (ldet + 1)) || (maxcant == 0)) {
            var diente = d("txtdiente").value;

            if (hddaplica == "P") {
                diente = d("txtdiente1").value + "-" + d("txtdiente2").value;
                cantidadpuente = parseInt(d("txtdiente2").value) - parseInt(d("txtdiente1").value) + 1;
            }
            //debugger;
            var n = 0;
            // n = lhalla;

            if (validartodo() == true) {
                edadpaciente = gledad;
                var edadrangoarr = hddedadesvalida;
                //debugger;
                if (edadrangoarr != "" && edadrangoarr != ",") {
                    var edadrango = new Array();
                    edadrango = edadrangoarr.split(",");
                    if ((edadpaciente < edadrango[0]) || (edadpaciente > edadrango[1])) {
                        dhtmlx.alert({
                            title: "Revisar por favor", type: "alert-error",
                            text: "Tratamiento no permitido para la edad del paciente"
                        });
                        return false;
                    }
                }
                cgsuperficies();
                id = id + 1;

                //idodonto = lodo;
                var idodonto;
                //miro si esta insercion tiene odontograma
                if (hddconvencion == "0")
                    idodonto = 0;

                var tipo_emergencial = "0";
                if ((glmanejo_emergencial == "1") && (glcubierto_emergencial == "1")) {
                    tipo_emergencial = d("drp_tipoemergencia").options[d("drp_tipoemergencia").selectedIndex].value;
                }
                //           arrhallazgos

                var obj1 = new Object();
                obj1["hddtejidodes"] = hddtejidodes;
                obj1["txtdiente"] = d("txtdiente").value;
                obj1["hddserial_hall"] = hddserial_hall;
                obj1["hddhallades"] = hddhallades;
                obj1["superficies"] = superficies;
                obj1["diente"] = diente;
                obj1["area"] = hddaplica2;
                obj1["id"] = id;
                obj1["hddtejidoser"] = hddtejidoser;
                obj1["txtobservacion"] = d("txt_observacion").value;
                obj1["hddcolor"] = hddcolor;
                obj1["hddconvencion"] = hddconvencion;
                obj1["idodonto"] = idodonto;
                obj1["consecutivo_hallazgo"] = consecutivo_hallazgo;
                arrhallazgos[arrhallazgos.length] = obj1;


                //            hallazgo2[n] = id +
                //"_" + document.getElementById("hddtejidodes").value +
                //"_" + document.getElementById("txtdiente").value +
                //"_" + document.getElementById("hddserial_hall").value +
                //"_" + document.getElementById("hddhallades").value +
                //"_" + superficies +
                //"_" + diente +
                //"_" + document.getElementById("HiddenField1").value +
                //"_" + id +
                //"_" + document.getElementById("hddtejidoser").value +
                //"_" + document.getElementById("txtobservacion").value +
                //"_" + document.getElementById("hddcolor").value +
                //"_" + document.getElementById("hddconvencion").value +
                //"_" + idodonto;



                d("drp_hallazgo").selectedIndex = 0;
                // lhalla++;

                var objt = new Object();
                objt["id"] = id;
                objt["area"] = hddaplica2;
                objt["diente"] = diente;
                objt["superficies"] = superficies;
                objt["codigo_tra"] = glcodigo_tra;
                objt["control"] = hddcontrol;
                objt["serial_tra"] = serial_tra_seleccionado;
                objt["detalle"] = hdddetalle;
                objt["convencion"] = hddconvencion;
                objt["color"] = hddcolor;
                objt["idodonto"] = idodonto;
                objt["area2"] = hddarea2;
                objt["cantidad"] = "1";
                objt["variable"] = id;
                objt["area3"] = "";
                objt["dientes_posibles"] = "";
                objt["superficie2"] = "1";
                objt["aplicasuperfice"] = "1";
                objt["serial_ort"] = "0";
                objt["opcional"] = "1";
                objt["PagaDgn"] = hddPagaDgn;
                objt["Pvp_vtr"] = hddPvp_vtr;
                objt["cantidadpuente"] = cantidadpuente;
                objt["consecutivo_tratamiento"] = consecutivo_tratamiento;
                objt["emergencial"] = tipo_emergencial;
                arrprocedimientos_nuevos[arrprocedimientos_nuevos.length] = objt;

                //n = ldet;
                //detalle2[n] = id +                //0
                //    "_" + document.getElementById("HiddenField1").value +           //1
                //    "_" + diente +          //2
                //    "_" + superficies +     //3
                //    "_" + document.getElementById("txtntto").value +        //4
                //    "_" + document.getElementById("hddcontrol").value +     //5
                //    "_" + document.getElementById("hddserial_tra").value +  //6
                //    "_" + id +                                              //7
                //    "_" + document.getElementById("txttto").value +         //8
                //    "_" + document.getElementById("hddconvencion").value +  //9
                //    "_" + document.getElementById("hddcolor").value +       //10
                //    "_" + idodonto +                                        //11
                //    "_" + document.getElementById("area2").value +           //12
                //    "_" + "1" +            //cantidad                            //13
                //    "_" + "1" +            //variable                            //14
                //    "_" + "" +           //15  area asi: Arcada1                                
                //    "_" + "" +           //16 Dientes posibles     
                //    "_" + "1" +           //17 superficie   
                //    "_" + "1" +           //18 aplicasuperfice   
                //    "_" + "0" +         //19 serial_ort     
                //    "_" + "1" +         //20 opcional
                //    "_" + document.getElementById("hddPagaDgn").value +     //21
                //    "_" + document.getElementById("hddPvp_vtr").value +  //22
                //    "_" + cantidadpuente;   //23
                //ldet++;

                // ultnt = document.getElementById("txtntto").value;

                if ((cant_ort + 1) == glcantidad_ttos_ortodoncia) {
                    d("txtdiente").value = "";
                    d("txtdiente1").value = "";
                    d("txtdiente2").value = "";
                    //d("txttto").value = "";
                    d("txt_auto_trata2").value = "";
                    d("txt_observacion").value = "";
                    d("div_hallazgos").style.display = "none";
                    d("div_emergencial").style.display = "none";

                    dsuperficies();
                    borra();
                    tabladetalle();
                    // tablahalla();
                    // d("txt_auto_trata").value = "";
                    return false;
                }
            }
            else
                return false;
        }
        else {
            dhtmlx.alert({
                title: "Revisar por favor", type: "alert-error",
                text: " A superado el limite maximo de procedimientos para el presupuesto"
            });

            return false;
        }
        cant_ort++;
    }
}

function dsuperficies() {
    for (n = 0; n < 5; n++) {
        d("chksuperficie_" + n).checked = false;
    }
}
function borra() {
 
    d("div_arcada").style.display = "none";
    d("div_puente").style.display = "none";
    d("div_cuadrante").style.display = "none";
    d("div_sextante").style.display = "none";
    d("div_diente").style.display = "none";
    d("div_superficie").style.display = "none";
    d("div_ingresar").style.display = "none";
    d("div_observacion").style.display = "none";

}
function tabladetalle()
{
    if (arrprocedimientos_nuevos.length > 0) {

        d("div_guardar").style.display = "block";

        var grilla = new grillajava();
        grilla.fuente = arrprocedimientos_nuevos;
        grilla.div = "div_procedimientos_grilla";
        grilla.id = "gw_procedimientos_grilla"
        grilla.autorow = false;
        grilla.habencabezado = true;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:98%";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = ["Código", "Area",  "Superficie", "Procedimiento", "Presupuesto", "Eliminar"];
        grilla.datoscolumnas = ["codigo_tra", "area",  "superficies", "detalle", "control", "serial_tra"];
        grilla.tipocolumna = ["1", "0", "0", "0", "0", "1"];
        grilla.funcioncolumna = ["fun_codigo_tra_in", "", "", "", "", "svg_eliminar_tra"];
        grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
            "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
            "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
            "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
            "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
              "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
            "'width: 50px; text-align:center; '"];
        grilla.bind();
    }
    else
    {
        d("div_procedimientos_grilla").innerHTML = "";
        d("div_guardar").style.display = "none";
    }
}

function fun_codigo_tra_in(fila,dato)
{
    if (fila["emergencial"] == "0")
        return dato;
    else
        return dato + "</br>(Emergencial)";

}
    
function svg_eliminar_tra(fila,dato)
{
    var html_eliminar_tra = '<svg height="20" width="20" style="cursor:pointer; " onclick="return eliminar_procedimiento_pre(' + fila['consecutivo_tratamiento'] + ')"><polygon points="4,3 4,1.5 8.0,1.5 8.0,0.8 12,0.8 12,1.5 16,1.5 16,3.0" style="fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;"></polygon><polygon points="4,4 16,4 14,19 6,19" style="fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;"></polygon></svg>';
    return html_eliminar_tra;
}

function eliminar_procedimiento_pre(consecutivo_tratamiento)
{
    var arrnuevo = new Array();
    var n = 0;
    while (n < arrprocedimientos_nuevos.length)
    {
        var consecutivo_tratamiento_rev = arrprocedimientos_nuevos[n]["consecutivo_tratamiento"];
        if (consecutivo_tratamiento_rev != consecutivo_tratamiento) {
            var objnuevo = new Object();
            for (k in arrprocedimientos_nuevos[n]) {
                objnuevo[k] = arrprocedimientos_nuevos[n][k];
            }
            arrnuevo[arrnuevo.length] = objnuevo;
        }
        n++;
    }
    arrprocedimientos_nuevos = arrnuevo;
    tabladetalle();
    return false;
}
var superficies = "";
var asuper = new Array('M', 'O', 'D', 'P', 'V');
var id = 0;

function cgsuperficies() {
    //debugger;
    var textsup = "";
    superficies = "";
    for (n = 0; n < 5; n++) {
        if (d("chksuperficie_" + n).checked == true) {
            textsup = asuper[n];
            superficies = superficies + textsup;
        }
    }
}

var hddaplica2;
var hddarea2;
function validartodo() {

    var tipo_emergencial="0";
    if ((glmanejo_emergencial == "1") && (glcubierto_emergencial == "1")) 
        {
            tipo_emergencial = d("drp_tipoemergencia").options[d("drp_tipoemergencia").selectedIndex].value;
            if(tipo_emergencial=="-1")
            {
                dhtmlx.alert({
                    title: "Revisar por favor", type: "alert-error",
                    text: "Debe selecionar el tipo"
                });
                return false;
            }
        }

 
    //debugger;
   var area = "";
   var area2 = "";
   var exist = 0;
   switch (hddaplica) {
        case "D":
            area = "Diente";
            area = area + " " + d("txtdiente").value;
            area2 = d("txtdiente").value;
            break;
        case "B":
            area = "Boca";
            area2 = "Boca";
            break;
        case "C":
            var cuad = "";
            if (d("chkcuadrante_0").checked == true)
                cuad = d("chkcuadrante_0").value;
            else if (d("chkcuadrante_1").checked == true)
                cuad = d("chkcuadrante_1").value;
            else if (d("chkcuadrante_2").checked == true)
                cuad = d("chkcuadrante_2").value;
            else if (d("chkcuadrante_3").checked == true)
                cuad = d("chkcuadrante_3").value;
            area = "Cuadrante";
            area = area + " " + cuad;
            area2 = cuad;
            break;
        case "S":
            var sex = "";
            if (d("chksextante_0").checked == true)
                sex = d("chksextante_0").value;
            else if (d("chksextante_1").checked == true)
                sex = d("chksextante_1").value;
            else if (d("chksextante_2").checked == true)
                sex = d("chksextante_2").value;
            else if (d("chksextante_3").checked == true)
                sex = d("chksextante_3").value;
            else if (d("chksextante_4").checked == true)
                sex = d("chksextante_4").value;
            else if (d("chksextante_5").checked == true)
                sex = d("chksextante_5").value;
            area = "Sextante";
            area = area + " " + sex;
            area2 = sex;
            break;

        case "A":
            var arc = "";
            if (d("chkarcada_0").checked == true)
                arc = d("chkarcada_0").value;
            else if (d("chkarcada_1").checked == true)
                arc = d("chkarcada_1").value;

            area = arc;
            area2 = arc;
            break;
        case "P":
            area = "Puente";
            area2 = area;
            if (d("txtdiente1").value > d("txtdiente2").value) {
                dhtmlx.alert({
                    title: "Revisar por favor", type: "alert-error",
                    text: "El diente inicial debe ser menor al diente final"
                });
                return false;
            }
            else {
                if ((d("txtdiente1").value == "") || (d("txtdiente2").value == "")) {
                    dhtmlx.alert({
                        title: "Revisar por favor", type: "alert-error",
                        text: "El numero Digitado no pertenece a ningun Diente"
                    });
                   
                    return false;
                }
                else {
                    area = d("txtdiente1").value + "-" + d("txtdiente2").value;
                    area2 = area;
                }
            }
            break;
    }
    hddaplica2= area;
    //document.getElementById("HiddenField1").value = area;
    hddarea2 = area2;

    var arrdett = new Array();
    var ctrat = 0;
    var i = 0;
    for (i = 0; i < arrprocedimientos_nuevos.length; i++)
    {
        if (arrprocedimientos_nuevos[i]["variable"]== "1") {
            if ((hddaplica == "C") || (hddaplica == "A") || (hddaplica == "S")) {
                if ((arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado)
                    && (arrprocedimientos_nuevos[i]["area"] == area))
                    exist = 1;
            }
            else {
                if ((arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado)
                    && (arrprocedimientos_nuevos[i]["diente"] == d("txtdiente").value))
                    exist = 1;
            }
            if (arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado) {
                ctrat = ctrat + 1;
            }
        }
        else {
            if ((hddaplica == "C") || (hddaplica == "A") || (hddaplica == "S")) {
                if ((arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado) && (arrprocedimientos_nuevos[i]["area3"] == area))
                    exist = 1;
            }
            else {
                if ((arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado) &&
                    (arrprocedimientos_nuevos[i]["diente"] == d("txtdiente").value))
                    exist = 1;
            }
            if (arrprocedimientos_nuevos[i]["serial_tra"] == serial_tra_seleccionado) {
                ctrat = ctrat + 1;
            }
        }
    }
    

    if ((exist == 0)||(String(glserial_especialidad)=="7"))
    {
        if (parseInt(hddcantproceso) != 0) {
            if (ctrat >= parseInt(hddcantproceso)) {
                dhtmlx.alert({
                    title: "Revisar por favor", type: "alert-error",
                    text: "Ya ha ingreso el numero maximo de tratamientos permitidos"
                });
                //mesaje de cant no permiitida
                return false;
            }
        }
        //if((document.getElementById("hddaplica").value=="P") || (document.getElementById("hddaplica").value == "D"))
        if (hddaplica == "D") {
            if (d("txtdiente").value == "") {
                dhtmlx.alert({
                    title: "Revisar por favor", type: "alert-error",
                    text: "Por favor ingrese el diente"
                });
                return false;
            }
            else {

           
                if (parseInt(hdddientesvalida) != 0) {
                    var adientes = new Array();
                    var dientes;
                    var sepuede;

                    sepuede = false;
                    dientes = hdddientesvalida;
                    dientes = dientes.replace(/\s*$/, '');
                    adientes = dientes.split(",");

                    for (i = 0; i < adientes.length; i = i + 1) {
                        if (adientes[i] == d("txtdiente").value) {
                            sepuede = true;
                            break;
                        }
                    }
                    if (sepuede == false) {
                        dhtmlx.alert({
                            title: "Revisar por favor", type: "alert-error",
                            text: "Este diente no se puede agregar para este tratamiento"
                        });
                        //mesaje no diente
                        return false;
                    }
                }
                
            }
        } // fin if P o D

        //si tiene habilitadas superficie el trataamiento verifique que este chequeada
        var aplicasuper = 0;
        aplicasuper = hddaplsuper3;

        if ((aplicasuper == "1") || (aplicasuper == "True")) {
            var cantsuper = 0;

            if (d("chksuperficie_0").checked)
                cantsuper = cantsuper + 1;
            if (d("chksuperficie_1").checked)
                cantsuper = cantsuper + 1;
            if (d("chksuperficie_2").checked)
                cantsuper = cantsuper + 1;
            if (d("chksuperficie_3").checked)
                cantsuper = cantsuper + 1;
            if (d("chksuperficie_4").checked)
                cantsuper = cantsuper + 1;

            if (cantsuper > 0) {
                if (parseInt(hddcantsuper) > 0) {
                    if (cantsuper != parseInt(hddcantsuper)) {
                        dhtmlx.alert({
                            title: "Revisar por favor", type: "alert-error",
                            text: "La Cantidad de superficies no es acorde a la asignada en el tratamiento"
                        });
                        // mensaje .cantsuper diferente
                        return false;
                    }
                }
            }
            else {
                dhtmlx.alert({
                    title: "Revisar por favor", type: "alert-error",
                    text: "Ingrese al Menos una superficie"
                });
                // mensaje ingsuper
                return false;
            }
        }
    }
    else {
            dhtmlx.alert({
            title: "Revisar por favor", type: "alert-error",
            text: "Este proceso ya fue ingresado"
        });
        //mensaje prep
        return false;
    }
    return true;
}


function guardar_ppto()
{
    call_sgu(carga_plan_tto, [[{
        emergencias: glmanejo_emergencial,
        serial_ppac: glserial_ppacseleccionado,
        serial_pac: glserial_pac,
        serial_suc: glserial_suc_seleccionado,
        serial_emp: glserial_emp,
        serial_doc: d("drp_diagnosticador").options[d("drp_diagnosticador").selectedIndex].value
    }], arrprocedimientos_nuevos,arrhallazgos], "crear_ppto", "plan_tratamiento");

    return false;
}


function carga_plan_tto(respuesta) {
    arrprocedimientos_nuevos = new Array();
    arrhallazgos = new Array();
    d("txtdiente").value = "";
    d("txtdiente1").value = "";
    d("txtdiente2").value = "";
    //d("txttto").value = "";
    d("txt_auto_trata2").value = "";
    d("txt_observacion").value = "";
    d("div_hallazgos").style.display = "none";
    d("div_emergencial").style.display = "none";

    dsuperficies();
    borra();
    tabladetalle();
    pintar_plan_tratamiento(respuesta);
}

var glplantratamiento;
var gldocumentos;
var gldocumentos_registrados;
var glmensajes_dtr;
var glmensajes_responsables;
var glevolucionadoxdias;
var glestados_realizado;
var glestados_procedimiento;
var glvariables_convenio;
var glglosas_realizadas;
var glprocedientos;

function pintar_plan_tratamiento(plan_tratamiento) {

    gldocumentos = plan_tratamiento["documentos"];
    gldocumentos_registrados = plan_tratamiento["documentos_registrados"];
    glmensajes_dtr = plan_tratamiento["mensajes_dtr"];
    glmensajes_responsables = plan_tratamiento["mensajes_responsables"];
    glevolucionadoxdias = plan_tratamiento["evolucionadoxdias"];
    glestados_realizado= plan_tratamiento["estados_realizado"];
    glestados_procedimiento=plan_tratamiento["estados_procedimiento"];
    glvariables_convenio = plan_tratamiento["variables_convenio"];
    glglosas_realizadas = plan_tratamiento["glosas_realizadas"];
    glprocedientos = plan_tratamiento["procedimientos"];

    arrprocedimientos_nuevos = new Array();
    arrhallazgos = new Array();
    d("txtdiente").value = "";
    d("txtdiente1").value = "";
    d("txtdiente2").value = "";
    //d("txttto").value = "";
    if (d("txt_auto_trata2")!=undefined)
        d("txt_auto_trata2").value = "";
    d("txt_observacion").value = "";
    d("div_hallazgos").style.display = "none";
    d("div_emergencial").style.display = "none";
    dsuperficies();
    borra();
    tabladetalle();

    d("div_formulario").style.display = "none";
    d("div_anadir_procedimientos").style.display = "none";

    d("div_procedimientos_nuevos").style.display = "none";
    glplantratamiento = plan_tratamiento["plan_tratamiento"];
    pinta_procedimientos();

    if (d("hddserial_dtr").value != "") {
        var serial_dtr_msj = d("hddserial_dtr").value;

        var dtv_ptra = new vista(glplantratamiento, "['serial_dtr']==" + serial_dtr_msj, '', '');
        var n = 0;
        while(n<dtv_ptra.length)
        {
            var serial_ptra = dtv_ptra[n]["serial_ptra"];
            if (d("celda_0_" + serial_ptra) != null)
            {
                d("celda_0_" + serial_ptra).style.backgroundColor = "#00994C";
                var elemento = $("#celda_0_" + serial_ptra);
                var posicion = elemento.position();
                //alert("left: " + posicion.left + ", top: " + posicion.top);
                 d("cuerpo").scrollTop = posicion.top;
            }
            n++;
        }

        
    }
}

var globj_dtr_bloqueados_tra = new Object();
function pinta_procedimientos() {
    globj_dtr_bloqueados_tra = new Object();
    var cantidad_tra_cita = parseInt(glvariables_convenio[0]["cantidad_tra_cita"]);
    var dias_tra_cita = glvariables_convenio[0]["dias_tra_cita"];
    var cambio_autorizados = false;

    var n = 0;
    var arrplantto_format = new Array();

    var arrdtrpreviamente_autorizados = new Array();
    while (n < glplantratamiento.length) {
        var proxima_cita = 0;
        var cantidadxtratamiento = parseInt(glplantratamiento[n]["cantidadxtratamiento"]);//Maximo del tra
        var cantidadxtratamiento2 = parseInt(glplantratamiento[n]["cantidadxtratamiento2"]);//Maximo del tra 2

        //Anula la anterior
        
        var serial_ptra = glplantratamiento[n]["serial_ptra"];
        var serial_dtr = glplantratamiento[n]["serial_dtr"];
        var serial_tra = glplantratamiento[n]["serial_tra"];
        var aplicbeneficio = glplantratamiento[n]["aplicbeneficio"];

        if (((aplicbeneficio == "1") || (aplicbeneficio == "True")) && (glplantratamiento[n]["serial_realizado"] == "3")) {
            var dtv_dias_tra = new vista(glevolucionadoxdias, "['serial_tra']==" + serial_tra, '', '');
            dtv_dias_tra = new vista(dtv_dias_tra, "['serial_dtr']!=" + serial_dtr, '', '');
            var cantidad_tra_realizado = dtv_dias_tra.length;
            var dtv_dias_tragen = new vista(glevolucionadoxdias, "['serial_dtr']!=" + serial_dtr, '', '');

            var glplantratamiento_filtrado_ben = new vista(glplantratamiento, "['aplicbeneficio']=='True'", '', '');
            glplantratamiento_filtrado_ben = new vista(glplantratamiento, "['fecha_evol']==''", '', '');

            var glplantratamiento_filtrado = new vista(glplantratamiento_filtrado_ben, "['serial_realizado']==3", '', '');
            var glplantratamiento_filtrado = new vista(glplantratamiento_filtrado, "['aplicbeneficio']=='True'", '', '');

            //Necesito revisar cuantos dtr estan ya autorizados de este tratamiento,sin incluir este dtr
            var dtv_autorizados_realizar = new vista(glplantratamiento_filtrado, "['autorizado_a_realizar']==1", '', '');
            var dtv_autorizados_nodtr = new vista(dtv_autorizados_realizar, "['serial_dtr']!=" + serial_dtr, '', '');
            var dtv_autorizados = new vista(dtv_autorizados_nodtr, "['serial_tra']==" + serial_tra, '', '');



            var objdtr_no = new Object();
            var j = 0;
            while (j < dtv_autorizados_nodtr.length) {
                objdtr_no[dtv_autorizados_nodtr[j]["serial_dtr"]] = "1";
                j++;
            }
            var cant_dtr_no = 0;
            for (k in objdtr_no) {
                cant_dtr_no++;
            }


            var dtv_autorizados4 = new vista(dtv_autorizados_realizar, "['serial_dtr']==" + serial_dtr, '', '');
            //Ahora agrupar por dtr
            var objdtr = new Object();
            var j = 0;
            while (j < dtv_autorizados.length) {
                objdtr[dtv_autorizados[j]["serial_dtr"]] = "1";
                j++;
            }
            var cant_dtr = 0;
            for (k in objdtr) {
                cant_dtr++;
            }
            //cantidad_nueva_hipotetica
            //Los dtr que tengo autorizados del tra +
            //Los dtr que tengo parcialmente evolucionados viejos del tra + 
            //Los dtr que tengo parcialmente evolucionados recientes del tra +
            //quito dtr del tra actual
            //+1

            //cantidad_hipo2
            //Los dtr que autorice en el recorrido +
            //+ Los dtr que tengo parcialmente evolucionados viejos del tra + 
            //Los dtr que tengo parcialmente evolucionados recientes del tra +
            //Los dtr autorizados manualmente
            //quito dtr actual
            //+1

            //cantidad_hipo3
            //Los dtr que autorice en el recorrido +
            //+ Los dtr que tengo parcialmente evolucionados viejos del tra + 
            //Los dtr que tengo parcialmente evolucionados recientes del tra +
            //Los dtr que estaban autorizados con anticipacion +
            //Los dtr autorizados manualmente

            //quito dtr actual
            //+1



            var cant_evol_viejos = 0;


            var objdtr_ch = new Object();
            var objdtr_ch2 = new Object();
            var objdtr_ch3 = new Object();

            objdtr_ch[serial_dtr] = "1";
            objdtr_ch2[serial_dtr] = "1";
            objdtr_ch3[serial_dtr] = "1";
            ///*******INI****cantidad_nueva_hipotetica***********
            var r1 = 0;
            while (r1 < dtv_dias_tra.length) {
                objdtr_ch[dtv_dias_tra[r1]["serial_dtr"]] = "1";
                r1++;
            }

            //Tengo que sumarle los evolucionados del tra
            /*
            var dtv_evolucionados = new vista(glplantratamiento_filtrado_ben, "['serial_realizado']==5", '', '');
            var dtv_evolucionadostra = new vista(dtv_autorizados_realizar, "['serial_tra']==" + serial_tra, '', '');
            var evo = 0;
            while (evo < dtv_evolucionadostra.length) {
                objdtr_ch[dtv_evolucionadostra[evo]["serial_dtr"]] = "1";

                evo++;
            }
            */
            //Tengo que sumarle los autorizados del tra
            var glplantratamiento_filtrado_ben_auto = new vista(glplantratamiento_filtrado, "['aplicbeneficio']=='True'", '', '');
            var dtv_auto = new vista(glplantratamiento_filtrado_ben_auto, "['autorizado_a_realizar']==1", '', '');
            var dtv_auto1 = new vista(dtv_auto, "['serial_tra']==" + serial_tra, '', '');
            var aut = 0;
            while (aut < dtv_auto1.length) {
                objdtr_ch[dtv_auto1[aut]["serial_dtr"]] = "1";
                aut++;
            }

            //Tengo que sumarle los autorizados MANUALMENTE del tra
            var glplantratamiento_filtrado_ben_auto = new vista(glplantratamiento_filtrado, "['aplicbeneficio']=='True'", '', '');
            var dtv_auto_manualmente = new vista(glplantratamiento_filtrado_ben_auto, "['autorizado_manualmente']==1", '', '');
            var dtv_auto3 = new vista(dtv_auto_manualmente, "['serial_tra']==" + serial_tra, '', '');
            var aut = 0;
            while (aut < dtv_auto3.length) {
                objdtr_ch[dtv_auto3[aut]["serial_dtr"]] = "1";
                aut++;
            }
            // var cantidad_nueva_hipotetica = cantidad_tra_realizado + cant_dtr + 1;
            var cantidad_nueva_hipotetica = 0;
            for (k in objdtr_ch) {
                cantidad_nueva_hipotetica++;
            }
            ///*******FIN***cantidad_nueva_hipotetica***********


            ///*******INI*****cantidad_hipo2***********

            var ed = 0;
            while (ed < glevolucionadoxdias.length) {
                objdtr_ch2[glevolucionadoxdias[ed]["serial_dtr"]] = "1";
                objdtr_ch3[glevolucionadoxdias[ed]["serial_dtr"]] = "1";
                ed++;
            }

            var pa = 0;
            while (pa < arrdtrpreviamente_autorizados.length) {
                objdtr_ch2[arrdtrpreviamente_autorizados[pa]] = "1";
                objdtr_ch3[arrdtrpreviamente_autorizados[pa]] = "1";
                pa++;
            }
            var pa = 0;
            while (pa < dtv_auto_manualmente.length) {
                objdtr_ch2[dtv_auto_manualmente[pa]["serial_dtr"]] = "1";
                objdtr_ch3[dtv_auto_manualmente[pa]["serial_dtr"]] = "1";
                pa++;
            }
            

            //Tengo que sumarle los evolucionados viejos
            /*
            var evo = 0;
            while (evo < dtv_evolucionados.length) {
                objdtr_ch2[dtv_evolucionados[evo]["serial_dtr"]] = "1";
                objdtr_ch3[dtv_evolucionados[evo]["serial_dtr"]] = "1";
                evo++;
            }
            */
            var objtracon_cantidad2 = new Object();
            var cantidad_hipo2 = 0;
            for (k in objdtr_ch2) {
                //Revisar si el serial_dtr es de un serial_tra que tiene cantidad_tratamiento2 != 0
                var cantidadxtra2 = 0;
                var serial_tra = "";
                var dtv_auto_tra = new vista(glplantratamiento, "['serial_dtr']=="+k, '', '');
                if (dtv_auto_tra == 0)
                {
                    dtv_auto_tra = new vista(glevolucionadoxdias, "['serial_dtr']==" + k, '', '');
                    if(dtv_auto_tra.length!=0)
                    {
                        cantidadxtra2 = parseInt(dtv_auto_tra[0]["cantidadxtra2"]);
                        serial_tra = dtv_auto_tra[0]["serial_tra"];
                    }
                }
                else
                {
                    cantidadxtra2 = parseInt(dtv_auto_tra[0]["cantidadxtratamiento2"]);
                    serial_tra = dtv_auto_tra[0]["serial_tra"];
                }
                if (cantidadxtra2 != 0)
                {
                    if (objtracon_cantidad2[serial_tra] == undefined)
                    {
                        objtracon_cantidad2[serial_tra] = "1";
                        cantidad_hipo2++;
                    }
                }
                else
                    cantidad_hipo2++;
            }
            ///*******FIN****cantidad_hipo2***********


            ///*******cantidad_hipo3***********
            var dtv_auto_3 = new vista(glplantratamiento_filtrado, "['autorizado_a_realizar']==1", '', '');
 
            var aut = 0;
            while (aut < dtv_auto_3.length) {
                objdtr_ch3[dtv_auto_3[aut]["serial_dtr"]] = "1";
                aut++;
            }
            var objtracon_cantidad2_b = new Object();
            var cantidad_hipo3 = 0;
            for (k in objdtr_ch3) {
                //Revisar si el serial_dtr es de un serial_tra que tiene cantidad_tratamiento2 != 0
                var cantidadxtra2 = 0;
                var serial_tra = "";
                var dtv_auto_tra = new vista(glplantratamiento, "['serial_dtr']==" + k, '', '');
                if (dtv_auto_tra == 0) {
                    dtv_auto_tra = new vista(glevolucionadoxdias, "['serial_dtr']==" + k, '', '');
                    if (dtv_auto_tra.length != 0) {
                        cantidadxtra2 = parseInt(dtv_auto_tra[0]["cantidadxtra2"]);
                        serial_tra = dtv_auto_tra[0]["serial_tra"];
                    }
                }
                else {
                    cantidadxtra2 = parseInt(dtv_auto_tra[0]["cantidadxtratamiento2"]);
                    serial_tra = dtv_auto_tra[0]["serial_tra"];
                }
                if (cantidadxtra2 != 0) {
                    if (objtracon_cantidad2_b[serial_tra] == undefined) {
                        objtracon_cantidad2_b[serial_tra] = "1";
                        cantidad_hipo3++;
                    }
                }
                else
                    cantidad_hipo3++;
            }
            ///*******cantidad_hipo3***********
            //cantidad_tra_realizado Cantidad dtr realizados recientemente de un tra
            // var cantidad_nueva_hipotetica = cantidad_tra_realizado + cant_dtr + 1;

            var pasa_por_cantidad_tratamiento = true;
            if (cantidadxtratamiento2 == 0) {
                if (cantidad_nueva_hipotetica > cantidadxtratamiento) {
                    pasa_por_cantidad_tratamiento = false;
                }
            }
            else
            {
                if (cantidad_nueva_hipotetica > cantidadxtratamiento2) {
                    pasa_por_cantidad_tratamiento = false;
                }
            }

            if (pasa_por_cantidad_tratamiento==false) {
                proxima_cita = 1;
                globj_dtr_bloqueados_tra[serial_dtr] = "1";
                //Mirar si estaba autorizado
                if (dtv_autorizados4.length > 0) {
                    cambio_autorizados = true;
                    var ptra = 0;
                    while (ptra < glplantratamiento.length) {
                        if (glplantratamiento[ptra]["serial_dtr"] == serial_dtr)
                            glplantratamiento[ptra]["autorizado_a_realizar"] = "0";
                        ptra++;
                    }

                }
                //Es para proxima cita, pero pudo haber estado autorizado
                //alert("aca");
            }
            else {
                var cantidad_prev_autorizados = 0;
                cantidad_prev_autorizados = arrdtrpreviamente_autorizados.length;
                //if (arrdtrpreviamente_autorizados.indexOf(serial_dtr) != -1)
                //    cantidad_prev_autorizados = cantidad_prev_autorizados - 1;

                //**************

                // var cantidad_hipo2 = dtv_dias_tragen.length + cant_evol_viejos + 1 + cantidad_prev_autorizados;
                //Puede este dtr incluirse sin superar el limite de los dias
                if (cantidad_hipo2 <= cantidad_tra_cita) {
                    //Mirar si ya estaba autorizado
                    if (dtv_autorizados4.length > 0) {
                        //Dejarlo quieto, ya esta autorizado previamete
                        arrdtrpreviamente_autorizados[arrdtrpreviamente_autorizados.length] = serial_dtr;
                    }
                    else {
                        // NO estaba autorizado previamente

                        //Mirar si bloquea a alguno autorizado previamente con estado guardado
                        //  cantidad_hipo3 = cant_dtr_no + dtv_dias_tragen.length + 1 + cant_evol_viejos;
                        if ((cantidad_hipo3) <= cantidad_tra_cita) {
                            //No bloquea, se puede autorizar
                            arrdtrpreviamente_autorizados[arrdtrpreviamente_autorizados.length] = serial_dtr;
                            cambio_autorizados = true;
                            proxima_cita = 0;
                            var ptra = 0;
                            while (ptra < glplantratamiento.length) {
                                if (glplantratamiento[ptra]["serial_dtr"] == serial_dtr)
                                    glplantratamiento[ptra]["autorizado_a_realizar"] = "1";
                                ptra++;
                            }

                        }
                        else {
                            //Si bloquea, No se puede autorizar
                            proxima_cita = 1;
                            var ptra = 0;
                            while (ptra < glplantratamiento.length) {
                                if (glplantratamiento[ptra]["serial_dtr"] == serial_dtr)
                                    glplantratamiento[ptra]["autorizado_a_realizar"] = "0";
                                ptra++;
                            }
                        }
                    }
                }
                else {
                    //No esta autorizado

                    proxima_cita = 1;
                    //Mirar si estaba autorizado
                    if (dtv_autorizados4.length > 0) {
                        cambio_autorizados = true;
                        var ptra = 0;
                        while (ptra < glplantratamiento.length) {
                            if (glplantratamiento[ptra]["serial_dtr"] == serial_dtr)
                                glplantratamiento[ptra]["autorizado_a_realizar"] = "0";
                            ptra++;
                        }
                    }
                }


            }

        }
        else
            glplantratamiento[n]["autorizado_a_realizar"] = "1";

        var objtto = new Object();
        objtto["consecutivo"] = n + 1;
        objtto["serial_ptra"] = glplantratamiento[n]["serial_ptra"];
        objtto["codigo"] = glplantratamiento[n]["codigo"];
        objtto["nombre_tratamiento"] = glplantratamiento[n]["nombre_tratamiento"];
        objtto["fecha_tomado"] = glplantratamiento[n]["fecha_tomado"];
        objtto["area"] = glplantratamiento[n]["area"];
        objtto["superficie"] = glplantratamiento[n]["superficie"];
        var signo = "";
        if ((glplantratamiento[n]["cuentaxpagar"] != "")&&(glplantratamiento[n]["cuentaxpagar"] != "-"))
            signo = "$";

        objtto["cobro_a_paciente"] = format(String(glplantratamiento[n]["cobro_a_paciente"]), 0);
        objtto["cuentaxpagar"] = signo + format(String(glplantratamiento[n]["cuentaxpagar"]), 0);
        objtto["fecha_evol"] = glplantratamiento[n]["fecha_evol"];

        var dtv = new vista(glestados_procedimiento, "['serial_estado']==" + glplantratamiento[n]["serial_estado"], '', '');
        if (dtv.length > 0) {
            objtto["nombre_estado"] = dtv[0]["descripcion"];
        }
        else
            objtto["nombre_estado"] = "";

        if ((glplantratamiento[n]["beneficio"] == "1") || (glplantratamiento[n]["beneficio"] == "True"))
            objtto["nombre_beneficio"] = "Si";
        else
            objtto["nombre_beneficio"] = "No";

        if ((glplantratamiento[n]["aplicbeneficio"] == "1") || (glplantratamiento[n]["aplicbeneficio"] == "True"))
            objtto["nombre_aplicbeneficio"] = "Si";
        else
            objtto["nombre_aplicbeneficio"] = "En este momento NO esta cubierto"

        //if (glplantratamiento[n]["fecha_evol"] != "")
        //    objtto["texto_fecha_evol"] = "Fecha evolución";
        //else
        //    objtto["texto_fecha_evol"] = "Aun no esta evolucionado";


        objtto["periodo_pagado"] = glplantratamiento[n]["periodo_pagado"];

        var dtv_realizado = new vista(glestados_realizado,
            "['serial_realizado']==" + glplantratamiento[n]["serial_realizado"], '', '');

        var descripcion_realizado = "";
        if (dtv_realizado.length > 0)
            descripcion_realizado = dtv_realizado[0]["descripcion"];

        var svg_realizado1;
        switch (glplantratamiento[n]["serial_realizado"]) {
            case "1":
                svg_realizado1 = d("svg_realizado");//ESPERA IMAGENES
                objtto["texto_fecha_evol"] = descripcion_realizado;
                objtto["fecha_evol"] = "";
                break;
            case "2":
                svg_realizado1 = d("svg_enaduditoria");
                objtto["texto_fecha_evol"] = descripcion_realizado;
                objtto["fecha_evol"] = "";
                break;
            case "3":
                if (proxima_cita == 0)
                    svg_realizado1 = d("svg_aevolucionar");
                else {
                  
                    var dtv_realizado1 = new vista(glestados_realizado,
                     "['serial_realizado']==7", '', '');
                    if (dtv_realizado1.length > 0)
                        descripcion_realizado = dtv_realizado1[0]["descripcion"];
                    svg_realizado1 = d("svg_prox_cita");
                }
                //svg_prox_cita
                // svg_realizado1 = d("svg_evolucionado");
                objtto["texto_fecha_evol"] = descripcion_realizado;
                objtto["fecha_evol"] = "";
                break;
            case "5":

                if (glplantratamiento[n]["serial_estado"] == "4")
                    svg_realizado1 = d("svg_pagado");
                else
                    svg_realizado1 = d("svg_evolucionado");

                objtto["texto_fecha_evol"] = "Fecha evolución";
                objtto["fecha_evol"] = glplantratamiento[n]["fecha_evol"];
                break;
            case "6":
                svg_realizado1 = d("svg_rechazado");
                objtto["texto_fecha_evol"] = descripcion_realizado;
                objtto["fecha_evol"] = "";
                break;
            case "8":
                svg_realizado1 = d("svg_aevolucionar");

                var dtv_realizado1 = new vista(glestados_realizado,
                        "['serial_realizado']==8", '', '');
                if (dtv_realizado1.length > 0)
                    descripcion_realizado = dtv_realizado1[0]["descripcion"];

                objtto["texto_fecha_evol"] = descripcion_realizado;
                objtto["fecha_evol"] = "";

                break;

        }

        var svg_realizado_clon = svg_realizado1.cloneNode(true);
        svg_realizado_clon.id = "svg_realizado_" + glplantratamiento[n]["serial_ptra"];
        svg_realizado_clon.style.display = "inline-block";

        var div1 = document.createElement("div");
        div1.appendChild(svg_realizado_clon);

        objtto["svg_realizado"] = div1.innerHTML;
      //  objtto["svg_realizado"] = $('selector').clone().wrap('<p>').parent().html();

        var svg_impresion1 = d("svg_print");
        var svg_impresion1_clon = svg_impresion1.cloneNode(true);
        svg_impresion1_clon.id = "svg_impresion_" + glplantratamiento[n]["serial_ptra"];
        svg_impresion1_clon.style.display = "inline-block";

        var div2 = document.createElement("div");
        div2.appendChild(svg_impresion1_clon);

        objtto["svg_impresion"] = div2.innerHTML;

        arrplantto_format[arrplantto_format.length] = objtto;

        n++;
    }

    var id_tabla = "div_tabla_plantto";
    var id_llave = "serial_ptra";
    var descripcion = "nombre_tratamiento";
    var ordena_filas = true;
    if ((glpermisos_promotor[0]["puede_modificarplantratamiento"] == "0") || (glpermisos_promotor[0]["puede_modificarplantratamiento"] == "False")) {
        ordena_filas = false;
    }

    glfunciones_global_ordena["div1_ord1_" + id_tabla] = "cambia_orden_plantto";
    grilla_plantilla(arrplantto_format, id_tabla, id_llave, descripcion, ordena_filas);
    ajusta_formato_plantto(glplantratamiento);


    if (window.length > 1) {
        if (window[1] != undefined) {
            if (window[1].glcargo_mensajeria == 1) {
                // alert("Men");
                termino_mensajeria();
            }
        }
    }


    if (cambio_autorizados == true) {
        var dtv_autorizados = new vista(glplantratamiento, "['autorizado_a_realizar']==1", '', '');
        var cadena_dtr = "";
        if (dtv_autorizados.length > 0) {

            var j = 0;
            while (j < dtv_autorizados.length) {
                cadena_dtr = cadena_dtr + dtv_autorizados[j]["serial_dtr"] + ",";
                j++;
            }
            if (cadena_dtr.length > 0)
                cadena_dtr = cadena_dtr.substr(0, cadena_dtr.length - 1);
        }

        var dtv_autorizados_noreal = new vista(glplantratamiento, "['autorizado_a_realizar']==0", '', '');
        var cadena_dtr_no = "";
        if (dtv_autorizados_noreal.length > 0) {

            var j = 0;
            while (j < dtv_autorizados_noreal.length) {
                cadena_dtr_no = cadena_dtr_no + dtv_autorizados_noreal[j]["serial_dtr"] + ",";
                j++;
            }
            if (cadena_dtr_no.length > 0)
                cadena_dtr_no = cadena_dtr_no.substr(0, cadena_dtr_no.length - 1);
        }

        call_sgu(actualiza_autorizados_post, [[{ strcadena_dtr: cadena_dtr, strcadena_dtr_no: cadena_dtr_no }]], "actualiza_autorizados", "plan_tratamiento");
    }

}
function actualiza_autorizados_post(respuesta) {

}
var glarrcambios;
function cambia_orden_plantto(id_caja)
{
    var arrcambios = revisa_cambios_orden(id_caja, glplantratamiento, "serial_ptra", "plantto");

    if (arrcambios.length > 0) {
        glarrcambios = arrcambios;
        var arrgenerico = [{
            tabla: "plantratamiento",
            serial: "Serial_PTRA",
            campo_orden: "PlanTto"
        }];
        glmuestra_cargando = false;
        call_sgu(cambia_orden_post, [arrgenerico, arrcambios], "cambia_orden", "form");
    }
}

function cambia_orden_post(respuesta)
{
    glmuestra_cargando = true;
    if(respuesta["correcto"]=="1")
    {
        actualiza_datos_locales();
    }
    
}
function actualiza_datos_locales()
{
    var llave = "serial_ptra";
    var campo_orden = "plantto";
    var n = 0;
    while (n < glplantratamiento.length)
    {
        var dato_llave = glplantratamiento[n][llave];
        var dtv_cambio = new vista(glarrcambios,
            "['serial_orden']=='" + dato_llave + "'", '', '');

        if (dtv_cambio.length > 0)
        {
            glplantratamiento[n][campo_orden] = dtv_cambio[0]["orden_nuevo"];
        }
               
        n++;
    }
}
var gltipo_auditoria = "";

function ajusta_formato_plantto(arrplan_tratamiento)
{
    var serial_prm = d("hddserial_prm").value;
    /*
        //RESULTADO

        1	Espera Imagenes
        2	En Auditoria
        3	Autorizado
        5	Evolucionado
        6	Rechazado
        7	Proxima Cita
        8	Autorizado Manualmente
    */

    var n = 0;
    while(n<arrplan_tratamiento.length)
    {

       


        var serial_ptra = arrplan_tratamiento[n]["serial_ptra"];
        objimpresion[serial_ptra] = "0";
        var serial_dtr = arrplan_tratamiento[n]["serial_dtr"];
        objimpresion_dtr[serial_dtr] = "0";

        var serial_estado = arrplan_tratamiento[n]["serial_estado"];
        var serial_realizado = arrplan_tratamiento[n]["serial_realizado"];
        var serial_tra = arrplan_tratamiento[n]["serial_tra"];

        var emergencial = arrplan_tratamiento[n]["emergencial"];
        if (emergencial == "1")
        {
            d("sp_emergencial_" + serial_ptra).innerText = "(Emergencial)"
        }
        //Autorizador manual
        d("svg_aut_manual_" + serial_ptra).style.display = "none";
        if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True")) {

            d("svg_aut_manual_" + serial_ptra).style.display = "inline-block";
            if ((arrplan_tratamiento[n]["serial_realizado"] == "1") || (arrplan_tratamiento[n]["serial_realizado"] == "2")
                || ((arrplan_tratamiento[n]["serial_realizado"] == "3") && (arrplan_tratamiento[n]["autorizado_a_realizar"] == "0"))) {

                d("svg_aut_manual_" + serial_ptra).serial_ptra = serial_ptra;
                d("svg_aut_manual_" + serial_ptra).serial_dtr = serial_dtr;
                d("svg_aut_manual_" + serial_ptra).style.cursor = "pointer";
                d("svg_aut_manual_" + serial_ptra).onclick = function () {
                    glserial_dtr = this.serial_dtr;
                    gltipo_auditoria = this.tipo_auditoria;

                    d("txt_observacion_autorizacion_manual").value = "";

                    var vcodigo = "";
                    var vdiente = "";
                    var vsuperficie = "";
                    var vdescripcion = "";
                    var nombre_proc = "";
                    var dtv_desc = new vista(glprocedientos,
                     "['serial_dtr']==" + this.serial_dtr, '', '');

                    if (dtv_desc.length > 0) {
                        vdescripcion = dtv_desc[0]["nombre_tra"];
                        vcodigo = dtv_desc[0]["codigo_tra"];
                        vsuperficie = dtv_desc[0]["superficie"];
                        vdiente = dtv_desc[0]["diente"];
                        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

                    }
                    d("sp_proce_autorizar_manualmente").innerText = nombre_proc;

                    ver_modal("div_autorizar_manualmente");
                    return false;
                }
            }
            else {
                d("svg_aut_manual_" + serial_ptra).style.fill = "gainsboro";
            }
        }

        //Revisar si tiene mensaje
        if (arrplan_tratamiento[n]["serial_realizado"] == "2")
        {
            var revisar_audit = false;
            //glmensajes_responsables
            var dtv_mensajes_dtr = new vista(glmensajes_dtr, "['serial_dtr']==" + serial_dtr, '', '');
            dtv_mensajes_dtr = new vista(dtv_mensajes_dtr, "['abierto']==1", '', '');
            var nmen = 0;
            while(nmen<dtv_mensajes_dtr.length) {

                var serial_tqueja = dtv_mensajes_dtr[nmen]["serial_tqueja"];
                var serial_prm_asignado = dtv_mensajes_dtr[nmen]["serial_prm_asignado"];
                var serial_prm_abre = dtv_mensajes_dtr[nmen]["serial_prm_abre"];
                var revisado = dtv_mensajes_dtr[nmen]["revisado"];
                var revisado_otros = dtv_mensajes_dtr[nmen]["revisado_otros"];

                if (serial_prm_abre == serial_prm)
                {
                    if (revisado_otros  == "0") {
                        revisar_audit = true;
                        break;
                    }
                }
                else if (serial_prm_asignado == serial_prm)
                {
                    if (revisado == "0") {
                        revisar_audit = true;
                        break;
                    }
                }
                else {
                    //Revisar si lo puede resolver
                    var dtv_mensajes_resp = new vista(glmensajes_responsables, "['serial_tqueja']==" + serial_tqueja, '', '');
                    dtv_mensajes_resp = new vista(dtv_mensajes_resp, "['serial_prm']==" + serial_prm, '', '');

                    if (dtv_mensajes_resp.length > 0) {
                        //Lo puede resolver
                        if (revisado == "0") {
                            revisar_audit = true;
                            break;
                        }
                    }
                    else
                    {
                        //No puede resolver
                        if (revisado_otros == "0") {
                            revisar_audit = true;
                            break;
                        }
                    }
                }
             // var dtv_mensajes_dtr_resp = new vista(glmensajes_responsables, "['serial_dtr']==" + serial_dtr, '', '');
                // d("svg_realizado_" + serial_ptra).style.fill = "#B0ABAB";
                nmen++;
            }
            if (revisar_audit==false)
                d("svg_realizado_" + serial_ptra).style.fill = "#B0ABAB";

        }

        //Autorizador
        d("svg_auditar_" + serial_ptra).style.display = "none";
        if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True"))
        {
           
            d("svg_auditar_" + serial_ptra).serial_ptra = serial_ptra;
            d("svg_auditar_" + serial_ptra).serial_dtr = serial_dtr;
            var tipo_auditoria = 0;
            //Tipo 1: pre, Tipo 2: post
            var activo_auditoria = false;
            if (serial_realizado == "2") {
                //En Auditoria, debe estar activo
                activo_auditoria = true;
                tipo_auditoria = 1;
            }
            else if (serial_realizado == "5")
            {
                //Evolucionado, reviso el estado
                if(serial_estado=="3")
                {
                    //Esta Incompleto, 
                    //Reviso que tiene todas las imagenes del dtr.
                    //Miro los documentos que necesita el serial_tra

                    var documentos_completos = true;
                    var dtv_documentosnecesarios = new vista(gldocumentos, "['serial_tra']==" + serial_tra, '', '');
                    var m = 0;
                    while(m<dtv_documentosnecesarios.length)
                    {
                        var serial_tdoc = dtv_documentosnecesarios[m]["serial_tdoc"];
                        var dtv_documentosregistrados = new vista(gldocumentos_registrados, "['serial_Dtr']==" + serial_dtr, '', '');
                        var dtv_docreg_necesario = new vista(dtv_documentosregistrados, "['serial_tdoc']==" + serial_tdoc, '', '');
                        if (dtv_docreg_necesario.length == 0)
                        {
                            documentos_completos = false;
                            break;
                        }
                        m++;
                    }
                    if(documentos_completos==true)
                    {
                        activo_auditoria = true;
                        tipo_auditoria = 2;
                    }

                }
                else if (serial_estado == "4") {
                    d("sp_nombre_estado_" + serial_ptra).innerText = d("sp_nombre_estado_" + serial_ptra).innerText + " en " + arrplan_tratamiento[n]["periodo_pagado"];
                }
             
            }
            d("svg_auditar_" + serial_ptra).style.display = "inline-block";
            d("svg_auditar_" + serial_ptra).tipo_auditoria = tipo_auditoria;
            if (activo_auditoria == false)
            {
                d("svg_auditar_" + serial_ptra).style.cursor = "";
                d("svg_auditar_" + serial_ptra).style.fill = "gainsboro";
            }
            else
            {
                d("svg_auditar_" + serial_ptra).style.cursor = "pointer";
                d("svg_auditar_" + serial_ptra).onclick = function () {
                    glserial_dtr = this.serial_dtr;
                    gltipo_auditoria = this.tipo_auditoria;

                    d("txt_observacion_autorizacion").value = "";
                    var dtv_desc = new vista(arrplan_tratamiento,
                       "['serial_ptra']==" + this.serial_ptra, '', '');

                    var vcodigo = "";
                    var vdiente = "";
                    var vsuperficie = "";
                    var vdescripcion = "";
                    var nombre_proc = "";
                    var dtv_desc = new vista(arrplan_tratamiento,
                     "['serial_ptra']==" + this.serial_ptra, '', '');

                    if (dtv_desc.length > 0) {
                        vdescripcion = dtv_desc[0]["nombre_tratamiento"];
                        vcodigo = dtv_desc[0]["codigo"];
                        vsuperficie = dtv_desc[0]["superficie"];
                        vdiente = dtv_desc[0]["area"];
                        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

                    }
                    d("sp_proce_autorizar").innerText = nombre_proc;

                    ver_modal("div_autorizar");
                    return false;
                }
            }

           
        }

        if ((glpermisos_promotor[0]["puede_retirarprocedimiento"] == "0") || (glpermisos_promotor[0]["puede_retirarprocedimiento"] == "False")) {
            d("svg_eliminar_" + serial_ptra).setAttribute("onclick", "");
            d("svg_eliminar_" + serial_ptra).style.cursor="";
            d("svg_eliminar_" + serial_ptra).style.fill = "gainsboro";
        }
        if (arrplan_tratamiento[n]["serial_estado"] == "4") {
            d("svg_eliminar_" + serial_ptra).setAttribute("onclick", "");
            d("svg_eliminar_" + serial_ptra).style.cursor = "";
            d("svg_eliminar_" + serial_ptra).style.fill = "gainsboro";
        }
        var dcuentaxpagar = 0;
        if ((arrplan_tratamiento[n]["cuentaxpagar"] != "") && (arrplan_tratamiento[n]["cuentaxpagar"] != "-"))
        {
            dcuentaxpagar = parseFloat(arrplan_tratamiento[n]["cuentaxpagar"]);
            if(dcuentaxpagar<0)
            {
                d("svg_eliminar_" + serial_ptra).setAttribute("onclick", "");
                d("svg_eliminar_" + serial_ptra).style.cursor = "";
                d("svg_eliminar_" + serial_ptra).style.fill = "gainsboro";
            }
        }

        if (((arrplan_tratamiento[n]["beneficio"] == "1") || (arrplan_tratamiento[n]["beneficio"] == "True"))
            &&
           ((arrplan_tratamiento[n]["aplicbeneficio"] == "1") || (arrplan_tratamiento[n]["aplicbeneficio"] == "True")))
        {
            //Cubierto y aplica en este momento
            d("sp_beneficio_" + serial_ptra).style.position = "relative";
            d("sp_beneficio_" + serial_ptra).style.top = "27px";
            d("sp_aplbeneficio_" + serial_ptra).style.display = "none";
        }
        if (((arrplan_tratamiento[n]["beneficio"] == "1") || (arrplan_tratamiento[n]["beneficio"] == "True"))
       &&
      ((arrplan_tratamiento[n]["aplicbeneficio"] == "0") || (arrplan_tratamiento[n]["aplicbeneficio"] == "False"))) {
            //Cubierto y NO aplica en este momento
            d("sp_aplbeneficio_" + serial_ptra).serial_ptra = serial_ptra;
            d("sp_aplbeneficio_" + serial_ptra).style.cursor = "pointer";
            d("sp_aplbeneficio_" + serial_ptra).onclick = function () {
                ver_glosas(this.serial_ptra);
                return false;
            }
        }

        if ((arrplan_tratamiento[n]["beneficio"] == "0") || (arrplan_tratamiento[n]["beneficio"] == "False"))
         {
            //Cubierto y aplica en este momento
            d("sp_beneficio_" + serial_ptra).style.position = "relative";
            d("sp_beneficio_" + serial_ptra).style.top = "27px";
            d("sp_aplbeneficio_" + serial_ptra).style.display = "none";
        }

        d("svg_impresion_" + serial_ptra).serial_ptra = serial_ptra;
        d("svg_impresion_" + serial_ptra).serial_dtr = serial_dtr;
        d("svg_impresion_" +serial_ptra).onclick=function()
        {
            if (objimpresion[this.serial_ptra] == "1") {
                objimpresion[this.serial_ptra] = "0";
                objimpresion_dtr[this.serial_dtr] = "0";
                d("svg_impresion_" + this.serial_ptra).setAttribute("fill", "gainsboro");
            }
            else {
                objimpresion[this.serial_ptra] = "1";
                objimpresion_dtr[this.serial_dtr] = "1";
                d("svg_impresion_" + this.serial_ptra).setAttribute("fill", "#0095dd");
            }
            return false;
        }

        //Ubicaciones texto
        switch (arrplan_tratamiento[n]["serial_realizado"]) {
            case "1":
                //ESPERA IMAGENES
                d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                d("svg_realizado_" + serial_ptra).style.position = "relative";
                d("svg_realizado_" + serial_ptra).style.top = "12px";

                d("sp_texto_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_texto_fecha_evol_" + serial_ptra).style.top = "12px";


                break;
            case "2":
                //d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                d("svg_realizado_" + serial_ptra).style.position = "relative";
                d("svg_realizado_" + serial_ptra).style.top = "12px";

                d("sp_texto_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_texto_fecha_evol_" + serial_ptra).style.top = "12px";

                d("sp_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_fecha_evol_" + serial_ptra).style.top = "12px";

                break;
            case "3":
            //Evolucionar
                d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                d("svg_realizado_" + serial_ptra).style.position = "relative";
                d("svg_realizado_" + serial_ptra).style.top = "12px";

                d("sp_texto_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_texto_fecha_evol_" + serial_ptra).style.top = "12px";

        
                
                d("sp_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_fecha_evol_" + serial_ptra).style.top = "12px";

     

                break;
            case "5":
                d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                break;
            case "6":
                d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                d("svg_realizado_" + serial_ptra).style.position = "relative";
                d("svg_realizado_" + serial_ptra).style.top = "12px";

                d("sp_texto_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_texto_fecha_evol_" + serial_ptra).style.top = "12px";

                d("sp_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_fecha_evol_" + serial_ptra).style.top = "12px";
                break;
            case "8":
                d("svg_realizado_" + serial_ptra).style.cursor = "pointer";
                d("svg_realizado_" + serial_ptra).style.position = "relative";
                d("svg_realizado_" + serial_ptra).style.top = "12px";

                d("sp_texto_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_texto_fecha_evol_" + serial_ptra).style.top = "12px";
                d("sp_fecha_evol_" + serial_ptra).style.position = "relative";
                d("sp_fecha_evol_" + serial_ptra).style.top = "12px";
                break;
        }

        //Acciones

        d("svg_realizado_" + serial_ptra).serial_ptra = serial_ptra;
        d("svg_realizado_" + serial_ptra).serial_dtr = serial_dtr;
        if (arrplan_tratamiento[n]["serial_realizado"] == "1") {
          
            d("svg_realizado_" + serial_ptra).onclick = function () {
                d("txt_observacion_evol").value = "";
                var vdescripcion = "";
                var dtv_desc = new vista(arrplan_tratamiento,
                 "['serial_ptra']==" + this.serial_ptra, '', '');

                if (dtv_desc.length > 0) {
                
                    vdescripcion =dtv_desc[0]["codigo"] + " "+ dtv_desc[0]["nombre_tratamiento"] + " Superficie: " +  dtv_desc[0]["superficie"] + " Área: " + dtv_desc[0]["area"];
                }
                var nombre_doc = "";
                var vserial_tdoc = "";
                var dtv1 = new vista(glplantratamiento, "['serial_ptra']==" + this.serial_ptra, '', '');
                if (dtv1.length > 0)
                {
                    var dtvdocs = new vista(gldocumentos, "['serial_tra']==0", '', '');
                    if (dtvdocs.length > 0) {
                        nombre_doc = dtvdocs[0]["nombre"];
                        vserial_tdoc = dtvdocs[0]["serial_tdoc"];
                    }
                }

                call_sgu(ir_a_imagenes_post, [[{
                    serial_dtr: this.serial_dtr,
                    serial_tdoc: vserial_tdoc,
                    descripcion: vdescripcion + " - " + nombre_doc,

                }]], "guardar_info_imagenes", "plan_tratamiento");
                return false;
            }
        }
      
        else if ((arrplan_tratamiento[n]["serial_realizado"] == "3")||(arrplan_tratamiento[n]["serial_realizado"] == "8"))
        {
            if (arrplan_tratamiento[n]["autorizado_a_realizar"] == "1") {
                if ((glpermisos_promotor[0]["puede_evolucionar"] == "0") || (glpermisos_promotor[0]["puede_evolucionar"] == "False")) {
                    d("svg_realizado_" + serial_ptra).style.cursor = "";
                    d("svg_realizado_" + serial_ptra).style.fill = "gainsboro";
                    d("sp_texto_fecha_evol_" + serial_ptra).innerText = "Autorizado, sin permisos para evolucionar";

                    //  d("svg_realizado_" + serial_ptra).setAttribute("title","No tiene permisos para evolucionar");
                }
                else {
                    d("svg_realizado_" + serial_ptra).onclick = function () {

                        var dtv_desc = new vista(arrplan_tratamiento,
                       "['serial_ptra']==" + this.serial_ptra, '', '');

                        var vcodigo = "";
                        var vdiente = "";
                        var vsuperficie = "";
                        var vdescripcion = "";
                        var nombre_proc = "";
                        var dtv_desc = new vista(arrplan_tratamiento,
                         "['serial_ptra']==" + this.serial_ptra, '', '');
                        
                        if (dtv_desc.length > 0) {
                            vdescripcion = dtv_desc[0]["nombre_tratamiento"];
                            vcodigo = dtv_desc[0]["codigo"];
                            vsuperficie = dtv_desc[0]["superficie"];
                            vdiente = dtv_desc[0]["area"];
                            nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;
                            glserial_tra = dtv_desc[0]["serial_tra"];
                            glnombre_proc = nombre_proc + " Código: " + vcodigo + " Área: " + vdiente + " " + vsuperficie;
                            glaplicbeneficio = dtv_desc[0]["aplicbeneficio"];
                        }

                        d("sp_proce_evol").innerText = nombre_proc;
                        glserial_ptra = this.serial_ptra;
                        glserial_dtr = this.serial_dtr;

                        d("txt_observacion_evol").value = "";
                        if ((glpermisos_promotor[0]["cambia_fechaevol"] == "0")
                            || (glpermisos_promotor[0]["cambia_fechaevol"] == "False")) {
                            d("div_evolucionar_fecha").style.display = "none";
                        }
                        else {
                            d("div_evolucionar_fecha").style.display = "block";
                        }

                        d("txt_fecha_evolucion").value = d("hddfecha_actual").value;

                        var dtv_odo_cli = new vista(glodontologos_clinicas, "", 'A', 'NOMBRE_DOC');
                   
                        var combo = new combojava();
                        combo.id = "drp_odo_cli";
                        combo.estilo = "drp";
                        combo.propiedades = "width:400px";
                        //combo.propiedades = "";
                        combo.div = "div_odo_trata";
                        combo.fuente = dtv_odo_cli;
                        combo.datovalor = "SERIAL_DOC";
                        combo.datotexto = "NOMBRE_DOC";
                        //combo.evento = "onchange=cambio_prod()";
                        combo.fuenteinicial = [{ "SERIAL_DOC": -1, "NOMBRE_DOC": "..Seleccione.." }];
                        combo.bind();
                        
                        var permite_seguir = true;
                        if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True") || (glpermisos_promotor[0]["pptosinrestriccion"] == "1")) {
                            permite_seguir = true;
                        }
                        else if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
                            permite_seguir = false;
                        }

                        if (permite_seguir == true) {
                            ver_modal("div_evolucionar");
                        }
                        else {
                            dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No tiene permisos para realizar esta acción" });
                        }

                      
                        return false;
                    }
                }
            }
            else {
                //Para Proxima cita
                d("svg_realizado_" + serial_ptra).onclick = function () {
                    var vcodigo = "";
                    var vdiente = "";
                    var vsuperficie = "";
                    var vdescripcion = "";
                    var nombre_proc = "";
                    var serial_tra = "";

                    var dtv_desc = new vista(arrplan_tratamiento,
                     "['serial_ptra']==" + this.serial_ptra, '', '');

                    if (dtv_desc.length > 0) {
                        vdescripcion = dtv_desc[0]["nombre_tratamiento"];
                        vcodigo = dtv_desc[0]["codigo"];
                        vsuperficie = dtv_desc[0]["superficie"];
                        vdiente = dtv_desc[0]["area"];
                        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;
                        serial_tra = dtv_desc[0]["serial_tra"];
                    }

                    d("sp_proc_procita").innerText = nombre_proc;
                    glserial_ptra = this.serial_ptra;
                    glserial_dtr = this.serial_dtr;

                    var glplantratamiento_filtrado =
                        new vista(glplantratamiento, "['aplicbeneficio']=='True'", '', '');
                    glplantratamiento_filtrado = new vista(glplantratamiento_filtrado, "['serial_realizado']==3", '', '');
                    var dtv_autorizados_realizar = new vista(glplantratamiento_filtrado, "['autorizado_a_realizar']==1", '', '');


                    var arrdtr = new Array();

                    if (globj_dtr_bloqueados_tra[this.serial_dtr] != undefined) {
                        //Necesito revisar cuantos dtr estan ya autorizados de este tratamiento,sin incluir este dtr
                        dtv_autorizados_realizar = new vista(dtv_autorizados_realizar, "['serial_tra']==" + serial_tra, '', '');
                        dtv_autorizados_realizar = new vista(dtv_autorizados_realizar, "['serial_dtr']!=" + this.serial_dtr, '', '');

                        //Evaluar si el serial_tra tiene cantidadxtra2
                    }

                    var objdtr = new Object();
                    var objdtr_cantidad2 = new Object();

                    //Coloco para aplazar los dtr autorizados que no sean del cantidadtra2!=0
                    var j = 0;
                    while (j < dtv_autorizados_realizar.length) {
                        objdtr[dtv_autorizados_realizar[j]["serial_dtr"]] = "1";
                        j++;
                    }
                    for (k in objdtr) {
                        var cantidadxtratamiento2 = "0";

                        var objdtr2 = new Object();
                        var dtv_dtr = new vista(glplantratamiento, "['serial_dtr']==" + k, '', '');

                        var tiene_cantidadtra2 = false;
                        cantidadxtratamiento2 = parseInt(dtv_dtr[0]["cantidadxtratamiento2"]);
                        if (cantidadxtratamiento2 != "0")
                        {
                            //objtra_cantidad2[dtv_dtr[0]["serial_tra"]] = "1";
                             tiene_cantidadtra2 = true;
                        }

                        var alguno_evol = false;
                      
                        var r1 = 0;
                        while (r1 < dtv_dtr.length) {
                            if (dtv_dtr[r1]["serial_realizado"] == "5")
                                alguno_evol = true;
                            r1++;
                        }


                        var html_ptr = "";
                        if ((alguno_evol == false)&&(tiene_cantidadtra2==false))
                        {
                            var m = 0;
                            while (m < dtv_dtr.length) {

                                //Todos los subprocesos del procedimiento a Aplazar
                                html_ptr = html_ptr + dtv_dtr[m]["codigo"] + " ";
                                html_ptr = html_ptr + dtv_dtr[m]["nombre_tratamiento"] + " ";
                                html_ptr = html_ptr + dtv_dtr[m]["area"] + " ";
                                html_ptr = html_ptr + dtv_dtr[m]["superficie"] + " ";
                                html_ptr = html_ptr + "</br>";

                                m++;
                            }
                            objdtr2["serial_dtr"] = k;
                            objdtr2["nombre"] = "<a href='#' style='color:#0066CC' onclick='return aplazar_pto(" + k + ",1)'>Aplazar</a>";
                            objdtr2["procedimientos"] = html_ptr;
                            arrdtr[arrdtr.length] = objdtr2;
                        }
                  

                    }

                    //Coloco para aplazar los dtr autorizados que sean del cantidadtra2!=0
                    var dtv_autorizados_realizar2 = new vista(dtv_autorizados_realizar, "['cantidadxtratamiento2']!=0", '', '');
                    var objtra_cantidad2 = new Object();
                    j = 0;
                    while (j < dtv_autorizados_realizar2.length) {
                        objtra_cantidad2[dtv_autorizados_realizar2[j]["serial_tra"]] = "1";
                        j++;
                    }
                    for (serial_tra in objtra_cantidad2) {

                        var serial_tra_evol = false;
                        //Los procedimientos del tra
                        var dtv_dtr_tra = new vista(dtv_autorizados_realizar, "['serial_tra']==" + serial_tra, '', '');
                        var html_ptr = "";
                        var i = 0;
                        while (i < dtv_dtr_tra.length) {
                            //Los procedimientos del tra
                            var serial_dtr=dtv_dtr_tra[i]["serial_dtr"];
                            var dtv_dtr = new vista(glplantratamiento, "['serial_dtr']==" + serial_dtr, '', '');

                            var r1 = 0;
                            while (r1 < dtv_dtr.length) {
                                if (dtv_dtr[r1]["serial_realizado"] == "5") {
                                    alguno_evol = true;
                                    var dtv_dtr_dias = new vista(glevolucionadoxdias, "['serial_dtr']==" + serial_dtr, '', '');
                                    if (dtv_dtr_dias.length>0)
                                        serial_tra_evol = true;
                                }
                                r1++;
                            }
                           
                            if (alguno_evol == false) {
                                var m = 0;
                                while (m < dtv_dtr.length) {

                                    //Todos los subprocesos del procedimiento a Aplazar
                                    html_ptr = html_ptr + dtv_dtr[m]["codigo"] + " ";
                                    html_ptr = html_ptr + dtv_dtr[m]["nombre_tratamiento"] + " ";
                                    html_ptr = html_ptr + dtv_dtr[m]["area"] + " ";
                                    html_ptr = html_ptr + dtv_dtr[m]["superficie"] + " ";
                                    html_ptr = html_ptr + "</br>";

                                    m++;
                                }
    
                            }
               
                            i++;
                        }
                        if (serial_tra_evol == false) {
                            var objdtr2 = new Object();
                            objdtr2["serial_dtr"] = serial_dtr;
                            objdtr2["nombre"] = "<a href='#' style='color:#0066CC' onclick='return aplazar_pto(" + serial_tra + ",2)'>Aplazar</a>";
                            objdtr2["procedimientos"] = html_ptr;
                            arrdtr[arrdtr.length] = objdtr2;
                        }
                    }
                    //FIN Coloco para aplazar los dtr autorizados que sean del cantidadtra2!=0

                    var grilla = new grillajava();
                    grilla.fuente = arrdtr;
                    grilla.div = "div_procedimientos_retirar";
                    grilla.id = "gw_pro_aplazar"
                    grilla.autorow = false;
                    grilla.habencabezado = true;
                    grilla.clasetabla = "bordered";
                    grilla.estilo = "itemlista";
                    grilla.estilotabla = "width:98%";
                    grilla.alternolista = "alternolista";
                    grilla.propiedadestabla = "";
                    grilla.estiloencabezado = "";
                    grilla.encabezado = ["", "Procedimientos"];
                    grilla.datoscolumnas = ["nombre", "procedimientos"];
                    grilla.tipocolumna = ["0", "0"];
                    grilla.funcioncolumna = ["", ""];
                    grilla.estilocolumna = ["'width: 100px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                        "'width: 300px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
                    grilla.bind();

                  
                    ver_modal("div_proxima_cita");
                    return false;
                }
            }
        }
        else if ((arrplan_tratamiento[n]["serial_realizado"] == "5")&&(arrplan_tratamiento[n]["serial_estado"] != "4")) {

            var dcuentaxpagar = 0;
            if ((arrplan_tratamiento[n]["cuentaxpagar"] != "") && (arrplan_tratamiento[n]["cuentaxpagar"] != "-")) {
                dcuentaxpagar = parseFloat(arrplan_tratamiento[n]["cuentaxpagar"]);
            }

            if ((glpermisos_promotor[0]["puede_desevolucionar"] == "0") || (glpermisos_promotor[0]["puede_evolucionar"] == "False")
                || (dcuentaxpagar < 0))
            {
                d("svg_realizado_" + serial_ptra).style.cursor = "";
                d("svg_realizado_" + serial_ptra).style.fill = "gainsboro";
                //d("sp_texto_fecha_evol_" + serial_ptra).innerText = "Autorizado, sin permisos para evolucionar";
                //  d("svg_realizado_" + serial_ptra).setAttribute("title","No tiene permisos para evolucionar");
            }
            else {
                d("svg_realizado_" + serial_ptra).onclick = function () {

                    var vcodigo = "";
                    var vdiente = "";
                    var vsuperficie = "";
                    var vdescripcion = "";
                    var nombre_proc = "";
                    var dtv_desc = new vista(arrplan_tratamiento,
                     "['serial_ptra']==" + this.serial_ptra, '', '');

                    if (dtv_desc.length > 0) {
                        vdescripcion = dtv_desc[0]["nombre_tratamiento"];
                        vcodigo = dtv_desc[0]["codigo"];
                        vsuperficie = dtv_desc[0]["superficie"];
                        vdiente = dtv_desc[0]["area"];
                        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

                    }
                    d("sp_proce_desevol").innerText = nombre_proc;
                    d("txt_observacion_desevol").value = "";

                    glserial_ptra = this.serial_ptra;

                    var permite_seguir = true;
                    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True") || (glpermisos_promotor[0]["pptosinrestriccion"] == "1")) {
                        permite_seguir = true;
                    }
                    else if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
                        permite_seguir = false;
                    }
                    if (permite_seguir == true) {
                        ver_modal("div_des_evolucionar");
                    }
                    else {
                        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No tiene permisos para realizar esta acción" });
                    }
                  
                    return false;
                }
            }
        }
        else
            d("svg_realizado_" + serial_ptra).style.cursor = "";

        if (arrplan_tratamiento[n]["serial_estado"] == "3")
        {
            d("sp_nombre_estado_" + serial_ptra).style.cursor = "pointer";
            d("sp_nombre_estado_" + serial_ptra).serial_ptra = serial_ptra;
            d("sp_nombre_estado_" + serial_ptra).onclick = function () {
                ver_glosas(this.serial_ptra);
                return false;
            }
        }
        if (arrplan_tratamiento[n]["serial_estado"] == "6") {
            d("sp_nombre_estado_" + serial_ptra).style.cursor = "pointer";
            d("sp_nombre_estado_" + serial_ptra).serial_ptra = serial_ptra;
            d("sp_nombre_estado_" + serial_ptra).onclick = function () {
                ver_glosas(this.serial_ptra);
                return false;
            }
        }
        if (arrplan_tratamiento[n]["serial_estado"] == "7") {
            var dtv_pro = new vista(arrplan_tratamiento,
                   "['serial_dtr']==" + arrplan_tratamiento[n]["serial_dtr"], '', '');

            if (dtv_pro.length == 1)
                d("sp_nombre_estado_" + serial_ptra).innerText = "Por Evolucionar Proceso";
        }
       n++;
    }
}

function aplazar_pto(serial,tipo) {
    var serial_dtr;
    var serial_tra;
    var cadena_dtr = "";
    var cadena_dtr_no = "";
    if (String(tipo) == "1") {
        serial_dtr = serial;
        var ptra = 0;
        while (ptra < glplantratamiento.length) {
            if (glplantratamiento[ptra]["serial_dtr"] == serial_dtr)
                glplantratamiento[ptra]["autorizado_a_realizar"] = "0";
            ptra++;
        }
        var ptra = 0;
        while (ptra < glplantratamiento.length) {
            if (glplantratamiento[ptra]["serial_dtr"] == glserial_dtr)
                glplantratamiento[ptra]["autorizado_a_realizar"] = "1";
            ptra++;
        }
        cadena_dtr = glserial_dtr;
        cadena_dtr_no = serial_dtr;
    }
    else if (String(tipo) == "2")
    {
        serial_tra = serial;
        var cadena_dtr_no_tmp = "";
        var ptra = 0;
        while (ptra < glplantratamiento.length) {
            if (glplantratamiento[ptra]["serial_tra"] == serial_tra)
            {
                cadena_dtr_no_tmp = cadena_dtr_no_tmp + glplantratamiento[ptra]["serial_dtr"] + ",";
                glplantratamiento[ptra]["autorizado_a_realizar"] = "0";
            }
           
            ptra++;
        }
        var ptra = 0;
        while (ptra < glplantratamiento.length) {
            if (glplantratamiento[ptra]["serial_dtr"] == glserial_dtr)
                glplantratamiento[ptra]["autorizado_a_realizar"] = "1";
            ptra++;
        }
        cadena_dtr = glserial_dtr;
        if (cadena_dtr_no_tmp.length > 0)
            cadena_dtr_no_tmp = cadena_dtr_no_tmp.substr(0, cadena_dtr_no_tmp.length - 1);
        cadena_dtr_no = cadena_dtr_no_tmp;
    }

    call_sgu(actualiza_autorizados_aplaza_post, [[{ strcadena_dtr: cadena_dtr, strcadena_dtr_no: cadena_dtr_no }]], "actualiza_autorizados", "plan_tratamiento");

    return false;
}
function actualiza_autorizados_aplaza_post(respuesta) {
    pinta_procedimientos();
    ocultar_modal("div_proxima_cita");

    return false;
}
var objimpresion = new Object();
var objimpresion_dtr = new Object();
function ir_a_imagenes_post(respuesta)
{
    document.location = "imagenes.aspx?si=1";
}
function envio_mensaje_pdo(serial_ptra) {
    //alert(serial_ptra);
    d("div_menu_n2").setAttribute("class", "movmenu");

    var values = $('#slider-vertical').slider("value");
    

    if (values != 100) {
        $('#slider-vertical').slider('value', 100);
        setTimeout("ver_mensajeria()", 800);
    }
    else
        ver_mensajeria();

    window[1].d("div_buscar_msj").style.display = "none";


    if (window[1].d("div_caja3_papa") != null)
        window[1].d("div_caja3_papa").style.display = "none";
    //reviso si tiene mensajes enviados
    var serial_dtr = "";

   // var dtv_tipopqr = new vista(window[1].gltipo_quejas, "['tipoPQR']==" + "5", '', '');
    //if (dtv_tipopqr.length > 0)
    //{

    //}
    var dtv = new vista(glplantratamiento, "['serial_ptra']==" + serial_ptra, '', '');
    var mensaje_tra = "";
    if (dtv.length > 0) {

        serial_dtr = dtv[0]["serial_dtr"];
        var dtv_dtrmen = new vista(glmensajes_dtr, "['serial_dtr']==" + serial_dtr, '', '');

        var dtv_glosas_proc = new vista(glglosas_realizadas, "['serial_dtr']==" + serial_dtr, '', '');
        var glosado="No";
        if(dtv_glosas_proc.length>0)
            glosado="Si";

        mensaje_tra = "Auditoría de Pertinencia-->" + dtv[0]["nombre_tratamiento"] + " Código:" + dtv[0]["codigo"]
            + " Area:" + dtv[0]["area"] + " Superficie:" + dtv[0]["superficie"] + " " + "Glosado: " + glosado;

        window[1].d("txt_mensaje").value = mensaje_tra;
        window[1].glserial_dtr = dtv[0]["serial_dtr"];

        if (window[1].d("div_caja2_papa") != null)
            window[1].d("div_caja2_papa").style.display = "block";

        window[1].d("div_nuevo").style.display = "none";
        window[1].glnuevo = false;

        if ((dtv_dtrmen.length == 0) && (dtv[0]["fecha_evol"] == ""))
        {
            window[1].nuevo_msj(2, "1");
        }
        else
        {
            window[1].nuevo_msj(2, "3");
        }
    }
  

    
    return false;
}

function ver_mensajeria()
{
    d("div_caja1_papa").style.display = "none";
    if (d("div_caja2_papa") != undefined) {
        d("div_caja2_papa").style.display = "block";
        d("div_caja2_papa").style.zIndex = "10000";
    }
}
var glcombohallazgos;
var glserial_ppac_seleccionado_ult="";
var glserial_suc_seleccionado_ult = "";
var glserial_emp_ult = "";
var glserial_pac_ult = "";
var glserial_pac = "";
var glserial_ppac_seleccionado_ult_ch = "";
var glserial_suc_seleccionado_ult_ch = "";


function selecciona_pac_post(respuesta) {



    objimpresion_dtr = new Object();
    glserial_suc_seleccionado= respuesta["datos_enviados"][0]["serial_suc"];
    glserial_ppac_seleccionado_ult = respuesta["datos_enviados"][0]["serial_ppac"];
    glserial_suc_seleccionado_ult = respuesta["datos_enviados"][0]["serial_suc"];
    glserial_emp_ult = respuesta["datos_enviados"][0]["serial_emp"];
    glserial_pac_ult = respuesta["datos_enviados"][0]["serial_pac"];
    glserial_emp = respuesta["datos_enviados"][0]["serial_emp"];

    //    glcombohallazgos = respuesta;
    pintar_plan_tratamiento(respuesta);
    
    if (window.length > 1) {

        if (window[1] != undefined) {
            var tipo = typeof (window[1].selecciona_paciente);
            if (tipo == "function") {
                window[1].selecciona_paciente(respuesta["datos_enviados"][0]["serial_ppac"], glnombre_pacsel);
                window[1].selecciona_paciente_bsq(respuesta["datos_enviados"][0]["serial_ppac"], glnombre_pacsel);
            }
        }
    }


}
function anadir() {

    var permite_seguir = true;
    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True") || (glpermisos_promotor[0]["pptosinrestriccion"] == "1")) {
        permite_seguir = true;
    }
    else if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
        permite_seguir = false;
    }


    if (permite_seguir == true) {
        anadir2();
    }
    else {
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No tiene permisos para realizar esta acción" });
    }

 
}

function anadir2() {
   

    if (gl_debe_actualizar_version == "0") {
        var glarrdatos = JSON.parse(localStorage["combo_hall_" + glserial_emp]);
        if (glarrdatos["error"]==undefined)
            crear_ppto_ventana(glarrdatos);
        else
        {
            glserial_ppac_seleccionado_ult_ch = glserial_ppac_seleccionado_ult;
            glserial_suc_seleccionado_ult_ch = glserial_suc_seleccionado_ult;
            glserial_suc_seleccionado = glserial_suc_seleccionado_ult;


            call_sgu(crear_ppto_ventana, [[{
                serial_ppac: glserial_ppac_seleccionado_ult_ch,
                serial_pac: glserial_pac_ult,
                serial_suc: glserial_suc_seleccionado,
                serial_emp: glserial_emp,
                tipo_cita: "2"
            }]], "cargar_info_ppto", "plan_tratamiento");

        }
    }
    else {

        if ((glserial_ppac_seleccionado_ult != glserial_ppac_seleccionado_ult_ch) || (glserial_suc_seleccionado_ult != glserial_suc_seleccionado_ult_ch)) {
            //Se cambio el ppac o el serial_suc
            glserial_ppac_seleccionado_ult_ch = glserial_ppac_seleccionado_ult;
            glserial_suc_seleccionado_ult_ch = glserial_suc_seleccionado_ult;
            glserial_suc_seleccionado = glserial_suc_seleccionado_ult;


            call_sgu(crear_ppto_ventana, [[{
                serial_ppac: glserial_ppac_seleccionado_ult_ch,
                serial_pac: glserial_pac_ult,
                serial_suc: glserial_suc_seleccionado,
                serial_emp: glserial_emp,
                tipo_cita: "2"
            }]], "cargar_info_ppto", "plan_tratamiento");
        }
        else {
            crear_ppto_ventana(glcombohallazgos);
        }
    }
}


function imprimir(){
    selecciona_imprimir();
}


function oculta_anadir_procedimientos()
{
    d("div_anadir_procedimientos").style.display = "none";
    d("div_formulario").style.display = "none";
    d("div_procedimientos_nuevos").style.display = "none";
    return false;
}

var glserial_dtr;
var glserial_ptra;
var glserial_tra;
var glnombre_proc = "";
var glaplicbeneficio = "";
function ver_imagenes_ptto(serial_ptra)
{
    var serial_tra = "";
    var dtv1 = new vista(glplantratamiento, "['serial_ptra']==" + serial_ptra, '', '');
    if (dtv1.length > 0)
    {
        serial_tra = dtv1[0]["serial_tra"];
        glserial_dtr = dtv1[0]["serial_dtr"];
        glserial_ptra = dtv1[0]["serial_ptra"];

        var dtvdocs_0 = new vista(gldocumentos, "['serial_tra']==0", '', '');
        var dtvdocs = new vista(gldocumentos, "['serial_tra']==" + serial_tra, '', '');

        var arrdocs = new Array();
        var n = 0;
        while (n < dtvdocs_0.length)
        {
            var obj1 = new Object();
            for (k in dtvdocs_0[n])
            {
                obj1[k] = dtvdocs_0[n][k];
            }
            var serial_tdoc = dtvdocs_0[0]["serial_tdoc"];

       
            var dtvdocs_reg = new vista(gldocumentos_registrados, "['serial_Dtr']==" + glserial_dtr, '', '');
            var dtvdocs_reg2 = new vista(dtvdocs_reg, "['serial_tdoc']==" + serial_tdoc, '', '');

            if (dtvdocs_reg2.length > 0)
                obj1["tiene"] = "Si";
            else
                obj1["tiene"] = "No";

            arrdocs[arrdocs.length] = obj1;
            n++;
        }
        n = 0;
        while (n < dtvdocs.length) {
            var serial_tdoc = dtvdocs[0]["serial_tdoc"];

            var obj1 = new Object();
            for (k in dtvdocs[n]) {
                obj1[k] = dtvdocs[n][k];
            }
            var serial_tdoc = dtvdocs[n]["serial_tdoc"];

            var dtvdocs_reg = new vista(gldocumentos_registrados, "['serial_Dtr']==" + glserial_dtr, '', '');
            var dtvdocs_reg2 = new vista(dtvdocs_reg, "['serial_tdoc']==" + serial_tdoc, '', '');

            if (dtvdocs_reg2.length > 0)
                obj1["tiene"] = "Si";
            else
                obj1["tiene"] = "No";

            arrdocs[arrdocs.length] = obj1;
            n++;
        }

        var grilla = new grillajava();
        grilla.fuente = arrdocs;
        grilla.div = "div_imagenes_pro";
        grilla.id = "gwimagenes"
        grilla.autorow = false;
        grilla.habencabezado = true;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:98%";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = ["Documento","Subido"];
        grilla.datoscolumnas = ["nombre", "tiene"];
        grilla.tipocolumna = ["2","0"];
        grilla.funcioncolumna = [["retorna_nombre","clic_doc"],""];
        grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
            "'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '"
        ];
        grilla.bind();


    }

    //gldocumentos
    ver_modal("div_ver_imagenes");

    //alert(serial_ptra);
}

function retorna_nombre(fila,dato)
{
    return dato;
}

function clic_doc(fila, dato) {

    var vdescripcion = "";
    var dtv_desc = new vista(glplantratamiento,
     "['serial_ptra']==" + glserial_ptra, '', '');

    var mensaje_tra = "";
    if (dtv_desc.length > 0)
    {
        mensaje_tra = dtv_desc[0]["nombre_tratamiento"] + " Código:" + dtv_desc[0]["codigo"]
        + " Area:" + dtv_desc[0]["area"] + " Superficie:" + dtv_desc[0]["superficie"] + "";
    }
      
    call_sgu(ir_a_imagenes_post, [[{
        serial_dtr: glserial_dtr,
        serial_tdoc: fila["serial_tdoc"],
        descripcion: mensaje_tra + " - " + fila["nombre"],

    }]], "guardar_info_imagenes", "plan_tratamiento");

    return false;
}
function selecciona_imprimir(serial_ptra) {
    // objimpresion[this.serial_ptra]

   
    var cadena_dtr = "";
    for (k in objimpresion_dtr)
    {
        if (objimpresion_dtr[k]=="1")
            cadena_dtr = cadena_dtr + k + ",";
    }
    if (cadena_dtr != "")
    {
        cadena_dtr = cadena_dtr.substr(0, cadena_dtr.length - 1);
        call_sgu(selecciona_imprimir_post, [[{
            cadena_dtr_envio: cadena_dtr,
        }]], "guardar_cadena_dtr", "plan_tratamiento");

    }
    else
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: " Debe seleccionar algún procedimiento para imprimir"
        });


    return false;
}
var glid_envio = "";
function selecciona_imprimir_post(respuesta)
{
    var c = new Date();
    glid_envio = c.getMilliseconds();
    d("iframe1_reporte").setAttribute("src", "Rpt_Procedimientos.aspx?envio=" + glid_envio);
    d("iframe1_reporte").onload=function()
    {
        d("div_ver_impresion").id_pantalla_completa = "iframe1_reporte";
        d("a_pantalla_completa_div_ver_impresion").style.color = "orange";
        d("a_pantalla_completa_div_ver_impresion").style.display = "inline-block";
        ver_modal("div_ver_impresion");
    }
}

function eliminar_ppto(serial_ptra)
{
  //  d("txt_observacion_eliminar").value = "";
    //cantidad_call
    var permite_seguir=true;
    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True") || (glpermisos_promotor[0]["pptosinrestriccion"] == "1")) {
        permite_seguir = true;
    }
    else if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1"))
    {
        permite_seguir = false;
    }

    var vcodigo = "";
    var vdiente = "";
    var vsuperficie = "";
    var vdescripcion = "";
    var nombre_proc = "";
    var dtv_desc = new vista(glplantratamiento,
     "['serial_ptra']==" + serial_ptra, '', '');

    if (dtv_desc.length > 0) {
        vdescripcion = dtv_desc[0]["nombre_tratamiento"];
        vcodigo = dtv_desc[0]["codigo"];
        vsuperficie = dtv_desc[0]["superficie"];
        vdiente = dtv_desc[0]["area"];
        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

    }
    d("sp_proce_eliminar").innerText = nombre_proc;
    glserial_ptra = serial_ptra;

    if (permite_seguir == true) {
        ver_modal("div_eliminar");
    }
    else
    {
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No tiene permisos para realizar esta acción" });
    }
    //alert(serial_ptra);
    return false;
}

function no_evol()
{
    ocultar_modal("div_evolucionar");
    return false;
}
function si_evol()
{
    var msj = "";
    var serial_doc = String(d("drp_odo_cli").options[d("drp_odo_cli").selectedIndex].value);
    d("drp_odo_cli").style.borderColor = "";
    if(serial_doc=="-1")
    {
        d("drp_odo_cli").style.borderColor = "red";
        msj = "Debe selecionar el Odontologo</br>";
    }
    if(msj=="")
    {
        si_evol_ok();
    }
    return false;
}
function si_evol_ok()
{
    //var dtv_glosas_proc = new vista(glglosas_realizadas, "['serial_dtr']==" + glserial_dtr, '', '');
    //dtv_glosas_proc = new vista(dtv_glosas_proc, "['serial_glosa']==" + "40", '', '');

    //var tiene_glosa40 = false;
    //if (dtv_glosas_proc.length > 0)
    //    tiene_glosa40 = true;

        var documentos_completos = true;
    var dtv_documentosnecesarios = new vista(gldocumentos, "['serial_tra']==" + glserial_tra, '', '');
    var m = 0;
    while (m < dtv_documentosnecesarios.length) {
        var serial_tdoc = dtv_documentosnecesarios[m]["serial_tdoc"];
        var dtv_documentosregistrados = new vista(gldocumentos_registrados, "['serial_Dtr']==" + glserial_dtr, '', '');
        var dtv_docreg_necesario = new vista(dtv_documentosregistrados, "['serial_tdoc']==" + serial_tdoc, '', '');
        if (dtv_docreg_necesario.length == 0) {
            documentos_completos = false;
            break;
        }
        m++;
    }
    if (dtv_documentosnecesarios.length == 0)
        documentos_completos = false;

    var dtv_mensajes_dtr = new vista(glmensajes_dtr, "['serial_dtr']==" + glserial_dtr, '', '');
    dtv_mensajes_dtr = new vista(dtv_mensajes_dtr, "['tipopqr']==6", '', '');

    if (dtv_mensajes_dtr.length != 0)
        documentos_completos = false;

    if ((String(glaplicbeneficio) == "0")||(String(glaplicbeneficio) == "False"))
        documentos_completos = false;

    var vserial_tqueja = "0";
    var vcrea_mensaje_postevol = 0;
//    if ((documentos_completos == true) && (tiene_glosa40 == true))
    if (documentos_completos == true)
    {
        vcrea_mensaje_postevol = 1;

        var dtv_tipopqr = new vista(window[1].gltipo_quejas, "['tipoPQR']==" + "6", '', '');
        dtv_tipopqr = new vista(dtv_tipopqr, "['serial_pais']==" + glserial_pais, '', '');
        if (dtv_tipopqr.length > 0)
        {
            vserial_tqueja = dtv_tipopqr[0]["serial_tqueja"];
        }
    }
    var vserial_doc = String(d("drp_odo_cli").options[d("drp_odo_cli").selectedIndex].value);

    //Evaluar si ya tiene todos los archivos adjuntados
    call_sgu(evolucionar_post, [[{
        serial_suc: glserial_suc_seleccionado,
        serial_emp:glserial_emp,
        observacion:d("txt_observacion_evol").value,
        fecha:d("txt_fecha_evolucion").value,
        serial_ptra: glserial_ptra,
        serial_dtr:glserial_dtr,
        crea_mensaje_postevol: vcrea_mensaje_postevol,
        serial_ppac: glserial_ppac_seleccionado_ult,
        mensaje: glnombre_proc,
        serial_tqueja: vserial_tqueja,
        serial_doc: vserial_doc
    }]], "evolucionar", "plan_tratamiento");


    return false;
}
function evolucionar_post(respuesta)
{
    ocultar_modal("div_evolucionar");
    //alert(JSON.stringify(respuesta));
    if (respuesta["respuesta"]["correcto"] == "1") 
    {
        dhtmlx.alert({
            title: "",
            type: "alert",
            text: "Se evolucionó el procedimiento correctamente"
        });
    }
    else
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Se genero un error al evolucionar el procedimiento"
        });


    carga_ppto();
}

function no_desevol() {
    ocultar_modal("div_des_evolucionar");
    return false;
}
function si_desevol() {
    call_sgu(desevolucionar_post, [[{
        observacion: d("txt_observacion_desevol").value,
        serial_pac: glserial_pac,
        serial_ptra: glserial_ptra
    }]], "des_evolucionar", "plan_tratamiento");

    return false;
}
function desevolucionar_post(respuesta) {

   // alert(JSON.stringify(respuesta));
    ocultar_modal("div_des_evolucionar");
    if (respuesta["respuesta"]["correcto"] == "1") {
        dhtmlx.alert({
            title: "",
            type: "alert",
            text: "Se desevolucionó el procedimiento correctamente"
        });
    }
    else
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Se genero un error al desevolucionar el procedimiento"
        });

    carga_ppto();
}


function carga_ppto()
{
    if ((glserial_ppacseleccionado != "-1") && (glserial_ppacseleccionado != "")) {
        call_sgu(selecciona_pac_post, [[{
            serial_ppac: glserial_ppacseleccionado,
            serial_pac: glserial_pac,
            serial_suc: glserial_suc_seleccionado,
            serial_emp: glserial_emp,
            tipo_cita: "2"
        }]], "selecciona_paciente", "plan_tratamiento");
    }
}
function si_elim()
{
    call_sgu(eliminar_pro_post, [[{
        serial_ptra: glserial_ptra
    }]], "eliminar_procedimiento", "plan_tratamiento");

    return false;
}
function no_elim() {
    ocultar_modal("div_eliminar");
    return false;
}
function eliminar_pro_post(respuesta) {

    // alert(JSON.stringify(respuesta));
    ocultar_modal("div_eliminar");
    if (respuesta["respuesta"]["correcto"] == "1") {
        dhtmlx.alert({
            title: "",
            type: "alert",
            text: "Se eliminó el procedimiento correctamente"
        });
    }
    else
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Se genero un error al eliminar el procedimiento"
        });

    carga_ppto();
}
function termino_mensajeria()
{
    var n = 0;
    if (glplantratamiento != undefined) {
        while (n < glplantratamiento.length) {
            var serial_ptra = glplantratamiento[n]["serial_ptra"];
            if (d("svg_mensaje_" + serial_ptra) != undefined) {
                d("svg_mensaje_" + serial_ptra).style.fill ="black";
                d("svg_mensaje_" + serial_ptra).style.cursor = "pointer";
                d("svg_mensaje_" + serial_ptra).serial_ptra = serial_ptra;
                d("svg_mensaje_" + serial_ptra).onclick = function () {
                    envio_mensaje_pdo(this.serial_ptra);
                    return false;
                }
            }
            if (d("div_mensajes_ptr_" + serial_ptra) != undefined) {
               
                var serial_dtr = glplantratamiento[n]["serial_dtr"];
                var serial_ptra = glplantratamiento[n]["serial_ptra"];
                objimpresion_dtr[serial_dtr] = "0";


                var dtv_mendtr = new vista(glmensajes_dtr,
                        "['serial_dtr']==" + serial_dtr, '', '');

                if (dtv_mendtr.length == 0) {
                    d("svg_msjporc_" + serial_ptra).style.fill = "gainsboro";
                    d("svg_msjporc_" + serial_ptra).style.cursor = "";
                    d("svg_msjporc_" + serial_ptra).setAttribute("onclick", "");
                }
                var dtv_dtr_proc_ab = new vista(dtv_mendtr, "['abierto']==1", '', '');
                if (dtv_dtr_proc_ab.length > 0) {
                    d("svg_msjporc_" + serial_ptra).style.fill = "red";
                }

            }
            n++;
        }
    }
    return false;
}

function si_auto()
{
    autorizar(1);
    return false;
}
function no_auto() {
    autorizar(2);
    return false;
}

function autorizar(valor)
{
   
    var dtv_mdtr = new vista(glmensajes_dtr, "['serial_dtr']==" + glserial_dtr, '', '');
    var vserial_mensajeria = 0;
    if (dtv_mdtr.length > 0) {

        var dtv_mdtr2;
        if (gltipo_auditoria==1)
            dtv_mdtr2 = new vista(dtv_mdtr, "['tipopqr']==5", '', '');
        else
            dtv_mdtr2 = new vista(dtv_mdtr, "['tipopqr']==6", '', '');

        if (dtv_mdtr2.length>0)
            vserial_mensajeria = dtv_mdtr2[0]["serial_mensajeria"]
    }
    if (vserial_mensajeria != 0) {
        var arrmensaje =
            [
                {
                    serial_mensajeria: vserial_mensajeria,
                    mensaje: d("txt_observacion_autorizacion").value,
                    leido: 1,
                    leido_otros: 0,
                    serial_prm_cierra: d("hddserial_prm").value,
                    serial_dtr: glserial_dtr,
                    autorizado: valor,
                    serial_suc: glserial_suc_seleccionado,
                    serial_ppac: glserial_ppacseleccionado,
                    tipo_auditoria: gltipo_auditoria,
                    actualiza_prm: "1",
                    revisado: "1"

                }
            ];

        call_sgu(cerro_caso_post, [arrmensaje, [], []], "cerrar_caso", "mensajeria");
    }
    else
    {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Este procedimiento no tiene mensaje asociado"
        });
    }
   // ocultar_modal("div_autorizar");
    return false;
}

function cerro_caso_post(respuesta)
{
    ocultar_modal("div_autorizar");
    carga_ppto();
}
var glactiva_impresion = false;
function cambio_impresion() {

    if (glactiva_impresion == false) {
        var arrfechas = agrupa_valores(glplantratamiento, "fecha_tomado");
        // alert(JSON.stringify(arrfechas));
        var arrdatos = new Array();

        var n = 0;
        while (n < arrfechas.length) {
            var obj1 = new Object();
            obj1["dato"] = arrfechas[n];
            obj1["llave"] = 2;
            arrdatos[arrdatos.length] = obj1;
            n++;
        }

        var dtv = new vista(arrdatos, "", 'D', 'dato');
        var arrdatos2 = new Array();
        arrdatos2[0] = { dato: "Todos",llave:1 };

        var n = 0;
        while (n < dtv.length) {
            var obj1 = new Object();
            for (k in dtv[n])
                obj1[k] = dtv[n][k];

            arrdatos2[arrdatos2.length] = obj1;
            n++;
        }
        //div_impresion
        var grilla = new grillajava();
        grilla.fuente = arrdatos2;
        grilla.div = "div_impresion";
        grilla.id = "gw_impresion"
        grilla.autorow = false;
        grilla.habencabezado = false;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:98%";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = ["Fecha"];
        grilla.datoscolumnas = ["dato"];
        grilla.tipocolumna = ["1"];
        grilla.funcioncolumna = ["calcula_imp"];
        grilla.estilocolumna = ["'width: 350px;  padding-left:0; padding-right:0;text-align:center;font-family:Tahoma; font-size:11px; font-weight:normal;'"];
        grilla.bind();
        glactiva_impresion = true;
    }
    else {
        d("div_impresion").innerHTML = "";
        glactiva_impresion = false;
    }
    return false;
}

function calcula_imp(fila, dato) {
    return "<span style='cursor:pointer' onclick='return clic_calcula_imp(" + '"' + dato + '"' + ","+ '"' + fila["llave"] + '"' + ")'>" + dato + "</span>";
}

function clic_calcula_imp(dato,llave) {
   
   
    d("div_impresion").innerHTML = "";
    glactiva_impresion = false;

    var n = 0;
    while (n < glplantratamiento.length) {
        var serial_dtr = glplantratamiento[n]["serial_dtr"];
        var serial_ptra = glplantratamiento[n]["serial_ptra"];
        var fecha_tomado = glplantratamiento[n]["fecha_tomado"];

        objimpresion[serial_ptra] = "0";
        objimpresion_dtr[serial_dtr] = "0";
        d("svg_impresion_" + serial_ptra).setAttribute("fill", "gainsboro");

        if (llave == "2") {
            if (fecha_tomado == dato) {
                if (objimpresion[serial_ptra] == "1") {
                    objimpresion[serial_ptra] = "0";
                    objimpresion_dtr[serial_dtr] = "0";
                    d("svg_impresion_" + serial_ptra).setAttribute("fill", "gainsboro");
                }
                else {
                    objimpresion[serial_ptra] = "1";
                    objimpresion_dtr[serial_dtr] = "1";
                    d("svg_impresion_" + serial_ptra).setAttribute("fill", "#0095dd");
                }
            }
        }
        else if (llave == "1") {
            objimpresion[serial_ptra] = "1";
            objimpresion_dtr[serial_dtr] = "1";
            d("svg_impresion_" + serial_ptra).setAttribute("fill", "#0095dd");
        }
        n++;
    }


}

function ver_glosas(serial_ptra) {

    var serial_dtr = "";
    var dtv_desc = new vista(glplantratamiento, "['serial_ptra']==" + serial_ptra, '', '');

    if (dtv_desc.length > 0) {
        serial_dtr = dtv_desc[0]["serial_dtr"];
        glserial_dtr = serial_dtr;
    }

    var dtv_glosas_proc = new vista(glglosas_realizadas, "['serial_dtr']==" + serial_dtr, '', '');
    var dtv_glosas_proc_35 = new vista(dtv_glosas_proc, "['serial_glosa']==35", '', '');
    if (dtv_glosas_proc_35.length > 0) {
        call_sgu(ver_glosas_post, [[{
            serial_dtr: serial_dtr,
        }]], "ver_detalle_glosa", "plan_tratamiento");
    }
    else {


        var vcodigo = "";
        var vdiente = "";
        var vsuperficie = "";
        var vdescripcion = "";
        var nombre_proc = "";

        
        var dtv_desc2 = new vista(glprocedientos,
                         "['serial_dtr']==" + serial_dtr, '', '');

        if (dtv_desc2.length > 0) {
            vdescripcion = dtv_desc2[0]["nombre_tra"];
            vcodigo = dtv_desc2[0]["codigo_tra"];
            vsuperficie = dtv_desc2[0]["superficie"];
            vdiente = dtv_desc2[0]["diente"];
            nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

        }

        d("sp_proc_glosas").innerText = nombre_proc;

        var grilla = new grillajava();
        grilla.fuente = dtv_glosas_proc;
        grilla.div = "div_glosas_lista";
        grilla.id = "gwglosas_proc";
        grilla.autorow = false;
        grilla.habencabezado = true;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:98%";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = ["Glosa", "Descripción"];
        grilla.datoscolumnas = ["serial_glosa", "descripcion"];
        grilla.tipocolumna = ["1", "0"];
        grilla.funcioncolumna = ["retorna_serial_glosa", ""];
        grilla.estilocolumna = ["'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '", "'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '"];
        grilla.bind();


        ver_modal("div_glosas");
    }
    return false;
}

function ver_glosas_post(respuesta)
{
    var dtv_desc2 = new vista(glprocedientos,
                     "['serial_dtr']==" + glserial_dtr, '', '');

    if (dtv_desc2.length > 0) {
        vdescripcion = dtv_desc2[0]["nombre_tra"];
        vcodigo = dtv_desc2[0]["codigo_tra"];
        vsuperficie = dtv_desc2[0]["superficie"];
        vdiente = dtv_desc2[0]["diente"];
        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

    }
    var dtv_glosas_proc = new vista(glglosas_realizadas, "['serial_dtr']==" + glserial_dtr, '', '');
    d("sp_proc_glosas").innerText = nombre_proc;

    var grilla = new grillajava();
    grilla.fuente = dtv_glosas_proc;
    grilla.div = "div_glosas_lista";
    grilla.id = "gwglosas_proc";
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Glosa", "Descripción"];
    grilla.datoscolumnas = ["serial_glosa", "descripcion"];
    grilla.tipocolumna = ["1", "1"];
    grilla.funcioncolumna = ["retorna_serial_glosa", "retorna_div_detalle"];
    grilla.estilocolumna = ["'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '", "'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '"];
    grilla.bind();

    var n = 0;
    while (n < dtv_glosas_proc.length)
    {
        if (dtv_glosas_proc[n]["serial_glosa"]!=35)
            d("div_det_glosa_" + dtv_glosas_proc[n]["serial_glosa"]).innerHTML = dtv_glosas_proc[n]["descripcion"];
        else
        {
      
            d("div_det_glosa_" + dtv_glosas_proc[n]["serial_glosa"]).innerHTML =
                "<div id='div_det_glosa_sp_" + dtv_glosas_proc[n]["serial_glosa"] + "'></div>" +
                "<div id='div_det_glosa_div_" + dtv_glosas_proc[n]["serial_glosa"] + "'></div>";

            d("div_det_glosa_sp_" + dtv_glosas_proc[n]["serial_glosa"]).innerHTML = "Este procedimiento ya fue realizado en:";
            d("div_det_glosa_sp_" + dtv_glosas_proc[n]["serial_glosa"]).style.marginBottom = "10px";
            var grilla = new grillajava();
            grilla.fuente = respuesta["glosas_detalle"];
            grilla.div = "div_det_glosa_div_" + dtv_glosas_proc[n]["serial_glosa"];
            grilla.id = "gw_det_glosa_" + dtv_glosas_proc[n]["serial_glosa"];
            grilla.autorow = false;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:98%";
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Clínica", "Fecha Tomado", "Area", "Superfice","Fecha Exclusión"];
            grilla.datoscolumnas = ["clinica", "fecha_tomado","area","superficie","fecha_excluido"];
            grilla.tipocolumna = ["1", "0", "0", "0","0"];
            grilla.funcioncolumna = ["fun_clinica_glosa", "","","",""];
            grilla.estilocolumna = ["'width: 150px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                "'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                 "'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                 "'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                 "'width: 50px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '"
          ];
            grilla.bind();
        }
        n++;
    }
    ver_modal("div_glosas");

}

function fun_clinica_glosa(fila,dato)
{
    var esauditor = false;
    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True"))
        esauditor = true;

    var esservicio = false;
    if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
        esservicio = true;
    }

    if ((fila["serial_suc"] == glserial_suc_seleccionado) || (esauditor == true) || (esservicio == true)) {
        return fila["clinica"];
    }
    else
        return "-";
//    return dato;
}
function retorna_div_detalle(fila,dato)
{
    return "<div id='div_det_glosa_" + fila["serial_glosa"]+"'></div>";
}

function retorna_serial_glosa(fila,dato)
{
    var html = "";
    if ((fila["desglosar"] == "1")&&((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True")))
        html = "<a style='width:350px;color:#00994C; font-family:Tahoma; font-size:13px;' href='#' onclick='return fun_clic_glosa(" + fila["serial_gVa"] + ")'>" + fila["serial_glosa"] + "</a>"
    else
        html = fila["serial_glosa"];
    return html;
}

function fun_clic_glosa(serial_gVa) {
    glserial_gva = serial_gVa;
    var nombre_glosa = "";
    var dtv_glosa = new vista(glglosas_realizadas, "['serial_gVa']==" + serial_gVa, '', '');
    var serial_dtr = "";
    if (dtv_glosa.length > 0)
    {
        serial_dtr = dtv_glosa[0]["serial_dtr"];
        nombre_glosa = dtv_glosa[0]["descripcion"];
        glserial_glosa = dtv_glosa[0]["serial_glosa"];
    }

    var vcodigo = "";
    var vdiente = "";
    var vsuperficie = "";
    var vdescripcion = "";
    var nombre_proc = "";

    var dtv_desc2 = new vista(glprocedientos,
                      "['serial_dtr']=='" + serial_dtr+"'", '', '');

    if (dtv_desc2.length > 0) {
        vdescripcion = dtv_desc2[0]["nombre_tra"];
        vcodigo = dtv_desc2[0]["codigo_tra"];
        vsuperficie = dtv_desc2[0]["superficie"];
        vdiente = dtv_desc2[0]["diente"];
        nombre_proc = vcodigo + " " + vdescripcion + " " + vdiente + " " + vsuperficie;

    }
    d("sp_proce_desglosar").innerText = nombre_proc;
    d("sp_glosa_desglosar").innerText = nombre_glosa;


    var permite_seguir = true;
    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True") || (glpermisos_promotor[0]["pptosinrestriccion"] == "1")) {
        permite_seguir = true;
    }
    else if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
        permite_seguir = false;
    }

    if (permite_seguir == true) {
        ver_modal("div_desglosar");
    }
    else {
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "No tiene permisos para realizar esta acción" });
    }
   
  
  //  alert(serial_gVa);
    return false;
}
var glserial_gva = "";
var glserial_glosa = "";
function si_desglose() {

    call_sgu(desglosar_post, [[{
        observacion: d("txt_observacion_desglose").value,
        serial_dtr: glserial_dtr,
        serial_gva: glserial_gva,
        serial_glosa:glserial_glosa
    }]], "desglosar", "plan_tratamiento");

    return false;
} 
function desglosar_post(respuesta) {
    ocultar_modal("div_desglosar");
    ocultar_modal("div_glosas");

    carga_ppto();
}
function enviar_mail_ptto()
{
    call_sgu(enviar_mail_ptto_post, [[{
        envio_id: glid_envio,
        mail: d("txt_email").value
    }]], "enviar_mail", "plan_tratamiento");
    return false;
}

function enviar_mail_ptto_post(respuesta)
{
    if (respuesta["respuesta"]["correcto"] == "1") {
        dhtmlx.alert({
            title: "",
            type: "alert",
            text: "Se envio el mail correctamente"
        });
    }
    else
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: "Se genero un error al enviar el mail"
        });
}


function si_auto_manual()
{    
    
    call_sgu(autorizar_manual_post, [[{
        observacion: d("txt_observacion_autorizacion_manual").value,
        serial_dtr: glserial_dtr
        }]], "autorizar_manualmente", "plan_tratamiento");

    return false;
}

function autorizar_manual_post(respuesta) {
    ocultar_modal("div_autorizar_manualmente");
    carga_ppto();
}


function ver_mensajes_ptto(serial_ptra)
{
    if (d("div_mensajes_ptr_" + serial_ptra).activo == undefined)
        d("div_mensajes_ptr_" + serial_ptra).activo = false;


    if (d("div_mensajes_ptr_" + serial_ptra).activo == false) {

        d("div_mensajes_ptr_" + serial_ptra).activo = true;
        d("div_mensajes_ptr_" + serial_ptra).style.display = "block";

        var dtv_ptra = new vista(glplantratamiento, "['serial_ptra']==" + serial_ptra, '', '');
        var serial_dtr = "";
        if (dtv_ptra.length > 0) {
            serial_dtr = dtv_ptra[0]["serial_dtr"];
        }

        var dtv_dtr_proc = new vista(glmensajes_dtr, "['serial_dtr']==" + serial_dtr, 'D', 'serial_mensajeria', 'true');
        //glmensajes_dtr

        var grilla = new grillajava();
        grilla.fuente = dtv_dtr_proc;
        grilla.div = "div_mensajes_ptr_" + serial_ptra;
        grilla.id = "gw_men_" + serial_ptra;
        grilla.autorow = false;
        grilla.habencabezado = false;
        grilla.clasetabla = "bordered";
        grilla.estilo = "itemlista";
        grilla.estilotabla = "width:50px";
        grilla.alternolista = "alternolista";
        grilla.propiedadestabla = "";
        grilla.estiloencabezado = "";
        grilla.encabezado = ["Fecha"];
        grilla.datoscolumnas = ["serial_mensajeria"];
        grilla.tipocolumna = ["1"];
        grilla.funcioncolumna = ["fun_sp_abierto_cerrado"];
        grilla.estilocolumna = ["'width: 350px;  padding:2px;text-align:center;font-family:Tahoma; font-size:11px; font-weight:normal;'"];
        grilla.bind();

        if (dtv_dtr_proc.length > 0)
            d("div_mensajes_ptr_" + serial_ptra).style.display = "block";
        else
            d("div_mensajes_ptr_" + serial_ptra).style.display = "none";
    }
    else
    {
        d("div_mensajes_ptr_" + serial_ptra).activo = false;
        d("div_mensajes_ptr_" + serial_ptra).style.display = "none";
    }
       

    return false;
}

function fun_sp_abierto_cerrado(fila,dato)
{
    if(fila["abierto"]=="0")
    {
        return "<span  onclick='return clic_msj_dtr(" + fila["serial_mensajeria"] + ")' title='" + fila["descripcion"] + "' style='color:black; cursor:pointer' >" + dato + "</span>";
    }
    else
        return "<span onclick='return clic_msj_dtr(" + fila["serial_mensajeria"] + ")'  title='" + fila["descripcion"] + "' style='color:red; cursor:pointer'>" + dato + "</span>";

}

function clic_msj_dtr(vserial_mensajeria)
{
    call_sgu(ver_mensaje_post, [[{
        serial_mensajeria: vserial_mensajeria
    }]], "mensaje_ptr", "mensajeria");

   
   // Spu_mensajeria_plantto
    return false;
}

function ver_mensaje_post(respuesta)
{
    if (window.length > 1) {
        if (window[1] != undefined) {
            var tipo = typeof (window[1].clic_msj);
            if (tipo == "function") {
                d("div_menu_n2").setAttribute("class", "movmenu");

                var values = $('#slider-vertical').slider("value");


                if (values != 100) {
                    $('#slider-vertical').slider('value', 100);
                    setTimeout("ver_mensajeria()", 800);
                }
                else
                    ver_mensajeria();

                window[1].d("div_buscar_msj").style.display = "none";

                var serial_prm = d("hddserial_prm").value;

                window[1].glmensajes_unico = respuesta["mensajeria_ptto"];
                
                var dtv_resp = new vista(respuesta["responsables"], "['serial_prm']==" + serial_prm, '', '');
                var vasigna = 0;
                if (dtv_resp.length > 0)
                    vasigna = 1;

                window[1].clic_msj(respuesta["mensajeria_ptto"][0], respuesta["mensajeria_ptto"][0]["serial_mensajeria"], 1, vasigna);
            }
        }
    }

}


function historico()
{
    call_sgu(historico_post, [[{
        serial_ppac: glserial_ppacseleccionado
    }]], "historico", "plan_tratamiento");

    return false;
}
var glhist_tratamiento = new Array();
var glhist_citas = new Array();
function historico_post(respuesta) {
    glhist_tratamiento = respuesta["hist_tratamiento"];
    glhist_citas = respuesta["hist_citas"];
    //var dtv_hist_trat=
    ver_modal("div_historico");
    d("div_historico").id_pantalla_completa = "div_hist_papa";
    d("a_pantalla_completa_div_historico").style.color = "orange";
    d("a_pantalla_completa_div_historico").style.display = "inline-block";

    var divsvg = document.createElement("div");
    var svgtra = d("svg_historico_tratamiento");
    var svgtra_clon = svgtra.cloneNode(true);
    svgtra_clon.style.display = "inline-block";
    divsvg.appendChild(svgtra_clon);

    var divsvg2 = document.createElement("div");
    var svgci = d("svg_historico_citas");
    var svgci_clon = svgci.cloneNode(true);
    svgci_clon.style.display = "inline-block";
    divsvg2.appendChild(svgci_clon);

    var icono1 = new iconojava();
    icono1.objpropiedades = {
        serial: 1,
        nombre: "Tratamientos",
        ubicacion: "",
        con_imagen: "0",
        color_fondo_arr: ["white"],
        color_letra_arr: ["blue", "red", "orange"],
        color_borde_arr: ["rgb(196, 230, 211)"],
        borde_ancho: "2",
        fuente: "",
        tamano_icono: 60,
        funcion_clic_dato: "historico_trat",
        svg: divsvg.innerHTML
        
    };
    var link1=icono1.bind(); //Devuelve un link, imagen + texto, para agregar con appendChild

    var icono1 = new iconojava();
    icono1.objpropiedades = {
        serial: 1,
        nombre: "Citas",
        ubicacion: "",
        con_imagen: "0",
        color_fondo_arr: ["white"],
        color_letra_arr: ["blue", "red", "orange"],
        color_borde_arr: ["rgb(196, 230, 211)"],
        borde_ancho: "2",
        fuente: "",
        tamano_icono: 60,
        funcion_clic_dato: "citas_trat",
        svg: divsvg2.innerHTML
    };
    var link2 = icono1.bind(); //Devuelve un link, imagen + texto, para agregar con appendChild

    d("div_menu_hist").innerHTML = "";
    d("div_menu_hist").appendChild(link1);
    d("div_menu_hist").appendChild(link2);


    d("div_menu_hist").style.marginBottom = "10px";

    pinta_historico_tratamiento();
}


function pinta_historico_tratamiento()
{

    if (glhist_tratamiento.length > 0)
        d("div_hist_papa").style.display = "block";
    else
        d("div_hist_papa").style.display = "none";

    var nuevo_h = d("cuerpo").clientHeight - 300;
    d("div_hist_papa").style.height = nuevo_h + "px";
    var grilla = new grillajava();
    grilla.fuente = glhist_tratamiento;
    grilla.div = "div_hist";
    grilla.id = "gwhist_trat"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Clínica", "Procedimiento", "Area", "Superficie", "Fecha Ingreso", "Fecha Exclusión", "Usuario Excluye"];
    grilla.datoscolumnas = ["clinica", "nombre_tratamiento", "area", "superficie", "fecha_tomado", "fecha_exclusion", "nombre_excluye"];
    grilla.tipocolumna = ["1", "0", "0", "0", "0", "1", "0"];
    grilla.funcioncolumna = ["fun_clinica_pro", "", "", "", "", "fun_fecha_excl", ""];
    grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
        "'width: 400px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 90px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 90px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
        "'width: 100px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
        "'width: 100px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 150px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal '"];
    grilla.ordenarencabezado = true;
    grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
    grilla.ordenarentero = ["", "", "", "", "", "", ""];
    grilla.bind();
}
function fun_clinica_pro(fila,dato)
{
    var esauditor = false;
    if ((glpermisos_promotor[0]["auditor"] == "1") || (glpermisos_promotor[0]["auditor"] == "True"))
        esauditor = true;

    var esservicio = false;
    if ((parseInt(glpermisos_promotor[0]["cantidad_call"]) > 0) || (glpermisos_promotor[0]["agente_servicio"] == "1")) {
        esservicio = true;
    }

    if ((fila["serial_suc"] == glserial_suc_seleccionado) || (esauditor == true) || (esservicio == true)) {
        return fila["clinica"];
    }
    else
        return "-";
}
function fun_fecha_excl(fila, dato) {
    if (fila["nombre_excluye"] != "") {
        return fila["fecha_exclusion"];
    }
    else
        return "";
}
function pinta_historico_citas() {

    if (glhist_citas.length > 0)
        d("div_hist_papa").style.display = "block";
    else
        d("div_hist_papa").style.display = "none";

    var nuevo_h = d("cuerpo").clientHeight - 300;
    d("div_hist_papa").style.height = nuevo_h + "px";
    var grilla = new grillajava();
    grilla.fuente = glhist_citas;
    grilla.div = "div_hist";
    grilla.id = "gwhist_cit"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Clínica", "Fecha Cita", "Odontólogo"];
    grilla.datoscolumnas = ["clinica", "fecha_cita", "nombre_doc"];
    grilla.tipocolumna = ["1", "0", "0"];
    grilla.funcioncolumna = ["fun_clinica_pro", "", ""];
    grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
        "'width: 100px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    grilla.ordenarencabezado = true;
    grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
    grilla.ordenarentero = ["", "", "", "", "", "", ""];
    grilla.bind();
}
function historico_trat()
{
    pinta_historico_tratamiento();
    return false;
}

function citas_trat()
{
    pinta_historico_citas();
    return false;
}