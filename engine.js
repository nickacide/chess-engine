const LoadFEN = fen => {
    if (fen === '') return;
    const board = [[], [], [], [], [], [], [], []];
    const board_ = [];
    const position = fen.split(" ")[0];
    const move = fen.split(" ")[1].slice(0, 1);
    if (position.match(/[K]/g)?.length > 1 || position.match(/[k]/g)?.length > 1) {
        return 0;
    }
    if (position.match(/[^KQBNRP/1-8]/gi)?.length > 0) return 0;
    let rank = 0;
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
    return [board, board_, move];
};