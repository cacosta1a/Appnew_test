var glreporte_cuentas = "";
var gldetallado_cuentas = 0;

function consultar_cuentas(vserial_sucb, vfecha_inicial, vfecha_final, vserial_cierre, vserial_contacto) {
    //Si no viene la fecha es solo activo, pasivo y patrimonio
    //Serial_contacto diferente de cero es para un contacto en especifico
    var vflag =3;
    if ((vfecha_inicial == "") || (vfecha_final == ""))
        vflag = 4;

    call_sgu(consulta_cuentas_post, [[{
        fecha_inicial: vfecha_inicial,
        fecha_final: vfecha_final,
        serial_sucb: vserial_sucb,
        serial_cierre: vserial_cierre,
        serial_contacto: vserial_contacto,
        flag: vflag
    }]], "consulta_cuentas_actuales", "procesos");
    return false;
}
function consulta_cuentas_post(respuesta) {

        var arrgeneral = new Array();

        var tencabezado = true;
        var arrtipocol = ["1", "1"];
        var ancho_tabla = "100%";

        if (gldetallado_cuentas == 0)
        {
            ancho_tabla = "60%";
            arrgeneral = cuentas_agrupado_padre(respuesta);
        }
        if (gldetallado_cuentas == 1)
            arrgeneral = cuentas_detallado_padre(respuesta);
        if (gldetallado_cuentas == 2)
        {
            ancho_tabla = "100%";
            arrtipocol = ["0", "0"];
            tencabezado = false;
            glultima_respuesta = respuesta;
            arrgeneral = cuentas_deudas(respuesta);
        }
        if (gldetallado_cuentas == 3) {
            ancho_tabla = "100%";
            arrtipocol = ["0", "0"];
            tencabezado = false;
            glultima_respuesta = respuesta;
            arrgeneral = cuentas_deudas_detalle(respuesta);
        }

        if (gldetallado_cuentas <= 3) {
            var grilla = new grillajava();
            grilla.fuente = arrgeneral;
            grilla.div = glreporte_cuentas;
            grilla.id = "gwreporte"
            grilla.autorow = false;
            grilla.habencabezado = tencabezado;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:" + ancho_tabla;
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Cuenta", ""];
            grilla.datoscolumnas = ["nombre", "valor"];
            grilla.tipocolumna = arrtipocol;
            grilla.funcioncolumna = ["fun_negrilla", "fun_ajuste"];
            grilla.estilocolumna = ["'width: 350px; text-align:left;font-family:Tahoma; font-size:13px; font-weight:normal; '", "'width: 60px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'", "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 50px; text-align:center; '"];
            grilla.bind();
        }


        if (gldetallado_cuentas == 4) {
            //Balance Prueba

            arrgeneral = cuentas_balance_prueba(respuesta);
            var grilla = new grillajava();
            grilla.fuente = arrgeneral;
            grilla.div = glreporte_cuentas;
            grilla.id = "gwreporte"
            grilla.autorow = false;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:60%" ;
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Código", "Cuenta","Débito","Crédito"];
            grilla.datoscolumnas = ["cuenta", "nombre", "saldo", "saldo"];
            grilla.tipocolumna = ["0", "0","1","1"];
            grilla.funcioncolumna = ["", "", "fun_debito", "fun_credito"];
            grilla.estilocolumna = ["'width: 80px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 80px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 80px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;'", "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal;padding-right:0px'", "'width: 200px; text-align:center; font-family:Tahoma; font-size:13px; font-weight:normal'", "'width: 50px; text-align:center; '"];
            grilla.bind();

        }

    //div_reporte
}

