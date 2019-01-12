UPHASE = image1_unwrapped;
[H,W] = size(UPHASE);

%Config algorithm-----------------------------
ROW = H/2;
ROW = round(ROW);
%-----------------------------

%Show line
figure
subplot(121)
duphase = diff(UPHASE(ROW,:));
sdown = find(duphase>5)
sup = find(duphase<-5)
plot(duphase)
grid on
subplot(122)
plot(UPHASE(ROW,:))
grid on
