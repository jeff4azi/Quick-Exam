import ProgressBar from "../components/ProgressBar"
import correctIcon from "../images/correctIcon.png"
import clockIcon from "../images/clock.png"

import { useNavigate } from "react-router-dom"

const ExamScreen = () => {
  const navigate = useNavigate();

  const gotoStartExam = () => navigate("/")
  return (
    <div className="">
      <div className='flex justify-between items-center my-7 mx-5'>
        <button onClick={gotoStartExam}  className='bg-gray-100 p-2 rounded-xl'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div className='font-medium absolute left-1/2 transform -translate-x-1/2'>02 of 10</div>
        <div>
          <div className='flex items-center justify-between gap-2 bg-white w-[100px] h-[35px] font-medium rounded-full px-3'>
            <div>
              <img className="size-6" src={clockIcon} alt="clockIcon" />
            </div>
            03:58
          </div>
        </div>
       
      </div>

      <div className="mx-5">
        <ProgressBar progress={20} />
      </div>

      <div className="bg-white mx-5 p-5 rounded-2xl my-7">
        <div className="text-gray-400 mb-2">EDU 101</div> {/* holds the course name */}
        <div className="text-xl font-medium mb-7">Who among the following doesn't have the record of the most World Cup?</div> {/* holds the question */}
        {/* options */}
        <div className="space-y-5">
          <button className="py-3 px-4 ring-2 ring-gray-300 rounded-xl w-full flex justify-between items-center">
            <span className="font-medium text-lg">Antonio Carbajal</span>{/* option */}
            <div>
              <img className="size-6" src={correctIcon} alt="icon" />
            </div>{/* icon */}
          </button>
          <button className="py-3 px-4 ring-2 ring-gray-300 rounded-xl w-full flex justify-between items-center">
            <span className="font-medium text-lg">Antonio Carbajal</span>{/* option */}
            <div>
              <img className="size-6" src={correctIcon} alt="icon" />
            </div>{/* icon */}
          </button>
          <button className="py-3 px-4 ring-2 ring-gray-300 rounded-xl w-full flex justify-between items-center">
            <span className="font-medium text-lg">Antonio Carbajal</span>{/* option */}
            <div>
              <img className="size-6" src={correctIcon} alt="icon" />
            </div>{/* icon */}
          </button>
          <button className="py-3 px-4 ring-2 ring-gray-300 rounded-xl w-full flex justify-between items-center">
            <span className="font-medium text-lg">Antonio Carbajal</span>{/* option */}
            <div>
              <img className="size-6" src={correctIcon} alt="icon" />
            </div>{/* icon */}
          </button>
        </div>
      </div>

      <div className="mx-7 flex justify-between items-center">
        <button className="bg-red-400 h-[50px] w-[150px] rounded-xl font-medium text-white">Previous</button>
        <button className="bg-green-400 h-[50px] w-[150px] rounded-xl font-medium text-white">Next</button>
      </div>
    </div>
  )
}

export default ExamScreen