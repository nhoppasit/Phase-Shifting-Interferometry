%Mask parameters
%cx = 978;
%cy = 936;
%R = 609;

 x = cx - R : cx + R;
 y1 = sqrt(R^2 - (x-cx).^2) + cy;
 y2 = -sqrt(R^2 - (x-cx).^2) + cy;
 clf
 imshow(gCI1)
 hold on
 plot(x,y1,x,y2)

[ny,nx] = size(gCI1);
[xx,yy] = meshgrid(1:nx,1:ny);
circle2d = uint8( (xx-cx).^2 + (yy-cy).^2 <= R^2 );

%Threshold by under
th = 5;
gCI1(gCI1<=th) = 0;
gCI2(gCI2<=th) = 0;
gCI3(gCI3<=th) = 0;
gCI4(gCI4<=th) = 0;
gCI5(gCI5<=th) = 0;

%Apply circular mask
gCI1 = gCI1.*circle2d;
gCI2 = gCI2.*circle2d;
gCI3 = gCI3.*circle2d;
gCI4 = gCI4.*circle2d;
gCI5 = gCI5.*circle2d;

%Show original
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