%smooth
sgCI1 = ismooth(sgCI1,f);
sgCI2 = ismooth(sgCI2,f);
sgCI3 = ismooth(sgCI3,f);
sgCI4 = ismooth(sgCI4,f);
sgCI5 = ismooth(sgCI5,f);

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