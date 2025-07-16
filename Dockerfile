FROM alpine:3.22.1
RUN apk add --no-cache unzip openssh
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.14.0/pocketbase_0.14.0_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
EXPOSE 8080

# We need to keep 0.13.4 as the version number here, otherwise the data volume will be recreated
VOLUME 0.13.4:/pb/pb_data 

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
