%import
uw = handles.unwrap;

UPHASE = uw;
[H,W] = size(UPHASE);
ROW = H/2;
ROW = round(ROW);
duphase = diff(UPHASE(ROW,:));
sdown = find(duphase>5);
sup = find(duphase<-5);
w_su = str2double(get(handles.edit9,'String'));
w_sd = str2double(get(handles.edit10,'String'));
shiftbycol

%slope for offset
[x,y] = meshgrid(1:size(uw,2),1:size(uw,1));

%offsset
mx = get(handles.slider1,'Value');
my = get(handles.slider2,'Value');
d =  get(handles.slider3,'Value');
set(handles.text1,'String',num2str(my))
set(handles.text2,'String',num2str(mx))
set(handles.text3,'String',num2str(d))
oz = (mx*x + my*y - d);
zPhase = uw - oz;

zPhase(isnan(zPhase)) = 0;

h = zPhase*632.8/(4*pi);

[az,el] = view(handles.axes2);
hold(handles.axes2,'off')
% surf(handles.axes2,h)
mesh(handles.axes2,h)
axis(handles.axes2,'equal')
colorbar('peer',handles.axes2)
%shading interp
%colormap(gray)
view(handles.axes2,az,el)
grid(handles.axes2,'on')
rotate3d(handles.axes2,'on')
xlabel(handles.axes2,'X-Axis')
%---------------------------------------------------
hold(handles.axes3,'off')
contour(handles.axes3,h)
axis(handles.axes3,'equal')
grid(handles.axes3,'off')
% rotate3d(handles.axes3,'off')
%draw 2 lines for peak-valley computation
dx =  round(get(handles.slider4,'Value'));
dy =  round(get(handles.slider5,'Value'));
set(handles.text18,'String',num2str(dx))
set(handles.text19,'String',num2str(dy))
xi = 1:size(h,2);
yi = xi*0+round(size(h,1)/2) + dy;
yj = 1:size(h,1);
xj = yj*0+round(size(h,2)/2) + dx;
theta = str2double(get(handles.edit11,'String'));
theta = theta*pi/180;
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
hold(handles.axes3,'on')
plot(handles.axes3,oi(1,:),oi(2,:),oj(1,:),oj(2,:))

[d1 d2] = size(h);
id1 = (oj(1,:)-1)*d1 + oj(2,:);
id2 = (oi(1,:)-1)*d1 + oi(2,:);
hh1 = h(id1);
hh2 = h(id2);
hold(handles.axes2,'on')
%plot3(handles.axes2,oj(1,:),oj(2,:),hh1);
%plot3(handles.axes2,oj(1,:),oj(2,:),oj(1,:)*0);
%plot3(handles.axes2,oi(1,:),oi(2,:),hh2);
%plot3(handles.axes2,oi(1,:),oi(2,:),oi(2,:)*0);
hold(handles.axes2,'off')

hh1tmp = hh1(hh1~=0);
hh1pv = max(hh1tmp) - min(hh1tmp);
zbar = mean(hh1tmp);
hh1avg = mean(abs(hh1tmp-zbar));
hh1rms = sqrt( mean( (hh1tmp-zbar).^2) );
hh1tmp = hh1*0 + zbar;

set(handles.text21,'String',['R_pv = ' num2str(hh1pv) ' nm'])
set(handles.text22,'String',['R_rms= ' num2str(hh1rms) ' nm'])
set(handles.text26,'String',['R_avg= ' num2str(hh1avg) ' nm'])

hh2tmp = hh2(hh2~=0);
hh2pv = max(hh2tmp) - min(hh2tmp);
zbar = mean(hh2tmp);
hh2avg = mean(abs(hh2tmp-zbar));
hh2rms = sqrt( mean( (hh2tmp-zbar).^2) );
hh2tmp = hh2*0 + zbar;

set(handles.text23,'String',['R_pv = ' num2str(hh2pv) ' nm'])
set(handles.text24,'String',['R_rms= ' num2str(hh2rms) ' nm'])
set(handles.text29,'String',['R_avg= ' num2str(hh2avg) 'nm'])

hold(handles.axes4,'off')
plot(handles.axes4,hh1,'g');
hold(handles.axes4,'on')
plot(handles.axes4,hh1tmp,'y');
grid(handles.axes4,'on')

hold(handles.axes5,'off')
plot(handles.axes5,hh2);
hold(handles.axes5,'on')
plot(handles.axes5,hh2tmp,'y');
grid(handles.axes5,'on')

%---------------------------------------------------

htmp = h(h~=0);
hpv = max(htmp) - min(htmp);
zbar = mean(htmp);
havg = mean(abs(htmp-zbar));
hrms = sqrt( mean( (htmp-zbar).^2) );

set(handles.text4,'String',['S_pv = ' num2str(hpv) ' nm'])
set(handles.text5,'String',['S_rms= ' num2str(hrms) ' nm'])
set(handles.text28,'String',['S_avg= ' num2str(havg) ' nm'])

%---------------------------------------------------

handles.height.h = h;
guidata(handles.figure1, handles);

