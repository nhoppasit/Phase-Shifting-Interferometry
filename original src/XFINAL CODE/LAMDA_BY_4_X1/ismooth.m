function si = ismooth(im,span)
% height smoothing

sh = double(im);

sh(sh==0) = NaN;

[M,N] = size(sh);

mid = round(span/2);

iM = mid;
fM = M-mid;
iN = mid;
fN = N-mid;
hw = waitbar(0,'Please wait...');
ki=1;
for r = iM:fM
    for c = iN:fN
        ksh = sh(r-mid+1:r+mid-1,c-mid+1:c+mid-1);
        final(r,c) = mean(ksh(~isnan(ksh)));
    end
    waitbar(r / M)
end
final(final==0) = NaN;
final(isnan(final)) = 0;
final(M,N) = 0;
final(isnan(sh)) = 0;
close(hw)

si = uint8(round(final));