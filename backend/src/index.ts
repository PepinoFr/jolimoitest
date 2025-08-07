import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';

const app = new Hono()
app.use(cors())

const romanNumerals: [number, string][] = [
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

 export function toRoman(num: number) : string {
  if (num < 1 || num > 100) {
    throw new Error("Number must be between 1 and 100");
  }

  return convert(num);
}

function convert(num: number): string {
  if (num === 0) return '';

  for (const [value, numeral] of romanNumerals) {
    if (num >= value) {
      return numeral + convert(num - value);
    }
  }
  return '';
}

app.get('/', (c) => {
  return c.text('Hello jollimoi !')
})


app.get('/sse/number/:number', async (c) => {
  const number = parseInt(c.req.param('number') || '0')

  if (isNaN(number) || number < 1 || number > 100) {
    return new Response('Mauvais numero', { status: 400 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const roman = toRoman(number)

      const message = `data: ${roman}\n\n`
      controller.enqueue(encoder.encode(message))
      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
