# Synesthete
![Deterministically colorize cli words.](https://cldup.com/ZExW4HGpTe.PNG)

This was originally made to better visually differentiate columns of same-length words in bash outputs / text-only interfaces.

To be exact, hue is deterministic based on the matched text, lightness is varied to ensure readability.

Plus the command line just needs more color sometimes.

## Install & Usage
`npm i -g synesthete`

Regular usage:

`> echo "You pass butter." | synesthete`

![example of cli text colored](https://cldup.com/sJzfLzGmRo.PNG)

But that's a lot to type, let's alias it to just `sy`:

`> alias sy='synesthete'`

Ah, much better.

## Flags
in `--help`:
```
-m, --match  : assign the global, case-sensitive regex to match text to colorize
              Examples:
              -m . will match each character
              -m \d+ will match all contiguous digits
              -m [^aeiouyAEIOUY]+ will match all contiguous non-vowels
              -m="\s*\S+" will match all the spaces before a nonspace, then adjacent nonspaces, etc
              Regex with spaces need to be strung: -m="[^a-z] {4}\d+\s*"
              (default: \S+ )

-s, --salt   : assign anything here to generate new deterministic colors
              Examples:
              -s 9
              -s abcd
              -s $RANDOM for something different each time if you use bash
              (default: 8D )

-i, --invert : flag colorizes background and makes text black. -w makes text white.

-w, --white  : flag makes background white

-b, --black  : flag makes background black

-h, --help   : flag shows this help
```
## Examples

!['list'](https://cldup.com/JN4EYN1ERe.PNG)

Should work on weird characters, too:

!['tree'](https://cldup.com/zOTYjgUhc3.PNG)

Maybe you want to color the background and spaces surrounding words:

!['list inverted'](https://cldup.com/bHWq2OrSH7.PNG)

Or color the background with white text:

!['list inverted white'](https://cldup.com/inrpbouCVm.PNG)

Or color only digits on a black background:

!['list black match numbers'](https://cldup.com/IAdx2Q8Dqp.PNG)

Or color every character something different each time!

!['randomly color each character'](https://cldup.com/PysJ7LB8BO.PNG)

 If you find a combination you like, add it to your alias.

Related info:
* https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
* https://regex101.com/
* [VS Ramachandran on synesthesia](https://youtu.be/Rl2LwnaUA-k?t=17m53s)
* [But...why?](https://www.youtube.com/watch?v=mG5v2udwOPY)