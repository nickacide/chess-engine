const spaceControl = fen => {
    if (!validateFEN(fen)) return 'invalid fen';
    //TODO: create spaceControl return syntax:
    //return [
    //  whiteVision: [<squares that white's pieces 'see'>],
    //  blackVision: [<squares that black's pieces 'see'>],
    //  commonVision: [<squares that appear in both whiteVision and blackVision arrays>]
    //]
}
const validateFEN = fen => {
    if (fen == '') return false;
    const tags = fen.slice(fen.indexOf(' '), fen.length);
    const position = fen.split(" ")[0];
    if (tags.match(/( [wb]( (?! ))((K?Q?k?q?)|-) (([a-h][1-8])|-) \d \d)/g)?.length !== 1) return false;
    if (position.match(/[K]/g)?.length > 1 || position.match(/[k]/g)?.length > 1) return false;
    if (position.match(/[/]/g)?.length !== 7) return false;
    if (position.match(/[^KQBNRP/1-8]/gi)?.length > 0) return false;
    if (position.split('/')[0].match(/p/gi)?.length > 0) return false;
    if (position.slice(position.lastIndexOf('/') + 1, position.length).match(/p/gi)) return false;
    const move = fen.split(" ")[1];
    return true;
}
const LoadFEN = fen => {
    if (fen.trim() === '') return;
    if (fen === 'startpos') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    let isValid = validateFEN(fen);
    if (!isValid) return;
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
                board_.push(' ')
            }
        } else if (iterate.match(/[KQBNRP]/gi)) {
            board[rank].push(iterate)
            board_.push(iterate)
        }
    };
    if (board_.length !== 64) return;
    return [board, board_, move];
};