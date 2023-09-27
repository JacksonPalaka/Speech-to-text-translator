import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const [lan,setLan]=useState('English input')
    const [languages,setLanguages]= useState('en-IN')
    const handleSelect=()=>{
        if (languages==='en-IN'){
            setLanguages('hi-IN')
            setLan('Hindi input')
        } 
        if (languages==='hi-IN'){
            setLanguages('en-IN')
            setLan('English input')
        } 

    }


    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: languages });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    // const handleClick=()=>{
    //     console.log(transcript);
    //     alert(transcript)
    // }

    return (
        <>
            <div className="container">
                <h2>Speech to Text converter</h2>
                <br />
                <p>Give an input of Hindi/english from the microphone and you will get the text.</p>
                
                <button onClick={handleSelect}>{lan}</button>
                
                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    {/* <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button> */}

                    <button
                        // onTouchStart={startListening}
                        onMouseDown={startListening}
                        onTouchEnd={SpeechRecognition.stopListening}
                        onMouseUp={SpeechRecognition.stopListening}
                    >Hold to talk</button>
                    <button onClick={()=>window.location.reload()}>clear</button>
                    {/* <button onClick={handleClick}>set translation</button> */}
                </div>

            </div>

        </>
    );
};

export default App;