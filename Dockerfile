# 베이스 이미지 선택
FROM ubuntu:22.04

# 환경 변수 설정 : 대화 식 환경 비활성화
ENV DEBIAN_FRONTEND noninteractive

# 패키지 업데이트 및 설치
RUN cd /home && \
    apt update && apt install -y software-properties-common \
    language-pack-ko \
    vim \
    git \
    zip \
    unzip \
    curl \
    gnupg2 \
    ca-certificates \
    lsb-release \
    apt-transport-https

# node 설치
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt update && apt install -y nodejs

# yarn 설치
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

# nestjs/cli 설치
RUN yarn global add @nestjs/cli

# 컨테이너 실행 시 실행할 명령
CMD ["/bin/bash"]