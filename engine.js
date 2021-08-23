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
const inRange = index => index < 64 && index > -1 ? true : false;
const getRank = index => 9 - Math.ceil((index + 1) / 8);
const getFile = index => 1 + index % 8;
const i2Coord = index => {
    const file = index % 8;
    const rank = getRank(index)
    return String.fromCharCode(97 + file) + '' + rank
}
const pieceAt = (fen, i) => {
    const board_ = board(fen)[1];
    return board_[i];
}
const spaceControl = fen => {
    if (!validateFEN(fen)) return 'invalid fen';
    //TODO: create spaceControl return syntax:
    //return [
    //  whiteVision: [<squares that white's pieces 'see'>],
    //  blackVision: [<squares that black's pieces 'see'>],
    //  commonVision: [<squares that appear in both whiteVision and blackVision arrays>]
    //]

    //whiteVision
    const whiteVision = [],
        blackVision = [];
    const board_ = board(fen)[1];
    board_.map((piece, index) => {
        if (piece === ' ') return;
        //white only
        switch (piece) {
            case "P": {
                // whiteVision.push(index);
                // [-9, -7].map(x => {
                //     if (Math.abs(getRank(index) - getRank(index + x)) !== 1) { return } else { if (inRange(index + x)) whiteVision.push((index + x)) };
                // })
                break;
            } case "N": {
                // whiteVision.push(index);
                // [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                //     if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) whiteVision.push((index + x)) };
                // })
                break;
            } case "Q": {
                // whiteVision.push(index);
                // [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                //     if (inRange(index + x)) whiteVision.push(index + x);
                //     for (i = 1; i < 8; i++) {
                //         if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;
                //         if (board_[index + i * x] !== ' ') {
                //             whiteVision.push((index + i * x));
                //             return;
                //         }
                //         whiteVision.push((index + i * x));
                //     }
                // });
                break;
            } case "B": {
                // whiteVision.push(index);
                // [-9, -7, 9, 7].map(x => {
                //     if (inRange(index + x)) whiteVision.push(index + x);
                //     for (i = 1; i < 8; i++) {
                //         if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;
                //         if (board_[index + i * x] !== ' ') {
                //             whiteVision.push((index + i * x));
                //             return;
                //         }
                //         whiteVision.push((index + i * x));
                //     }
                // });
                break;
            } case "K": {
                // whiteVision.push(index);
                // [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                //     if (inRange(index + x)) whiteVision.push(index + x);
                // });
                break;
            } case "R": {
                let R1 = [-8, 1, 8];
                let R8 = [-8, -1, 8];
                let any = [-8, -1, 1, 8];
                if (getFile(index) === 1) any = R1;
                if (getFile(index) === 8) any = R8;
                // whiteVision.push(index);
                any.map(x => {
                    // if (inRange(index + x)) whiteVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + i * x) === 8 || getFile(index + i * x) === 1) {
                            // if (inRange(index + i * x)) whiteVision.push((index + i * x));
                        }
                        if (board_[index + i * x] !== ' ') {
                            // if (inRange(index + i * x)) whiteVision.push((index + i * x));
                            return;
                        }
                        if (inRange(index + i * x)) whiteVision.push((index + i * x));
                    }
                });
                break;
            } case "p": {
                blackVision.push(index);
                [9, 7].map(x => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== 1) { return } else { if (inRange(index + x)) blackVision.push((index + x)) };
                })
                break;
            } case "n": {
                blackVision.push(index);
                [6, 15, 10, 17, -6, -15, -10, -17].map((x, i) => {
                    if (Math.abs(getRank(index) - getRank(index + x)) !== (i % 2) + 1) { return } else { if (inRange(index + x)) blackVision.push((index + x)) };
                })
                break;
            } case "q": {
                blackVision.push(index);
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
                blackVision.push(index);
                [-9, -7, 9, 7].map(x => {
                    if (inRange(index + x)) blackVision.push(index + x);
                    for (i = 1; i < 8; i++) {
                        if (getFile(index + (i - 1) * x) === 1 || getFile(index + (i - 1) * x) === 8 || getRank(index + (i - 1) * x) === 1 || getRank(index + (i - 1) * x) === 8) return;
                        if (board_[index + i * x] !== ' ') {
                            blackVision.push((index + i * x));
                            return;
                        }
                        blackVision.push((index + i * x));
                    }
                });
                break;
            } case "k": {
                blackVision.push(index);
                [-9, -8, -7, -1, 1, 9, 8, 7].map(x => {
                    if (inRange(index + x)) blackVision.push(index + x);
                });
                break;
            } case "r": {
                blackVision.push(index);
                [-8, -1, 1, 8].map(x => {
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
            }
        }
    });
    return [Array.from(new Set(whiteVision)).sort(), Array.from(new Set(blackVision)).sort()];
}
const validateFEN = fen => {
    if (fen.trim() === '') return false;
    if (fen.match(/^(([1-8]|[kqbnrKQBNR])+\/)(([1-8]|[kqpbrnKQPBRN])+\/){6}([1-8]|[kqbrnKQBRN]){0,8}( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) (\d\d?) (\d\d?\d?))$/g)?.length !== 1) return false;
    const position = fen.split(" ")[0];
    if (position.match(/[K]/g)?.length !== 1 || position.match(/[k]/g)?.length !== 1) return false;
    return true;
}
const LoadFEN = fen => {
    if (fen === 'startpos') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    let isValid = validateFEN(fen);
    if (!isValid) return;
    return board(fen);
};
