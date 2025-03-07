import { Button } from "../button"

function Header() {
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-2"> 
        <img src='/logo.png' width={100}/>
        <div>
            <Button>Sign Up</Button>
        </div>

    </div>
  )
}

export default Header