import React from 'react';
import bomb from './bomb.svg';
import './App.css';
import MainBody from "./MainBody";
import {bombNum, shuffle} from "./helpers";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
              table: Array (100).fill(1).map((el)=>({bomb: false, marked: false, value:null,clicked:"wall",numColour:null})),
            gameOn:false,
            gameState: {state:false, result:"no",lastInd: null},
            timerId: undefined,
            timer:new Date(),
            stepCounter:0,
        }
    }

    putBombs(){
        const gameState=this.state.gameState;
        let numPool = [];
        for (let i=0;i<100;i++)
            numPool.push(i);
        let randomResult = shuffle(numPool);
        const table=this.state.table;
        for (let i=0;i<10;i++) {
            let k=randomResult[i];
            table[k].bomb = true;
        }
        gameState.state=true;
        this.setState({...this.state, table, gameState});
    }

    isWinner(){
        const table=this.state.table;
        const gameState=this.state.gameState;
        for (let i=0; i<100;i++){
            if((table[i].bomb && !table[i].marked)||(!table[i].bomb && table[i].marked)) {
                gameState.result="found";
                break;
            }
        }
        if  (gameState.result==="found")
            gameState.result="no";
        else {
            gameState.result = "win";
            gameState.state=false;
            clearInterval(this.state.timerId)
        }
        this.setState({...this.state, gameState});
    }

    putMark(index){
     const table=this.state.table;
     let stepCounter=this.state.stepCounter;
     if (null!=table[index].clicked){
         if ("wall"===table[index].clicked)
             {
                 table[index].clicked="flag";
                 table[index].marked=true;
             }
         else {
             table[index].clicked="wall";
             table[index].marked=false;
           }
         }
        stepCounter++;
        this.setState({...this.state,stepCounter,table});
     }

     fieldCleaner(){
         const table = this.state.table;
         let stepCounter=this.state.stepCounter;
         for(let i=0;i<100; i++) {
             table[i].bomb = false;
             table[i].marked= false;
             table[i].value = null;
             table[i].clicked = "wall";
         }
         const gameState =this.state.gameState;
         gameState.lastInd=null;
         gameState.result="no";
         gameState.state=false;
         stepCounter=0;
         this.setState({...this.state, table, gameState, stepCounter});
     }
     setTimer(){
       let timer=this.state.timer;
       let timerId=this.state.timerId;
       timer.setHours(0,0, 0, 0);
       timerId=setInterval(()=>{timer.setSeconds(timer.getSeconds() + 1);  this.setState({...this.state, timer, timerId});}, 1000);

     }
    getValue (index){
        const table = this.state.table;
        if (this.state.gameState.state && !table[index].marked) {
            const gameState = this.state.gameState;
            let stepCounter=this.state.stepCounter;
            if ("wall" === table[index].clicked) {
                if (!table[index].bomb) {
                    table[index].value = bombNum(table, index);
                    table[index].clicked = null;
                } else {
                    table[index].clicked ="bomb";
                    gameState.state = false;
                    gameState.result = "fail";
                    gameState.lastInd = index;
                    clearInterval(this.state.timerId)

                }
                if (table[index].value!==null)
                    if (table[index].value===0)
                        table[index].numColour="black";
                        else if (table[index].value===1)
                        table[index].numColour="blue";
                    else if (table[index].value===2)
                        table[index].numColour="red";
                    else
                        table[index].numColour="crimson";
                //gameState.result = "win";
                stepCounter++;
                this.setState({...this.state, table, gameState, stepCounter})
            }
        }
    }


  render() {
    return (
        <div className={"App"}>
          <header className="App-header">

              <MainBody {...this.state}
                        putBombs={()=>this.putBombs()}
                        putMark={(index)=>this.putMark(index)}
                        getValue={(index)=>this.getValue(index)}
                        isWinner={()=>this.isWinner()}
                        fieldCleaner={()=>this.fieldCleaner()}
                        setTimer={()=>this.setTimer()}
                        clearInterval={()=>this.clearInterval()}
              />
            <img src={bomb} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
        </div>
    );
  }
}

export default App;
