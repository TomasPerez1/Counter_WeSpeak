import { getCounter } from '@actions/getCounter';
import Counter from './Counter';

export default async function Home() {
  const counter = await getCounter();
  
  return (
    <main className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-800">
      <Counter initialValue={counter.value}/>
    </main>
  )
}
