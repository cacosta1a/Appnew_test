
function clic() {
    //        if(event.button==2)
    //        {
    //            alert(document.getElementById("lblbtndd").innerText);
    //        }
}



function leeestados() {

    //debugger;

    if (document.getElementById("hddest").value != "") {
        var arrestados = new Array();
        arrestados = document.getElementById("hddest").value.split("_");

        document.getElementById("txttto").style.display = arrestados[0];
        document.getElementById("lbltto").style.display = arrestados[1];
        document.getElementById("lblhallazgo").style.display = arrestados[2];
        document.getElementById("txtdiente").style.display = arrestados[3];
        document.getElementById("lbldiente").style.display = arrestados[4];
        document.getElementById("lblsuperficie").style.display = arrestados[5];
        document.getElementById("lblArcada").style.display = arrestados[6];
        document.getElementById("lblcuadrante").style.display = arrestados[7];
        document.getElementById("chksuperficie").style.display = arrestados[8];
        document.getElementById("Label4").style.display = arrestados[9];
        document.getElementById("txtobservacion").style.display = arrestados[10];
        document.getElementById("btnIngresar").style.display = arrestados[11];
        document.getElementById("chkarcada").style.display = arrestados[12];
        document.getElementById("chkcuadrante").style.display = arrestados[13];
        tablatrata();
        if (document.getElementById("chkcop").checked == true)
            todoshalla();
    }
}

function borra() {
    // debugger;
    if (document.getElementById("chkcop").checked == true) {

        document.getElementById("txttto").style.display = "none";
        document.getElementById("txtntto").style.display = "none";
        document.getElementById("lbltto").style.display = "none";
        document.getElementById("lnktrata").style.display = "none";
    }
    else {
        document.getElementById("txttto").style.display = "block";
        document.getElementById("lbltto").style.display = "block";
        document.getElementById("lnktrata").style.display = "block";
        document.getElementById("txtntto").style.display = "block";
    }
    document.getElementById("lblnod").style.display = "none";
    document.getElementById("lblhallazgo").style.display = "block";
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("chkarcada").style.display = "none";


}

function cambiocop() {
    //  if(document.getElementById("chkcop").value)

    if (document.getElementById("chkcop").checked == true) {
        todoshalla();
        document.getElementById("txttto").style.display = "none";
        document.getElementById("txttto").value = "";
        document.getElementById("lbltto").style.display = "none";
        document.getElementById("lnktrata").style.display = "none";
        document.getElementById("lblhallazgo").style.display = "block";
        document.getElementById("txtdiente").style.display = "none";
        document.getElementById("lbldiente").style.display = "none";
        document.getElementById("lblsuperficie").style.display = "none";
        document.getElementById("lblArcada").style.display = "none";
        document.getElementById("lblcuadrante").style.display = "none";
        document.getElementById("chksuperficie").style.display = "none";
        document.getElementById("Label4").style.display = "none";
        document.getElementById("txtobservacion").style.display = "none";
        document.getElementById("btnIngresar").style.display = "none";
        document.getElementById('divhallazgo').style.height = "0px";
        document.getElementById("chkcuadrante").style.display = "none";

        document.getElementById("lblsextante").style.display = "none";
        document.getElementById("chkcuadrante").style.display = "none";

        document.getElementById("txtntto").style.display = "none";
        document.getElementById("txtntto").value = "";
        document.getElementById("txthalla2").value = "";
        document.getElementById("hddcantsuper").value = 0;


    }
    else {
        document.getElementById("txtntto").style.display = "block";
        document.getElementById("txttto").style.display = "block";
        document.getElementById("lbltto").style.display = "block";
        document.getElementById("lnktrata").style.display = "block";
        document.getElementById("chkarcada").style.display = "none";
        document.getElementById("chkcuadrante").style.display = "none";
        document.getElementById("chksextante").style.display = "none";
        document.getElementById("txtdiente").style.display = "none";
        document.getElementById("lbldiente").style.display = "none";
        document.getElementById("btnIngresar").style.display = "none";
        document.getElementById("lblsextante").style.display = "none";
        var t = document.getElementById('divhallazgo').innerHTML;
        var num = t.indexOf('</TR>', 50)
        t = t.substring(0, num + 5);
        document.getElementById('divhallazgo').innerHTML = t;
    }
}
function consultartto(tratamiento) {
    //debugger;

    var arrttos = new Array();
    var existe = 0;
    tratamientos = eval('tratamientos');
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById('divhallazgo').style.height = "0px";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("txthalla2").value = "";
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById('divhallazgo').style.height = "0px";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("lblsextante").style.display = "none";
    document.getElementById("chksextante").style.display = "none";

    for (i = 0; i < tratamientos.length; i++) {
        arrttos = tratamientos[i].split("_");

        if (arrttos[1] == tratamiento)//sino encuentra nada mensaje de no hay trata
        {
            existe = 1;
            document.getElementById("txtntto").value = arrttos[7];
            document.getElementById("hdddientesvalida").value = arrttos[3];
            document.getElementById("hddcantsuper").value = arrttos[2];
            document.getElementById("hddcantproceso").value = arrttos[5];
            document.getElementById("hddserial_tra").value = arrttos[0];
            document.getElementById("hddconvencion").value = arrttos[6];
            document.getElementById("hddcontrol").value = arrttos[8];
            document.getElementById("hddaplsuper3").value = arrttos[9];
            document.getElementById("hddedadesvalida").value = arrttos[4];
            document.getElementById("hddcolor").value = arrttos[10];
            document.getElementById("hddPagaDgn").value = arrttos[11];
            document.getElementById("hddPvp_vtr").value = arrttos[12];

            consultarhalla();

        }

    }
    if (existe == 0)
        alert(document.getElementById("msjnotrata").innerText);
}
function tablatrata() {
    //debugger;
    var arrttos2 = new Array();
    tratamientos = eval('tratamientos');
    var t = document.getElementById('divtratam').innerHTML;
    var num = t.indexOf('</TR>', 50)
    t = t.substring(0, num + 5);

    for (i = 0; i < tratamientos.length; i++) {
        arrttos2 = tratamientos[i].split("_");
        t += '<tr>'
   + '<td><a href="#" onclick="JavaScript:clictrata(' + arrttos2[0] + "," + "'" + arrttos2[7] + "'" + "," + "'" + arrttos2[3] + "'" + "," + "'" + arrttos2[2] + "'" + "," + "'" + arrttos2[5] + "'" + "," + "'" + arrttos2[6] + "'" + "," + "'" + arrttos2[8] + "'" + "," + "'" + arrttos2[1] + "'" + "," + "'" + arrttos2[9] + "'" + "," + "'" + arrttos2[4] + "'" + "," + "'" + arrttos2[10] + "'" + "," + "'" + arrttos2[11] + "'" + "," + "'" + arrttos2[12] + "'" + ')">' + arrttos2[1] + '</a></td>'
   + '<td class="servBodL">' + arrttos2[7] + '</td>'
   + '</tr>';
    }
    t = t + '</table>';
    document.getElementById('divtratam').innerHTML = t;

}

