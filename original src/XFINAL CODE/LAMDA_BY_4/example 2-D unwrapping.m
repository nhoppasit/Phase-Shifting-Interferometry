
%Unwrap the image using the Itoh algorithm: implemented using the first method
%Unwrap the image by firstly unwrapping the rows one at a time. 
image1_unwrapped = mPHASE;
for i=1:N
image1_unwrapped(i,:) = unwrap(image1_unwrapped(i,:));
end 
%Then unwrap all the columns one at a time 
for i=1:N
image1_unwrapped(:,i) = unwrap(image1_unwrapped(:,i));
end 
figure, colormap(gray(256)), imagesc(image1_unwrapped)
title('Unwrapped image using the Itoh algorithm: the first method')
xlabel('Pixels'), ylabel('Pixels')
figure 
surf(image1_unwrapped,'FaceColor','interp', 'EdgeColor','none','FaceLighting','phong')
view(-30,30), camlight left, axis tight 
title('Unwrapped phase map using the Itoh unwrapper: the first method')
xlabel('Pixels'), ylabel('Pixels'), zlabel('Phase in radians')

%Unwrap the image using Itoh algorithm: implemented using the second method
%Unwrap the image by firstly unwrapping all the columns one at a time. 
image2_unwrapped = mPHASE;
for i=1:N
image2_unwrapped(:,i) = unwrap(image2_unwrapped(:,i));
end 
%Then unwrap all the a rows one at a time
for i=1:N
image2_unwrapped(i,:) = unwrap(image2_unwrapped(i,:));
end
figure, colormap(gray(256)), imagesc(image2_unwrapped)
title('Unwrapped image using the Itoh algorithm: the second method')
xlabel('Pixels'), ylabel('Pixels')
figure 
surf(image2_unwrapped,'FaceColor','interp', 'EdgeColor','none','FaceLighting','phong')
view(-30,30), camlight left, axis tight 
title('Unwrapped phase map using the Itoh algorithm: the second method')
xlabel('Pixels'), ylabel('Pixels'), zlabel('Phase in radians')

