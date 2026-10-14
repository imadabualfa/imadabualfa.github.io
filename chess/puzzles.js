window.CHESS_PUZZLES = [
  {
    id: 'queen-sacrifice',
    color: 'white',

    fen: 'r3nr1k/1b3p1P/3ppb1P/pB1q4/1p2p3/4B3/PPP3Q1/1NK3RR b - - 3 23',

    setup: 'e8c7',

    solution: ['g2g7', 'f6g7', 'h6g7'],

    explanation:
      '24.Qg7+ forces ...Bxg7, then 25.hxg7 is checkmate. The h7 pawn covers g8, and the g1 rook protects the pawn on g7.',

    gameUrl: 'https://lichess.org/4nSWZrUY/white#0'
  },

  {
    id: 'smothered-mate',
    color: 'black',

    fen: '1k1r4/pp4p1/8/3p3Q/P2Pn3/2q1P3/6PP/R1B3K1 w - - 1 29',

    setup: 'c1b2',

    solution: [
      'c3e3', // 29...Qxe3+
      'g1h1', // 30.Kh1
      'e4f2', // 30...Nf2+
      'h1g1', // 31.Kg1
      'f2h3', // 31...Nh3+
      'g1h1', // 32.Kh1
      'e3g1', // 32...Qg1+
      'a1g1', // 33.Rxg1
      'h3f2'  // 33...Nf2#
    ],

    explanation:
      'The knight and queen force the king into the corner. After ...Qg1+, White must capture with the rook. ...Nf2# finishes the smothered mate: White’s own rook and pawns block every escape.',

    gameUrl: 'https://lichess.org/hSfzktF8/black#0'
  }
];