function clictrata(serial_tra, detalle_tra, dientes, cansup, canpro, conv, cont, codigo_tra, aplicasupertr, edadesvalida, color, PagaDgn, Pvp_vtr) {

    estadotrata = 0;
    document.getElementById("divtratam").style.height = '0px';
    document.getElementById("txttto").value = codigo_tra;
    document.getElementById("txtntto").value = detalle_tra;
    document.getElementById("hdddientesvalida").value = dientes;
    document.getElementById("hddcantsuper").value = cansup;
    document.getElementById("hddcantproceso").value = canpro;
    document.getElementById("hddserial_tra").value = serial_tra;
    document.getElementById("hddconvencion").value = conv;
    document.getElementById("hddcontrol").value = cont;
    document.getElementById("hddaplsuper3").value = aplicasupertr;
    document.getElementById("hddedadesvalida").value = edadesvalida;
    document.getElementById("hddcolor").value = color;
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById('divhallazgo').style.height = "0px";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("txthalla2").value = "";
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById('divhallazgo').style.height = "0px";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("lblsextante").style.display = "none";
    document.getElementById("chksextante").style.display = "none";

    document.getElementById("hddPagaDgn").value = PagaDgn;
    document.getElementById("hddPvp_vtr").value = Pvp_vtr;

    consultarhalla();


}
function consultarhalla() {
    //debugger;
    estadohalla = 0;
    var arrhall = new Array();
    var existe = 0;
    var t = document.getElementById('divhallazgo').innerHTML;
    var num = t.indexOf('</TR>', 50)
    t = t.substring(0, num + 5);

    hallaxtra = eval('hallaxtra');
    for (itr = 0; itr < hallaxtra.length; itr++) {
        arrhall = hallaxtra[itr].split("_");
        if (arrhall[1] == document.getElementById("hddserial_tra").value) {
            existe = 1;
            t += '<tr>'
            + '<td><a href="#" onclick="JavaScript:clichalla(' + arrhall[0] + "," + "'" + arrhall[2] + "'" + "," + "'" + arrhall[3] + "'" + "," + "'" + arrhall[4] + "'" + "," + "'" + arrhall[5] + "'" + "," + "'" + arrhall[6] + "'" + ')">' + arrhall[2] + '</a></td>'
            + '</tr>';
        }


    }
    t = t + '</table>';
    document.getElementById('divhallazgo').innerHTML = t;
    if (existe == 0)
        alert(document.getElementById("msjnohalla").innerText);
}

function clichalla(serial_ha, detalle_ha, aplicasuperficie, color, convencion, areaplica) {
    //debugger;
    estadohalla = 0;
    document.getElementById("hddaplica3").value = areaplica;
    document.getElementById("divhallazgo").style.height = '0px';
    document.getElementById("txthalla2").value = detalle_ha;
    document.getElementById("hddserial_hall").value = serial_ha;
    var arrhalla = new Array();
    hallazgos = eval('hallazgos');

    for (i = 0; i < hallazgos.length; i++) {
        arrhalla = hallazgos[i].split("_");
        if (arrhalla[0] == serial_ha) {
            document.getElementById("hddtejidodes").value = arrhalla[5];
            document.getElementById("hddtejidoser").value = arrhalla[1];
            document.getElementById("hddhallades").value = arrhalla[2];
            document.getElementById("hddaplsuper").value = arrhalla[4];
            document.getElementById("hddaplsuper2").value = aplicasuperficie;
            document.getElementById("hddaplica").value = arrhalla[3];
            document.getElementById("hddcolorh").value = arrhalla[6];
            document.getElementById("hddconvencionh").value = arrhalla[7];


            farea();
        }
    }

}

function todoshalla() {
    //debugger;
    var arrhall2 = new Array();
    var t = document.getElementById('divhallazgo').innerHTML;
    var num = t.indexOf('</TR>', 50)
    t = t.substring(0, num + 5);

    hallazgos = eval('hallazgos');
    for (i = 0; i < hallazgos.length; i++) {
        arrhall2 = hallazgos[i].split("_");
        t += '<tr>'
                    + '<td><a href="#" onclick="JavaScript:clichalla2(' + arrhall2[0] + "," + "'" + arrhall2[1] + "'" + "," + "'" + arrhall2[2] + "'" + "," + "'" + arrhall2[3] + "'" + "," + "'" + arrhall2[4] + "'" + "," + "'" + arrhall2[5] + "'" + "," + "'" + arrhall2[6] + "'" + "," + "'" + arrhall2[7] + "'" + ')">' + arrhall2[2] + '</a></td>'
                    + '</tr>';
    }
    t = t + '</table>';
    document.getElementById('divhallazgo').innerHTML = t;
}
function clichalla2(serial_ha, tipo_tej, descripcion, area, superficie, tej_desc, color, convencion) {
    document.getElementById("hddconvencion").value = 0;
    estadohalla = 0;
    document.getElementById("divhallazgo").style.height = '0px';
    document.getElementById("txthalla2").value = descripcion;
    document.getElementById("hddserial_hall").value = serial_ha;
    document.getElementById("hddtejidodes").value = tej_desc;
    document.getElementById("hddtejidoser").value = tipo_tej;
    document.getElementById("hddhallades").value = descripcion;
    document.getElementById("hddaplsuper").value = superficie;
    document.getElementById("hddaplica").value = area;
    document.getElementById("hddcolorh").value = color;
    document.getElementById("hddconvencionh").value = convencion;

    farea();

    //alamacena estados hddest
    document.getElementById("hddest").value = "";
    document.getElementById("hddest").value = document.getElementById("txttto").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lbltto").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblhallazgo").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("txtdiente").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lbldiente").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblsuperficie").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblArcada").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblcuadrante").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chksuperficie").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("Label4").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("txtobservacion").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("btnIngresar").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chkarcada").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chkcuadrante").style.display;

}
function farea() {

    //Si no esta chequedo COP tome el areaplica por tratamiento.

    if (document.getElementById("chkcop").checked == false)
        document.getElementById("hddaplica").value = document.getElementById("hddaplica3").value;

    //  debugger;
    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("chkarcada").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";

    document.getElementById("lblpuente").style.display = "none";
    document.getElementById("divpuente").style.display = "none";

    if (document.getElementById("hddaplica").value == "D") {
        document.getElementById("txtdiente").style.display = "block";
        document.getElementById("lbldiente").style.display = "block";
    }
    else if (document.getElementById("hddaplica").value == "P") {
        document.getElementById("lblpuente").style.display = "block";
        document.getElementById("divpuente").style.display = "block";
    }
    else if (document.getElementById("hddaplica").value == "C") {
        document.getElementById("lblcuadrante").style.display = "block";
        document.getElementById("chkcuadrante").style.display = "block";
    }
    else if (document.getElementById("hddaplica").value == "A") {
        document.getElementById("lblArcada").style.display = "block";
        document.getElementById("chkarcada").style.display = "block";
    }
    else if (document.getElementById("hddaplica").value == "S") {
        document.getElementById("lblsextante").style.display = "block";
        document.getElementById("chksextante").style.display = "block";
    }


    if (document.getElementById("chkcop").checked == true) {
        if ((document.getElementById("hddaplsuper").value == "1") || (document.getElementById("hddaplsuper").value == "True")) {
            document.getElementById("lblsuperficie").style.display = "block";
            document.getElementById("chksuperficie").style.display = "block";
        }
        else {
            document.getElementById("lblsuperficie").style.display = "none";
            document.getElementById("chksuperficie").style.display = "none";
        }
    }
    else {
        if ((document.getElementById("hddaplsuper3").value == "1") || (document.getElementById("hddaplsuper3").value == "True")) {
            document.getElementById("lblsuperficie").style.display = "block";
            document.getElementById("chksuperficie").style.display = "block";
        }
        else {
            document.getElementById("lblsuperficie").style.display = "none";
            document.getElementById("chksuperficie").style.display = "none";
        }
    }


    document.getElementById("btnIngresar").style.display = "block";

    document.getElementById("txtobservacion").style.display = "block";
    document.getElementById("Label4").style.display = "block";
    //alamacena estados hddest
    document.getElementById("hddest").value = "";
    document.getElementById("hddest").value = document.getElementById("txttto").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lbltto").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblhallazgo").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("txtdiente").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lbldiente").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblsuperficie").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblArcada").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("lblcuadrante").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chksuperficie").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("Label4").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("txtobservacion").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("btnIngresar").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chkarcada").style.display;
    document.getElementById("hddest").value = document.getElementById("hddest").value + "_" + document.getElementById("chkcuadrante").style.display;



    //debugger;
}

