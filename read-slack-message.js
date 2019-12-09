/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 function main(params) {
	if (params.type !== undefined && params.type ===      'url_verification') {
   return({ challenge: params.challenge });
}

let payload = params;
let text = "Empty Text!";
    
if (payload.event && payload.event.type === "message" && payload.event.subtype != "bot_message" && typeof payload.event.files === "undefined") {
    
    text = payload.event.text;
    
}
    return {text:text};
    
}
