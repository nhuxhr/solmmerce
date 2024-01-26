import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

import SolanaSolImg from "@/assets/images/solana-sol.png";
import BackgroundPatternImg from "@/assets/images/background-pattern.png";
import BrandVertexImg from "@/assets/images/brands/vertex.svg";
import BrandMartinoImg from "@/assets/images/brands/martino.svg";
import BrandSquarestoneImg from "@/assets/images/brands/squarestone.svg";
import BrandWaverioImg from "@/assets/images/brands/waverio.svg";
import BrandFireliImg from "@/assets/images/brands/fireli.svg";
import BrandViroganImg from "@/assets/images/brands/virogan.svg";
import BrandAromixImg from "@/assets/images/brands/aromix.svg";
import BrandNatromaImg from "@/assets/images/brands/natroma.svg";
import BrandWaverio2Img from "@/assets/images/brands/waverio-2.svg";

export default function Home() {
  return (
    <>
      <div className="relative bg-gray-50">
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
          <Image
            className="w-auto h-full"
            src={BackgroundPatternImg}
            alt="Background Pattern"
          />
        </div>
        <header className="relative py-4 md:py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  <Logo />
                </a>
              </div>
              <div className="flex lg:hidden">
                <button type="button" className="text-gray-900">
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                <div className="flex items-center space-x-12">
                  <Link
                    href="/"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="#how"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    How
                  </Link>
                </div>
                <div className="w-px h-5 bg-gray-300" />
                <a
                  href="#"
                  className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  role="button"
                >
                  Launch App
                </a>
              </div>
            </div>
          </div>
        </header>
        <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
              <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                  <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                    Decentralized E-Commerce on Solana
                  </h1>
                  <p className="mt-8 text-lg text-gray-900 font-pj">
                    Empower your business with{" "}
                    <span className="font-bold">Solmmerce</span>. Create stores,
                    showcase products, and transact seamlessly on the
                    lightning-fast Solana blockchain.
                  </p>
                </div>
                <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                    role="button"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="xl:col-span-3">
                <Image
                  className="w-full mx-auto scale-110"
                  src={SolanaSolImg}
                  alt="Solana SOL"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="relative py-12 overflow-hidden bg-gray-50 sm:py-16 lg:py-20 xl:py-32">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 xl:grid-cols-2">
            <div className="px-8 text-center xl:text-left xl:pr-16 md:max-w-2xl md:mx-auto xl:max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Trusted by Leading Brands
              </h2>
              <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                Join the community of innovative businesses leveraging{" "}
                <span className="font-bold">Solmmerce</span> for decentralized
                and secure e-commerce solutions. Our platform is trusted by a
                diverse range of brands, from startups to established
                enterprises.
              </p>
            </div>
            <div className="relative mt-8 sm:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mt-0">
              <div className="absolute inset-16">
                <div
                  className="w-full h-full mx-auto rotate-180 opacity-30 rounded-3xl blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #0088cc -0.55%, #0056A7 22.86%, #002748 48.36%, #2ab641 73.33%, #f1e05a 99.34%)",
                  }}
                />
              </div>
              <div className="relative space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandVertexImg}
                      alt="Brand Vertex"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandMartinoImg}
                      alt="Brand Martino"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandSquarestoneImg}
                      alt="Brand Squarestone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-6">
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandWaverioImg}
                      alt="Brand Waverio"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandFireliImg}
                      alt="Brand Fireli"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandViroganImg}
                      alt="Brand Virogan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-12">
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandAromixImg}
                      alt="Brand Aromix"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandNatromaImg}
                      alt="Brand Natroma"
                    />
                  </div>
                  <div className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                    <Image
                      className="w-auto h-8"
                      src={BrandWaverio2Img}
                      alt="Brand Waverio 2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-transparent to-gray-50" />
      </section>

      <section id="how" className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              How it works
            </h2>
            <p className="max-w-lg mx-auto mt-6 text-lg font-normal text-gray-600 font-pj">
              Simple steps to elevate your e-commerce experience
            </p>
          </div>
          <div className="max-w-xl mx-auto mt-12 sm:px-10">
            <div className="relative pb-10">
              <span
                className="absolute w-px h-full -ml-px bg-gray-200 top-8 left-12"
                aria-hidden="true"
              />
              <div className="relative p-5 overflow-hidden bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-start sm:items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 text-xl font-bold text-white bg-gray-900 w-14 h-14 rounded-xl font-pj">
                    1
                  </div>
                  <p className="ml-6 text-xl font-medium text-gray-900 font-pj">
                    Connect your Solana wallet to get started.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative pb-10">
              <span
                className="absolute w-px h-full -ml-px bg-gray-200 top-8 left-12"
                aria-hidden="true"
              />
              <div className="absolute -mt-10 inset-y-8 -inset-x-1">
                <div
                  className="w-full h-full mx-auto opacity-30 blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #0088cc -0.55%, #0056A7 22.86%, #002748 48.36%, #2ab641 73.33%, #f1e05a 99.34%)",
                  }}
                />
              </div>
              <div className="relative p-5 overflow-hidden bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-start sm:items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 text-xl font-bold text-white bg-gray-900 w-14 h-14 rounded-xl font-pj">
                    2
                  </div>
                  <p className="ml-6 text-xl font-medium text-gray-900 font-pj">
                    Create your store and customize it.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative pb-10">
              <span
                className="absolute w-px h-full -ml-px bg-gray-200 top-8 left-12"
                aria-hidden="true"
              />
              <div className="relative p-5 overflow-hidden bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-start sm:items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 text-xl font-bold text-white bg-gray-900 w-14 h-14 rounded-xl font-pj">
                    3
                  </div>
                  <p className="ml-6 text-xl font-medium text-gray-900 font-pj">
                    Add your products and customize them.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative p-5 overflow-hidden bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-start sm:items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 text-xl font-bold text-white bg-gray-900 w-14 h-14 rounded-xl font-pj">
                    4
                  </div>
                  <p className="ml-6 text-xl font-medium text-gray-900 font-pj">
                    Sell your products and earn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-50 sm:pt-16 lg:pt-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h5 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Ready to Transform Your E-Commerce Business?
            </h5>
            <div className="relative inline-flex mt-12 group">
              <div
                className="absolute duration-1000 transform rotate-180 transitiona-all opacity-70 -inset-1 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200"
                style={{
                  background:
                    "linear-gradient(90deg, #0088cc -0.55%, #0056A7 22.86%, #002748 48.36%, #2ab641 73.33%, #f1e05a 99.34%)",
                }}
              />
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-between mt-14 lg:mt-24">
            <div>
              <Logo />
            </div>
            <ul className="flex items-center justify-center mt-8 space-x-3 sm:mt-12 lg:justify-end lg:mt-0">
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
                    <circle cx="16.806" cy="7.207" r="1.078" />
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <hr className="mt-10 border-gray-300" />
          <div className="mt-10 md:flex md:items-center md:justify-between">
            <ul className="flex items-center justify-center space-x-6 md:order-2 md:justify-end">
              <li>
                <a
                  href="#"
                  className="text-base font-normal text-gray-600 transition-all duration-200 font-pj hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-normal text-gray-600 transition-all duration-200 font-pj hover:text-gray-900"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
            <p className="mt-8 text-base font-normal text-center text-gray-600 md:text-left md:mt-0 md:order-1 font-pj">
              &copy; Copyright {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
