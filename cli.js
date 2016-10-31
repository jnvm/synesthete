#! /usr/bin/env node
const crayon=require("crayon-terminal")
	,crypto=require("crypto")

if (!String.prototype.padStart) {
	String.prototype.padStart = function (max, fillString) {
		return padStart(this, max, fillString);
	};
}

function padStart (text, max, mask) {
	const cur = text.length;
	if (max <= cur) {
		return text;
	}
	const masked = max - cur;
	let filler = String(mask) || ' ';
	while (filler.length < masked) {
		filler += filler;
	}
	const fillerSlice = filler.slice(0, masked);
	return fillerSlice + text;
}

var data=''
	,cachedWords={}

process
	.stdin
	.resume()
	.setEncoding('utf8')
	.on('data', chunk=>data += chunk)
	.on('end',()=>
		process.stdout.write(
			crayon.stripColor(data).replace(/(\S+)/g,(all,word)=>{
				if(!cachedWords[word]){
					var rgb=crypto.createHash('md5')
							.update(word+(process.env.SYNESTHETE||''))
							.digest()
							.toString('hex')
							.slice(0, 6)
							.split("")
							.reduce((set,part,i)=>{
								set.c+=part
								if((i%2)){
									set.push(parseInt(set.c,16))
									set.c=''
								}
								return set
							},Object.assign([],{c:''}))
						//luminance check
						,[r,g,b]=rgb
							.map(c=>c/255)
							.map(c=>
								c<=0.03928
								? c/12.92
								: Math.pow((c+0.055)/1.055, 2.4)
							)
						,L=0.2126 * r + 0.7152 * g + 0.0722 * b					
						,isLight=L > 0.15 //.179?
						
					if(!isLight) rgb=rgb.map(x=>255-x)
					var back2hex=rgb.map(x=>x.toString(16).padStart(2,"0")).join("")
					cachedWords[word]=crayon.foreground("#"+back2hex)(word)
				}
				return cachedWords[word]
			})
		)
	)