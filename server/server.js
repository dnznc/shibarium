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
    const prompt = `
      What is Shibarium blockchain?

      Shibarium is a blockchain platform that allows users and developers to create novel uses of an existing blockchain infrastructure. One example is Ethereum, which has a native cryptocurrency known as ether (ETH). But the Ethereum blockchain also allows the creation of smart contracts and programmable tokens used in initial coin offerings (ICOs), and non-fungible tokens (s). These are all built up around the Ethereum infrastructure and secured by nodes on the Ethereum network.

      What is the purpose of Shibarium blockchain?

      The Shibarium blockchain is designed to provide a secure and transparent platform for the creation and exchange of digital assets. It is also intended to serve as a foundation for the development of decentralized applications (dapps).

      How is Shibarium blockchain different from other blockchains?

      Shibarium blockchain is different from other blockchains because it is designed for businesses. It has a faster transaction speed and lower fees than other blockchains, making it ideal for businesses that want to use blockchain technology.

      What are the benefits of using Shibarium blockchain?

      There are many benefits of using Shibarium blockchain. Some of the key benefits include:

      1. Security: The Shibarium blockchain is a secure and tamper-proof platform that can be used to store and transmit sensitive data.

      2. Transparency: The blockchain is a transparent platform that allows users to track all transactions and activities.

      3. Efficiency: The blockchain is a fast and efficient platform that can be used to process transactions quickly and easily.

      4. Cost-effective: The blockchain is a cost-effective platform that allows businesses to save money on transaction fees.

      How is Shibarium blockchain decentralized?

      Shibarium blockchain is decentralized because it is not controlled by any one entity. Instead, it is maintained by a network of computers that all have a copy of the blockchain. This ensures that the blockchain is tamper-proof and cannot be manipulated by any one party.

      How is Shibarium blockchain secure?

      The Shibarium blockchain is secured by a proof-of-stake algorithm that requires users to stake their Shibarium tokens in order to participate in the network. This helps to secure the network by ensuring that users have a vested interest in its success. In addition, the Shibarium blockchain is also secured by a network of nodes that help to validate transactions and keep the blockchain up-to-date.
      
      ${req.body.question}
      Answer:`;

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || '
