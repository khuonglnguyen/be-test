const increaseCode = (code, type) => {
  const codeLastest = code;
  const arr = codeLastest.split("-");
  let indexCode = 1;
  if (arr[0] !== type) {
    indexCode = 0;
  }
  let codee = Number(arr[indexCode]);
  const length = arr[indexCode].length;
  codee += 1;
  const newLength = length - codee.toString().length;

  let result = "";
  for (let i = 0; i < newLength; i++) {
    result += "0";
  }

  result += codee;

  if (indexCode === 0) {
    result = result + `-${type}`;
  } else {
    result = `${type}-` + result;
  }

  return result;
};

module.exports = {
  increaseCode,
};
