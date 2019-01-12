[H,W] = size(PHASE);

%Config algorithm-----------------------------
ROW = H/2;
ROW = round(ROW);
dJ = 20;
NOL = 3;
%-----------------------------

clear psi_x;
clear psi_y;
clear psi_z;
for J = 1:NOL
    psi_x(J,:) = ones(1,W)*J;
    psi_y(J,:) = 1:W;
    RR = ROW + (J-1)*dJ;
    psi_z(J,:) = PHASE( RR ,:);    
end
psi_x = psi_x';
psi_y = psi_y';
psi_z = psi_z';

%Show line
figure
plot3(psi_x,psi_y,psi_z)

%Show phase position
figure
imshow(PHASE) 
hold on
plot([1:W],ones(1,W)*ROW)