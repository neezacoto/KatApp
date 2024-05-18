using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Models;
using System;
using System.Text.Json;
using System.Threading.Tasks;
//using static SQL_DATABASE.Controllers.CatJsonController;

namespace SQL_DATABASE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CatJsonController : ControllerBase
    {

        public class CatJson
        {
            public string Text { get; set; }
            public string Name { get; set; }
            public string Age { get; set; }
            public string Breed { get; set; }
            public string Bio { get; set; }
            public string Diet { get; set; }
            public string MedicalHistory { get; set; } 
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostJson(CatJson input)
        {
            try
            {
                const string APIKEY = ""; // Remember to manage your API keys securely
                var api = new OpenAI_API.OpenAIAPI(APIKEY);
                var jsonChat = api.Chat.CreateConversation(); // Assuming this is a valid method from a custom library
                jsonChat.Model = Model.ChatGPTTurbo;
                jsonChat.AppendUserInput($"This is the what the json should include: {JsonSerializer.Serialize(input)}. Based on the input, {input.Text}, fill in the cat profile in JSON format. If it is unknown, just return empty string");
                var jsonResponse = await jsonChat.GetResponseFromChatbotAsync(); // Assuming this is a valid method
                return Ok(jsonResponse);
                //return Ok(JsonSerializer.Serialize(jsonResponse)); // Serialize the response directly here
            }
            catch (Exception ex)
            {
                return BadRequest($"Error initializing conversation: {ex.Message}");
            }
        }
    }
}
