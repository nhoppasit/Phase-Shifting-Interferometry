%Mask parameters
cx = 773;
cy = 858;
R = 591.56;

 x = cx - R : cx + R;
 y1 = sqrt(R^2 - (x-cx).^2) + cy;
 y2 = -sqrt(R^2 - (x-cx).^2) + cy;
 clf
 pcolor(kkh)
 hold on
 plot(x,y1,x,y2)

[ny,nx] = size(kkh);
[xx,yy] = meshgrid(1:nx,1:ny);
circle2d = uint8( (xx-cx).^2 + (yy-cy).^2 <= R^2 );

%Apply circular mask
kkh = kkh.*double(circle2d);