function fun_debito(fila,dato)
{
    if (fila["serial_puc"] == "0")
        return "<span style='font-weight:bold'>" + fila["saldo"] + "</span>";
    else {
        var saldo = parseFloat(fila["saldo"]);
        if (saldo > 0)
            return parseFloat(fila["saldo"]).toFixed(0);
        else
            return 0;
    }
}
function fun_credito(fila, dato) {
    if (fila["serial_puc"] == "0")
        return "<span style='font-weight:bold'>" + fila["saldo2"] + "</span>";
    else {
        var saldo = parseFloat(fila["saldo2"]);
        if (saldo > 0)
        {
            //saldo = -1 * saldo;
            return parseFloat(saldo).toFixed(0);
        }
        else
            return 0;
    }
}
function cuentas_balance_prueba(respuesta) {
    var arrajustado = new Array();
    var n = 0;
    while (n < respuesta["Table"].length) {
        var obj1 = new Object();
        obj1["serial_puc"] = respuesta["Table"][n]["serial_puc"];
        obj1["nombre"] = respuesta["Table"][n]["nombre"];
        obj1["valor"] = respuesta["Table"][n]["valor"];
        obj1["cuenta"] = respuesta["Table"][n]["cuenta"];
        obj1["padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 1);
        obj1["tipo"] =  respuesta["Table"][n]["tipo"];
        
        arrajustado[arrajustado.length] = obj1;
        n++;
    }
    
    var arrgeneral = new Array();
    n = 1;
    var valor_debito_total = 0;
    var valor_credito_total = 0;
    while (n <= 9) {
        var dtv_cuenta = new vista(arrajustado, "['padre']=='" + n + "'", '', ''); //Mira si tiene algun registro con esa cuenta
        var m=0;
        var objserial_puc= new Object();
        var m=0;
        while(m<dtv_cuenta.length)
        {
            objserial_puc[dtv_cuenta[m]["serial_puc"]]="1";
            m++;
        }
   
        for(k in objserial_puc)
        {
            var valor_debito_total_cuenta = 0;
            var valor_credito_total_cuenta = 0;

            var dtv_cuenta_puc = new vista(dtv_cuenta, "['serial_puc']=='" + k + "'", 'A', 'cuenta'); //Mira si tiene algun registro con esa cuenta
            var saldo=0;
            var nombre_cuenta="";
            var cuenta="";

            var j=0;
            while(j<dtv_cuenta_puc.length)
            {
                nombre_cuenta=dtv_cuenta_puc[j]["nombre"];
                cuenta=dtv_cuenta_puc[j]["cuenta"];

                if(dtv_cuenta_puc[j]["tipo"]==1)
                {
                    valor_debito_total = valor_debito_total + parseFloat(dtv_cuenta_puc[j]["valor"]);
                    valor_debito_total_cuenta=valor_debito_total_cuenta+ parseFloat(dtv_cuenta_puc[j]["valor"]);
                    saldo=saldo+parseFloat(dtv_cuenta_puc[j]["valor"]);
                }
                else
                {
                    valor_credito_total = valor_credito_total + parseFloat(dtv_cuenta_puc[j]["valor"]);
                    valor_credito_total_cuenta=valor_credito_total_cuenta+ parseFloat(dtv_cuenta_puc[j]["valor"]);
                    saldo=saldo-parseFloat(dtv_cuenta_puc[j]["valor"]);
                }
                j++;
            }
            if(((parseFloat(saldo)!=0)&&(parseFloat(Math.abs(saldo))>0.00001))||(valor_debito_total!=0)||(valor_credito_total!=0))
            {
                var obj2= new Object();
                obj2["serial_puc"]=k;
                obj2["nombre"]=nombre_cuenta;
                obj2["saldo"] = valor_debito_total_cuenta;
                obj2["saldo2"] = valor_credito_total_cuenta;
                obj2["cuenta"]=cuenta;
                arrgeneral[arrgeneral.length] = obj2;
            }
           
        }
        n++;
    }

    var obj2 = new Object();
    obj2["serial_puc"] = 0;
    obj2["nombre"] = "<span style='font-weight:bold'>SUMAS IGUALES</span>";
    obj2["saldo"] = parseFloat(valor_debito_total).toFixed(2);
    obj2["saldo2"] = parseFloat(valor_credito_total).toFixed(2);
    obj2["cuenta"] = "";
    arrgeneral[arrgeneral.length] = obj2;
    return arrgeneral;
}
function cuentas_detallado_padre(respuesta)
{

    var arrajustado = new Array();
    var n = 0;
    while (n < respuesta["Table"].length) {
        var obj1 = new Object();
        obj1["serial_puc"] = respuesta["Table"][n]["serial_puc"];
        obj1["nombre"] = respuesta["Table"][n]["nombre"];
        obj1["cuenta"] = respuesta["Table"][n]["cuenta"];
        obj1["valor"] = respuesta["Table"][n]["valor"];
        obj1["padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 1);
        obj1["sub_padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 2);
        arrajustado[arrajustado.length] = obj1;
        n++;
    }
    var objpuc = new Object();
    var i = 0;
    while (i < respuesta["Table"].length) {
        objpuc[respuesta["Table"][i]["cuenta"]] = respuesta["Table"][i]["nombre"];
        i++;
    }
    var arrgeneral = new Array();
    n = 1;
    while (n <= 9) {
        var dtv_cuenta = new vista(arrajustado, "['padre']=='" + n + "'", '', ''); //Mira si tiene algun registro con esa cuenta
        if (dtv_cuenta.length > 0) {
            if (objpuc[String(n)] != undefined) {
                var obj1 = new Object();
                obj1["nombre"] = objpuc[String(n)];
                obj1["padre"] = n;
                obj1["es_padre"] = "1";
                var dtv_puc2 = new vista(respuesta["Table"], "['padre']=='" + n + "'", '', '');

                var m = 0;
                var arrtemporal = new Array();
                var saldo_cuenta = 0;
                while (m < dtv_puc2.length) {
                    var cuenta2 = String(dtv_puc2[m]["cuenta"]);
                    if (cuenta2.length == 2) {
                        //es subcuenta
                        var dtv_cuenta2 = new vista(arrajustado, "['sub_padre']=='" + cuenta2 + "'", '', '');
                        if (dtv_cuenta2.length > 0) {

                            //Tiene registros esa subcuenta
                            var obj2 = new Object();
                            obj2["nombre"] = objpuc[String(cuenta2)];
                            obj2["cuenta"] = cuenta2;
                            obj2["sub_padre"] = cuenta2.substr(0, 2);
                            var j = 0;
                            var saldo = 0;
                            while (j < dtv_cuenta2.length) {
                                var serial_puc = dtv_cuenta2[j]["serial_puc"];
                                var dtv_asientos = new vista(respuesta["Table"], "['serial_puc']=='" + serial_puc + "'", '', '');
                                var as = 0;
                                var debitos = 0;
                                var creditos = 0;
                                while (as < dtv_asientos.length) {
                                    if (dtv_asientos[as]["tipo"] == "1") {
                                        debitos = debitos + parseFloat(dtv_asientos[as]["valor"]);
                                    }
                                    else {
                                        creditos = creditos + parseFloat(dtv_asientos[as]["valor"]);
                                    }
                                    as++;
                                }
                                saldo = saldo + debitos - creditos;


                                j++;
                            }
                            if (saldo != 0) {
                                saldo_cuenta = saldo_cuenta + saldo;
                                obj2["valor"] = saldo;
                                arrtemporal[arrtemporal.length] = obj2;
                            }

                        }
                    }
                    m++;
                }
                if (saldo_cuenta != 0) {
                    obj1["valor"] = saldo_cuenta;
                    arrgeneral[arrgeneral.length] = obj1;
                    var c1 = 0;
                    while (c1 < arrtemporal.length) {
                        var obj3 = new Object();
                        obj3["nombre"] = "<span style='margin-left:25px; color:blue; '>" + arrtemporal[c1]["nombre"] + "</span>";;
                        obj3["padre"] = n;
                        obj3["es_padre"] = "0";
                        obj3["valor"] = arrtemporal[c1]["valor"];
                        arrgeneral[arrgeneral.length] = obj3;

                        var dtv_cuenta2 = new vista(arrajustado, "['sub_padre']=='" + arrtemporal[c1]["sub_padre"] + "'", '', '');
                        var m = 0;
                        while (m < dtv_cuenta2.length)
                        {
                            var obj3 = new Object();
                            obj3["nombre"] ="<span style='margin-left:50px'>"+dtv_cuenta2[m]["nombre"]+"</span>";
                            obj3["padre"] = dtv_cuenta2[m]["padre"];
                            obj3["es_padre"] = "0";
                            obj3["valor"] = dtv_cuenta2[m]["valor"];
                            arrgeneral[arrgeneral.length] = obj3;
                            m++;
                        }

                        c1++;
                    }
                }


            }
        }

        n++;
    }
    return arrgeneral;
}
function cuentas_agrupado_padre(respuesta)
{
    var arrajustado = new Array();
    var n = 0;
    while (n < respuesta["Table"].length) {
        var obj1 = new Object();
        obj1["serial_puc"] = respuesta["Table"][n]["serial_puc"];
        obj1["nombre"] = respuesta["Table"][n]["nombre"];
        obj1["cuenta"] = respuesta["Table"][n]["cuenta"];
        obj1["padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 1);
        obj1["sub_padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 2);
        arrajustado[arrajustado.length] = obj1;
        n++;
    }
    var objpuc = new Object();
    var i = 0;
    while (i < respuesta["Table"].length) {
        objpuc[respuesta["Table"][i]["cuenta"]] = respuesta["Table"][i]["nombre"];
        i++;
    }
    var arrgeneral = new Array();
    n = 1;
    while (n <= 9) {
        var dtv_cuenta = new vista(arrajustado, "['padre']=='" + n + "'", '', ''); //Mira si tiene algun registro con esa cuenta
        if (dtv_cuenta.length > 0) {
            if (objpuc[String(n)] != undefined) {
                var obj1 = new Object();
                obj1["nombre"] = objpuc[String(n)];
                obj1["padre"] = n;
                obj1["es_padre"] = "1";
                var dtv_puc2 = new vista(respuesta["Table"], "['padre']=='" + n + "'", '', '');

                var m = 0;
                var arrtemporal = new Array();
                var saldo_cuenta = 0;
                while (m < dtv_puc2.length) {
                    var cuenta2 = String(dtv_puc2[m]["cuenta"]);
                    if (cuenta2.length == 2) {
                        //es subcuenta
                        var dtv_cuenta2 = new vista(arrajustado, "['sub_padre']=='" + cuenta2 + "'", '', '');
                        if (dtv_cuenta2.length > 0) {

                            //Tiene registros esa subcuenta
                            var obj2 = new Object();
                            obj2["nombre"] = objpuc[String(cuenta2)];
                            var j = 0;
                            var saldo = 0;
                            while (j < dtv_cuenta2.length) {
                                var serial_puc = dtv_cuenta2[j]["serial_puc"];
                                var dtv_asientos = new vista(respuesta["Table"], "['serial_puc']=='" + serial_puc + "'", '', '');
                                var as = 0;
                                var debitos = 0;
                                var creditos = 0;
                                while (as < dtv_asientos.length) {
                                    if (dtv_asientos[as]["tipo"] == "1") {
                                        debitos = debitos + parseFloat(dtv_asientos[as]["valor"]);
                                    }
                                    else {
                                        creditos = creditos + parseFloat(dtv_asientos[as]["valor"]);
                                    }
                                    as++;
                                }
                                saldo = saldo + debitos - creditos;


                                j++;
                            }
                            if (saldo != 0)
                            {
                                saldo_cuenta = saldo_cuenta + saldo;
                                obj2["valor"] = saldo.toFixed(2);
                                arrtemporal[arrtemporal.length] = obj2;
                            }

                        }
                    }
                    m++;
                }
                if ((saldo_cuenta != 0)||(arrtemporal.length!=0))
                {
                    obj1["valor"] = saldo_cuenta.toFixed(2);
                    arrgeneral[arrgeneral.length] = obj1;
                    var c1 = 0;
                    while (c1 < arrtemporal.length) {
                        var obj3 = new Object();
                        obj3["nombre"] = arrtemporal[c1]["nombre"];
                        obj3["padre"] = n;
                        obj3["es_padre"] = "0";
                        obj3["valor"] = parseFloat(arrtemporal[c1]["valor"]).toFixed(2);
                        arrgeneral[arrgeneral.length] = obj3;
                        c1++;
                    }
                }


            }
        }

        n++;
    }
    return arrgeneral;
}
var glultima_respuesta;
function cuentas_deudas(respuesta) {
   
    var arrajustado = new Array();
    var n = 0;
    while (n < respuesta["Table"].length) {
        var obj1 = new Object();
        obj1["serial_puc"] = respuesta["Table"][n]["serial_puc"];
        obj1["nombre"] = respuesta["Table"][n]["nombre"];
        obj1["cuenta"] = respuesta["Table"][n]["cuenta"];
        obj1["padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 1);
        obj1["sub_padre"] = String(respuesta["Table"][n]["cuenta"]).substr(0, 2);
        obj1["valor"] = respuesta["Table"][n]["valor"];
        obj1["tipo"] = respuesta["Table"][n]["tipo"];
        arrajustado[arrajustado.length] = obj1;
        n++;
    }

    n = 0;
    var deudas = parseFloat(0);
    var te_deben = parseFloat(0);
    while (n < arrajustado.length)
    {
        if (arrajustado[n]["padre"] == "2")
        {
            if (arrajustado[n]["tipo"] == "2")
                deudas = deudas + parseFloat(arrajustado[n]["valor"]);
            else
                deudas = deudas - parseFloat(arrajustado[n]["valor"]);
        }
        else if (arrajustado[n]["sub_padre"] == "13") {
            if (arrajustado[n]["tipo"] == "1")
                te_deben = te_deben + parseFloat(arrajustado[n]["valor"]);
            else
                te_deben = te_deben - parseFloat(arrajustado[n]["valor"]);
        }
        n++;
    }
    te_deben = 1 * te_deben;
    deudas = deudas;
    var vdeudas = String(deudas.toFixed(2));
    var vte_deben = String(te_deben.toFixed(2));

    var arr1 = new Array();
    var obj1 = new Object();
    obj1["nombre"] = "<span style='color:Green'> Te Debe</span>";
    obj1["padre"] = "1";
    obj1["es_padre"] = "1";
    obj1["valor"] = vte_deben;
    arr1[arr1.length] = obj1;

    var obj1 = new Object();
    obj1["nombre"] = "<span style='color:Red'> Le Debes</span>";
    obj1["padre"] = "2";
    obj1["es_padre"] = "1";
    obj1["valor"] =vdeudas;
    arr1[arr1.length] = obj1;

    return arr1;
}


function cuentas_deudas_detalle(respuesta) {
    var arrajustado = new Array();
    var n = 0;

    var objpuc_pasivo = new Object();
    var objpuc_activo = new Object();

    while (n < respuesta["Table"].length) {
       

        var padre = String(respuesta["Table"][n]["cuenta"]).substr(0, 1);
        var sub_padre = String(respuesta["Table"][n]["cuenta"]).substr(0, 2);

        if (padre == "2") {
            if (objpuc_pasivo[respuesta["Table"][n]["serial_puc"]] == undefined)
            {
                if (respuesta["Table"][n]["tipo"]=="2")
                    objpuc_pasivo[respuesta["Table"][n]["serial_puc"]] = parseFloat(respuesta["Table"][n]["valor"]);
                else
                    objpuc_pasivo[respuesta["Table"][n]["serial_puc"]] = -1* parseFloat(respuesta["Table"][n]["valor"]);
            }
            else {
                if (respuesta["Table"][n]["tipo"] == "2") {
                    objpuc_pasivo[respuesta["Table"][n]["serial_puc"]] =
                        parseFloat(objpuc_pasivo[respuesta["Table"][n]["serial_puc"]]) +
                        parseFloat(respuesta["Table"][n]["valor"]);
                }
                else
                {
                    objpuc_pasivo[respuesta["Table"][n]["serial_puc"]] =
                        parseFloat(objpuc_pasivo[respuesta["Table"][n]["serial_puc"]]) -
                        parseFloat(respuesta["Table"][n]["valor"]);
                }
            }
        }

        if (sub_padre == "13") {
            if (objpuc_activo[respuesta["Table"][n]["serial_puc"]] == undefined) {
                if (respuesta["Table"][n]["tipo"] == "1")
                    objpuc_activo[respuesta["Table"][n]["serial_puc"]] = parseFloat(respuesta["Table"][n]["valor"]);
                else
                    objpuc_activo[respuesta["Table"][n]["serial_puc"]] = -1*parseFloat(respuesta["Table"][n]["valor"]);
            }
            else {
                if (respuesta["Table"][n]["tipo"] == "1") {
                    objpuc_activo[respuesta["Table"][n]["serial_puc"]] =
                        parseFloat(objpuc_activo[respuesta["Table"][n]["serial_puc"]]) +
                        parseFloat(respuesta["Table"][n]["valor"]);
                }
                else
                {
                    objpuc_activo[respuesta["Table"][n]["serial_puc"]] =
                        parseFloat(objpuc_activo[respuesta["Table"][n]["serial_puc"]]) -
                        parseFloat(respuesta["Table"][n]["valor"]);
                }
            }
        }
        var obj1 = new Object();
        obj1["serial_puc"] = respuesta["Table"][n]["serial_puc"];
        obj1["nombre"] = respuesta["Table"][n]["nombre"];
        obj1["cuenta"] = respuesta["Table"][n]["cuenta"];
        obj1["padre"] = padre;
        obj1["sub_padre"] = sub_padre;
        obj1["tipo"] = respuesta["Table"][n]["tipo"];
        obj1["valor"] = respuesta["Table"][n]["valor"];
        arrajustado[arrajustado.length] = obj1;
        n++;
    }

    n = 0;
    var deudas = parseFloat(0);
    var te_deben = parseFloat(0);
    while (n < arrajustado.length) {
        if (arrajustado[n]["padre"] == "2")
        {
            if (arrajustado[n]["tipo"]=="2")
                deudas = deudas + parseFloat(arrajustado[n]["valor"]);
            else
                deudas = deudas - parseFloat(arrajustado[n]["valor"]);
        }
        else if (arrajustado[n]["sub_padre"] == "13") {
            if (arrajustado[n]["tipo"] == "1")
                te_deben = te_deben + parseFloat(arrajustado[n]["valor"]);
            else
                te_deben = te_deben - parseFloat(arrajustado[n]["valor"]);
        }
        n++;
    }
    te_deben = 1 * te_deben;
    deudas =  deudas;
    var vdeudas = String(deudas.toFixed(2));
    var vte_deben = String(te_deben.toFixed(2));

    var arr1 = new Array();

    var obj1 = new Object();
    obj1["nombre"] = "<span style='color:Green'> Te Debe</span>";
    obj1["padre"] = "1";
    obj1["es_padre"] = "1";
    obj1["valor"] = vte_deben;
    arr1[arr1.length] = obj1;

    for (k in objpuc_activo)
    {
        var dtv2 = new vista(respuesta["Table"], "['serial_puc']=='" + k + "'", "", "");
        if (dtv2.length > 0)
        {
            var obj1 = new Object();
            obj1["nombre"] = dtv2[0]["nombre"];
            obj1["padre"] = dtv2[0]["padre"];
            obj1["es_padre"] = "0";
            obj1["valor"] = parseFloat(objpuc_activo[k]).toFixed(2);
            arr1[arr1.length] = obj1;
        }

    }
 

    var obj1 = new Object();
    obj1["nombre"] = "<span style='color:Red'> Le Debes</span>";
    obj1["padre"] = "2";
    obj1["es_padre"] = "1";
    obj1["valor"] = vdeudas;
    arr1[arr1.length] = obj1;


    for (k in objpuc_pasivo) {
        var dtv2 = new vista(respuesta["Table"], "['serial_puc']=='" + k + "'", "", "");
        if (dtv2.length > 0) {
            var obj1 = new Object();
            obj1["nombre"] = dtv2[0]["nombre"];
            obj1["padre"] = dtv2[0]["padre"];
            obj1["es_padre"] = "0";
            obj1["valor"] = parseFloat(objpuc_pasivo[k]).toFixed(2);
            arr1[arr1.length] = obj1;
        }

    }

    return arr1;
}

function fun_negrilla(fila, dato) {
    if (fila["es_padre"] == "1")
        return "<strong>" + dato + "</strong>";
    else
        return dato;
}

function fun_ajuste(fila, dato) {
    if ((fila["padre"] == "2") || (fila["padre"] == "4")) {
        var dato2 = -1 * parseFloat(dato);
        if (fila["es_padre"] == "1")
            return "<strong>" + dato2 + "</strong>";
        else

            return dato2;
    }
    else {
        if (fila["es_padre"] == "1")
            return "<strong>" + dato + "</strong>";
        else
            return dato;
    }

}