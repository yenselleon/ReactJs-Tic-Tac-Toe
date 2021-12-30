/*
 **Todo
    - la funcion validEmptySquareWinningCombination no esta tomando el estado real del estado del por lo que no detecta las casillas que estan vacias


*/


const Modal = ({children, active})=> {


    return (
        <>
            <div id="overlay" className={active ? "active" : ""}>
                <div id="modal__wrapper">

                    <div id="children">
                        {
                            children
                        }
                    </div>

                </div>
            </div>
        
        </>

    )
}


const TicTacToe = (props)=> {

    let namePlayers = ['Player 1', 'Player 2'];

    const {
        setSquare,
        square,
        setWinner, 
        setEndGame,
        endGame,
        turn, 
        setTurn, 
        isComputerPlaying, 
        setIsOverlayActive,
        setModalView,
        isLoading,
        setIsLoading
    } = props;

    
    
    const [botCombination, setBotCombination] = React.useState([]);

    const [currentPlayer, setCurrentPlayer] = React.useState('Player 1');

    const winningPosibilities = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];

    //bot computer
    const botComputer = async()=> {
        
        let emptyWinningCombination = await validEmptySquareWinningCombination();
        console.log({emptyWinningCombination})

        //terminar turno bot para evitar loop
        setCurrentPlayer('Player 1')

        const isWinnigChance = await isWinningConbinationAvailable();
        if(isWinnigChance){
            console.log('isWinnigChance', isWinnigChance)
             return markSquare(isWinnigChance[2]);
        }

        const isWinnigMiddleChance = await isWinningMiddleConbinationAvailable();
        if(isWinnigMiddleChance){
            console.log('isWinnigMiddleChance', isWinnigMiddleChance)
             return markSquare(isWinnigMiddleChance[1]);
        }

        const blockWinningChance = await blockWinningCombination();
        if(blockWinningChance.length > 0){
            console.log('blockWinningChance', blockWinningChance)
            return markSquare(blockWinningChance[0][2]);
        }

        const blockWinningMiddleChance = await blockWinningCombinationMiddleChance();
        if(blockWinningMiddleChance.length > 0){
            console.log('blockWinningMiddleChance', blockWinningMiddleChance)
            return markSquare(blockWinningMiddleChance[0][1]);
        }

        const markSecondIndex = await continueWinningCombination();
        if(markSecondIndex){
            console.log('markSecondIndex', markSecondIndex)
            return markSquare(markSecondIndex[1]);
        }

        const isNotWinningPosibilities = await validEmptySquareWinningCombination();
        if(isNotWinningPosibilities.length === 0){
            let emptySquare = square.findIndex(square => square === "");
            console.log("isNotWinningPosibilities", emptySquare)
            return markSquare(emptySquare);
        }

        const emptySquare = await validEmptySquareWinningCombination();
        if(emptySquare.length > 0){
            console.log('emptySquare', emptySquare)
            return markSquare(emptySquare[0][0]);
        }

    }

    //Validar si hay algun ganador
    const validWinnerOrDraw = ()=> {

        let check = winningPosibilities.filter( winningCombination => {
            return (
                square[winningCombination[0]] == square[winningCombination[1]]
                &&
                square[winningCombination[1]] == square[winningCombination[2]]
                &&
                square[winningCombination[0]] != ''
              )
        })

        return check
    }

    
    const blockWinningCombination = ()=> {
        
        return new Promise((resolve, reject) => {
            let isNotComputer =  (turn === "X") ? "O" : "X"
            
            let blockCombinationFilter = winningPosibilities.filter( winningCombination => {
                return (
                    square[winningCombination[0]] === isNotComputer
                    &&
                    square[winningCombination[1]] === isNotComputer
                    &&
                    square[winningCombination[2]] === ""
                    )
                })
                
                resolve(blockCombinationFilter)
                
                    
                })
                
            }
            
            const blockWinningCombinationMiddleChance = ()=> {
                
                return new Promise((resolve, reject) => {
                    let isNotComputer =  (turn === "X") ? "O" : "X"
                    
                    let blockCombinationFilter = winningPosibilities.filter( winningCombination => {
                        return (
                            square[winningCombination[0]] === isNotComputer
                            &&
                            square[winningCombination[1]] === ""
                            &&
                            square[winningCombination[2]] === isNotComputer
                            )
                        })
                        
                        resolve(blockCombinationFilter)
                        
                            
                        })
                        
                    }
                    
                    const continueWinningCombination = ()=> {

                        return new Promise((resolve, reject) => {
                            
            let continueCombinationFilter = winningPosibilities.filter( winningCombination => {
                return (
                    square[winningCombination[0]] === turn
                    
                    )
            }).find((winningCombination) => {
                return (
                    square[winningCombination[0]] === turn 
                    && 
                    square[winningCombination[1]] === ""
                    &&
                    square[winningCombination[2]] === "" 
                    )
                })
                
                resolve(continueCombinationFilter)
                
                    
                })
                
            }
            
    const isWinningConbinationAvailable = ()=> {
        

        return new Promise((resolve, reject) => {


        let isWinningConbinationAvailableFilter = winningPosibilities.filter( winningCombination => {
            
            
            return (
                square[winningCombination[0]] === turn
                &&
                square[winningCombination[1]] === turn
                )
        }).find((winningCombination) => {
            return (
                square[winningCombination[0]] === turn 
                && 
                square[winningCombination[1]] === turn
                &&
                square[winningCombination[2]] === "" 
                )
        })

        resolve(isWinningConbinationAvailableFilter)
        
            
        })
    
    }

    const isWinningMiddleConbinationAvailable = ()=> {

        return new Promise((resolve, reject) => {
            
        let isWinningMiddleConbinationAvailableFilter = winningPosibilities.filter( winningCombination => {
            return (
                square[winningCombination[0]] === turn
                &&
                square[winningCombination[2]] === turn
                )
        }).find((winningCombination) => {
            return (
                square[winningCombination[0]] === turn 
                && 
                square[winningCombination[1]] === ""
                &&
                square[winningCombination[2]] === turn 
                )
        })

        resolve(isWinningMiddleConbinationAvailableFilter)
        
            
        })
    
    }

        
    //validar si hay combinaciones ganadoras disponibles
    const validEmptySquareWinningCombination = ()=> {
        
        return new Promise((resolve, reject) => {
            let computerIs = turn
            
            let winningCombinationFilter = winningPosibilities.filter( winningCombination => {
                return (
                    square[winningCombination[0]] === "" 
                    &&
                    square[winningCombination[1]] === "" 
                    &&
                    square[winningCombination[2]] === "" 
                    )
                })
                
                
                resolve(winningCombinationFilter)
                    
                })
                
            }

    const markSquare = async(index)=> {
        //Si no esta vacio no ejecuta el proceso
        if(square[index] !== ''){
            return
        }
        square[index] = turn;
        setSquare([...square])
        setTurn( turn === 'X' ? 'O' : 'X')

        //Si la computadora esta jugando iniciar la funcion correspondiente al bot
        if(isComputerPlaying && namePlayers.includes(currentPlayer)){
            console.log('isComputer')
            setCurrentPlayer('Computer');
        }

        
        if(!isComputerPlaying){
            setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2": "Player 1");
        }
        //Checkear si hay ganador
        let checkWinner = validWinnerOrDraw()
        
        
        if(square.every(square => square !== "") && !endGame){
            setWinner("Its a draw");
            setEndGame(true);
            setModalView("winner");
            return setIsOverlayActive(true);
        }
        
        //Si hay ganador 
        if(checkWinner.length > 0 && !endGame){
            let winnerOrDraw = validWinnerOrDraw()
            console.log("Gano")
            console.log({square, winnerOrDraw})
            setWinner(`${currentPlayer} Wins`);
            setEndGame(true);
            setModalView("winner");
            return setIsOverlayActive(true);
            /* setSquare(new Array(9).fill(''));
            setBotCombination([]) */
        }
    }
    
    React.useEffect(() => {
        if(currentPlayer === 'Computer'){
            
            botComputer();
        }   
       /*  return () => {
            if(currentPlayer === 'computer'){
                setCurrentPlayer('player1')
            }
        } */
    }, [currentPlayer])

    console.log({isLoading, botCombination})

    return (
        <>
            {
                square.map((square, i) => (
                    <button 
                        className={`square${i} btn__square`} 
                        onClick={()=>markSquare(i)} key={i}
                        disabled={isLoading}
                    >
                        {square}  
                    </button>
                ))
            }
        </>
    )

}



