const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

export function getApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function buildEndpoint(resource) {
  return `${getApiBaseUrl()}/${resource}/`;
}

export function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
}