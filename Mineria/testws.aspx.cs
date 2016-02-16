using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

public partial class Mineria_testws : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        InvokeRequestResponseService().Wait();
    }
    public class StringTable
    {
        public string[] ColumnNames { get; set; }
        public string[,] Values { get; set; }
    }

    static async Task InvokeRequestResponseService()
    {
        using (var client = new HttpClient())
        {
            var scoreRequest = new
            {

                Inputs = new Dictionary<string, StringTable>() { 
                        { 
                            "input1", 
                            new StringTable() 
                            {
                                ColumnNames = new string[] {"age", "workclass", "fnlwgt", "education", "education-num", "marital-status", "occupation", "relationship", "race", "sex", "capital-gain", "capital-loss", "hours-per-week", "native-country", "income"},
                                Values = new string[,] {  { "28", "Private", "338409", "Bachelors", "13", "Married-civ-spouse", "Prof-specialty", "Wife", "Black", "Female", "0", "0", "40", "Cuba", "value" }  }
                            }
                        },
                                        },

                GlobalParameters = new Dictionary<string, string>()
                {
                }
            };
            const string apiKey = "ipzYJXleUG6BTzkAcTfrrBLcvEE7XLFs28hVOHRXsZCMDEIqyRoHBQDV16TJB8LoTq7oY4d9mgmXPKsLq6nn+w=="; // Replace this with the API key for the web service
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            client.BaseAddress = new Uri("https://ussouthcentral.services.azureml.net/workspaces/f05b36fa1fa84506a4f7d1fd20e5b879/services/5ed21bc4d8134ab7a6984eb9a5660ad1/execute?api-version=2.0&details=true");

            // WARNING: The 'await' statement below can result in a deadlock if you are calling this code from the UI thread of an ASP.Net application.
            // One way to address this would be to call ConfigureAwait(false) so that the execution does not attempt to resume on the original context.
            // For instance, replace code such as:
            //      result = await DoSomeTask()
            // with the following:
            //      result = await DoSomeTask().ConfigureAwait(false)


            HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest);

            if (response.IsSuccessStatusCode)
            {
                string result = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Result: {0}", result);
            }
            else
            {
                Console.WriteLine(string.Format("The request failed with status code: {0}", response.StatusCode));

                // Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
                Console.WriteLine(response.Headers.ToString());

                string responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseContent);
            }
        }
    }
}



   