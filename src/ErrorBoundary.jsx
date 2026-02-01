import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: '2rem',
            maxWidth: '480px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            background: '#0f172a',
            color: '#f1f5f9',
          }}
        >
          <h1 style={{ color: '#f87171', fontSize: '1.25rem', marginBottom: '1rem' }}>
            Щось пішло не так
          </h1>
          <pre
            style={{
              background: '#1e293b',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
              color: '#94a3b8',
            }}
          >
            {this.state.error?.message ?? String(this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '12px 24px',
              background: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Перезавантажити
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
