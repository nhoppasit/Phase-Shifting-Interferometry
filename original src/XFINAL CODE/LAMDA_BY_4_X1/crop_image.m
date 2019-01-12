%Crop
 %startCol = 1156;
 %startRow = 500;
 %endCol = 3058;
 %endRow = 2351;
CI1 = I1(startRow:endRow,startCol:endCol,:);
CI2 = I2(startRow:endRow,startCol:endCol,:);
CI3 = I3(startRow:endRow,startCol:endCol,:);
CI4 = I4(startRow:endRow,startCol:endCol,:);
CI5 = I5(startRow:endRow,startCol:endCol,:);

%show the croped
subplot(231)
imshow(CI1)
subplot(232)
imshow(CI2)
subplot(233)
imshow(CI3)
subplot(234)
imshow(CI4)
subplot(235)
imshow(CI5)