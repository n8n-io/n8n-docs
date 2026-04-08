// Initiate and configure the widget
// https://docs.kapa.ai/integrations/website-widget/installation/mkdocs

document.addEventListener("DOMContentLoaded", function () {
  var script = document.createElement("script");
  script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
  script.setAttribute("data-website-id", "d2598b63-bfa7-4ddd-a0ac-e6c69f4d0653");
  script.setAttribute("data-project-name", "n8n");
  script.setAttribute("data-project-color", "#EA4B71");
  script.setAttribute("data-project-logo", "/_images/assets/n8n-icon-kapa-modal.png");
  // Hide the Kapa widget
  script.setAttribute("data-button-hide", true);
  // MkDocs tries to squeeze the modal
  script.setAttribute("data-modal-size", "900px");
  // Make sure we don't track users, so we don't have to put this behind the cookie widget https://docs.kapa.ai/integrations/website-widget/user-tracking
  script.setAttribute("data-user-analytics-cookie-enabled", false);
  // Add Kapa MCP
  script.setAttribute("data-mcp-enabled", true);
  script.setAttribute("data-mcp-server-url", "https://n8n.mcp.kapa.ai/");
  script.async = true;
  document.head.appendChild(script);
});

// Add tracking in Plausible 
// https://docs.kapa.ai/integrations/website-widget/javascript-api/events#onaskaianswercompleted

Kapa(
  "onAskAIAnswerCompleted",
  ({ threadId, questionAnswerId, question, answer, conversation }) => {
    let currentPage = window.location.href;
    plausible("Kapa Question", {props: {
      page: currentPage,
      kapaThreadId: threadId,
      question: question,
      answer: answer
    }})
  },
);

// https://docs.kapa.ai/integrations/website-widget/javascript-api/events#onaskailinkclick

Kapa(
  "onAskAILinkClick",
  ({ href, threadId, questionAnswerId, question, answer }) => {
    let currentPage = window.location.href;
    plausible("Kapa Link In Answer Clicked", {props: {
      page: currentPage,
      link: href,
      kapaThreadId: threadId,
      question: question,
      answer: answer
    }})
  },
);

// https://docs.kapa.ai/integrations/website-widget/javascript-api/events#onaskaisourceclick

Kapa(
  "onAskAISourceClick",
  ({ source, threadId, questionAnswerId, question, answer }) => {
    let currentPage = window.location.href;
    plausible("Kapa Link In Listed Sources Clicked", {props: {
      page: currentPage,
      source: source.url,
      kapaThreadId: threadId,
      question: question,
      answer: answer
    }})
  },
);
