# tap-parser

A javascript tap file parser

## Usage / Example

for the following tap file `test-result.tap`

```tap
1..4
ok 1 - Input file opened
not ok 2 - First line of the input valid.
More output from test 2. There can be
  arbitrary number of lines for any output
  so long as there is at least some kind
  of whitespace at beginning of line.
ok 3 - Read the rest of the file
#TAP meta information
not ok 4 - Summarized correctly # TODO Not written yet
```

get the content of your tap file as a string
then put it in the parser:

```js
var parser = new tap.Parser( tapFileString );

parser.getTest(1).isValid(); // => true
parser.getTest(2).getLabel(); // => First line of the input valid

parser.getTestCount(); // => 4
parser.getValidCount(); // => 2
parser.getFailedCount(); // => 2

parser.getTest(3).getDetails(); // => arbitrary number of (...) beginning of line.
```

## Copyright 

tap-parser is released under the GPL v2.

Copyright (c) 2014 Franck Ernewein, See LICENSE for details.
