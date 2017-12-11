FROM node
RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl build-essential ca-certificates git mercurial bzr
RUN mkdir /goroot && curl https://storage.googleapis.com/golang/go1.9.2.linux-amd64.tar.gz | tar xvzf - -C /goroot --strip-components=1
RUN mkdir -p /gopath/bin
ENV GOROOT /goroot
ENV GOPATH /gopath
ENV PATH $PATH:$GOROOT/bin:$GOPATH/bin
ADD . /gopath/src/eselo
RUN apt-get update
RUN apt-get install -y npm && ln -s /usr/bin/nodejs /usr/bin/node
RUN curl https://glide.sh/get | sh
RUN cd /gopath/src/eselo && glide update
RUN cd /gopath/src/eselo && make
CMD ["/gopath/src/eselo/dist/eselo", "run"]
EXPOSE 5000
