import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
///////import readline from 'readline';

//import { Configuration, OpenAIApi } from "openai";
//const configuration = new Configuration({
//    organization: "org-D6bxJ0oEpJKcCxKzmI6ewjwO",
//    apiKey: process.env.OPENAI_API_KEY,
//});
//const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

const OpenAITextGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

  // send a request to the OpenAI API and set the response state
  /*const generateText = async () => {
    const prompt = "Your prompt here";
    const completions = await openai.Completion.create({
      engine: "davinci",
      prompt,
      max_tokens: 60,
      n: 1,
      stop: "\n",
    });
    const text = completions.choices[0].text;
    setResponse(text);
  };*/
    const configuration = new Configuration({
      organization: "org-D6bxJ0oEpJKcCxKzmI6ewjwO",
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    /*const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    userInterface.prompt();
    userInterface.on('line', async input => {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
              {"role": "system", "content": "You are a helpful assistant."},
              {"role": "user", "content": "Who won the world series in 2020?"},
              {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
              {"role": "user", "content": "Where was it played?"}
          ]
      })*.then((res) => {
          console.log('API called successfully. Returned data: ' + res.data.choices);
      }).catch((error) => {
          console.error(error);
      })*;
      console.log('API : ' + res.data.choices[0].message.content);
      userInterface.prompt();
    });*/
    const generateText = async () => {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
              {"role": "user", "content": prompt}
          ]
      }).then((res) => {
        setResponse(res.data.choices[0].message.content);console.log('API called successfully. Returned data: ' + res.data.choices);
      }).catch((error) => {
          console.error('AIE: '+error);
      });
    };
    /*const generateText = async () => {
        //const response = await openai.listEngines();
        await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
                'organization': "org-D6bxJ0oEpJKcCxKzmI6ewjwO",
                'apiKey': process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": prompt,
                "max_tokens": 7,
                "temperature": 0,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "logprobs": null,
                "stop": "\n"
            })
        })
        .then(response => response.json())
        .then(data => {setResponse(data);console.log(data)})
        .catch(error => console.log(error));
    };*/

  return (
    <div>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={generateText}>Generate Text</button>
      <div>{JSON.stringify(response)}</div>
    </div>
  );
};

export default OpenAITextGenerator;
