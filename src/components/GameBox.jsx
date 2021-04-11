import React, { useEffect, useState } from 'react';

const GameBox = () => {
    const originalText = 'Some text';
    // let borderColor = '#4A948F';
    // let usagePermission = false;
    const [usagePermission, setUsagePermission] = useState(false);

    const [borderColor, setBorderColor] = useState('#4A948F');

    const [counterMicroSeconds, setCounterMicroSeconds] = useState(0);
    const [counterMilliSeconds, setCounterMilliSeconds] = useState(0);
    const [counterSeconds, setCounterSeconds] = useState(0);
    const [counterMinutes, setCounterMinutes] = useState(0);
    const [status, setStatus] = useState("paused");

    const [textAreaValue, setTextAreaValue] = useState('');
    let textEnteredLenght = textAreaValue.length;
    

    
    const timerStart = () => {

        if (textEnteredLenght === 1) {
            setStatus("working");
        }
    }

    // Timer
    useEffect(() => {
        let counterMicroSecondsID, counterMilliSecondsID, counterSecondsID, counterMinutesID;
        if (status === "working") {
            counterMicroSecondsID = setTimeout(() => setCounterMicroSeconds(counterMicroSeconds + 1),10);
            counterMilliSecondsID = setTimeout(() => setCounterMilliSeconds(Math.floor(counterMicroSeconds - (counterSeconds * 100) - (counterMinutes * 6000))));
            counterSecondsID = setTimeout(() => setCounterSeconds(Math.floor((counterMicroSeconds/100) - (counterMinutes * 60))));
            counterMinutesID = setTimeout(() => setCounterMinutes(Math.floor((counterMicroSeconds/100)/60)));
        }
        return () => {
            clearTimeout(counterMicroSecondsID, counterMilliSecondsID, counterSecondsID, counterMinutesID);
        };
    }, [counterMicroSeconds, counterSeconds, counterMinutes, status]);




    const stopTimers = () => {
        setStatus("paused");
    };

    const spellCheck = event => {
        setTextAreaValue(event.target.value);
        let originalTextMatch = '';
        originalTextMatch = originalText.substring(0, textEnteredLenght+1);

        if (event.target.value === originalText) {
            stopTimers();
            setBorderColor('green');
            setUsagePermission(true);
        } else {
            if (event.target.value === originalTextMatch) {
                setBorderColor('blue');
            } else {
                setBorderColor('orange');
            }
        }
    }



    const reset = () => {
        setTextAreaValue('');
        setStatus("paused");
        setCounterMicroSeconds(0);
        setCounterMilliSeconds(0);
        setCounterSeconds(0);
        setCounterMinutes(0);
        setUsagePermission(false);
    }


    return(
        <>
        <div className="original-text">
            <p>{originalText}</p>
        </div>
        <div className="text-box">
            <textarea
                style={{borderColor: borderColor}} 
                name="" 
                id="" 
                rows="6" 
                placeholder="The clock starts when you start typing."
                onChange={spellCheck}
                onKeyUp={timerStart}
                value={textAreaValue}
                readOnly={usagePermission}>
            </textarea>
        </div>
        <div className="meta">
            <div className="clock">
                <div className="timer">
                    {counterMinutes <= 9 ? '0' + counterMinutes : counterMinutes} 
                    :{counterSeconds <= 9 ? '0' + counterSeconds : counterSeconds} 
                    :{counterMilliSeconds <= 9 ? '0' + counterMilliSeconds : counterMilliSeconds}
                </div>
            </div>
            <button 
                className="reset"
                onClick={reset}
            >Start over
            </button>
        </div>
        </>      
    )
}


export default GameBox;




    // //Mili
    // useEffect(() => {
    //     let counterMilliSecondsID;
    //         counterMilliSecondsID = setTimeout(() => setCounterMilliSeconds(Math.floor(counterMicroSeconds - (counterSeconds * 100) - (counterMinutes * 6000))));
    //     return () => {
    //         clearTimeout(counterMilliSecondsID);
    //     }
    // }, [counterMicroSeconds])

    // //Seconds
    // useEffect(() => {
    //     let counterSecondsID;
    //     counterSecondsID = setTimeout(() => setCounterSeconds(Math.floor((counterMicroSeconds/100) - (counterMinutes * 60))));
    //     return () => {
    //         clearTimeout(counterSecondsID);
    //     }
    // }, [counterMilliSeconds])

    // //Minutes
    // useEffect(() => {
    //     let counterMinutesID;
    //         counterMinutesID = setTimeout(() => setCounterMinutes(Math.floor((counterMicroSeconds/100)/60)));
    //     return () => {
    //         clearTimeout(counterMinutesID);
    //     }
    // }, [counterSeconds])