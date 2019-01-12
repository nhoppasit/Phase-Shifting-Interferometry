%scr_crop
sgCI1 = handles.sgCI1;
R = handles.R;
cx = handles.cx;
cy = handles.cy;
th = 5;

[ny,nx] = size(sgCI1);
[xx,yy] = meshgrid(1:nx,1:ny);
circle2d = uint8( (xx-cx).^2 + (yy-cy).^2 <= R^2 );

%Threshold by under
sgCI1(sgCI1<=th) = 0;

%Apply circular mask
sgCI1 = sgCI1.*circle2d;

%Show original
imshow(sgCI1)