%main
%Load image-crop image-graybytool-
%masktheshold-im2phase-modulo2pi-
%unwrap1-shifbycolumn-unwrap2-shiftbyrow-slop2offset
%--------------------------------------------
clc
clear
drawnow
close all
warning off
%--------------------------------------------
disp('Waiting for load image...')
load_image
disp('Load image......[done].')
%--------------------------------------------
disp('Waiting for crop image...')
pause(1)
clf
imshow(I1)
title('Please CLICK 2-point to define area of calculation...')
[gx,gy]=ginput(2);
startCol = gx(1);
startRow = gy(1);
endCol =gx(2);
endRow = gy(2);
crop_image
disp('Crop image......[done].')
%--------------------------------------------
disp('Waiting for convert to gray scale...')
pause(1)
graybytool
%pause
disp('Convert image......[done].')
%--------------------------------------------
disp('Waiting for average sampling...')
pause(1)
delta = 20;
%gsampling
gsampling2
disp('Average sampling......[done].')
%--------------------------------------------
disp('End main')
disp('Auto call CROPWIN(sgCI1,sgCI2,sgCI3,sgCI4,sgCI5)...')
disp('After finish CROPWIN, you must call DOUNWARP to process final analysis.')
cropwin(sgCI1);
