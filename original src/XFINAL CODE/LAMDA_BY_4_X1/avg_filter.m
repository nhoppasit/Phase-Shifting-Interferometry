%Average sampling
% delta = 3;

kkh = h;
[M,N] = size(kkh);

h = waitbar(0,'Please wait...');
ki=1;
for r = 1:delta:M
    if r+delta<=M
        kj=1;
        for c = 1:delta:N
            if c+delta<=N
                kkh(ki,kj) = (mean(mean(gCI1(r:r+delta,c:c+delta)))));                             
                kj=kj+1;
            end
        end
        waitbar(ki*delta / M)
        ki=ki+1;
    end
end
close(h)

%Show original
subplot(231)
imshow(sgCI1)
subplot(232)
imshow(sgCI2)
subplot(233)
imshow(sgCI3)
subplot(234)
imshow(sgCI4)
subplot(235)
imshow(sgCI5)