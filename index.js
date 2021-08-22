const startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let move = 'w';
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
    let fen = document.getElementById('fen').value;
    if (fen === 'startpos') {
        displayFEN(startpos);
        return;
    };
    displayFEN('')
    displayFEN(fen);
    let res = LoadFEN(fen);
    if (!res) return;
    move = res[2];
}
document.getElementById('submit').onclick = () => {
    submit();
};
document.addEventListener('keypress', () => {
    if (document.activeElement === document.getElementById('fen')) {
        submit();
    }
})
const unSelectAll = () => {
    for (i = 0; i < 64; i++) {
        document.getElementsByClassName('square')[i].classList.remove('selected');
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
                e.path[0].classList.remove('selected');
                return;
            } else {
                unSelectAll()
            }
            e.path[0].classList.add('selected')

        } else {
            unSelectAll();
        }
    }
}