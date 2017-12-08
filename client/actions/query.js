export default (ep, opts = {}) => (
    fetch(`/api/v1/${ep}`, {
      method: opts.method || 'GET',
      body: (opts.data) ? JSON.stringify(opts.data) : undefined,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((r) => {
      return r.json();
    })
)
