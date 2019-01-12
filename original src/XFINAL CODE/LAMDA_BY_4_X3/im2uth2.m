%Threshold by under

% th = 5;
sgCI1(sgCI1<=th) = 0;
sgCI2(sgCI2<=th) = 0;
sgCI3(sgCI3<=th) = 0;
sgCI4(sgCI4<=th) = 0;
sgCI5(sgCI5<=th) = 0;

%Show original
subplot(231)
imshow(sgCI1)
subplot(232)
imshow(sgCI2)
subplot(233)
imshow(sgCI3)
subplot(234)
imshow(sgCI4)
subplot(235)
imshow(sgCI5)