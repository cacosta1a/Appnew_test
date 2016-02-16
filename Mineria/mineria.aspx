<%@ Page Title="" Language="C#" MasterPageFile="~/Maestra/maestra.master" AutoEventWireup="true" CodeFile="mineria.aspx.cs" Inherits="ModGenerico_mineria" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <script>
        function carga()
        {
            var objdato = eval("(" + d("hdddatos").value + ")");
            var arr1 = new Array();
            for (k in objdato["respuesta"]) {
                var obj1 = new Object();
                obj1["palabra"] = k;
                obj1["cantidad"] = objdato["respuesta"][k];
                arr1[arr1.length] = obj1;
            }
            var dtv = new vista(arr1, "", 'D', 'cantidad', 'true');
            d("sp_palabras").innerText = dtv.length;

            d("sp_palabras2").innerText = objdato["cantidad_total"];

            var grilla = new grillajava();
            grilla.fuente = dtv;
            grilla.div = "div_grilla";
            grilla.id = "gwpalabras"
            grilla.autorow = false;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:98%";
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Palabra", "Cantidad"];
            grilla.datoscolumnas = ["palabra", "cantidad"];
            grilla.tipocolumna = ["0", "0"];
            grilla.funcioncolumna = ["", ""];
            grilla.ordenarencabezado = true;
            grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
            grilla.ordenarentero = ["", ""];

            grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
            grilla.bind();

            
            var grilla = new grillajava();
            grilla.fuente = objdato["datos"];
            grilla.div = "div_grilla2";
            grilla.id = "gwdatosorg"
            grilla.autorow = true;
            grilla.habencabezado = true;
            grilla.clasetabla = "bordered";
            grilla.estilo = "itemlista";
            grilla.estilotabla = "width:98%";
            grilla.alternolista = "alternolista";
            grilla.propiedadestabla = "";
            grilla.estiloencabezado = "";
            grilla.encabezado = ["Palabra", "Cantidad"];
            grilla.datoscolumnas = ["palabra", "cantidad"];
            grilla.tipocolumna = ["0", "0"];
            grilla.funcioncolumna = ["", ""];
            grilla.ordenarencabezado = true;
            grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
            grilla.ordenarentero = ["", ""];

            grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
                "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
            grilla.bind();

        }
    </script>

    <style>
        .c1
        {
            text-align:left !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
     <div id="divformg">
            	<fieldset class="clfield" >
                    <legend>Mineria</legend>
 	
                  <%--  <asp:TextBox runat="server" TextMode="MultiLine" CssClass="c1"  Width="800px" Rows="20" ID="txttemp"></asp:TextBox>

                    <asp:TextBox runat="server" ID="txtchar" Width="800px"></asp:TextBox>--%>
                    <div>
                             <span>Cantidad de Palabras:</span><span id="sp_palabras"></span>
                    </div>
                    <div>
                             <span>Cantidad Total:</span><span id="sp_palabras2"></span>
                    </div>
                <div id="div_grilla"></div>
                      <div id="div_grilla2"></div>
            	</fieldset>
       	</div>
    <asp:HiddenField ID="hdddatos" runat="server" />
</asp:Content>

