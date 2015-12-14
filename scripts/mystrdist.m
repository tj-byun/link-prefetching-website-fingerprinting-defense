function ret = mystrdist(a,b) 
	ret=[];
	for i=1:size(a,1)
		tmp=[];
		for j=1:size(b,1)
			d=strdist(char(a(i,1)),char(b(j,1)));
			tmp=[tmp;d];
		end
		ret=[ret tmp];
	end
end
