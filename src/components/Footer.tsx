import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                CODE<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">FANTASIA</span>
              </span>
            </Link>
            <p className="mt-4 text-slate-400 max-w-md leading-relaxed">
              We create tools, workflows, and aesthetics that will define a generation of AI-powered filmmaking.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-violet-400 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@codefantasia.ai"
                  className="text-slate-400 hover:text-violet-400 transition-colors duration-300"
                >
                  hello@codefantasia.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Code Fantasia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-600 uppercase tracking-wider">
              AI-Powered Filmmaking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
