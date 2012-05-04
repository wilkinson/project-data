fasta=function(x){
	// Get the USM library if it is not there already
	if(typeof(usm)=='undefined'){
		var s=document.createElement('script');
		s.src='http://usm.github.com/usm.js';
		document.body.appendChild(s);
		s.onload=fasta(x);
	}
	else{
		var uBac = new usm(x.body);
		fasta.A = uBac.align('TCCACAGCATGCGTGACGATGACACG'); // store result in fasta.A
		// Sean, I am guessing in this position you want to have something returning fasta.A to the Q
	}
}