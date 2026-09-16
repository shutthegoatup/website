export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.hostname = "shutthegoatup.com";
    return Response.redirect(url.toString(), 301);
  },
};
