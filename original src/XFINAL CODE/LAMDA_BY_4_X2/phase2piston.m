%piston 

for r = 1:size(mPHASE,1)

vec1 = mPHASE(r,end:-1:1);
subplot(411)
plot(vec1)

i = 2:length(vec1);
dPHASE(i) = vec1(i)-vec1(i-1);
subplot(412)
plot(dPHASE)

piston = zeros(1,length(dPHASE));

%  piston(ii) = piston(ii-1)-1
%  subplot(413)
%  plot(piston)

for i = 2:length(dPHASE)
    if dPHASE(i) < pi
       piston(i) = piston(i-1)-1; 
    end
    
    if dPHASE(i) < pi & dPHASE(i) > -pi
       piston(i) = piston(i-1);
    end
    
    if dPHASE(i) < -pi
       piston(i) = piston(i-1)+1;
    end
end
subplot(413)
plot(piston)

sPHASE(r,:) = vec1+piston*2*pi;
disp(['r=' num2str(r)])
subplot(414)
plot(sPHASE(r,:))
   drawnow()
   pause(0.1)
end

imshow(sPHASE)
