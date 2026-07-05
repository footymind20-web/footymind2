const EVENT_TEMPLATES = {
  goal: [
    "{player} scores a brilliant goal! A powerful shot into the top corner.",
    "GOAL! {player} connects with a beautiful cross and headers it past the keeper.",
    "Goal! A defensive mistake allows {player} to tap it into an empty net.",
    "{player} curls a magnificent free-kick over the wall! What a goal!"
  ],
  shot: [
    "{player} takes a shot from distance, but it sails just wide of the post.",
    "{player} fires a volley, but the goalkeeper handles it comfortably.",
    "{player} breaks free in the box and shoots, but it hits the side netting."
  ],
  save: [
    "A spectacular save by the keeper to deny a header from {player}!",
    "{player} shoots low, but the goalkeeper stretches to tip it around the post.",
    "A crucial stop! The goalkeeper blocks {player}'s close-range effort."
  ],
  card: [
    "Yellow Card! {player} receives a booking for a tactical foul.",
    "Yellow Card. {player} goes into the book after a reckless sliding tackle.",
    "Foul committed by {player}. The referee issues a warning."
  ]
};

const TACTICS_EFFECTS = {
  '4-3-3': { attack: 5, defense: -3, possession: 0 },
  '4-2-3-1': { attack: 2, defense: 1, possession: 0 },
  '4-4-2': { attack: 0, defense: 0, possession: 0 },
  '3-5-2': { attack: 1, defense: -1, possession: 5 },
  '3-4-2-1': { attack: 2, defense: -2, possession: 4 },
  '3-4-3': { attack: 3, defense: -3, possession: 2 },
  '5-3-2': { attack: -4, defense: 6, possession: -4 },
  '5-4-1': { attack: -5, defense: 8, possession: -6 },
  '4-5-1': { attack: -3, defense: 4, possession: 2 }
};

/**
 * Generate a random event commentary from template
 */
const getCommentary = (type, player) => {
  const list = EVENT_TEMPLATES[type];
  const template = list[Math.floor(Math.random() * list.length)];
  return template.replace('{player}', player);
};

/**
 * Poisson random number generator (Knuth algorithm)
 */
const poissonRandom = (lambda) => {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
};

/**
 * Calculate expected goals (lambda parameters) based on ELO difference and tactics
 */
