function normalOlasiligi(mean, type) {
  let ranges = [];
  var basketballRanges = [
    { label: '191-200', min: 191, max: 200 },
    { label: '201-210', min: 201, max: 210 },
    { label: '211-220', min: 211, max: 220 },
    { label: '221-230', min: 221, max: 230 },
    { label: '231-240', min: 231, max: 240 },
    { label: '241-250', min: 241, max: 250 },
    { label: '251-280', min: 251, max: 280 }
  ];
  var footballRanges = [
    { label: '0-1', min: 0, max: 1 },
    { label: '0-2', min: 0, max: 2 },
    { label: '0-3', min: 0, max: 3 },
    { label: '1-2', min: 1, max: 2 },
    { label: '1-3', min: 1, max: 3 },
    { label: '1-4', min: 1, max: 4 },
    { label: '2-3', min: 2, max: 3 },
    { label: '2-4', min: 2, max: 4 },
    { label: '2-5', min: 2, max: 5 },
    { label: '3-4', min: 3, max: 4 },
    { label: '3-5', min: 3, max: 5 },
    { label: '3-6', min: 3, max: 6 },
    { label: '4-5', min: 4, max: 5 },
    { label: '4-6', min: 4, max: 6 },
  ];
  if (type === 'basketball') {
    ranges = basketballRanges;
  } else {
    ranges = footballRanges;
  }
  var olasiliklar = {};
  stdDev = Math.sqrt(mean);
  
  function normalDistribution(x, mean, stdDev) {
    // Standard normal distribution formula
    return (
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
      Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)))
    );
  }

  ranges.forEach(function (range) {
    var label = range.label;
    var min = range.min;
    var max = range.max;
    var olasilik = 0;

    // Calculate the cumulative probability within the range
    for (var i = min; i <= max; i++) {
      olasilik += normalDistribution(i + 0.5, mean, stdDev); // Using midpoint approximation
    }

    olasiliklar[label] = olasilik;
  });

   var sortedOlasiliklar = Object.keys(olasiliklar).sort(function (a, b) {
    return olasiliklar[b] - olasiliklar[a];
  });

  // Sıralanmış olasılıkları içeren yeni bir nesne oluştur ve döndür
  var sortedOlasiliklarObj = {};
  sortedOlasiliklar.forEach(function (label) {
    sortedOlasiliklarObj[label] = olasiliklar[label];
  });

  return sortedOlasiliklarObj;
}

export default normalOlasiligi;
