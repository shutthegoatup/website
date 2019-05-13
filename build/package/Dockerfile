FROM klakegg/hugo:0.55.5-onbuild AS hugo

FROM nginx
COPY --from=hugo /onbuild /usr/share/nginx/html

