import { Link } from "react-router-dom"
import { Button } from "../button"

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
        <h1 className="font-bold text-4xl text-center mt-10">
           <span className="text-blue-300 text-center mt-12"> Discover Your Next Adventure with AI </span> 
            <span>: Personal AI</span>
           
        </h1>

        <p className="text-xl text-gray-700 text-center">Your personalise trip planner. </p>

        <Link to="/create-trip">

            <Button>Get Started</Button>
        </Link>
    </div>
  )
}

export default Hero