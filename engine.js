const board = fen => {
    let rank = 0;
    const board = [[], [], [], [], [], [], [], []];
    const board_ = [];
    const position = fen.split(" ")[0];
    const move = fen.split(" ")[1].slice(0, 1);
    for (const iterate of position) {
        if (iterate == '/') {
            rank++;
        };
        if (parseInt(iterate)) {
            for (i = 0; i < parseInt(iterate); i++) {
                board[rank].push(' ');
                board_.push(' ');
            }
        } else if (iterate.match(/[KQBNRP]/gi)) {
            board[rank].push(iterate)
            board_.push(iterate)
        }
    };
    if (board_.length !== 64) return;
    return [board, board_, move];
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
const pieceAt = (fen, i) => {
    const board_ = board(fen)[1];
    return board_[i];
};
const inCheck = (fen, move) => {
    if (move) {

    };
    const space = spaceControl(fen);
    let check = [];
    if (space[0].includes(fen.indexOf('k'))) check.push('w');
    if (space[1].includes(fen.indexOf('K'))) check.push('b');
    if (check.length === 2) return false
    return null;
}
const getPieceColor = (fen, index) => {
    const board_ = board(fen)[1];
    if (board_[index] === '') return null;
    if (board_[index] === board_[index].toUpperCase()) return 'w'
    return 'b';
}
const getPieces = (fen, color) => {
    if (!color) color = 'w';
    const pieces = [];
    const board_ = board(fen)[1];
    if (color === 'w') {
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
const getPieceMoves = (fen, index) => {
    const board_ = board(fen)[1];
    const pieceMoves = [];
    board_.map((piece, i) => {
        if (i === index) {
            switch (piece) {
                case "P": {
                    let possible = [-8];
                    if (getRank(index) === 2) possible.push(-16)
                    possible.map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push((index + x));
                    });
                    break;
                } case "N": {
                    [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) pieceMoves.push((index + x)) };
                    });
                    break;
                } case "Q": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) return;
                            if (board_[index + i * x] && board_[index + i * x] === board_[index + i * x].toLowerCase() && board_[index + i * x] !== ' ') pieceMoves.push(index + i * x);
                            if (board_[index + i * x] !== ' ') {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "B": {
                    let movesDBI = [-9, 7, 9, -7]; // Moves despite being illegal
                    // if (getFile(index) === 1 && (getRank(index) !== 1 && getRank(index) !== 8)) movesDBI = movesDBI.slice(2, 3);
                    // console.log(movesDBI)
                    // if (getFile(index) === 8 && (getRank(index) !== 1 && getRank(index) !== 8)) movesDBI = movesDBI.slice(0, 2);
                    // console.log(movesDBI)
                    movesDBI.map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (Math.abs(getFile(index + i * x) - getFile(index + (i - 1) * x)) !== 1) return;
                            // if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;

                            if (board_[index + i * x] !== ' ') {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "K": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    });
                    break;
                } case "R": {
                    let R1 = [-8, 1, 8];
                    let R8 = [-8, -1, 8];
                    let any = [-8, -1, 1, 8];
                    if (getFile(index) === 1) any = R1;
                    if (getFile(index) === 8) any = R8;
                    any.map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                            }
                            if (board_[index + i * x] !== ' ') {

                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "p": {
                    let possible = [8];
                    if (getRank(index) === 2) possible.push(16)
                    possible.map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push((index + x));
                    });
                    break;
                } case "n": {
                    [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) pieceMoves.push((index + x)) };
                    });
                    break;
                } case "q": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (board_[index + i * x] !== ' ') {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "b": {
                    [9, 7, -9, -7].map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;
                            if (board_[index + i * x] !== ' ') {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                                return;
                            }
                            if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                        }
                    });
                    break;
                } case "k": {
                    [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (Math.abs(getFile(index) - getFile(index + x)) !== 1 && Math.abs(getRank(index) - getRank(index + x)) !== 1) return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                    });
                    break;
                } case "r": {
                    let R1 = [-8, 1, 8];
                    let R8 = [-8, -1, 8];
                    let any = [-8, -1, 1, 8];
                    if (getFile(index) === 1) any = R1;
                    if (getFile(index) === 8) any = R8;
                    any.map(x => {
                        if (board_[index + x] !== ' ') return;
                        if (inRange(index + x)) pieceMoves.push(index + x);
                        for (i = 1; i < 8; i++) {
                            if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                                if (inRange(index + i * x)) pieceMoves.push((index + i * x));
                            }
                            if (board_[index + i * x] !== ' ') {
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
    const board_ = board(fen)[1];
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
const checkFEN = fen => {
    if (fen.match(/^(([1-8]|[kqbnrKQBNR])+\/)(([1-8]|[kqpbrnKQPBRN])+\/){6}([1-8]|[kqbrnKQBRN]){0,8}( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) (\d\d?) (\d\d?\d?))$/g)?.length !== 1) return false;
    const position = fen.split(" ")[0];
    if (position.match(/[K]/g)?.length !== 1 || position.match(/[k]/g)?.length !== 1) return false;
    return true;
}
const validateFEN = fen => {
    if (fen.trim() === '') return false;
    if (!checkFEN(fen)) return false;
    if (inCheck(fen) === null) return true;
    if (inCheck(fen)) if (getMove(fen) !== inCheck(fen)) return false;
    return true;
}
const LoadFEN = fen => {
    if (fen === 'startpos') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    let isValid = validateFEN(fen);
    if (!isValid) return;
    return board(fen);
};
