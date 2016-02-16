var glflagmensaje_impuestos = 0;
var glserial_accion = 0;
var globjglconfiguracion;
var glproductos_datos;
var glproductos_impuestos;
var glretenciones;
var glresumen;
var glserial_factura;
var glproductos_datos_devoluciones = new Array();
var glproductos_impuestos_devoluciones = new Array();
var glretenciones_devoluciones = new Array();
var glretenciones_xprod = new Array();
var glretenciones_xprod_devoluciones = new Array();

function carga()
{

    d("txt_numero_factura").style.display = "none";
    titulos_factura();
    if (d("hddedita").value == "0") {
        glflagmensaje_impuestos = 0;
        glproductos_datos = [{
            consecutivo: 1,
            serial_productos: 0,
            nombre_producto: "",
            precio_unidad: '0',
            cantidad: 1,
            sub_total: '0',
            valor_impuesto: '0',
            valor_total: '0',
            titulo_productos: "Productos Comprados"
        }];

        //glproductos_datos_devoluciones = [{
        //    consecutivo_devoluciones: 1,
        //    consecutivo: 1,
        //    serial_productos: 0,
        //    cantidad_devuelta: 0,
        //    cantidad_a_devolver: 0,
        //    sub_total_devuelta: '0',
        //    sub_total_devolver: '0',
        //    valor_impuesto_devuelto: '0',
        //    valor_impuesto_devolver: '0',
        //    valor_total_devuelto: '0',
        //    valor_total_devolver: '0',
        //    titulo_productos: "Productos Comprados"
        //}];

        glproductos_impuestos = [
            {
                consecutivo_impuestos: 1,
                consecutivo: 1,
                serial_impuesto: 0,
                porcentaje: 0,
                valor: '0'
            }
        ];
        //glproductos_impuestos_devoluciones = [
        //   {
        //       consecutivo_impuestos: 1,
        //       consecutivo: 1,
        //       serial_impuesto: 0,
        //       porcentaje: 0,
        //       valor: '0'
        //   }
        //];
        glretenciones = [
            {
                consecutivo_retencion: 1,
                serial_impuesto: 0,
                porcentaje: 0,
                valor: '0',
                valor_devoluciones:'0'
            }
        ];

    }
    else
    {
        glrespuesta_1 = JSON.parse(d("hdddatos_edita").value);
        glproductos_datos = glrespuesta_1["factura_detalle"];
        glproductos_impuestos = glrespuesta_1["factura_detalle_impuesto"];
        glretenciones = glrespuesta_1["factura_retenciones"];
        glretenciones_xprod = calcula_retenciones_prod();

            
        d("txt_numero_factura").value = glrespuesta_1["factura"][0]["numero_factura"];
        glserial_factura = glrespuesta_1["factura"][0]["serial_factura"];
        glserial_contacto = glrespuesta_1["factura"][0]["serial_contactob"];
        fune_procesos();
        if (d("hdddevoluciones").value == "1")
            carga_dato_devoluciones(glproductos_datos, glproductos_impuestos, glretenciones);
                               
    }
    glresumen = [
         {
             consecutivo_resumen: 1,
             nombre: "<span id='sp_total_facturat' style='display:inline-block; width:180px'>" + globjglconfiguracion["total_factura"] + "</span>",
             detalle: "<span style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray'  id='sp_total_factura'>0</span>",
             valor: 0
         },
        {
            consecutivo_resumen: 2,
            nombre: "<span id='sp_tpagado' style='display:inline-block; width:180px'>Total Pagado</span>",
            detalle: "<span style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_pago'>0</span>",
            valor: 0
        },
        {
            consecutivo_resumen: 3,
            nombre: "<span id='sp_abonorealizado' style='display:inline-block; width:180px'>Abono Realizado</span>",
            detalle: "<input  onkeypress='return letraPresionada_punto(event, this)'   onkeyup='cambia_abono()'  onblur='cambia_abono()'   type='text' id='txt_abono' value='0' style=' margin-bottom:0px; width:90px;font-family:Tahoma; font-size:14px;color:gray' />",
            valor: 0
        }
    ];



    for (k in globjglconfiguracion)
    {
        if (d(k)!=null)
            d(k).innerText = globjglconfiguracion[k];
    }

    msj_modo();
    // d("chkdauto").style.display = "inline-block";
    // d("lbldmemoria").style.display = "inline-block";
    if (globjglconfiguracion["codigo"] == "GAS") {
        // d("chkdauto").style.display = "none";
        //d("lbldmemoria").style.display = "none";
        d("txt_numero_factura").disabled = "";
        d("lbldmemoria").style.display = "none";
        d("chkdauto").checked = true;
        d("txt_numero_factura").style.display = "inline-block";
    }
    else {
        //     d("chkdauto").style.display = "inline-block";
        //    d("lbldmemoria").style.display = "inline-block";

        d("lbldmemoria").style.display = "inline-block";
        d("chkdauto").checked = true;
        d("txt_numero_factura").style.display = "none";
    }

    if (d("hddedita").value == "0") {


        var objresumen = new Object();
        objresumen["consecutivo_resumen"] = 6;
        objresumen["nombre"] = "<span style='display:inline-block; width:180px'>Saldo Pendiente</span>";
        objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_saldo'>0</span>";
        objresumen["valor"] = "0";
        glresumen[glresumen.length] = objresumen;

        d("fecha_inicial_fact").value = d("hddfecha_actual").value;
        d("fecha_venc_fact").value = d("hddfecha_actual").value;           
        d("fecha_utilizacion").value = d("hddfecha_actual").value;
        // d("fecha_devolucion").value = d("hddfecha_actual").value;
        var myCalendar = new dhtmlXCalendarObject(["fecha_inicial_fact", "fecha_venc_fact", "fecha_utilizacion"]);
        myCalendar.setDateFormat("%Y-%m-%d");
        myCalendar.hideTime();
        call_sgu(carga_datos_post, [[{ codigo_accion: "CA" }]], "datos_basicos", "procesos");
    }
    else
    {
        d("txt_numero_factura").disabled = "disabled";
        d("spcontactos2").style.top = "-10px";
        d("chkdauto").style.display = "none";
        d("lbldmemoria").style.display = "none";
        var objresumen = new Object();
        objresumen["consecutivo_resumen"] = 7;
        objresumen["nombre"] = "<span  style='display:inline-block; width:180px; '>Abono Acumulado</span>";
        objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_abono_acumulado'>0</span>";
        objresumen["valor"] = "0";
        glresumen[glresumen.length] = objresumen;

        if (d("hdddevoluciones").value == "0") {

            d("div_total_devoluciones").style.display = "none";
            d("div_total_retencion_dev").style.display = "none";
            d("div_titulo_retencion").style.display = "none";
            d("div_pagotercero_devoluciones").style.display = "none";
            d("div_pagotercero_devoluciones2").style.display = "none";

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 5;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Abono Actual</span>";
            objresumen["detalle"] = "<input  onkeypress='return letraPresionada_punto(event, this)'   onkeyup='cambia_abono_actual()'  onblur='cambia_abono_actual()'   type='text' id='txt_abono_actual' value='0' style=' margin-bottom:0px; width:90px;font-family:Tahoma; font-size:14px;color:gray' />";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 8;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Forma Pago Abono</span>";
            objresumen["detalle"] = "<div id='div_forma_pago_abono'></div>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;


            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 6;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px'>Saldo Pendiente</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_saldo'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

        }
        else
        {
            d("div_total_devoluciones").style.display = "block";
            d("div_total_retencion_dev").style.display = "block";
            d("div_titulo_retencion").style.display = "block";
            d("div_pagotercero_devoluciones").style.display = "block";
            d("div_pagotercero_devoluciones2").style.display = "block";
            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 9;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Valor Devuelto</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_valor_devuelto'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 14;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Valor Real Devuelto</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_valor_devuelto_real'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 10;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Valor a Devolver</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_valor_a_devolver'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 11;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Valor Real a Devolver</span>";
            objresumen["detalle"] = "<span  type='text' id='sp_real_valor_a_devolver' style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' >0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 12;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Fecha Devolución</span>";
            objresumen["detalle"] = "<input type='text' id='fecha_devolucion' style='width:100px' />";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;

            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 13;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px; font-weight:bold'>Forma Pago Devolución</span>";
            objresumen["detalle"] = "<div id='div_forma_pago_devolucion'></div>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;


            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 6;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px'>Saldo Pendiente</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_saldo'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;


            var objresumen = new Object();
            objresumen["consecutivo_resumen"] = 7;
            objresumen["nombre"] = "<span style='display:inline-block; width:180px;font-weight:bold'>Saldo Pendiente despues de Devolución</span>";
            objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_saldo_devolucion'>0</span>";
            objresumen["valor"] = "0";
            glresumen[glresumen.length] = objresumen;
        }


     


        glflagmensaje_impuestos = parseInt(glrespuesta_1["factura_retenciones"][0]["flagmensaje_impuestos"]);
        carga_datos_post(glrespuesta_1);
        d("fecha_inicial_fact").value = glrespuesta_1["factura"][0]["fecha_factura"];
        d("fecha_venc_fact").value = glrespuesta_1["factura"][0]["fecha_vencimiento"];
        d("fecha_utilizacion").value = glrespuesta_1["factura"][0]["fecha_utilizacion"];
        if (d("hdddevoluciones").value == "1") {
            d("fecha_devolucion").value = d("hddfecha_actual").value;
        }
        d("txt_pago_tercero").value = glrespuesta_1["factura"][0]["concepto_tercero"];
        d("txt_pago_tercero_devoluciones").value = glrespuesta_1["factura"][0]["concepto_tercero"];
        d("txt_pago_tercero_devoluciones2").value = glrespuesta_1["factura"][0]["concepto_tercero"];

                
                
        d("txt_valor_tercero").value = glrespuesta_1["factura"][0]["valor_pago_tercero"];
        d("txt_observaciones").value = glrespuesta_1["factura"][0]["observaciones"];

        //d("txt_numero_factura").value = "0";

        d("txt_abono").value = glrespuesta_1["factura"][0]["abono"];
        seleccionar_combof("drpnegocio", glrespuesta_1["factura"][0]["serial_sucb"], "");
        seleccionar_combof("drpformapago", glrespuesta_1["factura"][0]["serial_forma_pago"], "");
        d("txt_contactos_auto").value = glrespuesta_1["factura"][0]["contacto"];
        d("drpformapago").disabled = "disabled";
        d("fecha_inicial_fact").disabled = "disabled";
        d("fecha_venc_fact").disabled = "disabled";
        d("fecha_utilizacion").disabled = "disabled";
        d("txt_pago_tercero").disabled = "disabled";
        d("txt_valor_tercero").disabled = "disabled";
        // d("txt_observaciones").disabled = "disabled";
        d("txt_numero_factura").disabled = "disabled";
        d("txt_abono").disabled = "disabled";
        d("drpnegocio").disabled = "disabled";
        d("divcontactossel").style.display = "none";
        d("divspancontacto").style.display = "none";
        d("divcontactos").style.marginTop = "0px";
        d("spcontactos").style.top = "0px";
        d("divspancontacto").style.marginBottom = "20px";
        d("divspancontacto").style.marginTop = "20px";
        d("divprimero").style.marginBottom = "10px";
        d("txt_contactos_auto").disabled = "disabled";
        d("a_agregar_producto").style.display = "none";
        d("a_agregar_retencion").style.display = "none";
        d("a_crear_factura").style.display = "none";
        if (d("hdddevoluciones").value == "0")
        {
            d("a_crear_abono").style.display = "inline-block";
            d("a_crear_devolucion").style.display = "none";
        }
        else
        {
            d("a_crear_abono").style.display = "none";
            d("a_crear_devolucion").style.display = "inline-block";
        }
                
        d("a_atras").style.display = "inline-block";
        d("spmensaje_impuestos").style.display = "none";
        d("a_consultar_abonos").style.display = "block";

        var n = 0;
        while (n < glproductos_datos.length)
        {
            var consecutivo = glproductos_datos[n]["consecutivo"];
            calcula_valor_linea(consecutivo);
            n++;
        }

        d("sp_abonorealizado").innerText = "Abono Inicial";

        d("div_fecha_abono").style.display = "block";
        if (d("hdddevoluciones").value == "1") {
            var myCalendar = new dhtmlXCalendarObject(["fecha_devolucion"]);
        }
        else
            var myCalendar = new dhtmlXCalendarObject(["txt_fecha_abono"]);

        myCalendar.setDateFormat("%Y-%m-%d");
        myCalendar.hideTime();

        if (d("hdddevoluciones").value == "0")
        {
            d("txt_fecha_abono").value = d("hddfecha_actual").value;
            d("div_fecha_abono").style.display = "block";
            //d("div_fecha_devolucion").style.display = "none";
        }
        else
        {
            d("fecha_devolucion").value = d("hddfecha_actual").value;
            d("div_fecha_abono").style.display = "none";
          //  d("div_fecha_devolucion").style.display = "block";
        }

        d("txt_abono").value = glrespuesta_1["factura"][0]["abono"];
        glabonocumulado = glrespuesta_1["factura"][0]["abono"];
        d("sp_abono_acumulado").innerText = glrespuesta_1["factura"][0]["abono"];
        cambia_abono();
        if (glrespuesta_1["seguimientos"].length == 0) {
            d("div_abonos").innerHTML = "<span>No existen abonos</span>";
        }
        else {
            var abono_acumulado = parseFloat(glrespuesta_1["factura"][0]["abono"]);
            var m = 0;
            while(m<glrespuesta_1["seguimientos"].length)
            {
                abono_acumulado = abono_acumulado + parseFloat(glrespuesta_1["seguimientos"][m]["abono_realizado"]);
                m++;
            }
            gl_total_saldo = gl_total_saldo - abono_acumulado + parseFloat(glrespuesta_1["factura"][0]["abono"]);
            gl_total_saldo_nuevo = gl_total_saldo;
            d("sp_total_saldo").innerText = gl_total_saldo_nuevo.toFixed(0);
            glabonocumulado = abono_acumulado;
            d("sp_abono_acumulado").innerText = parseFloat(abono_acumulado).toFixed(0);

            var dtvseguimientos = new vista(glrespuesta_1["seguimientos"], "", 'A', 'serial_seg_factura');

            //saldo_actual	saldo_anterior	abono_realizado	promotor	serial_seg_factura	serial_prm	fecha_seguimiento	observaciones
            var grilla = new grillajava();
            grilla.fuente = dtvseguimientos;
            grilla.div = "div_abonos";
            grilla.id = "gwabonos"
            grilla.autorow = false;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:98%";
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Fecha Abono", "Usuario", "Saldo Anterior", "Abono Realizado", "Saldo Nuevo", "Forma Pago","Observacion"];
            grilla.datoscolumnas = ["fecha_seguimiento", "promotor", "saldo_anterior", "abono_realizado", "saldo_actual","forma_pago","observaciones"];
            grilla.tipocolumna = ["0", "0", "0", "0", "0", "0","0", "0"];
            grilla.funcioncolumna = ["", "", "", "", "", "", "",""];
            grilla.estilocolumna = ["'width: 80px;  text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'", "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 50px; text-align:center; '"];
            grilla.bind();


        }


                
        evalua_es_dinero(glrespuesta_1["factura"][0]["es_pago"]);
        d("lbldmemoria").style.display = "none";
        d("txt_numero_factura").style.display = "inline-block";
        d("a_agregar_producto").style.display = "none";

               
    }
            
}

function titulos_factura()
{
    if (d("hddcodigo").value == "ING") {
        globjglconfiguracion = {
            lgtitulo: "Ingresos/Pago Recibido",
            lgtitulo_pago: "Pago Recibido",
            lgtitulo_sinpago: "Ventas",
            codigo: "ING",
            sparticulo: "Selecciona en lo que Gastaste",
            spcontactos: "Selecciona por quién recibiste Ingresos",
            spcontactos_pago: "Selecciona de quién recibiste el pago",
            spcontactos_sinpago: "Selecciona a quien le vendiste",
            titulo_producto: "Productos/Servicios/Pagos",
            boton_producto: "Agregar Producto/Servicio ",
            primer_total: "Total Pago Real ", //Total Recibido
            abono: "Abono Recibido",  //Abono recibido
            texto_contacto: "Escribe por quien recibiste ingresos",
            texto_contacto_pago: "Escribe quien te realizo el pago",
            texto_producto: "Escribe el producto/servicio/Concepto de Pago",
            titulo_productos: "Productos Vendidos o Servicios Prestados",
            titulo_productos_pago: "Pago Recibido",
            titulo_productos_sinpago: "Ventas",
            sp_fecha_utilizacion: "Fecha Realización",
            producto: "Producto",
            producto_pago: "Concepto de Pago Recibido",
            valor: "Valor Unitario",
            valor_pago: "Valor Pago Recibido",
            total_factura: "Total Factura",
            total_factura_pago: "Total Pago Recibido",
            total_factura_sinpago: "Total Venta",
            sp_titulo_nfactura: "Número Factura",
            sp_titulo_nfactura_pago: "Número Referencia ",
            sp_titulo_nfactura_sinpago: "Número Factura"
        };
    }
    else if (d("hddcodigo").value == "GAS") {
        globjglconfiguracion = {
            lgtitulo: "Gastos/Pago Realizado",
            lgtitulo_pago: "Pago Realizado",
            lgtitulo_sinpago: "Compras",
            codigo: "GAS",
            sparticulo: "Selecciona en lo que Gastaste",
            spcontactos: "Selecciona con quién Gastaste",
            spcontactos_pago: "Selecciona a quien le realizo pago",
            spcontactos_sinpago: "Selecciona a quien le vendiste",
            titulo_producto: "Productos/Servicios/Pagos",
            titulo_productos_pago: "Pago Realizado",
            titulo_productos_sinpago: "Compras",
            boton_producto: "Agregar Producto/Servicio",
            primer_total: "Total Pago Real", //Total Recibido
            abono: "Abono Realizado",  //Abono recibido,
            texto_contacto: "Escribe a quien le compraste",
            texto_contacto_pago: "Escribe a quien le realizaste el pago",
            texto_producto: "Escribe el producto/servicio/Concepto de Pago",
            titulo_productos: "Productos/Servicios Comprados",
            sp_fecha_utilizacion: "Fecha Utlización",
            producto: "Producto",
            producto_pago: "Concepto de Pago Realizado",
            valor: "Valor Unitario",
            valor_pago: "Valor Pago Realizado",
            total_factura: "Factura",
            total_factura_pago: "Total Pago Realizado",
            total_factura_sinpago: "Total Compra",
            sp_titulo_nfactura: "Número Factura",
            sp_titulo_nfactura_pago: "Número Referencia",
            sp_titulo_nfactura_sinpago: "Número Referencia"
        };
    }

    d("sp_titulo_prod").innerText = globjglconfiguracion["titulo_productos"];
    d("a_agregar_producto").innerText = globjglconfiguracion["boton_producto"];


}
var glabonocumulado=0;
var glproductos;
var glcontactos;
var glrespuesta_1;

function msj_modo()
{
    if (glflagmensaje_impuestos == 1)
        d("spmensaje_impuestos").innerHTML = "En estos momentos debes digitar el <strong>valor</strong> de cada impuesto a cada producto y el <strong>valor</strong> de cada impuesto de la factura.</br><a href='#' style='color:blue;font-weight:bold;color:#5c85c6;text-decoration:none' onclick='return clic_cambio_modo(1)' >Clic aca para cambiar este modo</a>";
    else
        d("spmensaje_impuestos").innerHTML = "En estos momentos debes digitar el <strong>porcentaje</strong> de cada impuesto a cada producto y el <strong>porcentaje</strong> de cada impuesto de la factura.</br><a href='#' style='color:blue; font-weight:bold;color:#5c85c6;text-decoration:none' onclick='return clic_cambio_modo(2)' >Clic aca para cambiar este modo</a>";
          
}


function clic_cambio_modo(dato)
{
    if (glflagmensaje_impuestos == 1)
        glflagmensaje_impuestos = 0;
    else
        glflagmensaje_impuestos = 1;

    msj_modo();
    pinta_productos();
    return false;
}
var glcambio_negocio = 0;
function carga_datos_post(respuesta)
{
            
    glproductos = respuesta["productos"];
    if (glcambio_negocio == 0) {
        if (respuesta["sucb"].length > 0) {
            pinta_negocio(respuesta["sucb"]);
        }
        else
            d("div_modacrearneg").style.display = "block";

               
    }
    glcambio_negocio = 0;
    glrespuesta_1 = respuesta;
    une_formas_pago();



    var dtvaccion = new vista(glrespuesta_1["accion"], "['codigo']=='" + globjglconfiguracion["codigo"] + "'", '', '');
    glserial_accion = dtvaccion[0]["serial_accion"];

    /*
    var arrpropinta = new Array();
    if(respuesta["productos_selectos"].length>0)
    {
        arrpropinta = respuesta["productos_selectos"];
    }
    else
    {
        arrpropinta = respuesta["productos"];
    }
    glproductos = respuesta["productos"];
    var divart = d("divarticulos");
    var n = 0;
    while((n<5)&&(n<arrpropinta.length))
    {
        var divnuevo = document.createElement("div");
        divnuevo.className="clasemenurap"
        var divnuevoimagen = document.createElement("div");
        var divnuevotexto = document.createElement("div");
        divnuevotexto.innerHTML = "<span>" + arrpropinta[n]["producto"] + "</span>";

        var dosl = String(arrpropinta[n]["producto"]).substr(0, 2);

        var ruta ="../Manejadores/ver_imagen.aspx?dosl=" + dosl + "&tipo=1&serial=" + arrpropinta[n]["|productosb"];
        if (sessionStorage[arrpropinta[n]["producto"] + "_" + arrpropinta[n]["serial_productosb"]] == undefined)
            guarda_dato_img_ses(ruta, arrpropinta[n]["producto"] + "_" + arrpropinta[n]["serial_productosb"]);
        else
            ruta = sessionStorage[arrpropinta[n]["producto"] + "_" + arrpropinta[n]["serial_productosb"]];
        
        divnuevoimagen.innerHTML = "<img height='50' src='"+ruta+"' href='#' />";
        divnuevo.appendChild(divnuevoimagen);
        divnuevo.appendChild(divnuevotexto);
        divnuevo.serial_producto = arrpropinta[n]["serial_productosb"];
        divnuevo.onclick = selecciono_producto;
        
         
        divart.appendChild(divnuevo);
        n++;
    }


    pinta_productos_auto();

    */
    pinta_contactos_iconos();
    pinta_contactos_auto();
    pinta_formapago();

    pinta_productos();

}

function une_formas_pago()
{
    var n = 0;
    var objregformapago = new Object();
    var arrnuevofp = new Array();
    while(n<glrespuesta_1["formas_pago"].length)
    {
        var obj1 = glrespuesta_1["formas_pago"][n];
               
        var serial_forma_pago = glrespuesta_1["formas_pago"][n]["serial_forma_pago"];
        if (objregformapago[serial_forma_pago] == undefined)
        {
            arrnuevofp[arrnuevofp.length] = obj1;
        }
        n++;
    }
    glrespuesta_1["formas_pago2"] = arrnuevofp;
}
   
function pinta_formapago() {

    var combo = new combojava();
    combo.id = "drpformapago";
    combo.estilo = "drp";
    combo.propiedades = "width:450px";
    combo.propiedades = "";
    combo.div = "div_formapago";
    combo.fuente = glrespuesta_1["formas_pago2"];
    combo.datovalor = "serial_forma_pago";
    combo.datotexto = "nombre";
    combo.evento = "";
    //  combo.fuenteinicial = [{ "serial_forma_pago": -1, "nombre": "..Seleccione.." }];
    combo.bind();

    var serial_tipo = 0;
    var m = 0;
    while (m < glrespuesta_1["formas_pago2"].length)
    {
        var tipo_forma = glrespuesta_1["formas_pago2"][m]["tipo_forma"];
        if (tipo_forma =="1")
        {
            seleccionar_combof("drpformapago", glrespuesta_1["formas_pago2"][m]["serial_forma_pago"], "");
            break;
        }
        m++;
    }

}
      
var glinventario_requerido = "";
function recargar_xcambio_negocio()
{
    reinicia();
}
var glnegocios;
function cambio_negocio()
{
    glcambio_negocio = 1;
    glnegocios = glrespuesta_1["sucb"];
    var dtvsucb = new vista(glrespuesta_1["sucb"],
        "['serial_sucb']=='" + d("drpnegocio").options[d("drpnegocio").selectedIndex].value + "'", '', '');
    if(dtvsucb.length>0)
    {
        var numero_factura = 1;
        if (dtvsucb[0]["numero_factura"] != null)
        {
            numero_factura = dtvsucb[0]["numero_factura"];
            glinventario_requerido = dtvsucb[0]["inventario_requerido"];

            var testn = validarSiNumero(numero_factura);
            if (testn == true)
                numero_factura++;
        }

        // d("txt_numero_factura").value = numero_factura;
    }

}
function pinta_negocio(sucb)
{
    glnegocios = sucb;
    var dtvsucb = new vista(sucb, "", 'A', 'nombre');

    var combo = new combojava();
    combo.id = "drpnegocio";
    combo.estilo = "drp";
    combo.propiedades = "width:450px";
    combo.propiedades = "";
    combo.div = "divnegocio";
    combo.fuente = dtvsucb;
    combo.datovalor = "serial_sucb";
    combo.datotexto = "nombre";
    combo.evento = "onchange='recargar_xcambio_negocio()'";;
    //     combo.fuenteinicial = [{ "serial_sucb": -1, "nombre": "..Seleccione.." }];
    combo.bind();

    if (sucb.length >0) {

                
        var numero_factura = 1;
        if (sucb[0]["numero_factura"] != null) {
            numero_factura = sucb[0]["numero_factura"];
            var testn = validarSiNumero(numero_factura);
            if (testn == true)
                numero_factura++;
        }
        //    d("txt_numero_factura").value = numero_factura;

        seleccionar_combof("drpnegocio", sucb[0]["serial_sucb"], "");

        var numero_factura = 1;
        if (sucb[0]["numero_factura"] != null) {
            numero_factura = sucb[0]["numero_factura"];
            glinventario_requerido = sucb[0]["inventario_requerido"];

            var testn = validarSiNumero(numero_factura);
            if (testn == true)
                numero_factura++;
        }
    }
    d("div_modacrearneg").style.display = "none";
       
}
   
