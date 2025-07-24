// document$.subscribe(function() {
    
//   var feedback = document.forms.feedback
//   console.log(feedback);
//   console.log(typeof feedback);
//   if (typeof feedback === "undefined") return

//   feedback.hidden = false 

//   // Add this inside your subscribe function, after feedback is defined
// feedback.querySelectorAll("button").forEach(btn => {
//   btn.addEventListener("click", () => console.log("button clicked"));
// });

//   feedback.addEventListener("submit", function(ev) {
//     alert("in event");
//     ev.preventDefault()    
//     var page = document.location.pathname 
//     var data = ev.submitter.getAttribute("data-md-value")

//     // replace with code to send to GA
//     console.log(page, data) 

//     feedback.firstElementChild.disabled = true 

//     var note = feedback.querySelector(
//       ".md-feedback__note [data-md-value='" + data + "']"
//     )
//     if (note)
//       note.hidden = false 
//   })
// })
