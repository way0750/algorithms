// simply divide string into groups of 3 from left to right
// then replace each ground with RNA codon table value

var codonTable = {
  UUU: "F", CUU: "L", AUU: "I", GUU: "V", 
  UUC: "F", CUC: "L", AUC: "I", GUC: "V",
  UUA: "L", CUA: "L", AUA: "I", GUA: "V",
  UUG: "L", CUG: "L", AUG: "M", GUG: "V",
  UCU: "S", CCU: "P", ACU: "T", GCU: "A",
  UCC: "S", CCC: "P", ACC: "T", GCC: "A",
  UCA: "S", CCA: "P", ACA: "T", GCA: "A",
  UCG: "S", CCG: "P", ACG: "T", GCG: "A",
  UAU: "Y", CAU: "H", AAU: "N", GAU: "D",
  UAC: "Y", CAC: "H", AAC: "N", GAC: "D",
  UAA: "", CAA: "Q", AAA: "K", GAA: "E",
  UAG: "", CAG: "Q", AAG: "K", GAG: "E",
  UGU: "C", CGU: "R", AGU: "S", GGU: "G",
  UGC: "C", CGC: "R", AGC: "S", GGC: "G",
  UGA: "", CGA: "R", AGA: "R", GGA: "G",
  UGG: "W", CGG: "R", AGG: "R", GGG: "G",
};


//using regular expression:
let translateUsingRegExp = (str) => {
  return str.replace(/\w{3}/g, (match) => {
    return codonTable[match];
  });
};

//using for loop in case people really hate regular expression:
let translateUsingForLoop = (str) => {
  let finalStr = "";
  for (let i = 0; i < str.length; i+=3){
    finalStr+=codonTable[str.substr(i, 3)];
  }
  return finalStr;
};

let str  ="AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA";
translateUsingForLoop(str);


