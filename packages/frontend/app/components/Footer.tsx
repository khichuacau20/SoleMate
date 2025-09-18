export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SoleMate</h3>
            <p className="text-gray-400">
              Your premier destination for the finest footwear collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/men" className="text-gray-400 hover:text-white">
                  Men's Shoes
                </a>
              </li>
              <li>
                <a href="/categories/women" className="text-gray-400 hover:text-white">
                  Women's Shoes
                </a>
              </li>
              <li>
                <a href="/categories/kids" className="text-gray-400 hover:text-white">
                  Kids' Shoes
                </a>
              </li>
              <li>
                <a href="/categories/sport" className="text-gray-400 hover:text-white">
                  Sport Shoes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                1234 Shoe Street
              </li>
              <li className="text-gray-400">
                Footwear City, FC 12345
              </li>
              <li className="text-gray-400">
                Phone: (123) 456-7890
              </li>
              <li>
                <a href="mailto:info@solemate.com" className="text-gray-400 hover:text-white">
                  info@solemate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SoleMate. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
