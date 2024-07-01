export type AnyObjectType = Record<string, any>;

export type FetchResponse<T> = Promise<T>;

export interface ApiRequestProps extends Omit<RequestInit, 'body'> {
  url: string;
  data?: unknown;
  params?: AnyObjectType;
  slug?: string;
}

export const apiRequest = async ({ url }: ApiRequestProps) => {
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
