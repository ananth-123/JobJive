import styles from "./Home.module.css"

export default async function IndexPage() {
  return (
    <div className="bg-grid-slate-200 z-10">
      <div className={styles.bgCustom1}>
        <div className={styles.bgCustom2}></div>
      </div>
      <div className=" h-[100vh] ">
        <div className={styles.nav}>
          <a
            href="/"
            aria-current="page"
            className="logo-link w-inline-block w--current"
          >
            <img
              src="https://uploads-ssl.webflow.com/6408bea3de5aef58b7e197d4/6408c50680c7dae0a89901a1_logo.svg"
              loading="eager"
              alt="diagram logo"
              className="logo"
            />
          </a>
          <div className="rounded-full backdrop-blur-sm bg-white-500/30 pl-10">
            <div className={styles.navList}>
              <a href="#magician" className={styles.navItem}>
                <div className="tracking-[.2px] font-semibold text-slate-400 hover:text-black">
                  Magician
                </div>
              </a>
              <a href="#genius" className={styles.navItem}>
                <div className="tracking-[.2px] font-semibold text-slate-400 hover:text-black">
                  Genius
                </div>
              </a>
              <a href="#automator" className={styles.navItem}>
                <div className="tracking-[.2px] font-semibold text-slate-400 hover:text-black">
                  Automator
                </div>
              </a>
              <a href="#ui-ai" className={styles.navItem}>
                <div className="tracking-[.2px] font-semibold text-slate-400 hover:text-black">
                  UI-AI
                </div>
              </a>
            </div>
          </div>
          <div className="flex-row items-center flex">
            <a href="/login" className={styles.buttonPrimary}>
              <div className="tracking-[.2px] font-semibold text-[14px] text-slate-400 hover:text-black">
                Login
              </div>
            </a>

            <a
              href="/signup"
              className={`group ${styles.buttonSecondary} animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black`}
            >
              <div className="tracking-[.2px] font-semibold text-[14px] text-white group-hover:text-black">
                Sign Up
              </div>
            </a>
          </div>
        </div>
        <div className="h-100vh mx-auto mb-10 mt-24 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
          <a
            className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
            href="https://elevenlabs.io/"
          >
            <p className="text-sm font-semibold text-gray-700">
              Powered by ElevenLabs
            </p>
            <div className="group relative flex items-center ">
              <svg
                className="-ml-1 h-3.5 w-3.5 absolute transition-all group-hover:translate-x-1 group-hover:opacity-0 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                ></path>
              </svg>
              <svg
                className="-ml-1 h-3.5 w-3.5 absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </div>
          </a>
          <h1 className="mt-14 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
            Supercharge your career with
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              JobJive
            </span>
          </h1>
          <h2 className="mt-5 text-gray-600 sm:text-xl">
            Realtime AI-powered Interview sessions to help you land your dream
            job in no time.
          </h2>
          <div className="mx-auto mt-20 flex max-w-fit space-x-4">
            <a
              href=""
              className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black"
            >
              Request Free Trial
            </a>
            <a
              className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 shadow-lg transition-all hover:border-gray-800"
              href="https://github.com/ananth-123/JobJive"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-black"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              <p className="text-sm text-black">Star on GitHub</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
