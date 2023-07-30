import styles from "../Home.module.css"

export default async function Page() {
  return (
    <div className="flex justify-center bg-grid-slate-200 z-10 min-h-screen">
      <div className="max-w-6xl w-full px-2 py-6 flex justify-end h-fit">
        <div className="flex-row items-center flex">
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
      <div className={styles.bgCustom1}>
        <div className={styles.bgCustom2}></div>
      </div>
    </div>
  )
}
