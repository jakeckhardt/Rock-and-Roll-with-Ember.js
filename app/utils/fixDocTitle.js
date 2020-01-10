import { helper } from '@ember/component/helper';

export function fixDocTitle(input) {
  let finalLetter = input.charAt(input.length - 1);

  if(finalLetter === "s") {
    return input + "'";
  } else {
    return input + "'s";
  }
}

export default helper(fixDocTitle);