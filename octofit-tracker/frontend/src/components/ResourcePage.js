import React, { useEffect, useState } from 'react';
import { buildEndpoint, extractItems } from './api';

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function ResourcePage({ title, resource, description, columns, emptyMessage }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = buildEndpoint(resource);

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError('');

      console.log(`${title} endpoint:`, endpoint);

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log(`${title} fetched data:`, payload);
        setItems(extractItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [endpoint, title]);

  const filteredItems = items.filter((item) => {
    if (!query.trim()) {
      return true;
    }

    const haystack = columns
      .map((column) => formatValue(column.render ? column.render(item) : item[column.key]))
      .join(' ')
      .toLowerCase();

    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <section className="card resource-card">
      <div className="card-header p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3">
          <div>
            <h2 className="h2 fw-bold mb-2">{title}</h2>
            <p className="text-secondary mb-0">{description}</p>
          </div>
          <a
            className="link-success link-offset-2 fw-semibold text-decoration-none"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            Open REST endpoint
          </a>
        </div>
      </div>

      <div className="card-body p-4">
        <form className="row g-3 align-items-end resource-toolbar mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-7 col-lg-8">
            <label htmlFor={`${resource}-search`} className="form-label fw-semibold">
              Search {title.toLowerCase()}
            </label>
            <input
              id={`${resource}-search`}
              type="search"
              className="form-control form-control-lg"
              placeholder={`Filter ${title.toLowerCase()} data`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-md-5 col-lg-4 d-flex gap-2">
            <button type="button" className="btn btn-success btn-lg flex-fill" onClick={() => window.location.reload()}>
              Refresh
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg flex-fill" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info mb-0">Loading {title.toLowerCase()}...</div>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive border rounded-4 overflow-hidden bg-white">
            <table className="table table-hover table-striped resource-table align-middle">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.label} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      {columns.map((column) => (
                        <td key={`${item.id}-${column.label}`}>{formatValue(column.render ? column.render(item) : item[column.key])}</td>
                      ))}
                      <td className="text-end">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedItem(item)}>
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center text-secondary py-5">
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block resource-modal" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h4 mb-0">{title} details</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <div className="card border-0 bg-light mb-4">
                    <div className="card-body">
                      <p className="text-secondary mb-0">Data loaded from <a className="link-success fw-semibold" href={endpoint} target="_blank" rel="noreferrer">{endpoint}</a></p>
                    </div>
                  </div>
                  <dl className="row g-3 resource-kv">
                    {Object.entries(selectedItem).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <dt className="col-sm-4">{key}</dt>
                        <dd className="col-sm-8">{formatValue(value)}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show resource-modal-backdrop" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default ResourcePage;