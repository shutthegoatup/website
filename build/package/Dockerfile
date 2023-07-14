FROM klakegg/hugo:0.111.3-onbuild AS hugo

FROM nginx
COPY --from=hugo /onbuild /usr/share/nginx/html

