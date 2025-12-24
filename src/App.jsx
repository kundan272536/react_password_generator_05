import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [characterAllowed, setcharacterAllowed] = useState(true);
  const [numberAllowed, setnumberAllowed] = useState(true);
  const [password, setPassword] = useState("")
  const passwordRef=useRef();
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "~!#$%^&*(){}[];?/|"
    for (let i = 1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]);
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  },[password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 p-5 text-orange-500'>
        <h1 className='text-center my-3'>Password Generator with Number and Character</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-5 '>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 text-gray' placeholder='password' readOnly ref={passwordRef}/>
          <button className='cursor-pointer outline-none px-3 py-0.5 bg-blue-700 shrink-0' onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100}  value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"  defaultChecked={numberAllowed} onChange={()=>{setnumberAllowed((prev)=>(!prev))}}/>
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"  defaultChecked={characterAllowed} onChange={()=>{setcharacterAllowed((prev)=>!prev)}}/>
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