const App = ()=> {

    const [winner, setWinner] = React.useState("");
    const [endGame, setEndGame] = React.useState(false);
    const [isOverlayActive, setIsOverlayActive] = React.useState(true);
    const [modalView, setModalView] = React.useState("Welcome");
    const [turn, setTurn] = React.useState("");
    const [isComputerPlaying, setIsComputerPlaying] = React.useState(false);
    const [showPlayerInBoard, setShowPlayerInBoard] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [square, setSquare] = React.useState(new Array(9).fill(''));


    return(
        <>
            <section className="title">
                <h1><span>T</span>IC <span>T</span>AC <span>T</span>OE</h1>
                <div className="line__separate" />
            </section>
            <section className="board__players__section__wrapper">
                <div className="board__player">
                    <h1>Player 1</h1>
                    <div className="square__board">
                        {
                            showPlayerInBoard
                        }
                    </div>
                </div>
                <div className="board__player">
                    <h1>
                        {
                            isComputerPlaying
                            ?
                                "Computer"
                            :
                                "Player 2"
                        }
                    </h1>
                    <div className="square__board">
                        {
                            (showPlayerInBoard !== "")
                            ?  showPlayerInBoard === "X" ? "O" : "X"
                            :  ""
                        }
                    </div>
                </div>
            </section>
            <main>
                <Modal active={isOverlayActive}>
                    {
                        modalView === "Welcome"
                        &&
                            
                                <div className="wrapper__welcom__modal">
                                    <h1>SELECT GAME MODE</h1>
                                    <div className="welcom__modal__btn__group">

                                        <button 
                                            className="btn__select"
                                            onClick={()=> setModalView("Single Player")}
                                        >
                                            Two Players
                                        </button>

                                        <button 
                                            className="btn__select"
                                            onClick={()=> setModalView("Vs . Computer")}
                                        >
                                            Single Player
                                        </button>
                                    </div>
                                </div>
                    }
                    {
                        modalView === "Single Player"
                        &&
                            <>
                                <h1>Single Player Mode</h1>
                                <span>Would you like to be Player 1 </span>
                                <div className="welcom__modal__btn__group">
                                    <button 
                                        className="btn__select"
                                        onClick={()=> {
                                            setTurn("X")
                                            setShowPlayerInBoard("X")
                                            setIsOverlayActive(false)
                                        }}
                                    >
                                        X
                                    </button>

                                    <button 
                                        className="btn__select"
                                        onClick={()=> {
                                            setTurn("O")
                                            setShowPlayerInBoard("O")
                                            setIsOverlayActive(false)
                                        }}
                                    >
                                        O
                                    </button>
                                </div>
                            </>
                    }
                    {
                        modalView === "Vs . Computer"
                        &&
                            <>
                                <h1>Single Player Mode</h1>
                                <span>Would you like to be Player 1 </span>
                                <div className="welcom__modal__btn__group">
                                    <button 
                                        className="btn__select"
                                        onClick={()=> {
                                            setTurn("X")
                                            setShowPlayerInBoard("X")
                                            setIsComputerPlaying(true)
                                            setIsOverlayActive(false)
                                        }}
                                    >
                                        X
                                    </button>

                                    <button 
                                        className="btn__select"
                                        onClick={()=> {
                                            setTurn("O")
                                            setShowPlayerInBoard("O")
                                            setIsComputerPlaying(true)
                                            setIsOverlayActive(false)
                                        }}
                                    >
                                        O
                                    </button>
                                </div>
                            </>
                            
                    }
                    {
                        modalView === "winner"
                        &&
                            <div className="wrapper__restar__game__modal">
                                <h1>{winner}</h1>
                                <button 
                                    className="btn__select restar__game_btn"
                                    onClick={()=> {
                                        setSquare(new Array(9).fill(''))
                                        setWinner("")
                                        setTurn("")
                                        setEndGame(false)
                                        setShowPlayerInBoard("")
                                        setIsComputerPlaying(false)
                                        setModalView("Welcome")
                                    }}
                                >
                                    Restar Game
                                </button>
                            </div>
                    }
                </Modal>
                <div className="wrapper__tictactoe">
                    <TicTacToe
                        setWinner={setWinner}
                        setEndGame={setEndGame}
                        turn={turn}
                        setTurn={setTurn}
                        isComputerPlaying={isComputerPlaying}
                        setModalView={setModalView}
                        setIsOverlayActive={setIsOverlayActive}
                        endGame={endGame}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setSquare={setSquare}
                        square={square}
                    />

                </div>
            </main>
            <section className="design__by__wrapper">
                <span className="designBy">By Yensel Leon</span>

            </section>
        </>
    )

}

ReactDOM.render(<App/>, document.getElementById('root'));