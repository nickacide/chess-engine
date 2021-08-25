const startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let fen = startpos;
let copy = document.getElementById('board').children;
let boardArr = Array.prototype.slice.call(document.getElementById('board').children);
let move = 'w';
const illuminateVision = fen => {
    const space = spaceControl(fen);
    space[0].map(i => {
        document.getElementById('board').children[i].classList.add('selected');
    });
    // space[1].map(i => {
    //     document.getElementById('board').children[i].classList.add('blue');
    // });
    // space[2].map(i => {
    //     document.getElementById('board').children[i].classList.add('orange');
    // });
}
const displayFEN = fen => {
    let res = LoadFEN(fen);
    if (!res) return;
    for (i = 0; i < 64; i++) {
        document.getElementById('board').children[i].style.backgroundImage = ''
    }
    for (i = 0; i < 64; i++) {
        document.getElementById('board').children[i].classList.remove('w');
        document.getElementById('board').children[i].classList.remove('b');
    }
    res[1].map((square, index) => {
        switch (square) {
            case "k": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/k_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case "q": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/q_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case "b": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/b_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case "n": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/n_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case "r": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/r_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case "p": {
                document.getElementById('board').children[index].style.backgroundImage = 'url(assets/p_.svg)';
                document.getElementById('board').children[index].classList.add('b')
                break;
            }
            case " ": {

                break;
            }
            default: {
                document.getElementById('board').children[index].style.backgroundImage = `url(assets/${square}.svg)`;
                document.getElementById('board').children[index].classList.add('w')
                break;
            }
        }
    })
};
displayFEN(startpos)
const submit = () => {
    fen = document.getElementById('fen').value;
    if (fen === 'startpos') {
        displayFEN(startpos);
        return;
    };
    displayFEN('')
    displayFEN(fen);
    let res = LoadFEN(fen);
    if (!res) return;
    move = res[2];
    copy = document.getElementById('board').children;
    boardArr = Array.prototype.slice.call(document.getElementById('board').children);
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
        document.getElementsByClassName('square')[i].classList.remove('selected');
        document.getElementsByClassName('square')[i].classList.remove('MoveIndicator');
    }
}
for (i = 0; i < 64; i++) {
    document.getElementsByClassName('square')[i].onclick = e => {
        if (e.path[0].style.backgroundImage === '') {
            unSelectAll();
            return;
        }
        if (e.path[0].classList.contains(move)) {
            if (e.path[0].classList.contains('selected')) {
                unSelectAll()
                return;
            } else {
                unSelectAll()
            }
            unSelectAll()
            e.path[0].classList.add('selected');
            let index = boardArr.indexOf(e.path[0]);
            getPieceMoves(fen, index).map(move => {
                document.getElementById('board').children[move].classList.add('MoveIndicator')
            })
        } else {
            unSelectAll();
        }
    }
}