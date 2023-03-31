import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Shibarium!'
  })
})

app.post('/', async (req, res) => {
  try {
    const context = `Shibarium is a blockchain platform designed for businesses. It provides a secure and transparent platform for the creation and exchange of digital assets, as well as a foundation for the development of decentralized applications. Shibarium blockchain is faster, has lower fees, and is tamper-proof, thanks to its decentralized nature.

      Shibarium blockchain is secured by a proof-of-stake algorithm that requires users to stake their Shibarium tokens to participate in the network, and by a network of nodes that help to validate transactions and keep the blockchain up-to-date.`;

    const prompt = `${context} ${req.body.prompt}`;

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
