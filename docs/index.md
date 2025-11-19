function doGet(e) {
  const subUrl = e.parameter.url;
  if (!subUrl) {
    return ContentService
      .createTextOutput("Error: missing ?url= parameter")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  try {
    // Fetch subscription and headers
    const resp = UrlFetchApp.fetch(subUrl, { muteHttpExceptions: true });
    if (resp.getResponseCode() !== 200) {
      throw new Error("HTTP " + resp.getResponseCode());
    }

    // Get config body (usually base64-encoded or direct)
    const b64 = resp.getContentText().trim();
    let decoded;
    try {
      decoded = Utilities
        .newBlob(Utilities.base64Decode(b64))
        .getDataAsString()
        .split(/\r?\n/);
    } catch (err) {
      decoded = b64.split(/\r?\n/);
    }

    // Get usage stats from response header
    const headers = resp.getAllHeaders();
    let upload = 0, download = 0, total = 0, expire = 0;
    if (headers['subscription-userinfo'] || headers['Subscription-Userinfo']) {
      const info = headers['subscription-userinfo'] || headers['Subscription-Userinfo'];
      const match = info.match(/upload=(\d+); *download=(\d+); *total=(\d+); *expire=(\d+)/);
      if (match) {
        upload = match[1];
        download = match[2];
        total = match[3];
        expire = match[4];
      }
    }

    const configs = decoded.filter(line =>
      /^(ss|vless|vmess|trojan):\/\//.test(line.trim())
    );

    const output = [
      "#profile-title: base64:Ny8yNCBIWVpNQVTwn5ug",
      "#profile-update-interval: 1",
      "#support-url: https://t.me/Telegram_user",
      "#profile-web-page-url: https://t.me/Telegram_user",
      "#announce: base64:SEFMQUwgRUxNWURBTUHimqHvuI8=",
      `#subscription-userinfo: upload=${upload}; download=${download}; total=${total}; expire=${expire}`,
      ...configs
    ].join('\n');

    // Encode the whole output as base64
    const encodedOutput = Utilities.base64Encode(output);

    return ContentService
      .createTextOutput(encodedOutput)
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput("Error: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
