import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center"
          style={{ background: 'var(--bg)', color: 'var(--fg)' }}
        >
          <p className="font-display text-xl font-semibold">Something broke</p>
          <p className="font-mono text-sm opacity-80 max-w-md">
            Try a refresh. If this keeps happening, try turning off browser extensions or another tab hogging memory.
          </p>
          <button
            type="button"
            className="font-mono text-xs uppercase tracking-wider border px-4 py-2"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
