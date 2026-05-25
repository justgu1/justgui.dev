function required(
    value: string | undefined,
    key: string
  ): string {
    if (!value) {
      throw new Error(
        `Missing environment variable: ${key}`
      );
    }
  
    return value;
  }
  
  export const ENV = {
    API_URL: required(
      import.meta.env.PUBLIC_API_URL,
      "PUBLIC_API_URL"
    ),

    LINKEDIN_URL: required(
      import.meta.env.PUBLIC_LINKEDIN_URL,
      "PUBLIC_LINKEDIN_URL"
    ),

    GITHUB_URL: required(
      import.meta.env.PUBLIC_GITHUB_URL,
      "PUBLIC_GITHUB_URL"
    ),

    INSTAGRAM_URL: required(
      import.meta.env.PUBLIC_INSTAGRAM_URL,
      "PUBLIC_INSTAGRAM_URL"
    ),
  
    APP_ENV: required(
      import.meta.env.PUBLIC_APP_ENV,
      "PUBLIC_APP_ENV"
    ),
  } as const;