function validaDiente(strValue) {

    if ((document.getElementById("hddaplica").value == "D") || (document.getElementById("hddaplica").value == "P") || (document.getElementById("hddaplica4").value == "P") || (document.getElementById("hddaplica4").value == "D")) {
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

function cargar() {

    //   alert(document.getElementById("hddbrasil_nuevo").value);

    if (document.getElementById("hddbrasil_nuevo").value == "1") {
        document.getElementById("trcop").style.display = "none";
    }
    else
        document.getElementById("trcop").style.display = "block";

    document.getElementById("txttto").style.display = "block";
    document.getElementById("lbltto").style.display = "block";
    document.getElementById("lblhallazgo").style.display = "block";

    document.getElementById("txtdiente").style.display = "none";
    document.getElementById("lbldiente").style.display = "none";
    document.getElementById("lblcuadrante").style.display = "none";
    document.getElementById("chkcuadrante").style.display = "none";
    document.getElementById("lblsextante").style.display = "none";
    document.getElementById("chksextante").style.display = "none";

    document.getElementById("lblArcada").style.display = "none";
    document.getElementById("chkarcada").style.display = "none";
    document.getElementById("lblsuperficie").style.display = "none";
    document.getElementById("chksuperficie").style.display = "none";
    document.getElementById("Label4").style.display = "none";
    document.getElementById("txtobservacion").style.display = "none";
    document.getElementById("btnIngresar").style.display = "none";
    document.getElementById("lblnod").style.display = "none";
    document.getElementById("tdcarga").style.display = "none";
    document.getElementById("lblpuente").style.display = "none";
    document.getElementById("divpuente").style.display = "none";
    tablatrata();

}


var timer;
var estadotrata = 0;
var estadohalla = 0;
var estadotiempo = 0;
var hallazgo2 = new Array();
var detalle2 = new Array();
var odonto = new Array();
var odontoh = new Array();
var lhalla = 0;
var ldet = 0;
var lodo = 0;
var lodoh = 0;

function iniciartiempo(valor) {
    if ((valor == 1) && (estadotiempo == 0))
        timer = setInterval("ampliartrata()", 20);
    if ((valor == 2) && (estadotiempo == 0))
        timer = setInterval("ampliarhalla()", 20);

}



function ampliartrata() {
    //debugger;
    var a;
    a = document.getElementById("divtratam").style.height;
    a = a.substring(0, a.length - 2);
    estadotiempo = 1;
    if (estadotrata == 1) {
        b = parseInt(a, 10) - 10;
        document.getElementById("divtratam").style.height = b + 'px';
        b = b - 0;
        if (b == 0) {
            clearInterval(timer);
            estadotiempo = 0;
            estadotrata = 0;
        }

    }
    else {
        b = parseInt(a, 10) + 10;
        document.getElementById("divtratam").style.height = b + 'px';
        b = b - 0;
        if (b == 200) {
            clearInterval(timer);
            estadotiempo = 0;
            estadotrata = 1;
        }
    }
}

function ampliarhalla() {
    //debugger;
    var a;
    a = document.getElementById("divhallazgo").style.height;
    a = a.substring(0, a.length - 2);
    estadotiempo = 1;
    if (estadohalla == 1) {
        b = parseInt(a, 10) - 10;
        document.getElementById("divhallazgo").style.height = b + 'px';
        b = b - 0;
        if (b == 0) {
            clearInterval(timer);
            estadotiempo = 0;
            estadohalla = 0;
        }

    }
    else {
        b = parseInt(a, 10) + 10;
        document.getElementById("divhallazgo").style.height = b + 'px';
        b = b - 0;
        if (b == 100) {
            clearInterval(timer);
            estadotiempo = 0;
            estadohalla = 1;
        }
    }
}


var superficies = "";
var asuper = new Array('M', 'O', 'D', 'P', 'V');
var id = 0;

function cgsuperficies() {
    //debugger;
    var textsup = "";
    superficies = "";
    for (n = 0; n < 5; n++) {
        if (document.getElementById("chksuperficie_" + n).checked == true) {
            textsup = asuper[n];
            superficies = superficies + textsup;
        }
    }
}
function cgsuperficiesi() {
    //debugger;
    var textsup = "";
    superficies = "";
    for (n = 0; n < 5; n++) {
        if (document.getElementById("chksuperficiei_" + n).checked == true) {
            textsup = asuper[n];
            superficies = superficies + textsup;
        }
    }
}
function thalla(id) {
    //Se borra el hallazgo
    //debugger;
    var arrd = new Array();
    var arrh = new Array();
    var arro = new Array();
    var arroh = new Array();

    for (i = 0; i <= lhalla - 1; i++) {
        arrh = hallazgo2[i].split("_");
        if (arrh.length > 0) {
            if (arrh[0] == id) {
                delete hallazgo2[i];
                hallazgo2.sort();
                lhalla--;
                borra();
                break;
            }
        }
    }
    tablahalla();


    for (i = 0; i <= ldet - 1; i++) {
        arrd = detalle2[i].split("_");
        if (arrd.length > 0) {
            if ((arrd[0] == id) && (arrd[2] != "")) {
                delete detalle2[i];
                detalle2.sort();
                ldet--;
                borra();
                break;
            }
        }
    }
    tabladetalle();

    for (i = 0; i <= lodo - 1; i++) {
        arro = odonto[i].split("_");
        if (arro.length > 0) {
            if (arro[0] == id) {
                delete odonto[i];
                lodo--;
                odonto.sort();
                pintaodonto(arro[2], arro[1], arro[4]);
                break;
            }
        }
    }


    for (i = 0; i <= lodoh - 1; i++) {
        arroh = odontoh[i].split("_");
        if (arroh.length > 0) {
            if (arroh[0] == id) {
                delete odontoh[i];
                lodoh--;
                odontoh.sort();
                pintaodontoh(arroh[2], arroh[1], arroh[4]);
                break;
            }
        }
    }

}

function tdetalle(id) {

    var arrd = new Array();
    var arrh = new Array();
    var arro = new Array();
    var arroh = new Array();


    for (i = 0; i <= ldet - 1; i++) {

        arrd = detalle2[i].split("_");
        if (arrd.length > 0) {
            if (arrd[0] == id) {
                delete detalle2[i];
                detalle2.sort();
                ldet--;
                borra();
                break;
            }
        }
    }
    tabladetalle();

    for (i = 0; i <= lhalla - 1; i++) {
        arrh = hallazgo2[i].split("_");
        if (arrh.length > 0) {
            if (arrh[0] == id) {
                delete hallazgo2[i];
                hallazgo2.sort();
                lhalla--;
                borra();
                break;
            }
        }
    }

    tablahalla();

    for (i = 0; i <= lodo - 1; i++) {
        arro = odonto[i].split("_");
        if (arro.length > 0) {
            if (arro[0] == id) {
                delete odonto[i];
                lodo--;
                odonto.sort();
                pintaodonto(arro[2], arro[1], arro[4]);
                break;
            }
        }
    }


    for (i = 0; i <= lodoh - 1; i++) {
        arroh = odontoh[i].split("_");
        if (arroh.length > 0) {
            if (arroh[0] == id) {
                delete odontoh[i];
                lodoh--;
                odontoh.sort();
                pintaodontoh(arroh[2], arroh[1], arroh[4]);
                break;
            }
        }
    }


}
function cambiodiag() {
    if (document.getElementById("drpdiagnosticadores").value == 0)
        document.getElementById("lblnod").style.display = "block";
    else
        document.getElementById("lblnod").style.display = "none";

}
function Guardar_onclick() {
    var descuento = 0;

    if (parseFloat(document.getElementById("txtdescuentocli").value) + parseFloat(document.getElementById("txtdescuentocli").value > 100)) {
        alert(document.getElementById("desmayor").innerText);
        return false;
    }
    if (document.getElementById("drpdiagnosticadores").value == 0) {
        alert(document.getElementById("lblmsje").innerText);
        document.getElementById("lblnod").style.display = "block";
    }
    else {
        desce = 0;
        descuento = 0;
        if (document.getElementById("hddserial_tsuc").value == "6") {
            if (parseInt(document.getElementById("txtdescuento").value, 10) < 0) {
                alert(document.getElementById("descero").innerText);
                return false;
            }
            else {
                descs = document.getElementById("hddescuentosucursal").value;
                desce = document.getElementById("hddescuentoempresa").value;
                descs = descs.replace(/,/, ".");
                desce = desce.replace(/,/, ".");

                descs2 = 100 * parseFloat(descs, 10);


                desc = document.getElementById("txtdescuento").value;
                desc2 = parseFloat(desc, 10);

                mayor = descs2;


                // El descuento mayor es descuento por sucursal 
                //desc  digitado
                //descuento por sucursal debe ser mayor o igual al digitado     
                if (mayor < desc2) {
                    alert(document.getElementById("maxper").innerText + " " + mayor);
                    return false;
                }
                desc2 = desc2 / 100;
                des = String(desc2);
                descuento = des.replace(/,/, ".");

            }
        }

        {
            if ((lhalla != 0) || (ldet != 0)) {

                document.getElementById("lblnod").style.display = "none";
                var buffer = "";
                var arrdetx = new Array();
                var arrhallx = new Array();

                for (i = 0; i < ldet; i++) {
                    arrdetx = detalle2[i].split("_");

                    cantidad = parseInt(arrdetx[13], 10);


                    if (!(((arrdetx[1] == "B") || (arrdetx[1] == "O")) || (arrdetx[12] != " "))) {
                        alert(document.getElementById("areareq").innerText);
                        return false;
                    }
                    for (j = 0; j < cantidad; j++) {
                        buffer = buffer + xml(11, "dientextra", "");
                        buffer = buffer + xml(2, "orden", i + 1);
                        buffer = buffer + xml(2, "SERIAL_TRA", arrdetx[6]);

                        if (arrdetx[19] != "0") {
                            buffer = buffer + xml(2, "SERIAL_ORT", arrdetx[19]);
                            buffer = buffer + xml(2, "diente", arrdetx[15]);
                        }
                        else
                            buffer = buffer + xml(2, "diente", arrdetx[12]);



                        var str = arrdetx[5];
                        precio = str.replace(/,/, ".");

                        buffer = buffer + xml(2, "Precio_dtr", precio);
                        buffer = buffer + xml(2, "PagaDgn", arrdetx[21]);
                        buffer = buffer + xml(2, "Pvp_vtr", arrdetx[22]);




                        buffer = buffer + xml(2, "Superficie", arrdetx[3]);
                        buffer = buffer + xml(2, "Descuento", String(desce));
                        buffer = buffer + xml(2, "Descuentosuc", String(descuento));
                        buffer = buffer + xml(2, "OPCIONAL", arrdetx[20]);
                        buffer = buffer + xml(2, "Cantidad", arrdetx[23]);
                        buffer = buffer + xml(12, "dientextra", "");
                    }


                }
                for (i = 0; i < lhalla; i++) {
                    arrhallx = hallazgo2[i].split("_");
                    buffer = buffer + xml(11, "Hallazagos", "");
                    buffer = buffer + xml(2, "Serial_tejido", arrhallx[9]);
                    buffer = buffer + xml(2, "Ubicacion", arrhallx[7]);
                    buffer = buffer + xml(2, "Serial_Hallazgo", arrhallx[3]);
                    buffer = buffer + xml(2, "Superficies", arrhallx[3]);
                    buffer = buffer + xml(2, "Comentario", arrhallx[10]);
                    buffer = buffer + xml(12, "Hallazagos", "");
                }
                document.getElementById("hddxml1").value = buffer;
                document.getElementById("tdcarga").style.display = "block";
                document.getElementById("btnCancelar").style.display = "none";
                document.getElementById("btnguardar").style.display = "none";
                return true;
            }
            else {
                alert(document.getElementById("lblmsje2").innerText);
            }
        }
    }
    return false;
}
function letraPresionada(e, obj, decimal) {
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
function posDecimal(obj, maximo) {
    maximo += 1;
    var posPunto = obj.value.indexOf('.');
    var tam = obj.value.length;
    if (tam - posPunto <= maximo) {
    } else if (posPunto > -1) {
        obj.value = obj.value.substr(0, posPunto + maximo);
    }
}
function ingresar() {
    var cantidadpuente;
    cantidadpuente = 1;
    maxcant = parseInt(document.getElementById("hddmaxcantidad").value, 10);
    if ((maxcant >= (ldet + 1)) || (maxcant == 0)) {
        var diente;

        diente = document.getElementById("txtdiente").value;

        if (document.getElementById("hddaplica").value == "P") {
            diente = document.getElementById("txtdiente1").value + "-" + document.getElementById("txtdiente2").value;
            cantidadpuente = parseInt(document.getElementById("txtdiente2").value, 10) - parseInt(document.getElementById("txtdiente1").value, 10) + 1;
        }
        //debugger;
        var n = 0;
        n = lhalla;

        if (validartodo() == true) {
            edadpaciente = parseInt(document.getElementById("hddedadpaciente").value, 10);
            edadrangoarr = document.getElementById("hddedadesvalida").value;
            //debugger;
            if (edadrangoarr != "" && edadrangoarr != ",") {
                var edadrango = new Array();
                edadrango = edadrangoarr.split(",");
                if ((edadpaciente < edadrango[0]) || (edadpaciente > edadrango[1])) {
                    alert(document.getElementById("lbledadnop").innerText);
                    return false;
                }
            }
            cgsuperficies();
            id = id + 1;

            idodonto = lodo;

            //miro si esta insercion tiene odontograma
            if (document.getElementById("hddconvencion").value == "0")
                idodonto = 0;

            hallazgo2[n] = id +
"_" + document.getElementById("hddtejidodes").value +
"_" + document.getElementById("txtdiente").value +
"_" + document.getElementById("hddserial_hall").value +
"_" + document.getElementById("hddhallades").value +
"_" + superficies +
"_" + diente +
"_" + document.getElementById("HiddenField1").value +
"_" + id +
"_" + document.getElementById("hddtejidoser").value +
"_" + document.getElementById("txtobservacion").value +
"_" + document.getElementById("hddcolor").value +
"_" + document.getElementById("hddconvencion").value +
"_" + idodonto;



            document.getElementById("txthalla2").value = "";
            lhalla++;

            if (document.getElementById("chkcop").checked == false) {
                n = ldet;
                detalle2[n] = id +                //0
                    "_" + document.getElementById("HiddenField1").value +           //1
                    "_" + diente +          //2
                    "_" + superficies +     //3
                    "_" + document.getElementById("txtntto").value +        //4
                    "_" + document.getElementById("hddcontrol").value +     //5
                    "_" + document.getElementById("hddserial_tra").value +  //6
                    "_" + id +                                              //7
                    "_" + document.getElementById("txttto").value +         //8
                    "_" + document.getElementById("hddconvencion").value +  //9
                    "_" + document.getElementById("hddcolor").value +       //10
                    "_" + idodonto +                                        //11
                    "_" + document.getElementById("area2").value +           //12
                    "_" + "1" +            //cantidad                            //13
                    "_" + "1" +                                        //14
                    "_" + "" +           //15  area asi: Arcada1                                
                    "_" + "" +           //16 Dientes posibles     
                    "_" + "1" +           //17 superficie   
                    "_" + "1" +           //18 aplicasuperfice   
                    "_" + "0" +         //19 serial_ort     
                    "_" + "1" +         //20 opcional
                    "_" + document.getElementById("hddPagaDgn").value +     //21
                    "_" + document.getElementById("hddPvp_vtr").value +  //22
                    "_" + cantidadpuente;   //23
                ldet++;

            }




            if (document.getElementById("hddconvencion").value != "0") {
                n = lodo;
                odonto[n] = id +
                    "_" + document.getElementById("hddconvencion").value +
                    "_" + diente +
                    "_" + superficies +
                    "_" + document.getElementById("hddcolor").value;
                lodo++;
                pintaodonto(document.getElementById("txtdiente").value, document.getElementById("hddconvencion").value, document.getElementById("hddcolor").value);
            }

            if (document.getElementById("hddconvencionh").value != "0") {
                n = lodoh;
                odontoh[n] = id +
                    "_" + document.getElementById("hddconvencionh").value +
                    "_" + document.getElementById("txtdiente").value +
                    "_" + superficies +
                    "_" + document.getElementById("hddcolorh").value;

                lodoh++;
                pintaodontoh(document.getElementById("txtdiente").value, document.getElementById("hddconvencionh").value, document.getElementById("hddcolorh").value);
            }

            document.getElementById("txtdiente").value = "";
            document.getElementById("txtdiente1").value = "";
            document.getElementById("txtdiente2").value = "";
            document.getElementById("txttto").value = "";
            document.getElementById("txtntto").value = "";
            document.getElementById("txthalla2").value = "";
            document.getElementById("txtobservacion").value = "";
            dsuperficies();
            borra();
            tabladetalle();
            tablahalla();
            return false;
        }
        else
            return false;
    }
    else {
        alert(document.getElementById("maxcantidad").innerText);
        return false;
    }
}
function pintaodontoh(diente, convencion, color) {
    //debugger;
    if (diente != "") {
        var url = "";

        if (document.form1.chksuperficie_0.checked)
            url += "m=Purple&";
        if (document.form1.chksuperficie_1.checked)
            url += "o=Blue&";
        if (document.form1.chksuperficie_2.checked)
            url += "d=Orange&";
        if (document.form1.chksuperficie_3.checked)
            url += "p=Red&";
        if (document.form1.chksuperficie_4.checked)
            url += "v=Red&";

        url += "con=" + convencion + "&diente=" + diente;

        url += "&color=" + color;

        //se comprueba si ese diente ya tiene dibujo
        var arrodo = new Array();
        var url2 = "conf=";
        for (i = 0; i < lodoh; i++) {
            arrodo = odontoh[i].split("_");
            if (arrodo[2] == diente) {
                url2 = url2 + arrodo[1] + ";" + arrodo[2] + ";" + arrodo[3] + ";";
            }
        }
       
        var s1 = "";
        s1 = "../WebControl/DibujaDiente.aspx?" + url + "&" + url2;
        document.getElementById("TabContainer1_TabPanel2_odoh" + diente).src = s1;

    }
}
function pintaodonto(diente, convencion, color) {
    //debugger;
    if (diente != "") {
        var url = "";

        if (document.form1.chksuperficie_0.checked)
            url += "m=Purple&";
        if (document.form1.chksuperficie_1.checked)
            url += "o=Blue&";
        if (document.form1.chksuperficie_2.checked)
            url += "d=Orange&";
        if (document.form1.chksuperficie_3.checked)
            url += "p=Red&";
        if (document.form1.chksuperficie_4.checked)
            url += "v=Red&";

        url += "con=" + convencion + "&diente=" + diente;

        url += "&color=" + color;

        //se comprueba si ese diente ya tiene dibujo
        var arrodo = new Array();
        var url2 = "conf=";
        for (i = 0; i < lodo; i++) {
            arrodo = odonto[i].split("_");
            if (arrodo[2] == diente) {
                url2 = url2 + arrodo[1] + ";" + arrodo[2] + ";" + arrodo[3] + ";";
            }
        }
        var s1 = "";
        s1 = "../WebControl/DibujaDiente.aspx?" + url + "&" + url2;
        document.getElementById("TabContainer1_TabPanel3_odo" + diente).src = s1;

    }
}
function dsuperficies() {
    for (n = 0; n < 5; n++) {
        document.getElementById("chksuperficie_" + n).checked = false;
    }
}
function dsuperficiesi() {
    for (n = 0; n < 5; n++) {
        document.getElementById("chksuperficiei_" + n).checked = false;
    }
}


function tablahalla() {
    //debugger;
    var t = document.getElementById('divhalla').innerHTML;
    var num = t.indexOf('</TR>', 50);
    t = t.substring(0, num + 5);

    var arrhall3 = new Array();

    for (i = 0; i < lhalla; i++) {
        arrhall3 = hallazgo2[i].split("_");
        if (i % 2 == 0) {
            t += '<tr>'
   + '<td class="servHd3">' + arrhall3[1] + '</td>'
   + '<td class="servHd3">' + arrhall3[7] + '</td>'
   + '<td class="servHd3">' + arrhall3[4] + '</td>'
   + '<td class="servHd3">' + arrhall3[5] + '</td>'
   + '<td class="servHd3">' + arrhall3[10] + '</td>'
   + '<td class="servHd3"><a href="#" onclick="thalla(' + arrhall3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }
        else {
            t += '<tr>'
   + '<td class="servHd2">' + arrhall3[1] + '</td>'
   + '<td class="servHd2">' + arrhall3[7] + '</td>'
   + '<td class="servHd2">' + arrhall3[4] + '</td>'
   + '<td class="servHd2">' + arrhall3[5] + '</td>'
   + '<td class="servHd2">' + arrhall3[10] + '</td>'
   + '<td class="servHd2"><a href="#" onclick="thalla(' + arrhall3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }

    }
    t = t + '</table>';
    document.getElementById('divhalla').innerHTML = t;

}


function clicorto(serial_ort) {
    pintaortodoncia();
}
function pintaortodoncia() {
    var t = document.getElementById('divdetalle').innerHTML;
    var num = t.indexOf('</TR>', 50);
    t = t.substring(0, num + 5);

    var arrttos3 = new Array();

    for (i = 0; i < ldet; i++) {
        arrttos3 = detalle2[i].split("_");
        if (i % 2 == 0) {
            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="servHd3">' + arrttos3[8] + '</td>'
   + '<td class="servHd3">' + arrttos3[1] + '</td>'
   + '<td class="servHd3">' + arrttos3[12] + '</td>'
   + '<td class="servHd3">' + arrttos3[3] + '</td>'
   + '<td class="servHd3">' + arrttos3[4] + '</td>'
   + '<td class="servHd3">' + valor + '</td>'
   + '<td class="servHd3"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }
        else {
            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="servHd2">' + arrttos3[8] + '</td>'
   + '<td class="servHd2">' + arrttos3[1] + '</td>'
   + '<td class="servHd2">' + arrttos3[2] + '</td>'
   + '<td class="servHd2">' + arrttos3[3] + '</td>'
   + '<td class="servHd2">' + arrttos3[4] + '</td>'
   + '<td class="servHd2">' + valor + '</td>'
   + '<td class="servHd2"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }

    }
    t = t + '</table>';
    document.getElementById('divdetalle').innerHTML = t;
}
function validartodo() {
    //debugger;
    area = "";
    area2 = "";
    var exist = 0;
    switch (document.getElementById("hddaplica").value) {
        case "D":
            area = "Diente";
            area = area + " " + document.getElementById("txtdiente").value;
            area2 = document.getElementById("txtdiente").value;
            break;
        case "B":
            area = "Boca";
            area2 = "Boca";
            break;
        case "C":
            cuad = "";
            if (document.form1.chkcuadrante_0.checked == true)
                cuad = document.form1.chkcuadrante_0.value;
            else if (document.form1.chkcuadrante_1.checked == true)
                cuad = document.form1.chkcuadrante_1.value;
            else if (document.form1.chkcuadrante_2.checked == true)
                cuad = document.form1.chkcuadrante_2.value;
            else if (document.form1.chkcuadrante_3.checked == true)
                cuad = document.form1.chkcuadrante_3.value;
            area = "Cuadrante";
            area = area + " " + cuad;
            area2 = cuad;
            break;
        case "S":
            sex = "";
            if (document.form1.chksextante_0.checked == true)
                sex = document.form1.chksextante_0.value;
            else if (document.form1.chksextante_1.checked == true)
                sex = document.form1.chksextante_1.value;
            else if (document.form1.chksextante_2.checked == true)
                sex = document.form1.chksextante_2.value;
            else if (document.form1.chksextante_3.checked == true)
                sex = document.form1.chksextante_3.value;
            else if (document.form1.chksextante_4.checked == true)
                sex = document.form1.chksextante_4.value;
            else if (document.form1.chksextante_5.checked == true)
                sex = document.form1.chksextante_5.value;
            area = "Sextante";
            area = area + " " + sex;
            area2 = sex;
            break;

        case "A":
            arc = "";
            if (document.form1.chkarcada_0.checked == true)
                arc = document.form1.chkarcada_0.value;
            else if (document.form1.chkarcada_1.checked == true)
                arc = document.form1.chkarcada_1.value;

            area = arc;
            area2 = arc;
            break;
        case "P":
            area = "Puente";
            area2 = area;
            if (document.getElementById("txtdiente1").value > document.getElementById("txtdiente2").value) {
                alert(document.getElementById("dinicial").innerText);
                return false;
            }
            else {
                if ((document.getElementById("txtdiente1").value == "") || (document.getElementById("txtdiente2").value == "")) {
                    alert('El numero Digitado no pertenece a ningun Diente.');
                    return false;
                }
                else {
                    area = document.getElementById("txtdiente1").value + "-" + document.getElementById("txtdiente2").value;
                    area2 = area;
                }
            }
            break;
    }
    document.getElementById("hddaplica2").value = area;
    document.getElementById("HiddenField1").value = area;
    document.getElementById("area2").value = area2;

    if (document.getElementById("chkcop").checked == true) {

        var ctrat = 0;
        var arrhalt = new Array();
        for (i = 0; i < lhalla; i++) {
            arrhalt = hallazgo2[i].split("_");
            if ((arrhalt[3] == document.getElementById("hddserial_hall").value) && (arrhalt[2] == area)) {
                exist = 1;
            }
        }
    }
    else {

        arrdett = new Array();
        ctrat = 0;
        for (i = 0; i < ldet; i++) {
            //validad procesos repetidos
            arrdett = detalle2[i].split("_");
            if (arrdett[14] == "1") {
                if ((document.getElementById("hddaplica").value == "C") || (document.getElementById("hddaplica").value == "A") || (document.getElementById("hddaplica").value == "S")) {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[1] == area))
                        exist = 1;
                }
                else {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[2] == document.getElementById("txtdiente").value))
                        exist = 1;
                }
                if (arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) {
                    ctrat = ctrat + 1;
                }
            }
            else {
                if ((document.getElementById("hddaplica").value == "C") || (document.getElementById("hddaplica").value == "A") || (document.getElementById("hddaplica").value == "S")) {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[15] == area))
                        exist = 1;
                }
                else {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[2] == document.getElementById("txtdiente").value))
                        exist = 1;
                }
                if (arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) {
                    ctrat = ctrat + 1;
                }
            }
        }
    }

    if (exist == 0) {
        if (parseInt(document.getElementById("hddcantproceso").value) != 0) {
            if (ctrat >= parseInt(document.getElementById("hddcantproceso").value, 10)) {
                alert(document.getElementById("msj1").innerText);
                //mesaje de cant no permiitida
                return false;
            }
        }
        //            if((document.getElementById("hddaplica").value=="P") || (document.getElementById("hddaplica").value == "D"))
        if (document.getElementById("hddaplica").value == "D") {
            if (document.getElementById("txtdiente").value == "") {
                alert(document.getElementById("msj2").innerText); //mensaje idiente  
                return false;
            }
            else {

                //valida solo si es por tratamiento
                if (document.getElementById("chkcop").checked == false) {
                    if (parseInt(document.getElementById("hdddientesvalida").value, 10) != 0) {
                        var adientes = new Array();
                        var dientes;
                        var sepuede;

                        sepuede = false;
                        dientes = document.getElementById("hdddientesvalida").value;
                        dientes = dientes.replace(/\s*$/, '');
                        adientes = dientes.split(",");

                        for (i = 0; i < adientes.length; i = i + 1) {
                            if (adientes[i] == document.getElementById("txtdiente").value) {
                                sepuede = true;
                                break;
                            }
                        }
                        if (sepuede == false) {
                            alert(document.getElementById("msj3").innerText);
                            //mesaje no diente
                            return false;
                        }
                    }
                }
            }
        } // fin if P o D

        //si tiene habilitadas superficie el trataamiento verifique que este chequeada
        var aplicasuper = 0;

        if (document.getElementById("chkcop").checked == true)
            aplicasuper = document.getElementById("hddaplsuper").value;
        else
            aplicasuper = document.getElementById("hddaplsuper3").value;

        if ((aplicasuper == "1") || (aplicasuper == "True")) {
            var cantsuper = 0;

            if (document.form1.chksuperficie_0.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficie_1.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficie_2.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficie_3.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficie_4.checked)
                cantsuper = cantsuper + 1;

            if (cantsuper > 0) {
                if (document.getElementById("hddcantsuper").value > 0) {
                    if (cantsuper != document.getElementById("hddcantsuper").value) {
                        alert(document.getElementById("msj4").innerText);
                        // mensaje .cantsuper diferente
                        return false;
                    }
                }
            }
            else {
                alert(document.getElementById("msj5").innerText);
                // mensaje ingsuper
                return false;
            }
        }
    }
    else {
        alert(document.getElementById("msj6").innerText);
        //mensaje prep
        return false;
    }
    return true;
}

