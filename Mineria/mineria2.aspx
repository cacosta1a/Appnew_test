<%@ Page Title="" Language="C#" MasterPageFile="~/Maestra/maestra.master" ValidateRequest="false" AutoEventWireup="true" CodeFile="mineria2.aspx.cs" Inherits="ModGenerico_mineria" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <script>
        function carga()
        {
       //     var objdato = eval("(" + d("hdddatos").value + ")");
       //     var arr1 = new Array();
       //     for (k in objdato["respuesta"]) {
       //         var obj1 = new Object();
       //         obj1["indice"] = k;
       //         obj1["objetivo"] = objdato["respuesta"][k];
       //         arr1[arr1.length] = obj1;
       //     }
       //   //  var dtv = new vista(arr1, "", 'D', 'cantidad', 'true');
       ////     d("sp_palabras").innerText = dtv.length;

       //  //   d("sp_palabras2").innerText = objdato["cantidad_total"];

       //     var grilla = new grillajava();
       //     grilla.fuente = arr1;
       //     grilla.div = "div_grilla";
       //     grilla.id = "gwpalabras"
       //     grilla.autorow = true;
       //     grilla.habencabezado = true;
       //     grilla.clasetabla = "bordered";
       //     grilla.estilo = "itemlista";
       //     grilla.estilotabla = "width:98%";
       //     grilla.alternolista = "alternolista";
       //     grilla.propiedadestabla = "";
       //     grilla.estiloencabezado = "";
       //     grilla.encabezado = ["Palabra", "Cantidad"];
       //     grilla.datoscolumnas = ["palabra", "cantidad"];
       //     grilla.tipocolumna = ["0", "0"];
       //     grilla.funcioncolumna = ["", ""];
       //     grilla.ordenarencabezado = true;
       //     grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
       //     grilla.ordenarentero = ["", ""];

       //     grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
       //         "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
       //     grilla.bind();

            
            //var grilla = new grillajava();
            //grilla.fuente = objdato["datos"];
            //grilla.div = "div_grilla2";
            //grilla.id = "gwdatosorg"
            //grilla.autorow = true;
            //grilla.habencabezado = true;
            //grilla.clasetabla = "bordered";
            //grilla.estilo = "itemlista";
            //grilla.estilotabla = "width:98%";
            //grilla.alternolista = "alternolista";
            //grilla.propiedadestabla = "";
            //grilla.estiloencabezado = "";
            //grilla.encabezado = ["Palabra", "Cantidad"];
            //grilla.datoscolumnas = ["palabra", "cantidad"];
            //grilla.tipocolumna = ["0", "0"];
            //grilla.funcioncolumna = ["", ""];
            //grilla.ordenarencabezado = true;
            //grilla.imagentoogle = ["../Images/sort_asc.gif", "../Images/sort_desc.gif"];
            //grilla.ordenarentero = ["", ""];

            //grilla.estilocolumna = ["'width: 250px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal; '",
            //    "'width: 200px; text-align:center;font-family:Tahoma; font-size:13px; font-weight:normal'"];
            //grilla.bind();

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
 	                <div>
                         <span>Mensaje:</span>
                         <asp:TextBox ID="txt1" Width="500px" Rows="4" TextMode="MultiLine" runat="server"></asp:TextBox>
 	                </div>
                     <div>
                         <asp:Button ID="Button1" runat="server" Text="Clasificar" OnClick="Button1_Click" />
                         <asp:Button ID="Button2" runat="server" Text="Clasificar Base Mensajeria" OnClick="Button1_Click" />
                     </div>
                    <div>
                         <span>Clasificacion:</span>
                        <asp:Label ID="lblmin" runat="server" Text=""></asp:Label>
                    </div>
            	</fieldset>
       	</div>
    <asp:HiddenField ID="hdddatos" runat="server" />
</asp:Content>


