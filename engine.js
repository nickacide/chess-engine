class FEN {
    constructor(fen) {
        this.fen = fen;
        this.move = fen.split(' ')[1];
        this.castlingRights = fen.split(' ')[2];
        this.enPassant = fen.split(' ')[3];
        this.halfMoves = fen.split(' ')[4];
        this.fullMoves = fen.split(' ')[5];
        this.board = board(fen);
    }
    pieceAt(pieceIndex) {
        return this.board[pieceIndex]
    }
    validate() {
        let fen = this.fen;
        if (fen.trim() === '') return false;
        if (fen.match(/^(([1-8]|[kqbnrKQBNR])+\/)(([1-8]|[kqpbrnKQPBRN])+\/){6}([1-8]|[kqbrnKQBRN]){0,8}( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) (\d\d?) (\d\d?\d?))$/g)?.length !== 1) return false;
        const position = fen.split(" ")[0];
        if (position.match(/[K]/g)?.length !== 1 || position.match(/[k]/g)?.length !== 1) return false;
        if (inCheck(fen) === null) return true;
        if (inCheck(fen)) if (getMove(fen) !== inCheck(fen)) return false;
        return true;
    }
    getPieceMoves(pieceIndex) {
        return getPieceMoves(this.fen, pieceIndex);
    }
    inCheck() {
        return inCheck(this.fen)
    }
    getPieces(color) {
        if (!color) return null;
        return getPieces(this.fen, color)
    }
}
const checkFEN = fen => {
    if (fen.trim() === '') return false;
    if (fen.match(/^(([1-8]|[kqbnrKQBNR])+\/)(([1-8]|[kqpbrnKQPBRN])+\/){6}([1-8]|[kqbrnKQBRN]){0,8}( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) (\d\d?) (\d\d?\d?))$/g)?.length !== 1) return false;
    const position = fen.split(" ")[0];
    if (position.match(/[K]/g)?.length !== 1 || position.match(/[k]/g)?.length !== 1) return false;
    return true;
}
const validateFEN = (fen) => {
    if (fen.trim() === '') return false;
    if (fen.match(/^(([1-8]|[kqbnrKQBNR])+\/)(([1-8]|[kqpbrnKQPBRN])+\/){6}([1-8]|[kqbrnKQBRN]){0,8}( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) (\d\d?) (\d\d?\d?))$/g)?.length !== 1) return false;
    const position = fen.split(" ")[0];
    if (position.match(/[K]/g)?.length !== 1 || position.match(/[k]/g)?.length !== 1) return false;
    if (inCheck(fen) === null) return true;
    if (inCheck(fen)) if (getMove(fen) !== inCheck(fen)) return false;
    return true;
}
const board = fen => {
    let rank = 0;
    const board = [];
    const position = fen.split(" ")[0];
    for (const iterate of position) {
        if (iterate == '/') {
            rank++;
        };
        if (parseInt(iterate)) {
            for (i = 0; i < parseInt(iterate); i++) {
                board.push(' ');
            }
        } else if (iterate.match(/[KQBNRP]/gi)) {
            board.push(iterate)
        }
    };
    if (board.length !== 64) return false;
    return board;
}
const getMove = fen => fen.split(' ')[1];
const inRange = index => index < 64 && index > -1 ? true : false;
const getRank = index => 9 - Math.ceil((index + 1) / 8);
const getFile = index => 1 + index % 8;
const i2Coord = index => {
    const file = index % 8;
    const rank = getRank(index);
    return String.fromCharCode(97 + file) + '' + rank;
};
const inCheck = (fen) => {
    const space = spaceControl(fen);
    let check = [];
    if (space[0].includes(fen.indexOf('k'))) check.push('w');
    if (space[1].includes(fen.indexOf('K'))) check.push('b');
    if (check.length === 2) return null;
    if (check.length === 0) return false;
    return check[0];
}
const getPieceColor = (fen, index) => {
    if (!inRange(index)) return;
    const board_ = board(fen);
    if (board_[index] === ' ') return null;
    if (board_[index] === board_[index].toUpperCase()) return 'w';
    return 'b';
}
const getPieces = (fen, color) => {
    if (!color) color = 'w';
    const pieces = [];
    const board_ = board(fen);
    if (color === 'w' || color === 'W') {
        board_.map(p => {
            if (p === ' ') return;
            if (p === p.toUpperCase()) pieces.push(p);
        })
    } else {
        board_.map(p => {
            if (p === ' ') return;
            if (p === p.toLowerCase()) pieces.push(p);
        })
    };
    return pieces;
}
const formatFEN = fen => {
    let newFEN = '';
    let rank = 8;
    let opts = fen.slice(fen.indexOf(' '));
    const board_ = board(fen);
    board_.map((x, i) => {
        if (getRank(i) < rank) {
            rank--;
            newFEN += '/';
            newFEN += x;
        } else {
            newFEN += x;
        }
    });
    newFEN = newFEN.split('');
    newFEN.map((x, i) => {
        if (x === ' ') {
            newFEN[i] = 1;
        }
    })
    console.log(newFEN.join(''), (/[1-8]/.test(newFEN[newFEN.join('').search(/[1-8]/) - 1]) || /[1-8]/.test(newFEN[newFEN.join('').search(/[1-8]/) + 1])))
    stop = 0;
    let spare = [];
    let joined = newFEN.join('');
    for (i = 0; i < joined.length; i++) {
        let before = (/[1-8]/.test(joined[joined.search(/[1-8]/) - 1]))
        let after = (/[1-8]/.test(joined[joined.search(/[1-8]/) + 1]))
        console.log(before, after, joined)
        if (!before && !after) {
            let x = joined.search(/[1-8]/);
            joined = joined.split('');
            spare[x] = joined[x];
            joined[x] = '_';
            joined = joined.join('')
        }
    }
    console.log(joined)
    console.log(spare)
    newFEN = joined.split('');
    while (stop < 20 && (/[1-8]/.test(newFEN[newFEN.join('').search(/[1-8]/) - 1]) || /[1-8]/.test(newFEN[newFEN.join('').search(/[1-8]/) + 1]))) {
        newFEN.map((x, i) => {
            if (!isNaN(x) && !isNaN(newFEN[i + 1])) {
                newFEN[i] = parseInt(x) + parseInt(newFEN[i + 1]);
                newFEN[i + 1] = '0';
            }
        });
        stop++;
        console.log(newFEN.join(''))
    }
    console.log(stop)
    newFEN = newFEN.join('').replace(/0/g, '')
    newFEN = newFEN.replace(/_/g, spare[newFEN.indexOf('_')]);
    console.log(newFEN + opts)
    return newFEN + opts;
}
const updateFEN = (oldFEN, pieceIndex, moveIndex) => {
    let newFEN = '';
    const board_ = board(oldFEN);
    const move = getMove(oldFEN);
    board_[moveIndex] = board_[pieceIndex];
    board_[pieceIndex] = ' ';
    oldFEN = oldFEN.slice(oldFEN.indexOf(' '), oldFEN.length).replace(/ [wb] /, move === 'w' ? ' b ' : ' w ');
    let rank = 8;
    board_.map((x, i) => {
        if (getRank(i) < rank) {
            rank--;
            newFEN += '/';
            newFEN += x;
        } else {
            newFEN += x;
        }
    });
    newFEN = newFEN.split('');
    newFEN.map((x, i) => {
        if (x === ' ') {
            newFEN[i] = 1;
        }
    })
    newFEN = newFEN.join('')
    return newFEN + oldFEN;
}
const getPieceMoves = (fen, index) => {
    const board_ = board(fen);
    const pieceMoves = [];
    board_.map((piece, i) => {
        if (i === index) {
            switch (piece) {
                case "P": {
                    let captures = [-7, -9];
                    let possible = [-8];
                    if (getRank(index) === 2) possible.push(-16);
                    captures.map(x => {
                        if (getPieceColor(fen, index + x) !== 'b') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    })
                    for (i = 0; i < possible.length; i++) {
                        if (board_[index + possible[i]] !== ' ') break;
                        if (inRange(index + possible[i])) pieceMoves.push(index + possible[i]);
                    }
                    break;
                } case "N": {
                    [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) pieceMoves.push((index + x)) };
                    });
                    break;
                } case "Q": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) return;
                            if (board_[index + i * x] && board_[index + i * x] === board_[index + i * x].toLowerCase() && board_[index + i * x] !== ' ') pieceMoves.push(index + i * x);
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'w') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "B": {
                    [-9, 7, 9, -7].map(x => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getFile(index + i * x) - getFile(index + (i - 1) * x)) !== 1) return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'w') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "K": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    });
                    break;
                } case "R": {
                    [1, -1].map(x => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getRank(index + i * x) - getRank(index + (i - 1) * x)) > 0) return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'w') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        };
                    });
                    [8, -8].map(x => {
                        if (getPieceColor(fen, index + x) === 'w') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getFile(index + i * x) - getFile(index + (i - 1) * x)) > 0) return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'w') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "p": {
                    let captures = [7, 9];
                    let possible = [8];
                    if (getRank(index) === 7) possible.push(16);
                    captures.map(x => {
                        if (getPieceColor(fen, index + x) !== 'w') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    })
                    for (i = 0; i < possible.length; i++) {
                        if (board_[index + possible[i]] !== ' ') break;
                        if (inRange(index + possible[i])) pieceMoves.push(index + possible[i]);
                    }
                    break;
                } case "n": {
                    [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) pieceMoves.push((index + x)) };
                    });
                    break;
                } case "q": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (getPieceColor(fen, index + i * x) === 'b') return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'b') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "b": {
                    [9, 7, -9, -7].map(x => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getFile(index + i * x) - getFile(index + (i - 1) * x)) !== 1) return;
                            if (getPieceColor(fen, index + i * x) === 'b') return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'b') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "k": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    });
                    break;
                } case "r": {
                    [1, -1].map(x => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getRank(index + i * x) - getRank(index + (i - 1) * x)) > 0) return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'b') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        };
                    });
                    [8, -8].map(x => {
                        if (getPieceColor(fen, index + x) === 'b') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getFile(index + i * x) - getFile(index + (i - 1) * x)) > 0) return;
                            if (board_[index + i * x] !== ' ') {
                                if (getPieceColor(fen, index + i * x) === 'b') return;
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                }
            }
        }
    });
    return Array.from(new Set(pieceMoves)).sort((a, b) => a - b);
}
const spaceControl = fen => {
    if (!checkFEN(fen)) return [[], [], []];
    const whiteVision = [],
        blackVision = [];
    const board_ = board(fen);
    board_.map((piece, index) => {
        if (piece === ' ') return;
        switch (piece) {
            case "P": {
                [-9, -7].map(x => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== 1) { return } else { if (inRange(index + x)) whiteVision.push((index + x)) };
                });
                break;
            } case "N": {
                [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) whiteVision.push((index + x)) };
                });
                break;
            } case "Q": {
                [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                    if (inRange(index + x)) whiteVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                            if (inRange(index + i * x)) whiteVision.push((index + i * x));
                            return;
                        }
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) whiteVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) whiteVision.push((index + i * x));
                    }
                });
                break;
            } case "B": {
                [-9, -7, 9, 7].map(x => {
                    if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                    if (inRange(index + x)) whiteVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) whiteVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) whiteVision.push((index + i * x));
                    }
                });
                break;
            } case "K": {
                [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                    if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                    if (inRange(index + x)) whiteVision.push(index + x);
                });
                break;
            } case "R": {
                let R1 = [-8, 1, 8];
                let R8 = [-8, -1, 8];
                let any = [-8, -1, 1, 8];
                if (getFile(index) === 1) any = R1;
                if (getFile(index) === 8) any = R8;
                any.map(x => {
                    if (inRange(index + x)) whiteVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                            if (inRange(index + i * x)) whiteVision.push((index + i * x));
                        }
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) whiteVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) whiteVision.push((index + i * x));
                    }
                });
                break;
            } case "p": {
                [9, 7].map(x => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== 1) { return } else { if (inRange(index + x)) blackVision.push((index + x)) };
                });
                break;
            } case "n": {
                [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) blackVision.push((index + x)) };
                });
                break;
            } case "q": {
                [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                    if (inRange(index + x)) blackVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                            if (inRange(index + i * x)) blackVision.push((index + i * x));
                            return;
                        }
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) blackVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) blackVision.push((index + i * x));
                    }
                });
                break;
            } case "b": {
                [-9, -7, 9, 7].map(x => {
                    if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                    if (inRange(index + x)) blackVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) blackVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) blackVision.push((index + i * x));
                    }
                });
                break;
            } case "k": {
                [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                    if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                    if (inRange(index + x)) blackVision.push(index + x);
                });
                break;
            } case "r": {
                let R1 = [-8, 1, 8];
                let R8 = [-8, -1, 8];
                let any = [-8, -1, 1, 8];
                if (getFile(index) === 1) any = R1;
                if (getFile(index) === 8) any = R8;
                any.map(x => {
                    if (inRange(index + x)) blackVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                            if (inRange(index + i * x)) blackVision.push((index + i * x));
                        }
                        if (board_[index + i * x] !== ' ') {
                            if (inRange(index + i * x)) blackVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) blackVision.push((index + i * x));
                    }
                });
                break;
            }
        }
    });
    commonVision = whiteVision.filter(v => blackVision.includes(v));
    return [Array.from(new Set(whiteVision)).sort((a, b) => a - b), Array.from(new Set(blackVision)).sort((a, b) => a - b), commonVision.sort((a, b) => a - b)];
}
const LoadFEN = fen => {
    if (fen === 'startpos') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    let isValid = validateFEN(fen);
    if (!isValid) return;
    return board(fen);
};
