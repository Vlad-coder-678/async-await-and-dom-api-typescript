// спиннер
const spinner: HTMLElement | null = document.querySelector(".spinner");
const showSpinner = () => spinner ? spinner.style.visibility = "visible" : null;
const hideSpinner = () => spinner ? spinner.style.visibility = "hidden" : null;

// отображение контента
const contentElement: HTMLElement | null = document.getElementById("content");
const resultContainer: HTMLElement | null = document.getElementById("result-container");
const setContent = (content: string) => contentElement ? contentElement.innerHTML = content : null;
const showContentBlock = () => resultContainer ? resultContainer.style.visibility = "visible" : null;
const hideContentBlock = () => resultContainer ? resultContainer.style.visibility = "hidden" : null;
const hideContentButton = document.querySelector(".delete");

// элементы поиска
const byQueryBlock: HTMLElement | null = document.getElementById("byQueryBlock");
const byQuerySelect = byQueryBlock?.querySelector("select");
const byQueryInput = byQueryBlock?.querySelector("input");
const submitByQueryButton: HTMLElement | null = document.getElementById("byQueryBtn");

const byIdBlock: HTMLElement | null = document.getElementById("byIdBlock");
const byIdSelect = byIdBlock?.querySelector("select");
const byIdInput = byIdBlock?.querySelector("input");
const submitByIdButton = document.getElementById("byIdBtn");

// взаимодействие пользователя со страницей
const handleSubmitClick = async (param: Param, option: Option, value: string = "") => {
  if (value.length) {
    showSpinner();
    const content = await fetchContent(param, option, value);
    const serializeContent = param === "byQuery" ? await contentSerializer(content) : await oneEntityContentSerializer(content);
    setContent(serializeContent);
    showContentBlock();
    hideSpinner();
  }
};

if (submitByQueryButton) submitByQueryButton.addEventListener("click", () => handleSubmitClick("byQuery", byQuerySelect?.value as Option, byQueryInput?.value));
if (submitByIdButton) submitByIdButton.addEventListener("click", () => handleSubmitClick("byId", byIdSelect?.value as Option, byIdInput?.value));
if (hideContentButton) hideContentButton.addEventListener("click", hideContentBlock);
