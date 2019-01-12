%Find column idex by these code
%plot(image2_unwrapped(:,84))

%Result idex
sup = [343,362,1475];
sdown = [360,1473,1492];

%Assign unwrapped data
uw = image2_unwrapped;

%Shift up by column
for i=1:length(sup)
    line = uw(sup(i), :);
    y1 = mean(line(~isnan(line)));
    line = uw(sup(i)+1, :);
    y2 = mean(line(~isnan(line)));
    delta = y1-y2;
    uw(sup(i)+1:end, :) = uw(sup(i)+1:end, :) + delta;
end

%Shift down by column
for i=1:length(sdown)
    line = uw(sdown(i), :);
    y1 = mean(line(~isnan(line)));
    line = uw(sdown(i)+1, :);
    y2 = mean(line(~isnan(line)));
    delta = y2-y1;
    uw(sdown(i)+1:end, :) = uw(sdown(i)+1:end, :) - delta;
end
%uw(isnan(uw)) = 0;

%Show
surf(uw)
%meshz(uw)
shading interp
