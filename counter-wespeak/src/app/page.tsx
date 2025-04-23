import { getCounter } from '@actions/getCounter'
import { increment, decrement } from '../actions/updateCounter'

export default async function Home() {
  const counter = await getCounter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <h1 className="text-4xl font-bold mb-4">Contador Persistente</h1>

      <div className="text-6xl font-semibold text-blue-600 mb-8">
        {counter?.value ?? 0}
      </div>

      <form action={increment}>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mb-4"
          type="submit"
        >
          Incrementar
        </button>
      </form>

      <form action={decrement}>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          type="submit"
        >
          Decrementar
        </button>
      </form>
    </main>
  )
}