export const calculateMatchParameters = (teamA, teamB) => {
  const baseEloDiff = (teamA.elo || 1700) - (teamB.elo || 1700);

  // Automate tactics based on relative strength (underdogs park the bus, favorites attack)
  let chosenTacticA = teamA.tactic || '4-2-3-1';
  let chosenTacticB = teamB.tactic || '4-2-3-1';

  if (baseEloDiff < -150) {
    chosenTacticA = '5-4-1'; // Defensive counter-tactic for underdogs
  } else if (baseEloDiff > 150) {
    chosenTacticA = '4-3-3'; // Dominant attacking favorite
  }

  if (baseEloDiff > 150) {
    chosenTacticB = '5-4-1'; // Defensive counter-tactic for underdogs
  } else if (baseEloDiff < -150) {
    chosenTacticB = '4-3-3'; // Dominant attacking favorite
  }

  const effectA = TACTICS_EFFECTS[chosenTacticA] || { attack: 0, defense: 0, possession: 0 };
  const effectB = TACTICS_EFFECTS[chosenTacticB] || { attack: 0, defense: 0, possession: 0 };

  const isHostA = ['USA', 'MEX', 'CAN'].includes(teamA.id);
  const isHostB = ['USA', 'MEX', 'CAN'].includes(teamB.id);
  const hostBoostA = isHostA ? 100 : 0;
  const hostBoostB = isHostB ? 100 : 0;

  const injuryPenaltyA = (teamA.injuries || []).length * 15;
  const injuryPenaltyB = (teamB.injuries || []).length * 15;

  const formScoreA = (teamA.form || []).reduce((acc, f) => acc + (f === 'W' ? 1 : f === 'L' ? -1 : 0), 0);
  const formScoreB = (teamB.form || []).reduce((acc, f) => acc + (f === 'W' ? 1 : f === 'L' ? -1 : 0), 0);
  const formBoostA = formScoreA * 10;
  const formBoostB = formScoreB * 10;

  // Modified Elo ratings
  const eloA = (teamA.elo || 1700) - injuryPenaltyA + formBoostA + hostBoostA + (effectA.attack * 5);
  const eloB = (teamB.elo || 1700) - injuryPenaltyB + formBoostB + hostBoostB + (effectB.attack * 5);

  const eloDiff = eloA - eloB;
  const expectedScoreA = 1 / (1 + Math.pow(10, -eloDiff / 400));
  const expectedScoreB = 1 - expectedScoreA;

  // Base ratings from the team database
  const baseAttackA = teamA.attack || 80;
  const baseDefenseA = teamA.defense || 80;
  const baseAttackB = teamB.attack || 80;
  const baseDefenseB = teamB.defense || 80;

  // Apply tactics and injuries to attack & defense ratings
  const finalAttackA = baseAttackA + (effectA.attack || 0) - (injuryPenaltyA / 3);
  const finalDefenseA = baseDefenseA + (effectA.defense || 0) - (injuryPenaltyA / 3);
  const finalAttackB = baseAttackB + (effectB.attack || 0) - (injuryPenaltyB / 3);
  const finalDefenseB = baseDefenseB + (effectB.defense || 0) - (injuryPenaltyB / 3);

  // Calculate attack vs defense ratios (anchored to average 2.7 goals per match)
  const ratioA = finalAttackA / Math.max(40, finalDefenseB);
  const ratioB = finalAttackB / Math.max(40, finalDefenseA);

  let lambdaA = ratioA * expectedScoreA * 2.7;
  let lambdaB = ratioB * expectedScoreB * 2.7;

  // Clip lambdas to realistic bounds (never drop to 0, never exceed 6.5)
  lambdaA = Math.max(0.01, Math.min(6.5, lambdaA));
  lambdaB = Math.max(0.01, Math.min(6.5, lambdaB));

  // Possession calculation
  const possessionA = Math.max(
    30,
    Math.min(
      70,
      Math.round(50 + (eloDiff) * 0.05 + effectA.possession - effectB.possession + (Math.random() - 0.5) * 6)
    )
  );
  const possessionB = 100 - possessionA;

  return {
    lambdaA,
    lambdaB,
    possessionA,
    possessionB,
    isHostA,
    chosenTacticA,
    chosenTacticB
  };
};

/**
 * Run 10,000 Monte Carlo match simulations
 */
