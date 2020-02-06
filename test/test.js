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
    looksLike("Hello world!", String.raw`Hello {{\w+}}!`);
    looksLike("Hello world!", String.raw`Hello world{{\S}}`);
    assert.throws(() => {
      looksLike("Hello world!", String.raw`Hello {{\d+}}!`);
    }, /Expect \/\\d\+\//);
  });
});
