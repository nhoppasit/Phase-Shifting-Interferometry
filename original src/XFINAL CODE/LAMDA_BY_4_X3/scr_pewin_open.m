%--------------------------------------------
drawnow
warning off
%--------------------------------------------

peI1 = double(sgCI1);
peI2 = double(sgCI2);
peI4 = double(sgCI4);
peI5 = double(sgCI5);

tr1 = (peI5-peI1);
tr2 = (peI4-peI2);

th_pe = str2num(get(handles.edit1,'String'));
tr2(abs(tr2)<th_pe) = NaN;

val = tr1./tr2;
val(val==-inf) = NaN;
val(val==inf) = NaN;
val = 0.5*val;

pe = acos(val);

rpe = real(pe(find(~isnan(pe))));
N = length(rpe);

sum_pe = sum(rpe);
%pe_avg = sum_pe/N;
pe_avg = mean(rpe);
pe_std = std(rpe);

%--------------------------------------------
%Display
%--------------------------------------------

mesh(handles.axes1,peI1)
axis(handles.axes1,'equal')
rotate3d(handles.axes1,'on')

% set(gcf,'CurrentAxes',handles.axes2) 
contourf(handles.axes2,peI1);
axis(handles.axes2,'equal')
grid(handles.axes3,'off')

set(handles.text1,'String',['N = ' num2str(N)])
set(handles.text2,'String',['avg = ' num2str(pe_avg) ' rad'])
set(handles.text3,'String',['std = ' num2str(pe_std) ' rad'] )

hist(handles.axes5,rpe,50)
xlim(handles.axes5,[-0.1,3.24]);

%--------------------------------------------
% cross line
%--------------------------------------------
dx =  round(get(handles.slider1,'Value'));
dy =  round(get(handles.slider2,'Value'));
set(handles.text4,'String',num2str(dx))
set(handles.text5,'String',num2str(dy))
h = peI1;
xi = 1:size(h,2);
yi = xi*0+round(size(h,1)/2) + dy;
yj = 1:size(h,1);
xj = yj*0+round(size(h,2)/2) + dx;
theta = str2double(get(handles.edit2,'String'));
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
hold(handles.axes2,'on')
plot(handles.axes2,oi(1,:),oi(2,:),oj(1,:),oj(2,:))

[d1 d2] = size(h);
id1 = (oj(1,:)-1)*d1 + oj(2,:);
id2 = (oi(1,:)-1)*d1 + oi(2,:);
hh1 = h(id1);
hh2 = h(id2);
hold(handles.axes1,'on')
plot3(handles.axes1,oj(1,:),oj(2,:),hh1,'g');
%plot3(handles.axes1,oj(1,:),oj(2,:),oj(1,:)*0);
plot3(handles.axes1,oi(1,:),oi(2,:),hh2);
%plot3(handles.axes1,oi(1,:),oi(2,:),oi(2,:)*0);
hold(handles.axes1,'off')

%--------------------------------------------
% analysis
%--------------------------------------------

k1peI1 = peI1(id1);
k1peI2 = peI2(id1);
k1peI4 = peI4(id1);
k1peI5 = peI5(id1);

tr1 = (k1peI5-k1peI1);
tr2 = (k1peI4-k1peI2);

tr2(abs(tr2)<th_pe) = NaN;

val = tr1./tr2;
val(val==-inf) = NaN;
val(val==inf) = NaN;
val = 0.5*val;

pe = acos(val);

k1rpe = real(pe(find(~isnan(pe))));
k1N = length(k1rpe);
k1pe_avg = mean(k1rpe);
k1pe_std = std(k1rpe);

set(handles.text7,'String',['N = ' num2str(k1N) ' rad'])
set(handles.text8,'String',['avg = ' num2str(k1pe_avg) ' rad'])
set(handles.text11,'String',['std = ' num2str(k1pe_std) ' rad'])

k2peI1 = peI1(id2);
k2peI2 = peI2(id2);
k2peI4 = peI4(id2);
k2peI5 = peI5(id2);

tr1 = (k2peI5-k2peI1);
tr2 = (k2peI4-k2peI2);

tr2(abs(tr2)<th_pe) = NaN;

val = tr1./tr2;
val(val==-inf) = NaN;
val(val==inf) = NaN;
val = 0.5*val;

pe = acos(val);

k2rpe = real(pe(find(~isnan(pe))));
k2N = length(k2rpe);
k2pe_avg = mean(k2rpe);
k2pe_std = std(k2rpe);

set(handles.text9,'String',['N = ' num2str(k2N) ' rad'])
set(handles.text10,'String',['avg = ' num2str(k2pe_avg) ' rad'])
set(handles.text12,'String',['std = ' num2str(k2pe_std) ' rad'])

hold(handles.axes3,'off')
hist(handles.axes3,k1rpe,50);
grid(handles.axes3,'on')
hb = findobj(handles.axes3,'Type','patch');
set(hb,'FaceColor','g','EdgeColor','k')

hold(handles.axes4,'off')
hist(handles.axes4,k2rpe,50);
grid(handles.axes4,'on')
hb = findobj(handles.axes4,'Type','patch');
set(hb,'FaceColor','b','EdgeColor','k')
%--------------------------------------------
warning on
%--------------------------------------------
