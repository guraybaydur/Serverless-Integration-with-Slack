# How to read messages through Slack with Functions

## Introduction
In a developer’s work environment where people share their ideas and emotions constantly, good communication among team members plays a key role. Often times they talk to each other face to face but sometimes they are not able to communicate with each other in person because of the distance. Therefore, they use messaging applications such as Slack in order to keep in touch. 

For many reasons, developers may want to investigate the messages from Slack, alter them in a proper way or take some actions according to some specific input. They prefer this way because they have a heavy workload that prevents them from answering every single question and automation is needed or they want to analyze the context of a long text that is written in order to answer it in a rapid way or they just want to derive some insights from the text data to practice what they learnt at school. 

The main purpose of this tutorial is to show developers how they can easily receive messages from Slack to IBM Cloud Functions to solve the problems mentioned above. 


## Prerequisites

- IBM Cloud Account
- Slack Account and Workspace

## Estimated Time
15 minutes

## Steps

## 1. Slack Sign In
- Go to api.slack.com to login to your account.
- From top right corner, Click Go To Slack.
- You will be directed to Sign in to your workspace page. Enter your workspace url here and hit Enter.
- Login to your account.
- Go back to api.slack.com again.
- From top right corner, Click Your Apps.
- Click Create New App.
- Give your App a name by filling App Name Section.
- Choose your workspace by filling Development Slack Workspace Section.
- Go to Bot Users tab from left side bar.
- Click Add Bot User.
- This is the place where you give your bot a name.
- Turn On Always Show My Bot as Online Button.
- Click on Add Bot User.
- Go to OAuth & Permissions page and Click on Install App to Workspace. This will install your app to workspace by generating credentials and binding it to workspace.

## 2.  IBM Cloud Functions Action Creation
- Open a new tab in your browser and go to cloud.ibm.com/functions
- Click Login from top right button.
- Sign in to your IBM Cloud Account.
- You must be redirected to cloud.ibm.com/functions page. If not directed, go there by entering it to your browser.
- Click on Start Creating. 
- Choose Create Action.
- Fill Action Name with a name of your choice.
- Leave everything else as it is and Click Create.
- You will see the code part of your action. 
- Enter the code snippet below inside function definiton. This will ensure that your action is connected to your recently created Slack App. (Slack sends data with challenge parameter and we send it back to slack by returning challenge parameter)
 ```
if (params.type !== undefined && params.type ===      'url_verification') {
    return({ challenge: params.challenge });
}
```
- Enter another code after if clause. This code snippet checks if a direct message is received from Slack to the bot we created and returns the text as an output. 
```
let payload = params;
let text = "Empty Text!";
    
if (payload.event && payload.event.type === "message" && payload.event.subtype != "bot_message" && typeof payload.event.files === "undefined") {
    
    text = payload.event.text;
    
}
    return {message:text};
```
- Click Save.
- Go to Endpoints from left side bar.
- Click on Enable as Web Action. Click Save. You will see a url generated for you. Copy it to your favorite editor.

## 4. Subscribe Action to Slack
- Go back to api.slack.com -> your apps and choose the app you just created.
- Go to Event Subscriptions from left side bar.
- Turn On Enable Events Button.
- Fill the request url by entering the url that you copied in previous step. Add .json extension at the end of the url. You must see green Verified Notification. 
- Go down and Click on Subscribe to bot events.
- Click on Add Bot User Event.
- Search for message.im. This will subscribe the bot to listen to direct messages coming to itself.
- Go to Subscribe to workspace events and also add message.im here.
- You will see reinstall app link at the top of the page. Click on it to reinstall the app. Click Allow.

## 4. View Received Text
- Go to you Terminal
- Login to your IBM Cloud CLI
- Choose your organization and space by entering ibmcloud target --cf
- Go to your Slack Application and send direct message to your bot.
- Go back to your terminal and enter ibmcloud fn activation list.
- Copy the Activation Id at the top.
- Enter ibmcloud fn activation get <your copied  activation id>
- You will see the text in the result section of the response.



<img src="https://github.ibm.com/Guray-Baydur/Cloud-Functions-Multiple-AI-Services/blob/master/Screenshots/Screen%20Shot%202019-10-20%20at%2015.01.19.png" alt="drawing" width="1200" height="550"/>

## Summary

The role of text analysis in business world is crucial in terms of customer satisfaction, gaining insights and quick reaction to solve the issues. With the powerful serverless architecture of IBM Cloud Functions, developers just focus on their job to perform the solution and leave other concerns such as server maintenance, upgrades, deployments out of their minds.

## Related Links

https://developer.ibm.com/patterns/serverless-functions-push-notifications/ 

 #### Additional Note:  Make sure that you are in the correct organization and space from the Terminal. Double check it by checking top right sections in cloud.ibm.com/functions page.



 
