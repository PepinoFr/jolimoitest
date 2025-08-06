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


app.get('/number/:number', (c) => {
  
  try {
    const numberParam = c.req.param('number');
  const numberRoman = toRoman(Number(numberParam));
  return c.json({
    message:numberRoman,
  } , 200)
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, 400);  
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
