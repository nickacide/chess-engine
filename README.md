# JS Chess Engine `v1.0.0`
A simple chess engine coded in native JavaScript.
# Goals
- NodeJS and terminal integration (to comply with uci standards)
- Accurate position evaluator (No 3rd party evaluators allowed)
- Neat Chess UI to go with using the chess engine
- Heavy optimization in the far future (if a rewrite in another language isn't done)

I want the chess engine to match my playing style. That probably means I'm going to have to feed it neural network shit. (Providing it with the openings I play simply won't cut it really.)

# Usage
I have added some functions that might look interesting:
- `illuminateVision(fen: string): void`: Shows all the squares White's pieces see
- `spaceControl(fen: string): number[][]`: array containing array of squares that a) White's pieces see b) Black's pieces see and c) both pieces see.

I have some more functions scattered around the sourcecode, but they have not met my standards yet. For example, there are a lot of functions starting with 'get', yet these functions are simply helper functions for engine.js and aren't really impressive (not that aforementioned were)