function validartodoort(area, area2) {
    var exist = 0;
    document.getElementById("hddaplica2").value = area;
    document.getElementById("HiddenField1").value = area;
    document.getElementById("area2").value = area2;
    {

        arrdett = new Array();
        ctrat = 0;
        for (i = 0; i < ldet; i++) {
            //validad procesos repetidos
            arrdett = detalle2[i].split("_");
            if (arrdett[14] == "1") {
                if ((document.getElementById("hddaplica").value == "C") || (document.getElementById("hddaplica").value == "A") || (document.getElementById("hddaplica").value == "S")) {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[1] == area))
                        exist = 1;
                }
                else {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[2] == document.getElementById("txtdientei").value))
                        exist = 1;
                }
                if (arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) {
                    ctrat = ctrat + 1;
                }
            }
            else {
                if ((document.getElementById("hddaplica").value == "C") || (document.getElementById("hddaplica").value == "A") || (document.getElementById("hddaplica").value == "S")) {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[15] == area))
                        exist = 1;
                }
                else {
                    if ((arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) && (arrdett[2] == document.getElementById("txtdientei").value))
                        exist = 1;
                }
                if (arrdett[6] == parseInt(document.getElementById("hddserial_tra").value, 10)) {
                    ctrat = ctrat + 1;
                }
            }
        }
    }

    if (exist == 0) {

        //            if((document.getElementById("hddaplica").value=="P") || (document.getElementById("hddaplica").value == "D"))
        if (document.getElementById("hddaplica").value == "D") {
            if (document.getElementById("txtdientei").value == "") {
                alert(document.getElementById("msj2").innerText); //mensaje idiente  
                return false;
            }
            else {

                //valida solo si es por tratamiento
                //if(document.getElementById("chkcop").checked==false)
                {
                    if (parseInt(document.getElementById("hdddientesvalida").value, 10) != 0) {
                        var adientes = new Array();
                        var dientes;
                        var sepuede;

                        sepuede = false;
                        dientes = document.getElementById("hdddientesvalida").value;
                        dientes = dientes.replace(/\s*$/, '');
                        adientes = dientes.split(",");

                        for (i = 0; i < adientes.length; i = i + 1) {
                            if (adientes[i] == document.getElementById("txtdientei").value) {
                                sepuede = true;
                                break;
                            }
                        }
                        if (sepuede == false) {
                            alert(document.getElementById("msj3").innerText);
                            //mesaje no diente
                            return false;
                        }
                    }
                }
            }
        } // fin if P o D

        //si tiene habilitadas superficie el trataamiento verifique que este chequeada
        var aplicasuper = 0;



        aplicasuper = document.getElementById("hddaplsuper3").value;

        if ((aplicasuper == "1") || (aplicasuper == "True") || (aplicasuper == "true")) {
            var cantsuper = 0;

            if (document.form1.chksuperficiei_0.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficiei_1.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficiei_2.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficiei_3.checked)
                cantsuper = cantsuper + 1;
            if (document.form1.chksuperficiei_4.checked)
                cantsuper = cantsuper + 1;

            if (cantsuper > 0) {
                if (document.getElementById("hddcantsuper").value > 0) {
                    if (cantsuper != document.getElementById("hddcantsuper").value) {
                        alert(document.getElementById("msj4").innerText);
                        // mensaje .cantsuper diferente
                        return false;
                    }
                }
            }
            else {
                alert(document.getElementById("msj5").innerText);
                // mensaje ingsuper
                return false;
            }
        }
    }
    else {
        alert(document.getElementById("msj6").innerText);
        //mensaje prep
        return false;
    }
    return true;
}

