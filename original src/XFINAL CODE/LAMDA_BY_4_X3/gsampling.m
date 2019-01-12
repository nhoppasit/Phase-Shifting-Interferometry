%Average sampling
% delta = 10;

[M,N] = size(gCI1);

h = waitbar(0,'Please wait...');
ki=1;
for r = 1:delta:M
    if r+delta<=M
        kj=1;
        for c = 1:delta:N
            if c+delta<=N
                sgCI1(ki,kj) = uint8(round(mean(mean(gCI1(r:r+delta,c:c+delta)))));             
                sgCI2(ki,kj) = uint8(round(mean(mean(gCI2(r:r+delta,c:c+delta)))));             
                sgCI3(ki,kj) = uint8(round(mean(mean(gCI3(r:r+delta,c:c+delta)))));             
                sgCI4(ki,kj) = uint8(round(mean(mean(gCI4(r:r+delta,c:c+delta)))));             
                sgCI5(ki,kj) = uint8(round(mean(mean(gCI5(r:r+delta,c:c+delta)))));             
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