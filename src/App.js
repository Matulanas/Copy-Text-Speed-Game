import './App.css';

import GameBox from './components/GameBox';
import Tops from './components/Tops';


function App() {

    let child = 'parent';

    const handler = (value) => {

        child = value;
        console.log(child);
        // console.log('handleris');
    }
    // console.log(child);

    return (
        <div className="App">
            <header>
                <div className="header-title"><h1>Test Your Typing Speed</h1></div>
            </header>
            <div className="intro">
                <p>
                    This is a typing test. Your goal is to duplicate the provided text, exactly, 
                    in the field below. The timer starts when you start typing, and only stops 
                    when you match text exactly. Good Luck!
                </p>    
            </div>
            <main>
                <GameBox childValue={handler}/>
                <Tops />
            </main>
        </div>
    );
}

export default App;