function pinta_productos_auto()
{
    var dtvprodsuc =
        new vista(glproductos,
        "['serial_sucb']=='" + d("drpnegocio").options[d("drpnegocio").selectedIndex].value + "'", '', '');


    var id_auto = "txt_auto_trata";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divautoproductos",
        fuente: dtvprodsuc,
        nombre_en_fuente: "producto",
        serial_en_fuente: "serial_productosb",
        columnas_busqueda: ["producto"],
        columnas_grilla: ["serial_productosb", "producto"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["producto"],
        funcion_clic_dato: "funcion_clic_auto2",
        estilo_grilla: "width:450px",
        tipo_columna_grilla: ["1", "0"],
        estilo_columna_grilla: ["'width: 50px; text-align:center'", "'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: ["funcion_foto_pro", ""],
        top_grilla:"-10px",
        left_grilla:"0px",
        maximos_resultados: 5,
        ancho_caja_texto: "450px",
        alto_caja_texto: "30px",
        porcentaje_grilla:""
              
    };
      
    auto_completar_inicio(id_auto);
    d("txt_auto_trata").placeholder = globjglconfiguracion["texto_producto"];
    d("divproductos").style.display = "block";
            
}

function pinta_contactos_iconos()
{
    var serial_sucb=d("drpnegocio").options[d("drpnegocio").selectedIndex].value;
    //CONTACTOS
    d("divcontactossel").innerHTML = "";
    var dtvcontactos = new vista(glrespuesta_1["contactos"], "['serial_sucb']==" + serial_sucb  +" || ['generico']==1", '', '');

    var arrcontactopinta = new Array();
    var dtvcontactos_pinta = new Array();
    var dtvcontactos_pinta2 = new Array();
    var objcontactos_directos = new Object();

    if (glrespuesta_1["contactos_frec"]!=undefined)
    {
        if (glrespuesta_1["contactos_frec"].length > 0)
        {
            dtvcontactos_pinta = new vista(glrespuesta_1["contactos_frec"],
                "['serial_sucb']==" + serial_sucb + " || ['generico']==1", 'D', 'cantidad');
        }
    }

    if (dtvcontactos_pinta.length > 0)
    {
        dtvcontactos_pinta2 = new vista(dtvcontactos_pinta, "['serial_accion']==" + glserial_accion, '', '');
    }

    var contador = 0;
    var m = 0;
    while ((m < dtvcontactos_pinta2.length)&&(contador<5))
    {

        if (contador < 5)
        {
            var serial_contactob = dtvcontactos_pinta2[m]["serial_contactob"];
            if (objcontactos_directos[serial_contactob] == undefined)
            {
                var dtvcontactos_test = new vista(dtvcontactos, "['serial_contactob']==" + serial_contactob, '', '');
                if (dtvcontactos_test.length > 0)
                {
                    objcontactos_directos[serial_contactob] = serial_contactob;
                    var dtvcontactos2 = new vista(glrespuesta_1["contactos"], "['serial_contactob']==" + serial_contactob, '', '');
                    arrcontactopinta[arrcontactopinta.length] = dtvcontactos2[0];
                    contador++;
                }

            }

        }
        m++;
    }
    m = 0;
    while ((m < dtvcontactos.length) && (contador < 5))
    {
        var serial_contactob = dtvcontactos[m]["serial_contactob"];
        if (objcontactos_directos[serial_contactob] == undefined) {
            objcontactos_directos[serial_contactob] = serial_contactob;
            arrcontactopinta[arrcontactopinta.length] = dtvcontactos[m];
            contador++;
        }
        m++;
    }

    //contactos_frec
            
    glcontactos = dtvcontactos;
    var divart = d("divcontactossel");
    var n = 0;
    while ((n < 5) && (n < arrcontactopinta.length)) {
        var divnuevo = document.createElement("div");
        divnuevo.className = "clasemenurap"
        var divnuevoimagen = document.createElement("div");
        var divnuevotexto = document.createElement("div");
        divnuevotexto.innerHTML = "<span>" + arrcontactopinta[n]["nombre"] + "</span>";

        var dosl = String(arrcontactopinta[n]["nombre"]).substr(0, 2);

        var ruta = "../Manejadores/ver_imagen.aspx?dosl=" + dosl + "&tipo=2&serial=" + arrcontactopinta[n]["serial_contactob"];
        if (sessionStorage[arrcontactopinta[n]["nombre"] + "_" + arrcontactopinta[n]["serial_contactob"]] == undefined)
            guarda_dato_img_ses(ruta, arrcontactopinta[n]["nombre"] + "_" + arrcontactopinta[n]["serial_contactob"]);
        else
            ruta = sessionStorage[arrcontactopinta[n]["nombre"] + "_" + arrcontactopinta[n]["serial_contactob"]];

        divnuevoimagen.innerHTML = "<img height='50' src='" + ruta + "' href='#' />";
        divnuevo.appendChild(divnuevoimagen);
        divnuevo.appendChild(divnuevotexto);
        divnuevo.serial_contacto = arrcontactopinta[n]["serial_contactob"];
        divnuevo.onclick = selecciono_contacto;


        divart.appendChild(divnuevo);
        n++;
    }
}
function pinta_contactos_auto()
{
    var id_auto = "txt_contactos_auto";
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divcontactosauto",
        fuente: glcontactos,
        nombre_en_fuente: "nombre",
        serial_en_fuente: "serial_contactob",
        columnas_busqueda: ["nombre"],
        columnas_grilla: ["serial_contactob", "nombre"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["nombre"],
        funcion_clic_dato: "funcion_clic_auto3",
        estilo_grilla: "width:450px",
        tipo_columna_grilla: ["1", "0"],
        estilo_columna_grilla: ["'width: 50px; text-align:center'", "'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: ["funcion_foto_cont", ""],
        top_grilla: "29px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "450px",
        alto_caja_texto: "30px",

    };

    auto_completar_inicio(id_auto);
    d("txt_contactos_auto").placeholder = globjglconfiguracion["texto_contacto"];
    d("divcontactos").style.display = "block";
}


function funcion_foto_pro(fila,dato)
{
    var dosl = String(fila["producto"]).substr(0, 2);

    var ruta = "../Manejadores/ver_imagen.aspx?dosl=" + dosl + "&tipo=1&serial=" + fila["serial_productosb"];
    if (sessionStorage[fila["producto"] + "_" + fila["serial_productosb"]] == undefined)
        guarda_dato_img_ses(ruta, fila["producto"] + "_" + fila["serial_productosb"]);
    else
        ruta = sessionStorage[fila["producto"] + "_" + fila["serial_productosb"]];

    var htmlr = "<img  width='40px' src='" + ruta + "'/>";
    return htmlr;
}
function funcion_foto_cont(fila, dato) {
    var dosl = String(fila["nombre"]).substr(0, 2);

    var ruta = "../Manejadores/ver_imagen.aspx?dosl=" + dosl + "&tipo=2&serial=" + fila["serial_contactob"];
    if (sessionStorage[fila["nombre"] + "_" + fila["serial_contactob"]] == undefined)
        guarda_dato_img_ses(ruta, fila["nombre"] + "_" + fila["serial_contactob"]);
    else
        ruta = sessionStorage[fila["nombre"] + "_" + fila["serial_contactob"]];

    var htmlr = "<img  width='40px' src='" + ruta + "'/>";
    return htmlr;
}
function funcion_clic_auto2(serial, codigo, detalle)
{
    selecciono_prod(serial);
    return false;
}
function funcion_clic_auto3(serial, codigo, detalle) {
    selecciono_cont(serial);
    return false;
}
function selecciono_producto() {
    selecciono_prod(this.serial_producto);
    return false;
}
function selecciono_contacto() {
    selecciono_cont(this.serial_contacto);
    return false;
}

function selecciono_prod(serial)
{
          
    var dtv = new vista(glproductos, "['serial_productosb']=='" + serial + "'", '', '');
          
    d("txt_auto_trata").value = dtv[0]["producto"];
}

      
var glultimo_tipo_contacto = 0;
var glultimo_serial_contacto = 0;

function selecciono_cont(serial)
{
    var dtv = new vista(glcontactos, "['serial_contactob']=='" + serial + "'", '', '');
       
    //alert(dtv[0]["generico"]);
    if (dtv[0]["generico"] == "1")
    {
        if (glultimo_serial_contacto != serial) {
            var dtvp = new vista(glrespuesta_1["productos"], "['serial_contactob']=='" + serial + "'", '', '');
            glproductos = dtvp;
            //contactos_especificos
            pinta_productos();
        }
    }
    else
    {

        if (glultimo_tipo_contacto == 1) {
            glproductos = glrespuesta_1["productos"];
            pinta_productos();
        }

    }
    glultimo_tipo_contacto = dtv[0]["generico"];
    glultimo_serial_contacto = serial;
    d("txt_contactos_auto").value = dtv[0]["nombre"];
}
function crear_negocio()
{
    var val = validar_dato(["txt_negocio"]);
    if (val==true)
        call_sgu(crea_negocio_post, [[{ negocio: d("txt_negocio").value }]], "crear_negocio", "procesos");
            
    return false;
}

function crea_negocio_post(respuesta)
{
    if (respuesta["hsinserto"]["respuesta"] == 0)
    {
        d("div_modacrearneg").style.display = "block";
    }
    else
    {
        pinta_negocio([respuesta["hsinserto"]]);
    }
}
 

      
      

function pinta_productos()
{
            
    var grilla = new grillajava();
    grilla.fuente = glproductos_datos;
    grilla.div = "div_productos";
    grilla.id = "gwproductos_datos"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Producto", "Valor Unitario", "Cantidad", "SubTotal", "Impuestos", "Total", ""];
    grilla.datoscolumnas = ["nombre_producto", "precio_unidad", "cantidad", "sub_total", "valor_impuestos", "valor_total", "consecutivo"];
    grilla.tipocolumna = ["1", "1", "1", "1", "1", "1", "1"];
    grilla.funcioncolumna = ["coloca_editor", "coloca_vu", "coloca_can", "coloca_subt", "coloca_impuestos", "coloca_total", "retorna_svg"];
    grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'", "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 50px; text-align:center; '"];
    grilla.bind();

            
            

    var n = 0;
    while(n<glproductos_datos.length)
    {
        pinta_productos_auto_gr(glproductos_datos[n]["consecutivo"]);
        d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.position = "relative";
        d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.top = "0px";
        //d("divauto_txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.top = "33px";
        d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).value = glproductos_datos[n]["nombre_producto"];

        if (d("hddedita").value == "1") {
            d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).disabled = "disabled";
        }
        if (d("hddedita").value != "1") {
            calcula_cantidad_inventarios(glproductos_datos[n]["consecutivo"]);
        }
                
        n++;
    }
    retenciones_gw();
    resumen_gw();


    if (d("hdddevoluciones").value == "1") {
        pinta_productos_devoluciones();
        retenciones_gw_devoluciones();
    }
            
}

function pinta_productos_devoluciones() {

    d("div_papa_productos_devoluciones").style.display = "block";
            

    var grilla = new grillajava();
    grilla.fuente = glproductos_datos_devoluciones;
    grilla.div = "div_productos_devoluciones";
    grilla.id = "gwproductos_datos_devoluciones"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Producto", "Cantidad Devueltos", "Cantidad a Devolver", "SubTotal Devuelto", "SubTotal a Devolver", "Impuestos Devueltos", "Impuestos a Devolver", "Total Devuelto", "Total a Devolver"];
    grilla.datoscolumnas = ["nombre_producto", "cantidad_devuelta", "cantidad_a_devolver", "sub_total_devuelta", "sub_total_devolver", "valor_impuesto_devuelto", "valor_impuesto_devolver", "valor_total_devuelto", "valor_total_devolver"];
    grilla.tipocolumna = ["1", "0", "1", "1","1","1", "1", "1","1","1"];
    grilla.funcioncolumna = ["coloca_editor_devoluciones", "", "coloca_can_devoluciones", "coloca_subt", "coloca_subt_devoluciones", "coloca_impuestos_devoluciones", "coloca_impuestos_devoluciones2", "coloca_total_devoluciones", "coloca_total_devoluciones2"];
    grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
       "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'",
          "'width: 300px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
        "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'",
         "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'",
        "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
         "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 50px; text-align:center; '"];
    grilla.bind();


    var n = 0;
    while (n < glproductos_datos.length) {
        pinta_productos_auto_gr_devoluciones(glproductos_datos[n]["consecutivo"]);
        d("txt_auto_trata_devoluciones_" + glproductos_datos[n]["consecutivo"]).style.position = "relative";
        d("txt_auto_trata_devoluciones_" + glproductos_datos[n]["consecutivo"]).style.top = "0px";
        //d("divauto_txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.top = "33px";
        d("txt_auto_trata_devoluciones_" + glproductos_datos[n]["consecutivo"]).value = glproductos_datos[n]["nombre_producto"];

        if (d("hddedita").value == "1") {
            d("txt_auto_trata_devoluciones_" + glproductos_datos[n]["consecutivo"]).disabled = "disabled";
        }
        if (d("hddedita").value != "1") {
            calcula_cantidad_inventarios(glproductos_datos[n]["consecutivo"]);
        }

        n++;
    }
    retenciones_gw();
    resumen_gw();


}
function evalua_msj()
{
    if (glproductos_datos.length > 0) {
        var serial_productosb = glproductos_datos[0]["serial_productos"];
        if (serial_productosb != "0") {
            var dtvp = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productosb + "'", '', '');
            if (dtvp.length>0)
                evalua_tipo_producto(dtvp[0]["serial_tipo_producto"]);
        }

    }
}
function coloca_subt(fila,dato)
{
    return "<span id='sp_sub_"+fila["consecutivo"] + "'>" + dato + "</span>";
}
function coloca_subt_devoluciones(fila, dato) {
    return "<span id='sp_sub_devoluciones_" + fila["consecutivo"] + "'>" + dato + "</span>";
}
        
function coloca_total(fila, dato) {
    var valt = 0;
    if (String(dato) != "")
        valt = parseFloat(dato).toFixed(0);
    return "<span id='sp_total_" + fila["consecutivo"] + "'>" + valt + "</span>";
}
function coloca_total_devoluciones(fila, dato) {
    var valt = 0;
    if (String(dato) != "")
        valt = parseFloat(dato).toFixed(0);
    return "<span id='sp_total_devoluciones_" + fila["consecutivo"] + "'>" + valt + "</span>";
}
function coloca_total_devoluciones2(fila, dato) {
    var valt = 0;
    if (String(dato) != "")
        valt = parseFloat(dato).toFixed(0);
    return "<span id='sp_total__devoluciones2_" + fila["consecutivo"] + "'>" + valt + "</span>";
}
function coloca_impuestos(fila, dato)
{
    return "<div id='div_impuestos_"+fila["consecutivo"]+"'>"+coloca_impuestos_ct(fila)+ "</div>";
}
       
