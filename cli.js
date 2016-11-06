#! /usr/bin/env node
const crayon=require("crayon-terminal")
	,crypto=require("crypto")
	,tinyc=require('tinycolor2')
	,opts={
		 match :{val:'\\S+',help:`assign the global, case-sensitive regex to match text to colorize
${crayon.underline("Examples")}:
-m . will match each character
-m \\d+ will match all contiguous digits
-m [^aeiouyAEIOUY]+ will match all contiguous non-vowels
-m="\\s*\\S+" will match all the spaces before a nonspace, then adjacent nonspaces, etc
Regex with spaces need to be strung: -m=\"[^a-z] {4}\\d+\\s*\"`}
		,salt  :{val:'8D'    ,help:`assign anything here to generate new deterministic colors
${crayon.underline("Examples")}:
-s 9
-s abcd
-s $RANDOM for something different each time if you use bash`}
		,invert:{val:false ,help:"flag colorizes background and makes text black. -w makes text white."}
		,white :{val:false ,help:"flag makes background white"}
		,black :{val:false ,help:"flag makes background black"}
		,help  :{val:false ,help:"flag shows this help"}
	}
	,args=require('minimist')(process.argv.slice(2),{
		default:Object.keys(opts).reduce((set,part)=>{
			set[part]=opts[part].val
			return set
		},{})
		,alias:Object.keys(opts).reduce((set,part)=>{
			set[part[0]]=part
			return set
		},{})
		,unknown(x){
			crayon.red.bold.log(`unknown arg: ${x} check --help for options`)
			process.exit(1)
		}
	})
	,colorize=(data)=>{
		var cachedWords={}
		return crayon.stripColor(data).replace(new RegExp(`(${args.match})`,"g"),(all,word)=>{
				if(!cachedWords[word]){
					var hex=crypto.createHash('md5')
							.update(word+args.salt)
							.digest('hex')
							.slice(0, 6)
						,colo=tinyc(hex).saturate(20)
						,mono=tinyc(args.white?"fff":"000")
						,dir=args.white?"darken":"lighten"
					
					while(!tinyc.isReadable(colo,mono))
						colo[dir](30)
					
					colo=colo.toHex()
					mono=mono.toHex()
					
					var style=crayon.foreground(colo)
					     if(args.invert) style=style.background(colo ).foreground(mono)
					else if(args.black ) style=style.background("000").foreground(colo)
					else if(args.white ) style=style.background("fff").foreground(colo)

					cachedWords[word]=style(word)
				}
				return cachedWords[word]
			})
	}

var data=''

if(process.stdin.isTTY || args.help){
	var flags=Object.keys(opts)
		,longest=Math.max(...flags.map(x=>x.length))
		,json=JSON.parse(require("fs").readFileSync("package.json"))
	console.log([
		 `\n${crayon.underline("DESCRIPTION")}: ${colorize(json.description)}`
		,`${crayon.underline("USAGE")}: ${colorize('pipe text to it, like this:')}`
		,`yourText | ${json.name} [-${flags.map(x=>x[0]).join("")}, all optional flags]`
		,crayon.underline("FLAGS")+":"
		,...flags.map(flag=>{
			var defaultVal=opts[flag].val?`\n(default: ${opts[flag].val} )`:''
				,aFlag=flag
				,isBool=opts[flag].val.constructor==(true).constructor
			while(aFlag.length<longest) aFlag+=" "
			var left=`-${flag[0]}, --${aFlag} :`
				,txt=crayon.foreground("#ccc")(" "+(opts[flag].help+defaultVal).replace(/\n/g,"\n"+left.replace(/./g,' ')))
			
			if(isBool){
				args[flag]=!args[flag]
				txt=colorize(txt)
				args[flag]=!args[flag]
			}
			return crayon.bold(left)+txt
		})
		,""
	].join("\n\n"))
	process.exit(0)
}
else process
	.stdin
	.resume()
	.setEncoding('utf8')
	.on('data',chunk=>data+=chunk)
	.on('end',()=>process.stdout.write(colorize(data)))