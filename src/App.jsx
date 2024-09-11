import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [passwordText, setPasswordText] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [isCharachterInclude, setIsCharachterInclude] = useState(false);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let strPass = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) strPass += "0123456789";
    if (isCharachterInclude) strPass += "!@#$%&^*(){}[]~";

    for (let i = 0; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * strPass.length + 1);
      password += strPass.charAt(char);
      setPasswordText(password);
    }
  }, [passwordLength, isCharachterInclude, isNumberAllowed, setPasswordText]);

  const handleCopyPasswordToClip = useCallback(() => {
    console.log("clip copied");
    console.log(passwordRef.current);
    /* this will select whole text area */
    passwordRef.current?.select();
    /* this will select the text area within some range. 
    it will text the text from 0 to 20
     */
    passwordRef.current?.setSelectionRange(0, 20);
    /* through this we can write down the text in window area */
    window.navigator.clipboard.writeText(passwordText);
  }, [passwordText]);
  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, isNumberAllowed, isCharachterInclude, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-screen-md mx-auto shadow-md rounded px-4 my-24 text-orange-300 bg-gray-700">
        <h2 className="text-4xl text-center text-amber-700 my-4 py-8">
          Password Generator
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            className="outline-none w-full py-4 px-4 my-10 rounded-xl text-xl text-teal-500"
            value={passwordText}
            readOnly
            placeholder="password area"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 shrink-0 my-10 rounded-xl"
            onClick={handleCopyPasswordToClip}
          >
            copy
          </button>
        </div>
        <div className="flex text-xl gap-x-16">
          <div className="flex items-center gap-x-1 my-4">
            <input
              type="range"
              min={6}
              max={100}
              value={passwordLength}
              className="cursor-pointer"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <label>Length : {passwordLength}</label>
          </div>
          <div className="flex items-center gap-x-1 my-4">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1 my-4">
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={isCharachterInclude}
              onChange={() => setIsCharachterInclude((prev) => !prev)}
            />
            <label htmlFor="numberInput">Charchter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
