%slope for offset
[x,y] = meshgrid(1:size(uw,2),1:size(uw,1));

%offsset
mx = -0.15;
my = -0.012;
d = 10;
oz = (mx*x + my*y + d);
zPhase = uw - oz;

zPhase(isnan(zPhase)) = 0;

h = zPhase*632.8/4/pi;

hold off
mesh(uw)
hold on
mesh(oz)

figure(2)
mesh(h)