function xml(nivel, variable, valor) {
    if (nivel == 2) {
        if (valor == "") {
            return "+" + variable + " /--";
        }
        else {
            return "+" + variable + "--" + valor + "+/" + variable + "--";
        }
    }
    else {
        if (nivel == 11) {
            return "+" + variable + "--";
        }
        if (nivel == 12) {
            return "+/" + variable + "--";
        }
    }
}

function clicdetalle2() {
    //alert("Prueba");
    document.getElementById("divprueba").style.display = "block";
    document.getElementById("divprueba").style.position = "absolute";
    document.getElementById("divprueba").style.width = "100%";
    document.getElementById("divprueba").style.height = "100%";
    document.getElementById("divprueba").style.background = "#000";
    document.getElementById("divprueba").style.filter = " alpha(opacity=70)";
    document.getElementById("divinterno").style.position = "absolute";
    document.getElementById("divinterno").style.display = "block";
    document.getElementById("divinterno").style.left = document.getElementById("TabContainer1").style.left;
    //divprueba
    return false;
}

function cliccolocaarea(area, fila, indice) {
    //coloca la area de un procedimiento de Ortodoncia

    document.getElementById("divprueba").style.display = "block";
    document.getElementById("divprueba").style.position = "absolute";
    document.getElementById("divprueba").style.width = "100%";
    document.getElementById("divprueba").style.height = "100%";
    document.getElementById("divprueba").style.background = "#000";
    document.getElementById("divprueba").style.filter = " alpha(opacity=70)";
    document.getElementById("divinterno").style.position = "absolute";
    document.getElementById("divinterno").style.display = "block";
    document.getElementById("divinterno").style.textalign = "center";

    document.getElementById("trdiente").style.display = "none";
    document.getElementById("trpuente").style.display = "none";
    document.getElementById("trarcada").style.display = "none";
    document.getElementById("trcuadrante").style.display = "none";
    document.getElementById("trsextante").style.display = "none";
    document.getElementById("trsuperficie").style.display = "none";
    dsuperficiesi();
    switch (area) {
        case "D":
            document.getElementById("txtdientei").value = "";
            document.getElementById("trdiente").style.display = "block";
            arrorto = fila.split("_");
            if ((arrorto[18] == "1") || (arrorto[18] == "True") || (arrorto[18] == "true")) {
                document.getElementById("trsuperficie").style.display = "block";
            }
            else
                document.getElementById("trsuperficie").style.display = "none";

            break;
        case "P":
            document.getElementById("trpuente").style.display = "block";
            break;
        case "A":
            document.getElementById("trarcada").style.display = "block";
            break;
        case "C":
            document.getElementById("trcuadrante").style.display = "block";
            break;
        case "S":
            document.getElementById("trsextante").style.display = "block";
            break;

    }
    document.getElementById("hddaplica4").value = area;
    document.getElementById("hddbuffer").value = fila;
    document.getElementById("hddbuffer1").value = indice;

    //divprueba


    return false;
}
function clicdetalle4() {
    document.getElementById("divinterno").style.display = "none";
    document.getElementById("divprueba").style.display = "none";
    return false;
}

