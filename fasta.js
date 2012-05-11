fasta=function(x){
	if(!!x){fasta.seq=x}; // store sequence in fasta() 
	// Get the USM library and its dependencies if it is not there already
	if(typeof(usm)=='undefined'){
		//fasta.load(['http://localhost:8888/jmat/jmat.js','http://localhost:8888/usm/usm.js'],fasta)
		fasta.load(['http://jmat.googlecode.com/git/jmat.js'],['http://usm.github.com/usm.js'],fasta)
		}
	else{
		console.log('Indexing genome ...')
		//var uBac = new usm(x.body); // for small genomes this would be enough
		var uBac = new usm();
		uBac.encodeLong(fasta.seq.body,'ACGT');
		console.log('Aligning new sequence to indexed genome...')
		fasta.A = uBac.align('TCCACAGCATGCGTGACGATGACACG'); // store result in fasta.A
		console.log('done !');
		// Sean, I am guessing in this position you want to have something returning fasta.A to the Q
	}
}

fasta.load=function(url,callback){ // to load fasta call from remote location
	if(typeof(url)=='string'){url=[url,'']} // to make sure it's an array of strings, there may be more than one
	else if(url[url.length-1]!==''){url.push('')} // making sure trailing '' is there, it will be used to close iteration
	if(url[0].length>0){
		console.log('loading '+url[0]+' ...');
		var s=document.createElement('script');
		s.src=url[0];
		s.onload=function(){
			fasta.load(url.slice(1),callback)
			}
		document.body.appendChild(s);	
	}
	else if(!!callback){callback()}
}