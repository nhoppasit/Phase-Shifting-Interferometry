%--------------------------------------------
drawnow
warning off
%--------------------------------------------
%sgCI1,sgCI2,sgCI3,sgCI4,sgCI5
%imshow(sgCI1);
peI1 = double(sgCI1);
peI2 = double(sgCI2);
peI3 = double(sgCI3);
peI4 = double(sgCI4);
peI5 = double(sgCI5);

val = (peI1-peI2)./(peI2-peI4);
%val = (peI1-peI5);
val(val==-inf) = NaN;
val(val==inf) = NaN;
val = val/2;
% mval = max(max(abs(val)));
% val = val/mval;

pe = acos(val);

pe(pe>3) = NaN;
pe(pe<0.1) = NaN;

rpe = real(pe(find(~isnan(pe))));
N = length(rpe);

sum_pe = sum(rpe);
%pe_avg = sum_pe/N;
pe_avg = mean(rpe);
pe_std = std(rpe);

mesh(real(pe));
xlabel('x, pixel');
ylabel('y, pixel');
zlabel('Phase error, Rad');
title(['N = ' num2str(N) ', Avg = ' num2str(pe_avg) ' rad, Std = ' num2str(pe_std) ' rad'])

%--------------------------------------------
warning on
%--------------------------------------------
