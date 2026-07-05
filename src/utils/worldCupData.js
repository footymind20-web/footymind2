export const COUNTRIES = [
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷', ranking: 1, rating: 92, attack: 94, defense: 90, keyPlayers: ['Lionel Messi', 'Lautaro Martínez', 'Enzo Fernández'], form: ['W', 'W', 'W', 'D', 'W'], injuries: [], tactic: '4-3-3', elo: 2150 },
  { id: 'FRA', name: 'France', flag: '🇫🇷', ranking: 2, rating: 91, attack: 93, defense: 89, keyPlayers: ['Kylian Mbappé', 'Antoine Griezmann', 'William Saliba'], form: ['W', 'D', 'W', 'W', 'L'], injuries: ['Aurélien Tchouaméni (Knee)'], tactic: '4-2-3-1', elo: 2110 },
  { id: 'ESP', name: 'Spain', flag: '🇪🇸', ranking: 3, rating: 91, attack: 90, defense: 91, keyPlayers: ['Lamine Yamal', 'Rodri', 'Pedri'], form: ['W', 'W', 'W', 'W', 'W'], injuries: ['Gavi (ACL)'], tactic: '4-3-3', elo: 2120 },
  { id: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ranking: 4, rating: 89, attack: 90, defense: 88, keyPlayers: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka'], form: ['W', 'L', 'W', 'D', 'W'], injuries: ['Luke Shaw (Hamstring)'], tactic: '4-2-3-1', elo: 2090 },
  { id: 'BRA', name: 'Brazil', flag: '🇧🇷', ranking: 5, rating: 90, attack: 91, defense: 88, keyPlayers: ['Vinícius Júnior', 'Rodrygo', 'Marquinhos'], form: ['D', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 2080 },
  { id: 'POR', name: 'Portugal', flag: '🇵🇹', ranking: 6, rating: 88, attack: 89, defense: 87, keyPlayers: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rúben Dias'], form: ['W', 'W', 'L', 'W', 'W'], injuries: [], tactic: '4-3-3', elo: 2040 },
  { id: 'NED', name: 'Netherlands', flag: '🇳🇱', ranking: 7, rating: 87, attack: 85, defense: 88, keyPlayers: ['Virgil van Dijk', 'Cody Gakpo', 'Frenkie de Jong'], form: ['W', 'D', 'W', 'L', 'W'], injuries: ['Teun Koopmeiners (Thigh)'], tactic: '4-3-3', elo: 2020 },
  { id: 'BEL', name: 'Belgium', flag: '🇧🇪', ranking: 8, rating: 85, attack: 86, defense: 84, keyPlayers: ['Kevin De Bruyne', 'Romelu Lukaku', 'Jérémy Doku'], form: ['D', 'W', 'L', 'W', 'L'], injuries: [], tactic: '4-2-3-1', elo: 1980 },
  { id: 'CRO', name: 'Croatia', flag: '🇭🇷', ranking: 9, rating: 84, attack: 82, defense: 85, keyPlayers: ['Luka Modrić', 'Joško Gvardiol', 'Mateo Kovačić'], form: ['D', 'L', 'W', 'D', 'W'], injuries: ['Ivan Perišić (Fitness)'], tactic: '4-3-3', elo: 1950 },
  { id: 'MAR', name: 'Morocco', flag: '🇲🇦', ranking: 12, rating: 83, attack: 82, defense: 84, keyPlayers: ['Achraf Hakimi', 'Sofyan Amrabat', 'Yassine Bounou'], form: ['W', 'W', 'D', 'W', 'D'], injuries: [], tactic: '4-3-3', elo: 1930 },
  { id: 'GER', name: 'Germany', flag: '🇩🇪', ranking: 11, rating: 88, attack: 89, defense: 87, keyPlayers: ['Florian Wirtz', 'Jamal Musiala', 'Antonio Rüdiger'], form: ['W', 'W', 'D', 'W', 'W'], injuries: [], tactic: '4-2-3-1', elo: 2030 },
  { id: 'SUI', name: 'Switzerland', flag: '🇨🇭', ranking: 15, rating: 82, attack: 81, defense: 83, keyPlayers: ['Granit Xhaka', 'Manuel Akanji', 'Xherdan Shaqiri'], form: ['W', 'D', 'W', 'D', 'L'], injuries: [], tactic: '3-4-2-1', elo: 1910 },
  { id: 'USA', name: 'United States', flag: '🇺🇸', ranking: 16, rating: 81, attack: 82, defense: 80, keyPlayers: ['Christian Pulisic', 'Weston McKennie', 'Tyler Adams'], form: ['W', 'L', 'W', 'L', 'W'], injuries: ['Sergiño Dest (Knee)'], tactic: '4-3-3', elo: 1880 },
  { id: 'COL', name: 'Colombia', flag: '🇨🇴', ranking: 17, rating: 84, attack: 85, defense: 83, keyPlayers: ['Luis Díaz', 'James Rodríguez', 'Daniel Muñoz'], form: ['W', 'W', 'W', 'D', 'W'], injuries: [], tactic: '4-2-3-1', elo: 1960 },
  { id: 'MEX', name: 'Mexico', flag: '🇲🇽', ranking: 14, rating: 80, attack: 81, defense: 79, keyPlayers: ['Santiago Giménez', 'Edson Álvarez', 'Luis Chávez'], form: ['L', 'D', 'W', 'L', 'W'], injuries: [], tactic: '4-3-3', elo: 1850 },
  { id: 'URU', name: 'Uruguay', flag: '🇺🇾', ranking: 13, rating: 85, attack: 86, defense: 84, keyPlayers: ['Darwin Núñez', 'Federico Valverde', 'Ronald Araujo'], form: ['W', 'W', 'D', 'L', 'W'], injuries: [], tactic: '4-3-3', elo: 1970 },
  { id: 'JPN', name: 'Japan', flag: '🇯🇵', ranking: 18, rating: 82, attack: 84, defense: 80, keyPlayers: ['Kaoru Mitoma', 'Takefusa Kubo', 'Wataru Endo'], form: ['W', 'W', 'W', 'W', 'D'], injuries: [], tactic: '3-4-2-1', elo: 1920 },
  { id: 'SEN', name: 'Senegal', flag: '🇸🇳', ranking: 21, rating: 80, attack: 81, defense: 79, keyPlayers: ['Sadio Mané', 'Nicolas Jackson', 'Kalidou Koulibaly'], form: ['W', 'D', 'W', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1890 },
  { id: 'IRN', name: 'Iran', flag: '🇮🇷', ranking: 20, rating: 78, attack: 80, defense: 76, keyPlayers: ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh'], form: ['W', 'D', 'W', 'W', 'D'], injuries: [], tactic: '4-4-2', elo: 1840 },
  { id: 'KOR', name: 'South Korea', flag: '🇰🇷', ranking: 22, rating: 79, attack: 82, defense: 76, keyPlayers: ['Son Heung-min', 'Kim Min-jae', 'Lee Kang-in'], form: ['W', 'W', 'D', 'L', 'W'], injuries: ['Hwang Hee-chan (Hamstring)'], tactic: '4-2-3-1', elo: 1830 },
  { id: 'AUS', name: 'Australia', flag: '🇦🇺', ranking: 23, rating: 78, attack: 76, defense: 79, keyPlayers: ['Mathew Ryan', 'Jackson Irvine', 'Harry Souttar'], form: ['W', 'L', 'W', 'D', 'W'], injuries: [], tactic: '4-4-2', elo: 1800 },
  { id: 'AUT', name: 'Austria', flag: '🇦🇹', ranking: 25, rating: 82, attack: 81, defense: 82, keyPlayers: ['Marcel Sabitzer', 'Konrad Laimer', 'David Alaba'], form: ['W', 'L', 'W', 'W', 'D'], injuries: ['Xaver Schlager (ACL)'], tactic: '4-2-3-1', elo: 1900 },
  { id: 'SWE', name: 'Sweden', flag: '🇸🇪', ranking: 28, rating: 81, attack: 84, defense: 78, keyPlayers: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski'], form: ['W', 'L', 'W', 'L', 'W'], injuries: [], tactic: '4-4-2', elo: 1860 },
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨', ranking: 30, rating: 80, attack: 78, defense: 81, keyPlayers: ['Enner Valencia', 'Moisés Caicedo', 'Piero Hincapié'], form: ['D', 'W', 'L', 'W', 'W'], injuries: [], tactic: '3-5-2', elo: 1870 },
  { id: 'TUR', name: 'Turkey', flag: '🇹🇷', ranking: 26, rating: 81, attack: 82, defense: 79, keyPlayers: ['Arda Güler', 'Hakan Çalhanoğlu', 'Kenan Yıldız'], form: ['W', 'L', 'W', 'D', 'W'], injuries: [], tactic: '4-2-3-1', elo: 1850 },
  { id: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', ranking: 39, rating: 77, attack: 75, defense: 78, keyPlayers: ['Scott McTominay', 'Andy Robertson', 'John McGinn'], form: ['L', 'D', 'L', 'W', 'D'], injuries: ['Lewis Ferguson (Knee)'], tactic: '5-3-2', elo: 1780 },
  { id: 'CAN', name: 'Canada', flag: '🇨🇦', ranking: 38, rating: 79, attack: 81, defense: 77, keyPlayers: ['Alphonso Davies', 'Jonathan David', 'Tajon Buchanan'], form: ['W', 'D', 'L', 'W', 'W'], injuries: [], tactic: '4-4-2', elo: 1790 },
  { id: 'NOR', name: 'Norway', flag: '🇳🇴', ranking: 47, rating: 82, attack: 89, defense: 75, keyPlayers: ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth'], form: ['L', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1860 },
  { id: 'CZE', name: 'Czechia', flag: '🇨🇿', ranking: 34, rating: 78, attack: 79, defense: 77, keyPlayers: ['Patrik Schick', 'Tomáš Souček', 'Vladimír Coufal'], form: ['D', 'L', 'W', 'D', 'W'], injuries: [], tactic: '3-4-1-2', elo: 1810 },
  { id: 'EGY', name: 'Egypt', flag: '🇪🇬', ranking: 36, rating: 79, attack: 83, defense: 75, keyPlayers: ['Mohamed Salah', 'Mostafa Mohamed', 'Omar Marmoush'], form: ['W', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1820 },
  { id: 'ALG', name: 'Algeria', flag: '🇩🇿', ranking: 46, rating: 78, attack: 80, defense: 76, keyPlayers: ['Riyad Mahrez', 'Saïd Benrahma', 'Amine Gouiri'], form: ['W', 'L', 'W', 'D', 'W'], injuries: [], tactic: '4-3-3', elo: 1800 },
  { id: 'TUN', name: 'Tunisia', flag: '🇹🇳', ranking: 41, rating: 75, attack: 73, defense: 77, keyPlayers: ['Elyes Skhiri', 'Youssef Msakni', 'Montassar Talbi'], form: ['L', 'D', 'W', 'D', 'L'], injuries: [], tactic: '4-5-1', elo: 1750 },
  { id: 'GHA', name: 'Ghana', flag: '🇬🇭', ranking: 64, rating: 76, attack: 78, defense: 74, keyPlayers: ['Mohammed Kudus', 'Iñaki Williams', 'Thomas Partey'], form: ['W', 'D', 'L', 'W', 'D'], injuries: [], tactic: '4-2-3-1', elo: 1710 },
  { id: 'RSA', name: 'South Africa', flag: '🇿🇦', ranking: 59, rating: 74, attack: 73, defense: 74, keyPlayers: ['Percy Tau', 'Teboho Mokoena', 'Ronwen Williams'], form: ['D', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-2-3-1', elo: 1680 },
  { id: 'COD', name: 'DR Congo', flag: '🇨🇩', ranking: 62, rating: 75, attack: 76, defense: 74, keyPlayers: ['Yoane Wissa', 'Chancel Mbemba', 'Arthur Masuaku'], form: ['W', 'D', 'D', 'L', 'W'], injuries: [], tactic: '4-4-2', elo: 1700 },
  { id: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦', ranking: 56, rating: 74, attack: 74, defense: 73, keyPlayers: ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saud Abdulhamid'], form: ['L', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1690 },
  { id: 'QAT', name: 'Qatar', flag: '🇶🇦', ranking: 34, rating: 75, attack: 77, defense: 73, keyPlayers: ['Akram Afif', 'Almoez Ali', 'Lucas Mendes'], form: ['W', 'L', 'W', 'W', 'D'], injuries: [], tactic: '4-2-3-1', elo: 1720 },
  { id: 'IRQ', name: 'Iraq', flag: '🇮🇶', ranking: 55, rating: 73, attack: 75, defense: 71, keyPlayers: ['Aymen Hussein', 'Ali Jasim', 'Rebin Sulaka'], form: ['W', 'D', 'W', 'L', 'W'], injuries: [], tactic: '4-2-3-1', elo: 1670 },
  { id: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', ranking: 60, rating: 74, attack: 75, defense: 73, keyPlayers: ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Jaloliddin Masharipov'], form: ['D', 'W', 'W', 'D', 'W'], injuries: [], tactic: '3-4-1-2', elo: 1680 },
  { id: 'JOR', name: 'Jordan', flag: '🇯🇴', ranking: 71, rating: 73, attack: 75, defense: 71, keyPlayers: ['Musa Al-Taamari', 'Yazan Al-Naimat', 'Yazan Al-Arab'], form: ['L', 'W', 'D', 'W', 'W'], injuries: [], tactic: '3-4-3', elo: 1650 },
  { id: 'NZL', name: 'New Zealand', flag: '🇳🇿', ranking: 104, rating: 69, attack: 71, defense: 67, keyPlayers: ['Chris Wood', 'Liborato Cacace', 'Sarpreet Singh'], form: ['W', 'D', 'L', 'W', 'L'], injuries: [], tactic: '4-4-2', elo: 1550 },
  { id: 'PAR', name: 'Paraguay', flag: '🇵🇾', ranking: 62, rating: 76, attack: 73, defense: 78, keyPlayers: ['Julio Enciso', 'Miguel Almirón', 'Gustavo Gómez'], form: ['D', 'W', 'L', 'D', 'W'], injuries: [], tactic: '4-4-2', elo: 1760 },
  { id: 'BIH', name: 'Bosnia and Herzegovina', flag: '🇧🇦', ranking: 74, rating: 74, attack: 75, defense: 73, keyPlayers: ['Edin Džeko', 'Ermedin Demirović', 'Sead Kolašinac'], form: ['L', 'L', 'D', 'W', 'D'], injuries: [], tactic: '3-5-2', elo: 1720 },
  { id: 'CPV', name: 'Cape Verde', flag: '🇨🇻', ranking: 65, rating: 74, attack: 73, defense: 74, keyPlayers: ['Ryan Mendes', 'Jamiro Monteiro', 'Logan Costa'], form: ['W', 'L', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1690 },
  { id: 'PAN', name: 'Panama', flag: '🇵🇦', ranking: 43, rating: 76, attack: 75, defense: 77, keyPlayers: ['Adalberto Carrasquilla', 'José Fajardo', 'Michael Murillo'], form: ['W', 'L', 'W', 'L', 'D'], injuries: [], tactic: '3-4-3', elo: 1750 },
  { id: 'HAI', name: 'Haiti', flag: '🇭🇹', ranking: 86, rating: 70, attack: 71, defense: 69, keyPlayers: ['Frantzdy Pierrot', 'Duckens Nazon', 'Danley Jean Jacques'], form: ['W', 'D', 'L', 'W', 'L'], injuries: [], tactic: '4-4-2', elo: 1600 },
  { id: 'CUW', name: 'Curaçao', flag: '🇨🇼', ranking: 90, rating: 70, attack: 71, defense: 69, keyPlayers: ['Juninho Bacuna', 'Leandro Bacuna', 'Eloy Room'], form: ['L', 'W', 'D', 'L', 'W'], injuries: [], tactic: '4-3-3', elo: 1580 },
  { id: 'CIV', name: 'Ivory Coast', flag: '🇨🇮', ranking: 37, rating: 81, attack: 80, defense: 81, keyPlayers: ['Sébastien Haller', 'Franck Kessié', 'Evan Ndicka'], form: ['W', 'W', 'D', 'W', 'L'], injuries: [], tactic: '4-3-3', elo: 1880 }
];

export const HISTORY_WINNERS = [
  { year: 2022, host: 'Qatar', winner: 'Argentina', runnerUp: 'France', score: '3-3 (4-2 pens)' },
  { year: 2018, host: 'Russia', winner: 'France', runnerUp: 'Croatia', score: '4-2' },
  { year: 2014, host: 'Brazil', winner: 'Germany', runnerUp: 'Argentina', score: '1-0 (aet)' },
  { year: 2010, host: 'South Africa', winner: 'Spain', runnerUp: 'Netherlands', score: '1-0 (aet)' },
  { year: 2006, host: 'Germany', winner: 'Italy', runnerUp: 'France', score: '1-1 (5-3 pens)' },
  { year: 2002, host: 'South Korea & Japan', winner: 'Brazil', runnerUp: 'Germany', score: '2-0' },
  { year: 1998, host: 'France', winner: 'France', runnerUp: 'Brazil', score: '3-0' },
  { year: 1994, host: 'United States', winner: 'Brazil', runnerUp: 'Italy', score: '0-0 (3-2 pens)' },
  { year: 1990, host: 'Italy', winner: 'West Germany', runnerUp: 'Argentina', score: '1-0' }
];

export const WORLD_CUP_RECORDS = {
  mostTitles: { title: 'Most World Cup Titles', value: 'Brazil (5 Titles)', detail: '1958, 1962, 1970, 1994, 2002' },
  allTimeScorer: { title: 'All-Time Top Goalscorer', value: 'Miroslav Klose (16 Goals)', detail: 'Germany (2002-2014)' },
  mostAppearances: { title: 'Most Player Appearances', value: 'Lionel Messi (26 Matches)', detail: 'Argentina (2006-2022)' },
  singleTournamentScorer: { title: 'Most Goals in a Single Tournament', value: 'Just Fontaine (13 Goals)', detail: 'France (1958)' }
};

export const getCountryIsoCode = (id) => {
  const mapping = {
    ARG: 'ar', FRA: 'fr', ESP: 'es', ENG: 'gb-eng', BRA: 'br', POR: 'pt',
    NED: 'nl', BEL: 'be', CRO: 'hr', MAR: 'ma', GER: 'de', SUI: 'ch',
    USA: 'us', COL: 'co', MEX: 'mx', URU: 'uy', JPN: 'jp', SEN: 'sn',
    IRN: 'ir', KOR: 'kr', AUS: 'au', AUT: 'at', SWE: 'se', ECU: 'ec',
    TUR: 'tr', SCO: 'gb-sct', CAN: 'ca', NOR: 'no', CZE: 'cz', EGY: 'eg',
    ALG: 'dz', TUN: 'tn', GHA: 'gh', RSA: 'za', COD: 'cd', KSA: 'sa',
    QAT: 'qa', IRQ: 'iq', UZB: 'uz', JOR: 'jo', NZL: 'nz', PAR: 'py',
    BIH: 'ba', CPV: 'cv', PAN: 'pa', HAI: 'ht', CUW: 'cw', CIV: 'ci'
  };
  return mapping[id] || 'un';
};
