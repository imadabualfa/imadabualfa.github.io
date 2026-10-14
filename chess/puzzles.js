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
  },

  {
    id: 'knight-double-check',
    color: 'white',
  
    fen: '4N1k1/5pbp/b5p1/p7/5B2/2P2P1P/PP6/2KR3n b - - 0 21',
  
    setup: 'h1f2',
  
    solution: [
      'd1d8', // 22.Rd8
      'f2d3', // 22...Nd3+
      'c1c2', // 23.Kc2
      'd3f4', // 23...Nxf4
      'e8f6'  // 24.Nf6#
    ],
  
    explanation:
      'Rd8 sets up the rook on the back rank. After answering the knight check with Kc2, Nf6# delivers double check from the knight and rook.',
  
    gameUrl: 'https://lichess.org/SO9uwGCU/white#0'
  },

  {
    id: 'bishop-sacrifice-rook-mate',
    color: 'black',
  
    fen: 'r1b1kr2/pppp2pp/8/3QP3/4n2q/7P/PPP2bP1/RNB2R1K w - - 1 12',
  
    setup: 'b1c3',
  
    solution: [
      'e4g3', // 12...Ng3+
      'h1h2', // 13.Kh2
      'g3f1', // 13...Nxf1+
      'h2h1', // 14.Kh1
      'f1g3', // 14...Ng3+
      'h1h2', // 15.Kh2
      'f2g1', // 15...Bg1+
      'h2g1', // 16.Kxg1
      'f8f1', // 16...Rf1+
      'g1h2', // 17.Kh2
      'f1h1'  // 17...Rh1#
    ],
  
    explanation:
      'The knight captures the defending rook, then returns to g3. The bishop sacrifice draws the king onto g1, allowing ...Rf1+ and ...Rh1#. The knight protects the rook on h1.',
  
    gameUrl: 'https://lichess.org/eQ9gGOIv/black#0'
  }
];