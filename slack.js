var SlackWebhook = require("slack-webhook");
module.exports = {
  // send message about wrong file to slack channel
  SendMessage(fileName) {
    var slack = new SlackWebhook(
      "https://hooks.slack.com/services/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",
      {
        defaults: {
          username: "Dor Munsa",
          channel: "#cloud-2019-group-110",
          icon_emoji: ":robot_face:"
        }
      }
    );
    slack.send(`the file : ${fileName} detected as a wrong file`);
  }
};
