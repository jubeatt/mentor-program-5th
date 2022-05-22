function printFactor(n) {
  for(var i=1; i<=n; i++) {
    if(isDivisible(n, i)) {
      console.log(i)
    }
  }
}
function isDivisible (Dividend, Divisor) {
  return Dividend % Divisor === 0
}

printFactor(7);

/* n / i 
n => 被除數 Dividend
i => 除數 Divisor */
