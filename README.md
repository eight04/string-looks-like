string-looks-like
==================

[![Build Status](https://travis-ci.com/eight04/string-looks-like.svg?branch=master)](https://travis-ci.com/eight04/string-looks-like)
[![codecov](https://codecov.io/gh/eight04/string-looks-like/branch/master/graph/badge.svg)](https://codecov.io/gh/eight04/string-looks-like)
[![install size](https://packagephobia.now.sh/badge?p=string-looks-like)](https://packagephobia.now.sh/result?p=string-looks-like)

An assert utility that is used to assert multiline string. Support placeholders.

![screenshot](https://i.imgur.com/OAJXB3r.png)

Installation
------------

```
npm install -D string-looks-like
```

Usage
-----

```js
const {looksLike} = require("string-looks-like");

looksLike("Hello world!", "Hello {{\w+}}!");
looksLike(helloWorldFunction.toString(), `
function test() {
  console.log("hello {{\w+}}!");
}
`);
```

API
----

This module exports following members:

* `looksLike`

### looksLike

```js
looksLike(actual: String, expect: String) => void
```

Test a string with a template and throw an `AssertionError` if not matched.

* Whitespace in `expect` matches zero or more whitespaces.
* A placeholder `{{}}` will be converted into regexp.
* Compare character-by-character.

Related projects
----------------

* [html-looks-like](https://www.npmjs.com/package/html-looks-like)

Changelog
---------

* 0.1.0 (Feb 7, 2020)

  - First release.
