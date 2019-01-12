function crossplot(h,dx,dy,theta)

theta = theta*pi/180;

xi = 1:size(h,2);
yi = xi*0+round(size(h,1)/2) + dy;
yj = 1:size(h,1);
xj = yj*0+round(size(h,2)/2) + dx;
mrot = [cos(theta) -sin(theta);sin(theta) cos(theta)];
kx = round(size(h,1)/2) + dx;
ky = round(size(h,2)/2) + dy;
xi = xi - kx;
yi = yi - ky;
xj = xj - kx;
yj = yj - ky;
oi = mrot*[xi; yi];
oj = mrot*[xj; yj];
oi(1,:) = oi(1,:) + kx;
oi(2,:) = oi(2,:) + ky;
oj(1,:) = oj(1,:) + kx;
oj(2,:) = oj(2,:) + ky;
oi = round(oi);
oj = round(oj);

[d1 d2] = size(h);
id1 = (oj(1,:)-1)*d1 + oj(2,:);
id2 = (oi(1,:)-1)*d1 + oi(2,:);
hh1 = h(id1);
hh2 = h(id2);

hh1tmp = hh1(hh1~=0);
hh1pv = max(hh1tmp) - min(hh1tmp);
zbar = mean(hh1tmp);
hh1avg = mean(abs(hh1tmp-zbar));
hh1rms = sqrt( mean( (hh1tmp-zbar).^2) );
hh1tmp = hh1*0 + zbar;

hh2tmp = hh2(hh2~=0);
hh2pv = max(hh2tmp) - min(hh2tmp);
zbar = mean(hh2tmp);
hh2avg = mean(abs(hh2tmp-zbar));
hh2rms = sqrt( mean( (hh2tmp-zbar).^2) );
hh2tmp = hh2*0 + zbar;

figure(1)
contour(h)
hold on
plot(oi(1,:),oi(2,:),oj(1,:),oj(2,:))
hold off

figure(2)
mesh(h)
hold on
%plot3(oj(1,:),oj(2,:),hh1);
%plot3(oi(1,:),oi(2,:),hh2);
hold off

figure(3)
plot(hh1);
grid on
title(['R_{rms} = ' num2str(hh1rms) ', R_{pv} = ' num2str(hh1pv) ', R_{avg} = ' num2str(hh1avg)])

figure(4)
plot(hh2);
grid on
title(['R_{rms} = ' num2str(hh2rms) ', R_{pv} = ' num2str(hh2pv) ', R_{avg} = ' num2str(hh2avg)])
