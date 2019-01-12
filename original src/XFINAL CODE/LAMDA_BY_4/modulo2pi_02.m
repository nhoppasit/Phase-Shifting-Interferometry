%modulo 2pi special
mPHASE = PHASE;
ii = find(trt1==0 & trt2>0);
mPHASE(ii) = 0;
ii = find(trt1>0 & trt2>0);
mPHASE(ii) = PHASE(ii);
ii = find(trt1>0 & trt2==0);
mPHASE(ii) = PHASE(ii)*0 + (pi/2);
ii = find(trt1>0 & trt2<0);
mPHASE(ii) = PHASE(ii) + pi;
ii = find(trt1==0 & trt2<0);
mPHASE(ii) = PHASE(ii)*0 + (pi);
ii = find(trt1<0 & trt2<0);
mPHASE(ii) = PHASE(ii) + (pi);
ii = find(trt1<0 & trt2==0);
mPHASE(ii) = PHASE(ii)*0 + ((3*pi)/2);
ii = find(trt1<0 & trt2>0);
mPHASE(ii) = PHASE(ii) + (2*pi);
imshow(mPHASE)








