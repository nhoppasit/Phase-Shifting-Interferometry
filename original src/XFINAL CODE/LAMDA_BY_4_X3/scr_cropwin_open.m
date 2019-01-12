%import
sgCI1 = handles.sgCI1;

[m,n] = size(sgCI1);

set(handles.slider1,'Max',n)
set(handles.slider2,'Max',m)

hold(handles.axes1,'off')
imshow(sgCI1)

title('Please CLICK to define center of circle mask.')
[cgx,cgy]=ginput(1);
cx = cgx(1);
cy = cgy(1);
hold(handles.axes1,'on')
plot(handles.axes1,cx,cy,'or')
set(handles.slider1,'Value',cx)
set(handles.slider2,'Value',cy)
set(handles.text15,'String',num2str(cx))
set(handles.text16,'String',num2str(cy))

title('Please CLICK to define boundary of circle mask.')
[cgx,cgy]=ginput(1);
dx = abs(cgx(1)-cx);
dy = abs(cgy(1)-cy);
R = sqrt(dx.^2 + dy.^2);
set(handles.edit3,'String',num2str(R))
x = cx - R :0.05: cx + R;
y1 = sqrt(R^2 - (x-cx).^2) + cy;
y2 = -sqrt(R^2 - (x-cx).^2) + cy;
plot(handles.axes1,x,y1,x,y2)

title(['Center = (' num2str(cx) ',' num2str(cy) '), R = ' num2str(R)])

handles.R = R;
handles.cx = cx;
handles.cy = cy;

% handles.sgCI1 = sgCI1;
guidata(handles.figure1, handles);
