%Mask parameters
% cx = 1060;
% cy = 918;
% R = 652;

 x = cx - R : cx + R;
 y1 = sqrt(R^2 - (x-cx).^2) + cy;
 y2 = -sqrt(R^2 - (x-cx).^2) + cy;
 clf
 imshow(sgCI1)
 hold on
 plot(x,y1,x,y2)
 pause(1);

[ny,nx] = size(sgCI1);
[xx,yy] = meshgrid(1:nx,1:ny);
circle2d = uint8( (xx-cx).^2 + (yy-cy).^2 <= R^2 );

%Threshold by under
th = 5;
sgCI1(sgCI1<=th) = 0;
sgCI2(sgCI2<=th) = 0;
sgCI3(sgCI3<=th) = 0;
sgCI4(sgCI4<=th) = 0;
sgCI5(sgCI5<=th) = 0;

%Apply circular mask
sgCI1 = sgCI1.*circle2d;
sgCI2 = sgCI2.*circle2d;
sgCI3 = sgCI3.*circle2d;
sgCI4 = sgCI4.*circle2d;
sgCI5 = sgCI5.*circle2d;

%Show original
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