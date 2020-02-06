/* eslint-env mocha */
const assert = require("assert");

const {looksLike} = require("..");

describe("looksLike", () => {
  it("basic", () => {
    looksLike("Hello world!", `
      Hello world!
    `);
    looksLike("Hello world!", 'Hello world!');
    assert.throws(() => {
      looksLike("Hello world!", 'Hello earth!');
    }, /Expect 'earth'/);
    assert.throws(() => {
      looksLike("Hello world!", 'Hello world?');
    }, /Expect '?'/);
  });
  
  it("placeholders", () => {
    let result;
    result = looksLike("Hello world!", String.raw`Hello {{\w+}}!`);
    assert.equal(result[0], "world");
    
    result = looksLike("Hello world!", String.raw`Hello world{{\S}}`);
    assert.equal(result[0], "!");
    
    result = looksLike("Hello world!", String.raw`{{\w+}} {{\w+(.)}}`);
    assert.equal(result[0], "Hello");
    assert.equal(result[1][0], "world!");
    assert.equal(result[1][1], "!");
    
    assert.throws(() => {
      looksLike("Hello world!", String.raw`Hello {{\d+}}!`);
    }, /Expect \\d\+/);
  });
});