export const runMonteCarloSimulation = (teamA, teamB) => {
  const { lambdaA, lambdaB } = calculateMatchParameters(teamA, teamB);

  let winsA = 0;
  let winsB = 0;
  let draws = 0;
  const scorelines = {};
  const simsCount = 10000;

  for (let i = 0; i < simsCount; i++) {
    const goalsA = poissonRandom(lambdaA);
    const goalsB = poissonRandom(lambdaB);

    if (goalsA > goalsB) winsA++;
    else if (goalsB > goalsA) winsB++;
    else draws++;

    const key = `${goalsA}-${goalsB}`;
    scorelines[key] = (scorelines[key] || 0) + 1;
  }

  const probA = (winsA / simsCount) * 100;
  const probB = (winsB / simsCount) * 100;
  const probDraw = (draws / simsCount) * 100;

  // Sort scorelines to find top 3 most likely outcomes
  const sortedScorelines = Object.entries(scorelines)
    .map(([score, count]) => ({ score, prob: (count / simsCount) * 100 }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 3);

  // Model-implied Decimal Odds
  const oddsA = (100 / (probA || 0.01)).toFixed(2);
  const oddsDraw = (100 / (probDraw || 0.01)).toFixed(2);
  const oddsB = (100 / (probB || 0.01)).toFixed(2);

  // Simulating the Bookmaker Closing Betting Market (a shallower model with margin)
  const bookmakerEloDiff = ((teamA.elo || 1700) - (teamB.elo || 1700)) * 0.8;
  const bookmakerExpA = 1 / (1 + Math.pow(10, -bookmakerEloDiff / 400));
  const bookmakerExpB = 1 - bookmakerExpA;

  // Base probabilities + 5% bookmaker overround/margin
  const mProbA = (bookmakerExpA * 0.44 + 0.28) * 1.05;
  const mProbB = (bookmakerExpB * 0.44 + 0.28) * 1.05;
  const mProbDraw = (1.05 - mProbA - mProbB);

  const marketOddsA = (1 / (mProbA || 0.01)).toFixed(2);
  const marketOddsDraw = (1 / (mProbDraw || 0.01)).toFixed(2);
  const marketOddsB = (1 / (mProbB || 0.01)).toFixed(2);

  // Value edge percentage calculation: positive difference indicates bookmaker is underestimating this outcome
  const edgeA = probA - (100 / parseFloat(marketOddsA));
  const edgeB = probB - (100 / parseFloat(marketOddsB));
  const edgeDraw = probDraw - (100 / parseFloat(marketOddsDraw));

  return {
    probA,
    probB,
    probDraw,
    oddsA,
    oddsDraw,
    oddsB,
    marketOddsA,
    marketOddsDraw,
    marketOddsB,
    edgeA,
    edgeB,
    edgeDraw,
    sortedScorelines
  };
};

/**
 * Simulate a single football match play-out for minute-by-minute live commentary
 */
export const simulateMatch = (teamA, teamB, targetGoalsA = null, targetGoalsB = null) => {
  const { lambdaA, lambdaB, possessionA, possessionB, isHostA, chosenTacticA, chosenTacticB } = calculateMatchParameters(teamA, teamB);

  // Use target score if provided, else generate via Poisson distribution
  const goalsA = targetGoalsA !== null ? targetGoalsA : poissonRandom(lambdaA);
  const goalsB = targetGoalsB !== null ? targetGoalsB : poissonRandom(lambdaB);

  const shotsA = goalsA + Math.round(Math.random() * 8 + 3);
  const shotsB = goalsB + Math.round(Math.random() * 8 + 3);

  const shotsOnTargetA = Math.max(goalsA, Math.round(shotsA * (0.3 + Math.random() * 0.3)));
  const shotsOnTargetB = Math.max(goalsB, Math.round(shotsB * (0.3 + Math.random() * 0.3)));

  // Generate Timeline Events
  const events = [];
  const totalEvents = Math.round(Math.random() * 3 + 5); // 5 to 8 events per match

  // Kickoff tactical analysis at Minute 1
  let hostMessage = '';
  if (isHostA) {
    hostMessage = `As host nation, ${teamA.name} is playing with a strong home crowd advantage (+100 ELO boost).`;
  }
  const tacticalKickoffCommentary = `Tactical Analysis: ${teamA.flag} ${teamA.name} sets up in a ${chosenTacticA} system, while ${teamB.flag} ${teamB.name} counters in a ${chosenTacticB} shape. ${hostMessage}`;
  events.push({
    minute: 1,
    type: 'kickoff',
    team: 'A',
    commentary: tacticalKickoffCommentary,
    scoreAfter: '0 - 0'
  });

  // Distribute goals chronologically
  const goalMinutes = [];
  for (let i = 0; i < goalsA; i++) goalMinutes.push({ team: 'A', type: 'goal' });
  for (let i = 0; i < goalsB; i++) goalMinutes.push({ team: 'B', type: 'goal' });

  // Distribute other event types
  const otherEvents = [];
  const eventTypes = ['shot', 'save', 'card'];
  for (let i = 0; i < totalEvents - goalMinutes.length; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const team = Math.random() < (possessionA / 100) ? 'A' : 'B';
    otherEvents.push({ team, type });
  }

  // Mix and assign random minutes
  const allEvents = [...goalMinutes, ...otherEvents];
  const minutes = new Set([1]); // prevent assigning minute 1
  
  allEvents.forEach((evt) => {
    let min;
    do {
      min = Math.floor(Math.random() * 88) + 2; // minute 2 to 90
    } while (minutes.has(min));
    minutes.add(min);
    
    const activeTeam = evt.team === 'A' ? teamA : teamB;
    const player = activeTeam.keyPlayers[Math.floor(Math.random() * activeTeam.keyPlayers.length)];
    const commentary = getCommentary(evt.type, player);
    
    events.push({
      minute: min,
      type: evt.type,
      team: evt.team,
      commentary,
      scoreAfter: ''
    });
  });

  // Sort events chronologically
  events.sort((a, b) => a.minute - b.minute);

  // Calculate live score progression
  let currentScoreA = 0;
  let currentScoreB = 0;
  events.forEach((evt) => {
    if (evt.type === 'goal') {
      if (evt.team === 'A') currentScoreA++;
      else currentScoreB++;
    }
    evt.scoreAfter = `${currentScoreA} - ${currentScoreB}`;
  });

  return {
    goalsA,
    goalsB,
    possessionA,
    possessionB,
    shotsA,
    shotsB,
    shotsOnTargetA,
    shotsOnTargetB,
    events
  };
};

/**
 * Perform a quick text analysis to answer World Cup trivia
 */
export const answerTrivia = (query, countries, historyWinners) => {
  const lowercase = query.toLowerCase().trim();

  // 1. Check for predictions
  if (lowercase.includes('predict') || lowercase.includes('versus') || lowercase.includes(' vs ')) {
    const found = countries.filter(c => 
      lowercase.includes(c.name.toLowerCase()) || lowercase.includes(c.id.toLowerCase())
    );

    if (found.length >= 2) {
      return {
        type: 'prediction_request',
        teamA: found[0],
        teamB: found[1],
        answer: `Let's run a 10,000 Monte Carlo simulation between ${found[0].flag} ${found[0].name} and ${found[1].flag} ${found[1].name}!`
      };
    }
    
    if (found.length === 1) {
      const opponent = countries.find(c => c.id !== found[0].id) || countries[0];
      return {
        type: 'prediction_request',
        teamA: found[0],
        teamB: opponent,
        answer: `Predicting ${found[0].name} against a strong opponent, ${opponent.name}. Let's run the simulations!`
      };
    }
  }

  // 2. Trivia questions
  if (lowercase.includes('most') && lowercase.includes('won') || lowercase.includes('most titles')) {
    return {
      type: 'text',
      answer: "🏆 **Brazil** has won the most World Cup tournaments, claiming the title **5 times** (1958, 1962, 1970, 1994, and 2002). Germany and Italy are close behind with 4 titles each."
    };
  }

  if (lowercase.includes('messi') && (lowercase.includes('goal') || lowercase.includes('world cup'))) {
    return {
      type: 'text',
      answer: "🇦🇷 **Lionel Messi** has scored **13 goals** in World Cup tournaments (2006-2022). He led Argentina to victory in Qatar 2022, scoring 7 goals in that tournament alone and winning the Golden Ball."
    };
  }

  if (lowercase.includes('ronaldo') && lowercase.includes('goal')) {
    return {
      type: 'text',
      answer: "🇵🇹 **Cristiano Ronaldo** has scored **8 goals** across 5 different World Cup editions (2006, 2010, 2014, 2018, 2022), making him the first player ever to score in five distinct World Cups."
    };
  }

  if (lowercase.includes('top scorer') || lowercase.includes('most goals')) {
    return {
      type: 'text',
      answer: "⚽ The all-time top goalscorer in FIFA World Cup history is Germany's **Miroslav Klose**, who scored **16 goals** across four tournaments (2002–2014). France's **Just Fontaine** holds the record for most goals in a single tournament, with **13 goals** in 1958."
    };
  }

  if (lowercase.includes('2022')) {
    const winner2022 = historyWinners.find(h => h.year === 2022);
    return {
      type: 'text',
      answer: `🌟 The **2022 World Cup in Qatar** was won by **${winner2022.winner}** in one of the greatest finals ever. They defeated **${winner2022.runnerUp}** **${winner2022.score}** after a thrilling 3-3 draw.`
    };
  }

  if (lowercase.includes('hello') || lowercase.includes('hi') || lowercase.includes('hey')) {
    return {
      type: 'text',
      answer: "👋 Hello! I am the **FootyMind AI Assistant**. Ask me any question about World Cup history, top records, or type something like **'Predict Argentina vs Brazil'** to run the simulations!"
    };
  }

  return {
    type: 'text',
    answer: "⚽ I'm not sure about that specific statistic, but you can ask about past winners (e.g. 'Who won in 2022?'), top scorers ('who is the top scorer?'), most titles ('who won the most titles?'), or predict a match ('Predict Germany vs Spain')!"
  };
};