function clicdetalle3() {
    {

        //Clic en Insertar colocando la Area de UN Procedimiento de Ortodoncia que viene de Paquete
        cgsuperficiesi();
        arrorto = document.getElementById("hddbuffer").value.split("_");
        switch (document.getElementById("hddaplica4").value) {
            case "D":
                arrorto[12] = document.getElementById("txtdientei").value;

                area = "Diente";
                area = area + " " + document.getElementById("txtdientei").value;
                area2 = document.getElementById("txtdientei").value;
                arrorto[15] = area2;
                arrorto[2] = area2;
                arrorto[3] = superficies;



                break;
            case "P":
                area = "Puente";
                area2 = area;
                if (document.getElementById("txtpuentei1").value > document.getElementById("txtpuentei2").value) {
                    alert(document.getElementById("dinicial").innerText);
                    return false;
                }
                else {
                    if ((document.getElementById("txtpuentei1").value == "") || (document.getElementById("txtpuentei2").value == "")) {
                        alert('El numero Digitado no pertenece a ningun Diente.');
                        return false;
                    }
                    else
                        area = document.getElementById("txtpuentei1").value + "-" + document.getElementById("txtpuentei2").value;
                }

                arrorto[23] = parseInt(document.getElementById("txtpuentei2").value, 10) - parseInt(document.getElementById("txtpuentei1").value, 10) + 1;
                arrorto[12] = area;
                arrorto[15] = area;
                //arrorto[2] = area2;
                arrorto[2] = area;
                break;
            case "A":
                arc = "";
                if (document.form1.chkarcadai_0.checked == true)
                    arc = document.form1.chkarcadai_0.value;
                else if (document.form1.chkarcadai_1.checked == true)
                    arc = document.form1.chkarcadai_1.value;

                area = arc;
                area2 = arc;
                arrorto[15] = area;
                arrorto[12] = area;

                break;
            case "C":
                cuad = "";
                if (document.form1.chkcuadrantei_0.checked == true)
                    cuad = document.form1.chkcuadrantei_0.value;
                else if (document.form1.chkcuadrantei_1.checked == true)
                    cuad = document.form1.chkcuadrantei_1.value;
                else if (document.form1.chkcuadrantei_2.checked == true)
                    cuad = document.form1.chkcuadrantei_2.value;
                else if (document.form1.chkcuadrantei_3.checked == true)
                    cuad = document.form1.chkcuadrantei_3.value;
                area = "Cuadrante";
                area = area + " " + cuad;
                area2 = cuad;
                arrorto[15] = area;
                arrorto[12] = area;
                break;
            case "S":
                sex = "";
                if (document.form1.chksextantei_0.checked == true)
                    sex = document.form1.chksextantei_0.value;
                else if (document.form1.chksextantei_1.checked == true)
                    sex = document.form1.chksextantei_1.value;
                else if (document.form1.chksextantei_2.checked == true)
                    sex = document.form1.chksextantei_2.value;
                else if (document.form1.chksextantei_3.checked == true)
                    sex = document.form1.chksextantei_3.value;
                else if (document.form1.chksextantei_4.checked == true)
                    sex = document.form1.chksextantei_4.value;
                else if (document.form1.chksextantei_5.checked == true)
                    sex = document.form1.chksextantei_5.value;
                area = "Sextante";
                area = area + " " + sex;
                area2 = sex;
                arrorto[15] = area;
                arrorto[12] = area;
                break;

        }

        document.getElementById("hddserial_tra").value = arrorto[6];
        document.getElementById("hdddientesvalida").value = arrorto[16];

        document.getElementById("hddcantsuper").value = arrorto[17];
        document.getElementById("hddaplsuper3").value = arrorto[18];



        document.getElementById("hddaplica").value = area;
        //document.getElementById("hddaplica4").value=area;

        if (validartodoort(area, area2) == true) {
            detalle2[parseInt(document.getElementById("hddbuffer1").value, 10)] = arrorto.join("_");
            cgsuperficiesi();
            if (arrorto[9] != "0") {
                for (i = 0; i <= lodo - 1; i++) {
                    arro = odonto[i].split("_");
                    if (arro.length > 0) {
                        if (arro[0] == arrorto[0]) {
                            delete odonto[i];
                            lodo--;
                            odonto.sort();
                            pintaodonto(arro[2], arro[1], arro[4]);
                            break;
                        }
                    }
                }

                n = lodo;
                odonto[n] = arrorto[0] +
                "_" + arrorto[9] +
                "_" + document.getElementById("txtdientei").value +
                "_" + superficies +
                "_" + arrorto[10];
                lodo++;
                pintaodonto(document.getElementById("txtdientei").value, arrorto[6], arrorto[10]);
            }

            tabladetalle();
            document.getElementById("divinterno").style.display = "none";
            document.getElementById("divprueba").style.display = "none";
        }
        //divprueba

    }

    return false;
}
var ortodoncia = new Array();
var lort = 0;

