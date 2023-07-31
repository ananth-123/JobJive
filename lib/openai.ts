const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
})

declare global {
  // eslint-disable-next-line no-var
  var cachedOpenAI
}

let openAI
if (process.env.NODE_ENV === "production") {
  openAI = new OpenAIApi(configuration)
} else {
  if (!global.cachedOpenAI) {
    global.cachedOpenAI = new OpenAIApi(configuration)
  }
  openAI = global.cachedOpenAI
}

export const openai = openAI
