const startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let fen = startpos;
let copy = document.getElementById('overlay').children;
let boardArr = Array.prototype.slice.call(document.getElementById('overlay').children);
let move = 'w';
const illuminateVision = fen => {
    const space = spaceControl(fen);
    space[0].map(i => {
        document.getElementById('overlay').children[i].classList.add('whiteControl');
    });
    space[1].map(i => {
        document.getElementById('overlay').children[i].classList.add('blackControl');
    });
    space[2].map(i => {
        document.getElementById('overlay').children[i].classList.add('allControl');
    });
}
for (i = 0; i < 64; i++) {
    if ((i % 2 === 0 && getRank(i) % 2 === 0) || (i % 2 === 1 && getRank(i) % 2 === 1)) {
        document.getElementById('board').children[i].classList.add('whiteSquare')
    } else {
        document.getElementById('board').children[i].classList.add('blackSquare')
    }
}
const displayFEN = fen => {
    let res = LoadFEN(fen);
    if (!res) return;
    for (i = 0; i < 64; i++) {
        document.getElementById('overlay').children[i].style.backgroundImage = ''
    }
    for (i = 0; i < 64; i++) {
        document.getElementById('overlay').children[i].classList.remove('w');
        document.getElementById('overlay').children[i].classList.remove('b');
    }
    res.map((square, index) => {
        switch (square) {
            case "k": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/k_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case "q": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/q_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case "b": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/b_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case "n": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/n_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case "r": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/r_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case "p": {
                document.getElementById('overlay').children[index].style.backgroundImage = 'url(assets/p_.svg)';
                document.getElementById('overlay').children[index].classList.add('b')
                break;
            }
            case " ": {

                break;
            }
            default: {
                document.getElementById('overlay').children[index].style.backgroundImage = `url(assets/${square}.svg)`;
                document.getElementById('overlay').children[index].classList.add('w')
                break;
            }
        }
    })
};
displayFEN(startpos)
const submit = () => {
    unSelectAll();
    fen = document.getElementById('fen').value;
    if (fen === 'startpos') {
        displayFEN(startpos);
        return;
    };
    displayFEN('')
    displayFEN(fen);
    let res = LoadFEN(fen);
    if (!res) return;
    move = getMove(fen);
    copy = document.getElementById('overlay').children;
    boardArr = Array.prototype.slice.call(document.getElementById('overlay').children);
}
document.getElementById('submit').onclick = () => {
    submit();
};
document.addEventListener('keypress', e => {
    if (document.activeElement === document.getElementById('fen') && e.key === 'Enter') {
        submit();
    }
})
const unSelectAll = () => {
    for (i = 0; i < 64; i++) {
        if (boardArr[i]) {
            boardArr[i].classList.remove('selected');
            boardArr[i].classList.remove('MoveIndicator');
            boardArr[i].classList.remove('whiteControl');
            boardArr[i].classList.remove('blackControl');
            boardArr[i].classList.remove('allControl');
        }
    }
}
let pieceIndex = -1;
for (i = 0; i < 64; i++) {
    document.getElementsByClassName('square')[i].onclick = e => {
        let index = boardArr.indexOf(e.path[0]);
        if (e.path[0].classList.contains('MoveIndicator')) { //Clicked square that was suggested by engine
            unSelectAll();
            fen = updateFEN(fen, pieceIndex, index);
            // console.log(formatFEN(fen))
            // fen = formatFEN(fen);
            move = fen.split(' ')[1]
            displayFEN('');
            displayFEN(fen)
            return;
        }
        if (e.path[0].style.backgroundImage === '') { //Square with no piece clicked
            unSelectAll();
            return;
        }
        if (e.path[0].classList.contains(move)) { //Clicked their piece
            if (e.path[0].classList.contains('selected')) { //Clicked selected square
                unSelectAll()
                return;
            }
            else { //wasn't selected
                pieceIndex = index;
                unSelectAll();
                e.path[0].classList.add('selected');
                getPieceMoves(fen, index).map(move => {
                    document.getElementById('overlay').children[move].classList.add('MoveIndicator')
                })
            }
        } else { //Clicked opponent's piece
            unSelectAll();
        }
    }
}