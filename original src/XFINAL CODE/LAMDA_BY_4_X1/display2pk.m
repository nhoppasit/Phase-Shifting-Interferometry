%Display to find pk-valley

rp = 300:600 %select range in row
cp = 300:600 %select range in col
dPhase = zPhase(rp,cp);
[px,py] = meshgrid(cp,rp);
figure
surf(px,py,dPhase),shading interp, view(2)
figure
surf(px,py,dPhase),shading interp, view(3)
