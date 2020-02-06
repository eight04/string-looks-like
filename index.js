const {AssertionError} = require("assert");

const {codeFrameColumns} = require("@babel/code-frame");
const stringPos = require("string-pos");

const matchers = [
  matchWhitespace,
  matchPlacehold,
  matchToken
];

function looksLike(actual, expect) {
  let i = 0, j = 0;
  while (i < actual.length && j < expect.length) {
    let match;
    for (const test of matchers) {
      match = test(expect, j);
      if (!match) continue;
      j = match.lastIndex;
      i = match.eat(actual, i);
      break;
    }
    if (!match) {
      throw new Error(`no matcher found\n\n${drawFrame(expect, j)}`);
    }
  }
}

function drawFrame(s, index) {
  const loc = stringPos(s, index);
  loc.column++;
  return codeFrameColumns(s, {start: loc});
}

function matchWhitespace(input, index) {
  const rx = /\s+/y;
  rx.lastIndex = index;
  const match = rx.exec(input);
  if (!match) {
    return;
  }
  return {eat, lastIndex: rx.lastIndex};
  
  function eat(s, index) {
    rx.lastIndex = index;
    const match = rx.exec(s);
    return match ? rx.lastIndex : index;
  }
}

function matchToken(input, index) {
  const rx = /\d+|\w+|./y;
  rx.lastIndex = index;
  const match = rx.exec(input);
  if (!match) {
    return;
  }
  return {eat, lastIndex: rx.lastIndex};
  
  function eat(s, index) {
    if (s.slice(index, index + match[0].length) === match[0]) {
      return index + match[0].length;
    }
    throw new AssertionError({
      message: `Expect '${match[0]}' at pos ${index}\n\n${drawFrame(s, index)}`,
      stackStartFn: looksLike
    });
  }
}

function matchPlacehold(input, index) {
  const rx = /\{\{([\s\S]+)\}\}/y;
  rx.lastIndex = index;
  const match = rx.exec(input);
  if (!match) {
    return;
  }
  const pattern = new RegExp(match[1].trim(), "y");
  return {eat, lastIndex: rx.lastIndex};
  
  function eat(s, index) {
    pattern.lastIndex = index;
    const match = pattern.exec(s);
    if (match) {
      return pattern.lastIndex;
    }
    throw new AssertionError({
      message: `Expect ${pattern.source} at pos ${index}\n\n${drawFrame(s, index)}`,
      stackStartFn: looksLike
    });
  }
}

module.exports = {looksLike};
