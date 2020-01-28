import React from "react";
import bom from './bom.svg';
import bomb from './bomb.svg';
import visualisation from './visualization.svg';
import shockwave from './shockwave.svg';
import pin from './pin.svg';
import heart from './heart.svg';
export default function MainBody(props) {
    const table=props.table;
    const isWin=props.gameState.result;
    const clearInterval=(props.gameState.state!=true)? props.clearInterval : "";
    const field=table.map((tField, index)=>
        <td
            key={index}
        > {
            <button  disabled={!props.gameState.state}  className="square"
                    onContextMenu={(event) => {
                        event.preventDefault();
                        props.putMark(index);
                        props.isWinner();
                    }}
                    onClick={(event) => props.getValue(index)}
            >
                {(isWin==="win") ? (
                    (tField.bomb) ?
                        <img src={bom} className="Button-icon"/>
                        : <img src={heart} className="Button-icon"/>)
                    :
                    ( (tField.clicked === "wall") ?
                              <img src={visualisation} className="Button-icon"/>
                              :    ( (tField.clicked==="flag") ?
                                             <img src={pin}  className="Button-icon" />
                                             : ( (tField.clicked === "bomb") ?
                                                        <img src={shockwave} className="Button-icon" /> : ""
                                               )
                                   )
                    )
                }
                {(null !== tField) ?
                    <div className="Number" style={{color: tField.numColour}} >
                        {tField.value}
                    </div>: ""
                }
            </button>
        }
        </td>
    );
    let i=0;
    const tableFiller=Array(10).fill(1).map((tField, index)=>
        <tr key={index} >
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
            {field[i++]}
        </tr>
    );
    return (
        <div>
            {(props.gameState.state!=true && props.gameState.result==="no")?
                  <button className={"Start-button"} onClick={()=>{ props.putBombs(); props.setTimer()}}> Начать игру!</button>:
                <p> Счетчик времени: {props.timer.getHours()+ ":"+ props.timer.getMinutes() + ":" +props.timer.getSeconds() }</p>
            }
            {(props.gameState.result==="fail")?
                <div>
                    <p>ВЫ ПРОИГРАЛИ</p>
                <button  onClick={()=>{props.fieldCleaner()}}> Выход </button>
                </div>
                :
                (  (props.gameState.result==="win")?
                    <div>
                        <p>ВЫ ВЫЙГРАЛИ</p>
                        <button  onClick={()=>{props.fieldCleaner()}}> Выход </button>
                        </div>
                        :""
                        )
            }
            <p  className={"Text"}>  Количество ходов:  {props.stepCounter} </p>
            <div  className={"tableHolder"}>
            <table>
                {tableFiller}
            </table>
            </div>
        </div>
    );
}
