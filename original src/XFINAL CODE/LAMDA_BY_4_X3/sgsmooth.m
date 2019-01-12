%smooth
gCI1 = uint8(round(sgolayfilt(double(gCI1),k,f)));
gCI2 = uint8(round(sgolayfilt(double(gCI2),k,f)));
gCI3 = uint8(round(sgolayfilt(double(gCI3),k,f)));
gCI4 = uint8(round(sgolayfilt(double(gCI4),k,f)));
gCI5 = uint8(round(sgolayfilt(double(gCI5),k,f)));


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