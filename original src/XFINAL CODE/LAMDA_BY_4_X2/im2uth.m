%Threshold by under

th = 5;
gCI1(gCI1<=th) = 0;
gCI2(gCI2<=th) = 0;
gCI3(gCI3<=th) = 0;
gCI4(gCI4<=th) = 0;
gCI5(gCI5<=th) = 0;

%Show original
subplot(231)
imshow(gCI1)
subplot(232)
imshow(gCI2)
subplot(233)
imshow(gCI3)
subplot(234)
imshow(gCI4)
subplot(235)
imshow(gCI5)