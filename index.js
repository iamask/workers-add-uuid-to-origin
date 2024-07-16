addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const uuid = generateUUID();
  const headers = new Headers(request.headers);
  headers.set("X-Request-ID", uuid);

  // Add custom fields to the request object
  request.cf = {
    metadata: {
      requestId: uuid,
    },
  };

  const newRequest = new Request(request, { headers });
  return fetch(newRequest);
}

function generateUUID() {
  // Generate a UUID using the crypto.getRandomValues method
  let uuid = "";
  const randomValues = crypto.getRandomValues(new Uint8Array(16));
  randomValues.forEach((value, index) => {
    if (index === 4 || index === 6 || index === 8 || index === 10) {
      uuid += "-";
    }
    uuid += value.toString(16).padStart(2, "0");
  });
  return uuid;
}
