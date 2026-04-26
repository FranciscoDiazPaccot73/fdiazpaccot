class i extends HTMLElement{static get observedAttributes(){return["color","secondary-color","tertiary-color","button-label","href","text","title"]}constructor(){var t;super(),this._defaultButtonLabel="Go Home",this._defaultHref="/",this._defaultText="The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",this._defaultTitle="Oops!",this.attachShadow({mode:"open"});const n=document.createElement("template");n.innerHTML=`
      <section class="not-found-container">
        <div class="not-found">
          <p id="code">4<span class="first">0</span><span class="last">4</span></p>
        </div>
        <div class="not-found-text">
          <p class="not_found__text_oops" id='not-found-neon-title'>${this._defaultTitle}</p> <p id='not-found-neon-text'>${this._defaultText}</p>
        </div>
        <a class="not_found__button" href="${this._defaultHref}" id='not-found-neon-link'>${this._defaultButtonLabel}</a>
      </section>

      <style>
        :host {
          --color:#000000;
          --secondary-color:#2d2d2d;
          --tertiary-color:#555555;
          --button-bg-color:#171717;
        }
        .not-found-container {
          height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .not-found {
          text-align: center;
          color: var(--color);
          font-size: 120px;
          padding: 20px;
          text-shadow:
            0 0 80px var(--color),
            0 0 30px var(--secondary-color),
            0 0 6px var(--tertiary-color);
        }
        .not-found p {
          margin: 0;
        }
        .first {
          opacity: 0.4;
          text-shadow: none;
        }
        .not-found-text {
          color: var(--color);
          font-size: 18px;
          letter-spacing: 1px;
          text-align: center;
        }
        .not_found__text_oops {
          font-size: 24px;
          font-weight: bold;
        }
        .not_found__button {
          text-decoration: none;
          color: var(--color);
          font-size: 14px;
          margin-top: 40px;
          padding: 10px 20px;
          border: 1px solid var(--color);
          border-radius: 5px;
          transition: background-color 0.3s;
          position:relative;
        }
        .not_found__button::before {
          content: "";
          position: absolute;
          opacity: 0;
          inset: 0;
          background-color: var(--tertiary-color);
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .not_found__button:hover::before {
          opacity: 0.5;
        }
        .last {
          animation: lower 10s linear infinite;
        }
        @keyframes lower {
          0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
            opacity: 0.99;
            text-shadow:
              0 0 80px var(--color),
              0 0 30px var(--secondary-color),
              0 0 6px var(--tertiary-color);
          }
          19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% {
            opacity: 0.4;
            text-shadow: none;
          }
        }
      </style>
    `,(t=this.shadowRoot)===null||t===void 0||t.appendChild(n.content.cloneNode(!0))}attributeChangedCallback(t,n,e){t==="color"&&(this.style.setProperty("--color",e),this.style.setProperty("--button-bg-color",`rgba(${e}, 0.4)`)),t==="secondary-color"&&this.style.setProperty("--secondary-color",e),t==="tertiary-color"&&this.style.setProperty("--tertiary-color",e),t==="button-label"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-neon-link").textContent=e),t==="href"&&this.shadowRoot&&this.shadowRoot.querySelector("#not-found-neon-link").setAttribute("href",e),t==="text"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-neon-text").textContent=e),t==="title"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-neon-title").textContent=e)}get color(){return this.getAttribute("color")||"black"}get secondaryColor(){return this.getAttribute("secondary-color")||"rgb(45, 45, 45)"}get tertiaryColor(){return this.getAttribute("tertiary-color")||"rgb(85, 85, 85)"}get buttonLabel(){return this.getAttribute("button-label")||this._defaultButtonLabel}get href(){return this.getAttribute("href")||this._defaultHref}get text(){return this.getAttribute("text")||this._defaultText}get title(){return this.getAttribute("title")||this._defaultTitle}set color(t){this.setAttribute("color",t)}set secondaryColor(t){this.setAttribute("secondary-color",t)}set tertiaryColor(t){this.setAttribute("tertiary-color",t)}set buttonLabel(t){this.setAttribute("button-label",t)}set href(t){this.setAttribute("href",t)}set text(t){this.setAttribute("text",t)}set title(t){this.setAttribute("title",t)}}customElements.define("neon-404",i);class s extends HTMLElement{static get observedAttributes(){return["color","secondary-color","tertiary-color","button-label","href","text","title","is-dark-mode"]}constructor(){var t;super(),this._defaultButtonLabel="Go Home",this._defaultHref="/",this._defaultText="The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",this._defaultTitle="Oops!",this._defaultIsDarkMode="false",this.attachShadow({mode:"open"});const n=document.createElement("template");n.innerHTML=`
      <section class="not-found-container">
        <div class="background-404"></div>
        <div class="text-center">
          <p class="error-code">404</p>
          <h1 class="error-title" id='not-found-simple-gradient-title'>${this._defaultTitle}</h1>
          <p class="error-message" id='not-found-simple-gradient-text'>${this._defaultText}</p>
          <div class="button-container">
              <a class="button" href="${this._defaultHref}" id='not-found-neon-link'>${this._defaultButtonLabel}</a>
          </div>
        </div>
      </section>

      <style>
        :host {
          --color:#000000;
          --secondary-color:#2d2d2d;
          --tertiary-color:#555555;
          --button-bg-color:#171717;
          --gradient-secondary-color:#d9d9d9;
        }
        .not-found-container {
          min-height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          place-items: center;
          height: 100vh;
          padding: 6rem 1.5rem;
        }
        .text-center {
          text-align: center;
        }
        .error-code {
            font-size: 18px;
            font-weight: 600;
            color: var(--secondary-color);
        }
        .error-title {
            margin-top: 16px;
            font-size: 36px;
            font-weight: bold;
            color: var(--secondary-color);
        }
        .error-message {
            margin-top: 16px;
            font-size: 16px;
            color: var(--tertiary-color);
        }
        .button-container {
            margin-top: 32px;
        }
        .button {
          text-decoration: none;
          color: var(--color);
          font-size: 14px;
          margin-top: 40px;
          padding: 10px 20px;
          border: 1px solid var(--color);
          border-radius: 5px;
          transition: background-color 0.3s;
          position:relative;
        }
        .button::before {
          content: "";
          position: absolute;
          opacity: 0;
          inset: 0;
          background-color: var(--tertiary-color);
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .button:hover::before {
          opacity: 0.5;
        }
        .background-404 {
          background: linear-gradient(-45deg, var(--color), var(--color) 50%, var(--gradient-secondary-color), var(--gradient-secondary-color));
          background-size: 400% 400%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: -1;
          background-position: 20% 20%;
        }
        @media (max-width: 640px) {
          .container: {
            padding: 8rem 1.5rem;
          }
          .error-title {
              font-size: 28px;
          }
          .error-message {
              font-size: 14px;
          }
          .button {
              font-size: 12px;
              padding: 8px 14px;
          }
        }

        @media (max-width: 480px) {
          .container: {
            padding: 8rem 2rem;
          }
          .error-title {
              font-size: 24px;
          }
          .error-message {
              font-size: 13px;
          }
          .button {
              font-size: 12px;
              padding: 6px 12px;
          }
        }
      </style>
    `,(t=this.shadowRoot)===null||t===void 0||t.appendChild(n.content.cloneNode(!0))}attributeChangedCallback(t,n,e){if(t==="color"&&(this.style.setProperty("--color",e),this.style.setProperty("--button-bg-color",`rgba(${e}, 0.4)`)),t==="secondary-color"&&this.style.setProperty("--secondary-color",e),t==="tertiary-color"&&this.style.setProperty("--tertiary-color",e),t==="button-label"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-neon-link").textContent=e),t==="href"&&this.shadowRoot&&this.shadowRoot.querySelector("#not-found-neon-link").setAttribute("href",e),t==="text"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-simple-gradient-text").textContent=e),t==="title"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-simple-gradient-title").textContent=e),t==="is-dark-mode"){const o=e==="true"?"#010101":"#d9d9d9";this.style.setProperty("--gradient-secondary-color",o)}}get color(){return this.getAttribute("color")||"black"}get secondaryColor(){return this.getAttribute("secondary-color")||"rgb(45, 45, 45)"}get tertiaryColor(){return this.getAttribute("tertiary-color")||"rgb(85, 85, 85)"}get getIsDarkMode(){return console.log(this.getAttribute("is-dark-mode")),this.getAttribute("is-dark-mode")?this.getAttribute("is-dark-mode"):this._defaultIsDarkMode}get buttonLabel(){return this.getAttribute("button-label")||this._defaultButtonLabel}get href(){return this.getAttribute("href")||this._defaultHref}get text(){return this.getAttribute("text")||this._defaultText}get title(){return this.getAttribute("title")||this._defaultTitle}set color(t){this.setAttribute("color",t)}set secondaryColor(t){this.setAttribute("secondary-color",t)}set tertiaryColor(t){this.setAttribute("tertiary-color",t)}set isDarkMode(t){const n=t?"#010101":"#d9d9d9";this.setAttribute("gradient-secondary-color",n)}set buttonLabel(t){this.setAttribute("button-label",t)}set href(t){this.setAttribute("href",t)}set text(t){this.setAttribute("text",t)}set title(t){this.setAttribute("title",t)}}customElements.define("simple-gradient-404",s);class a extends HTMLElement{static get observedAttributes(){return["color","secondary-color","tertiary-color","button-label","href","text","title","image"]}constructor(){var t;super(),this._defaultButtonLabel="Go Home",this._defaultHref="/",this._defaultText="The page you are looking for might have been removed, had its name changed or is temporarily unavailable.",this._defaultTitle="Oops!",this._defaultImage="",this.attachShadow({mode:"open"});const n=document.createElement("template");n.innerHTML=`
      <section class="not-found-container">
        <img
          id="not-found-simple-image-src"
          src=${this._defaultImage}
          alt="404"
          class="not-found-image"
        />
        <div class="not-found-content">
          <p class="error-code">404</p>
          <h1 class="error-title" id="not-found-simple-image-title">
            ${this._defaultTitle}
          </h1>
          <p class="error-message" id="not-found-simple-image-text">
            ${this._defaultText}
          </p>
          <div class="not-found-button-container">
            <a
              href="${this._defaultHref}"
              class="not-found-button"
            >
              ${this._defaultButtonLabel}
            </a>
          </div>
        </div>
      </section>

      <style>
        :host {
          --color:#000000;
          --secondary-color:#2d2d2d;
          --tertiary-color:#555555;
          --button-bg-color:#171717;
          --gradient-secondary-color:#d9d9d9;
        }
        .not-found-container {
          min-height: 100vh;
          position: relative;
          isolation: isolate;
        }
        .not-found-image {
          object-position:top;
          object-fit:cover;
          width: 100%;
          height: 100%;
          display: none;
          position: absolute;
          z-index:-10;
          inset:0px;
        }
        .not-found-content {
          text-align: center;
          padding:8rem 1.5rem;
        }
        .error-code {
            font-size: 18px;
            font-weight: 600;
            color: var(--secondary-color);
        }
        .error-title {
            margin-top: 16px;
            font-size: 36px;
            font-weight: bold;
            color: var(--secondary-color);
        }
        .error-message {
            margin-top: 16px;
            font-size: 16px;
            color: var(--tertiary-color);
        }
        .not-found-button-container {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }
        .not-found-button {
          text-decoration: none;
          color: var(--color);
          font-size: 14px;
          text-decoration-line:underline;
          position:relative;
        }
        .not-found-button::hover {
          color: var(--secondary-color);
        }
        @media (min-width: 640px) {
          .not-found-content {
            padding: 12rem 2rem;
          }
        }
      </style>
    `,(t=this.shadowRoot)===null||t===void 0||t.appendChild(n.content.cloneNode(!0))}attributeChangedCallback(t,n,e){if(t==="color"&&(this.style.setProperty("--color",e),this.style.setProperty("--button-bg-color",`rgba(${e}, 0.4)`)),t==="secondary-color"&&this.style.setProperty("--secondary-color",e),t==="tertiary-color"&&this.style.setProperty("--tertiary-color",e),t==="button-label"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-neon-link").textContent=e),t==="href"&&this.shadowRoot&&this.shadowRoot.querySelector("#not-found-neon-link").setAttribute("href",e),t==="text"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-simple-image-text").textContent=e),t==="title"&&this.shadowRoot&&(this.shadowRoot.querySelector("#not-found-simple-image-title").textContent=e),t==="image"&&this.shadowRoot){const o=this.shadowRoot.querySelector("#not-found-simple-image-src");o.setAttribute("src",e),o.setAttribute("style","display:block")}}get color(){return this.getAttribute("color")||"black"}get secondaryColor(){return this.getAttribute("secondary-color")||"rgb(45, 45, 45)"}get tertiaryColor(){return this.getAttribute("tertiary-color")||"rgb(85, 85, 85)"}get buttonLabel(){return this.getAttribute("button-label")||this._defaultButtonLabel}get href(){return this.getAttribute("href")||this._defaultHref}get text(){return this.getAttribute("text")||this._defaultText}get title(){return this.getAttribute("title")||this._defaultTitle}set color(t){this.setAttribute("color",t)}set secondaryColor(t){this.setAttribute("secondary-color",t)}set tertiaryColor(t){this.setAttribute("tertiary-color",t)}set buttonLabel(t){this.setAttribute("button-label",t)}set href(t){this.setAttribute("href",t)}set text(t){this.setAttribute("text",t)}set title(t){this.setAttribute("title",t)}}customElements.define("simple-image-404",a);export{i as Neon,s as SimpleWithGradient,a as SimpleWithImage};
