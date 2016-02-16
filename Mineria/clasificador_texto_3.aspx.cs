using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using libsvm;
using System.Collections;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Text;
using System.IO;


public partial class Mineria_clasificador_texto : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string path = Server.MapPath("");
        //string texto = File.ReadAllText(path + @"/datoscsv.csv", Encoding.Default);

        //List<string> x= new List<string>();
        //double[] y = null;
        //arreglar_dato(texto,ref x,ref y);
        string path = Server.MapPath("");
        Main2(path);

    }
    private static Dictionary<int, string> _predictionDictionary;

    static void Main2(string path)
    {
        // STEP 4: Read the data
        const string dataFilePath = @"D:\texto.csv";
        var dataTable = DataTable.New.ReadCsv(dataFilePath);
        List<string> x = dataTable.Rows.Select(row => row["Text"]).ToList();
        double[] y = dataTable.Rows.Select(row => double.Parse(row["IsSunny"]))
                                   .ToArray();

    
        string texto = File.ReadAllText(path + @"/datoscsv.csv", Encoding.Default);

        List<string> x2 = new List<string>();
        double[] y2 = null;
        arreglar_dato(texto, ref x2, ref y2);

        var vocabulary = x.SelectMany(GetWords).Distinct().OrderBy(word => word).ToList();

        var problemBuilder = new TextClassificationProblemBuilder();
        var problem = problemBuilder.CreateProblem(x, y, vocabulary.ToList());

        // If you want you can save this problem with : 
        // ProblemHelper.WriteProblem(@"D:\MACHINE_LEARNING\SVM\Tutorial\sunnyData.problem", problem);
        // And then load it again using:
        // var problem = ProblemHelper.ReadProblem(@"D:\MACHINE_LEARNING\SVM\Tutorial\sunnyData.problem");

        const int C = 1;
        var model = new C_SVC(problem, KernelHelper.LinearKernel(), C);



        var accuracy = model.GetCrossValidationAccuracy(10);
      //  Console.Clear();
       // Console.WriteLine(new string('=', 50));
       // Console.WriteLine("Accuracy of the model is {0:P}", accuracy);
      //  model.Export(string.Format(@"D:\MACHINE_LEARNING\SVM\Tutorial\model_{0}_accuracy.model", accuracy));

      //  Console.WriteLine(new string('=', 50));
     //   Console.WriteLine("The model is trained. \r\nEnter a sentence to make a prediction. (ex: sunny rainy sunny)");
     //   Console.WriteLine(new string('=', 50));

        string userInput;
        _predictionDictionary = new Dictionary<int, string> { { -1, "Rainy" }, { 1, "Sunny" } };
        
            userInput = "caries";
            var newX = TextClassificationProblemBuilder.CreateNode(userInput, vocabulary);

            var predictedY = model.Predict(newX);
          //  Console.WriteLine("The prediction is {0}", _predictionDictionary[(int)predictedY]);
          //  Console.WriteLine(new string('=', 50));
        

        Console.WriteLine("");
    }

    private static IEnumerable<string> GetWords(string x)
    {
        return x.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
    }
    public class TextClassificationProblemBuilder
    {
        public svm_problem CreateProblem(IEnumerable<string> x, double[] y, IReadOnlyList<string> vocabulary)
        {
            return new svm_problem
            {
                y = y,
                x = x.Select(xVector => CreateNode(xVector, vocabulary)).ToArray(),
                l = y.Length
            };
        }

        public static svm_node[] CreateNode(string x, IReadOnlyList<string> vocabulary)
        {
            var node = new List<svm_node>(vocabulary.Count);

            string[] words = x.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);

            for (int i = 0; i < vocabulary.Count; i++)
            {
                int occurenceCount = words.Count(s => String.Equals(s, vocabulary[i], StringComparison.OrdinalIgnoreCase));
                if (occurenceCount == 0)
                    continue;

                node.Add(new svm_node
                {
                    index = i + 1,
                    value = occurenceCount
                });
            }

            return node.ToArray();
        }


    }


    public static ArrayList arreglar_dato(string texto, ref List<string> x, ref double [] y)
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
                    "de","la","que","el","en","y","a","los","del","se","las","por","un","para","con","no","una","su","al","es","lo","como","más","pero","sus","le","ya","o","fue","este","ha","sí","porque","esta","cuando","muy","sín","sobre","ser","tíene","también","me","hasta","hay","donde","han","quien","están","estado","desde","todo","nos","durante","estados","todos","uno","les","ní","contra","otros","fueron","ese","eso","Habá","ante","ellos","e","esto","mí","antes","algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos","mucho","quienes","nada","sea","poco","ella","estar","haber","estas","estaba","estamos","algunas","algo","nosotros","mi","mis","Tú","te","tí","tu","tus","ellas","nosotras","vosotros","vosotas","os","mío","míos","mías","tuyo","tuya","tuyos","tuyas","nuestro","nuestra","nuestros","nuestras","vuestro","vuestra","vuestros","vuestras","esos","esas",
                    "estoy","estás","estamos","estais","están","esté","estés","estemos","estéis","estén","estaré","estarás","estará","estaremos","estaréis","estarán","estaría","estarías","estaríamos","estaríais","estarían","estaba","estabas","estabamos","estabais","estaban","estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron","estuviera","estuvieras","estuvieramos","estuvierais","estuvieran","estuviese","estuvieses","estuviésemos","estuvieseis","estuviesen","estando","estada","estados","estadas","estad",
                    "he","has","ha","hemos","habeís","hay","haya","hayas","hayamos","hayáis","hayan","habre","habrás","habrá","habremos","habréis","habrán","habría","habrías","habríamos","habríais","habrían","había","habías","habíamos","habíais","habían","hube","hubiste","hubo","hubimos","hubisteis","hubieron","hubiera","hubieras","hubiéramos","hubieraís","hubiesen","habiendo","habido","habidos","habidas",
                    "soy","eres","es","somos","soís","son","seas","seamos","seáis","será","seremos","seréis","serán","sería","serías","seríamos","seríais","serían","era","eras","éramos","erais","eran","fuí","fusite","fue","fuimos","fuisteis","fueron","fuera","fueras","fuéramos","fuerais","fueran","fuese","sueses","fuésemos","fuesen","siendo","sido",
                    "tengo","tienes","tiene","tenemos","tenéis","tienen","tenga","tengas","tengamos","tengáis","tengan","tendre","tendrás","tendrá","tendremos","tendréis","tendrán","tendría","tendrías","tendríamos","tendríais","tendrían","tenía","tenías","teníamos","tenían","tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron","tuviera","tuvieras","tuviéramos","tuvierais","tuvieran","tuviese","tuvieses","tuviésemos","tuvieseis","tuviesen","teniendo","tenido","tenida","tenidos","tenidas","tened"
        });
        //Fin Tokenizacion

        ArrayList arrdatos = new ArrayList();


        SortedList hs1 = new SortedList();
       
        ArrayList arrpalabras_clave = new ArrayList();
        int n = 0;
        int cantidad_sumados = 0;
        int cantidad_maxima = 0;
        ArrayList arrvalores_indice = new ArrayList();
        string objetivo = "";
        ArrayList arrobjetivo = new ArrayList();
        arrobjetivo.Add("*****palabraclave*****");
        arrpalabras_clave.Add("*****palabraclave*****");

        ArrayList arrvalores_ind_objetivo = new ArrayList();
        y = new double[valores.Length];
        while (n < valores.Length)
        {

            string[] arrtmp = valores[n].Replace("enterenterenter","").Split(',');
            objetivo = arrtmp[arrtmp.Length-1];
            int indice_objetivo=0;
            indice_objetivo = arrobjetivo.IndexOf(objetivo);
            if (indice_objetivo==-1)
            {
                indice_objetivo = arrobjetivo.Count;
                arrobjetivo.Add(objetivo);
            }
            arrvalores_ind_objetivo.Add(indice_objetivo);
            y[n] = indice_objetivo;

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
                        if(srpalabras[indice_palabra]==null)
                        {
                            srpalabras[indice_palabra] = 1;
                        }
                        else
                        {
                            srpalabras[indice_palabra] = (int)srpalabras[indice_palabra] + 1;
                        }
                        

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
                consolidado=consolidado+llave_ind+":"+srpalabras[llave_ind].ToString()+ " ";
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
}