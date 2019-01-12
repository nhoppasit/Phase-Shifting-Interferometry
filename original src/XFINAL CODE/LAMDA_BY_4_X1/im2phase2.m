%Compute phase(x,y)
%eps = 1e-12;
dgCI1 = double(sgCI1); %convert to double by double()
dgCI2 = double(sgCI2);
dgCI3 = double(sgCI3);
dgCI4 = double(sgCI4);
dgCI5 = double(sgCI5);

trt1 = 2*(dgCI2 - dgCI4);
trt2 = 2*dgCI3 - dgCI5 - dgCI1;

PHASE = atan(trt1./trt2);

 %Replace NaN by zero
 %PHASE(isnan(PHASE)) = 0;

clf
imshow(PHASE)
% mesh(PHASE)
% view(90,0)