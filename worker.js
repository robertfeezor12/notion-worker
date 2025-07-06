const NOTION_PAGE_ID = "228d1221fce7804ea104dd79c264cce7";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = "www.notion.so";
    url.pathname = `/${NOTION_PAGE_ID}`;
    
    const notionRequest = new Request(url.toString(), request);
    notionRequest.headers.set("host", "www.notion.so");

    const notionResponse = await fetch(notionRequest);
    const newHeaders = new Headers(notionResponse.headers);
    newHeaders.set("Content-Security-Policy", "");
    newHeaders.set("X-Frame-Options", "");

    return new Response(notionResponse.body, {
      status: notionResponse.status,
      headers: newHeaders
    });
  }
}
