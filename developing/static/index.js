const ConstClass = {
  alarm: "Error! Enter an OpenAI API-KEY!",
};

async function get_users_question() {
  return new Promise((res) => {
    chrome.storage.sync.get(["request"], (items) => {
      const users_question = items["request"];
      res(users_question.toString());
    });
  });
}

const question_HTML = document.getElementById("request");
const answer_HTML = document.getElementById("answer");

const question = (async () => {
  const users_question = await get_users_question();
  question_HTML.innerText = JSON.parse(users_question);
  return JSON.parse(users_question);
})();

async function get_API() {
  return new Promise((res) => {
    chrome.storage.sync.get(["API-KEY"], (items) => {
      const api_key = items["API-KEY"];
      if (api_key === undefined) {
        res(undefined);
      }
      res(api_key.toString());
    });
  });
}

(async () => {
  const api_key = await get_API();
  if (api_key === undefined) {
    answer_HTML.innerText = ConstClass.alarm;
  } else {

    const openai_response = (
      async () => {
        return await get_answer(api_key, question);
      }
    )();
    
    openai_response
      .then((response) => {
        answer_HTML.innerText = response;
      })
      .catch((error) => {
        answer_HTML.innerText = ConstClass.alarm;
        console.log(error);
      });
    
  }
})();

async function get_answer(api_key) {
  return new Promise((res, rej) => {
    const endpoint = "https://api.openai.com/v1/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key.slice(1, -1)}` ,
    };

    const data = {
      model: "text-davinci-003",
      prompt: question_HTML.innerText,
      max_tokens: 2000,
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const answer = data.choices[0].text;
        res(answer);
      })
      .catch((error) => rej(error));
  });
}
