%--------------------------------------------
drawnow
warning off
%--------------------------------------------
%sgCI1,sgCI2,sgCI3,sgCI4,sgCI5
%imshow(sgCI1);
peI1 = double(sgCI1(round(cy),round(cx)));
peI2 = double(sgCI2(round(cy),round(cx)));
peI3 = double(sgCI3(round(cy),round(cx)));
peI4 = double(sgCI4(round(cy),round(cx)));
peI5 = double(sgCI5(round(cy),round(cx)));

val = (peI1-peI5)./(peI2-peI4);
val(val==-inf) = NaN;
val(val==inf) = NaN;
val = 0.5*val;

pe = acos(val)

rpe = real(pe(find(~isnan(pe))));
N = length(rpe);

sum_pe = sum(rpe);
%pe_avg = sum_pe/N;
pe_avg = mean(rpe)
pe_std = std(rpe)

%--------------------------------------------
warning on
%--------------------------------------------
