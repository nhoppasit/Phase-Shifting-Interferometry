%main2
%masktheshold-im2phase-modulo2pi-
%unwrap1-shifbycolumn-unwrap2-shiftbyrow-slop2offset
%--------------------------------------------
disp('***Have to define mask first***')
disp('Waiting for base detection...')
pause(1)
th = 5;
im2uthmask2win
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
