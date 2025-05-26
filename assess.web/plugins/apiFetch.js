export default defineNuxtPlugin((nuxtApp) => {
  const userAuth = useAuth()
  const $apiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
      'Authorization': userAuth.token.value
    }
  });

  return {
    provide: {
      apiFetch: (url, options = {}) => {
        console.log(options)
        return $apiFetch(url, {
          method: options.method || 'GET',
          body: options.body || null,
          headers: {
            'Authorization': userAuth.token.value
          },
          ...options
        });
      }
    }
  }
});