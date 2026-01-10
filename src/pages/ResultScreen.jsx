import { useNavigate } from "react-router-dom"

const ResultScreen = ({results, setAnswers}) => {
  const navigate = useNavigate()

  return (
    <div className='h-[100dvh] max-h-screen p-7 flex flex-col justify-between'>
      {/* score */}
      <div className='bg-white flex flex-col justify-center items-center size-[220px] rounded-full place-self-center m-15 text-[#2563EB] border-2 '>
        <span className='font-medium opacity-55 -translate-y-1'>Your Score</span>
        <span className='text-5xl font-semibold -translate-y-2'>{Math.round((results.correct / 30) * 100)}<span className='text-3xl font-bold'>%</span></span>
      </div>

      {/* extra result details */}
      <div className='bg-white w-full p-7 grid grid-cols-2 gap-5 rounded-2xl'>
        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-[#2563EB] translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-[#2563EB]'>{results.answered}</span>
            Answered Questions
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-[#2563EB] translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-[#2563EB]'>30</span>
            Total Questions
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-green-500 translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-green-500'>{results.correct}</span>
            Correct
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-red-500 translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-red-500'>{results.wrong}</span>
            Wrong
          </div>
        </div>
      </div>

      {/* buttons for ... */}
      <div className='flex justify-between px-7 py-5 text-gray-600'>
        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-amber-400 rounded-full text-white' onClick={() => { navigate("/exam"); setAnswers([])}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
          Retake Test
        </div>
        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-red-400 rounded-full text-white' onClick={() => navigate("/review-answers")} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
          Review Answers
        </div>
        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-purple-400 rounded-full text-white' onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
          </div>
          Go Home
        </div>
      </div>
    </div>
  )
}

export default ResultScreen