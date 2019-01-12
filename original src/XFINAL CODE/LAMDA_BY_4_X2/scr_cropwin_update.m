%import
sgCI1 = handles.sgCI1;
cx = get(handles.slider1,'Value');
cy = get(handles.slider2,'Value');
R = str2num(get(handles.edit3,'String'));

hold(handles.axes1,'off')
imshow(sgCI1)
hold(handles.axes1,'on')

plot(handles.axes1,cx,cy,'or')

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
