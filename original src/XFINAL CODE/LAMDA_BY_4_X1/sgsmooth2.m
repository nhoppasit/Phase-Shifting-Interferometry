%smooth
sgCI1 = uint8(round(medfilt2(double(sgCI1),[f f])));
sgCI2 = uint8(round(medfilt2(double(sgCI2),[f f])));
sgCI3 = uint8(round(medfilt2(double(sgCI3),[f f])));
sgCI4 = uint8(round(medfilt2(double(sgCI4),[f f])));
sgCI5 = uint8(round(medfilt2(double(sgCI5),[f f])));

figure
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