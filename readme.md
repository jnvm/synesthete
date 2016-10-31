# Synesthete
![Deterministically colorize cli words.](https://cldup.com/ZExW4HGpTe.PNG)


Words are considered nonspace clumps.

Salt color mapping by setting env var `SYNESTHETE`.

A luminance check is performed to keep colors mostly bright enough to be readable on a dark background.

This was originally made to better visually differentiate columns of same-length words in bash outputs / text-only interfaces.

Plus the cli just needs more color sometimes.

## Install
`npm i -g synesthete`

## Example
Regular usage:

`> echo "You pass butter." | synesthete`

![example of cli text colored](https://cldup.com/sJzfLzGmRo.PNG)

But that's a lot to type, let's alias it to sy:

`> alias sy=synesthete`

Setting salt:

`> export SYNESTHETE=1234 # but it could be anything, try a few`

Then color mapping is different:

![different colors](https://cldup.com/FaFDskJeOZ.PNG)

Should work on any text:

![ls -larth](https://cldup.com/S0NEu47Up8.PNG)

![tree -AL 2](https://cldup.com/7PDo3ystG4.PNG)

: D