function traeproc(serial_ort, cuotai1, cuotai2, vrcuota, cuotas, valor, descripcion) {

    //Clic en el paquete de Ortodoncia

    var arrttos3 = new Array();
    temp = ldet;
    for (i = 0; i < temp; i++) {

        if (detalle2[i] != undefined) {
            arrttos3 = detalle2[i].split("_");
            // alert(arrttos3[19])
            if (arrttos3[19] != "0") {
                tdetalle(arrttos3[0]);
                i = -1;
            }
        }
        else
            i = temp;
    }

    document.getElementById("tablaplan").style.display = "block";
    document.getElementById("lblvalor").innerText = valor;
    document.getElementById("lblcuoini").innerText = cuotai1;
    document.getElementById("lblcouini2").innerText = cuotai2;
    document.getElementById("lblNoCuotas").innerText = cuotas;
    document.getElementById("lblvalorcou").innerText = vrcuota;
    document.getElementById("lblNomPlan").innerText = descripcion;

    document.getElementById("hddserial_ort").value = serial_ort;
    document.getElementById("hddcuotai1").value = cuotai1;
    document.getElementById("hddcuotai2").value = cuotai2;
    document.getElementById("cuotas").value = cuotas;
    document.getElementById("vrcuota").value = vrcuota;

    var arrorto = new Array();
    tratamientosort = eval('tratamientosort');
    for (i = 0; i < tratamientosort.length; i++) {
        arrorto = tratamientosort[i].split("_");
        if (arrorto[2] == serial_ort) {
            cantidad = parseInt(arrorto[11], 10);

            if ((arrorto[5] == "0") && ((arrorto[9] == "B") || (arrorto[9] == "O")))
                ind = cantidad;
            else
                ind = 1;

            for (m = ind; m <= cantidad; m++) {
                id = id + 1;
                n = ldet;
                detalle2[n] = id +   //0
                "_" + arrorto[9] +   //AreaAplica    //1
                "_" + "dsds" +      //2  //Diente
                "_" + "" +          //3 //Superficies
                "_" + arrorto[7] +       //4     //nombre tto
                "_" + arrorto[8] +      //5     //hddcontrol
                "_" + arrorto[0] +      //6     //hddserial_tra
                "_" + id +              //7
                "_" + arrorto[1] +      //8     //codigo_tra
                "_" + arrorto[6] +      //9     //convencion
                "_" + arrorto[10] +     //10    //color
                "_" + "0" +           //11       //id_odonto idodonto
                "_" + " " +             //12       //area solo numero
                "_" + ind +             //13  Cantidad  
                "_" + "2" +             //14  tipo   
                "_" + "" +              //15  area asi: Arcada1   
                "_" + arrorto[3] +           //16 Dientes posibles                     
                "_" + arrorto[13] +           //17 superficie   
                "_" + arrorto[14] +           //18 aplicasuperfice   
                "_" + arrorto[2] +           //19 serial_ort
                "_" + arrorto[5] +           //20 opcional  
                "_" + arrorto[15] +           //21 PagaDgn
                "_" + arrorto[16] +           //22 Pvp_vtr
                "_" + "1";           //23 cantidadpuente                                                                                   

                ldet++;
                id++;
            }
        }
    }
    tabladetalle();
    return false;
}

