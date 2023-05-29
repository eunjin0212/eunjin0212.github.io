function solution(history = [], option = [], keyword = '') {
  const recomend = option.map(optArr => { 
      if (optArr.some(opt => opt === 'F')) return []
      let recomendedWords = [];
      if (optArr.some(o => o === 'W' || o === 'R')) { 
          recomendedWords = history.map(s => s.split(' ')).flat().filter(w => w === keyword)
          if (optArr.some(o => o === 'R')) { 
              recomendedWords = recomendedWords.map(w => w.length > 10 ? `${v.slice(0, 19)}...` : v)
          }
      }

      if (optArr.some(o => o === 'WC')) {
          const stringArr = keyword.split('*')
          if (stringArr.length > 2) { 
              recomendedWords = ['empty']
              return recomendedWords;
          }
          const word = stringArr.filter(v => v !== '*')[0]
          recomendedWords = history.filter(h => h.includes(word))
      }
      return recomendedWords;
  })
  return recomend;
}
console.log(solution(["honggildong","honggilsoon","honggil"], [["WC","T"]], "honggil*"))
