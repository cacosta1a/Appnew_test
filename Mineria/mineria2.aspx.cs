using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections;
using System.Data;
using System.Web.Script.Serialization;
using System.Globalization;
using Accord.Math.Differentiation;

public partial class ModGenerico_mineria : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            string path = Server.MapPath("");
            string texto = File.ReadAllText(path + @"/datoscsv.csv", Encoding.Default);


            ArrayList arrpalabras_clave = new ArrayList();
            Hashtable hsentrenado = entrena_texto(texto, ref arrpalabras_clave);

            //Session["arrpalabras_clave"] = arrpalabras_clave;
            //Session["hsentrenado"] = hsentrenado;

            funcionesbasicas fn = new funcionesbasicas("consulta", "");
            fn.argumentos[0] = "select  md.serial_mensajeria_detalle,md.mensaje from dba_mensajeria_detalle md where md.serial_categoria_auditoria is null and md.serial_prm IN(35258 , 32887 , 22982 , 21367) ";
            fn.Ejecutar();

            int n = 0;
            while (n < fn.dts.Tables[0].Rows.Count)
            {
                string serial_mensajeria_detalle = fn.dts.Tables[0].Rows[n]["serial_mensajeria_detalle"].ToString();

                string mensaje = fn.dts.Tables[0].Rows[n]["mensaje"].ToString();
                int resp = clasifica(mensaje, arrpalabras_clave, hsentrenado);
                if (resp == 0)
                    resp = 19;

                funcionesbasicas fn2 = new funcionesbasicas("consulta", "");
                fn2.argumentos[0] = "update dba_mensajeria_detalle  set serial_categoria_auditoria=" + resp + " where serial_mensajeria_detalle=" + serial_mensajeria_detalle;
                fn2.Ejecutar();

                n++;
            }
        }

        //var ob1 = new
        //{
        //    respuesta = hsindice_palabras
        //    //datos = arrdatos2
        //};

        //var s1 = new JavaScriptSerializer();
        //s1.MaxJsonLength = 100000000;
        //string s2 = s1.Serialize(ob1);

       // hdddatos.Value = s2;
    
    }

    public int clasifica(string cadena_digitada, ArrayList arrpalabras_clave, Hashtable hsentrenado)
    {
        int indice=0;
        string ntexto = limpia_texto(cadena_digitada);

        //Borrar Stopwords
        ArrayList arrpalabras_descartadas = new ArrayList(new[] {
                	"de","se","a","en","del","este","a","la","para","al","ya","lo"
                    ,"que","sin","es","cual","e","m","le","el","con","por","ante","bajo","de",
                    "sobre","tras","las","esta","si",
                    "de","la","que","el","en","y","a","los","del","se","las","por","un","para","con","una","su","al","es","lo","como","más","pero","sus","le","ya","o","fue","este","ha","sí","porque","esta","cuando","muy","sín","sobre","ser","tíene","también","me","hasta","hay","donde","han","quien","están","estado","desde","todo","nos","durante","estados","todos","uno","les","ní","contra","otros","fueron","ese","eso","Habá","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","sea","poco","ella","estar","haber","estas","estaba","estamos","algunas","algo","nosotros","mi","mis","Tú","te","tí","tu","tus","ellas","nosotras","vosotros","vosotas","os","mío","míos","mías","tuyo","tuya","tuyos","tuyas","nuestro","nuestra","nuestros","nuestras","vuestro","vuestra","vuestros","vuestras","esos","esas",
                    "estoy","estás","estamos","estais","están","esté","estés","estemos","estéis","estén","estaré","estarás","estará","estaremos","estaréis","estarán","estaría","estarías","estaríamos","estaríais","estarían","estaba","estabas","estabamos","estabais","estaban","estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron","estuviera","estuvieras","estuvieramos","estuvierais","estuvieran","estuviese","estuvieses","estuviésemos","estuvieseis","estuviesen","estando","estada","estados","estadas","estad",
                    "he","has","ha","hemos","habeís","hay","haya","hayas","hayamos","hayáis","hayan","habre","habrás","habrá","habremos","habréis","habrán","habría","habrías","habríamos","habríais","habrían","había","habías","habíamos","habíais","habían","hube","hubiste","hubo","hubimos","hubisteis","hubieron","hubiera","hubieras","hubiéramos","hubieraís","hubiesen","habiendo","habido","habidos","habidas",
                    "soy","eres","es","somos","soís","son","seas","seamos","seáis","será","seremos","seréis","serán","sería","serías","seríamos","seríais","serían","era","eras","éramos","erais","eran","fuí","fusite","fue","fuimos","fuisteis","fueron","fuera","fueras","fuéramos","fuerais","fueran","fuese","sueses","fuésemos","fuesen","siendo","sido",
                    "tengo","tienes","tiene","tenemos","tenéis","tienen","tenga","tengas","tengamos","tengáis","tengan","tendre","tendrás","tendrá","tendremos","tendréis","tendrán","tendría","tendrías","tendríamos","tendríais","tendrían","tenía","tenías","teníamos","tenían","tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron","tuviera","tuvieras","tuviéramos","tuvierais","tuvieran","tuviese","tuvieses","tuviésemos","tuvieseis","tuviesen","teniendo","tenido","tenida","tenidos","tenidas","tened"
        });
        string cadena_indices = "";
        ArrayList arrdistancias = new ArrayList();
        string[] arrntexto=ntexto.Split(' ');
        int n = 0;
        //m006m008m009m001m002m003m004m005m006
        while (n < arrntexto.Length)
        {
            double menor_distancia = 999999;
            int indice_menor = 0;
            string palabra = arrntexto[n];

            if (arrpalabras_descartadas.IndexOf(palabra) == -1)
            {
                int m = 1;
                while (m < arrpalabras_clave.Count)
                {
                    string palabra_ref = arrpalabras_clave[m].ToString();
                    double dif = Accord.Math.Distance.Levenshtein(palabra, palabra_ref);
                    if (dif < menor_distancia)
                    {
                        menor_distancia = dif;
                        indice_menor = m;
                    }
                    arrdistancias.Add(dif);
                    m++;
                }
                string indice_cadena = "";
                if (indice_menor < 10)
                    indice_cadena = "m00" + indice_menor;
                else if (indice_menor < 100)
                    indice_cadena = "m0" + indice_menor;
                else if (indice_menor < 1000)
                    indice_cadena = "m" + indice_menor;

                cadena_indices = cadena_indices + indice_cadena;
            }
            n++;
        }
        //Armo la cadena_indices: m001m002m003m002m004m002m006m009m004m187m159m002m145m186m002m188m009m004m151m189m071m002m018m004m051m025m026m006m027m001

        foreach (int llave in hsentrenado.Keys)
        {
            ArrayList arrregla = (ArrayList)hsentrenado[llave];
            int ir = 0;
            while(ir<arrregla.Count)
            {
                string regla = arrregla[ir].ToString();
                bool resp = Regex.IsMatch(cadena_indices, regla);
                if (resp==true)
                {
                    indice = llave;
                }
                ir++;
            }

        }

        return indice;
    }
    public string limpia_texto(string texto)
    {
        texto = texto.Replace('"', ' ').Replace('-', ' ').Replace('(', ' ').Replace(')', ' ').Replace(",","");
        string pattern = "";
        string replacement = " ";
        pattern = "[!'$%&/=?¡¿><_*.:]";
        texto = Regex.Replace(texto, pattern, replacement);
        texto = texto.Replace("\r\n", "");
        pattern = "\\s+";
        texto = Regex.Replace(texto, pattern, replacement);

        string consignos = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        string sinsignos = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        for (int v = 0; v < sinsignos.Length; v++)
        {
            string i = consignos.Substring(v, 1);
            string j = sinsignos.Substring(v, 1);
            texto = texto.Replace(i, j);
        }
        texto = texto.ToLower();


        //Fin Tokenizacion

        return texto;
    }
    public Hashtable entrena_texto(string texto, ref ArrayList arrpalabras_clave)
    {
     

        ArrayList x = new ArrayList();
        ArrayList y = new ArrayList();
        SortedList hsindice_objetivo = new SortedList();
        SortedList hsindice_palabras = new SortedList();
       // ArrayList arrpalabras_clave = new ArrayList();

        /*
        1	no se evidencia caries
        2	no se evidencia lesion cervical
        3	cambio de superficie
        4	solicitud de informacion
        5	relacion imagen correcta
        6	soporte deficiente
        7	solicitud diagnostico
        8	solicitud pronostico
        9	codigo incorrecto
        10	restauracion desadaptada
        11	restauracion adaptada
        12	imagen relacionada no es optima
        13	requiere informe de auditoria
        14	tratamiento no indicado
        15	soporte adicional
        16	imagen fecha vencida
        17	icdas
        18	autorizado
        19  otros
         * 
         * 
         */

        /*
         * 
         * 
         * */
        Hashtable hscadena_entrenada = new Hashtable(){
                //{1, new ArrayList(new[] {
                //     "[(@@no@@)(@@ni@@)]([m][0-9]{3}){0,5}(@@caries@@)"})},
                {2, new ArrayList(new[] {
                	 "[(@@no@@)(@@ni@@)]([m][0-9]{3}){0,5}(@@lesion@@)([m][0-9]{3}){0,2}(@@cervical@@)"})},
                {3, new ArrayList(new[] {
                	 "(@@superficies@@)(@@indicadas@@)",
                     "(@@cambiar@@)(@@superficie@@)",
                })},
                {4, new ArrayList(new[] {
                	 "(@@solicita@@)(@@informacion@@)"})},
                {5, new ArrayList(new[] {
                	 "(@@relacionar@@)([m][0-9]{3}){0,2}(@@imagen@@)([m][0-9]{3}){0,2}(@@correcta@@)"})},
                {6, new ArrayList(new[] {
                	  "(@@soporte@@)([m][0-9]{3}){0,2}(@@deficiente@@)"})},
                {7, new ArrayList(new[] {
                     "(@@solicita@@)([m][0-9]{3}){0,2}(@@diagnostico@@)"})},
                {8, new ArrayList(new[] {
                	 "(@@solicita@@)([m][0-9]{3}){0,2}(@@pronostico@@)"})},
                {9, new ArrayList(new[] {
                	 "(@@solicita@@)([m][0-9]{3}){0,1}(@@ingresar@@)([m][0-9]{3}){0,5}(@@codigo@@)"})},
                {10, new ArrayList(new[] {
                	 "(@@desadaptada@@)"})},
                {11, new ArrayList(new[] {
                	"(@@adaptada@@)"})},
                {12, new ArrayList(new[] {
                	 "[(@@imagen@@)]([m][0-9]{3}){0,2}(@@no@@)([m][0-9]{3}){0,4}(@@optima@@)"})},
                {13, new ArrayList(new[] {
                     "[(@@requiere@@)]([m][0-9]{3}){0,2}(@@informe@@)([m][0-9]{3}){0,4}(@@auditoria@@)"})},
                {14, new ArrayList(new[] {
                	 "(@@indicado@@)"})},
                {15, new ArrayList(new[] {
                	 "(@@soporte@@)([m][0-9]{3}){0,2}(@@adicional@@)"})},
                {16, new ArrayList(new[] {
                	 "[(@@imagen@@)(@@imagenes@@)]([m][0-9]{3}){0,6}(@@vencida@@)"})},
                {17, new ArrayList(new[] {
                	  "(@@icdas@@)"})},
                {18, new ArrayList(new[] {
                	 "(@@autorizado@@)"})},
                {20, new ArrayList(new[] {
                	 "(@@ausente@@)"})},
                {21, new ArrayList(new[] {
                	 "(@@cerro@@)([m][0-9]{3}){0,6}(@@caso@@)"})},
                {22, new ArrayList(new[] {
                	  "(@@rechazado@@)([m][0-9]{3}){0,6}(@@previamente@@)"})},
                {23, new ArrayList(new[] {
                	  "(@@nueva imagen@@)([m][0-9]{3}){0,6}(@@diagnostico@@)"})}
        };
        arreglar_dato(texto, ref x, ref y, ref hsindice_objetivo, ref hsindice_palabras, ref arrpalabras_clave);
        foreach (int llave in hscadena_entrenada.Keys)
        {
            ArrayList arrint = (ArrayList)hscadena_entrenada[llave];
            int n = 0;
            while (n < arrint.Count)
            {
                string cadena = arrint[n].ToString();
                string cadena2 = cadena;
                int m = 0;
                int caracter_recorrido = 0;
                while (m < 1000)
                {
                    if (caracter_recorrido < cadena.Length)
                    {
                        int indice1 = cadena.IndexOf("@@", caracter_recorrido);
                        if (indice1 != -1)
                        {
                            caracter_recorrido = indice1;
                            int indice2 = cadena.IndexOf("@@", caracter_recorrido + 2);
                            string palabra = cadena.Substring(indice1 + 2, indice2 - indice1 - 2);
                            int indice_palabra = arrpalabras_clave.IndexOf(palabra);
                            string indice_cadena = "";
                            if (indice_palabra < 10)
                                indice_cadena = "m00" + indice_palabra;
                            else if (indice_palabra < 100)
                                indice_cadena = "m0" + indice_palabra;
                            else if (indice_palabra < 1000)
                                indice_cadena = "m" + indice_palabra;
                            cadena2 = cadena2.Replace("@@" + palabra + "@@", indice_cadena);

                            caracter_recorrido = indice2 + 1;

                        }
                        else
                            break;
                    }
                    else
                        break;
                    m++;
                }
                arrint[n] = cadena2;
                n++;
            }
        }
        return hscadena_entrenada;

    }

    public static ArrayList arreglar_dato
        (string texto, ref ArrayList x, ref ArrayList y,
        ref SortedList hsindice_objetivo, ref SortedList hsindice_palabras, ref ArrayList arrpalabras_clave)
    {
        //Retorna palabras clave y cantidad en total en documento
        bool eliminar_numeros = true;
        bool contar_misma_frase_misma_palabra = true;

        //Tokenizacion
        texto = texto.Replace('"', ' ').Replace('-', ' ').Replace('(', ' ').Replace(')', ' ');
        string pattern = "";
        string replacement = " ";
        pattern = "[!'$%&/=?¡¿><_*.:]";
        texto = Regex.Replace(texto, pattern, replacement);
        texto = texto.Replace("\r\n", "enterenterenter");
        texto = texto.Replace(",enterenterenter", "");

        pattern = "\\s+";
        texto = Regex.Replace(texto, pattern, replacement);

        string consignos = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        string sinsignos = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        for (int v = 0; v < sinsignos.Length; v++)
        {
            string i = consignos.Substring(v, 1);
            string j = sinsignos.Substring(v, 1);
            texto = texto.Replace(i, j);
        }
        texto = texto.ToLower();

        MatchCollection m1 = Regex.Matches(texto, "enterenterenter");
        String[] stringSeparators = { "enterenterenter" };
        //   txtchar.Text = m1.Count.ToString();
        string[] valores = texto.Split(stringSeparators, m1.Count, StringSplitOptions.RemoveEmptyEntries);


        //Borrar Stopwords
        ArrayList arrpalabras_descartadas = new ArrayList(new[] {
                	"de","se","a","en","del","este","a","la","para","al","ya","lo"
                    ,"que","sin","es","cual","e","m","le","el","con","por","ante","bajo","de",
                    "sobre","tras","las","esta","si",
                    "de","la","que","el","en","y","a","los","del","se","las","por","un","para","con","una","su","al","es","lo","como","más","pero","sus","le","ya","o","fue","este","ha","sí","porque","esta","cuando","muy","sín","sobre","ser","tíene","también","me","hasta","hay","donde","han","quien","están","estado","desde","todo","nos","durante","estados","todos","uno","les","ní","contra","otros","fueron","ese","eso","Habá","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","sea","poco","ella","estar","haber","estas","estaba","estamos","algunas","algo","nosotros","mi","mis","Tú","te","tí","tu","tus","ellas","nosotras","vosotros","vosotas","os","mío","míos","mías","tuyo","tuya","tuyos","tuyas","nuestro","nuestra","nuestros","nuestras","vuestro","vuestra","vuestros","vuestras","esos","esas",
                    "estoy","estás","estamos","estais","están","esté","estés","estemos","estéis","estén","estaré","estarás","estará","estaremos","estaréis","estarán","estaría","estarías","estaríamos","estaríais","estarían","estaba","estabas","estabamos","estabais","estaban","estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron","estuviera","estuvieras","estuvieramos","estuvierais","estuvieran","estuviese","estuvieses","estuviésemos","estuvieseis","estuviesen","estando","estada","estados","estadas","estad",
                    "he","has","ha","hemos","habeís","hay","haya","hayas","hayamos","hayáis","hayan","habre","habrás","habrá","habremos","habréis","habrán","habría","habrías","habríamos","habríais","habrían","había","habías","habíamos","habíais","habían","hube","hubiste","hubo","hubimos","hubisteis","hubieron","hubiera","hubieras","hubiéramos","hubieraís","hubiesen","habiendo","habido","habidos","habidas",
                    "soy","eres","es","somos","soís","son","seas","seamos","seáis","será","seremos","seréis","serán","sería","serías","seríamos","seríais","serían","era","eras","éramos","erais","eran","fuí","fusite","fue","fuimos","fuisteis","fueron","fuera","fueras","fuéramos","fuerais","fueran","fuese","sueses","fuésemos","fuesen","siendo","sido",
                    "tengo","tienes","tiene","tenemos","tenéis","tienen","tenga","tengas","tengamos","tengáis","tengan","tendre","tendrás","tendrá","tendremos","tendréis","tendrán","tendría","tendrías","tendríamos","tendríais","tendrían","tenía","tenías","teníamos","tenían","tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron","tuviera","tuvieras","tuviéramos","tuvierais","tuvieran","tuviese","tuvieses","tuviésemos","tuvieseis","tuviesen","teniendo","tenido","tenida","tenidos","tenidas","tened"
        });
        //Fin Tokenizacion

        ArrayList arrdatos = new ArrayList();


        SortedList hs1 = new SortedList();

        //ArrayList arrpalabras_clave = new ArrayList();
        int n = 0;
        int cantidad_sumados = 0;
        int cantidad_maxima = 0;
        ArrayList arrvalores_indice = new ArrayList();
        string objetivo = "";
        ArrayList arrobjetivo = new ArrayList();
        arrobjetivo.Add("*****palabraclave*****");
        arrpalabras_clave.Add("*****palabraclave*****");

        ArrayList arrvalores_ind_objetivo = new ArrayList();
      
        while (n < valores.Length)
        {

            string[] arrtmp = valores[n].Replace("enterenterenter", "").Split(',');
            objetivo = arrtmp[arrtmp.Length - 1];
            int indice_objetivo = 0;
            indice_objetivo = arrobjetivo.IndexOf(objetivo);
            if (indice_objetivo == -1)
            {
                indice_objetivo = arrobjetivo.Count;
                arrobjetivo.Add(objetivo);
            }
            arrvalores_ind_objetivo.Add(indice_objetivo);
            y.Add(indice_objetivo);
            hsindice_objetivo[indice_objetivo.ToString()] = objetivo;

            arrtmp[arrtmp.Length - 1] = "";
            string temp = String.Join("", arrtmp);
            temp = temp.Replace(",", "").Replace(".", "");
            Hashtable hs2 = new Hashtable();
            hs2["dato"] = temp;
            arrdatos.Add(hs2);

            string[] arr1 = temp.Split(' ');
            ArrayList arragregados = new ArrayList();
            //Por frase
            SortedList srpalabras = new SortedList();
            int m = 0;
            while (m < arr1.Length)
            {

                if (arr1[m].Trim() != "")
                {
                    bool agrega = false;
                    if (((arragregados.IndexOf(arr1[m]) == -1) || (contar_misma_frase_misma_palabra == true))
                        && (arrpalabras_descartadas.IndexOf(arr1[m]) == -1)
                        && (arr1[m].Length != 1)
                        )
                        agrega = true;

                    Int64 int64Val;
                    if (eliminar_numeros == true)
                    {
                        if (Int64.TryParse(arr1[m], NumberStyles.Number, null, out int64Val))
                        {
                            agrega = false;
                        }
                    }
                    if (agrega == true)
                    {
                        arragregados.Add(arr1[m]);
                        int indice_palabra = arrpalabras_clave.IndexOf(arr1[m]);
                        if (indice_palabra == -1)
                        {
                            indice_palabra = arrpalabras_clave.Count;
                            arrpalabras_clave.Add(arr1[m]);
                            hs1[arr1[m]] = 1;
                            cantidad_sumados++;
                        }
                        else
                        {
                            hs1[arr1[m]] = Convert.ToInt32(hs1[arr1[m]].ToString()) + 1;
                            cantidad_sumados++;
                        }
                        if (srpalabras[indice_palabra] == null)
                        {
                            srpalabras[indice_palabra] = 1;
                        }
                        else
                        {
                            srpalabras[indice_palabra] = (int)srpalabras[indice_palabra] + 1;
                        }

                        hsindice_palabras[indice_palabra.ToString()] = arr1[m].ToString();
                        if (Convert.ToInt32(hs1[arr1[m]].ToString()) > cantidad_maxima)
                        {
                            cantidad_maxima = Convert.ToInt32(hs1[arr1[m]].ToString());
                        }
                    }
                }
                m++;
            }
            arrvalores_indice.Add(srpalabras);
            string consolidado = "";
            foreach (int llave_ind in srpalabras.Keys)
            {
                consolidado = consolidado + llave_ind + ":" + srpalabras[llave_ind].ToString() + " ";
            }
            if (consolidado.Length > 0)
                consolidado = consolidado.Substring(0, consolidado.Length - 1);

            x.Add(consolidado);
            n++;
        }

        return arrvalores_indice;
        //texto = Regex.Replace(texto, pattern, replacement);
        // txttemp.Text = texto;

    }

    public void mineria_texto(string texto)
    {
        bool eliminar_numeros = true;
        int cantidad_grupos_calculos_frecuencia = 10;
        int cantidad_iteraciones_grupos_calculos_frecuencia = 500;

        //Tokenizacion
        texto = texto.Replace('"', ' ').Replace('-', ' ').Replace('(', ' ').Replace(')', ' ');
        string pattern = "";
        string replacement = " ";
        pattern = "[!'$%&/=?¡¿><_*.:]";
        texto = Regex.Replace(texto, pattern, replacement);
        texto = texto.Replace("\r\n", "enterenterenter");
        pattern = "\\s+";
        texto = Regex.Replace(texto, pattern, replacement);

        string consignos = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        string sinsignos = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        for (int v = 0; v < sinsignos.Length; v++)
        {
            string i = consignos.Substring(v, 1);
            string j = sinsignos.Substring(v, 1);
            texto = texto.Replace(i, j);
        }
        texto = texto.ToLower();

        MatchCollection m1 = Regex.Matches(texto, "enterenterenter");
        String[] stringSeparators = { "enterenterenter" };
        //   txtchar.Text = m1.Count.ToString();
        string[] valores = texto.Split(stringSeparators, m1.Count, StringSplitOptions.RemoveEmptyEntries);


        //Borrar Stopwords
        ArrayList arrpalabras_descartadas = new ArrayList(new[] {
                	"de","se","a","en","del","este","a","la","para","al","ya","lo"
                    ,"que","sin","es","cual","e","m","le","el","con","por","ante","bajo","de",
                    "sobre","tras","las","esta","si",
                    "de","la","que","el","en","y","a","los","del","se","las","por","un","para","con","no","una","su","al","es","lo","como","más","pero","sus","le","ya","o","fue","este","ha","sí","porque","esta","cuando","muy","sín","sobre","ser","tíene","también","me","hasta","hay","donde","han","quien","están","estado","desde","todo","nos","durante","estados","todos","uno","les","ní","contra","otros","fueron","ese","eso","Habá","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","sea","poco","ella","estar","haber","estas","estaba","estamos","algunas","algo","nosotros","mi","mis","Tú","te","tí","tu","tus","ellas","nosotras","vosotros","vosotas","os","mío","míos","mías","tuyo","tuya","tuyos","tuyas","nuestro","nuestra","nuestros","nuestras","vuestro","vuestra","vuestros","vuestras","esos","esas",
                    "estoy","estás","estamos","estais","están","esté","estés","estemos","estéis","estén","estaré","estarás","estará","estaremos","estaréis","estarán","estaría","estarías","estaríamos","estaríais","estarían","estaba","estabas","estabamos","estabais","estaban","estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron","estuviera","estuvieras","estuvieramos","estuvierais","estuvieran","estuviese","estuvieses","estuviésemos","estuvieseis","estuviesen","estando","estada","estados","estadas","estad",
                    "he","has","ha","hemos","habeís","hay","haya","hayas","hayamos","hayáis","hayan","habre","habrás","habrá","habremos","habréis","habrán","habría","habrías","habríamos","habríais","habrían","había","habías","habíamos","habíais","habían","hube","hubiste","hubo","hubimos","hubisteis","hubieron","hubiera","hubieras","hubiéramos","hubieraís","hubiesen","habiendo","habido","habidos","habidas",
                    "soy","eres","es","somos","soís","son","seas","seamos","seáis","será","seremos","seréis","serán","sería","serías","seríamos","seríais","serían","era","eras","éramos","erais","eran","fuí","fusite","fue","fuimos","fuisteis","fueron","fuera","fueras","fuéramos","fuerais","fueran","fuese","sueses","fuésemos","fuesen","siendo","sido",
                    "tengo","tienes","tiene","tenemos","tenéis","tienen","tenga","tengas","tengamos","tengáis","tengan","tendre","tendrás","tendrá","tendremos","tendréis","tendrán","tendría","tendrías","tendríamos","tendríais","tendrían","tenía","tenías","teníamos","tenían","tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron","tuviera","tuvieras","tuviéramos","tuvierais","tuvieran","tuviese","tuvieses","tuviésemos","tuvieseis","tuviesen","teniendo","tenido","tenida","tenidos","tenidas","tened"
        });
        //Fin Tokenizacion

        ArrayList arrdatos = new ArrayList();


        Hashtable hs1 = new Hashtable();
        ArrayList arrvalores = new ArrayList();
        int n = 0;
        int cantidad_sumados = 0;
        int cantidad_maxima = 0;

        while (n < valores.Length)
        {
            string temp = valores[n].Replace(",", "").Replace(".", "");
            Hashtable hs2 = new Hashtable();
            hs2["dato"] = temp;
            arrdatos.Add(hs2);

            string[] arr1 = temp.Split(' ');
            ArrayList arragregados = new ArrayList();
            int m = 0;
            while (m < arr1.Length)
            {
                if (arr1[m].Trim() != "")
                {
                    bool agrega = false;
                    if ((arragregados.IndexOf(arr1[m]) == -1)
                        && (arrpalabras_descartadas.IndexOf(arr1[m]) == -1)
                        && (arr1[m].Length != 1)
                        )
                        agrega = true;

                    Int64 int64Val;
                    if (eliminar_numeros == true)
                    {
                        if (Int64.TryParse(arr1[m], NumberStyles.Number, null, out int64Val))
                        {
                            agrega = false;
                        }
                    }
                    if (agrega == true)
                    {
                        arragregados.Add(arr1[m]);
                        if (hs1[arr1[m]] == null)
                        {
                            hs1[arr1[m]] = 1;
                            cantidad_sumados++;
                        }
                        else
                        {
                            hs1[arr1[m]] = Convert.ToInt32(hs1[arr1[m]].ToString()) + 1;
                            cantidad_sumados++;
                        }

                        if (Convert.ToInt32(hs1[arr1[m]].ToString()) > cantidad_maxima)
                        {
                            cantidad_maxima = Convert.ToInt32(hs1[arr1[m]].ToString());
                        }
                    }
                }
                m++;
            }

            n++;
        }
        ArrayList arrvaloresconteo = new ArrayList();
        double promedio = 0;
        foreach (string llave in hs1.Keys)
        {
            promedio = promedio + Convert.ToInt32(hs1[llave].ToString());
            arrvaloresconteo.Add(Convert.ToInt32(hs1[llave].ToString()));
        }
        promedio = promedio / hs1.Count;


        double vz = 0;
        double desv = desviacion_estandar_varianza(arrvaloresconteo, promedio, ref vz);

        Hashtable hscolumnas = new Hashtable();
        foreach (string llave in hs1.Keys)
        {
            if (Convert.ToInt32(hs1[llave].ToString()) > desv)
                hscolumnas[llave] = Convert.ToInt32(hs1[llave].ToString());
        }

        ArrayList arrcalculado = new ArrayList();
        ArrayList arrdatos2 = new ArrayList();
        n = 0;
        while (n < arrdatos.Count)
        {
            Hashtable hsfil = (Hashtable)arrdatos[n];
            string[] arrpalabras = hsfil["dato"].ToString().Split(' ');

            Hashtable hs2 = new Hashtable();
            hs2["0texto"] = hsfil["dato"].ToString();

            foreach (string llave in hscolumnas.Keys)
            {
                //Algoritmo ID
                double dato = 0;
                if (Array.IndexOf(arrpalabras, llave) != -1)
                    dato = Math.Log10(Convert.ToDouble(arrdatos.Count) / Convert.ToDouble(hscolumnas[llave].ToString()));

                if (dato != 0)
                    arrcalculado.Add(dato);

                hs2[llave] = dato;
            }
            arrdatos2.Add(hs2);
            n++;
        }

        //arrcalculado.Clear();
        //arrcalculado.Add(1);
        //arrcalculado.Add(5);
        //arrcalculado.Add(8);
        //arrcalculado.Add(15);
        //arrcalculado.Add(99);
        //arrcalculado.Add(1);
        //arrcalculado.Add(3);
        //arrcalculado.Add(1500);
        //arrcalculado.Add(2);

        ArrayList arrreferencias = new ArrayList();
        ArrayList arr3 = kmeans_1d(cantidad_grupos_calculos_frecuencia,
            arrcalculado, 500, ref arrreferencias);

        arrreferencias.Sort();
        var ob1 = new
        {
            respuesta = hscolumnas,
            cantidad_total = desv,
            //datos = arrdatos2
        };

        var s1 = new JavaScriptSerializer();
        s1.MaxJsonLength = 100000000;
        string s2 = s1.Serialize(ob1);

       // hdddatos.Value = s2;
        //texto = Regex.Replace(texto, pattern, replacement);
        // txttemp.Text = texto;

    }
    public double desviacion_estandar_varianza(ArrayList arrvaloresconteo, double valor_promedio, ref double valor_varianza)
    {
        double valor_desviacion = 0;
        double valor_tmp = 0;
        int n = 0;
        while (n < arrvaloresconteo.Count)
        {
            valor_tmp = valor_tmp + Math.Pow((Convert.ToDouble(arrvaloresconteo[n]) - valor_promedio), 2);
            n++;
        }

        valor_tmp = valor_tmp / (arrvaloresconteo.Count - 1);
        valor_varianza = valor_tmp;
        valor_desviacion = Math.Sqrt(valor_tmp);

        return valor_desviacion;

    }

    public ArrayList kmeans_1d(int cantidad_clusters, ArrayList arrdatos, int iteraciones, ref ArrayList arrgrupos_referencias)
    {

        arrdatos.Sort();

        ArrayList arrgrupos = new ArrayList();
        ArrayList arrgrupos_indices = new ArrayList();
       // ArrayList arrgrupos_referencias = new ArrayList();
        ArrayList arrgrupos_referencias_anteriores = new ArrayList();

        int numero_reg = 0;
        int n = 0;
        while (n < cantidad_clusters)
        {
            arrgrupos_referencias.Add(arrdatos[numero_reg]);
            arrgrupos_referencias_anteriores.Add(arrdatos[numero_reg]);
            ArrayList arrdatos_grupos= new ArrayList();
            arrgrupos.Add(arrdatos_grupos);

            ArrayList arrind_grupos = new ArrayList();
            arrgrupos_indices.Add(arrind_grupos);

            numero_reg = numero_reg + arrdatos.Count / 10;
            n++;
        }
        n = 0;
        while (n < iteraciones)
        {
            int m = 0;
            while (m < arrdatos.Count)
            {

                double valor_dato = Convert.ToDouble(arrdatos[m].ToString());
                //No es utilizado como indice

                int indice_grupo_cercano = -1;
                double diferencia_minima=999999;
                    
                int g = 0;
                while (g < arrgrupos_referencias.Count)
                {
                    double valor_grupo_ref = Convert.ToDouble(arrgrupos_referencias[g]);
                    double dif = Math.Abs(valor_grupo_ref - valor_dato);

                    if (dif < diferencia_minima)
                    {
                        indice_grupo_cercano = g;
                        diferencia_minima = dif;
                    }

                    g++;
                }


                ArrayList arrdatosgrupo3 = (ArrayList)arrgrupos[indice_grupo_cercano];
                arrdatosgrupo3.Add(valor_dato);
                arrgrupos[indice_grupo_cercano] = arrdatosgrupo3;

                ArrayList arrindicegrupo3 = (ArrayList)arrgrupos_indices[indice_grupo_cercano];
                arrindicegrupo3.Add(m);
                arrgrupos_indices[indice_grupo_cercano] = arrindicegrupo3;



                m++;

            }
            //arrgrupos.Add(arrdatos[n]);
            int ng = 0;
            while (ng < arrgrupos.Count)
            {
                ArrayList arrdatos_calc = (ArrayList)arrgrupos[ng];
                double dpromedio = 0;
                if (arrdatos_calc.Count>0)
                    dpromedio=promedio_arr(arrdatos_calc);
                else
                    dpromedio = Convert.ToDouble(arrgrupos_referencias_anteriores[ng].ToString());

                arrgrupos_referencias[ng] = dpromedio;
                ng++;
            }
            bool iguales = true;
            ng = 0;
            while (ng < arrgrupos.Count)
            {
                double ref1 = Convert.ToDouble(arrgrupos_referencias[ng].ToString());
                double ref2 = Convert.ToDouble(arrgrupos_referencias_anteriores[ng].ToString());

                if (ref1 != ref2)
                {
                    iguales = false;
                    break;
                }
                ng++;
            }
            if (iguales == true)
                break;
            else
            {
                 ng = 0;
                 while (ng < arrgrupos.Count)
                 {
                     ArrayList arrdatos_grupos = (ArrayList)arrgrupos[ng];
                     ArrayList arrindice_grupos = (ArrayList)arrgrupos_indices[ng];

                     arrdatos_grupos.Clear();
                     arrindice_grupos.Clear();
                     arrgrupos[ng] = arrdatos_grupos;
                     arrgrupos_indices[ng] = arrindice_grupos;

                     arrgrupos_referencias_anteriores[ng] = arrgrupos_referencias[ng];
                     ng++;
                 }
            }

            n++;
        }

        int cant_dec_ult = 0;
        int nr = 0;
        while (nr < arrgrupos_referencias.Count-1)
        {
            double dvalor1 = (double)arrgrupos_referencias[nr];
            double dvalor2 = (double)arrgrupos_referencias[nr+1];

            double dif1 = Math.Abs(dvalor2 - dvalor1);

            int cant_dec = 1;
            while (cant_dec<100)
            {
                dif1 = dif1 * 10;
                if (dif1 > 1)
                {
                    break;
                }
                cant_dec++;
            }
            cant_dec_ult = cant_dec;
            double nvalor = Math.Round(dvalor1, cant_dec);
            arrgrupos_referencias[nr] = nvalor;
            nr++;
        }
        double dvalor_u = (double)arrgrupos_referencias[arrgrupos_referencias.Count-1];
        double nvalor_u = Math.Round(dvalor_u, cant_dec_ult);
        arrgrupos_referencias[arrgrupos_referencias.Count - 1] = nvalor_u;

        //dpromedio_ref = dpromedio_ref / arrgrupos_referencias.Count;
        //double resolucion = dpromedio_ref / arrgrupos_referencias.Count;

        //int cantidad_decimales = 0;
        //while (cantidad_decimales<100)
        //{
        //    int iresolucion = Convert.ToInt32(resolucion);
        //    if (resolucion == iresolucion)
        //        break;

        //    resolucion = resolucion * 10;
        //    cantidad_decimales++;
        //}
        



        return arrgrupos;

    }
    public double promedio_arr(ArrayList arrgr)
    {
        double dpromedio = 0;
        int i = 0;
        while(i<arrgr.Count)
        {
            dpromedio = dpromedio + Convert.ToDouble(arrgr[i].ToString());
            i++;
        }
        dpromedio = dpromedio / Convert.ToDouble(arrgr.Count);

        return dpromedio;
    }
    public double distancia_euclidiana(Hashtable hs1, Hashtable hs2, ArrayList arrcolumnas_nocompara)
    {
        double distancia = 0;


        return distancia;
    }
    public double magnitud(Hashtable hs1,ArrayList arrcolumnas_nocompara)
    {
        double mag = 0;


        return mag;
    }
     public double media(ArrayList arrdatos_grupo, ArrayList arrcolumnas_nocompara)
     {
         double med = 0;

         return med;
     }
     protected void Button1_Click(object sender, EventArgs e)
     {
         ArrayList arrpalabras_clave = (ArrayList)Session["arrpalabras_clave"];
         Hashtable hsentrenado = (Hashtable)Session["hsentrenado"];

         funcionesbasicas fn= new funcionesbasicas("consulta","");
         fn.argumentos[0] = "select  md.serial_mensajeria_detalle,md.mensaje from dba_mensajeria_detalle md where md.serial_categoria_auditoria is null and md.serial_prm IN(35258 , 32887 , 22982 , 21367)";
         fn.Ejecutar();

         int n = 0;
         while(n<fn.dts.Tables[0].Rows.Count)
         {
             string serial_mensajeria_detalle = fn.dts.Tables[0].Rows[n]["serial_mensajeria_detalle"].ToString();

             string mensaje = fn.dts.Tables[0].Rows[n]["mensaje"].ToString();
             int resp = clasifica(mensaje, arrpalabras_clave, hsentrenado);
             if (resp == 0)
                 resp = 19;

             funcionesbasicas fn2 = new funcionesbasicas("consulta", "");
             fn2.argumentos[0] = "update dba_mensajeria_detalle  set serial_categoria_auditoria=" + resp + " where serial_mensajeria_detalle=" + serial_mensajeria_detalle;
             fn2.Ejecutar();

             n++;
         }

      
     // lblmin.Text = resp.ToString();    
     }
}