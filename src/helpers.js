export function shuffle(numPool) {
    for (let j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x) ;
    return numPool;
}

function bombCounter(isBomb) {
   if (isBomb)
       return 1;
   else return 0;
}
export function bombNum(table, index) {
    let count = 0;
    let leftRow=0;
    let  rightRow=0;
    let middleRow=bombCounter((undefined !==table[index-10])? table[index-10].bomb:false)+bombCounter(table[index].bomb)+bombCounter((undefined !==table[parseInt(index)+10])?table[parseInt(index)+10].bomb:false);
    if (index%10>0)
       leftRow=bombCounter((undefined !==table[index-11])?table[index-11].bomb:false)+bombCounter((undefined !==table[index-1])?table[index-1].bomb:false)+bombCounter((undefined !==table[parseInt(index)+9])?table[parseInt(index)+9].bomb:false);
    if (index%10<9)
        rightRow=bombCounter((undefined !==table[index-9])? table[index-9].bomb:false)+bombCounter((undefined !==table[parseInt(index)+1])?table[parseInt(index)+1].bomb:false)+bombCounter((undefined !==table[parseInt(index)+11])?table[parseInt(index)+11].bomb:false);
    count=middleRow+rightRow+leftRow;
    return count;
}