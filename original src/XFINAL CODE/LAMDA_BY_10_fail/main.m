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
delta = 1;
%gsampling
gsampling2
disp('Average sampling......[done].')
%--------------------------------------------
disp('***Have to define mask first***')
disp('Waiting for base detection...')
pause(1)
clf
imshow(sgCI1)
title('Please CLICK 2-point to define mask by center and radius...')
[cgx,cgy]=ginput(2);
cx = cgx(1);
cy = cgy(1);
dx = abs(cgx(2)-cgx(1));
dy = abs(cgy(2)-cgy(1));
R = sqrt(dx.^2 + dy.^2);
th = 5;
im2uthmask2
% im2uth2
disp('Detect base of image......[done].')
%--------------------------------------------
% disp('Waiting for image smoothing...')
% pause(1)
% % % k=1;
% f=7;
% % % sgsmooth
% % sgsmooth2
% sgsmooth3
% disp('Smoothing......[done].')
%--------------------------------------------
disp('Waiting for phase calculation...')
pause(1)
im2phase2
disp('Do phase calculation......[done].')
%--------------------------------------------
disp('Waiting for modulo with 2*pi...')
pause(1)
modulo2pi_02
disp('Do modulo......[done].')
%--------------------------------------------
disp('Waiting for PHASE unwrapping...')
pause(1)
mPHASEunwrapp
disp('Unwrapping......[done].')
%--------------------------------------------
% disp('Waiting for repairing shifted phase...')
% pause(1)
% UPHASE = image1_unwrapped;
% [H,W] = size(UPHASE);
% ROW = H/2;
% ROW = round(ROW);
% duphase = diff(UPHASE(ROW,:));
% sdown = find(duphase>5)
% sup = find(duphase<-5)
% shiftbycol
% disp('Phase shifting......[done].')
%--------------------------------------------
warning on
%--------------------------------------------
close all
UPHASE = image1_unwrapped;
offsetwin(UPHASE)
%--------------------------------------------
