%Mask parameters
cx = 105;
cy = 84;
R = 60;

[ny,nx] = size(h);
[xx,yy] = meshgrid(1:nx,1:ny);
circle2d = double( (xx-cx).^2 + (yy-cy).^2 <= R^2 );

%Apply circular mask
hc = h.*circle2d;

%Show original

mesh(hc)