export default function GitHub(config: any): any {
  const baseUrl = config?.enterprise?.baseUrl ?? "https://open.douyin.com";
  const apiBaseUrl = config?.enterprise?.baseUrl
    ? `${config?.enterprise?.baseUrl}`
    : "https://open.douyin.com";

  return {
    id: "dy",
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
      url: `${apiBaseUrl}/oauth/userinfo`,
      async request({ tokens, provider }: any) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json());

        return profile;
      },
    },
    profile(profile: any) {
      console.log("profile is: ", profile);
      return {
        id: profile.open_id.toString(),
        name: profile.nickname ?? profile.login,
        email: "",
        image: profile.avatar,
      };
    },
    style: { bg: "#24292f", text: "#fff" },
    options: config,
  };
}
