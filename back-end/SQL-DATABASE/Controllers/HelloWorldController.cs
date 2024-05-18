using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Models;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace SQL_DATABASE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {
        public class InputModel
        {
            public string Text { get; set; } 
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostText(InputModel input)
        {
            try
            {
                const string APIKEY = ""; // Remember to manage your API keys securely
                var api = new OpenAI_API.OpenAIAPI(APIKEY);
                var chat = api.Chat.CreateConversation(); // Assuming this is a valid method from a custom library
                chat.Model = Model.ChatGPTTurbo;
                chat.AppendUserInput(input.Text);
                var response = await chat.GetResponseFromChatbotAsync(); // Assuming this is a valid method
                return Ok(response); // Using Ok to explicitly return HTTP 200 status code
            }
            catch (Exception ex)
            {
                return BadRequest($"Error initializing conversation: {ex.Message}");
            }
        }

    }
}
