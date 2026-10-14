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
    id: 'international-master-finish',
    color: 'black',
  
    // Position before White plays 36.gxh4.
    fen: '8/p5pk/4R2p/1p5q/3R1p1n/2P2bP1/P4P2/5K2 w - - 0 36',
  
    setup: 'g3h4',
  
    solution: [
      'h5h4', // 36...Qxh4
      'f1e1', // 37.Ke1
      'h4h1', // 37...Qh1+
      'e1d2', // 38.Kd2
      'h1d1'  // 38...Qd1#
    ],
  
    explanation:
      'From my only win against an IM "International Master". After a messy game, I was able to find a simple forced mate.',
  
    gameUrl: 'https://lichess.org/MNLsc14a/black#0'
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
  },

  {
    id: 'legal-mate-black',
    color: 'black',
  
    fen: 'r1bqk2r/ppp2ppp/2p2n2/2b5/4P3/3P4/PPP2PPP/RNBQKB1R w KQkq - 1 6',
  
    setup: 'c1g5',
  
    solution: [
      'f6e4', // 6...Nxe4
      'g5d8', // 7.Bxd8
      'c5f2', // 7...Bxf2+
      'e1e2', // 8.Ke2
      'c8g4'  // 8...Bg4#
    ],
  
    explanation:
      '...Nxe4 offers the queen on d8. After White takes it, ...Bxf2+ forces Ke2, and ...Bg4# finishes the mating net with both bishops and the knight.',
  
    gameUrl: 'https://lichess.org/kbZolRQX/black#0'
  },

  {
    id: 'pinned-queen',
    color: 'white',
  
    fen: 'r3k2r/pppq1ppp/3p1nn1/3P2B1/2B1P1b1/2N3P1/PPP2Q1P/R4RK1 b kq - 8 16',
  
    setup: 'f6h5',
  
    solution: [
      'c4b5', // 17.Bb5
      'c7c6', // 17...c6
      'd5c6', // 18.dxc6
      'b7c6', // 18...bxc6
      'b5c6'  // 19.Bxc6
    ],
  
    explanation:
      'Black resigned after 19.Bxc6. The queen is pinned to the king, and taking the bishop with ...Qxc6 allows Qxf7#. That mating threat makes the queen’s position untenable.',
  
    gameUrl: 'https://www.chess.com/game/live/167321642004?move=0'
  },

  {
    id: 'chess960-pawn-mate',
    color: 'black',
  
    // Position before White plays 32.Kb3.
    fen: '8/pkp4R/2p5/1p5P/1n6/3P4/1KP2r2/R7 w - - 1 32',
  
    setup: 'b2b3',
  
    solution: [
      'b4c2', // 32...Nxc2
      'a1g1', // 33.Rg1
      'a7a5', // 33...a5
      'g1g7', // 34.Rgg7
      'a5a4', // 34...a4+
      'b3c3', // 35.Kc3
      'b5b4', // 35...b4+
      'c3b2', // 36.Kb2
      'c2d4', // 36...Nd4+
      'b2b1', // 37.Kb1
      'f2f1', // 37...Rf1+
      'b1b2', // 38.Kb2
      'a4a3', // 38...a3+
      'b2a2', // 39.Ka2
      'f1f2', // 39...Rf2+
      'a2a1', // 40.Ka1
      'd4b3', // 40...Nb3+
      'a1b1', // 41.Kb1
      'a3a2'  // 41...a2#
    ],
  
    explanation:
      'The advancing pawns, rook, and knight weave a mating net around White’s king. After ...Nb3+, ...a2# delivers the final check with a pawn.',
  
    gameUrl: 'https://lichess.org/0OTBT1ar/black#0'
  },

  {
    id: 'queen-bishop-mate',
    color: 'white',
  
    // Position before Black plays 10...Nbd7.
    fen: 'rn1q1bkr/pp4p1/2p1pn1p/4Nb2/2BP4/5Q2/PPP2PPP/R1B1K2R b KQ - 3 10',
  
    setup: 'b8d7',
  
    solution: [
      'f3f5', // 11.Qxf5
      'd7e5', // 11...Nxe5
      'd4e5', // 12.dxe5
      'f6d5', // 12...Nd5
      'f5e6', // 13.Qxe6+
      'g8h7', // 13...Kh7
      'c4d3', // 14.Bd3+
      'g7g6', // 14...g6
      'e6g6'  // 15.Qxg6#
    ],
  
    explanation:
      'Qxf5 captures the bishop and leaves the knight available to take. After ...Nxe5, dxe5 and ...Nd5, Qxe6+ drives the king to h7. Bd3+ brings the bishop into the attack, and after ...g6, Qxg6# finishes with the queen protected by the bishop.',
  
    gameUrl: 'https://lichess.org/xV28tvVt/white#0'
  },

  {
    id: 'queenside-castle-mate',
    color: 'white',
  
    // Position before Black plays 11...Be6.
    fen: 'r1bqk2r/ppp2p2/2n2p1p/8/3pB2B/8/PPP2PPP/R2QK2R b KQkq - 0 11',
  
    setup: 'c8e6',
  
    solution: [
      'd1f3', // 12.Qf3
      'd8d7', // 12...Qd7
      'f3f6', // 13.Qxf6
      'h8f8', // 13...Rf8
      'e1c1', // 14.O-O-O
      'd7e7', // 14...Qe7
      'e4c6', // 15.Bxc6+
      'e7d7', // 15...Qd7
      'f6e7'  // 16.Qe7#
    ],
  
    explanation:
      'Castling queenside brings the rook onto the d-file. Bxc6+ removes the knight, and after ...Qd7, Qe7# finishes: the bishop on h4 protects the queen, while the pinned queen on d7 cannot capture it.',
  
    gameUrl: 'https://lichess.org/Owh2Fjbn/white#0'
  }
];