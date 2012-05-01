function y = fasta2js(DIR)

%Converts fasta files into javascript function call fasta({name:..., head:..., body:...})
%Jonas Almeida, May 2012

d = dir(DIR);

if length(d)==0
    error([DIR,' has no content']);
end

k = strfind(DIR,'/');
if length(k)>0
    k=k(end);
    DIR0=DIR(1:k);
    DIR1=DIR(k+1:end);
else
    DIR0='';
end



for i=1:length(d)
    dt.name=d(i).name;
    disp([num2str(i),'/',num2str(length(d)),' ',DIR0,d(i).name]);
    fidR = fopen([DIR0,d(i).name],'r');
    fidW = fopen([DIR0,d(i).name,'.js'],'w');
    fprintf(fidW,'%s\n',['fasta({name:"',d(i).name,'",']);
    dt.head=fgetl(fidR);
    fprintf(fidW,'%s\n',['head:"',dt.head,'",']);
    fprintf(fidW,'%s','body:"');
    while ~feof(fidR)
        fprintf(fidW,'%s',fgetl(fidR));
    end
    fprintf(fidW,'%s','"})');
end
fclose(fidR);fclose(fidW);
