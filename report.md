Using Q Machine to Analyze Multiple Prokaryote Genomes
======================================================

In this experiment, we'll look for the longest similar segment in the fourteen
*Streptococcus pneumoniae* strains for which the full genomes are available at
NCBI's FTP site, as of April 30, 2012.

<script async src="https://qmachine.org/q.js"></script>

The first step is to make Q Machine's JavaScript library available, either by
including it in the HTML of a webpage via

    <script src="https://qmachine.org/q.js"></script>

or by loading it programmatically in JavaScript with

    s = document.createElement('script');
    s.src = 'https://qmachine.org/q.js';
    document.body.appendChild(s);

In this illustration, we will distribute the mapReduce decomposition of
sequence alignment described in (Almeida 2012), for which further information
is available online at [http://usm.github.com](http://usm.github.com). In that
report, the genome of one of those strains, R6, is probed for the longest
similar segment to "TCCACAGCATGCGTGACGATGACACG", and three different segments
of length 10 are found using the following code:

    uBac = new usm('ftp://ftp.ncbi.nlm.nih.gov/genomes/Bacteria/Streptococcus_pneumoniae_R6_uid57859/NC_003098.fna');
    A = uBac.align('TCCACAGCATGCGTGACGATGACACG');

Here, the fourteen genomes, each of which is approximately two million base
pairs long, are made available as JavaScript function calls hosted online at
[http://q.cgr.googlecode.com/hg/Pneumo](http://q.cgr.googlecode.com/hg/Pneumo).
Using the R6 strain as an example, the
[fasta() call](http://q.cgr.googlecode.com/hg/Pneumo/NC_003098.fna.js)
looks, when indented and abbreviated for readability, as follows:

    fasta({
        name:"NC_003098.fna",
        head:">gi|15902044|ref|NC_003098.1| Streptococcus pneumoniae R6, complete genome",
        body:"TTGAAAGAAAAACAATTTTGGAATCGTATATTAGAATTTGCACA...TGCTATCTATGGTAAAATATCTCTAGT"
    });

The [fasta](http://q.cgr.googlecode.com/hg/fasta.js) function will now be
defined so that it can be distributed to remote machines and its results can be
returned by Q to the original machine. Because Q provides opportunistic
parallelization for programs that utilize it, the sequence matching for all
fourteen genomes will execute simultaneously when enough remote machines are
available.

    // (breaking for lunch)

