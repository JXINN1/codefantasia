import { Link } from 'react-router-dom';
import logo from '@/assets/logo.avif';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="CODE FANTASIA" className="h-10 brightness-0 invert" />
            </Link>
            <div className="text-slate-200 text-sm leading-relaxed space-y-2">
              <p>
                Company Name: CODE FANTASIA Inc. | CEO: Park Kwan Woo | Business License No.: 649-81-03553
              </p>
              <p>
                Addr: 서울특별시 강남구 학동로25길 19, 밸런스빌딩 I
              </p>
              <p>
                19, Hakdong-ro 25-gil, Gangnam-gu, Seoul, 06046, Republic of Korea
              </p>
              <p>
                Tel: T+82 70-4814-4461 | Email:{' '}
                <a href="mailto:admin@codefantasia.ai" className="hover:text-violet-400 transition-colors">
                  admin@codefantasia.ai
                </a>
              </p>
            </div>
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
                    className="text-slate-200 hover:text-violet-400 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:admin@codefantasia.ai"
                  className="text-slate-200 hover:text-violet-400 transition-colors duration-300"
                >
                  admin@codefantasia.ai
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
        </div>
      </div>
    </footer>
  );
}
