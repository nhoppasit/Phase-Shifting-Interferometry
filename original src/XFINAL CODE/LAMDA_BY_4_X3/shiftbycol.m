%Find column idex by these code
%plot(image1_unwrapped(84,:))

%Result idex
% sup = [66,83];
% sdown = [22,43];

% w_su = 0.95;
% w_sd = 1.05;

%Assign unwrapped data for text mode
%uw = image1_unwrapped;

%Shift up by column
for i=1:length(sup)
    line = uw(:, sup(i));
    x1 = mean(line(~isnan(line)));
    line = uw(:, sup(i)+1);
    x2 = mean(line(~isnan(line)));
    delta = x1-x2;
    uw(:,sup(i)+1:end) = uw(:,sup(i)+1:end) + delta*w_su;
end

%Shift down by column
for i=1:length(sdown)
    line = uw(:, sdown(i));
    x1 = mean(line(~isnan(line)));
    line = uw(:, sdown(i)+1);
    x2 = mean(line(~isnan(line)));
    delta = x2-x1;
    uw(:,sdown(i)+1:end) = uw(:,sdown(i)+1:end) - delta*w_sd;
end
%uw(isnan(uw)) = -15;

%Show
%surf(uw)
% meshz(uw)
%shading interp
