"use client"
import { useState } from 'react'
import { increment, decrement } from '@/actions/updateCounter';
import Image from 'next/image';

interface CounterProps {
  initialValue: number;
}

export default function Counter({ initialValue = 0 } : CounterProps) {
  const [value, setValue] = useState<number>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)

  const updateCounter = async (increase : boolean) => {
    try {
      setLoading(true)
      const newValue = increase ? await increment() : await decrement();
      setValue(newValue)
      setLoading(false)
    }
    catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-[70%]">
      <h1 className="text-3xl md:text-4xl font-bold  font-mono text-center border-b">Contador Persistente</h1>
      <div className="border-2 px-5 py-2 border-blue-900 bg-gray-700 rounded-full">
        {
          !loading // Loader para cada modificación del contador
            ? <p className="text-6xl font-semibold text-blue-600  mx-auto w-fit">
                {value}
              </p>
            : <p className="animate-spin py-2.5  text-blue-600  mx-auto w-fit">
                <Image
                  width={40}
                  height={40}
                  src="./restart-line.svg"
                  alt="loader"
                />
              </p>
        }
      </div>

      <div className='flex gap-4 md:gap-10 text-lg font-bold'>
          <button
          onClick={() => updateCounter(false)}
          disabled={loading || value <= 0} // Limite para evitar valores negativos
          className="px-3 py-1 h-fit bg-red-500 text-white rounded-md hover:bg-red-400 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          DECREMENT
        </button>
        __
        <button
          onClick={() => updateCounter(true)}
          disabled={loading}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400 hover:text-gray-300 transition-colors mb-4 disabled:opacity-50 disabled:pointer-events-none"
        >
          INCREMENT
        </button>
      </div>
    </div>
  )
}