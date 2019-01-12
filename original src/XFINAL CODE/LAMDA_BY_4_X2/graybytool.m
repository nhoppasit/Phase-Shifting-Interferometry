%Convert to gray scale
%Case II: to gray by toolbox
gCI1 = rgb2gray(CI1);
gCI2 = rgb2gray(CI2);
gCI3 = rgb2gray(CI3);
gCI4 = rgb2gray(CI4);
gCI5 = rgb2gray(CI5);

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