function tabladetalle() {

    // debugger;
    var t = document.getElementById('divdetalle').innerHTML;
    var num = t.indexOf('</TR>', 50);
    t = t.substring(0, num + 5);

    var arrttos3 = new Array();

    for (i = 0; i < ldet; i++) {
        arrttos3 = detalle2[i].split("_");
        if (i % 2 == 0) {

            if (parseInt(arrttos3[19], 10) > 0)
                estilo = "servHd4";
            else
                estilo = "servHd3";

            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="' + estilo + '">' + arrttos3[8] + '</td>';

            if (arrttos3[14] == "2") {
                if ((arrttos3[1] == "O") || arrttos3[1] == "B")
                    tem = '<td class="' + estilo + '">' + arrttos3[1] + '</td>';
                else
                    tem = '<td class="' + estilo + '"><a href="#" onclick="JavaScript:cliccolocaarea(' + "'" + arrttos3[1] + "','" + detalle2[i] + "'" + ",'" + i + "'" + ')">' + arrttos3[1] + '</a>' + '</td>';

                if (((arrttos3[1] == "B") || (arrttos3[1] == "O")) || (arrttos3[12] != " "))
                    darea = arrttos3[12];
                else
                    darea = "<SPAN id=lblnod style='DISPLAY: block; COLOR: red'>*</SPAN>";
            }
            else {
                tem = '<td class="' + estilo + '">' + arrttos3[1] + '</td>';
                darea = arrttos3[12];
            }


            t += tem
   + '<td class="' + estilo + '">' + darea + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[3] + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[4] + '</td>'
   + '<td class="' + estilo + '">' + valor + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[13] + '</td>';

            if (arrttos3[20] == "0")
                t += '<td class="' + estilo + '"><img src="../Images/delete2.png" alt="Eliminar" border="0"></td></tr>';
            else
                t += '<td class="' + estilo + '"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td></tr>';

        }
        else {

            if (parseInt(arrttos3[19], 10) > 0)
                estilo = "servHd4";
            else
                estilo = "servHd2";

            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="' + estilo + '">' + arrttos3[8] + '</td>';

            if (arrttos3[14] == "2") {
                if ((arrttos3[1] == "O") || arrttos3[1] == "B")
                    tem = '<td class="' + estilo + '">' + arrttos3[1] + '</td>';
                else
                    tem = '<td class="' + estilo + '"><a href="#" onclick="JavaScript:cliccolocaarea(' + "'" + arrttos3[1] + "','" + detalle2[i] + "'" + ",'" + i + "'" + ')">' + arrttos3[1] + '</a>' + '</td>';

                if (((arrttos3[1] == "B") || (arrttos3[1] == "O")) || (arrttos3[12] != " "))

                    darea = arrttos3[12];
                else
                    darea = "<SPAN id=lblnod style='DISPLAY: block; COLOR: red'>*</SPAN>";
            }
            else {
                tem = '<td class="' + estilo + '">' + arrttos3[1] + '</td>';
                darea = arrttos3[12];
            }

            t += tem
   + '<td class="' + estilo + '">' + darea + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[3] + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[4] + '</td>'
   + '<td class="' + estilo + '">' + valor + '</td>'
   + '<td class="' + estilo + '">' + arrttos3[13] + '</td>';
            if (arrttos3[20] == "0")
                t += '<td class="' + estilo + '"><img src="../Images/delete2.png" alt="Eliminar" border="0"></td></tr>';
            else
                t += '<td class="' + estilo + '"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td></tr>';

        }

    }
    t = t + '</table>';
    document.getElementById('divdetalle').innerHTML = t;

    //          +'<td><a href="#" onclick="JavaScript:clictrata(' + arrttos2[0] + "," + "'" + arrttos2[7] + "'" + "," + "'" + arrttos2[3] + "'" + "," + "'" + arrttos2[2] + "'" + "," + "'" + arrttos2[5] + "'" + "," + "'" + arrttos2[6] + "'" + "," + "'" + arrttos2[8] + "'" + "," + "'" + arrttos2[1] + "'" + "," + "'" + arrttos2[9] + "'" + "," + "'" + arrttos2[4] + "'" + "," + "'" + arrttos2[10] + "'" + ')">' + arrttos2[1] + '</a></td>'



}

function tabladetalle2() {
    //debugger;
    var t = document.getElementById('divdetalle').innerHTML;
    var num = t.indexOf('</TR>', 50);
    t = t.substring(0, num + 5);

    var arrttos3 = new Array();

    for (i = 0; i < ldet; i++) {
        arrttos3 = detalle2[i].split("_");
        if (i % 2 == 0) {
            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="servHd3">' + arrttos3[8] + '</td>'


   + '<td class="servHd3">' + arrttos3[1] + '</td>'
   + '<td class="servHd3">' + arrttos3[12] + '</td>'
   + '<td class="servHd3">' + arrttos3[3] + '</td>'
   + '<td class="servHd3">' + arrttos3[4] + '</td>'
   + '<td class="servHd3">' + valor + '</td>'
   + '<td class="servHd3">' + '1' + '</td>'
   + '<td class="servHd3"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }
        else {
            var num2 = 0;
            var valor = "";
            arrttos3[5] = arrttos3[5].replace(/,/, ".");
            num2 = arrttos3[5].indexOf('.', 0);
            if (num2 != -1)
                valor = arrttos3[5].substring(0, num2 + 3);
            else
                valor = arrttos3[5];

            t += '<tr>'
   + '<td class="servHd2">' + arrttos3[8] + '</td>'
   + '<td class="servHd2">' + arrttos3[1] + '</td>'
   + '<td class="servHd2">' + arrttos3[2] + '</td>'
   + '<td class="servHd2">' + arrttos3[3] + '</td>'
   + '<td class="servHd2">' + arrttos3[4] + '</td>'
   + '<td class="servHd2">' + valor + '</td>'
   + '<td class="servHd3">' + '1' + '</td>'
   + '<td class="servHd2"><a href="#" onclick="tdetalle(' + arrttos3[0] + ')"><img src="../Images/delete.png" alt="Eliminar" border="0"></a></td>'
   + '</tr>';
        }

    }
    t = t + '</table>';
    document.getElementById('divdetalle').innerHTML = t;

}