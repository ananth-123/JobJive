export default function Pricing() {
  return (
    <div>
      <section
        id="pricing"
        className="bg-gray-100 pt-24"
        data-strapi-component="section.heading-hero"
      >
        <div className="mx-auto max-w-4xl px-10 pt-5 pb-5">
          <div className="heading mx-auto px-8 text-center">
            <h1 className="title font-medium leading-tighter text-4xl md:text-5xl lg:text-6xl">
              Choose your plan
            </h1>
            <p className="description mt-3 text-base leading-relaxed text-gray-700 md:text-lg">
              14 days unlimited free trial. No contract or credit card required.
            </p>
          </div>
        </div>
      </section>
      <section
        className="bg-gray-50 pb-44 shadow-[inset_0_-300px_0_0_#ffffff]"
        data-strapi-component="section.pricing-plans"
      >
        <div className="m-auto w-full max-w-[1155px] overflow-hidden px-0 pt-28 pb-5 lg:px-8 lg:pb-0 lg:pt-32">
          <div className="hidden justify-center lg:flex">
            <div
              className="lg:w-n[350px] relative mx-1 flex w-[310px] flex-col justify-between rounded-xl border border-gray-200 py-8 px-10 font-biennale md:mx-2 md:px-12 lg:py-14 bg-white px-3"
              id="2"
            >
              <div>
                <div className="pb-6 text-center">
                  <p className=" text-xl md:text-2xl">Starter</p>
                  <div className="-mr-8">
                    <strong className="align-middle  text-5xl font-semibold lg:text-[3.25rem]">
                      $12.99
                    </strong>
                    <span className="align-middle text-sm font-semibold tracking-wide text-gray-500">
                      {" "}
                      / MONTH{" "}
                    </span>
                  </div>
                </div>
                <ul className="benefits-list">
                  <li className="relative mb-4 pl-8  text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    5 Full length + 5 short length Interview sessions
                  </li>

                  <li className="relative mb-4 pl-8 text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Limited AI Interviewers
                  </li>
                  <li className="relative mb-4 pl-8 text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Basic Assessment Model
                  </li>
                  <li className="relative mb-4 pl-8 text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Past 5 interview history
                  </li>
                </ul>
              </div>
              <div className="mx-auto pt-5 text-center">
                <a
                  href="/11lab"
                  rel="noopener noreferrer"
                  className="flex w-max items-center whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase leading-none tracking-widest transition-all duration-500 hover:opacity-70 md:px-6 md:text-tiny rounded-lg bg-blue-700 h-12 text-white"
                >
                  Get started
                </a>
              </div>
            </div>
            <div
              className="lg:w-n[350px] relative mx-1 flex w-[310px] flex-col justify-between rounded-xl border border-gray-200 py-8 px-10 font-biennale md:mx-2 md:px-12 lg:py-14 rounded-tl-none rounded-tr-none bg-black text-white px-3"
              id="3"
            >
              <div>
                <div className="absolute bottom-full left-0 w-full rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-2 text-center">
                  <span className="text-sm uppercase text-white">
                    Most popular
                  </span>
                </div>
                <div className="pb-6 text-center">
                  <p className="text-xl md:text-2xl">Pro</p>
                  <div className="-mr-8">
                    <strong className="align-middle text-5xl font-semibold lg:text-[3.25rem]">
                      $50
                    </strong>
                    <span className="align-middle text-sm font-semibold tracking-wide text-gray-500">
                      {" "}
                      / MONTH{" "}
                    </span>
                  </div>
                </div>
                <ul className="benefits-list">
                  <li className="relative mb-4 pl-8 text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    25 Full length + 10 short length Interview sessions
                  </li>
                  <li className="relative mb-4 pl-8 text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Advanced Assessment Model
                  </li>
                  <li className="relative mb-4 pl-8  text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Personalised feedback and Speech analysis
                  </li>
                  <li className="relative mb-4 pl-8  text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Access to all interview history
                  </li>
                </ul>
              </div>
              <div className="mx-auto pt-5 text-center">
                <a
                  href="/11lab"
                  rel="noopener noreferrer"
                  className="flex w-max items-center whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase leading-none tracking-widest transition-all duration-500 hover:opacity-70 md:px-6 md:text-tiny rounded-lg bg-blue-700 h-12 md:h-14 text-white"
                >
                  Get started
                </a>
              </div>
            </div>
            <div
              className="lg:w-n[350px] relative mx-1 flex w-[310px] flex-col justify-between rounded-xl border border-gray-200 py-8 px-10 font-biennale md:mx-2 md:px-12 lg:py-14 bg-white px-3"
              id="1"
            >
              <div>
                <div className="pb-6 text-center">
                  <p className="font-biennale text-xl md:text-2xl">
                    Enterprise
                  </p>
                  <div className="">
                    <strong className="align-middle font-biennale text-5xl font-semibold lg:text-[3.25rem]">
                      Custom
                    </strong>
                  </div>
                </div>
                <ul className="benefits-list">
                  <li className="relative mb-4 pl-8 font-biennale text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    All features as Pro
                  </li>
                  <li className="relative mb-4 pl-8 font-biennale text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    API Support
                  </li>
                  <li className="relative mb-4 pl-8 font-biennale text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Industry specific Model fine tuning
                  </li>
                  <li className="relative mb-4 pl-8 font-biennale text-sm before:absolute before:left-0 before:top-2 before:h-3 before:w-4 before:bg-mark before:bg-no-repeat lg:mb-5 lg:text-base">
                    Contact us to discuss more!
                  </li>
                </ul>
              </div>
              <div className="mx-auto pt-5 text-center">
                <a
                  aria-current="page"
                  href="/11lab"
                  className="router-link-active router-link-exact-active flex w-max items-center whitespace-nowrap px-5 py-3 font-biennale text-xs font-semibold uppercase leading-none tracking-widest transition-all duration-500 hover:opacity-70 md:px-6 md:text-tiny rounded-lg bg-blue-700 h-12 text-white"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
