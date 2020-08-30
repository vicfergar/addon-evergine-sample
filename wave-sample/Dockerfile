ARG BUILD_FROM=hassioaddons/base:8.0.1
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Setup base
ARG BUILD_ARCH=amd64
ARG ASPNETCORE_VERSION=3.1.7
RUN \
    apk add --no-cache --virtual .build-dependencies \
        wget=1.20.3-r1 \
    \
    && apk add --no-cache \
        lua-resty-http=0.15-r0 \
        nginx-mod-http-lua=1.18.0-r0 \
        nginx=1.18.0-r0 \
        libstdc++=9.3.0-r2 \
        libintl=0.20.2-r0 \
        icu=67.1-r0 \
    \
    && if [[ "${BUILD_ARCH}" = "aarch64" ]]; then ARCH="arm64"; fi \
    && if [[ "${BUILD_ARCH}" = "amd64" ]]; then ARCH="x64"; fi \
    && wget -O aspnetcore.tar.gz https://dotnetcli.azureedge.net/dotnet/aspnetcore/Runtime/${ASPNETCORE_VERSION}/aspnetcore-runtime-${ASPNETCORE_VERSION}-linux-musl-${ARCH}.tar.gz \
    && if [[ "${ARCH}" = "arm64" ]]; then ASPNETCORE_SHA512='f986ef6b1efddf8c4dd2fff297bf596668bbaf3e7e43827b8c1a95cc1ac3236bbeb33ae467eaf1e2d0ab1914030c6f15bac4296c8ba2e185448272c4caadcee7'; fi \
    && if [[ "${ARCH}" = "x64" ]]; then ASPNETCORE_SHA512='43df2fa8660a9dff03cf8412ad7a78f9e790be0cbcabc69c4ab69c640a3efbe3327cd2f98101dd6adf8a8a51e2692a2404358c2a3457321098dc815cc87c55dc'; fi \
    && echo "$ASPNETCORE_SHA512  aspnetcore.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf aspnetcore.tar.gz -C /usr/share/dotnet \
    && rm aspnetcore.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    && apk del --no-cache --purge .build-dependencies \
    && rm -fr \
        /etc/nginx

# Copy root filesystem
COPY rootfs /

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="Wave Engine Sample" \
    io.hass.description="Sample add-on that hosts a WebGL2 sample application made with Wave Engine 3.0 Preview" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Victor Ferrer <vicfergar@gmail.com>" \
    org.opencontainers.image.title="Wave Engine Sample" \
    org.opencontainers.image.description="Sample add-on that hosts a WebGL2 sample application made with Wave Engine 3.0 Preview" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="Victor Ferrer <vicfergar@gmail.com>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.source="https://github.com/vicfergar/addon-wave-sample" \
    org.opencontainers.image.documentation="https://github.com/vicfergar/addon-wave-sample/blob/master/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}
