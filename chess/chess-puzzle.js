(async function () {
  const status = document.getElementById('puzzle-status');

  try {
    const [{ Chessground }, { Chess }] = await Promise.all([
      import('https://esm.sh/@lichess-org/chessground@10.2.0?bundle'),
      import('https://esm.sh/chess.js@1.4.0')
    ]);

    const puzzles = window.CHESS_PUZZLES;
    if (!puzzles || !puzzles.length) return;

    const result = document.getElementById('puzzle-result');
    const explanation = document.getElementById('puzzle-explanation');
    const gameLink = document.getElementById('puzzle-game');
    const resetButton = document.getElementById('puzzle-reset');
    const solutionButton = document.getElementById('puzzle-solution');
    const nextButton = document.getElementById('puzzle-next');

    let puzzleIndex = 0;
    let puzzle;
    let game;
    let sequence;
    let step = 0;
    let busy = true;
    let revealing = false;
    let timer;
    let lastMove = [];

    function moveDetails(code) {
      const move = {
        from: code.slice(0, 2),
        to: code.slice(2, 4)
      };

      if (code.length === 5) move.promotion = code[4];

      return move;
    }

    function turnColor() {
      return game.turn() === 'w' ? 'white' : 'black';
    }

    function legalDestinations() {
      const destinations = new Map();

      if (busy || turnColor() !== puzzle.color) {
        return destinations;
      }

      game.moves({ verbose: true }).forEach(function (move) {
        if (!destinations.has(move.from)) {
          destinations.set(move.from, []);
        }

        const squares = destinations.get(move.from);
        if (!squares.includes(move.to)) squares.push(move.to);
      });

      return destinations;
    }

    const ground = Chessground(
      document.getElementById('chess-board'),
      {
        coordinates: true,
        animation: {
          enabled: true,
          duration: 180
        },
        movable: {
          free: false,
          dests: new Map(),
          events: {
            after: handleMove
          }
        },
        premovable: {
          enabled: false
        },
        drawable: {
          enabled: false
        }
      }
    );

    function refreshBoard() {
      ground.set({
        fen: game.fen(),
        orientation: puzzle.color,
        turnColor: turnColor(),
        lastMove: lastMove,
        check: game.isCheck(),
        movable: {
          color: puzzle.color,
          dests: legalDestinations()
        }
      });
    }

    function finish() {
      busy = true;
      refreshBoard();

      status.textContent = revealing
        ? 'Solution shown. Try again when you’re ready.'
        : game.isCheckmate()
          ? 'Checkmate. You found it!'
          : 'Correct. Puzzle solved!';

      explanation.textContent = puzzle.explanation;
      gameLink.href = puzzle.gameUrl;
      result.hidden = false;
      solutionButton.disabled = true;
    }

    function continuePuzzle() {
      if (step >= sequence.length) {
        finish();
        return;
      }

      busy = revealing || turnColor() !== puzzle.color;
      refreshBoard();

      if (busy) {
        status.textContent = revealing
          ? 'Showing the solution…'
          : 'Opponent’s move…';

        timer = setTimeout(playAutomaticMove, 650);
      } else {
        status.textContent = step > (puzzle.setup ? 1 : 0)
          ? 'Correct. Find the next move.'
          : `${puzzle.color === 'white' ? 'White' : 'Black'} to move.`;
      }
    }

    function playAutomaticMove() {
      const move = game.move(moveDetails(sequence[step]));

      lastMove = [move.from, move.to];
      step++;

      continuePuzzle();
    }

    function handleMove(from, to) {
      if (busy) {
        refreshBoard();
        return;
      }

      const piece = game.get(from);
      const promotes =
        piece &&
        piece.type === 'p' &&
        (to[1] === '8' || to[1] === '1');

      const attemptedMove = from + to + (promotes ? 'q' : '');

      if (attemptedMove !== sequence[step]) {
        busy = true;
      
        ground.set({
          movable: {
            dests: new Map()
          }
        });
      
        status.textContent = 'Not quite. Try another move.';
      
        timer = setTimeout(function () {
          busy = false;
          refreshBoard();
        }, 550);
      
        return;
      }

      const move = game.move(moveDetails(attemptedMove));

      lastMove = [move.from, move.to];
      step++;

      continuePuzzle();
    }

    function startPuzzle(showSolution = false) {
      clearTimeout(timer);

      puzzle = puzzles[puzzleIndex];
      game = new Chess(puzzle.fen);
      sequence = [
        ...(puzzle.setup ? [puzzle.setup] : []),
        ...puzzle.solution
      ];

      step = 0;
      lastMove = [];
      revealing = showSolution;
      busy = true;

      result.hidden = true;
      solutionButton.disabled = false;
      nextButton.style.display = puzzles.length > 1 ? '' : 'none';
      puzzleCount.textContent =
        `Puzzle ${puzzleIndex + 1} of ${puzzles.length}`;
      
      puzzleButtons.forEach(function (button, index) {
        if (index === puzzleIndex) {
          button.setAttribute('aria-current', 'step');
        } else {
          button.removeAttribute('aria-current');
        }
      });

      refreshBoard();

      if (puzzle.setup) {
        status.textContent = 'Opponent’s last move…';
        timer = setTimeout(playAutomaticMove, 500);
      } else {
        continuePuzzle();
      }
    }

    resetButton.addEventListener('click', function () {
      startPuzzle();
    });

    solutionButton.addEventListener('click', function () {
      if (busy || solutionButton.disabled) return;
    
      revealing = true;
      solutionButton.disabled = true;
      continuePuzzle();
    });

    nextButton.addEventListener('click', function () {
      puzzleIndex = (puzzleIndex + 1) % puzzles.length;
      startPuzzle();
    });

    const puzzleCount = document.getElementById('puzzle-count');
    const puzzleNumbers = document.getElementById('puzzle-numbers');

    const puzzleButtons = puzzles.map(function (entry, index) {
        const button = document.createElement('button');
  
        button.type = 'button';
        button.textContent = index + 1;
        button.setAttribute('aria-label', `Open puzzle ${index + 1}`);
  
        button.addEventListener('click', function () {
          puzzleIndex = index;
          startPuzzle();
        });
  
        puzzleNumbers.appendChild(button);
        return button;
      });
  
      startPuzzle();
    } catch (error) {
      status.textContent =
        'The chessboard couldn’t load. Please refresh the page.';
  
      console.error(error);
    }
})();