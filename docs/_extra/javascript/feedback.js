document$.subscribe(function() {
    
  var feedback = document.forms.feedback
  if (typeof feedback === "undefined") return

  feedback.hidden = false 

  // Add this inside your subscribe function, after feedback is defined
feedback.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => console.log("button clicked"));
});

  feedback.addEventListener("submit", function(ev) {
    ev.preventDefault()    
    console.log(ev)
    var page = document.location.pathname 
    var rating = ev.submitter.getAttribute("data-md-value")
    var feedbackComment = ev.target.querySelector("textarea#feedback-comment").value

    // replace with code to send to GA
    console.log(page, rating, feedbackComment) 
    // Send event to Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "feedback",
        page: page,
        rating: rating,
        feedbackComment: feedbackComment
    });

    feedback.firstElementChild.disabled = true 
    document.getElementById("feedback-comment").style.display = "none";

    var note = feedback.querySelector(
      ".md-feedback__note [data-md-value='" + rating + "']"
    )
    if (note)
      note.hidden = false 
  })
})
