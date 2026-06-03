import { streamText, UIMessage, convertToModelMessages, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai'


export async function GET(req: Request) {
    try {
      const openai = createOpenAI({apiKey:process.env.OPENAI_KEY,})
      const { text } = await generateText({
          model: openai('o4-mini'),
        prompt: 'What is love?',
    });
    return Response.json({
          success: true,
        message: 'internal server error',
          text
      },{status:200})
  } catch (error) {
      console.log('internal server error', error)
      return Response.json({
          success: false,
          message:'internal server error'
      },{status:500})
  }

  
}