function coloca_impuestos_ct(fila)
{
    var modo_impuestos = 1;
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + fila["consecutivo"] + "'", '', '');
    var serial_impuesto = 0;
    var porce_imp = 0;
    if (dtv.length > 1) {
        modo_impuestos = 2;
        serial_impuesto = -1;
    }
    else {
        if (dtv.length > 0) {
            serial_impuesto = dtv[0]["serial_impuesto"];
            porce_imp = dtv[0]["porcentaje"];
        }
    }

    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    //  debugger;
    var htmlt1 = "<table border='0' style='border-width:0px'><tr  style='border-width:0px'>";
    var vali = 0;
    vali = parseFloat(fila["valor_impuesto"]).toFixed(0);
    var htmlporce = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:40px;' value='" + porce_imp + "' id='txt_impuesto_por_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this);'   onkeyup='dejo_componente_productos_imp(1," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'   onblur='dejo_componente_productos_imp(1," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
    var htmlporce2 = "<span style='font-family:Tahoma; font-size:13px; height:30px; margin:0px; padding:0; width:120px;'  id='sp_impuesto_por_" + fila["consecutivo"] + "'>%</span>";
    var htmlvalor = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + fila["valor_impuesto"] + "' id='txt_valor_por_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onkeyup='dejo_componente_productos_imp(1," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  onblur='dejo_componente_productos_imp(1," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
    var htmlvalor2 = "<input disabled style='cursor:not-allowed;font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + vali + "' id='txt_valor_por_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onblur='dejo_componente_productos_imp(" + '"' + "cantidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";

    var html_mas = retorna_svg_mas(fila["consecutivo"]);
    var html_masv = retorna_svg_masv(fila["consecutivo"]);
    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_impuesto(this," + '"' + fila["consecutivo"] + '"' + ")'  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:80px;' id='drp_impuestos_" + fila["consecutivo"] + "' >";



    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "0" + "'", '', '');

    var encontrado_def = 0;
    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";


        if (serial_impuesto != -1) {
            if ((serial_impuesto != 0) && (dtvimpuestos[n]["serial_impuesto"] == serial_impuesto)) {
                vselected = "selected";
                //    break;
            }
            else if ((dtvimpuestos[n]["codigo"] == "IVA") && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                vselected = "selected";
                encontrado_def++;
                // break;

            }
            else if ((n == dtvimpuestos.length - 1) && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                encontrado_def++;
                vselected = "selected";
                // break;

            }
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";
            
    if (encontrado_def > 0) {

        var m = 0;
        while (m < glproductos_impuestos.length) {
            if (fila["consecutivo"] == glproductos_impuestos[m]["consecutivo"]) {
                glproductos_impuestos[m]["serial_impuesto"] = serial_impuesto;
            }
            m++;
        }

    }
    if (modo_impuestos == 1) {
        if (glflagmensaje_impuestos == 0) {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
        else {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
    }
    else {
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_masv + "</td>";
    }
    htmlt1 = htmlt1 + "</tr></table>";
    return htmlt1;

}

function coloca_impuestos_devoluciones(fila, dato) {
    return "<div id='div_impuestos_" + fila["consecutivo"] + "'>" + coloca_impuestos_ct_devoluciones(fila) + "</div>";
}
function coloca_impuestos_ct_devoluciones(fila) {
    var modo_impuestos = 1;
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + fila["consecutivo"] + "'", '', '');
    var serial_impuesto = 0;
    var porce_imp = 0;
    if (dtv.length > 1) {
        modo_impuestos = 2;
        serial_impuesto = -1;
    }
    else {
        if (dtv.length > 0) {
            serial_impuesto = dtv[0]["serial_impuesto"];
            porce_imp = dtv[0]["porcentaje"];
        }
    }

    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    var htmlt1 = "<table border='0' style='border-width:0px'><tr  style='border-width:0px'>";
    var vali = 0;
    vali = parseFloat(fila["valor_impuesto_devuelto"]).toFixed(0);
    var htmlporce = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:40px;' value='" + porce_imp + "' id='txt_impuesto_por_devoluciones_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this);'   onkeyup='dejo_componente_productos_imp(1," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'   onblur='dejo_componente_productos_imp(1," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
    var htmlporce2 = "<span style='font-family:Tahoma; font-size:13px; height:30px; margin:0px; padding:0; width:120px;'  id='sp_impuesto_por_" + fila["consecutivo"] + "'>%</span>";
    var htmlvalor = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + fila["valor_impuesto_devuelto"] + "' id='txt_valor_por_devoluciones_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onkeyup='dejo_componente_productos_imp(1," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  onblur='dejo_componente_productos_imp(1," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
    var htmlvalor2 = "<input disabled style='cursor:not-allowed;font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + vali + "' id='txt_valor_por_devoluciones_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onblur='dejo_componente_productos_imp(" + '"' + "cantidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";

    var html_mas = retorna_svg_mas_devoluciones(fila["consecutivo"]);
    var html_masv = retorna_svg_masv_devoluciones(fila["consecutivo"]);
    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_impuesto(this," + '"' + fila["consecutivo"] + '"' + ")'  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:80px;' id='drp_impuestos_" + fila["consecutivo"] + "' >";



    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "0" + "'", '', '');

    var encontrado_def = 0;
    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";


        if (serial_impuesto != -1) {
            if ((serial_impuesto != 0) && (dtvimpuestos[n]["serial_impuesto"] == serial_impuesto)) {
                vselected = "selected";
                //    break;
            }
            else if ((dtvimpuestos[n]["codigo"] == "IVA") && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                vselected = "selected";
                encontrado_def++;
                // break;

            }
            else if ((n == dtvimpuestos.length - 1) && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                encontrado_def++;
                vselected = "selected";
                // break;

            }
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";

    if (encontrado_def > 0) {

        var m = 0;
        while (m < glproductos_impuestos.length) {
            if (fila["consecutivo"] == glproductos_impuestos[m]["consecutivo"]) {
                glproductos_impuestos[m]["serial_impuesto"] = serial_impuesto;
            }
            m++;
        }

    }
    if (modo_impuestos == 1) {
        if (glflagmensaje_impuestos == 0) {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
        else {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
    }
    else {
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_masv + "</td>";
    }
    htmlt1 = htmlt1 + "</tr></table>";
    return htmlt1;

}


function coloca_impuestos_devoluciones2(fila, dato) {
    return "<div id='div_impuestos_" + fila["consecutivo"] + "'>" + coloca_impuestos_ct_devoluciones2(fila) + "</div>";
}
function coloca_impuestos_ct_devoluciones2(fila) {
    var modo_impuestos = 1;
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + fila["consecutivo"] + "'", '', '');
    var serial_impuesto = 0;
    var porce_imp = 0;
    var consecutivo_impuestos = 0;
    if (dtv.length > 1) {
        modo_impuestos = 2;
        serial_impuesto = -1;
        consecutivo_impuestos = dtv[0]["consecutivo_impuestos"];
    }
    else {
        if (dtv.length > 0) {
            serial_impuesto = dtv[0]["serial_impuesto"];
            porce_imp = dtv[0]["porcentaje"];
            consecutivo_impuestos = dtv[0]["consecutivo_impuestos"];
        }
    }


    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    var htmlt1 = "<table border='0' style='border-width:0px'><tr  style='border-width:0px'>";
    var vali = 0;
    vali = parseFloat(fila["valor_impuesto_devuelto"]).toFixed(0);
    var htmlporce = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:40px;' value='" + porce_imp + "' id='txt_impuesto_por_devoluciones2_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this);'   onkeyup= 'calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")' onblur=' calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")'  type='text' />";
    var htmlporce2 = "<span style='font-family:Tahoma; font-size:13px; height:30px; margin:0px; padding:0; width:120px;'  id='sp_impuesto_por_devoluciones2_" + fila["consecutivo"] + "'>%</span>";
    var htmlvalor = "<input  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + fila["valor_impuesto_devuelto"] + "' id='txt_valor_por_devoluciones2_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'  onkeyup= 'calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")' onblur=' calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")'  type='text' />";
    var htmlvalor2 = "<input disabled style='cursor:not-allowed;font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:70px;' value='" + vali + "' id='txt_valor_por_devoluciones2_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)' onkeyup= 'calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")' onblur=' calculo_devoluciones(2, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + consecutivo_impuestos + '"' + ")'  type='text' />";

    var html_mas = retorna_svg_mas_devoluciones2(fila["consecutivo"]); 
    var html_masv = retorna_svg_masv_devoluciones2(fila["consecutivo"]);
    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_impuesto(this," + '"' + fila["consecutivo"] + '"' + ")'  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:80px;' id='drp_impuestos_devoluciones2_" + fila["consecutivo"] + "' >";



    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "0" + "'", '', '');

    var encontrado_def = 0;
    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";


        if (serial_impuesto != -1) {
            if ((serial_impuesto != 0) && (dtvimpuestos[n]["serial_impuesto"] == serial_impuesto)) {
                vselected = "selected";
                //    break;
            }
            else if ((dtvimpuestos[n]["codigo"] == "IVA") && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                vselected = "selected";
                encontrado_def++;
                // break;

            }
            else if ((n == dtvimpuestos.length - 1) && (encontrado_def == 0) && (serial_impuesto == 0)) {
                serial_impuesto = dtvimpuestos[n]["serial_impuesto"];
                encontrado_def++;
                vselected = "selected";
                // break;

            }
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";

    if (encontrado_def > 0) {

        var m = 0;
        while (m < glproductos_impuestos.length) {
            if (fila["consecutivo"] == glproductos_impuestos[m]["consecutivo"]) {
                glproductos_impuestos[m]["serial_impuesto"] = serial_impuesto;
            }
            m++;
        }

    }
    if (modo_impuestos == 1) {
        if (glflagmensaje_impuestos == 0) {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlporce2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
        else {
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_drp_impuestos + "</td>";
            htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_mas + "</td>";
        }
    }
    else {
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + htmlvalor2 + "</td>";
        htmlt1 = htmlt1 + "<td style='padding:0;border-width:0px'>" + html_masv + "</td>";
    }
    htmlt1 = htmlt1 + "</tr></table>";
    return htmlt1;

}
function retorna_svg_mas(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function retorna_svg_masv(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:green;stroke:green;stroke-width:0.5;fill-rule:nonzero;'/>";
    //htmlt1 = htmlt1 + "<polygon points='20,90 20,110 90,110 90,20 110,20 110,110 190,110 190,90 110,90 110,180 90,180 90,90' style='fill:gray;stroke:gray;stroke-width:5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function retorna_svg_mas_devoluciones(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod_devoluciones(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function retorna_svg_masv_devoluciones(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod_devoluciones(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:green;stroke:green;stroke-width:0.5;fill-rule:nonzero;'/>";
    //htmlt1 = htmlt1 + "<polygon points='20,90 20,110 90,110 90,20 110,20 110,110 190,110 190,90 110,90 110,180 90,180 90,90' style='fill:gray;stroke:gray;stroke-width:5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function retorna_svg_mas_devoluciones2(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod_devoluciones2(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function retorna_svg_masv_devoluciones2(consecutivo) {
    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer;'  onclick='mas_impuestos_prod_devoluciones2(" + '"' + consecutivo + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='2,13 2,7 7,7 7,2 13,2 13,7 18,7 18,13 13,13 13,18 7,18 7,13' style='fill:green;stroke:green;stroke-width:0.5;fill-rule:nonzero;'/>";
    //htmlt1 = htmlt1 + "<polygon points='20,90 20,110 90,110 90,20 110,20 110,110 190,110 190,90 110,90 110,180 90,180 90,90' style='fill:gray;stroke:gray;stroke-width:5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
  
function retorna_svg(fila, dato) {

    var invisible = "";
    if (d("hddedita").value == "1") {
        invisible = ";display:none";
    }

    var htmlt1 = "<svg height='20' width='20' style='cursor:pointer; " + invisible + "'   onclick='eliminar_prod(" + '"' + fila["consecutivo"] + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='4,3 4,1.5 8.0,1.5 8.0,0.8 12,0.8 12,1.5 16,1.5 16,3.0' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "<polygon points='4,4 16,4 14,19 6,19' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function coloca_vu(fila,dato)
{
    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }
    return "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:120px;' value='" + fila["precio_unidad"] + "' id='txt_vu_" + fila["consecutivo"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onkeyup='dejo_componente_productos(" + '"' + "precio_unidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'   onblur='dejo_componente_productos(" + '"' + "precio_unidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
}
function coloca_can(fila, dato) {
    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }
    return "<input  " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:80px;' value='" + fila["cantidad"] + "'  id='txt_ca_" + fila["consecutivo"] + "' class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada(event, this)'    onkeyup='dejo_componente_productos(" + '"' + "cantidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  onblur='dejo_componente_productos(" + '"' + "cantidad" + '"' + ",this," + '"' + fila["consecutivo"] + '"' + ")'  type='text' />";
}
function coloca_can_devoluciones(fila, dato) {
    return "<input  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:80px;' value='" + fila["cantidad_a_devolver"] + "'  id='txt_ca_devoluciones_" + fila["consecutivo"] + "' class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada(event, this)'  onkeyup=' calculo_devoluciones(1, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo"] + '"' + ")'  onblur=' calculo_devoluciones(1, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo"] + '"' + ")'  type='text' />";
}
function coloca_editor_devoluciones(fila, dato)
{
    return "<div id='divautoproductos_devoluciones_" + fila["consecutivo"] + "'></div>";
}
function coloca_editor(fila, dato) {
    return "<div id='divautoproductos_" + fila["consecutivo"] + "'></div>";
}
function pinta_productos_auto_gr(consecutivo) {


    var dtvprodsuc =
    new vista(glproductos,
    "['serial_sucb']=='" + d("drpnegocio").options[d("drpnegocio").selectedIndex].value + "'", '', '');
             
    if (dtvprodsuc.length == 0)
    {
        dtvprodsuc =
    new vista(glproductos,
    "['generico']=='1'", '', '');
    }

    var id_auto = "txt_auto_trata_" + consecutivo;
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divautoproductos_" + consecutivo,
        fuente: dtvprodsuc,
        nombre_en_fuente: "producto",
        serial_en_fuente: "serial_productosb",
        columnas_busqueda: ["producto"],
        columnas_grilla: ["serial_productosb", "producto"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["producto"],
        funcion_clic_dato: "funcion_clic_auto_pg",
        estilo_grilla: "width:450px",
        tipo_columna_grilla: ["1", "0"],
        estilo_columna_grilla: ["'width: 50px; text-align:center'", "'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: ["funcion_foto_pro", ""],
        top_grilla: "29px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "450px",
        alto_caja_texto: "30px",

    };

    auto_completar_inicio(id_auto);
    d("txt_auto_trata_" + consecutivo).placeholder = globjglconfiguracion["texto_producto"];
    d("txt_auto_trata_" + consecutivo).consecutivo = consecutivo;
    d("txt_auto_trata_" + consecutivo).onblur = dejo_componente_buscap;
    //  d("divproductos").style.display = "block";

}

function pinta_productos_auto_gr_devoluciones(consecutivo) {


    var dtvprodsuc =
    new vista(glproductos,
    "['serial_sucb']=='" + d("drpnegocio").options[d("drpnegocio").selectedIndex].value + "'", '', '');

    if (dtvprodsuc.length == 0) {
        dtvprodsuc =
    new vista(glproductos,
    "['generico']=='1'", '', '');
    }

    var id_auto = "txt_auto_trata_devoluciones_" + consecutivo;
    glconfiguracion_general_auto[id_auto] =
    {
        id_texto: id_auto,
        div: "divautoproductos_devoluciones_" + consecutivo,
        fuente: dtvprodsuc,
        nombre_en_fuente: "producto",
        serial_en_fuente: "serial_productosb",
        columnas_busqueda: ["producto"],
        columnas_grilla: ["serial_productosb", "producto"],
        id_cuerpo_pagina: "cuerpo",
        datos_enviados_selecciona_teclado: ["producto"],
        funcion_clic_dato: "funcion_clic_auto_pg",
        estilo_grilla: "width:450px",
        tipo_columna_grilla: ["1", "0"],
        estilo_columna_grilla: ["'width: 50px; text-align:center'", "'width: 350px; text-align:center; font-family:Tahoma; font-size:14px;'"],
        funcion_columna_grilla: ["funcion_foto_pro", ""],
        top_grilla: "29px",
        left_grilla: "0px",
        maximos_resultados: 5,
        ancho_caja_texto: "450px",
        alto_caja_texto: "30px",

    };

    auto_completar_inicio(id_auto);
    d("txt_auto_trata_devoluciones_" + consecutivo).placeholder = globjglconfiguracion["texto_producto"];
    d("txt_auto_trata_devoluciones_" + consecutivo).consecutivo = consecutivo;
    d("txt_auto_trata_devoluciones_" + consecutivo).onblur = dejo_componente_buscap;
    //  d("divproductos").style.display = "block";

}
function dejo_componente_buscap()
{
    var dtv = new vista(glproductos, "['producto']=='" + trim(String(this.value)) + "'", "", "");
    if(dtv.length>0)
    {
        selproducto_auto(dtv[0]["serial_productosb"], this.consecutivo);
    }
    else
    {
        var escr = String(trim(String(this.value)));
        var escr1 = escr.substr(0, 1).toUpperCase() + escr.substr(1).toLowerCase();
        var dtv2 = new vista(glproductos, "['producto']=='" + escr1 + "'", "", "");
        if (dtv2.length > 0) {
            selproducto_auto(dtv2[0]["serial_productosb"], this.consecutivo);
        }
        else
        {
            var m = 0;
            while (m < glproductos_datos.length) {
                if (this.consecutivo == glproductos_datos[m]["consecutivo"]) {
                    glproductos_datos[m]["serial_productos"] = "0";
                    glproductos_datos[m]["nombre_producto"] = this.value;
                }
                m++;
            }
        }

    }
}
function funcion_clic_auto_pg(serial, codigo, detalle) {
    var arrc1 = String(glultimo_div_sl).split("_");
    var consecutivo = arrc1[arrc1.length-1];
    selproducto_auto(serial, consecutivo);

             

    return false;
}
function selproducto_auto(serial,consecutivo)
{
    var dtv = new vista(glproductos, "['serial_productosb']=='" + serial + "'", "", "");

    if (dtv.length > 0) {
        d("txt_auto_trata_" + consecutivo).value = dtv[0]["producto"];
        var m = 0;
        while (m < glproductos_datos.length) {
            if (consecutivo == glproductos_datos[m]["consecutivo"]) {
                if (glproductos_datos[m]["serial_productos"] != serial) {
                    glproductos_datos[m]["serial_productos"] = serial;
                    glproductos_datos[m]["nombre_producto"] = dtv[0]["producto"];
                    if(globjglconfiguracion["codigo"] == "ING")
                        d("txt_vu_" + consecutivo).value = parseFloat(dtv[0]["valor"]).toFixed(0);
                    else
                        d("txt_vu_" + consecutivo).value = parseFloat(dtv[0]["costo"]).toFixed(0);
                }
            }
            m++;
        }
        if(glproductos_datos.length==1)
            evalua_tipo_producto(dtv[0]["serial_tipo_producto"]);
    }
    dejo_componente_productos("precio_unidad", d("txt_vu_" + consecutivo), consecutivo);
    calcula_valor_linea(consecutivo);
    if (d("hddedita").value != "1") {
        calcula_cantidad_inventarios(consecutivo);
    }

            
}
var glultmidif_calculada = 0;
function evalua_tipo_producto(serial_tipo_producto) {
           
    var dtvtp1 = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
    if (dtvtp1.length == 0) {
        dtvtp1 = new vista(glrespuesta_1["tipo_productos9"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
    }
    if (dtvtp1.length > 0) {
              
        var es_dinero = dtvtp1[0]["es_dinero"];
        evalua_es_dinero(es_dinero);
    }
}

function evalua_es_dinero(es_dinero)
{
    if (es_dinero == "1") {

        d("gwproductos_datos_tr_tit_td_2").style.display = "none";
        d("gwproductos_datos_tr_tit_td_3").style.display = "none";
        d("gwproductos_datos_tr_tit_td_0").innerHTML = globjglconfiguracion["producto_pago"];
        d("gwproductos_datos_tr_tit_td_1").innerHTML = globjglconfiguracion["valor_pago"];
        d("sp_titulo_prod").innerText = globjglconfiguracion["titulo_productos_pago"];
        d("lgtitulo").innerHTML = globjglconfiguracion["lgtitulo_pago"];
        d("spcontactos").innerText = globjglconfiguracion["spcontactos_pago"];
        d("a_agregar_producto").style.display = "none";
        d("div_pagotercero").style.display = "none";
        // d("txt_valor_tercero").value = "0";
        d("sp_total_facturat").innerText = globjglconfiguracion["total_factura_pago"];
        d("sp_total_factura").innerText = "0";
        d("txt_numero_factura").value = "";

        d("spcontactos2").innerText = globjglconfiguracion["spcontactos_pago"];

        var n = 0;
        while (n < glproductos_datos.length) {
            d("gwproductos_datos_tr_" + n + "_td_2").style.display = "none";
            d("gwproductos_datos_tr_" + n + "_td_3").style.display = "none";
            n++;
        }

        if (globjglconfiguracion["codigo"] == "GAS") {
            d("sp_titulo_nfactura").innerText = globjglconfiguracion["sp_titulo_nfactura_pago"];
            d("lbldmemoria").style.display = "none";
            d("chkdauto").checked = true;
            d("txt_numero_factura").style.display = "inline-block";
            d("txt_numero_factura").disabled = "";
        }
        else {
            d("sp_titulo_nfactura").innerText = globjglconfiguracion["sp_titulo_nfactura_pago"];
            d("lbldmemoria").style.display = "none";
            d("chkdauto").checked = true;
            d("txt_numero_factura").style.display = "inline-block";
            d("txt_numero_factura").disabled = "";
        }
    }
    else {
        d("lgtitulo").innerHTML = globjglconfiguracion["lgtitulo_sinpago"];
        d("gwproductos_datos_tr_tit_td_2").style.display = "table-cell";
        d("gwproductos_datos_tr_tit_td_3").style.display = "table-cell";
        d("gwproductos_datos_tr_tit_td_0").innerHTML = globjglconfiguracion["producto"];
        d("gwproductos_datos_tr_tit_td_1").innerHTML = globjglconfiguracion["valor"];
        d("sp_titulo_prod").innerText = globjglconfiguracion["titulo_productos_sinpago"];
        d("lgtitulo").innerHTML = globjglconfiguracion["lgtitulo_sinpago"];
        d("spcontactos").innerText = globjglconfiguracion["spcontactos_sinpago"];
        d("a_agregar_producto").style.display = "block";
        d("div_pagotercero").style.display = "block";
        d("sp_total_facturat").innerText = globjglconfiguracion["total_factura_sinpago"];
        //d("txt_valor_tercero").value = "0";
        d("spcontactos2").innerText = globjglconfiguracion["spcontactos"];
        var n = 0;
        while (n < glproductos_datos.length) {
            d("gwproductos_datos_tr_" + n + "_td_2").style.display = "table-cell";
            d("gwproductos_datos_tr_" + n + "_td_3").style.display = "table-cell";
            n++;
        }



        if (globjglconfiguracion["codigo"] == "GAS") {
            d("sp_titulo_nfactura").innerText = globjglconfiguracion["sp_titulo_nfactura_sinpago"];
            d("lbldmemoria").style.display = "none";
            d("chkdauto").checked = true;
            d("txt_numero_factura").style.display = "inline-block";
            d("txt_numero_factura").disabled = "";

        }
        else {
            d("sp_titulo_nfactura").innerText = globjglconfiguracion["sp_titulo_nfactura_sinpago"];
            d("lbldmemoria").style.display = "inline-block";
            d("chkdauto").checked = true;
            d("txt_numero_factura").style.display = "none";
            d("txt_numero_factura").disabled = "disabled";
        }

    }
}
function calcula_cantidad_inventarios(consecutivo)
{
    glultmidif_calculada = 0;
    var problema_inventario = 0;
    d("txt_ca_" + consecutivo).style.borderColor = "";
    var dtv = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", "", "");
    var serial_productos = dtv[0]["serial_productos"];

    if ((serial_productos != "0") && (globjglconfiguracion["codigo"] == "ING")) {
        var dtv_prod = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
               
        if ((dtv_prod[0]["codigo"] == "AR"))
        {
            var cantidad_inventario = 0;
            if (dtv_prod.length > 0)
                cantidad_inventario = parseInt(dtv_prod[0]["cantidad"]);
            glultmidif_calculada=(cantidad_inventario - parseInt( d("txt_ca_" + consecutivo).value));
            if (glultmidif_calculada < 0) {
                d("txt_ca_" + consecutivo).style.borderColor = "red";
                problema_inventario = 1;
            }
            else {
                d("txt_ca_" + consecutivo).style.borderColor = "";
                problema_inventario = 0;
            }
        }
    }

    return problema_inventario;
}

function dejo_componente_productos(campo,elemento,consecutivo)
{
    if (event.type != "keyup") {
        if ((campo == "precio_unidad")) {
            if (trim(String(elemento.value)) == "")
                elemento.value = "0";
        }
        if ((campo == "cantidad")) {
            if (trim(String(elemento.value)) == "")
                elemento.value = 1;
        }
    }
            
    if (campo == "cantidad") {
        calcula_cantidad_inventarios(consecutivo);
    }
    var m = 0;
    while (m < glproductos_datos.length) {
        if (consecutivo == glproductos_datos[m]["consecutivo"]) {
            glproductos_datos[m][campo] = elemento.value;
        }
        m++;
    }
    calcula_valor_linea(consecutivo);
}

     
var glconsecutivo_activo_imp = 0;
function mas_impuestos_prod(consecutivo) {
    glconsecutivo_activo_imp = consecutivo;
    //  debugger;
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");

    d("div_impuestos_ad").style.display = "block";
    var grilla = new grillajava();
    grilla.fuente = dtv;
    grilla.div = "div_impuestos_adc";
    grilla.id = "gwproductos_datos_impuestos"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";

    if (glflagmensaje_impuestos == 0) {
        grilla.encabezado = ["Porcentaje", "Impuesto", "Valor",""];
        grilla.datoscolumnas = ["porcentaje", "serial_impuesto", "valor", "consecutivo_impuestos"];
        grilla.tipocolumna = ["1", "1", "1", "1"];
        grilla.funcioncolumna = ["coloca_porc_i", "coloca_si", "coloca_vi2", "coloca_svg2"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    else
    {
        grilla.encabezado = ["Impuesto", "Valor", ""];
        grilla.datoscolumnas = ["serial_impuesto", "valor", "consecutivo_impuestos"];
        grilla.tipocolumna = ["1", "1", "1"];
        grilla.funcioncolumna = ["coloca_si", "coloca_vi", "coloca_svg2"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    grilla.bind();

    pinta_total_imp(consecutivo);


    if(d("hddedita").value=="1")
    {
        d("a_adicionar_imp").style.display = "none";
    }

}


function mas_impuestos_prod_devoluciones(consecutivo) {
    glconsecutivo_activo_imp = consecutivo;
    //  debugger;
    var dtv = new vista(glproductos_impuestos_devoluciones, "['consecutivo']=='" + consecutivo + "'", "", "");

    d("div_impuestos_ad").style.display = "block";
    var grilla = new grillajava();
    grilla.fuente = dtv;
    grilla.div = "div_impuestos_adc";
    grilla.id = "gwproductos_datos_impuestos"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";

    if (glflagmensaje_impuestos == 0) {
        grilla.encabezado = ["Porcentaje", "Impuesto", "Valor Devuelto"];
        grilla.datoscolumnas = ["porcentaje", "serial_impuesto", "valor_devuelto"];
        grilla.tipocolumna = ["1", "1", "1"];
        grilla.funcioncolumna = ["coloca_porc_i", "coloca_si", "coloca_vi2_devoluciones"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    else {
        grilla.encabezado = ["Impuesto", "Valor"];
        grilla.datoscolumnas = ["serial_impuesto", "valor"];
        grilla.tipocolumna = ["1", "1"];
        grilla.funcioncolumna = ["coloca_si", "coloca_vi2_devoluciones"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    grilla.bind();

    pinta_total_imp_devoluciones(consecutivo);


    if (d("hddedita").value == "1") {
        d("a_adicionar_imp").style.display = "none";
    }

}


function mas_impuestos_prod_devoluciones2(consecutivo) {
    glconsecutivo_activo_imp = consecutivo;
    //  debugger;
    var dtv = new vista(glproductos_impuestos_devoluciones, "['consecutivo']=='" + consecutivo + "'", "", "");

    d("div_impuestos_ad").style.display = "block";
    var grilla = new grillajava();
    grilla.fuente = dtv;
    grilla.div = "div_impuestos_adc";
    grilla.id = "gwproductos_datos_impuestos"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";

    if (glflagmensaje_impuestos == 0) {
        grilla.encabezado = ["Porcentaje", "Impuesto", "Valor", ""];
        grilla.datoscolumnas = ["porcentaje", "serial_impuesto", "valor", "consecutivo_impuestos"];
        grilla.tipocolumna = ["1", "1", "1", "1"];
        grilla.funcioncolumna = ["coloca_porc_i", "coloca_si", "coloca_vi2", "coloca_svg2"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    else {
        grilla.encabezado = ["Impuesto", "Valor"];
        grilla.datoscolumnas = ["serial_impuesto", "valor"];
        grilla.tipocolumna = ["1", "1"];
        grilla.funcioncolumna = ["coloca_si", "coloca_vi_devoluciones"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    grilla.bind();

    pinta_total_imp_devoluciones2(consecutivo);


    if (d("hddedita").value == "1") {
        d("a_adicionar_imp").style.display = "none";
    }

}

function coloca_svg2(fila, dato) {
    var invisible = "";
    if (d("hddedita").value == "1") {
        invisible=";display:none";
    }

    var htmlt1 = "<svg height='20' width='20' style=' cursor:pointer; " + invisible + "'   onclick='eliminar_prod_imp(" + '"' + fila["consecutivo_impuestos"] + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='4,3 4,1.5 8,1.5 8,0.8 12,0.8 12,1.5 16,1.5 16,3' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "<polygon points='4,4 16,4 14,19 6,19' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function coloca_porc_i(fila, dato) {

    var disabled = "";
    if (d("hddedita").value == "1")
        disabled = "disabled";
    return "<input " + disabled + " onkeyup='dejo_componente_productos_imp(2," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo_impuestos"] + '"' + ")'  onblur='dejo_componente_productos_imp(2," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo_impuestos"] + '"' + ")'  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + fila["porcentaje"] + "' id='txt_valor_por_i_" + fila["consecutivo_impuestos"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'    type='text' />";
}
function coloca_vi(fila, dato) {
    var valor = "";
    valor = parseFloat(fila["valor"]).toFixed(0);
    var disabled = "";
    if (d("hddedita").value == "1")
        disabled = "disabled";


    return "<input " + disabled + " onkeyup='dejo_componente_productos_imp(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_impuestos"] + '"' + ")' onblur='dejo_componente_productos_imp(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_impuestos"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_i2_" + fila["consecutivo_impuestos"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'     type='text' />";
}
function coloca_vi_devoluciones(fila, dato) {
    var valor = "";
    valor = parseFloat(fila["valor_a_devolver"]).toFixed(0);
    var disabled = "";
    if (d("hddedita").value == "1")
        disabled = "disabled";


    return "<input  onkeyup= 'calculo_devoluciones(3, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo_impuestos"] + '"' + ")' onblur=' calculo_devoluciones(3, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo_impuestos"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_i2_devoluciones" + fila["consecutivo_impuestos"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'     type='text' />";
}


function coloca_vi2(fila,dato)
{
    var valor = "";
    valor = parseFloat(fila["valor"]).toFixed(0);
    return "<input disabled style='cursor:not-allowed;font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_i1_" + fila["consecutivo_impuestos"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   onblur='dejo_componente_productos(this," + '"' + fila["consecutivo_impuestos"] + '"' + ")'  type='text' />";
}
function coloca_vi2_devoluciones(fila, dato) {
    var valor = "";
    valor = parseFloat(fila["valor_devuelto"]).toFixed(0);
    return "<input disabled style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_i1_devoluciones2_" + fila["consecutivo_impuestos"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'  calculo_devoluciones(1, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo"] + '"' + ")'  type='text' />";
}
function coloca_si(fila, dato) {

    var disabled = "";
    if (d("hddedita").value == "1")
        disabled = "disabled";


    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_impuesto_det(this," + '"' + fila["consecutivo_impuestos"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:130px;' id='drp_impuestos_i_" + fila["consecutivo"] + "' >";

    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "0" + "'", '', '');

    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";

        if (dtvimpuestos[n]["serial_impuesto"] == fila["serial_impuesto"]) {
            vselected = "selected";
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";
    return html_drp_impuestos;
}

var gleditandovalor = 0;
function dejo_componente_productos_imp(tipo, campo, elemento, consecutivo) {

    if ((tipo == 1) && (campo == "valor"))
        gleditandovalor = 1;
    else
        gleditandovalor = 0;

    var campo_consecutivo;
    if (tipo == 1)
        campo_consecutivo = "consecutivo";
    else if (tipo == 2)
        campo_consecutivo = "consecutivo_impuestos";

    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo == glproductos_impuestos[m][campo_consecutivo]) {

            if (event.type != "keyup") {
                if (trim(String(elemento.value)) == "")
                    elemento.value = 0;
            }
            if ((campo == "valor")&&(trim(String(elemento.value))==""))
            {
                glproductos_impuestos[m][campo] = "0";
            }
            else
                glproductos_impuestos[m][campo] = elemento.value;
                      
        }
        m++;
    }
    if (tipo == 1)
        var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");
    if (tipo==2)
        var dtv = new vista(glproductos_impuestos, "['consecutivo_impuestos']=='" + consecutivo + "'", "", "");

    var consec = dtv[0]["consecutivo"];
    var vtotali = calcula_impuesto_total_prod(consec);
            

    var m = 0;
    while (m < glproductos_datos.length) {
        if (consec == glproductos_datos[m]["consecutivo"]) {
            glproductos_datos[m]["valor_impuesto"] = vtotali;
            if (tipo == 2) {
                d("sp_valor_impuesto").innerText = parseFloat(vtotali).toFixed(0);
                d("sp_valor_producto").innerText = parseFloat(glproductos_datos[m]["sub_total"]).toFixed(0);
                d("sp_valor_total").innerText = parseFloat(parseFloat(glproductos_datos[m]["sub_total"]) - vtotali).toFixed(0);
            }
        }
        m++;
    }

    // debugger;
    if(tipo==1)
        calcula_valor_linea(consecutivo);
    else if(tipo==2)        
    {
        var htmlimp = coloca_impuestos_ct({ consecutivo: consec, valor_impuesto: vtotali });
        d("div_impuestos_" + consec).innerHTML = htmlimp;
        calcula_valor_linea_impuestos(consecutivo);
        pinta_total_imp(consec);
    }
}

function pinta_total_imp(consecutivo)
{
    d("div_msj_imp_n").style.display = "block";
    d("div_msj_imp_dev").style.display = "none";
    var m = 0;
    while (m < glproductos_datos.length)
    {
        if (consecutivo == glproductos_datos[m]["consecutivo"])
        {
            d("sp_valor_impuesto").innerText = parseFloat(glproductos_datos[m]["valor_impuesto"]).toFixed(0);
            d("sp_valor_producto").innerText = parseFloat(glproductos_datos[m]["sub_total"]).toFixed(0);
            d("sp_valor_total").innerText = (parseFloat(glproductos_datos[m]["sub_total"]) + parseFloat(glproductos_datos[m]["valor_impuesto"])).toFixed(0);
        }
        m++;
    }

}
function pinta_total_imp_devoluciones(consecutivo) {
    d("div_msj_imp_n").style.display = "none";
    d("div_msj_imp_dev").style.display = "block";
    d("sp_msj_imp_dev").innerText = "Valor Impuesto Devuelto";

    var m = 0;
    while (m < glproductos_datos_devoluciones.length) {
        if (consecutivo == glproductos_datos_devoluciones[m]["consecutivo"]) {
            d("sp_valor_impuesto_dev").innerText = parseFloat(glproductos_datos_devoluciones[m]["valor_impuesto_devuelto"]).toFixed(0);
        }
        m++;
    }

}
function pinta_total_imp_devoluciones2(consecutivo) {

    d("div_msj_imp_n").style.display = "none";
    d("div_msj_imp_dev").style.display = "block";
    d("sp_msj_imp_dev").innerText = "Valor Impuesto a Devolver";

    var m = 0;
    while (m < glproductos_datos_devoluciones.length) {
        if (consecutivo == glproductos_datos[m]["consecutivo"]) {
            d("sp_valor_impuesto_dev").innerText = parseFloat(glproductos_datos_devoluciones[m]["valor_impuesto_devolver"]).toFixed(0);
        }
        m++;
    }

}
function calcula_impuesto_total_prod(consecutivo)
{
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");
    var n = 0;
    var vtotali = 0;
    while (n < dtv.length)
    {
        vtotali = vtotali + parseFloat(dtv[n]["valor"]);
        n++;
    }
    return vtotali;
}

function cambia_impuesto_det(elemento, consecutivo_impuestos) {
    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo_impuestos == glproductos_impuestos[m]["consecutivo_impuestos"]) {
            glproductos_impuestos[m]["serial_impuesto"] = elemento.options[elemento.selectedIndex].value;
        }
        m++;
    }

    var dtv = new vista(glproductos_impuestos, "['consecutivo_impuestos']=='" + consecutivo_impuestos + "'", "", "");
    var consec = dtv[0]["consecutivo"];
    var vi = calcula_impuesto_total_prod(consec);
    var htmlimp = coloca_impuestos_ct({ consecutivo: consec, valor_impuesto: vi });
    d("div_impuestos_" + consec).innerHTML = htmlimp;

    calcula_valor_linea_impuestos(consecutivo_impuestos);
    pinta_total_imp(consec);

}

function cambia_impuesto(elemento, consecutivo) {
    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo == glproductos_impuestos[m]["consecutivo"]) {
            glproductos_impuestos[m]["serial_impuesto"] = elemento.options[elemento.selectedIndex].value;
        }
        m++;
    }

    // debugger; if (tipo == 1)
    calcula_valor_linea(consecutivo);
          
}


function calcula_valores()
{
    var m = 0;
    while (m < glproductos_datos.length) {
        var consecutivo = glproductos_datos[m]["consecutivo"];
        calcula_valor_linea(consecutivo);
        m++;
    }
}

function calcula_valor_linea(consecutivo)
{
    var valor_unitario = 0;
    var dtv_linea = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", "", "");

    if (trim(String(dtv_linea[0]["precio_unidad"])) != "")
        valor_unitario = parseFloat(dtv_linea[0]["precio_unidad"]);
    var cantidad = 0;
    if (trim(String(dtv_linea[0]["cantidad"])) != "")
        cantidad = parseFloat(dtv_linea[0]["cantidad"]);

    var subtotal = valor_unitario * cantidad;
    d("sp_sub_" + consecutivo).innerText = parseFloat(subtotal).toFixed(0);
    var dtv = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");

    var n = 0;
    var val_imp_total = 0;
    while (n < dtv.length) {
        var consecutivo_impuestos = dtv[n]["consecutivo_impuestos"];

        var valor_imp = 0;
        if (trim(String(dtv[n]["valor"])) != "")
            valor_imp = parseFloat(dtv[n]["valor"]);

        var porc_imp = 0;
        if (trim(String(dtv[n]["porcentaje"])) != "")
            porc_imp = parseFloat(dtv[n]["porcentaje"]);

        if (glflagmensaje_impuestos == 0) {

            //Se calcula con porcentaje
            valor_imp = subtotal * porc_imp*0.01;
            //  d("txt_valor_por_" + consecutivo).value = valor_imp.toFixed(0);

        }
        else if (glflagmensaje_impuestos == 1) {
            //Se digita el valor
            valor_imp = dtv[n]["valor"];
        }

        var m = 0;
        while (m < glproductos_impuestos.length) {
            if (consecutivo_impuestos == glproductos_impuestos[m]["consecutivo_impuestos"]) {
                glproductos_impuestos[m]["valor"] = valor_imp;
            }
            m++;
        }

        val_imp_total = parseFloat(val_imp_total) + parseFloat(valor_imp);
        n++;
    }

          

    if (val_imp_total > subtotal)
        val_imp_total = subtotal;


    var vtotal = parseFloat(subtotal) + parseFloat(val_imp_total);
    if (vtotal < 0)
        vtotal = 0;

    d("sp_total_" + consecutivo).innerText = vtotal.toFixed(0);

    //Se guarda en tabla
    var m = 0;
    while (m < glproductos_datos.length) {
        if (consecutivo == glproductos_datos[m]["consecutivo"]) {
            glproductos_datos[m]["valor_impuesto"] = val_imp_total;
            glproductos_datos[m]["sub_total"] = subtotal;
            glproductos_datos[m]["valor_total"] = vtotal;
        }
        m++;
    }
    if (gleditandovalor==0)
        d("txt_valor_por_" + consecutivo).value = parseFloat(val_imp_total).toFixed(0);

    calcula_total(1);

}
var gl_total_factura = 0;
var gl_total_pago = 0;
var gl_vretenciones = 0;
function calcula_total(modo)
{
    var valort = 0;
    var valori = 0;
    var valor_iva = 0;
    var var_subt_iva = 0;
    var m = 0;
    while (m < glproductos_datos.length) {

        var consecutivo = glproductos_datos[m]["consecutivo"];
        var dtv_imp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");

        var val_iva_con = 0;
        var n = 0;
        var sum_una_vez = 0;
        while (n < dtv_imp.length)
        {
            var serial_impuesto = dtv_imp[n]["serial_impuesto"];

            if (serial_impuesto == "0") {
                serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
            }
            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");

            if (dtv_imp_det[0]["codigo"] == "IVA")
            {
                if (sum_una_vez == 0)
                {
                    var_subt_iva = var_subt_iva + parseFloat(glproductos_datos[m]["sub_total"]);
                }
                sum_una_vez++;
                val_iva_con = val_iva_con + parseFloat(dtv_imp[n]["valor"]);
            }
            n++;
        }
        valor_iva = valor_iva + val_iva_con;
        valori = valori + parseFloat(glproductos_datos[m]["valor_impuesto"]);
        valort = valort + parseFloat(glproductos_datos[m]["sub_total"]);

        m++;
    }
    var vart = valort + valori;

    d("sp_valor_producto_total").innerText=valort.toFixed(0);
    d("sp_valor_impuesto_total").innerText=valori.toFixed(0);
    d("sp_valor_total_total").innerText = vart.toFixed(0);
           
    var m = 0;
    while (m < glretenciones.length) {

        if (glflagmensaje_impuestos == 0) {

            //Calcula porcentaje
            var porcentaje = 0;
            if (glretenciones[m]["porcentaje"] != "")
                porcentaje = parseFloat(glretenciones[m]["porcentaje"]);

            var valor = 0;
            var serial_impuesto = glretenciones[m]["serial_impuesto"];
            if (serial_impuesto == "0") {
                serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "DF1");
            }

                   
            if (serial_impuesto == "0") {
                serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "DF1");
            }
            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");

            if (dtv_imp_det[0]["codigo"] == "IVA") {
                valor = porcentaje * 0.01 * valor_iva;
            }
            else
                valor = porcentaje * 0.01 * valort;

            glretenciones[m]["valor"] = valor;
        }
        m++;
    }
    if(modo==1)
        retenciones_gw();

    var totalr=calcula_total_retenciones();
    gl_vretenciones = totalr;
    var pago_tercero = 0;
    if (String(d("txt_valor_tercero").value) != "")
    {
        pago_tercero = parseFloat(d("txt_valor_tercero").value);
    }
    gl_total_factura = vart;
    vart = vart + pago_tercero;
           
    gl_total_pago = vart - totalr;
    d("sp_total_factura").innerText = vart.toFixed(0);
    d("sp_total_pago").innerText = (vart - totalr).toFixed(0);
    gl_total_pago = vart - totalr;
    d("txt_abono").value = (vart - totalr).toFixed(0);
           
    var vabono = parseFloat(d("txt_abono").value);
    d("sp_total_saldo").innerText = parseFloat(vart - totalr - parseFloat(vabono)).toFixed(0);
    gl_total_saldo = vart - totalr - parseFloat(vabono);
    //d("")

}

function cambia_pagot() {
    var vart = gl_total_factura;
    var totalr = gl_vretenciones;
    var pago_tercero = 0;
    if (String(d("txt_valor_tercero").value) != "") {
        pago_tercero = parseFloat(d("txt_valor_tercero").value);
    }
 
    vart = vart + pago_tercero;
    gl_total_pago = vart - totalr;
    d("sp_total_factura").innerText = vart.toFixed(0);
    d("sp_total_pago").innerText = (vart - totalr).toFixed(0);
    gl_total_pago = vart - totalr;
    d("txt_abono").value = (vart - totalr).toFixed(0);

    var vabono = parseFloat(d("txt_abono").value);
    d("sp_total_saldo").innerText = parseFloat(vart - totalr - parseFloat(vabono)).toFixed(0);
    gl_total_saldo = vart - totalr - parseFloat(vabono);


}

function calcula_detalle_tot()
{
            
}

var gl_total_pago = 0;
function calcula_total_retenciones()
{
    var total_ret = 0;
    var m = 0;
    while (m < glretenciones.length) {
        var valor = parseFloat(glretenciones[m]["valor"]);
        total_ret = total_ret + valor;

        m++;
    }
         
    d("sp_valor_t_retencion").innerText = total_ret.toFixed(0);
    return total_ret;
}
function calcula_valor_linea_impuestos(consecutivo_impuestos) {
    var valor_unitario = 0;
    var dtv_linea_imp = new vista(glproductos_impuestos, "['consecutivo_impuestos']=='" + consecutivo_impuestos + "'", "", "");
    var consecutivo = dtv_linea_imp[0]["consecutivo"];


    calcula_valor_linea(consecutivo);
    var dtv_linea = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", "", "");
    var sub_total = parseFloat(dtv_linea[0]["sub_total"]);


    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo_impuestos == glproductos_impuestos[m]["consecutivo_impuestos"]) {


            var valor_imp = 0;
            if (trim(String(glproductos_impuestos[m]["valor"])) != "")
                valor_imp = parseFloat(glproductos_impuestos[m]["valor"]);

            var porc_imp = 0;
            if (trim(String(glproductos_impuestos[m]["porcentaje"])) != "")
                porc_imp = parseFloat(glproductos_impuestos[m]["porcentaje"]);

            if (glflagmensaje_impuestos == 0) {

                //Se calcula con porcentaje
                valor_imp = sub_total * porc_imp * 0.01;
                d("txt_valor_i1_" + consecutivo_impuestos).value = valor_imp.toFixed(0);
                glproductos_impuestos[m]["valor"] = valor_imp;
            }
            else {
                //glproductos_impuestos[m]["valor"] = valor_imp;
            }
        }
        m++;
    }
          
}

function resumen_gw()
{
    var grilla = new grillajava();
    grilla.fuente = glresumen;
    grilla.div = "divresumen";
    grilla.id = "gwresumen"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Detalle", "Valor"];
    grilla.datoscolumnas = ["nombre", "detalle"];
    grilla.tipocolumna = ["0", "0"];
    grilla.funcioncolumna = ["", ""];
    grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "' width: 80px; text-align:left;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    grilla.bind();
            
    d("sp_abonorealizado").innerText = globjglconfiguracion["abono"];
    d("sp_tpagado").innerText = globjglconfiguracion["primer_total"];

    if (d("hddedita").value == "1")
    {

        if (d("hdddevoluciones").value == "0") {
            var combo = new combojava();
            combo.id = "drpformapago_abono";
            combo.estilo = "drp";
            combo.propiedades = "width:100px";
            combo.div = "div_forma_pago_abono";
            combo.fuente = glrespuesta_1["formas_pago_abono"];
            combo.datovalor = "serial_forma_pago";
            combo.datotexto = "nombre";
            combo.evento = "";
            //  combo.fuenteinicial = [{ "serial_forma_pago": -1, "nombre": "..Seleccione.." }];
            combo.bind();
        }
        else
        {
            var combo = new combojava();
            combo.id = "drpformapago_devolucion";
            combo.estilo = "drp";
            combo.propiedades = "width:100px";
            combo.div = "div_forma_pago_devolucion";
            combo.fuente = glrespuesta_1["formas_pago_abono"];
            combo.datovalor = "serial_forma_pago";
            combo.datotexto = "nombre";
            combo.evento = "";
            //  combo.fuenteinicial = [{ "serial_forma_pago": -1, "nombre": "..Seleccione.." }];
            combo.bind(); 
            d("sp_valor_devuelto_real").innerText = gl_total_devuelto_real.toFixed(0);

        }
    }
}

function retenciones_gw() {

    //  debugger;
           
    var grilla = new grillajava();
    grilla.fuente = glretenciones;
    grilla.div = "divretenciones";
    grilla.id = "gwretenciones"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";

    if (glflagmensaje_impuestos == 0) {
        grilla.encabezado = ["Porcentaje", "Retención", "Valor", ""];
        grilla.datoscolumnas = ["porcentaje", "serial_impuesto", "valor", "consecutivo_retencion"];
        grilla.tipocolumna = ["1", "1", "1", "1"];
        grilla.funcioncolumna = ["coloca_porc_r", "coloca_sr", "coloca_vr2", "coloca_svgr"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    else {
        grilla.encabezado = ["Retención", "Valor", ""];
        grilla.datoscolumnas = ["serial_impuesto", "valor", "consecutivo_retencion"];
        grilla.tipocolumna = ["1", "1", "1"];
        grilla.funcioncolumna = ["coloca_sr", "coloca_vr", "coloca_svgr"];
        grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:left;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 30px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
    }
    grilla.bind();

           

}

function retenciones_gw_devoluciones() {

    //  debugger;

    var grilla = new grillajava();
    grilla.fuente = glretenciones_devoluciones;
    grilla.div = "divretenciones_devoluciones";
    grilla.id = "gwretenciones_devoluciones"
    grilla.autorow = false;
    grilla.habencabezado = true;
    grilla.clasetabla = "bordered";
    grilla.estilo = "itemlista";
    grilla.estilotabla = "width:98%";
    grilla.alternolista = "alternolista";
    grilla.propiedadestabla = "";
    grilla.estiloencabezado = "";
    grilla.encabezado = ["Retención", "Retención Devuelta", "Retención a Devolver"];
    grilla.datoscolumnas = ["serial_impuesto", "valor_devuelto", "valor_a_devolver"];
    grilla.tipocolumna = ["1", "0", "1"];
    grilla.funcioncolumna = ["coloca_sr_devoluciones", "coloca_vr_devoluciones", "coloca_vr_devoluciones2"];
    grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 150px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
        "'width: 150px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
            
    grilla.bind();



}
function coloca_svgr(fila, dato) {

    var invisible = "";
    if (d("hddedita").value == "1") {
        invisible = ";display:none";
    }

    var htmlt1 = "<svg height='20' width='20' style=' cursor:pointer;" + invisible + "'   onclick='eliminar_prod_ret(" + '"' + fila["consecutivo_retencion"] + '"' + ")'>";
    htmlt1 = htmlt1 + "<polygon points='4,3 4,1.5 8,1.5 8,0.8 12,0.8 12,1.5 16,1.5 16,3' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "<polygon points='4,4 16,4 14,19 6,19' style='fill:gray;stroke:gray;stroke-width:0.5;fill-rule:nonzero;'/>";
    htmlt1 = htmlt1 + "</svg>";
    return htmlt1;
}
function coloca_porc_r(fila, dato) {

    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    return "<input " + disabled + " onkeyup='dejo_componente_productos_ret(2," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")'  onblur='dejo_componente_productos_ret(2," + '"' + "porcentaje" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")'  style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + fila["porcentaje"] + "' id='txt_valor_por_r_" + fila["consecutivo_retencion"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'  type='text' />";
}
function coloca_vr(fila, dato) {
    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    var valor = "";
    valor = parseFloat(fila["valor"]).toFixed(0);
    return "<input " + disabled + " onkeyup='dejo_componente_productos_ret(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")' onblur='dejo_componente_productos_ret(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_r2_" + fila["consecutivo_retencion"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   type='text' />";
}
function coloca_vr_devoluciones(fila, dato) {
    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }

    var valor = "";
    valor = parseFloat(fila["valor_devuelto"]).toFixed(0);
    return "<input " + disabled + " onkeyup='dejo_componente_productos_ret(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")' onblur='dejo_componente_productos_ret(2," + '"' + "valor" + '"' + ",this," + '"' + fila["consecutivo_retencion"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_r2_devoluciones_" + fila["consecutivo_retencion"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   type='text' />";
}
function coloca_vr_devoluciones2(fila, dato) {
    var disabled = "";
          

    var valor = "";
    valor = parseFloat(fila["valor_a_devolver"]).toFixed(0);
    return "<input " + disabled + " onkeyup= 'calculo_devoluciones(4, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo_retencion"] + '"' + ")' onblur=' calculo_devoluciones(4, this,1," + '"' + "cantidad_a_devolver" + '"' + ',"' + fila["consecutivo_retencion"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_r2_devoluciones2_" + fila["consecutivo_retencion"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'   type='text' />";
}
function coloca_vr2(fila, dato) {
   
    var valor = "";
    valor = parseFloat(fila["valor"]).toFixed(0);
    return "<input disabled style='cursor:not-allowed;font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:100px;' value='" + valor + "' id='txt_valor_r1_" + fila["consecutivo_retencion"] + "'  class='gwautotext_2' style='text-align:left; width:120px;' onkeypress='return letraPresionada_punto(event, this)'  type='text' />";
}
function coloca_sr(fila, dato) {

    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }


    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "1" + "'", '', '');

    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_retencion_det(this," + '"' + fila["consecutivo_retencion"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:160px;' id='drp_retencion_" + fila["consecutivo_retencion"] + "' >";
    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";

        if (fila["serial_impuesto"] != "0") {
            if (dtvimpuestos[n]["serial_impuesto"] == fila["serial_impuesto"]) {
                vselected = "selected";
            }
        }
        else
        {
            var dtv = new vista(glrespuesta_1["impuestos"], "['codigo']=='" + "DF1" + "'", "", "");
            if(dtv.length>0)
            {
                if (dtvimpuestos[n]["serial_impuesto"] == dtv[0]["serial_impuesto"])
                {
                    vselected = "selected";
                    var m = 0;
                    while(m<glretenciones.length)
                    {
                        if (fila["consecutivo"] == glretenciones[m]["consecutivo"])
                        {
                            glretenciones[m]["serial_impuesto"] = dtv[0]["serial_impuesto"];
                        }
                        m++;
                    }
                }
                       
            }
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";
    return html_drp_impuestos;
}
function coloca_sr_devoluciones(fila, dato) {

    var disabled = "";
    if (d("hddedita").value == "1") {
        disabled = "disabled";
    }


    var dtvimpuestos = new vista(glrespuesta_1["impuestos"], "['retenciones']=='" + "1" + "'", '', '');

    var html_drp_impuestos = "<select " + disabled + " onchange='cambia_retencion_det(this," + '"' + fila["consecutivo_retencion"] + '"' + ")' style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:160px;' id='drp_retencion_" + fila["consecutivo_retencion"] + "' >";
    var n = 0;
    while (n < dtvimpuestos.length) {
        var vselected = "";

        if (fila["serial_impuesto"] != "0") {
            if (dtvimpuestos[n]["serial_impuesto"] == fila["serial_impuesto"]) {
                vselected = "selected";
            }
        }
        else {
            var dtv = new vista(glrespuesta_1["impuestos"], "['codigo']=='" + "DF1" + "'", "", "");
            if (dtv.length > 0) {
                if (dtvimpuestos[n]["serial_impuesto"] == dtv[0]["serial_impuesto"]) {
                    vselected = "selected";
                    var m = 0;
                    while (m < glretenciones.length) {
                        if (fila["consecutivo"] == glretenciones[m]["consecutivo"]) {
                            glretenciones[m]["serial_impuesto"] = dtv[0]["serial_impuesto"];
                        }
                        m++;
                    }
                }

            }
        }

        html_drp_impuestos = html_drp_impuestos + "<option " + vselected + " value='" + dtvimpuestos[n]["serial_impuesto"] + "'>" + dtvimpuestos[n]["nombre"] + "</option>"
        n++;
    }
    html_drp_impuestos = html_drp_impuestos + "</select>";
    return html_drp_impuestos;
}

        
function dejo_componente_productos_ret(tipo, campo, elemento, consecutivo_retencion) {

    var m = 0;
    while (m < glretenciones.length) {

                 
        if (consecutivo_retencion == glretenciones[m]["consecutivo_retencion"]) {

            if (event.type != "keyup") {
                if (trim(String(elemento.value)) == "")
                    elemento.value = 0;
            }
            if(campo=="porcentaje")
            {
                var valort = 0;
                var valori = 0;
                var valor_subt_iva = 0;
                var valor_iva = 0;

                valor_subt_iva = calcula_valor_subt_iva();
                valort=gltmmpvalor_t;
                valori=gltmmpvalor_i;
                valor_iva = gltmmpvalor_iva;

                var serial_impuesto = glretenciones[m]["serial_impuesto"];
                var dtv_imp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");

                var nv = 0;
                if (elemento.value != "") {

                    if (dtv_imp[0]["codigo"] == "IVA") {
                        nv = parseFloat(elemento.value) * 0.01 * valor_iva;
                    }
                    else
                        nv = parseFloat(elemento.value) * 0.01 * valort;

                }
                     
                glretenciones[m]["porcentaje"] = elemento.value;
                glretenciones[m]["valor"] = nv;

                d("txt_valor_r1_" + consecutivo_retencion).value = nv.toFixed(0);
            }
            if (campo == "valor") {
                glretenciones[m]["valor"] = elemento.value;
            }

        }
        m++;
    }

    calcula_total(2);

}
var gltmmpvalor_t;
var gltmmpvalor_i;
var gltmmpvalor_iva;


function calcula_valor_subt_iva()
{
    var valort = 0;
    var valor_subt_iva = 0;
    var valori = 0;
    var valor_iva = 0;

    var m1 = 0;
    while (m1 < glproductos_datos.length) {

        var consecutivo = glproductos_datos[m1]["consecutivo"];
        var dtv_imp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");

        var n = 0;
        var sum_una_vez = 0;
        while (n < dtv_imp.length) {

            var serial_impuesto = dtv_imp[n]["serial_impuesto"];
            if (serial_impuesto == "0") {
                serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
            }
            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");

            if (dtv_imp_det[0]["codigo"] == "IVA") {
                valor_iva = valor_iva + parseFloat(dtv_imp[n]["valor"]);
                if (sum_una_vez == 0) {
                    valor_subt_iva = valor_subt_iva + parseFloat(glproductos_datos[m1]["sub_total"]);
                }
                sum_una_vez++;
            }
            n++;

        }
        valori = valori + parseFloat(glproductos_datos[m1]["valor_impuesto"]);
        valort = valort + parseFloat(glproductos_datos[m1]["sub_total"]);
        m1++;
    }
    gltmmpvalor_t = valort;
    gltmmpvalor_i = valori;
    gltmmpvalor_iva = valor_iva;
    return valor_subt_iva;
}



function calcula_df(datos_impuesto,codigo)
{
    var serial_impuesto = "0";
    var n = 0;
    while(n<datos_impuesto.length)
    {
        if (datos_impuesto[n]["codigo"] == codigo)
        {
            serial_impuesto = datos_impuesto[n]["serial_impuesto"];
            break;
        }
        n++;
    }
    return serial_impuesto;
}
function cambia_retencion_det(elemento, consecutivo_retencion) {
    var m = 0;
    while (m < glretenciones .length) {
        if (consecutivo_retencion == glretenciones[m]["consecutivo_retencion"]) {
            glretenciones[m]["serial_impuesto"] = elemento.options[elemento.selectedIndex].value;

            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + elemento.options[elemento.selectedIndex].value + "'", "", "");
            if (dtv_imp_det[0]["codigo"] == "IVA") {
                var subt = calcula_valor_subt_iva();
                var valor_iva=gltmmpvalor_iva;
                if(glflagmensaje_impuestos==0)
                {
                    var nv = parseFloat(glretenciones[m]["porcentaje"]) * 0.01 * valor_iva;
                    glretenciones[m]["valor"] = nv;
                    d("txt_valor_r1_" + consecutivo_retencion).value = nv.toFixed(0);

                }

            }
            else
            {
                if (glflagmensaje_impuestos == 0) {
                    var subt = calcula_valor_subt_iva();
                    var nv = parseFloat(glretenciones[m]["porcentaje"]) * 0.01 * gltmmpvalor_t;
                    glretenciones[m]["valor"] = nv;
                    d("txt_valor_r1_" + consecutivo_retencion).value = nv.toFixed(0);
                }
            }

        }
        m++;
    }



    calcula_total(2);
}
     

var glconsecutivo_impuestos = 1;
function crear_impuesto_prod()
{
    var consecutivo = glconsecutivo_activo_imp;
    glconsecutivo_impuestos++;
    glproductos_impuestos[glproductos_impuestos.length]=
    {
        consecutivo_impuestos: glconsecutivo_impuestos,
        consecutivo: consecutivo,
        serial_impuesto: 0,
        porcentaje: 0,
        valor:'0'
    }
    mas_impuestos_prod(consecutivo);

    var vtotali = calcula_impuesto_total_prod(consecutivo);
    var htmlimp = coloca_impuestos_ct({ consecutivo: consecutivo, valor_impuesto: vtotali });
    d("div_impuestos_" + consecutivo).innerHTML = htmlimp;
    // d("div_impuestos_" + consecutivo).innerHTML = "sasa";
    //calcula_valor_linea_impuestos(consecutivo);
    calcula_valor_linea_impuestos(glconsecutivo_impuestos);
    pinta_total_imp(consecutivo);
}

function eliminar_prod_imp(consecutivo_impuestos) {
    var dtv = new vista(glproductos_impuestos, "['consecutivo_impuestos']=='" + consecutivo_impuestos + "'", "", "");
    var consecutivo = dtv[0]["consecutivo"];

    //alert(consecutivo_impuestos);
    var arrproductos_impuestos = new Array();
    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo_impuestos != glproductos_impuestos[m]["consecutivo_impuestos"]) {
            var obj1 = new Object();
            for (k in glproductos_impuestos[m]) {
                obj1[k] = glproductos_impuestos[m][k];
            }
            arrproductos_impuestos[arrproductos_impuestos.length] = obj1;
        }
        m++;
    }

    var dtv2 = new vista(arrproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");

    if (dtv2.length == 0) {
        glconsecutivo_impuestos++;
        arrproductos_impuestos[arrproductos_impuestos.length] = {
            consecutivo_impuestos: glconsecutivo_impuestos,
            consecutivo: consecutivo,
            serial_impuesto: 0,
            porcentaje: 0,
            valor: '0'
        };
    }
    glproductos_impuestos = copia_arreglo_objeto(arrproductos_impuestos, 0);
    mas_impuestos_prod(consecutivo);

    var vtotali=calcula_impuesto_total_prod(consecutivo);
    var htmlimp = coloca_impuestos_ct({ consecutivo: consecutivo, valor_impuesto: vtotali });
    d("div_impuestos_" + consecutivo).innerHTML = htmlimp;
    calcula_valor_linea(consecutivo);
    pinta_total_imp(consecutivo);

}
var glconsecutivo_datos = 1;
function agregar_producto() {
    glconsecutivo_datos++;
    glproductos_datos[glproductos_datos.length] = {
        consecutivo: glconsecutivo_datos,
        serial_productos: 0,
        nombre_producto: "",
        precio_unidad: '0',
        cantidad: 1,
        sub_total: '0',
        valor_impuesto: '0',
        valor_total: '0'
    };
    glconsecutivo_impuestos++;
    glproductos_impuestos[glproductos_impuestos.length] =
    {
        consecutivo_impuestos: glconsecutivo_impuestos,
        consecutivo: glconsecutivo_datos,
        serial_impuesto: 0,
        porcentaje: 0,
        valor: '0'
    }

    pinta_productos();
    evalua_msj();
    return false;
}
function eliminar_prod(consecutivo) {
            
    //alert(consecutivo_impuestos);
    var arrproductos_datos = new Array();
    var m = 0;
    while (m < glproductos_datos.length) {
        if (consecutivo != glproductos_datos[m]["consecutivo"]) {
            var obj1 = new Object();
            for (k in glproductos_datos[m]) {
                obj1[k] = glproductos_datos[m][k];
            }
            arrproductos_datos[arrproductos_datos.length] = obj1;
        }
        m++;
    }
    glproductos_datos = copia_arreglo_objeto(arrproductos_datos, 0);

    var arrproductos_impuestos = new Array();
    var m = 0;
    while (m < glproductos_impuestos.length) {
        if (consecutivo != glproductos_impuestos[m]["consecutivo"]) {
            var obj1 = new Object();
            for (k in glproductos_impuestos[m]) {
                obj1[k] = glproductos_impuestos[m][k];
            }
            arrproductos_impuestos[arrproductos_impuestos.length] = obj1;
        }
        m++;
    }
    glproductos_impuestos = copia_arreglo_objeto(arrproductos_impuestos, 0);
          
            
    if (glproductos_datos.length == 0) {

        glconsecutivo_datos++;
        glproductos_datos[glproductos_datos.length] = {
            consecutivo: glconsecutivo_datos,
            serial_productos: 0,
            nombre_producto: "",
            precio_unidad: '0',
            cantidad: 1,
            sub_total: '0',
            valor_impuesto: '0',
            valor_total: '0'
        };
        glconsecutivo_impuestos++;
        glproductos_impuestos[glproductos_impuestos.length] =
        {
            consecutivo_impuestos: glconsecutivo_impuestos,
            consecutivo: glconsecutivo_datos,
            serial_impuesto: 0,
            porcentaje: 0,
            valor: '0'
        }

    }
    
    glproductos_impuestos = copia_arreglo_objeto(arrproductos_impuestos, 0);
    pinta_productos();

    var n = 0;
    while (n < glproductos_datos.length) {
        calcula_valor_linea(glproductos_datos[n]["consecutivo"]);
        n++;
    }
    evalua_msj();
    return false;
}

var glconsecutivo_retencion = 1;
function agregar_retencion()
{
    glconsecutivo_retencion++;
    glretenciones[glretenciones.length] = {
        consecutivo_retencion: glconsecutivo_retencion,
        serial_impuesto: 0,
        porcentaje: 0,
        valor: '0'
    };
    retenciones_gw();

    return false;
}
function eliminar_prod_ret(consecutivo_retencion) {

    var arrretencion = new Array();
    var m = 0;
    while (m < glretenciones.length) {
        if (consecutivo_retencion != glretenciones[m]["consecutivo_retencion"]) {
            var obj1 = new Object();
            for (k in glretenciones[m]) {
                obj1[k] = glretenciones[m][k];
            }
            arrretencion[arrretencion.length] = obj1;
        }
        m++;
    }
    glretenciones = copia_arreglo_objeto(arrretencion, 0);

    if (glretenciones.length == 0) {

        glconsecutivo_retencion++;
        glretenciones[glretenciones.length] = {
            consecutivo_retencion: glconsecutivo_retencion,
            serial_impuesto: 0,
            porcentaje: 0,
            valor: '0'
        };
    }
    retenciones_gw();
    calcula_total(2);
}
var gl_total_saldo = 0;
function cambia_abono() {
    var valabono = 0;
    if (trim(String(d("txt_abono").value)) != "") {
        valabono = parseFloat(trim(String(d("txt_abono").value)));
    }

    d("sp_total_saldo").innerText = parseFloat(gl_total_pago - parseFloat(valabono)).toFixed(0);
    gl_total_saldo = gl_total_pago - parseFloat(valabono);
    gl_total_saldo_nuevo = gl_total_saldo;
}


var glarrproductos_nuevos = new Array();
var glserial_contacto = 0;

function crear_factura()
{
    var contacto_generico=0;
    var serial_contactob = -1;
    var escr = String(trim(String(d("txt_contactos_auto").value)));
    var escr1 = escr.substr(0, 1).toUpperCase() + escr.substr(1).toLowerCase();
    var dtv2 = new vista(glcontactos, "['nombre']=='" + escr1 + "'", "", "");
    if (dtv2.length > 0) {
        serial_contactob = dtv2[0]["serial_contactob"];
        contacto_generico= dtv2[0]["generico"];
    }
    else {
        var dtv3 = new vista(glcontactos, "['nombre']=='" + escr + "'", "", "");
        if (dtv3.length > 0) {
            serial_contactob = dtv3[0]["serial_contactob"];
            contacto_generico= dtv3[0]["generico"];
        }
    }

    if (serial_contactob == -1)
    {
        if(trim(String(d("txt_contactos_auto").value))!="")
        {
            serial_contactob = 0;
        }
    }
           
    var msj = "";
    if (serial_contactob == -1)
    {
        msj = "Debe Seleccionar o escribir el contacto</br>";
        d("txt_contactos_auto").style.borderColor = "red";
    }
    else
    {
        d("txt_contactos_auto").style.borderColor = "";
        glserial_contacto=serial_contactob;
    }

           
    var cantidad_en_cero = 0;
    var arrproductos_nuevos = new Array();
    var cantidad_productos_mal = 0;
    var arreglo_serial_prod = new Array();
    var cantidad_productos_rep = 0;
          
    var productos_sin_inventarios = 0;
    var cantidad_productos_no_entrada = 0;
    var cantidad_productos_no_salida = 0;
    var cantidad_productos_nopago_incompleto = 0;

    var cantidad_productos_dif_contacto = 0;
    var cantidad_prod_genericos_nuevos = 0;
    var n = 0;
    var cantidad_pagos = 0;
    var cantidad_productos = 0;
    while (n < glproductos_datos.length) {
              
        var serial_productos = glproductos_datos[n]["serial_productos"];
               
        if (serial_productos != 0) {
            var dtvp = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
            var serial_tipo_producto = dtvp[0]["serial_tipo_producto"];
            var dtv_tp = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            if (dtv_tp.length == 0)
            {
                dtv_tp = new vista(glrespuesta_1["tipo_productos9"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            }

            if (serial_tipo_producto)
                if (dtv_tp[0]["es_dinero"] == "1") {
                    cantidad_pagos++;
                }
                else
                    cantidad_productos++;
        }
        n++;
    }
    //Reviso que los productos añadidos sean del contacto seleccionado, 
    n = 0;
    while (n < glproductos_datos.length) {
        d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "";
        var serial_productos = glproductos_datos[n]["serial_productos"];

        var dtvp = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
        if (serial_productos != 0) {

            if (dtvp[0]["exclusivo"] == "1") {
                if ((dtvp[0]["serial_contactob"] != serial_contactob) && (serial_contactob != -1))
                {
                    cantidad_productos_dif_contacto++;
                    d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
                }
            }
        }
        else
        {
            //Nuevo Producto
            if (contacto_generico == "1")
            {
                cantidad_prod_genericos_nuevos++;
                d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
            }
        }
        n++;
    }
    n=0;
    while (n < glproductos_datos.length)
    {
        //d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "";
        var serial_productos=glproductos_datos[n]["serial_productos"];
        if (glproductos_datos[n]["serial_productos"] != "0")
        {
            if (arreglo_serial_prod.indexOf(glproductos_datos[n]["serial_productos"]) == -1)
                arreglo_serial_prod[arreglo_serial_prod.length] = glproductos_datos[n]["serial_productos"];
            else
                cantidad_productos_rep++;
        }

               

        if (serial_productos != "0") {
            //Evaluamos:

            //permite_entrada_dinero
            //permite_salida_dinero
            //permite_pago_incompleto
            var permite_entrada_dinero = 0;
            var permite_salida_dinero = 0;
            var permite_pago_incompleto = 0;

            var dtvtprod = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
            var serial_tipo_producto = dtvtprod[0]["serial_tipo_producto"];

            var dtvtp1= new vista(glrespuesta_1["tipo_productos9"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            if (dtvtp1.length == 0)
            {
                var dtvtp2 = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
                if(dtvtp2.length>0)
                {
                    permite_entrada_dinero = dtvtp2[0]["permite_entrada_dinero"];
                    permite_salida_dinero = dtvtp2[0]["permite_salida_dinero"];
                    permite_pago_incompleto = dtvtp2[0]["permite_pago_incompleto"];
                }
            }
            else
            {
                permite_entrada_dinero = dtvtp1[0]["permite_entrada_dinero"];
                permite_salida_dinero = dtvtp1[0]["permite_salida_dinero"];
                permite_pago_incompleto = dtvtp1[0]["permite_pago_incompleto"];
            }

            if (globjglconfiguracion["codigo"] == "ING") {
                if (permite_entrada_dinero == "0") {
                    d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
                    cantidad_productos_no_entrada++;
                }
                     
            }
            if (globjglconfiguracion["codigo"] == "GAS") {
                if (permite_salida_dinero == "0") {
                    cantidad_productos_no_salida++;
                    d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
                }

            }

            if(gl_total_saldo_nuevo>0)
            {
                if(permite_pago_incompleto=="0")
                {
                    cantidad_productos_nopago_incompleto++;
                    d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
                }
            }
        }


        if (glproductos_datos[n]["cantidad"] == "0") {
            cantidad_en_cero++;
            d("txt_ca_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
        }
        else
            d("txt_ca_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "";

        if (glproductos_datos[n]["serial_productos"] == "0")
        {
            if (d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).value == "") {
                d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "red";
                cantidad_productos_mal++;
            }
            else {
                //  d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "";

                var obj1n = new Object();
                obj1n["nombre"] = d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).value;
                obj1n["consecutivo"] = glproductos_datos[n]["consecutivo"];
                obj1n["tipo"] = "1";
                obj1n["serial_productos"] = "0";
                obj1n["cantidad"] = "0";

                arrproductos_nuevos[arrproductos_nuevos.length] = obj1n;
            }
        }
        else
        {
            var problema_inventario = calcula_cantidad_inventarios(glproductos_datos[n]["consecutivo"]);
            if (problema_inventario == 1)
            {
                productos_sin_inventarios++;
                var obj1n = new Object();
                obj1n["nombre"] = d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).value;
                obj1n["consecutivo"] = glproductos_datos[n]["consecutivo"];
                obj1n["tipo"] = "2";
                obj1n["serial_productos"] = glproductos_datos[n]["serial_productos"];
                obj1n["cantidad"] = glultmidif_calculada;
                arrproductos_nuevos[arrproductos_nuevos.length] = obj1n;
            }
            //d("txt_auto_trata_" + glproductos_datos[n]["consecutivo"]).style.borderColor = "";
        }
        n++;
    }

    glarrproductos_nuevos = arrproductos_nuevos;
            
    if (cantidad_pagos > 1)
    {
        msj = msj + "Un pago no puede tener mas de un concepto</br>";
    }
    if ((cantidad_pagos > 0)&&(cantidad_productos>0))
    {
        msj = msj + "No se puede generar pago y compra/venta al mismo tiempo, debe eliminar los productos o los pagos</br>";
    }

    if ((glinventario_requerido == 1) && (productos_sin_inventarios > 0))
        msj = msj + "El negocio tiene configurado que sin existencias no pueden registrar la venta</br>";

    if (cantidad_productos_rep > 0) {
        msj = msj + "No puede haber más de un registro con el mismo producto</br>";
    }
    if (cantidad_en_cero > 0)
    {
        msj = msj + "La cantidad de productos no puede ser 0</br>";
    }
    if (cantidad_productos_mal > 0)
    {
        msj = msj + "Debe digitar o seleccionar los productos o servicios</br>";
    }

    if (cantidad_productos_no_entrada > 0)
    {
        msj = msj + "Algunos de los productos seleccionados no permiten entrada </br>";
    }
    if (cantidad_productos_no_salida > 0) {
        msj = msj + "Algunos de los productos seleccionados no permiten salida</br>";
    }
    if (cantidad_productos_nopago_incompleto > 0) {
        msj = msj + "Algunos de los productos seleccionados no permiten que exista saldo pendiente</br>";
    }

    if (cantidad_productos_dif_contacto > 0) {
        msj = msj + "Algunos de los productos no pertenecen al contacto seleccionado</br>";
    }
    if (cantidad_prod_genericos_nuevos > 0) {
        msj = msj + "El tipo de contacto seleccionado no permite productos nuevos</br>";
    }


    var val_tercero = 0;
            
    if (d("txt_valor_tercero").value != "")
    {
        val_tercero = parseFloat(d("txt_valor_tercero").value);
    }
    if (val_tercero != 0)
    {
        if(d("txt_pago_tercero").value=="")
        {
            msj = msj + "Debe digitar el concepto del pago a tercero</br>";
            d("txt_pago_tercero").style.borderColor = "red";
        }
        else
            d("txt_pago_tercero").style.borderColor = "";
    }

    if (d("txt_abono").value == "") {
        msj = msj + "Debe digitar el abono</br>";
        d("txt_abono").style.borderColor = "red";
    }
    else {
        d("txt_abono").style.borderColor = "";
    }
    /*
    if (d("txt_numero_factura").value == "") {
        msj = msj + "Debe digitar el número de Factura</br>";
        d("txt_numero_factura").style.borderColor = "red";
    }
    else
    {
        d("txt_numero_factura").style.borderColor = "";
    }
    */
    if (d("fecha_inicial_fact").value == "") {
        msj = msj + "Debe digitar la fecha de la factura</br>";
        d("fecha_inicial_fact").style.borderColor = "red";
    }
    else {
        var respb = esFechaValida(d("fecha_inicial_fact").value);
        if(respb==false)
        {
            msj = msj + "La fecha de la factura no tiene formato correcto</br>";
            d("fecha_inicial_fact").style.borderColor = "red";
        }
        else
        {
            d("fecha_inicial_fact").style.borderColor = "";
        }
    }

    if (d("fecha_venc_fact").value == "") {
        msj = msj + "Debe digitar la fecha de vencimiento de la factura</br>";
        d("fecha_venc_fact").style.borderColor = "red";
    }
    else {
        var respb = esFechaValida(d("fecha_venc_fact").value);
        if (respb == false) {
            msj = msj + "La fecha de vencimiento de la factura no tiene formato correcto</br>";
            d("fecha_venc_fact").style.borderColor = "red";
        }
        else {
            d("fecha_venc_fact").style.borderColor = "";
        }
    }

    if (d("fecha_utilizacion").value == "") {
        msj = msj + "Debe digitar la fecha de utlización del servicio</br>";
        d("fecha_utilizacion").style.borderColor = "red";
    }
    else {
        var respb = esFechaValida(d("fecha_utilizacion").value);
        if (respb == false) {
            msj = msj + "La fecha de utlización del servicio no tiene formato correcto</br>";
            d("fecha_utilizacion").style.borderColor = "red";
        }
        else {
            d("fecha_utilizacion").style.borderColor = "";
        }
    }

    if (msj != "") {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: msj
        });
    }
    else {
        if (arrproductos_nuevos.length > 0) {
            d("div_tipo_prod").style.display = "block";

            if(globjglconfiguracion["codigo"]=="ING")
                texto_tipo = "Costo Adquisición del Producto x Unidad";
            else
                texto_tipo = "Valor Venta Producto";


            var grilla = new grillajava();
            grilla.fuente = arrproductos_nuevos;
            grilla.div = "div_cat_productos";
            grilla.id = "gwproductos_nuevos"
            grilla.autorow = false;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:98%";
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Producto", "Tipo Producto","Evento",texto_tipo];
            grilla.datoscolumnas = ["nombre", "consecutivo","consecutivo", "consecutivo"];
            grilla.tipocolumna = ["0", "1","1","1"];
            grilla.funcioncolumna = ["", "coloca_combo_tipo", "coloca_nombre_tipo", "coloca_entrada_costo"];
            grilla.estilocolumna = ["'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
                "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
                "'width: 300px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'",
               "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
            grilla.bind();


        }
        else
        {
            guardar_factura_def();
            //Guardar Factura
        }
    }

    return false;

    //txt_contactos_auto
    //tipo_productos


}

function coloca_nombre_tipo(fila,dato)
{
    if (fila["tipo"] == "1")
        return "Producto Nuevo";
    else
    {
        var cantidad = -1 * fila["cantidad"];
    }
    return "Sin Inventario " + "<span style='color:red; font-weight:bold '>" + cantidad + "</span> " + "Unidades";
}
function coloca_entrada_costo(fila, dato)
{
    var valor = 0;
    var disabled = "";
    if (globjglconfiguracion["codigo"] == "ING") {
        disabled = "";
    }
    else {
        disabled = "disabled";
    }

    valor = parseFloat(calculo_costo_producto(fila["consecutivo"])).toFixed(2);
    var html1 = "<input " + disabled + " style='font-family:Tahoma; font-size:13px; height:30px; margin-bottom:0px; width:120px;' value='" + valor + "' id='txt_costo_pr_" + fila["consecutivo"] + "' class='gwautotext_2' onkeypress='return letraPresionada_punto(event, this)' type='text'>";
    return html1;
}   
function coloca_combo_tipo(fila,dato)
{
    var disabled = "";

    if (fila["tipo"] == "1")
        disabled="";
    else if (fila["tipo"] == "2")
        disabled = "disabled";

    var arrtipo_productos = new Array();
           
    var objserial_tipo_producto = new Object();
    var tp = 0;
    while (tp < glrespuesta_1["tipo_productos9"].length) {
        var obj1 = new Object();
        if (objserial_tipo_producto[glrespuesta_1["tipo_productos9"][tp]["serial_tipo_producto"]] == undefined)
        {
            objserial_tipo_producto[glrespuesta_1["tipo_productos9"][tp]["serial_tipo_producto"]] = "0";
            obj1["serial_tipo_producto"] = glrespuesta_1["tipo_productos9"][tp]["serial_tipo_producto"];
            obj1["nombre"] = glrespuesta_1["tipo_productos9"][tp]["nombre"];
            obj1["codigo"] = glrespuesta_1["tipo_productos9"][tp]["codigo"];
            obj1["serial_sucb"] = glrespuesta_1["tipo_productos9"][tp]["serial_sucb"];
            arrtipo_productos[arrtipo_productos.length] = obj1;
        }

        tp++;
    }

    tp = 0;
    while (tp < glrespuesta_1["tipo_productos"].length) {
        var obj1 = new Object();
        if (objserial_tipo_producto[glrespuesta_1["tipo_productos"][tp]["serial_tipo_producto"]] == undefined) {
            objserial_tipo_producto[glrespuesta_1["tipo_productos"][tp]["serial_tipo_producto"]] = "0";
            obj1["serial_tipo_producto"] = glrespuesta_1["tipo_productos"][tp]["serial_tipo_producto"];
            obj1["nombre"] = glrespuesta_1["tipo_productos"][tp]["nombre"];
            obj1["codigo"] = glrespuesta_1["tipo_productos"][tp]["codigo"];
            obj1["serial_sucb"] = glrespuesta_1["tipo_productos"][tp]["serial_sucb"];
            arrtipo_productos[arrtipo_productos.length] = obj1;
        }
        tp++;
    }

    var dtv = new vista(arrtipo_productos, "", "A", "nombre");
    var html1 = "<select " + disabled + " style='margin-bottom:0px;' id='drp_tp_" + fila["consecutivo"] + "'>";
    var n = 0;
    html1 = html1 + "<option  value='-1'>..Seleccione..</option>";

    while (n < dtv.length)
    {
        var seleccionado = "";
        if (dtv[n]["serial_tipo_producto"] == "10")
            seleccionado = "selected";

        html1 = html1 + "<option " + seleccionado + " value=" + dtv[n]["serial_tipo_producto"] + ">" + dtv[n]["nombre"] + "</option>";
        n++;
    }
    html1 = html1 + "</select>"
    return html1;
}

function guardar_factura2()
{
    var productos_sin_inventarios = 0;
    var cantidad_productos_no_entrada = 0;
    var cantidad_productos_no_salida = 0;
    var cantidad_productos_nopago_incompleto = 0;

    var cantidad_errores = 0;

    var n = 0;
    var cantidad_pagos = 0;
    var cantidad_productos = 0;
    while (n < glproductos_datos.length) {

        var serial_productos = glproductos_datos[n]["serial_productos"];

        if (serial_productos != 0) {
            var dtvp = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
            var serial_tipo_producto = dtvp[0]["serial_tipo_producto"];
            var dtv_tp = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            if (dtv_tp.length == 0) {
                dtv_tp = new vista(glrespuesta_1["tipo_productos9"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            }

            if (serial_tipo_producto)
                if (dtv_tp[0]["es_dinero"] == "1") {
                    cantidad_pagos++;
                }
                else
                    cantidad_productos++;
        }
        n++;
    }
    var n = 0;
    while (n < glarrproductos_nuevos.length)
    {
           
        d("txt_costo_pr_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "";

        var valor = d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).options[d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).selectedIndex].value;
        if (valor == -1) {
            d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "red";
            cantidad_errores++;
        }
        else {
            // d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "";
        }

        var costo = d("txt_costo_pr_" + glarrproductos_nuevos[n]["consecutivo"]).value;
        if (costo == "")
            d("txt_costo_pr_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "red";
        // else
        //   d("txt_costo_pr_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "";

        if (valor != -1) {
            var permite_entrada_dinero = 0;
            var permite_salida_dinero = 0;
            var permite_pago_incompleto = 0;
            var es_dinero = 0;

            var serial_tipo_producto = valor;

 

                   

            var dtvtp1 = new vista(glrespuesta_1["tipo_productos9"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            if (dtvtp1.length == 0) {
                var dtvtp2 = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
                if (dtvtp2.length > 0) {
                    permite_entrada_dinero = dtvtp2[0]["permite_entrada_dinero"];
                    permite_salida_dinero = dtvtp2[0]["permite_salida_dinero"];
                    permite_pago_incompleto = dtvtp2[0]["permite_pago_incompleto"];
                    es_dinero = dtvtp2[0]["es_dinero"];
                }
            }
            else {
                permite_entrada_dinero = dtvtp1[0]["permite_entrada_dinero"];
                permite_salida_dinero = dtvtp1[0]["permite_salida_dinero"];
                permite_pago_incompleto = dtvtp1[0]["permite_pago_incompleto"];
                es_dinero = dtvtp1[0]["es_dinero"];
            }

            if (es_dinero == "1") 
                cantidad_pagos++;
            else
                cantidad_productos++;

            if (globjglconfiguracion["codigo"] == "ING") {
                if (permite_entrada_dinero == "0") {
                    d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "red";
                    cantidad_productos_no_entrada++;
                    cantidad_errores++;
                }

            }
            if (globjglconfiguracion["codigo"] == "GAS") {
                if (permite_salida_dinero == "0") {
                    cantidad_productos_no_salida++;
                    d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "red";
                    cantidad_errores++;
                }

            }

            if (gl_total_saldo_nuevo > 0) {
                if (permite_pago_incompleto == "0") {
                    cantidad_productos_nopago_incompleto++;
                    d("drp_tp_" + glarrproductos_nuevos[n]["consecutivo"]).style.borderColor = "red";
                    cantidad_errores++;
                }
            }
        }

        n++;
    }

    var msj = "";
    if (cantidad_productos_no_entrada > 0) {
        msj = msj + "Algunos de los productos seleccionados no permiten entrada </br>";
    }
    if (cantidad_productos_no_salida > 0) {
        msj = msj + "Algunos de los productos seleccionados no permiten salida</br>";
    }
    if (cantidad_productos_nopago_incompleto > 0) {
        msj = msj + "Algunos de los productos seleccionados no permiten que exista saldo pendiente</br>";
    }
    if (cantidad_pagos > 1) {
        msj = msj + "Un pago no puede tener mas de un concepto</br>";
    }
    if ((cantidad_pagos > 0) && (cantidad_productos > 0)) {
        msj = msj + "No se puede generar pago y compra/venta al mismo tiempo, debe eliminar los productos o los pagos</br>";
    }

    if (msj != "") {
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: msj
        });
    }
    else if (cantidad_errores == 0)
    {
        guardar_factura_def();
    }

    return false;
           
}
function calculo_costo_producto(consecutivo)
{
    var valor = 0;
    if (globjglconfiguracion["codigo"] == "ING") {
        var dtvfilapd = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", '', '');
        if (dtvfilapd.length > 0)
        {
            var serial_productos = dtvfilapd[0]["serial_productos"];
            if (serial_productos == "0")
            {
                valor = dtvfilapd[0]["precio_unidad"];
            }
            else
            {
                var dtv_prod = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + serial_productos + "'", '', '');
                if(dtv_prod.length>0)
                {
                    valor = dtv_prod[0]["costo"];
                }
            }
        }
        //Por defecto el valor de la venta es el precio del producto, pero deberia ser menor
    }
    else {
        //Por defecto el valor de la venta es el precio del producto más el promedio del valor_tercero + 
        //+ El costo_asociado con un impuesto de consumo, que tiene la variable compro_suma_costo=1 
        var n = 0;
        var sub_total_tot = 0;
        while (n < glproductos_datos.length) {
            sub_total_tot = sub_total_tot + parseFloat(glproductos_datos[n]["sub_total"]);
            n++;
        }

        var dtvfilapd = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", '', '');
        if (dtvfilapd.length > 0) {
            var valor_tercero = parseFloat(d("txt_valor_tercero").value);
            var sub_total = parseFloat(dtvfilapd[0]["sub_total"]);
            var cantidad = parseFloat(dtvfilapd[0]["cantidad"]);

            var valor_pond = valor_tercero;
            if ((sub_total_tot!=0)&&(cantidad!=0))
                valor_pond=valor_tercero * (sub_total / sub_total_tot) / cantidad;
            


            valor = parseFloat(dtvfilapd[0]["precio_unidad"]) + valor_pond;
            
            var dtvimp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", '');

            var compro_suma_costo = "0";

            if (dtvimp.length == 1) {
                var serial_impuesto = dtvimp[0]["serial_impuesto"];
                if (serial_impuesto == "0")
                    serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
                var dtvimp2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
                compro_suma_costo = dtvimp2[0]["compro_suma_costo"];
            }
            var tot_imp_compro_suma_costo = 0;

            var im = 0;
            while (im < dtvimp.length) {
                var serial_impuesto = dtvimp[im]["serial_impuesto"];
                if (serial_impuesto == "0")
                    serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
                var dtvimp2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
                compro_suma_costo = dtvimp2[0]["compro_suma_costo"];

                if (compro_suma_costo == "1")
                    tot_imp_compro_suma_costo = tot_imp_compro_suma_costo + parseFloat(dtvimp[im]["valor"]);
                im++;
            }
            
            valor = valor + tot_imp_compro_suma_costo;
        }
    }
    //valor = parseInt(valor);
    return valor;
}


function calcula_valor_con_retenciones_valor_ad()
{
    //retencion para cada producto, para posteriormente realizar los abonos, 
    //Cada producto tiene un valor retenido
    //Calcula el total de la retencion con IVA
    var retencion_iva_valor = 0;
    var retencion_no_iva_valor = 0;
    var retencion_total = 0;

    var n = 0;
    while (n < glretenciones.length) {
        var serial_impuesto = glretenciones[n]["serial_impuesto"];
        var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');

        if (dtvimp[0]["codigo"] == "IVA")
        {
            retencion_iva_valor = retencion_iva_valor + parseFloat(glretenciones[n]["valor"]);
        }
        else
        {
            retencion_no_iva_valor = retencion_no_iva_valor + parseFloat(glretenciones[n]["valor"]);
        }
        n++;
    }
    retencion_total = retencion_iva_valor + retencion_no_iva_valor;

    var valor_tercero = parseFloat(d("txt_valor_tercero").value);
    var valor_abono = parseFloat(d("txt_abono").value);
    var valor_subtotal_total = 0;
    var valor_total_iva = 0;
    var valor_total_sin_iva = 0;
    var total = 0;
    n = 0;
    while(n<glproductos_datos.length)
    {
        var consecutivo = glproductos_datos[n]["consecutivo"];
        var dtvimp2 = new vista(glproductos_impuestos,
            "['consecutivo']=='" + consecutivo + "'", '');

        var valor_impuesto_iva = 0;
        var valor_impuesto_no_iva = 0;
        var m = 0;
        while (m < dtvimp2.length) {
            var serial_impuesto = dtvimp2[m]["serial_impuesto"];
            var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');

            if (dtvimp[0]["codigo"] == "IVA") {
                valor_impuesto_iva = valor_impuesto_iva + parseFloat(dtvimp2[m]["valor"]);
            }
            else {
                valor_impuesto_no_iva = valor_impuesto_no_iva + parseFloat(dtvimp2[m]["valor"]);
            }

            m++;
        }
        var valor_imp_total = 0;
        valor_imp_total = valor_impuesto_iva + valor_impuesto_no_iva;

        valor_total_iva = valor_total_iva + valor_impuesto_iva;
        valor_total_sin_iva = valor_total_sin_iva + valor_impuesto_no_iva;
        total = total + parseFloat(glproductos_datos[n]["valor_total"]);

        valor_subtotal_total = valor_subtotal_total + parseFloat(glproductos_datos[n]["sub_total"]);
        glproductos_datos[n]["valor_impuesto_iva"] = valor_impuesto_iva;
        glproductos_datos[n]["valor_impuesto_no_iva"] = valor_impuesto_no_iva;
        n++;
    }
    var total_pagar = total + valor_tercero - retencion_total;

    //Se calculan porcentajes
    n = 0;
    while (n < glproductos_datos.length) {

        //valor_total_iva: IVA total cobrado
        //valor_total_sin_iva: Impuestos diferente a IVA comprado

             
        var valor_retencion_iva = porce_subtotal * retencion_no_iva_valor;

        var consecutivo = glproductos_datos[n]["consecutivo"];
        var valor_impuesto_iva = glproductos_datos[n]["valor_impuesto_iva"];
        var valor_impuesto_no_iva = glproductos_datos[n]["valor_impuesto_no_iva"];

        var sub_total = glproductos_datos[n]["sub_total"];
        var porce_subtotal = 0;
        if (valor_subtotal_total != 0)
        {
            porce_subtotal = sub_total / valor_subtotal_total;
        }
        var valor_retencion_no_iva = porce_subtotal * retencion_no_iva_valor;
        var porce_iva = 0;
        if (valor_impuesto_iva != 0) {
            porce_iva = valor_impuesto_iva / valor_total_iva;
        }
        var iva_retenido = retencion_iva_valor * porce_iva;


        //var porcentaje_imp_iva = 0;

        //if (valor_total_iva != 0)
        //porcentaje_imp_iva=valor_impuesto_iva / valor_total_iva;
        //var porcentaje_imp_no_iva = 0;

        //var porcentaje_imp_no_iva = 0;
        //if (valor_impuesto_no_iva != 0)
        //    porcentaje_imp_no_iva = valor_impuesto_no_iva / valor_total_sin_iva;

        var valor_ret_iva = iva_retenido;
        var valor_ret_no_iva = valor_retencion_no_iva;
        //guardar

        var retencionxprod = valor_ret_iva + valor_ret_no_iva;
        glproductos_datos[n]["valor_ret_iva"] = valor_ret_iva;
        glproductos_datos[n]["valor_ret_no_iva"] = valor_ret_no_iva;
        glproductos_datos[n]["valor_retencion"] = retencionxprod;

        var porcentaje_valor_total = 0;

        if (total != 0)
            porcentaje_valor_total = glproductos_datos[n]["valor_total"] / total;

        var pago_tercer_prop = valor_tercero * porcentaje_valor_total;

        var pago_prod_menos_retencion = parseFloat(glproductos_datos[n]["valor_total"]) - retencionxprod;
        var pago_real_prod = pago_prod_menos_retencion + pago_tercer_prop;
        glproductos_datos[n]["pago_real_prod"] = pago_real_prod;

        var porcentaje_pago_real = 0;
        if (total_pagar!=0)
            porcentaje_pago_real = pago_real_prod / total_pagar;

        glproductos_datos[n]["porcentaje_pago_real"] = porcentaje_pago_real;

        var valor_pago_abono_prod = porcentaje_pago_real * valor_abono;

        glproductos_datos[n]["valor_pago_abono_prod"] = valor_pago_abono_prod;
        var saldo = pago_real_prod - valor_pago_abono_prod;
        glproductos_datos[n]["saldo"] = saldo;
        n++;
    }
}
var glespago = 0;
function guardar_factura_def()
{
    var ves_pago = 0;
    fune_procesos();

    calcula_valor_con_retenciones_valor_ad();
    d("div_tipo_prod").style.display = "none";
    var arrproductos_datos = new Array();

    //Arma productos de la factura para insertar
    var n = 0;
    while (n < glproductos_datos.length)
    {
             
        var consecutivo = glproductos_datos[n]["consecutivo"];
        var dtvfilapd = new vista(glarrproductos_nuevos, "['consecutivo']=='" + consecutivo + "'", '', '');
        var serial_tipo_producto = 0;
               
        if (dtvfilapd.length > 0)
        {
            if (dtvfilapd[0]["tipo"] == "2")//Falta Inventario
            {

                var cantidad_inv_nuevo = 0;
                cantidad_inv_nuevo = -1 * dtvfilapd[0]["cantidad"];

                var cantidad_inv_ant = 0;
                cantidad_inv_ant = parseInt(glproductos_datos[n]["cantidad"]) - cantidad_inv_nuevo;

                //Las cantidades restantes que estaban en inventario

                var dtv_prod1= new vista(glrespuesta_1["productos"], "['serial_productosb']=='" +  dtvfilapd[0]["serial_productos"] + "'", '', '');
                var costo_inv_ant = dtv_prod1[0]["costo"];
                var costo_inv_nuevo = parseFloat(d("txt_costo_pr_" + consecutivo).value);
                var costo_nuevo_cal = (costo_inv_ant * cantidad_inv_ant + costo_inv_nuevo * cantidad_inv_nuevo) / (cantidad_inv_nuevo + cantidad_inv_ant);

                var objdatos = new Object();
                serial_tipo_producto = d("drp_tp_" + consecutivo).options[d("drp_tp_" + consecutivo).selectedIndex].value;
                objdatos["serial_productos"] = dtvfilapd[0]["serial_productos"];
                objdatos["serial_tipo_producto"] = serial_tipo_producto;
                var dtvtipo_prod = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
                objdatos["codigo_producto"] = dtvtipo_prod[0]["codigo"];
                objdatos["nombre_producto"] = dtvfilapd[0]["nombre"];
                objdatos["valor_producto"] = glproductos_datos[n]["precio_unidad"];
                objdatos["costo_producto"] = costo_nuevo_cal;
                objdatos["depreciacion"] = dtv_prod[0]["depreciacion"];
                objdatos["cantidad"] = glproductos_datos[n]["cantidad"];
                objdatos["cantidad_inv"] = cantidad_inv_ant;
                objdatos["impuestos"] = glproductos_datos[n]["valor_impuesto"];
                objdatos["subtotal"] = glproductos_datos[n]["sub_total"];
                objdatos["valor_total"] = glproductos_datos[n]["valor_total"];
                objdatos["consecutivo"] = glproductos_datos[n]["consecutivo"];
                arrproductos_datos[arrproductos_datos.length] = objdatos;
            }
            else if (dtvfilapd[0]["tipo"] == "1")
            {
                //Producto Nuevo
                var objdatos = new Object();
                serial_tipo_producto = d("drp_tp_" + consecutivo).options[d("drp_tp_" + consecutivo).selectedIndex].value;
                objdatos["serial_productos"] = "0";
                objdatos["serial_tipo_producto"] = serial_tipo_producto;
                var dtvtipo_prod = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
                objdatos["codigo_producto"] = dtvtipo_prod[0]["codigo"];
                objdatos["nombre_producto"] = dtvfilapd[0]["nombre"];
                objdatos["valor_producto"] = glproductos_datos[n]["precio_unidad"];
                objdatos["costo_producto"] = d("txt_costo_pr_" + consecutivo).value;
                objdatos["depreciacion"] = 0;
                objdatos["cantidad"] = glproductos_datos[n]["cantidad"];
                objdatos["cantidad_inv"] = 0;
                objdatos["impuestos"] = glproductos_datos[n]["valor_impuesto"];
                objdatos["subtotal"] = glproductos_datos[n]["sub_total"];
                objdatos["valor_total"] = glproductos_datos[n]["valor_total"];
                objdatos["consecutivo"] = glproductos_datos[n]["consecutivo"];

                objdatos["valor_impuesto_iva"] = glproductos_datos[n]["valor_impuesto_iva"];
                objdatos["valor_impuesto_no_iva"] = glproductos_datos[n]["valor_impuesto_no_iva"];
                objdatos["valor_ret_iva"] = glproductos_datos[n]["valor_ret_iva"];
                objdatos["valor_ret_no_iva"] = glproductos_datos[n]["valor_ret_no_iva"];
                objdatos["valor_retencion"] = glproductos_datos[n]["valor_retencion"];
                objdatos["valor_pago_abono_prod"] = glproductos_datos[n]["valor_pago_abono_prod"];
                objdatos["saldo"] = glproductos_datos[n]["saldo"];
                objdatos["porcentaje_pago_real"] = glproductos_datos[n]["porcentaje_pago_real"];
                objdatos["pago_real_prod"] = glproductos_datos[n]["pago_real_prod"];
                        
                arrproductos_datos[arrproductos_datos.length] = objdatos;
            }
        }
        else
        {
            //Es Producto existente con Inventario suficiente

            var objdatos = new Object();
            var dtv_prod = new vista(glrespuesta_1["productos"], "['serial_productosb']=='" + glproductos_datos[n]["serial_productos"] + "'", '', '');
            objdatos["serial_productos"] = dtv_prod[0]["serial_productosb"];
            serial_tipo_producto=dtv_prod[0]["serial_tipo_producto"]
            objdatos["serial_tipo_producto"] = serial_tipo_producto
            var dtvtipo_prod = new vista(glrespuesta_1["tipo_productos"], "['serial_tipo_producto']=='" + serial_tipo_producto + "'", '', '');
            objdatos["codigo_producto"] = dtvtipo_prod[0]["codigo"];
            objdatos["nombre_producto"] = "";
            objdatos["valor_producto"] = glproductos_datos[n]["precio_unidad"];
            objdatos["costo_producto"] = calculo_costo_producto(consecutivo);
            objdatos["depreciacion"] = dtv_prod[0]["depreciacion"];;
            objdatos["cantidad"] = glproductos_datos[n]["cantidad"];
            objdatos["cantidad_inv"] = glproductos_datos[n]["cantidad"];
            objdatos["impuestos"] = glproductos_datos[n]["valor_impuesto"];
            objdatos["subtotal"] = glproductos_datos[n]["sub_total"];
            objdatos["valor_total"] = glproductos_datos[n]["valor_total"];
            objdatos["consecutivo"] = glproductos_datos[n]["consecutivo"];

            objdatos["valor_impuesto_iva"] = glproductos_datos[n]["valor_impuesto_iva"];
            objdatos["valor_impuesto_no_iva"] = glproductos_datos[n]["valor_impuesto_no_iva"];
            objdatos["valor_ret_iva"] = glproductos_datos[n]["valor_ret_iva"];
            objdatos["valor_ret_no_iva"] = glproductos_datos[n]["valor_ret_no_iva"];
            objdatos["valor_retencion"] = glproductos_datos[n]["valor_retencion"];
            objdatos["valor_pago_abono_prod"] = glproductos_datos[n]["valor_pago_abono_prod"];
            objdatos["saldo"] = glproductos_datos[n]["saldo"];
            objdatos["porcentaje_pago_real"] = glproductos_datos[n]["porcentaje_pago_real"];
            objdatos["pago_real_prod"] = glproductos_datos[n]["pago_real_prod"];
                    
            arrproductos_datos[arrproductos_datos.length] = objdatos;
        }
        glespago = 0;
        if (dtvtipo_prod[0]["es_dinero"] == "1")
        {
            glespago = 1;
            ves_pago = 1;
        }
        n++;
    }

    //Inserta puc de la factura
    var arrcuentas_factura = new Array();

    var n = 0;
    while (n < arrproductos_datos.length)
    {
        var consecutivo = arrproductos_datos[n]["consecutivo"];
        var serial_productos = arrproductos_datos[n]["serial_productos"];
        var dtvproduc_datos = new vista(arrproductos_datos, "['consecutivo']=='" + consecutivo + "'", '');
        var costo = 0;
        var depreciacion = 0;
        if (dtvproduc_datos.length)
        {
            costo = dtvproduc_datos[0]["costo_producto"];
            depreciacion = dtvproduc_datos[0]["depreciacion"];
        }

        var serial_proceso = 0;
        var serial_tipo_producto = arrproductos_datos[n]["serial_tipo_producto"];
        var sub_total = arrproductos_datos[n]["subtotal"];
        var timpuesto = arrproductos_datos[n]["impuestos"];

        //glrespuesta_1["procesos"]
        //glprocesos
        var dtvproc = new vista(glprocesos, "['serial_accion']=='" + glserial_accion + "' && ['serial_tipo_producto']=='" + serial_tipo_producto + "'", '');
        if (dtvproc.length == 0)
        {
            var codigo = arrproductos_datos[n]["codigo_producto"];
            var dtvproc2 = new vista(glprocesos, "['serial_accion']=='" + glserial_accion + "' && ['codigo']=='" + codigo + "'", '');
            if (dtvproc2.length != 0) {
                serial_proceso = dtvproc2[0]["serial_procesosb"];
            }
        }
        else
        {
            serial_proceso = dtvproc[0]["serial_procesosb"];
        }
        var dtvimp = new vista(glproductos_impuestos, "['consecutivo']=='" + arrproductos_datos[n]["consecutivo"] + "'", '');

        var compro_suma_costo = "0";

        if (dtvimp.length == 1)
        {
            var serial_impuesto = dtvimp[0]["serial_impuesto"];
            if (serial_impuesto=="0")
                serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
            var dtvimp2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
            compro_suma_costo = dtvimp2[0]["compro_suma_costo"];
        }
        var tot_imp_compro_suma_costo=0;
        if (globjglconfiguracion["codigo"] == "GAS") {
            var im = 0;
            while (im < dtvimp.length) {
                var serial_impuesto = dtvimp[im]["serial_impuesto"];
                if (serial_impuesto == "0")
                    serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
                var dtvimp2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
                compro_suma_costo = dtvimp2[0]["compro_suma_costo"];

                if ((compro_suma_costo == "1") && (globjglconfiguracion["codigo"] == "GAS"))
                    tot_imp_compro_suma_costo = tot_imp_compro_suma_costo + parseFloat(dtvimp[im]["valor"]);
                im++;
            }
        }
        if (serial_proceso != 0)
        {
            var dtvproceso = new vista(glprocesos, "['serial_procesosb']=='" + serial_proceso + "'", '');
            var m = 0;
            while(m<dtvproceso.length)
            {
                var operacion = dtvproceso[m]["operacion"];

                var valor = 0;
                var objcuentasf = new Object();
                objcuentasf["serial_puc"] = dtvproceso[m]["serial_puc"];

                if ((globjglconfiguracion["codigo"] == "GAS"))
                    valor = parseFloat(sub_total) + tot_imp_compro_suma_costo;
                else
                    valor = sub_total;

                var result=eval(trim(operacion));

                objcuentasf["serial_contactob"] = glserial_contacto;
                objcuentasf["valor"] = result;
                objcuentasf["tipo"] = dtvproceso[m]["tipo"];
                objcuentasf["fecha"] = d("fecha_inicial_fact").value;
                objcuentasf["consecutivo"] = consecutivo;
                objcuentasf["serial_productosb"] = serial_productos;
                objcuentasf["operacion"] = operacion;
                objcuentasf["origen"] = 1;
                if (result>0)
                    arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                m++;
            }

        }

        n++;
    }
            

    var n = 0;
    while (n < glproductos_impuestos.length) {

        var serial_impuesto = glproductos_impuestos[n]["serial_impuesto"];
        if (serial_impuesto == "0")
            serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");
                
        var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
        var compro_suma_costo = dtvimp[0]["compro_suma_costo"];
        //compro_suma_costo para recordar, 
        //Esta variable significa: Si esta en 1, es que este impuesto se debe sumar al costo del producto, solo aplica en gastos
        var tipo = 1;
        if (globjglconfiguracion["codigo"] == "GAS")
        {
            tipo = 1;
        }
        else
        {
            tipo = 2;
        }
        var valor = 0;
        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = dtvimp[0]["serial_puc"];
        if ((compro_suma_costo=="1")&&(globjglconfiguracion["codigo"] == "GAS"))
            valor = "0";
        else
            valor = glproductos_impuestos[n]["valor"];

        objcuentasf["valor"] = valor;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("fecha_inicial_fact").value;
        objcuentasf["serial_contactob"] = dtvimp[0]["serial_contactob"];
        objcuentasf["consecutivo"] = glproductos_impuestos[n]["consecutivo_impuestos"];
        objcuentasf["origen"] = 2;

        if (valor>0)
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                
        n++;
    }
            
            
    var n = 0;
    while (n < glretenciones.length) {

        var serial_impuesto = glretenciones[n]["serial_impuesto"];

        var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
        var tipo = 1;
        var compro_suma_costo = dtvimp[0]["compro_suma_costo"];
        var valor = glretenciones[n]["valor"];

        var serial_puc = "";
        if (globjglconfiguracion["codigo"] == "GAS")
        {
            tipo = 2;
            serial_puc = dtvimp[0]["serial_puc_credito"];   
        }
        else {
            tipo = 1;
            serial_puc = dtvimp[0]["serial_puc"];
        }

        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = serial_puc;
        var valor = glretenciones[n]["valor"];
        objcuentasf["valor"] = valor;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("fecha_inicial_fact").value;
        objcuentasf["serial_contactob"] = dtvimp[0]["serial_contactob"];
        objcuentasf["consecutivo"] = glretenciones[n]["consecutivo_retencion"];
        objcuentasf["origen"] = 3;
        if (valor > 0)
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        n++;
    }        

    var vabono = parseFloat(d("txt_abono").value);

    var serial_forma_pago = d("drpformapago").options[d("drpformapago").selectedIndex].value;
    var dtv_fp = new vista(glrespuesta_1["formas_pago2"], "['serial_forma_pago']=='" + serial_forma_pago + "'", '', '');
    var vserial_puc2 = dtv_fp[0]["serial_puc"];
    var vserial_contacto = dtv_fp[0]["serial_contactob"];

    if (vserial_contacto == null)
        vserial_contacto = glserial_contacto;

    if (vserial_contacto == "")
        vserial_contacto = glserial_contacto;

    var tipo = 1;
    if (globjglconfiguracion["codigo"] == "GAS") {
        tipo = 2;
        vserial_puc2 = dtv_fp[0]["serial_puc_salida"];
    }
    else {
        tipo = 1;
        vserial_puc2 = dtv_fp[0]["serial_puc"];
    }
            
    var objcuentasf = new Object();
    objcuentasf["serial_puc"] = vserial_puc2;
    objcuentasf["valor"] = vabono;
    objcuentasf["tipo"] = tipo;
    objcuentasf["fecha"] = d("fecha_inicial_fact").value;
    objcuentasf["serial_contactob"] = vserial_contacto;
    objcuentasf["origen"] = 4;
    if (vabono > 0)
        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
            

    if (gl_total_saldo > 0)
    {
        /*
        if (globjglconfiguracion["codigo"] == "GAS") {


            var dtv_pro = new vista(glprocesos, "['tipo_proceso']=='" + "1" + "'", '', '');
            var serial_proceso = dtv_pro[0]["serial_procesosb"];
            var vserial_puc3 = dtv_pro[0]["serial_puc"];
            var tipo = dtv_pro[0]["tipo"];
            var valor = 0;
            valor = gl_total_saldo;
            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = vserial_puc3;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = tipo;
            objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        }
        else
        {
            var dtv_pro = new vista(glprocesos, "['tipo_proceso']=='" + "2" + "'", '', '');
            var serial_proceso = dtv_pro[0]["serial_procesosb"];
            var vserial_puc3 = dtv_pro[0]["serial_puc"];
            var tipo = dtv_pro[0]["tipo"];
            var valor = 0;
            valor = gl_total_saldo;
            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = vserial_puc3;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = tipo;
            objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
        }
        */

        var serial_accion_abono = 0;
        if(globjglconfiguracion["codigo"] == "GAS")
            serial_accion_abono=11;
        else
            serial_accion_abono=12;

        //Calcula la cuenta del abono
        var n = 0;
        while (n < arrproductos_datos.length) {
            var consecutivo = glproductos_datos[n]["consecutivo"];
            var serial_proceso = 0;
            var serial_tipo_producto = arrproductos_datos[n]["serial_tipo_producto"];
            var saldo = arrproductos_datos[n]["saldo"];

            var dtvproc = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['serial_tipo_producto']=='" + serial_tipo_producto + "'", '');
            if (dtvproc.length == 0) {
                var codigo = arrproductos_datos[n]["codigo_producto"];
                var dtvproc2 = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['codigo']=='" + codigo + "'", '');
                if (dtvproc2.length != 0) {
                    serial_proceso = dtvproc2[0]["serial_procesosb"];
                }
            }
            else {
                serial_proceso = dtvproc[0]["serial_procesosb"];
            }
    
            if (serial_proceso != 0) {
                var dtvproceso = new vista(glprocesos, "['serial_procesosb']=='" + serial_proceso + "'", '');
                var m = 0;
                while (m < dtvproceso.length) {
                    var operacion = dtvproceso[m]["operacion"];

                    var result = eval(trim(operacion));

                    var objcuentasf = new Object();
                    objcuentasf["serial_puc"] = dtvproceso[m]["serial_puc"];
                    objcuentasf["serial_contactob"] = glserial_contacto;
                    objcuentasf["valor"] = result;
                    objcuentasf["tipo"] = dtvproceso[m]["tipo"];
                    objcuentasf["fecha"] = d("fecha_inicial_fact").value;
                    objcuentasf["consecutivo"] = consecutivo;
                    objcuentasf["origen"] = 5;
                    objcuentasf["operacion"] = operacion;

                    if (result>0)
                        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                    m++;
                }

            }

            n++;
        }
    }

    var valor_tercero = parseFloat(d("txt_valor_tercero").value);
            
    if (valor_tercero > 0)
    {
        //puc_tercero

        var puc_tercero = glrespuesta_1["puc_tercero"][0]["serial_puc"];
        var caja = glrespuesta_1["puc_caja"][0]["serial_puc"];
        var puc_otros = glrespuesta_1["puc_otros"][0]["serial_puc"];

        if (globjglconfiguracion["codigo"] == "GAS") {

            var valor=0;
            valor = valor_tercero;

            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = puc_otros;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = 1;
            objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            objcuentasf["origen"] = 6;
            if (valor>0)
                arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

            //var objcuentasf = new Object();
            //objcuentasf["serial_puc"] = caja;
            //objcuentasf["valor"] = valor;
            //objcuentasf["tipo"] = 2;
            //objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            //objcuentasf["serial_contactob"] = glserial_contacto;
            //objcuentasf["origen"] = 6;
            //if (valor > 0)
            //    arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;


        }
        else {
            var valor = 0;
            valor = valor_tercero;

            //var objcuentasf = new Object();
            //objcuentasf["serial_puc"] = caja;
            //objcuentasf["valor"] = valor;
            //objcuentasf["tipo"] = 1;
            //objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            //objcuentasf["serial_contactob"] = glserial_contacto;
            //objcuentasf["origen"] = 6;
            //if (valor > 0)
            //    arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = puc_tercero;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = 2;
            objcuentasf["fecha"] = d("fecha_inicial_fact").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            objcuentasf["origen"] = 6;
            if (valor > 0)
                arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
        }


    }
            
    //d("txt_valor_tercero").value


    var arr_cuentas = new Array();
    var vpagada = 1;
    if (parseFloat(gl_total_saldo) > 0)
        vpagada = 0;

    var chk_auto = 0;
    if (d("chkdauto").checked == true)
        chk_auto = 1;

    var vauto_fact=0;
    if ((globjglconfiguracion["codigo"] == "ING") && (chk_auto == "1"))
    {
        vauto_fact = 1;
    }
    var arr_datos_generales = [{
        seguimiento: 0,
        serial_accion: glserial_accion,
        serial_sucb: d("drpnegocio").options[d("drpnegocio").selectedIndex].value,
        serial_contacto: glserial_contacto,
        nombre_contacto:d("txt_contactos_auto").value,
        total_factura: gl_total_factura,
        codigo_accion:globjglconfiguracion["codigo"],
        total_pago: gl_total_pago,
        abono: d("txt_abono").value,
        saldo: gl_total_saldo,
        fecha_factura: d("fecha_inicial_fact").value,
        fecha_vencimiento: d("fecha_venc_fact").value,
        fecha_utilizacion: d("fecha_utilizacion").value,
        forma_pago: d("drpformapago").options[d("drpformapago").selectedIndex].value,
        observaciones: d("txt_observaciones").value,
        flagmensaje_impuestos: glflagmensaje_impuestos,
        txt_numero_factura: d("txt_numero_factura").value,
        pagada: vpagada,
        concepto_pago_tercero: d("txt_pago_tercero").value,
        pago_tercero: d("txt_valor_tercero").value,
        auto: chk_auto,
        serial_prm: d("hddserial_prm").value,
        auto_fact: vauto_fact,
        es_pago: ves_pago

    }];

            
    var arr_envio = [arr_datos_generales, arrproductos_datos, glproductos_impuestos, glretenciones, arrcuentas_factura];
    call_sgu(guarda_factura_post, arr_envio, "guarda_factura_sp", "procesos");

    return false;

}

var glprocesos;
function fune_procesos()
{
    var objprocrep = new Object();
    var n = 0;
    var arrprocesos_g= new Array();
    while(n<glrespuesta_1["procesos"].length)
    {
        var obj1 = new Object();
        if (objprocrep[glrespuesta_1["procesos"][n]["serial_procesos_puc"]] == undefined) {
            objprocrep[glrespuesta_1["procesos"][n]["serial_procesos_puc"]] = "0";
            obj1["serial_procesosb"] = glrespuesta_1["procesos"][n]["serial_procesosb"];
            obj1["serial_puc"] = glrespuesta_1["procesos"][n]["serial_puc"];
            obj1["orden"] = glrespuesta_1["procesos"][n]["orden"];
            obj1["serial_tipopp"] = glrespuesta_1["procesos"][n]["serial_tipopp"];
            obj1["serial_accion"] = glrespuesta_1["procesos"][n]["serial_accion"];
            obj1["serial_tipo_producto"] = glrespuesta_1["procesos"][n]["serial_tipo_producto"];
            obj1["codigo"] = glrespuesta_1["procesos"][n]["codigo"];
            obj1["tipo"] = glrespuesta_1["procesos"][n]["tipo"];
            obj1["operacion"] = glrespuesta_1["procesos"][n]["operacion"];
            obj1["serial_procesos_puc"] = glrespuesta_1["procesos"][n]["serial_procesos_puc"];
            arrprocesos_g[arrprocesos_g.length] = obj1;
        }
        n++;
    }
    n = 0;
    while (n < glrespuesta_1["procesos9"].length) {
        var obj1 = new Object();
        if (objprocrep[glrespuesta_1["procesos9"][n]["serial_procesos_puc"]] == undefined) {
            objprocrep[glrespuesta_1["procesos9"][n]["serial_procesos_puc"]] = "0";
            obj1["serial_procesosb"] = glrespuesta_1["procesos9"][n]["serial_procesosb"];
            obj1["serial_puc"] = glrespuesta_1["procesos9"][n]["serial_puc"];
            obj1["orden"] = glrespuesta_1["procesos9"][n]["orden"];
            obj1["serial_tipopp"] = glrespuesta_1["procesos9"][n]["serial_tipopp"];
            obj1["serial_accion"] = glrespuesta_1["procesos9"][n]["serial_accion"];
            obj1["serial_tipo_producto"] = glrespuesta_1["procesos9"][n]["serial_tipo_producto"];
            obj1["codigo"] = glrespuesta_1["procesos9"][n]["codigo"];
            obj1["tipo"] = glrespuesta_1["procesos9"][n]["tipo"];
            obj1["operacion"] = glrespuesta_1["procesos9"][n]["operacion"];
            obj1["serial_procesos_puc"] = glrespuesta_1["procesos9"][n]["serial_procesos_puc"];
            arrprocesos_g[arrprocesos_g.length] = obj1;
        }
        n++;
    }
    glprocesos = arrprocesos_g;
}

function guarda_factura_post(respuesta)
{
    if (respuesta["respuesta"]["correcto"] == "1")
    {
          

        if (globjglconfiguracion["codigo"] == "GAS") {
            dhtmlx.alert({ title: "", type: "alert", text: "Se guardo la factura correctamente", callback: termino_fact });
            reinicia(respuesta);
        }
        else {
            if (glespago==0)
                dhtmlx.alert({ title: "", type: "alert", text: "Se guardo la factura correctamente con el numero: " + respuesta["respuesta"]["factura"], callback: termino_fact });
            else
                dhtmlx.alert({ title: "", type: "alert", text: "Se guardo el pago correctamente con el numero: " + respuesta["respuesta"]["factura"], callback: termino_fact });

            var ahora2 = new Date();
            d("ifra_rep_factura").src = "factura.aspx?c=" + ahora2.getMilliseconds();
            reinicia(respuesta);
            d("ifra_rep_factura").onload = function () {
                d("div_modal_pdf").style.display = "block";

            }
        }

    }
    else
    {
        var msj = "";
        switch(respuesta["respuesta"]["error_factura"])
        {
            case "1":
                msj="La cantidad de inventarios ha cambiado, por favor, Recargar la pagina"
                break;
        }
                
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "La factura NO se pudo registrar</br>" + msj });
    }

           
}

function termino_fact()
{

}
function clic_auto_chk()
{
    if (d("chkdauto").checked == true) {
        d("txt_numero_factura").style.display = "none";
        d("txt_numero_factura").value = "";
              
    }
    else {
        d("txt_numero_factura").style.display = "inline-block";
        d("txt_numero_factura").disabled = "";
    }
}

function consultar_abonos()
{
    d("div_modal_abonos").style.display = "block";
    return false;
}
var gl_total_saldo_nuevo = 0;
function cambia_abono_actual()
{
    var valabono = 0;
    if (trim(String(d("txt_abono_actual").value)) != "") {
        valabono = parseFloat(trim(String(d("txt_abono_actual").value)));
    }

    d("sp_total_saldo").innerText = parseFloat(gl_total_pago - parseFloat(valabono) - glabonocumulado).toFixed(0);
    gl_total_saldo_nuevo = gl_total_pago - parseFloat(valabono) - glabonocumulado ;

    return false;
}

function crear_abono()
{
    var msj = "";
    if (d("txt_abono_actual").value == "") {
        msj = msj + "Debe digitar el abono</br>";
        d("txt_abono_actual").style.borderColor = "red";
    }
    else {
        d("txt_abono_actual").style.borderColor = "";
    }


    if (d("txt_fecha_abono").value == "") {
        msj = msj + "Debe digitar la fecha del abono</br>";
        d("txt_fecha_abono").style.borderColor = "red";
    }
    else {
        var respb = esFechaValida(d("txt_fecha_abono").value);
        if (respb == false) {
            msj = msj + "La fecha del abono no tiene formato correcto</br>";
            d("txt_fecha_abono").style.borderColor = "red";
        }
        else {
            d("txt_fecha_abono").style.borderColor = "";
        }
    }
    if (msj = "")
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: msj });
    else
    {
        var arrcuentas_factura = new Array();
        var vabono = parseFloat(d("txt_abono_actual").value);

        var serial_forma_pago = d("drpformapago_abono").options[d("drpformapago_abono").selectedIndex].value;
        var dtv_fp = new vista(glrespuesta_1["formas_pago_abono"], "['serial_forma_pago']=='" + serial_forma_pago + "'", '', '');
        var vserial_puc2 = dtv_fp[0]["serial_puc"];
        var vserial_contactob = dtv_fp[0]["serial_contactob"];

        if (vserial_contactob == null)
            vserial_contactob = glserial_contacto;
        if (vserial_contactob == "")
            vserial_contactob = glserial_contacto;

        var tipo = 1;
        var tipo2 = 1;
        if (globjglconfiguracion["codigo"] == "GAS") {
            tipo = 2;
            tipo2 = 1;
            vserial_puc2 = dtv_fp[0]["serial_puc_salida"];
        }
        else {
            tipo = 1;
            tipo2 = 2;
            vserial_puc2 = dtv_fp[0]["serial_puc"];
        }

        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = vserial_puc2;
        objcuentasf["valor"] = vabono;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("txt_fecha_abono").value;
        objcuentasf["serial_contactob"] = vserial_contactob;
        objcuentasf["origen"] = 8;
        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        var vpagada = 0;
        if (gl_total_saldo_nuevo <= 0)
        {
            vpagada = 1;
        }


        //if (gl_total_saldo_nuevo > 0)
        var serial_accion_abono = 0;
        var tipo2=1;
        if (globjglconfiguracion["codigo"] == "GAS")
        {
            serial_accion_abono = 11;
            tipo2=1;
        }
        else
        {
            serial_accion_abono = 12;
            tipo2=2;
        }

        //Calcula la cuenta del abono
        var n = 0;
        while (n < glproductos_datos.length) {
            var consecutivo = glproductos_datos[n]["consecutivo"];
            var serial_productosb = glproductos_datos[n]["serial_productos"];
            var serial_proceso = 0;
            var serial_tipo_producto = glproductos_datos[n]["serial_tipo_producto"];
            var porcentaje_pago_real = parseFloat(glproductos_datos[n]["porcentaje_pago_real"]);

            var pago_real_prod = parseFloat(glproductos_datos[n]["pago_real_prod"]);
            var valor_pago_real = vabono * porcentaje_pago_real;
            var pago_acumulado = parseFloat(glproductos_datos[n]["pago_acumulado"]) + valor_pago_real;

            var saldo = 0;
            //saldo=pago_real_prod - pago_acumulado - valor_pago_real;
            saldo = valor_pago_real;//lo que realmente abona
                  
            var dtvproc = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['serial_tipo_producto']=='" + serial_tipo_producto + "'", '');
            if (dtvproc.length == 0) {
                var codigo = glproductos_datos[n]["codigo_producto"];
                var dtvproc2 = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['codigo']=='" + codigo + "'", '');
                if (dtvproc2.length != 0) {
                    serial_proceso = dtvproc2[0]["serial_procesosb"];
                }
            }
            else {
                serial_proceso = dtvproc[0]["serial_procesosb"];
            }

            if (serial_proceso != 0) {
                var dtvproceso = new vista(glprocesos, "['serial_procesosb']=='" + serial_proceso + "'", '');
                var m = 0;
                while (m < dtvproceso.length) {
                    var operacion = dtvproceso[m]["operacion"];

                    var result =  eval(trim(operacion));
                          
                    var tipo3;
                    if (dtvproceso[m]["tipo"] == "1")
                        tipo3 = "2";
                    else
                        tipo3 = "1";

                    var objcuentasf = new Object();
                    objcuentasf["serial_puc"] = dtvproceso[m]["serial_puc"];
                    objcuentasf["serial_contactob"] = glserial_contacto;
                    objcuentasf["valor"] = result;
                    objcuentasf["pago_acumulado"] = pago_acumulado;
                    objcuentasf["tipo"] = tipo3;
                    objcuentasf["fecha"] = d("txt_fecha_abono").value;
                    objcuentasf["consecutivo"] = consecutivo;
                    objcuentasf["origen"] = 7;
                    objcuentasf["serial_productosb"] = serial_productosb;
                    objcuentasf["operacion"] = operacion;

                    if (result > 0)
                        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                    m++;
                }

            }

            n++;
        }
                
        if (arrcuentas_factura.length > 1) {
            var arrdato_enviado = [
                {
                    abono_realizado: d("txt_abono_actual").value,
                    fecha_seguimiento: d("txt_fecha_abono").value,
                    saldo_anterior: gl_total_saldo,
                    saldo_nuevo: gl_total_saldo_nuevo,
                    observaciones: d("txt_observaciones").value,
                    si: d("hddsi").value,
                    pagada: vpagada,
                    serial_sucb: d("drpnegocio").options[d("drpnegocio").selectedIndex].value,
                    serial_prm: d("hddserial_prm").value,
                    serial_factura: glserial_factura,
                    serial_forma_pago: d("drpformapago_abono").options[d("drpformapago_abono").selectedIndex].value
                }
            ];
            call_sgu(guardar_abono_post, [arrdato_enviado, arrcuentas_factura], "guardar_seguimiento", "procesos");
        }
        else
        {
            dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "El abono NO se pudo registrar" });
        }
      
    }
    return false;
}

function guardar_abono_post(respuesta)
{
    if (respuesta["respuesta"]["correcto"] == "1") {
        dhtmlx.alert({ title: "", type: "alert", text: "Se guardo el abono correctamente", callback: termino_abono});
    }
    else
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "El abono NO se pudo registrar" });

}

function termino_abono()
{
    atras();
}

function reinicia(datos)
{
    glultimo_tipo_contacto = 0;
    glultimo_serial_contacto = 0;
    glflagmensaje_impuestos = 0;
          

    glproductos_impuestos = [
        {
            consecutivo_impuestos: 1,
            consecutivo: 1,
            serial_impuesto: 0,
            porcentaje: 0,
            valor: '0'
        }
    ];
    glretenciones = [
        {
            consecutivo_retencion: 1,
            serial_impuesto: 0,
            porcentaje: 0,
            valor: '0'
        }
    ];


    glresumen = [
        {
            consecutivo_resumen: 1,
            nombre: "<span id='sp_total_facturat' style='display:inline-block; width:180px'>" + globjglconfiguracion["total_factura"] + "</span>",
            detalle: "<span style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray'  id='sp_total_factura'>0</span>",
            valor: 0
        },
       {
           consecutivo_resumen: 2,
           nombre: "<span id='sp_tpagado' style='display:inline-block; width:180px'>Total Pagado</span>",
           detalle: "<span style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_pago'>0</span>",
           valor: 0
       },
       {
           consecutivo_resumen: 3,
           nombre: "<span id='sp_abonorealizado' style='display:inline-block; width:180px'>Abono Realizado</span>",
           detalle: "<input  onkeypress='return letraPresionada_punto(event, this)'   onkeyup='cambia_abono()'  onblur='cambia_abono()'   type='text' id='txt_abono' value='0' style=' margin-bottom:0px; width:90px;font-family:Tahoma; font-size:14px;color:gray' />",
           valor: 0
       }
    ];



    for (k in globjglconfiguracion) {
        if (d(k) != null)
            d(k).innerText = globjglconfiguracion[k];
    }

    msj_modo();
    d("txt_numero_factura").value = "";
    if (globjglconfiguracion["codigo"] == "GAS") {
        // d("chkdauto").style.display = "none";
        //d("lbldmemoria").style.display = "none";
        d("txt_numero_factura").disabled = "";
        d("lbldmemoria").style.display = "none";
        d("chkdauto").checked = true;
        d("txt_numero_factura").style.display = "inline-block";
                
    }
    else {
        //     d("chkdauto").style.display = "inline-block";
        //    d("lbldmemoria").style.display = "inline-block";
               
        d("lbldmemoria").style.display = "inline-block";
        d("chkdauto").checked = true;
        d("txt_numero_factura").style.display = "none";
    }


    var objresumen = new Object();
    objresumen["consecutivo_resumen"] = 6;
    objresumen["nombre"] = "<span style='display:inline-block; width:180px'>Saldo Pendiente</span>";
    objresumen["detalle"] = "<span  style='padding-left:9px; font-family:Tahoma; font-size:14px;color:gray' id='sp_total_saldo'>0</span>";
    objresumen["valor"] = "0";
    glresumen[glresumen.length] = objresumen;



    d("fecha_inicial_fact").value = d("hddfecha_actual").value;
    d("fecha_venc_fact").value = d("hddfecha_actual").value;
    d("fecha_utilizacion").value = d("hddfecha_actual").value;

    //  d("fecha_devolucion").value = d("hddfecha_actual").value;
    //var myCalendar = new dhtmlXCalendarObject(["fecha_inicial_fact", "fecha_venc_fact", "fecha_utilizacion"]);
    //   myCalendar.setDateFormat("%Y-%m-%d");
    //  myCalendar.hideTime();

          
    pinta_productos();
    retenciones_gw();
    //  call_sgu(carga_datos_post, [[{ codigo_accion: "CA" }]], "datos_basicos", "procesos");

    d("txt_pago_tercero").value = "";
    d("txt_valor_tercero").value = "0";
    resumen_gw();
    cambio_negocio();
    //clic_auto_chk();
    d("txt_observaciones").value = "";
    window.scrollTo(0, 0);

    if (datos != undefined) {
        if (datos["productos_nuevos"].length > 0) {
            var i = 0;
            while (i < datos["productos_nuevos"].length) {
                var consecutivo = datos["productos_nuevos"][i]["consecutivo"];
                var dtnombrep = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", '', '');

                if (dtnombrep.length > 0) {
                    var serial_productos = dtnombrep[0]["serial_productos"];
                    if (serial_productos == 0) {
                        glrespuesta_1["productos"][glrespuesta_1["productos"].length] = {
                            producto: datos["productos_nuevos"][i]["producto"],
                            serial_productosb: datos["productos_nuevos"][i]["serial_productosb"],
                            serial_tipo_producto: datos["productos_nuevos"][i]["serial_tipo_producto"],
                            nombre_tipop: datos["productos_nuevos"][i]["nombre_tipop"],
                            valor: datos["productos_nuevos"][i]["valor"],
                            costo: datos["productos_nuevos"][i]["costo"],
                            depreciacion: 0,
                            serial_sucb: datos["productos_nuevos"][i]["serial_sucb"]
                        };
                    }
                }

                i++;
            }
            pinta_productos();
        }
        if (datos["productos_act"].length > 0) {
            var obj1 = new Object();
            var i1 = 0;
            while (i1 < datos["productos_act"].length) {
                obj1[datos["productos_act"][i1]["serial_productosb"]] = datos["productos_act"][i1];
                i1++;
            }

            var j = 0;
            while (j < glrespuesta_1["productos"].length) {
                var serial_productosb = glrespuesta_1["productos"][j]["serial_productosb"];

                if (obj1[serial_productosb] != null) {
                    glrespuesta_1["productos"][j]["cantidad"] = obj1[serial_productosb]["cantidad"];
                    glrespuesta_1["productos"][j]["costo"] = obj1[serial_productosb]["costo"];
                    glrespuesta_1["productos"][j]["valor"] = obj1[serial_productosb]["valor"];
                    glrespuesta_1["productos"][j]["depreciacion"] = obj1[serial_productosb]["depreciacion"];
                    glrespuesta_1["productos"][j]["serial_sucb"] = obj1[serial_productosb]["serial_sucb"];
                }
                j++;
            }

            glproductos = glrespuesta_1["productos"];

        }
    }
    glproductos_datos = [{
        consecutivo: 1,
        serial_productos: 0,
        nombre_producto: "",
        precio_unidad: '0',
        cantidad: 1,
        sub_total: '0',
        valor_impuesto: '0',
        valor_total: '0',
        titulo_productos: "Productos Comprados"
    }];

    if (datos != undefined) {
        if (glserial_contacto == 0) {
            var vserial_sucb = d("drpnegocio").options[d("drpnegocio").selectedIndex].value;

            glrespuesta_1["contactos"][glrespuesta_1["contactos"].length] = {
                nombre: d("txt_contactos_auto").value,
                serial_contactob: datos["respuesta"]["serial_contacto"],
                serial_sucb: vserial_sucb
            };
            pinta_contactos_iconos();
            pinta_contactos_auto();
        }
    }
    glserial_contacto = 0;
    d("txt_contactos_auto").value = "";
    carga_datos_post(glrespuesta_1);
           
}

function atras()
{
    document.location.reload();
    return false;
}

function cuentas_contacto()
{
    var serial_contactob = -1;

    if (d("hddedita").value == "0") {
        var escr = String(trim(String(d("txt_contactos_auto").value)));
        var escr1 = escr.substr(0, 1).toUpperCase() + escr.substr(1).toLowerCase();
        var dtv2 = new vista(glcontactos, "['nombre']=='" + escr1 + "'", "", "");
        if (dtv2.length > 0) {
            serial_contactob = dtv2[0]["serial_contactob"];
        }
        else {
            var dtv3 = new vista(glcontactos, "['nombre']=='" + escr + "'", "", "");
            if (dtv3.length > 0) {
                serial_contactob = dtv3[0]["serial_contactob"];
            }
        }

        if (serial_contactob == -1) {
            if (trim(String(d("txt_contactos_auto").value)) != "") {
                serial_contactob = 0;
            }
        }
    }
    else
    {
        serial_contactob = glrespuesta_1["factura"][0]["serial_contactob"];
    }
    var msj = "";
    if ((serial_contactob == -1)||(serial_contactob==0))
    {
        msj = "Debe Seleccionar o escribir el contacto</br>";
        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text:msj
        });
    }
    else
    {
        var dtv_neg = new vista(glnegocios, "['serial_sucb']=='" + d("drpnegocio").options[d("drpnegocio").selectedIndex].value + "'", '', '');

        glreporte_cuentas = "div_cuentas_contacto_datos";
        gldetallado_cuentas = 2;
        d("ch_tpd_resumido").checked = "checked";

        consultar_cuentas(d("drpnegocio").options[d("drpnegocio").selectedIndex].value,
       "", "", dtv_neg[0]["serial_cierre"], serial_contactob);

        d("div_cuentas_contacto").style.display = "block";
        d("sp_contacto_seleccionado").innerText = d("txt_contactos_auto").value;
    }
            

    return false;
}

function clic_reporte_deudas(tipo)
{
    if (tipo == 1)
    {
        gldetallado_cuentas = 2;
        consulta_cuentas_post(glultima_respuesta);
    }
    else
    {
        gldetallado_cuentas = 3;
        consulta_cuentas_post(glultima_respuesta);
    }

}
var gltotal_devuelto_tercero = 0;
function carga_dato_devoluciones(arr_productosdatos, arr_impuestosdatos, arr_retenciones) {
    var arr_dev = new Array();
    var arr_imp = new Array();      
    var n = 0;
    var valor_total_devuelto = 0;
    while (n < arr_productosdatos.length) {
        var obj1 = new Object();
        obj1["consecutivo_devoluciones"] = n + 1;
        obj1["consecutivo"] = arr_productosdatos[n]["consecutivo"];
        obj1["consecutivo"] = arr_productosdatos[n]["consecutivo"];
        obj1["consecutivo_original"] = arr_productosdatos[n]["consecutivo_original"];

        var cantidad_devuelta = 0;
        var dtv_neg = new vista(glrespuesta_1["devoluciones_prod"], "['serial_productosb']=='" + arr_productosdatos[n]["serial_productos"] + "'", '', '');
        var m = 0;
        while (m < dtv_neg.length) {
            cantidad_devuelta = cantidad_devuelta + parseInt(dtv_neg["cantidad_devoluciones"]);
            m++;
        }
        obj1["cantidad_devuelta"] = cantidad_devuelta;
        obj1["cantidad_a_devolver"] = "0";
        var sub_total_devuelta = 0;
        sub_total_devuelta = cantidad_devuelta * parseFloat(arr_productosdatos[n]["precio_unidad"]);
        obj1["sub_total_devuelta"] = sub_total_devuelta.toFixed(0);
        obj1["sub_total_devolver"] = "0";

        var dtv_devimp = new vista(glrespuesta_1["devoluciones_imp"], "['serial_factura_detalle']=='" +
            arr_productosdatos[n]["consecutivo"] + "'", '', '');



        var valor_impuesto_devuelto = 0;
        var a = 0;
        while (a < dtv_devimp.length) {
            valor_impuesto_devuelto = valor_impuesto_devuelto + parseFloat(dtv_devimp[a]["valor_devoluciones"]);
            a++;
        }
        obj1["valor_impuesto_devuelto"] = valor_impuesto_devuelto;
        obj1["valor_impuesto_devolver"] = "0";

        obj1["valor_total_devuelto"] = (valor_impuesto_devuelto + sub_total_devuelta).toFixed(0);
        obj1["valor_total_devolver"] = "0";
        valor_total_devuelto = valor_total_devuelto + valor_impuesto_devuelto + sub_total_devuelta;
        var dtv_imp_prod= new vista(arr_impuestosdatos, "['consecutivo']=='" +
            arr_productosdatos[n]["consecutivo"] + "'", '', '');

        m = 0;
             
        while (m < dtv_imp_prod.length) {
            var obj2 = new Object();
            obj2["consecutivo_impuestos"] = dtv_imp_prod[m]["consecutivo_impuestos"];
            obj2["consecutivo"] = dtv_imp_prod[m]["consecutivo"];
            obj2["serial_impuesto"] = dtv_imp_prod[m]["serial_impuesto"];
            obj2["porcentaje"] = dtv_imp_prod[m]["porcentaje"];

            var dtv_devimp_serial = new vista(dtv_devimp, "['serial_impuesto']=='" +
          dtv_imp_prod[m]["serial_impuesto"] + "'", '', '');

            var valor_impuesto = 0;
            var imp = 0;
            while (imp < dtv_devimp_serial.length)
            {
                valor_impuesto = valor_impuesto + parseFloat(dtv_devimp_serial[imp]["valor_devoluciones"]);
                imp++;
            }
            obj2["valor_devuelto"] = valor_impuesto;
            obj2["valor_a_devolver"] = 0;

            arr_imp[arr_imp.length] = obj2;
            m++;
        }

              
        arr_dev[arr_dev.length] = obj1;
        n++;
    }
    var arr_ret = new Array();
    var j = 0;
    while (j < arr_retenciones.length)
    {
        var obj3 = new Object();
        obj3["consecutivo_retencion"] = arr_retenciones[j]["consecutivo_retencion"];
        obj3["serial_impuesto"] = arr_retenciones[j]["serial_impuesto"];
        obj3["porcentaje"] = arr_retenciones[j]["porcentaje"];
        obj3["valor"] = arr_retenciones[j]["valor"];

        var dtv_ret = new vista(glrespuesta_1["devoluciones_ret"], "['serial_impuesto']=='" +
      arr_retenciones[j]["serial_impuesto"] + "'", '', '');

        var valor_impuesto_total = 0;
        var j1 = 0;
        while (j1< dtv_ret.length)
        {
            valor_impuesto_total = valor_impuesto_total + parseFloat(dtv_ret[j1]["valor_devoluciones"]);
            j1++;
        }
        obj3["valor_devuelto"] = valor_impuesto_total.toFixed(0);
        obj3["valor_a_devolver"] = "0";

        arr_ret[arr_ret.length] = obj3;
        j++;
    }

    var valor_tercer_devuelto = 0;
    var valor_devuelto_real = 0;
    var n = 0;
    while (n < glrespuesta_1["devoluciones"].length) {
        valor_tercer_devuelto = valor_tercer_devuelto + parseFloat(glrespuesta_1["devoluciones"][n]["pago_tercero"]);
        valor_devuelto_real = valor_devuelto_real + arseFloat(glrespuesta_1["devoluciones"][n]["valor_devuelto_real"]);
        n++;
    }
    gl_total_devuelto_real = valor_devuelto_real;
    d("txt_valor_tercero_devoluciones").value = valor_tercer_devuelto.toFixed(0);
    gltercero_devuelto = valor_tercer_devuelto;
    glproductos_impuestos_devoluciones = arr_imp;
    glproductos_datos_devoluciones = arr_dev;
    glretenciones_devoluciones = arr_ret;
    gltotal_devuelto_tercero = valor_tercer_devuelto;
}
var gl_total_devuelto_real = 0;
var gltercero_devuelto = 0;
function calculo_devoluciones(nivel,componente,tipo_componente,campo,consecutivo_parametro)
{
    var id_componente = componente.id;
    var valor_componente = 0;

    if (tipo_componente == 1)
        valor_componente = d(id_componente).value;
    else if (tipo_componente == 2)
        valor_componente = d(id_componente).options(d(id_componente).selectedIndex).value;

    if(nivel==1)
    {
        //Cambia la cantidad de las devoluciones
        var n = 0;
        //Calcula por linea
        while(n<glproductos_datos_devoluciones.length)
        {
            if (glproductos_datos_devoluciones[n]["consecutivo"] == consecutivo_parametro)
            {
                var cantidad = valor_componente;
                glproductos_datos_devoluciones[n]["cantidad_a_devolver"] = cantidad;
                var dtv_dat = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo_parametro + "'", '', '');
                var valor_unitario=parseFloat(dtv_dat[0]["precio_unidad"]);
                var valor_impuesto = parseFloat(dtv_dat[0]["valor_impuesto"]);
                var cantidad_original = parseFloat(dtv_dat[0]["cantidad"]);
                       
                var dtv_imp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo_parametro + "'", "", "");
                var m = 0;
                var valor_total_impuesto = 0;
                while (m < dtv_imp.length) {
                    var consecutivo_impuestos = dtv_imp[m]["consecutivo_impuestos"];

                    var valor_imp = parseFloat(dtv_imp[m]["valor"]);
                    var valor_imp_xunidad = valor_imp / cantidad_original;
                    var imp_xdevlucion = cantidad * valor_imp_xunidad;
                    valor_total_impuesto = valor_total_impuesto + imp_xdevlucion;
                    var i = 0;
                    while (i < glproductos_impuestos_devoluciones.length)
                    {
                        if (glproductos_impuestos_devoluciones[i]["consecutivo_impuestos"] == consecutivo_impuestos)
                        {
                            glproductos_impuestos_devoluciones[i]["valor_a_devolver"] = imp_xdevlucion;
                        }

                        i++;
                    }

                    m++;
                }
                glproductos_datos_devoluciones[n]["valor_impuesto_devolver"] = valor_total_impuesto;
                d("txt_valor_por_devoluciones2_" + consecutivo_parametro).value = valor_total_impuesto.toFixed(0);
                        
                           
                var subtotal = valor_unitario * cantidad;
                d("sp_sub_devoluciones_" + consecutivo_parametro).innerText = subtotal.toFixed(0);
                glproductos_datos_devoluciones[n]["sub_total_devolver"] = subtotal;
                var total_a_devolver = valor_total_impuesto + subtotal;
                d("sp_total__devoluciones2_" + consecutivo_parametro).innerText = total_a_devolver.toFixed(0);
                glproductos_datos_devoluciones[n]["valor_total_devolver"] = total_a_devolver;
            }
            n++;
        }
    }//fin nivel 1

    if ((nivel == 2)||(nivel == 3)) {
        //Cambia Impuesto en la grilla de productos
        var consecutivo_impuestos = consecutivo_parametro;
        var consucutivo_padre = 0;
        var imp = 0;
        while (imp < glproductos_impuestos_devoluciones.length)
        {
            if (glproductos_impuestos_devoluciones[imp]["consecutivo_impuestos"] == consecutivo_impuestos)
            {
                glproductos_impuestos_devoluciones[imp]["valor_a_devolver"] = valor_componente;
                consucutivo_padre = glproductos_impuestos_devoluciones[imp]["consecutivo"];
            }
            imp++;
        }

        var imdt = 0;
        var total_impuesto = 0;
        var total_subtotal = 0;

        while(imdt<glproductos_datos_devoluciones.length)
        {
            var consecutivo = glproductos_datos_devoluciones[imdt]["consecutivo"];
            var total_imp = calcula_total_impuestos_devoluciones(consecutivo);
            var subtotal_consecutivo = parseFloat(glproductos_datos_devoluciones[imdt]["sub_total_devolver"]);
            total_impuesto = total_impuesto + total_imp;
            total_subtotal = total_subtotal + subtotal_consecutivo;
            var total_consecutivo = total_imp + subtotal_consecutivo;
            glproductos_datos_devoluciones[imdt]["valor_impuesto_devolver"] = total_imp;
            glproductos_datos_devoluciones[imdt]["valor_total_devolver"] = total_consecutivo;

            //  d("sp_valor_impuesto_total_devoluciones2" + consecutivo).value = total_impuesto.toFixed(0);
            //d("sp_sub_devoluciones_" + consecutivo).innerText = total_subtotal.toFixed(0);
            d("sp_total__devoluciones2_" + consecutivo).innerText = total_consecutivo.toFixed(0);

            if (nivel == 3)
            {
                d("txt_valor_por_devoluciones2_" + consecutivo).value = total_imp;
                if (consecutivo == consucutivo_padre)
                    d("sp_valor_impuesto_dev").innerText = total_imp.toFixed(0);
            }

            imdt++;
        }
                  
    }
    //if (nivel == 3) {
    //    var consecutivo_impuestos = consecutivo;
    //    //Cambia Impuesto en grilla propia
    //    alert(consecutivo_impuestos);
    //}

    //Calcula a nivel general
    if ((nivel == 1) || (nivel == 2) || (nivel == 3)) {
        n = 0;
        var sub_total_devuelta = 0;
        var sub_total_devolver = 0;

        var valor_impuesto_devuelto = 0;
        var valor_impuesto_devolver = 0;

        var valor_total_devuelto = 0;
        var valor_total_devolver = 0;
        while (n < glproductos_datos_devoluciones.length) {
            sub_total_devuelta = sub_total_devuelta + parseFloat(glproductos_datos_devoluciones[n]["sub_total_devuelta"]);
            sub_total_devolver = sub_total_devolver + parseFloat(glproductos_datos_devoluciones[n]["sub_total_devolver"]);
            valor_impuesto_devuelto = valor_impuesto_devuelto + parseFloat(glproductos_datos_devoluciones[n]["valor_impuesto_devuelto"]);
            valor_impuesto_devolver = valor_impuesto_devolver + parseFloat(glproductos_datos_devoluciones[n]["valor_impuesto_devolver"]);
            valor_total_devuelto = valor_total_devuelto + parseFloat(glproductos_datos_devoluciones[n]["valor_total_devuelto"]);
            valor_total_devolver = valor_total_devolver + parseFloat(glproductos_datos_devoluciones[n]["valor_total_devolver"]);
            n++;
        }

        d("sp_valor_producto_total_devoluciones").innerText = sub_total_devuelta.toFixed(0);
        d("sp_valor_producto_total_devoluciones2").innerText = sub_total_devolver.toFixed(0);
        d("sp_valor_impuesto_total_devoluciones").innerText = valor_impuesto_devuelto.toFixed(0);
        d("sp_valor_impuesto_total_devoluciones2").innerText = valor_impuesto_devolver.toFixed(0);
        d("sp_valor_total_total_devoluciones").innerText = valor_total_devuelto.toFixed(0);
        d("sp_valor_total_total_devoluciones2").innerText = valor_total_devolver.toFixed(0);
        glsubtotal_devolver = valor_total_devolver;



        var arr_devt = new Array();
        //Calcula las retenciones
        var n = 0;
        while (n < glproductos_datos.length) {
            var consecutivo = glproductos_datos[n]["consecutivo"];
            var cantidad_inicial = glproductos_datos[n]["cantidad"];

            var dtv_dev = new vista(glproductos_datos_devoluciones, "['consecutivo']=='" + consecutivo + "'", "", "");
            var cantidad_a_devolver = dtv_dev[0]["cantidad_a_devolver"];

            var porce_dev = 0;
            if (cantidad_inicial != 0)
                porce_dev = cantidad_a_devolver / cantidad_inicial;

            var m = 0;
            while (m < glretenciones.length) {
                var serial_impuesto_ret = glretenciones[m]["serial_impuesto"];
                var consecutivo_retencion = glretenciones[m]["consecutivo_retencion"];

                var dtv1 = new vista(glretenciones_xprod, "['consecutivo']=='" + consecutivo + "'", "", "");
                var dtv2 = new vista(dtv1, "['consecutivo_retencion']=='" + consecutivo_retencion + "'", "", "");
                var valor_a_devolver = 0;
                if (dtv2.length > 0) {
                    valor_a_devolver = porce_dev * parseFloat(dtv2[0]["valor"]);
                }

                var objdevr = new Object();
                objdevr["consecutivo"] = consecutivo;
                objdevr["consecutivo_retencion"] = consecutivo_retencion;
                objdevr["serial_impuesto_ret"] = serial_impuesto_ret;
                objdevr["valor"] = valor_a_devolver;
                arr_devt[arr_devt.length] = objdevr;

                m++;
            }

            n++;
        }
        glretenciones_xprod_devoluciones = arr_devt;

        var valor_a_devolver_ret = 0;
        var valor_devuelto_ret = 0;
        var n = 0;
        while (n < glretenciones_devoluciones.length) {
            var consecutivo_retencion = glretenciones[n]["consecutivo_retencion"];
            var serial_impuesto_ret = glretenciones[n]["serial_impuesto"];
            var dtv1 = new vista(glretenciones_xprod_devoluciones, "['consecutivo_retencion']=='" + consecutivo_retencion + "'", "", "");
            var valor_ret = 0;
            var m = 0;
            while (m < dtv1.length) {
                valor_ret = valor_ret + parseFloat(dtv1[m]["valor"]);
                m++;
            }
            valor_devuelto_ret = valor_devuelto_ret + parseFloat(glretenciones_devoluciones[n]["valor_devuelto"]);
            valor_a_devolver_ret = valor_a_devolver_ret + valor_ret;
            glretenciones_devoluciones[n]["valor_a_devolver"] = valor_ret;
            d("txt_valor_r2_devoluciones2_" + consecutivo_retencion).value = valor_ret.toFixed(0);
            n++;
        }

        d("sp_valor_t_retencion_devoluciones").innerText = valor_devuelto_ret.toFixed(0);
        d("sp_valor_t_retencion_devoluciones2").innerText = valor_a_devolver_ret.toFixed(0);


    }
    if ((nivel == 4)||(nivel == 5))
    {
        var valor_a_devolver_ret = 0;
        var valor_devuelto_ret = 0;
        var consecutivo_retencion = consecutivo_parametro;
        var n = 0;
        while (n < glretenciones_devoluciones.length) {
            if (glretenciones[n]["consecutivo_retencion"] == consecutivo_retencion)
            {
                glretenciones_devoluciones[n]["valor_a_devolver"] = valor_componente;
            }
            valor_a_devolver_ret = valor_a_devolver_ret + parseFloat(glretenciones_devoluciones[n]["valor_a_devolver"]);
            valor_devuelto_ret = valor_devuelto_ret + parseFloat(glretenciones_devoluciones[n]["valor_devuelto"]);
            n++;
        }
        d("sp_valor_t_retencion_devoluciones2").innerText = valor_a_devolver_ret.toFixed(0);
        n = 0;
        var valor_total_devolver = 0;
        var valor_total_devuelto = 0;
        while (n < glproductos_datos_devoluciones.length) {
            valor_total_devolver = valor_total_devolver + parseFloat(glproductos_datos_devoluciones[n]["valor_total_devolver"]);
            valor_total_devuelto = valor_total_devuelto + parseFloat(glproductos_datos_devoluciones[n]["valor_total_devuelto"]);
            n++;
        }
    }
    var porce_tercer = 0;
    var pago_tercero_original = 0;
    var pago_tercero_devolver = 0;
    if ((nivel == 1) || (nivel == 2) || (nivel == 3) || (nivel == 4)) {
                  
        porce_tercer = valor_total_devolver / gl_total_factura;
        pago_tercero_original = parseFloat(glrespuesta_1["factura"][0]["valor_pago_tercero"]);
        pago_tercero_devolver = pago_tercero_original * porce_tercer;
        d("txt_valor_tercero_devoluciones2").value = pago_tercero_devolver.toFixed(0);
    }
    else if(nivel==5)
    {
        pago_tercero_devolver = parseFloat(d("txt_valor_tercero_devoluciones2").value);
    }
    //var valor_devolucion_total = total_devuelto + total_a_devolver + pago_tercero_devolver + gltotal_devuelto_tercero;
                
    // var valor_a_devolver = total_a_devolver + pago_tercero_devolver;
    // var porce_dev = valor_total_devolver / gl_total_pago;

    var total_devuelto = valor_total_devuelto - valor_devuelto_ret + gltercero_devuelto;
    var total_a_devolver = valor_total_devolver - valor_a_devolver_ret + pago_tercero_devolver;

    d("sp_valor_devuelto").innerText = total_devuelto.toFixed(0);
    d("sp_valor_a_devolver").innerText = total_a_devolver.toFixed(0);

    var porce_abono = glabonocumulado / gl_total_pago;
    var valor_devolver_real = porce_abono * total_a_devolver;
    d("sp_real_valor_a_devolver").innerText = valor_devolver_real.toFixed(0);
    glvalor_devolver = valor_devolver_real;

    //alert(gl_total_saldo_nuevo);
    var saldo_nuevo = 0;
    saldo_nuevo =
        parseFloat(glrespuesta_1["factura"][0]["total_pagado"]) -
        total_a_devolver -
        glabonocumulado + gl_total_devuelto_real + valor_devolver_real;
    gl_nuevo_saldo_con_devolucion = saldo_nuevo;
    d("sp_total_saldo_devolucion").innerText = saldo_nuevo.toFixed(0);

    gl_dif_saldos_devoluciones = gl_total_saldo_nuevo - saldo_nuevo;
   // sp_total_saldo
  //  glsubtotal_devolver
    //gl_total_pago
    //  var valor_devol_total=
    // sp_real_valor_a_devolver
    //glabonocumulado
    //   gl_total_saldo_nuevo
    //d("txt_valor_r2_devoluciones2_" + consecutivo_retencion).value = valor_retencion;
}
var gl_nuevo_saldo_con_devolucion = 0;
var gl_dif_saldos_devoluciones = 0;
var glvalor_devolver = 0;
var glsubtotal_devolver = 0;
function calcula_total_impuestos_devoluciones(consecutivo)
{
    var imp_consecutivo = 0;
    var dtv_imp = new vista(glproductos_impuestos_devoluciones, "['consecutivo']=='" + consecutivo + "'", "", "");
    var m = 0;
    while(m<dtv_imp.length)
    {
        imp_consecutivo = imp_consecutivo + parseFloat(dtv_imp[m]["valor_a_devolver"]);
        m++;
    }
    return imp_consecutivo;
}
function calcula_retenciones_prod()
{

    var arrretprod=new Array();
    //arrretprod {consecutivo,serial_impuesto_ret,valor}

    //Calcular el total del iva de los productos
    //Calcular el total del reteiva de los productos

    var total_iva = calculo_total_iva();
    var total_reteiva = calculo_total_reteiva();
    var total_subtotal = calculo_subtotal();
    var total_retencion_noiva = calculo_total_retencion();

    var n = 0;
    while(n<glproductos_datos.length)
    {
        var serial_productosb = glproductos_datos[n]["serial_productos"];
        var consecutivo = glproductos_datos[n]["consecutivo"];

        var dtv_imp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");
        var iva_prod=0;
        var immpd=0;
        while(immpd<dtv_imp.length)
        {
            var serial_impuesto = dtv_imp[immpd]["serial_impuesto"];
            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");
            if(dtv_imp_det[0]["codigo"]=="IVA")
            {
                iva_prod = iva_prod + parseFloat(dtv_imp[immpd]["valor"]);
            }
            immpd++;
        }
        var valor_subtotal = parseFloat(glproductos_datos[n]["sub_total"]);
        var ret=0;
        while(ret<glretenciones.length)
        {
            var consecutivo_retencion = glretenciones[ret]["consecutivo_retencion"];
            var serial_impuesto_ret = glretenciones[ret]["serial_impuesto"];
            var valor_ret = glretenciones[ret]["valor"];
            var valor_retencion = 0;
            if(iva_prod>0)
            {
                var porce_iva_total = 0;
                if (total_iva!=0)
                    porce_iva_total = iva_prod / total_iva;

                var dtv_imp_det2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto_ret + "'", "", "");
                if(dtv_imp_det2[0]["codigo"]=="IVA")
                {
                    //Tiene reteiva
                    var porce_re = 0;
                    if (total_reteiva!=0)
                        porce_re = valor_ret / total_reteiva;

                    valor_retencion = valor_ret * porce_iva_total;
                }
                else
                {
                    var porce_re = 0;
                    if (total_retencion_noiva != 0)
                        porce_re = valor_ret / total_retencion_noiva;

                    var porce_sub_total = 0;
                    if (total_subtotal != 0)
                        porce_sub_total = valor_subtotal / total_subtotal;

                    valor_retencion = valor_ret * porce_sub_total;


                    //Es retencion al subtotal
                            
                }
                var obj1 = new Object();
                obj1["consecutivo"] = consecutivo;
                obj1["consecutivo_retencion"] = consecutivo_retencion;
                obj1["serial_impuesto_ret"] = serial_impuesto_ret;
                obj1["valor"] = valor_retencion;
                arrretprod[arrretprod.length] = obj1;
            }
            ret++;
        }
   
               
               
                 
        n++;
    }

    return arrretprod;
}
function calculo_subtotal()
{
    var total_subtotal = 0;
    var n = 0;
    while (n < glproductos_datos.length) {
                    
        total_subtotal = total_subtotal + parseFloat(glproductos_datos[n]["sub_total"]);
        n++;
    }
    return total_subtotal;
}
function calculo_total_iva () {
    var total_iva = 0;
    var n = 0;
    while (n < glproductos_datos.length) {
        var serial_productosb = glproductos_datos[n]["serial_productos"];
        var consecutivo = glproductos_datos[n]["consecutivo"];

        var dtv_imp = new vista(glproductos_impuestos, "['consecutivo']=='" + consecutivo + "'", "", "");
        var consecutivo_con_iva = 0;
        var immpd = 0;
        while (immpd < dtv_imp.length) {
            var serial_impuesto = dtv_imp[immpd]["serial_impuesto"];
            var dtv_imp_det = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", "", "");
            if (dtv_imp_det[0]["codigo"] == "IVA") {
                total_iva = total_iva + parseFloat(dtv_imp[immpd]["valor"]);
            }
            immpd++;
        }
        n++;
    }
    return total_iva;
}
function calculo_total_reteiva() {

    var total_reteiva = 0;
    var ret = 0;
    while (ret < glretenciones.length) {
        var serial_impuesto_ret = glretenciones[ret]["serial_impuesto"];
        var dtv_imp_det2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto_ret + "'", "", "");
        if (dtv_imp_det2[0]["codigo"] == "IVA") {
            total_reteiva = total_reteiva + parseFloat(glretenciones[ret]["valor"]);
        }
                
        ret++;
    }
    return total_reteiva;
}
function calculo_total_retencion() {
    var total_retencion = 0;
    var n = 0;
    while (n < glretenciones.length) {
        var serial_impuesto_ret = glretenciones[n]["serial_impuesto"];
        var dtv_imp_det2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto_ret + "'", "", "");
        if (dtv_imp_det2[0]["codigo"] != "IVA") {
            total_retencion = total_retencion + parseFloat(glretenciones[n]["valor"])
        }
        n++;
    }
    return total_retencion;
}

     
function crear_devolucion()
{
    d("fecha_devolucion").style.borderColor = "";
    d("sp_real_valor_a_devolver").style.borderColor = "";
          
    var msj = "";
    if (d("fecha_devolucion").value == "")
    {
        d("fecha_devolucion").style.borderColor = "red";
        msj = "Debe digitar la fecha de devolución</br>";
    }
    if (esFechaValida(d("fecha_devolucion").value) == false)
    {
        d("fecha_devolucion").style.borderColor = "red";
        msj = msj+ "La fecha de devolución no esta en un formato correcto";
    }
    //if (d("sp_real_valor_a_devolver").value == "")
    //{
    //    d("sp_real_valor_a_devolver").style.borderColor = "red";
    //    msj = msj + "Debe digitar el valor de la devolución</br>";
    //}
    if (msj != "") {


        dhtmlx.alert({
            title: "Revisar por favor",
            type: "alert-error",
            text: msj
        });

    }
    else
        crear_devolucion_def();
    return false;
}

