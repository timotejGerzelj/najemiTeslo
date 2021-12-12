module.exports = (content = '', extraStyles = '') => `
  <div class="w-full mx-auto px-5 lg:px-7 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl 3xl:max-w-screen-3xl 4xl:max-w-screen-4xl ${extraStyles}">
    ${content}
  </div>
`
