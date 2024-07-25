export default function GitHub(config: any): any {
  const baseUrl = config?.enterprise?.baseUrl ?? "https://open.douyin.com";
  const apiBaseUrl = config?.enterprise?.baseUrl
    ? `${config?.enterprise?.baseUrl}`
    : "https://open.douyin.com/";

  return {
    id: "douyin",
    name: "Douyin",
    type: "oauth",
    authorization: {
      url: `${baseUrl}/platform/oauth/connect/`,
      params: { scope: "user_info" },
    },
    token: {
      url: `${baseUrl}/oauth/access_token`,
      params: {
        grant_type: "authorization_code",
      },
    },
    userinfo: {
      url: `${apiBaseUrl}/user`,
      async request({ tokens, provider }) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json());

        if (!profile.email) {
          const res = await fetch(`${apiBaseUrl}/user/emails`, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "User-Agent": "authjs",
            },
          });

          if (res.ok) {
            const emails: any[] = await res.json();
            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email;
          }
        }

        return profile;
      },
    },
    profile(profile: any) {
      return {
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email ?? "",
        image: profile.avatar_url,
      };
    },
    style: { bg: "#24292f", text: "#fff" },
    options: config,
  };
}