function crear_devolucion_def() {
    var ves_pago = 0;

    calcula_valor_con_retenciones_valor_ad();
    d("div_tipo_prod").style.display = "none";
    var arrproductos_datos = new Array();

    //Arma productos de la factura para insertar
  
    //Inserta puc de la factura
    var arrcuentas_factura = new Array();
    var arrproductos_datos = new Array();

    var n = 0;
    while (n < glproductos_datos_devoluciones.length) {


        var consecutivo = glproductos_datos_devoluciones[n]["consecutivo"];//consecutivo es serial_factura_detalle
        var consecutivo_original = glproductos_datos_devoluciones[n]["consecutivo_original"];
        //consecutivo_original es consecutivo de creacion factura
         var serial_productos = glproductos_datos_devoluciones[n]["serial_productos"];
         var sub_total = glproductos_datos_devoluciones[n]["sub_total_devolver"];
         var dtvproduc_datos = new vista(glrespuesta_1["productos"], "['serial_productos']=='" + serial_productos + "'", '');
         var costo = 0;
         costo = glproductos_datos_devoluciones[n]["costo_producto"];

         var depreciacion = 0;
         if (dtvproduc_datos.length) {
             depreciacion = dtvproduc_datos[0]["depreciacion"];
         }


        //glrespuesta_1["procesos"]
        //glprocesos

         var dtvimp = new vista(glproductos_impuestos_devoluciones, "['consecutivo']=='" + consecutivo + "'", '');
        var compro_suma_costo = "0";
        
        var tot_imp_compro_suma_costo = 0;
        if (globjglconfiguracion["codigo"] == "GAS")
        {
            var im = 0;
            while (im < dtvimp.length) {
                var serial_impuesto = dtvimp[im]["serial_impuesto"];
                if (serial_impuesto == "0")
                    serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");//Si no tiene impuesto le asigna el IVA por defecto

                var dtvimp2 = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
                compro_suma_costo = dtvimp2[0]["compro_suma_costo"];

                if (compro_suma_costo == "1")
                    tot_imp_compro_suma_costo = tot_imp_compro_suma_costo + parseFloat(dtvimp[im]["valor_a_devolver"]);
                im++;
            }
        }


         var dtvcuentas_pro = new vista(glrespuesta_1["cuentas"], "['consecutivo']=='" + consecutivo_original + "' && ['origen']=='1'", '');

      
         
            var m = 0;
            while (m < dtvcuentas_pro.length) {
                var operacion = dtvcuentas_pro[m]["operacion"];

                var valor = 0;
                var objcuentasf = new Object();

                var serial_puc = "";
                if (dtvcuentas_pro[m]["padre"] != "4")
                    serial_puc = dtvcuentas_pro[m]["serial_puc"];
                else
                    serial_puc = glrespuesta_1["cuenta_devolucion"][0]["serial_puc"];

                objcuentasf["serial_puc"] = serial_puc;

                if ((globjglconfiguracion["codigo"] == "GAS"))
                    valor = parseFloat(sub_total) + tot_imp_compro_suma_costo;
                else
                    valor = sub_total;

                var result = eval(trim(operacion));

                var tipo3 = "";
                if (dtvcuentas_pro[m]["tipo"] == "1")
                    tipo3 = 2;
                else
                    tipo3 = 1;

                objcuentasf["serial_contactob"] = glserial_contacto;
                objcuentasf["valor"] = result;
                objcuentasf["tipo"] = tipo3;
                objcuentasf["fecha"] = d("fecha_devolucion").value;
                objcuentasf["consecutivo"] = consecutivo;
                objcuentasf["serial_productosb"] = serial_productos;
                objcuentasf["origen"] = 10;
                if (result > 0)
                    arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                m++;
            }

        
            var objdatos = new Object();

            objdatos["serial_factura_detalle"] = consecutivo;
            objdatos["cantidad"] = glproductos_datos_devoluciones[n]["cantidad_a_devolver"];
            objdatos["impuestos"] = glproductos_datos_devoluciones[n]["valor_impuesto_devolver"];
            objdatos["valor_total"] = glproductos_datos_devoluciones[n]["valor_total_devolver"];
            objdatos["subtotal"] = glproductos_datos_devoluciones[n]["sub_total_devolver"];
            objdatos["consecutivo"] = consecutivo_original;
            arrproductos_datos[arrproductos_datos.length] = objdatos;

        n++;
    }


    var n = 0;
    while (n < glproductos_impuestos_devoluciones.length) {

        var serial_impuesto = glproductos_impuestos_devoluciones[n]["serial_impuesto"];
        if (serial_impuesto == "0")
            serial_impuesto = calcula_df(glrespuesta_1["impuestos"], "IVA");

        var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
        var compro_suma_costo = dtvimp[0]["compro_suma_costo"];
        //compro_suma_costo para recordar, 
        //Esta variable significa: Si esta en 1, es que este impuesto se debe sumar al costo del producto, solo aplica en gastos
        var tipo = 1;
        if (globjglconfiguracion["codigo"] == "GAS") {
            tipo = 2;
        }
        else {
            tipo = 1;
        }
        var valor = 0;
        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = dtvimp[0]["serial_puc"];
        if ((compro_suma_costo == "1") && (globjglconfiguracion["codigo"] == "GAS"))
            valor = "0";
        else
            valor = glproductos_impuestos_devoluciones[n]["valor_a_devolver"];

        objcuentasf["valor"] = valor;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("fecha_devolucion").value;
        objcuentasf["serial_contactob"] = dtvimp[0]["serial_contactob"];
        objcuentasf["consecutivo"] = glproductos_impuestos_devoluciones[n]["consecutivo_impuestos"];
        objcuentasf["origen"] = 11;

        if (valor > 0)
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        n++;
    }


    var n = 0;
    while (n < glretenciones_devoluciones.length) {

        var serial_impuesto = glretenciones_devoluciones[n]["serial_impuesto"];

        var dtvimp = new vista(glrespuesta_1["impuestos"], "['serial_impuesto']=='" + serial_impuesto + "'", '');
        var tipo = 1;
        var compro_suma_costo = dtvimp[0]["compro_suma_costo"];
        var valor = glretenciones_devoluciones[n]["valor_a_devolver"];

        var serial_puc = "";
        if (globjglconfiguracion["codigo"] == "GAS") {
            tipo = 1;
            serial_puc = dtvimp[0]["serial_puc_credito"];
        }
        else {
            tipo = 2;
            serial_puc = dtvimp[0]["serial_puc"];
        }

        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = serial_puc;
        var valor = glretenciones_devoluciones[n]["valor_a_devolver"];
        objcuentasf["valor"] = valor;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("fecha_devolucion").value;
        objcuentasf["serial_contactob"] = dtvimp[0]["serial_contactob"];
        objcuentasf["consecutivo"] = glretenciones_devoluciones[n]["consecutivo_retencion"];
        objcuentasf["origen"] =12;
        if (valor > 0)
            arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        n++;
    }

   
        var valor_devolver = glvalor_devolver;

        var vserial_forma_pago = d("drpformapago_devolucion").options[d("drpformapago_devolucion").selectedIndex].value;
        var dtv_fp = new vista(glrespuesta_1["formas_pago_abono"], "['serial_forma_pago']=='" + vserial_forma_pago + "'", '', '');
        var vserial_puc2 = dtv_fp[0]["serial_puc"];
        var vserial_contactob = dtv_fp[0]["serial_contactob"];

        if (vserial_contactob == null)
            vserial_contactob = glserial_contacto;
        if (vserial_contactob == "")
            vserial_contactob = glserial_contacto;

        var tipo = 1;
        if (globjglconfiguracion["codigo"] == "GAS") {
            tipo =1;
            vserial_puc2 = dtv_fp[0]["serial_puc_salida"];
        }
        else {
            tipo = 2;
            vserial_puc2 = dtv_fp[0]["serial_puc"];
        }

        var objcuentasf = new Object();
        objcuentasf["serial_puc"] = vserial_puc2;
        objcuentasf["valor"] = valor_devolver;
        objcuentasf["tipo"] = tipo;
        objcuentasf["fecha"] = d("fecha_devolucion").value;
        objcuentasf["serial_contactob"] = vserial_contactob;
        objcuentasf["origen"] = 13;
        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;


       //Calcula las cuentas de la devolución de los abonos
        var n = 0;
        while (n < glproductos_datos_devoluciones.length) {
            var consecutivo = glproductos_datos_devoluciones[n]["consecutivo"];
            var serial_productosb = glproductos_datos_devoluciones[n]["serial_productos"];
            var serial_proceso = 0;

            var dtv_pd = new vista(glproductos_datos, "['consecutivo']=='" + consecutivo + "'", '', '');

            var serial_tipo_producto = dtv_pd[0]["serial_tipo_producto"];
            var porcentaje_pago_real = parseFloat(dtv_pd[0]["porcentaje_pago_real"]);

            var pago_real_prod = parseFloat(dtv_pd[0]["pago_real_prod"]);
            var valor_pago_real = gl_dif_saldos_devoluciones * porcentaje_pago_real;
            var pago_acumulado = parseFloat(dtv_pd[0]["pago_acumulado"]) + valor_pago_real;

            var saldo = 0;
            //saldo=pago_real_prod - pago_acumulado - valor_pago_real;
            saldo = valor_pago_real;//lo que realmente abona

            var serial_accion_abono = 0;
            var tipo2 = 1;
            if (globjglconfiguracion["codigo"] == "GAS") {
                serial_accion_abono = 11;
                tipo2 = 1;
            }
            else {
                serial_accion_abono = 12;
                tipo2 = 2;
            }

            var dtvproc = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['serial_tipo_producto']=='" + serial_tipo_producto + "'", '');
            if (dtvproc.length == 0) {
                var codigo = dtv_pd[0]["codigo_producto"];
                var dtvproc2 = new vista(glprocesos, "['serial_accion']=='" + serial_accion_abono + "' && ['codigo']=='" + codigo + "'", '');
                if (dtvproc2.length != 0) {
                    serial_proceso = dtvproc2[0]["serial_procesosb"];
                }
            }
            else {
                serial_proceso = dtvproc[0]["serial_procesosb"];
            }

            if (serial_proceso != 0) {
                var dtvproceso = new vista(glprocesos, "['serial_procesosb']=='" + serial_proceso + "'", '');
                var m = 0;
                while (m < dtvproceso.length) {
                    var operacion = dtvproceso[m]["operacion"];

                    var result = eval(trim(operacion));

                    var tipo3;
                    if (dtvproceso[m]["tipo"] == "1")
                        tipo3 = "2";
                    else
                        tipo3 = "1";

                    var objcuentasf = new Object();
                    objcuentasf["serial_puc"] = dtvproceso[m]["serial_puc"];
                    objcuentasf["serial_contactob"] = glserial_contacto;
                    objcuentasf["valor"] = result;
                    objcuentasf["pago_acumulado"] = pago_acumulado;
                    objcuentasf["tipo"] = tipo3;
                    objcuentasf["fecha"] = d("fecha_devolucion").value;
                    objcuentasf["consecutivo"] = consecutivo;
                    objcuentasf["origen"] = 14;
                    objcuentasf["serial_productosb"] = serial_productosb;
                    objcuentasf["operacion"] = operacion;

                    if (result > 0)
                        arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
                    m++;
                }

            }

            n++;
        }


        var valor_tercero = parseFloat(d("txt_valor_tercero_devoluciones2").value);
    

    if (valor_tercero > 0) {
        //puc_tercero

        var puc_tercero = glrespuesta_1["puc_tercero"][0]["serial_puc"];
        var caja = glrespuesta_1["puc_caja"][0]["serial_puc"];
        var puc_otros = glrespuesta_1["puc_otros"][0]["serial_puc"];

        if (globjglconfiguracion["codigo"] == "GAS") {

            var valor = 0;
            valor = valor_tercero;

            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = puc_otros;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = 2;
            objcuentasf["fecha"] = d("fecha_devolucion").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            objcuentasf["origen"] =15;
            if (valor > 0)
                arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;

        }
        else {
            var valor = 0;
            valor = valor_tercero;


            var objcuentasf = new Object();
            objcuentasf["serial_puc"] = puc_tercero;
            objcuentasf["valor"] = valor;
            objcuentasf["tipo"] = 1;
            objcuentasf["fecha"] = d("fecha_devolucion").value;
            objcuentasf["serial_contactob"] = glserial_contacto;
            objcuentasf["origen"] = 15;
            if (valor > 0)
                arrcuentas_factura[arrcuentas_factura.length] = objcuentasf;
        }
    }

    //d("txt_valor_tercero").value


    var arr_cuentas = new Array();
    var vpagada = 1;
    if (parseFloat(gl_nuevo_saldo_con_devolucion) > 0)
        vpagada = 0;
    
    var arr_datos_generales = [{
        serial_factura: glserial_factura,
        serial_forma_pago: vserial_forma_pago,
        fecha_devolucion: d("fecha_devolucion").value,
        serial_prm: d("hddserial_prm").value,
        observaciones: d("txt_observaciones").value,
        pago_tercero: d("txt_valor_tercero_devoluciones2").value,
        valor_devuelto_real: glvalor_devolver,
        pagada: vpagada,
        serial_sucb: d("drpnegocio").options[d("drpnegocio").selectedIndex].value
    }];


    var arr_envio = [arr_datos_generales, arrproductos_datos, glproductos_impuestos_devoluciones, glretenciones_devoluciones, arrcuentas_factura];
    call_sgu(guarda_devolucion_post, arr_envio, "guarda_devolucion_sp", "procesos");

    return false;

}

function guarda_devolucion_post(respuesta) {
    if (respuesta["respuesta"]["correcto"] == "1") {
        dhtmlx.alert({ title: "", type: "alert", text: "Se guardo la devolución correctamente", callback: termino_devolucion });
    }
    else
        dhtmlx.alert({ title: "Revisar por favor", type: "alert-error", text: "La devolución NO se pudo registrar" });

}

function termino_devolucion() {
    atras();
}